import type { ReactNode } from 'react'

type CardProps = {
	children: ReactNode
	className?: string
}

export function Card({ children, className }: CardProps) {
	return (
		<div
			className={`p-8 bg-gray-100 rounded-lg w-full h-fit font-normal ${className}`}
		>
			{children}
		</div>
	)
}
