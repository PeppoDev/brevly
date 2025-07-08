import z from 'zod'

const linkPayloadSchema = z.object({
	originalUrl: z
		.string()
		.nonempty('A URL original é obrigatória')
		.url('Insira uma URL válida'),

	shortUrl: z
		.string()
		.url('Insira uma URL válida')
		.regex(
			/^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]+\/[a-zA-Z0-9-_]+$/,
			'Sua URL encurtada deve estar no formato: brevly.com/caminho'
		)
		.nonempty('A URL encurtada é obrigatória'),
})

type LinkPayload = z.infer<typeof linkPayloadSchema>

export { linkPayloadSchema, type LinkPayload }
