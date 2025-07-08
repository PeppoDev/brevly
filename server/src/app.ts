import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { linkController } from './controllers/link.controller'
import { reportController } from './controllers/report.controller'
import { env } from './env'
import { errorHandler } from './middlewares/error-handler'

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
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
})

server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

server.setErrorHandler(errorHandler)

server.register(linkController)
server.register(reportController)

server.listen({ port: env.PORT, host: env.HOST }, () => {
	console.log(`HTTP server running on port ${env.PORT}`)
})
