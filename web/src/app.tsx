import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/layout'
import { RouterProvider } from './router/router-provider'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<RouterProvider />
			</Layout>
		</QueryClientProvider>
	)
}

export default App
