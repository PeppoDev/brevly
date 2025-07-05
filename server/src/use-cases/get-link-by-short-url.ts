import { NotFoundError } from '@/errors/not-found-error'
import { db } from '@/infra/db'

export async function getLinkByShortUrl(shortUrl: string) {
	const link = await db.query.links.findFirst({
		where: (el, { eq }) => eq(el.shortUrl, shortUrl),
	})
	if (!link) throw new NotFoundError(`Link not found with short URL ${shortUrl}`)

	return link
}
