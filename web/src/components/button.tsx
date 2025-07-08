import { type VariantProps, tv } from 'tailwind-variants'

type ButtonProps = VariantProps<typeof buttonVariants> & {
	children?: React.ReactNode
	onClick?: () => void
	disabled?: boolean
	className?: string
	icon?: React.ReactNode
	type?: 'button' | 'submit' | 'reset'
}

const buttonVariants = tv({
	base: 'bg-blue-base rounded-lg h-12 w-full text-white cursor-pointer font-semibold hover:bg-blue-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none transition-all [&>svg]:text-gray-600',
	variants: {
		variant: {
			primary: '',
			secondary:
				'border border-gray-200 w-auto p-2 bg-gray-200 text-gray-500 flex items-center gap-1.5 text-xs hover:bg-gray-200 hover:border hover:border-blue-base',
			icon: 'border border-gray-200 w-auto h-auto p-2 bg-gray-200 rounded-sm flex items-center gap-1.5 text-xs hover:bg-gray-200 hover:border hover:border-blue-base',
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
})

export function Button({
	children,
	onClick,
	disabled,
	variant,
	className,
	icon,
	type = 'button',
}: ButtonProps) {
	return (
		<button
			className={buttonVariants({ variant, className })}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{icon}
			{children}
		</button>
	)
}
