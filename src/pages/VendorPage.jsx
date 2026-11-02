import { Link, useParams, useSearchParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const [params, setParams] = useSearchParams()
  const category = params.get('cat') ?? ''
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">
          There is no vendor called "{id}".{' '}
          <Link to="/">Back to vendors</Link>
        </p>
      </section>
    )
  }

  const categories = ['All', ...new Set(vendor.menu.map((item) => item.category))]
  let items = vendor.menu
  if (category) {
    items = items.filter((item) => item.category === category)
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} · {vendor.openHours}</p>
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-filter${category === cat ? ' active' : ''}`}
            onClick={() => setParams({ cat: cat === 'All' ? '' : cat })}
          >
            {cat}
          </button>
        ))}
      </div>
      <MenuList items={items} />
    </section>
  )
}

export default VendorPage
