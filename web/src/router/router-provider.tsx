import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
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

	{
		path: '/error/404',
		Component: NotFound,
	},
])

export function RouterProvider() {
	return <BaseProvider router={router} />
}
