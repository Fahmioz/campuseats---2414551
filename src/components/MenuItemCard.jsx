function MenuItemCard({ item }) {
  return (
    <article className="card menu-item-card">
      <div className="thumb-container">
        <div className="thumb" aria-hidden="true">
          {item.name.charAt(0)}
        </div>
        <span className="badge">{item.category}</span>
      </div>
      
      <div className="card-body">
        <h2>{item.name}</h2>
        <p className="muted">{item.description}</p>
        <p className="price">RM {item.price.toFixed(2)}</p>
        <button disabled={!item.available}>
          {item.available ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </article>
  )
}

export default MenuItemCard