import axios from 'axios'

export async function incrementLinkAccessCount(
	id: string
): Promise<{ url: string }> {
	const response = await axios.patch(
		`${import.meta.env.VITE_BACKEND_URL}/link/${id}`
	)
	return response.data
}
