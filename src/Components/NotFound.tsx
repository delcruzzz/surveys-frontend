import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <main className="notFoundPage">
      <div>
        <h1>404 not found</h1>
        <Link to='/'>Volver a la anterior</Link>
      </div>
    </main>
  )
}
