# ScootEats (Food Delivery App)

This project is a mini food-delivery website with a C++ OOP backend model and a live C++ HTTP API server.

## Features
- Three user roles: customer, restaurant owner, delivery partner
- Restaurant menus with unique cuisines
- Veg / non-veg classification
- Search bar (restaurant, cuisine, item)
- Add-to-cart with automatic subtotal calculation
- Promo code engine:
  - Flat discount (`SAVE100`)
  - Percentage discount (`FEAST20`)
- Payment simulation and order placement
- Auto-progress order tracking
- Customer feedback form
- Bright, professional UI with scooter delivery mascot

## Project Structure
- `index.html` - UI structure
- `styles.css` - bright + professional styling
- `script.js` - frontend interactions + API integration
- `backend/main.cpp` - OOP + STL backend simulation
- `backend/server.cpp` - C++ API + static file server
- `backend/vendor/httplib.h` - single-header HTTP library

## Run Full App (Recommended)
```bash
cd backend
g++ -std=c++17 server.cpp -pthread -o server
./server
```

Then open: `http://localhost:8080/index.html`

This serves:
- Frontend files
- `GET /api/restaurants`
- `GET /api/promos`
- `POST /api/order`
- `POST /api/feedback`

## Run C++ Backend Demo
```bash
cd backend
g++ -std=c++17 main.cpp -o app
./app
```
