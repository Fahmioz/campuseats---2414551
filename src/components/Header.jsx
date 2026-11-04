import { NavLink } from 'react-router'
import { signOut } from 'firebase/auth'
import { useCart } from '../hooks/useCart.js'
import { auth } from '../firebase.js'
import { useAuth } from '../hooks/useAuth.js'

function Header() {
  const { count } = useCart()
  const { user, loading } = useAuth()

  return (
    <header className="header">
      <NavLink to="/" className="logo-link">
        <h1 className="logo">CampusEats</h1>
      </NavLink>
      <nav className="nav">
        <NavLink to="/" end>Vendors</NavLink>
        {!loading && user && (
          <>
            <NavLink to="/orders">My Orders</NavLink>
            <NavLink to="/cart" className="cart">
              Cart <span className="badge">{count}</span>
            </NavLink>
            <span className="user-name">{user.displayName || user.email}</span>
            <button className="link" type="button" onClick={() => signOut(auth)}>Log out</button>
          </>
        )}
        {!loading && !user && <NavLink to="/login">Log in</NavLink>}
      </nav>
    </header>
  )
}

export default Header
