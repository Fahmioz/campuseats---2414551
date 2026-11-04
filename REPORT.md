# CampusEats Report

## 1. My Shop

My shop is **404 Kafe**, located at **IIUM Central Building, Ground Floor**.
It sells affordable Malaysian meals, noodles, drinks and breakfast items for
IIUM students. It is the first vendor in the vendor list and its route is
`/vendor/2414551-kafe-404`.

| Item | Category | Price (RM) | Description |
|---|---|---:|---|
| Nasi Ayam Penyet | Rice | 9.00 | Smashed fried chicken with sambal and rice |
| Air Bandung | Drinks | 3.00 | Rose syrup with milk |
| Nasi Goreng Kampung | Rice | 7.00 | Traditional fried rice with anchovies, water spinach, and bird's eye chili |
| Nasi Lemak Ayam Goreng | Rice | 8.50 | Fragrant coconut rice served with crispy fried chicken, anchovies, peanuts, cucumber, boiled egg, and sambal |
| Mee Goreng Mamak | Noodles | 6.50 | Stir-fried yellow noodles with tofu, potatoes, bean sprouts, and spicy sauce |
| Kuey Teow Goreng Kerang | Noodles | 7.00 | Wok-charred flat rice noodles tossed with cockles, chives, and egg |
| Roti Canai (2 pcs) with Dhal | Breakfast & Bites | 3.00 | Flaky flatbread served with hot lentil curry |
| Teh Tarik | Drinks | 2.50 | Hot pulled milk tea with a rich, frothy top |
| Iced Lemon Tea | Drinks | 3.50 | Refreshing black tea brewed with fresh lemon slices |
| Fresh Coconut Shake | Drinks | 5.50 | Blended young coconut water and flesh topped with vanilla ice cream |

**Figure 1.1.** Vendor list with 404 Kafe first.  
*Insert a screenshot of the home page here.*

**Figure 1.2.** 404 Kafe menu page at `/vendor/2414551-kafe-404`.  
*Insert a screenshot of the menu page here.*

**Figure 1.3.** Cart and checkout containing items from 404 Kafe.  
*Insert a screenshot after adding items and before submitting checkout here.*

**Figure 1.4.** Orders page after placing an order from 404 Kafe.  
*Insert a screenshot of `/orders` here.*

The vendor data is stored in
[`public/api/vendors.json`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/public/api/vendors.json).
404 Kafe is the first vendor in that file. The other vendors are
part of the provided vendor dataset and are not presented as my shop.

## 2. Design

### 2.1 Component tree

The reusable components are marked **[reused]**. Components specific to the
CampusEats feature are marked **[personal]**.

```text
App [personal]
└── BrowserRouter
    └── CartProvider [personal/shared state]
        └── Routes
            └── Layout [reused]
                ├── Header [reused]
                │   └── useCart
                ├── Outlet
                │   ├── HomePage [personal]
                │   │   ├── useVendors
                │   │   └── VendorCard [reused]
                │   ├── VendorPage [personal]
                │   │   ├── useVendors
                │   │   └── MenuList [reused]
                │   │       └── MenuItemCard [reused]
                │   ├── CartPage [personal]
                │   │   ├── CartItem [reused]
                │   │   └── CheckoutForm [personal]
                │   ├── OrdersPage [personal]
                │   └── NotFoundPage [reused]
                └── Footer [reused]
```

**Figure 2.1.** Component tree. The tree above is the report version of the
component tree; reusable components are labelled `[reused]`.

### 2.2 Where state lives

| State | Owner | Why here |
|---|---|---|
| `cart` | `CartProvider` in [`src/context/CartProvider.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/context/CartProvider.jsx), persisted through `useLocalStorage` | The header, menu cards, cart page and checkout flow all need to read or update the cart, so context is better than passing props through unrelated components. |
| `orders` | `CartProvider` in [`src/context/CartProvider.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/context/CartProvider.jsx), persisted through `useLocalStorage` | Orders must remain available when navigating from checkout to `/orders` and after refresh. |
| Vendor list | `vendors` in `useVendors` in [`src/hooks/useVendors.js`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/hooks/useVendors.js) | Both the home page and vendor page fetch the same API data, so the fetch/loading/error logic is kept in a reusable hook. |
| Loading and fetch error | `loading` and `error` in `useVendors` in [`src/hooks/useVendors.js`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/hooks/useVendors.js) | These values belong with the request lifecycle and are needed by both pages that fetch vendors. |
| Checkout form | `values` and `errors` in `CheckoutForm` in [`src/components/CheckoutForm.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/components/CheckoutForm.jsx) | Only the form edits and validates these temporary input values; higher components only need the valid submitted details. |
| Personal feature filter | The selected category is stored in the URL search parameter `cat`, read and changed with `useSearchParams` in [`src/pages/VendorPage.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/pages/VendorPage.jsx) | The category is shareable and survives navigation/refresh through the URL. It is not duplicated as local React state. |
| Selected vendor | The route parameter `id`, read with `useParams` in [`src/pages/VendorPage.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/pages/VendorPage.jsx) | The selected vendor is now part of the URL (`/vendor/:id`), so it is route data rather than separate component state. |

### 2.3 One action traced: Add to cart

1. The user clicks **Add to cart** in `MenuItemCard` in
   [`src/components/MenuItemCard.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/components/MenuItemCard.jsx).
