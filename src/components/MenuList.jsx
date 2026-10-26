import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  if (!items || items.length === 0) {
    return <p className="empty-message">No items on this menu yet.</p>
  }

  const categories = ['All', ...new Set(items.map((item) => item.category))]
  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory)

  return (
    <>
      <div className="category-filters" aria-label="Filter menu by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-filter${selectedCategory === category ? ' active' : ''}`}
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {filteredItems.length > 0 ? (
        <div className="grid">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <p className="empty-message">No items in this category.</p>
      )}
    </>
  )
}

export default MenuList