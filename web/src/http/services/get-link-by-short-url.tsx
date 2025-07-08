import axios from 'axios'

export async function getLinkByShortUrl(
	shortUrl: string
): Promise<{ url: string; id: string }> {
	const response = await axios.get(
		`${import.meta.env.VITE_BACKEND_URL}/link/${shortUrl}`
	)
	return response.data
}
