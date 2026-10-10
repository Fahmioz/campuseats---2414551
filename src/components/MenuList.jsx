import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items }) {
  if (!items || items.length === 0) {
    return <p className="empty-message">No items on this menu yet.</p>
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MenuList