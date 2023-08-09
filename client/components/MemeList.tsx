import { getMemes } from '../apis/memes'
import { Link } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import MemeForm from './MemeForm'

import MemeListItem from './MemeListItem'

export default function MemeList() {
  const { data: memes, isError, isLoading } = useQuery(['memes'], getMemes)

  if (isError) {
    return <div>There was an error loading memes</div>
  }

  if (!memes || isLoading) {
    return <div>Loading memes...</div>
  }

  return (
    <>
      <section className="meme-list">
        <h2>Meme List</h2>
        <div>
          {memes.map((memes) => (
            <div key={memes.id}>
              <h3>
                <Link to={`${memes.id}`} id="link">
                  {memes.memeName}
                  <br></br>
                  <br></br>
                  <img src={memes.memeUrl} alt={memes.memeName} />
                </Link>
              </h3>
              <div>
                <MemeListItem
                  key={memes.id}
                  memeId={memes.id}
                  memeName={memes.memeName}
                  memeUrl={memes.memeUrl}
                />
                <br />
              </div>
            </div>
          ))}
        </div>

        <h2>Add A meme</h2>
        <MemeForm />
      </section>
    </>
  )
}
