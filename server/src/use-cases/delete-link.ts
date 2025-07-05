import { NotFoundError } from '@/errors/not-found-error'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'

export async function deleteLink(id: string): Promise<string> {
	const [deleted] = await db
		.delete(schema.links)
		.where(eq(schema.links.id, id))
		.returning()
	if (!deleted) throw new NotFoundError('Link not found')
	return deleted.id
}
