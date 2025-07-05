import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function getLinks() {
	const response = await db.select().from(schema.links).limit(10)
	return response
}
