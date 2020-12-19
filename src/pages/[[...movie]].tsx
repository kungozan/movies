import { GetStaticPaths, GetStaticProps } from 'next'
import getConfig from 'next/config'
import Head from 'next/head'

// components
import VideoPlayer from '../components/VideoPlayer'
import Poster from '../components/Poster'

// util
import { normalize } from '../utilities/normalize'

interface Movie {
  id: number;
  name: string;
  description: string;
  image: string;
  video: string;
}

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function Movie(props: { movie: Movie, allMovies: Movie[] }) {
  return (
    <main>
      <Head>
        <title>{props.movie.name}</title>
        <meta name="description" content={props.movie.description} />
        <meta name="og:type" content="video.movie" />
        <meta name="og:url" content={`${publicRuntimeConfig.domain}/${normalize(props.movie.name)}`} />
        <meta name="og:title" content={props.movie.name} />
        <meta name="og:description" content={props.movie.description} />
        <meta name="og:image" content={props.movie.image} />
        <meta name="og:video" content={props.movie.video} />
      </Head>
      <VideoPlayer src={props.movie.video} controls="custom" />
      <ul>
        {props.allMovies.map(movie => (
          <li key={movie.id}>
            <Poster {...movie} />
          </li>
        ))}
      </ul>

      <style jsx>{`
        main {
          max-width: 800px;
          margin: 50px auto;
        }

        ul {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr)); // works fine on mobile too, prefer to see as many as possible in connection the the video player
          grid-gap: 15px;
          padding: 0;
          list-style: none;
        }
      `}</style>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(serverRuntimeConfig.movieApi);
  const data: Movie[] = await response.json();
  const movie = context.params.movie ? data.find(movie => {
    return normalize(movie.name) === (Array.isArray(context.params.movie) ? context.params.movie.join('/') : context.params.movie)
  }) : data[0]

  if (!movie) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      movie,
      allMovies: data
    }
  }
}

// @ts-ignore, built in GetStaticPaths needs to be fixed by NextJS to allow boolean values for optional dynamic routes like this
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(serverRuntimeConfig.movieApi);
  const data: Movie[] = await response.json();

  // allow homepage and all movies to generate a page
  const paths = [{ params: { movie: false } }, ...data.map(movie => ({ params: { movie: [normalize(movie.name)] } }))]

  return {
    paths,
    fallback: false
  }
}
