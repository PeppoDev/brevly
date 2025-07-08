export function CircularLoading() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-32">
			<div
				className="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] h-6 w-6 primary text-blue-base"
				aria-label="Loading"
			>
				<span className="sr-only">Loading</span>
			</div>
		</div>
	)
}
