import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useCreateLink } from '@/http/hooks/use-create-link'
import { type LinkPayload, linkPayloadSchema } from '@/schemas/link-schema'
import { extractPathFromUrl } from '@/utils/extract-path-from-url'
import { triggerToast } from '@/utils/trigger-toast'
import { isAxiosError } from 'axios'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Card } from '../../../components/card'

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

	async function handleSubmit(payload: LinkPayload) {
		try {
			const shortUrlWithoutBase = extractPathFromUrl(payload.shortUrl)
			await mutateAsync({ ...payload, shortUrl: shortUrlWithoutBase })
			onSuccess()
		} catch (error: unknown) {
			onError(error)
		}
	}

	function onSuccess() {
		triggerToast('Link criado com sucesso!')
	}

	function onError(error: unknown) {
		if (isAxiosError(error) && error.response?.status === 409) {
			triggerToast('Já existe um link com essa URL encurtada', 'error')
			formik.resetForm({
				values: {
					originalUrl: formik.values.originalUrl,
					shortUrl: 'https://www.brev.ly/',
				},
			})
			return
		}

		formik.resetForm()
		triggerToast('Erro ao criar o link', 'error')
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
