import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { type Either, makeRight } from '@/shared/either'
import { stringify } from 'csv-stringify'
import { uploadFileToStorage } from '@/infra/storage/upload'

type ExportUploadsOutput = {
    reportUrl: string
}

export async function exportUploads(): Promise<Either<never, ExportUploadsOutput>> {
    const { sql, params: sqlParams } = db
        .select()
        .from(schema.links)
        .toSQL()

    const cursor = pg.unsafe(sql, sqlParams as string[]).cursor(1)

    const csv = stringify({
        delimiter: ',',
        header: true,
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'originalUrl', header: 'Original Url' },
            { key: 'shortUrl', header: 'Short Url' },
            { key: 'created_at', header: 'Created at' },
        ],
    })

    const pipelinePassThroughStream = new PassThrough()

    const uploadCsv = uploadFileToStorage({
        contentType: 'text/csv',
        fileName: `${new Date().toISOString()}-links.csv`,
        folder: 'downloads',
        contentStream: pipelinePassThroughStream,
    })

    const pipelineStream = pipeline(
        cursor,
        new Transform({
            objectMode: true,
            transform(chunks: unknown[], _encoding, callback) {
                for (const chunk of chunks) {
                    this.push(normalizeData(chunk))
                }
                callback()
            },
        }),
        csv,
        pipelinePassThroughStream
    )

    const [{ url }] = await Promise.all([uploadCsv, pipelineStream])

    return makeRight({ reportUrl: url })
}


export function normalizeData(chunk: any) {
    return ({
        id: chunk.id,
        originalUrl: chunk.original_url,
        shortUrl: `https://brevly.com/${chunk.short_url}`,
        created_at: chunk.created_at,
    })
}
