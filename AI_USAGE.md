# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 3
- Tool(s): Claude Ai
- What I asked for: Help assisting with my Week 3 cart, checkout form, and personal feature. My matric number ends in 1, so the personal feature was filtering menu items by category.
- What I kept, changed or rejected, and why: I kept the category buttons, active-category highlight, and “All” reset. I also added working cart quantity and remove controls, derived totals, and controlled checkout fields with validation so orders only submit with valid details.
- One thing the AI got wrong and how I fixed it: The first category-filter version did not reset the selected category when switching vendors. I fixed this by giving the menu component a key based on the selected vendor ID.

## Week 4
- Tool(s): AI assistance
- What I asked for: Help assisting with custom hooks (useLocalStorage, useVendors, useCart), CartContext + CartProvider, Layout with Outlet, five pages with routes.
- What I kept, changed or rejected, and why: I kept the lab's folder structure (src/hooks, src/context, src/pages) and moved CartPage.jsx into pages/. I changed App.jsx to use BrowserRouter + Routes + CartProvider instead of local state, removed all prop-drilling from MenuList/Header/VendorCard, and added category filter buttons on VendorPage that update the URL search params. I rejected passing cart/count handlers as props and used useCart() everywhere instead.
- One thing the AI got wrong and how I fixed it: The first VendorPage filter used params.set() directly, which does not trigger navigation. I fixed it by destructuring setParams from useSearchParams() and calling setParams({ cat: ... }) on button click. Also fixed an ESLint rule about calling setState directly in an effect by wrapping the fetch in an async function inside useEffect.

## Week 5
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it: