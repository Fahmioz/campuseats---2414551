import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section>
      <h2 className="section-title">Page not found</h2>
      <Link to="/">Go to the home page</Link>
    </section>
  )
}

export default NotFoundPage
