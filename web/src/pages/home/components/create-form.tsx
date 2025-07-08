import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useCreateLink } from '@/http/hooks/use-create-link'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Card } from './card'

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

const extractPathFromShortUrl = (shortUrl: string): string => {
	const pathMatch = shortUrl.match(/^https?:\/\/(www\.)?[^\/]+\/(.+)$/)
	return pathMatch?.[2] ?? ''
}

type LinkPayload = z.infer<typeof linkPayloadSchema>

export function CreateForm() {
	const { mutateAsync } = useCreateLink()

	const formik = useFormik<LinkPayload>({
		initialValues: {
			originalUrl: '',
			shortUrl: '',
		},
		validate: withZodSchema(linkPayloadSchema),
		onSubmit: async values => handleSubmit(values),
	})

	const handleSubmit = async (payload: LinkPayload) => {
		const shortUrlWithoutBase = extractPathFromShortUrl(payload.shortUrl)
		await mutateAsync({ ...payload, shortUrl: shortUrlWithoutBase })
	}

	const getProps = (field: keyof LinkPayload) => ({
		id: field,
		name: field,
		value: formik.values[field],
		onChange: formik.handleChange,
		onBlur: formik.handleBlur,
		errorMessage:
			formik.touched[field] && formik.errors[field]
				? formik.errors[field]
				: undefined,
	})

	return (
		<Card className="max-w-[380px]">
			<h2 className="text-lg font-bold text-gray-600">Novo Link</h2>

			<div className="flex flex-col gap-4 my-8">
				<Input
					{...getProps('originalUrl')}
					label="LINK ORIGINAL"
					placeholder="www.example.com"
				/>
				<Input
					{...getProps('shortUrl')}
					label="LINK ENCURTADO"
					placeholder="brev.ly/"
				/>
			</div>

			<Button type="submit" onClick={formik.handleSubmit}>
				Salvar Link
			</Button>
		</Card>
	)
}
