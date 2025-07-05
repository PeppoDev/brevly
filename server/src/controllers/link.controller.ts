import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq, sql } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const LinkSchema = z.object({
	id: z.string(),
	originalUrl: z.string(),
	shortUrl: z.string(),
	accessCount: z.number(),
	createdAt: z.date(),
})

export const linkController: FastifyPluginAsyncZod = async server => {
	server.post(
		'/link',
		{
			schema: {
				summary: 'Create a new link',
				tags: ['link'],
				body: z.object({
					originalUrl: z.string().url(),
					shortUrl: z.string().regex(/^[A-Za-z0-9_-]+$/),
				}),
				response: {
					201: z.object({ id: z.string().uuid() }),
					409: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, shortUrl } = request.body

			const alreadyExistentLink = await db.query.links.findFirst({
				where: (el, { eq }) => eq(el.shortUrl, shortUrl),
			})

			if (alreadyExistentLink) return reply.code(409).send({ message: 'Link already exists' })

			const [createdLink] = await db.insert(schema.links).values({
				originalUrl,
				shortUrl,
			}).returning()

			return reply.code(201).send({ id: createdLink.id })
		}
	)

	server.get(
		'/link',
		{
			schema: {
				summary: 'Get link list',
				tags: ['link'],
				response: {
					200: z.object({ content: z.array(LinkSchema) }),
				},
			},
		},
		async (_request, reply) => {
			const response = await db.select().from(schema.links).limit(10)
			return reply.code(200).send({ content: response })
		}
	)

	server.get(
		'/link/:shortUrl',
		{
			schema: {
				summary: 'Get original url by short url',
				tags: ['link'],
				params: z.object({
					shortUrl: z.string().regex(/^[A-Za-z0-9_-]+$/),
				}),
				response: {
					200: z.object({
						url: z.string().url(),
					}),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const link = await db.query.links.findFirst({
				where: (el, { eq }) => eq(el.shortUrl, request.params.shortUrl),
			})
			if (!link) return reply.code(404).send({ message: 'Link not found' })
			return reply.code(200).send({
				url: link.originalUrl,
			})
		}
	)

	server.delete(
		'/link/:id',
		{
			schema: {
				summary: 'Delete link by id',
				tags: ['link'],
				params: z.object({
					id: z.string().uuid(),
				}),
				response: {
					204: z.object({
						id: z.string().uuid(),
					}),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const [deleted] = await db.delete(schema.links).where(eq(schema.links.id, request.params.id)).returning();
			if (!deleted) return reply.code(404).send({ message: 'Link not found' })
			return reply.code(200).send({ id: deleted.id })
		}
	)

	server.patch(
		'/link/:id',
		{
			schema: {
				summary: 'Increment access count',
				tags: ['link'],
				params: z.object({
					id: z.string().uuid(),
				}),
				response: {
					204: z.object({
						id: z.string().uuid(),
					}),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params
			const [updated] = await db
				.update(schema.links)
				.set({
					accessCount: sql`${schema.links.accessCount} + 1`,
				})
				.where(eq(schema.links.id, id))
				.returning();

			if (!updated) return reply.code(404).send({ message: 'Link not found' })
			return reply.code(200).send({ id: updated.id })
		}
	)
}
