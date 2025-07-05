import { ApiError } from '@/errors/api-error'
import type { FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply
			.status(400)
			.send({ message: 'Validation error', issues: error.validation })
	}

	if (error instanceof ApiError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		})
	}

	return reply.status(500).send({ message: 'Internal server error.' })
}
