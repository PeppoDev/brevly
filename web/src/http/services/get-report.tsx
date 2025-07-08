import axios from 'axios'

export async function getReport(): Promise<{ url: string }> {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report`)
	return response.data
}
