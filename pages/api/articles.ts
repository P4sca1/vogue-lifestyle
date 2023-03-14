import type { NextApiRequest, NextApiResponse } from 'next'
import { Article, fetchArticles } from '@/lib/vogue'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Article[]>) {
	try {
		const articles = await fetchArticles()
		res.status(200).json(articles)
	} catch (err) {
		console.error(err)
		res.status(500).end()
	}
}
