import { NotFoundError } from '@/errors/not-found-error'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq, sql } from 'drizzle-orm'

export async function incrementAccessCount(id: string): Promise<string> {
	const [updated] = await db
		.update(schema.links)
		.set({
			accessCount: sql`${schema.links.accessCount} + 1`,
		})
		.where(eq(schema.links.id, id))
		.returning()

	if (!updated) throw new NotFoundError('Link not found')

	return updated.id
}
