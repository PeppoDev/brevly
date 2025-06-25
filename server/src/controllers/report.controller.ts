import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const reportController: FastifyPluginAsyncZod = async server => {
	server.get(
		'/report',
		{
			schema: {
				summary: 'Get report',
				tags: ['report'],
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
}
