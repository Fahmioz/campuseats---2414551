import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  
  // Cart state: array of { item, qty } lines
  const [cart, setCart] = useState([])
  
  // View state: 'menu' | 'cart' | 'done'
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  // Fetch vendors in useEffect (Step B2)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const vendorList = Array.isArray(data) ? data : data.vendors
        setVendors(vendorList)
        if (vendorList && vendorList.length > 0) {
          setSelectedVendorId(vendorList[0].id)
        }
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  // Cart functions (Step B3)
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      if (existingLine) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            return { ...line, qty: line.qty + delta }
          }
          return line
        })
        .filter((line) => line.qty > 0) // Remove line if qty drops to 0 or below
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Compute total quantity for header badge using reduce
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // Determine view content
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, <strong>{lastOrder?.name}</strong>.</p>
        <p>Your pickup time: <strong>{lastOrder?.pickupTime}</strong> at Mahallah {lastOrder?.mahallah}.</p>
        <p>Total Paid: <strong>RM {lastOrder?.total.toFixed(2)}</strong></p>
        <button className="btn" onClick={() => setView('menu')}>Back to vendors</button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App