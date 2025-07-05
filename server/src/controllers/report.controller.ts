import { exportUploads } from '@/use-cases/export-uploads'
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
					200: z.object({ url: z.string().url() }),
					400: z.object({ message: z.string().url() }),
				},
			},
		},
		async (_request, reply) => {
			const result = await exportUploads()
			return reply.code(200).send({ url: result.reportUrl })
		}
	)
}
