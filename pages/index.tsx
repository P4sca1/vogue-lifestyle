import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { fetchArticles, Article as ArticleType } from '@/lib/vogue'
import { Article } from '@/components/Article'

type Props = { articles: ArticleType[] | null }

export const getStaticProps: GetStaticProps<Props> = async () => {
	const articles = await fetchArticles().catch(() => null)
	return { props: { articles }, revalidate: 60 }
}

const Home: NextPage<Props> = (props) => {
	const { data, error } = useSWR<ArticleType[]>('articles', {
		fetcher: () => fetch('/api/articles').then((res) => res.json()),
		fallback: { articles: props.articles },
		revalidateOnMount: false,
	})

	return (
		<>
			<Head>
				<title>Vogue Lifestyle</title>
				<meta name="description" content="Die neuesten Vogue Lifestyle Artikel" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Vogue Lifestyle
				</h1>
				<p className="mt-1 mb-12 text-lg leading-8 text-gray-600">
					Die neuesten Vogue Lifestyle Artikel
				</p>

				{error && !data && (
					<div className="mb-12 border-l-4 border-red-600 bg-red-50 px-4 py-2 text-red-900">
						Fehler beim Laden der Artikel
					</div>
				)}
				{data && (
					<ul className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
						{data.map((a) => (
							<li key={a.url}>
								<Article article={a}></Article>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}

export default Home