2. The button calls the `onAdd` prop with the selected `item`.
3. `MenuList` in [`src/components/MenuList.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/components/MenuList.jsx)
   supplies `addToCart` from `useCart` as that prop.
4. `useCart` in [`src/hooks/useCart.js`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/hooks/useCart.js)
   reads the context created by `CartProvider`.
5. `addToCart` in [`src/context/CartProvider.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/context/CartProvider.jsx)
   updates the cart, increasing an existing quantity or adding a new line.
6. `useLocalStorage` writes the updated cart to `campuseats-cart`.
7. React re-renders the provider consumers: the header count changes and the
   cart page shows the new line when opened.

## 3. My Personal Feature

My matric number ends in **1**. My personal feature is a **menu category
filter**. On a vendor page, the user can choose All, Rice, Noodles, Drinks or
Sides. The chosen category is written to the URL as `?cat=...`, and the menu
then displays only matching items. Selecting All removes the parameter.

Relevant excerpt from [`src/pages/VendorPage.jsx`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/src/pages/VendorPage.jsx):

```jsx
const [params, setParams] = useSearchParams()
const category = params.get('cat') ?? ''
const categories = ['All', ...new Set(vendor.menu.map((item) => item.category))]
let items = vendor.menu
if (category) {
  items = items.filter((item) => item.category === category)
}

return (
  <section>
    <p><Link to="/">← All vendors</Link></p>
    <h2 className="section-title">{vendor.name}</h2>
    <div className="category-filters">
      {categories.map((cat) => (
        <button key={cat} type="button"
          onClick={() => setParams({ cat: cat === 'All' ? '' : cat })}>
          {cat}
        </button>
      ))}
    </div>
```

The `category` value comes from the URL, `items` is derived from the vendor
menu, and `setParams` updates the URL when a filter button is clicked. This
keeps the filtered view refreshable and shareable.

**Figure 3.1.** Personal category-filter feature using 404 Kafe's
menu.  
*Insert a screenshot showing the `Rice` filter selected and only the two rice
items visible.*

## 4. Testing and Reflection

### 4.1 What I checked

| Check | Expected | Result |
|---|---|---|
| Deep link to `/vendor/2414551-kafe-404` | 404 Kafe's menu loads directly | Pass: the route loads the vendor and its nine menu items. |
| Cart survives refresh | Previously added lines and quantities remain | Pass: the cart is persisted under `campuseats-cart` in local storage. |
| Checkout validation | Missing/invalid name, Mahallah or pickup time shows an error and does not submit | Pass: `CheckoutForm` validates name length, Mahallah selection and the 07:00–22:00 time range. |
| `/vendor/zzz` | Shows “Vendor not found” | Pass: `VendorPage` renders the not-found message when no vendor matches the route id. |
| `/nothing` | Shows the 404 page | Pass: the wildcard route renders `NotFoundPage`. |
| Place an order | Navigates to `/orders` and empties the cart | Pass: `placeOrder` stores the order, clears the cart, and `CartPage` navigates to `/orders`. |
| Category filter | Only items in the chosen category are shown and the URL changes | Pass: `useSearchParams` stores `cat` and the menu is filtered from that value. |

### 4.2 One bug I fixed

The first category-filter implementation used local filter state, which could
retain the previous selected category when the user changed vendors. I found
the cause by switching between vendor pages and changed the final design to
store the category in the URL with `useSearchParams`. This means the current
vendor and category are both derived from the URL, so the filter does not
become stale across navigation. I also fixed the URL update implementation:
the final version uses `setParams` returned by `useSearchParams`, rather than
mutating the `URLSearchParams` object directly.

### 4.3 One decision I would change

I would initially have kept the cart and order logic in a dedicated context
from the beginning rather than moving it there later. Local component state and
prop passing are workable for a small first version, but the header, menu,
cart, checkout and orders pages all share the same data. Starting with
`CartProvider` would have reduced the later refactor and made persistence and
cross-page updates clearer earlier.

## AI Use Statement

I used AI assistance during Weeks 3 and 4 to help with the cart, checkout
validation, category-filter feature, custom hooks, context, routing and
component structure. I checked the suggestions by reading the generated code,
running the app, testing the routes and interactions, and correcting issues
such as URL parameter updates and vendor filter reset behaviour. Full weekly
details are recorded in [`AI_USAGE.md`](C:/Users/mohdf/OneDrive/Desktop/UIA/SEM%205/Cross%20Platform/campuseats---2414551/AI_USAGE.md).

## Declaration

I declare that this report and the code at the stated tag are my own work,
and that I can explain every part of them. AI use is disclosed above and in
`AI_USAGE.md`.

Signature: ______________  
Date: ________
