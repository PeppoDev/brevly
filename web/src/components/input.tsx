import { WarningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const inputContainerVariant = tv({
	base: 'flex items-center w-full h-12 px-4 rounded-md border border-gray-300 focus-within:outline-none focus-within:border-[1.5px] focus-within:border-blue-base caret-blue-base focus-within:placeholder:text-transparent',
	variants: {
		hasError: {
			true: 'border-feedback-danger border-[1.5px] focus-within:border-feedback-danger',
		},
	},
})

type InputLabelProps = {
	label: string
	id?: string
}

function InputLabel({ label, id }: InputLabelProps) {
	return (
		<label
			htmlFor={id}
			className="text-xxs text-gray-500 group-aria-invalid:text-feedback-danger!"
		>
			{label}
		</label>
	)
}

type InputFieldProps = ComponentProps<'input'> & {
	prefix?: string
}

function InputField({ prefix, ...props }: InputFieldProps) {
	return (
		<>
			{prefix && <span className="text-sm text-gray-400">{prefix}</span>}
			<input
				type="text"
				className="w-full h-full text-sm placeholder-gray-400 outline-none"
				{...props}
			/>
		</>
	)
}

type InputErrorProps = {
	errorMessage: string
}

function InputError({ errorMessage }: InputErrorProps) {
	return (
		<div className="flex items-center gap-2">
			<WarningIcon weight="bold" size={16} className="text-feedback-danger" />
			<span className="text-sm text-gray-500">{errorMessage}</span>
		</div>
	)
}

type InputProps = ComponentProps<'input'> & {
	label: string
	errorMessage?: string
	prefix?: string
}

export function Input({
	errorMessage,
	label,
	prefix,
	id,
	...props
}: InputProps) {
	const hasError = Boolean(errorMessage)

	return (
		<div
			className="flex flex-col gap-2 focus-within:[&>label]:text-blue-base focus-within:[&>label]:font-bold group"
			aria-invalid={hasError}
		>
			<InputLabel label={label} id={id} />
			<div className={inputContainerVariant({ hasError })}>
				<InputField prefix={prefix} id={id} {...props} />
			</div>
			{errorMessage && <InputError errorMessage={errorMessage} />}
		</div>
	)
}
