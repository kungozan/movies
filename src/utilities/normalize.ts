import slugify from 'slugify'

export const normalize = (movie: string) => slugify(movie, { lower: true, strict: true })
