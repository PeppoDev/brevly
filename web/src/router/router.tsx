import Home from '@/pages/home'
import Redirect from '@/pages/redirect'
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
