import { createShortLink } from '@/use-cases/create-short-link'
import { deleteLink } from '@/use-cases/delete-link'
import { getLinkByShortUrl } from '@/use-cases/get-link-by-short-url'
import { getLinks } from '@/use-cases/get-links'
import { incrementAccessCount } from '@/use-cases/increment-access-count'
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
			const id = await createShortLink({ originalUrl, shortUrl })
			return reply.code(201).send({ id })
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
			const response = await getLinks()
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
						id: z.string().uuid(),
					}),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const link = await getLinkByShortUrl(request.params.shortUrl)
			return reply.code(200).send({
				url: link.originalUrl,
				id: link.id,
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
			const deletedId = await deleteLink(request.params.id)
			return reply.code(200).send({ id: deletedId })
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
			const updatedId = await incrementAccessCount(request.params.id)
			return reply.code(200).send({ id: updatedId })
		}
	)
}
