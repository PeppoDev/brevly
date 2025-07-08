export function Layout({ children }: React.PropsWithChildren) {
	return (
		<main className="bg-gray-200 sm:overflow-hidden sm:h-screen p-3">
			{children}
		</main>
	)
}
