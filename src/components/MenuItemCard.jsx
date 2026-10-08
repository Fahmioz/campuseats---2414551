function MenuItemCard() {
  const item = {
    name: 'Nasi Lemak Ayam',
    description: 'Coconut rice, fried chicken, sambal, egg and peanuts',
    price: 7.5,
    available: true,
  }

  return (
    <article className="card menu-item-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>
      <div>
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