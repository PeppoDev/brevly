import Home from '@/pages/home'
import Redirect from '@/pages/redirect'
import { RouterProvider as BaseProvider } from 'react-router'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Home,
	},
	{
		path: '/:shortUrl',
		Component: Redirect,
	},
])

export function RouterProvider() {
	return <BaseProvider router={router} />
}
