import type { Article as ArticleType } from '@/lib/vogue'
import { useState } from 'react'

export function Article({ article }: { article: ArticleType }) {
	return (
		<div className="@container">
			<a href={article.url}>
				<article className="flex flex-col gap-4 @sm:flex-row @sm:gap-8 lg:flex-row">
					<picture className="aspect-square h-fit w-full overflow-hidden rounded-2xl bg-gray-50 @sm:w-64">
						<img alt={article.picture.image.alt} src={article.picture.image.src}></img>
						{article.picture.sources.map((s) => (
							<source key={s.media} media={s.media} srcSet={s.srcset} sizes={s.sizes}></source>
						))}
					</picture>
					<div className="flex grow flex-col gap-2">
						<div className="flex items-center gap-4">
							<p className="whitespace-nowrap text-sm text-gray-600">{article.publishedAt}</p>
							<div className="truncate rounded-2xl  bg-gray-100 py-0.5 px-3 text-sm text-gray-800">
								{article.rubric}
							</div>
						</div>
						<h2 className="max-w-md text-lg font-semibold leading-6">{article.title}</h2>
						<p className="text-sm font-light uppercase text-gray-600">{article.author}</p>
					</div>
				</article>
			</a>
		</div>
	)
}
