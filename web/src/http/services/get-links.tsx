import axios from 'axios'

interface Link {
	id: string
	shortUrl: string
	originalUrl: string
	accessCount: number
	createdAt: Date
}

export async function getLinks(): Promise<{ content: Link[] }> {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/link`)
	return response.data
}
