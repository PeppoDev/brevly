import axios from 'axios'

export interface LinkPayload {
	originalUrl: string
	shortUrl: string
}

export async function createLink(
	payload: LinkPayload
): Promise<{ id: string }> {
	const response = await axios.post(
		`${import.meta.env.VITE_BACKEND_URL}/link`,
		payload
	)
	return response.data
}
