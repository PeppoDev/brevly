import icon404 from '@/assets/404.svg'

export default function NotFoundPage() {
	return (
		<main className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
			<section
				role="alert"
				aria-label="Página não encontrada"
				className="bg-white p-10 rounded-2xl shadow-lg max-w-xl w-full text-center flex flex-col items-center gap-6"
			>
				<img
					src={icon404}
					alt="Página não encontrada"
					className="h-28 w-auto mt-8"
				/>
				<h1 className="text-2xl font-semibold text-gray-800">
					Link não encontrado
				</h1>
				<p className="text-gray-500 text-sm mb-8 max-w-md">
					O link que você está tentando acessar não existe, foi removido ou é
					uma URL inválida. Saiba mais em{' '}
					<a
						href={window.location.origin}
						className="text-blue-600 underline hover:text-blue-800 transition-colors"
						target="_self"
						rel="noopener noreferrer"
					>
						brev.ly
					</a>
					.
				</p>
			</section>
		</main>
	)
}
