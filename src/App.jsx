import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuItemCard from './components/MenuItemCard.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      
      <main className="container">
        <section className="section">
          <h2>Today's vendors</h2>
          <div className="grid">
            <VendorCard />
          </div>
        </section>

        <section className="section">
          <h2>Popular items</h2>
          <div className="grid">
            <MenuItemCard />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App