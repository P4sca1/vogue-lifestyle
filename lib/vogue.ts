import { JSDOM, VirtualConsole } from 'jsdom'

type Picture = {
	image: { alt: string; src: string }
	sources: PictureSource[]
}

type PictureSource = {
	media: string
	srcset: string
	sizes: string
}

export type Article = {
	title: string
	rubric: string
	author: string
	url: string
	picture: Picture
	publishedAt: string
}

export async function fetchArticles() {
	const dom = await JSDOM.fromURL('https://www.vogue.de/lifestyle', {
		virtualConsole: new VirtualConsole(),
	})
	const doc = dom.window.document
	const articles: Article[] = []

	doc.querySelectorAll('.summary-item').forEach((elem) => {
		const title = elem.querySelector<HTMLHeadingElement>('h2.summary-item__hed')?.textContent
		const rubric = elem.querySelector<HTMLDivElement>('div.rubric > span')?.textContent
		const author = elem.querySelector<HTMLSpanElement>('span.byline__name')?.textContent
		const url = elem.querySelector<HTMLLinkElement>('a.summary-item__hed-link')?.href
		const publishedAt = elem.querySelector<HTMLTimeElement>(
			'time.summary-item__publish-date'
		)?.textContent
		const img = elem.querySelector<HTMLImageElement>('picture.summary-item__image img')

		if (!title || !rubric || !author || !url || !publishedAt || !img) return

		const picture: Picture = {
			image: { alt: img.alt, src: img.src },
			sources: [],
		}

		elem
			.querySelectorAll<HTMLSourceElement>('picture.summary-item__image source')
			.forEach((src) => {
				picture.sources.push({
					media: src.media,
					srcset: src.srcset,
					sizes: src.sizes,
				})
			})

		articles.push({ title, rubric, author, url, picture, publishedAt })
	})

	return articles
}
