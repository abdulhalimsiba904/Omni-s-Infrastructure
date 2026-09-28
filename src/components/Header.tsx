import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const { totalQuantity } = useCart()

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label="Omni Industrial and Building Supplies home">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span className="brand-name">Omni Industrial<br />and Building Supplies</span>
        </NavLink>
        <nav className="main-navigation" aria-label="Main navigation">
          {navigation.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            className={({ isActive }) => isActive ? 'nav-link active cart-nav-link' : 'nav-link cart-nav-link'}
            aria-label={`Cart, ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`}
          >
            Cart <span className="cart-count" aria-hidden="true">{totalQuantity}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
