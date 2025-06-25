import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const linkController: FastifyPluginAsyncZod = async server => {
	server.post(
		'/link',
		{
			schema: {
				summary: 'Create a new link',
				tags: ['link'],
				body: z.object({
					originalUrl: z.string().url(),
					shortUrl: z.string().url(),
				}),
				response: {
					201: z.object({ url: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, shortUrl } = request.body
			await db.insert(schema.links).values({
				originalUrl,
				shortUrl,
			})
			return reply.code(201).send({ url: '' })
		}
	)

	server.get(
		'/link',
		{
			schema: {
				summary: 'Get link list',
				tags: ['link'],
				response: {
					200: z.object({ content: z.array(z.any()) }),
				},
			},
		},
		async (request, reply) => {
			const response = await db.select().from(schema.links).limit(10)

			return reply.code(200).send({ content: response })
		}
	)

	server.get(
		'/link/:id',
		{
			schema: {
				summary: 'Get link by id',
				tags: ['link'],
				params: z.object({
					id: z.string().uuid(),
				}),
				response: {
					200: z.any(),
				},
			},
		},
		async (request, reply) => {
			const link = await db.query.links.findFirst({
				where: (el, { eq }) => eq(el.id, request.params.id),
			})
			return reply.code(200).send(link)
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
					204: z.null(),
				},
			},
		},
		async (request, reply) => {
			await db.delete(schema.links).where(eq(schema.links.id, request.params.id))

			return reply.code(204).send()
		}
	)
}
