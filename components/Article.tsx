import type { Article as ArticleType } from '@/lib/vogue'

export function Article({ article }: { article: ArticleType }) {
	return (
		<div className="@container">
			<a href={article.url}>
				<article className="flex flex-col @sm:flex-row lg:flex-row gap-8">
					<picture className="rounded-2xl overflow-hidden h-fit max-w-xs aspect-square">
						<img alt={article.picture.image.alt} src={article.picture.image.src}></img>
						{article.picture.sources.map((s) => (
							<source key={s.media} media={s.media} srcSet={s.srcset} sizes={s.sizes}></source>
						))}
					</picture>
					<div className="gap-2 flex flex-col grow">
						<div className="flex gap-4 items-center">
							<p className="text-sm text-gray-600 whitespace-nowrap">{article.publishedAt}</p>
							<div className="rounded-2xl bg-gray-100  text-gray-800 py-0.5 px-3 text-sm truncate">
								{article.rubric}
							</div>
						</div>
						<h2 className="text-lg font-semibold leading-6 max-w-md">{article.title}</h2>
						<p className="text-gray-600 uppercase text-sm font-light">{article.author}</p>
					</div>
				</article>
			</a>
		</div>
	)
}
