import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { desc } from 'drizzle-orm'

export async function getLinks() {
	const response = await db
		.select()
		.from(schema.links)
		.orderBy(desc(schema.links.createdAt))
	return response
}
