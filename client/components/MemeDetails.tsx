import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getmemeById } from '../apis/memes'

export default function MemeDetails() {
  const { memeId } = useParams()

  const memeDetailsQuery = useQuery(['memes', memeId], () =>
    getmemeById(memeId as string)
  )

  if (memeDetailsQuery.isError) {
    return <div>There was an error getting your meme</div>
  }

  if (memeDetailsQuery.isLoading) {
    return <div>Loading your meme</div>
  }

  return (
    <section className="meme-details">
      <h2>meme Details</h2>
      <div>
        <p>
          Image:{' '}
          <img
            src={memeDetailsQuery.data.memeUrl}
            alt={memeDetailsQuery.data.memeName}
          />
        </p>
      </div>
      <br />
      <h2>More to come...</h2>
    </section>
  )
}
