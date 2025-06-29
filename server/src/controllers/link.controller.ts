import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const LinkSchema = z.object({
	id: z.string(),
	originalUrl: z.string(),
	shortUrl: z.string(),
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
					204: z.null(),
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

			await db.insert(schema.links).values({
				originalUrl,
				shortUrl,
			})

			return reply.code(204).send()
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

}
