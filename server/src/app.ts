import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { linkController } from './controllers/link.controller'
import { env } from './env'
import { reportController } from './controllers/report.controller'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyMultipart)
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'brevly server',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

server.register(fastifyCors, {
	origin: '*',
})

server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

server.setErrorHandler((error, _, reply) => {

	console.log(error)
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply
			.status(400)
			.send({ message: 'Validation error', issues: error.validation })
	}
	return reply.status(500).send({ message: 'Internal server error' })
})

server.register(linkController)
server.register(reportController)

server.listen({ port: env.PORT, host: env.HOST }, () => {
	console.log(`HTTP server running on port ${env.PORT}`)
})
