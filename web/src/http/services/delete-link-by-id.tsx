import axios from 'axios'

export async function deleteLinkById(id: string): Promise<{ id: string }> {
	const response = await axios.delete(
		`${import.meta.env.VITE_BACKEND_URL}/link/${id}`
	)
	return response.data
}
