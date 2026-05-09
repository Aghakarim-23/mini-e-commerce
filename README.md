# E-Commerce App

A simple e-commerce product listing app built with React and TypeScript.

## What it does

- Shows all products on the home page
- Filter products by category
- Search products in real time
- Click on a product to see its details

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Vite

## API

All data comes from [DummyJSON](https://dummyjson.com/products).

| What | Endpoint |
|---|---|
| All products | `GET /products` |
| Categories | `GET /products/categories` |
| By category | `GET /products/category/{slug}` |
| Single product | `GET /products/{id}` |
| Search | `GET /products/search?q={query}` |

## Project Structure

```
src/
├── api/
│   └── axios.ts        # axios setup with base URL
├── components/
│   ├── Products.tsx    # product grid + search + category filter
│   └── ProductCard.tsx # single product card
├── pages/
│   ├── Home.tsx        # home page
│   └── ProductDetail.tsx # product detail page
└── types/
    └── product.ts      # TypeScript types
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Features

- Category filter updates the URL (e.g. `?category=beauty`)
- Search also updates the URL (e.g. `?q=phone`)
- So you can share links and the browser back button works
- Skeleton loading while data is fetching
- Responsive grid (1 → 2 → 3 → 4 columns)
