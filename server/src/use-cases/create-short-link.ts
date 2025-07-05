import { ConflictError } from '@/errors/conflict-error'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

interface CreateShortLinkParams {
	originalUrl: string
	shortUrl: string
}

export async function createShortLink({
	originalUrl,
	shortUrl,
}: CreateShortLinkParams): Promise<string> {
	const alreadyExistentLink = await db.query.links.findFirst({
		where: (el, { eq }) => eq(el.shortUrl, shortUrl),
	})

	if (alreadyExistentLink)
		throw new ConflictError(`Short URL "${shortUrl}" already exists.`)

	const [createdLink] = await db
		.insert(schema.links)
		.values({
			originalUrl,
			shortUrl,
		})
		.returning()

	return createdLink.id
}
