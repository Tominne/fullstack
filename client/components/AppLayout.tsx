import { Link, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <header className="header">
        <h1 className="title">A Collection of Memes</h1>
        <nav className="nav">
          <Link to="/">
            <p>Home</p>
          </Link>
        </nav>
      </header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}
