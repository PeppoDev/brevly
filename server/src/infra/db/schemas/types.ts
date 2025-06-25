import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { schema } from '.'

export type LinksOutput = InferSelectModel<typeof schema.links>
export type LinksInsert = InferInsertModel<typeof schema.links>
