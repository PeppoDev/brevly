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
			{/* <div className="bg-white rounded-lg shadow-sm shadow-gray-200 p-6 w-full self-start relative"> */}
			{/* <div className="flex flex-col p-8 bg-gray-100 rounded-lg gap-8 min-w-[380px] font-normal"> */}

			{children}
		</div>
	)
}
