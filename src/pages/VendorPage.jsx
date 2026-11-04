import { Link, useParams, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useAuth } from '../hooks/useAuth.js'

function VendorPage() {
  const { id } = useParams()
  const [params, setParams] = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const [category, setCategory] = useState('')
  const { vendors, loading, error, reload } = useVendors()

  useEffect(() => {
    async function loadPreferredCategory() {
      await Promise.resolve()
      if (authLoading) return

      const urlCategory = params.get('cat')
      if (urlCategory) {
        setCategory(urlCategory)
        return
      }

      if (!user) {
        setCategory('')
        return
      }

      const storageKey = `ce-category-${user.uid}`
      const savedCategory = localStorage.getItem(storageKey) ?? ''
      setCategory(savedCategory)
      if (savedCategory) setParams({ cat: savedCategory }, { replace: true })
    }

    loadPreferredCategory()
  }, [authLoading, params, setParams, user])

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
            onClick={() => {
              const nextCategory = cat === 'All' ? '' : cat
              setCategory(nextCategory)
              setParams({ cat: nextCategory })
              if (user) {
                localStorage.setItem(`ce-category-${user.uid}`, nextCategory)
              }
            }}
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
