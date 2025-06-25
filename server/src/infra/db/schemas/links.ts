import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
	id: text()
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	originalUrl: text('original_url').notNull(),
	shortUrl: text('short_url').unique().notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
})
