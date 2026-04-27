const fallbackRestaurants = [
  { id: 1, name: "Spice Symphony", cuisine: "Indian", menu: [
    { id: 101, name: "Paneer Tikka", price: 220, type: "veg" },
    { id: 102, name: "Butter Chicken", price: 280, type: "non-veg" },
    { id: 103, name: "Dal Makhani", price: 190, type: "veg" },
    { id: 104, name: "Chicken Biryani", price: 320, type: "non-veg" },
    { id: 105, name: "Tandoori Roti Basket", price: 120, type: "veg" }
  ]},
  { id: 2, name: "Dragon Bowl", cuisine: "Chinese", menu: [
    { id: 201, name: "Veg Hakka Noodles", price: 180, type: "veg" },
    { id: 202, name: "Chilli Chicken", price: 250, type: "non-veg" },
    { id: 203, name: "Schezwan Fried Rice", price: 210, type: "veg" },
    { id: 204, name: "Kung Pao Chicken", price: 290, type: "non-veg" },
    { id: 205, name: "Spring Rolls", price: 170, type: "veg" }
  ]},
  { id: 3, name: "Roma Slice", cuisine: "Italian", menu: [
    { id: 301, name: "Margherita Pizza", price: 240, type: "veg" },
    { id: 302, name: "Chicken Lasagna", price: 300, type: "non-veg" },
    { id: 303, name: "Pesto Penne", price: 260, type: "veg" },
    { id: 304, name: "Pepperoni Pizza", price: 340, type: "non-veg" },
    { id: 305, name: "Mushroom Risotto", price: 280, type: "veg" }
  ]},
  { id: 4, name: "Mexi Fiesta", cuisine: "Mexican", menu: [
    { id: 401, name: "Bean Burrito", price: 210, type: "veg" },
    { id: 402, name: "Chicken Tacos", price: 260, type: "non-veg" },
    { id: 403, name: "Cheese Quesadilla", price: 230, type: "veg" },
    { id: 404, name: "Beef Nachos", price: 320, type: "non-veg" },
    { id: 405, name: "Veg Enchilada", price: 250, type: "veg" }
  ]},
  { id: 5, name: "Sushi Harbor", cuisine: "Japanese", menu: [
    { id: 501, name: "Avocado Maki", price: 280, type: "veg" },
    { id: 502, name: "Salmon Nigiri", price: 360, type: "non-veg" },
    { id: 503, name: "Veg Ramen", price: 300, type: "veg" },
    { id: 504, name: "Chicken Katsu", price: 340, type: "non-veg" },
    { id: 505, name: "Tofu Teriyaki Bowl", price: 290, type: "veg" }
  ]},
  { id: 6, name: "Mediterra", cuisine: "Mediterranean", menu: [
    { id: 601, name: "Falafel Wrap", price: 220, type: "veg" },
    { id: 602, name: "Chicken Shawarma Plate", price: 310, type: "non-veg" },
    { id: 603, name: "Hummus Platter", price: 200, type: "veg" },
    { id: 604, name: "Lamb Kofta", price: 360, type: "non-veg" },
    { id: 605, name: "Stuffed Grape Leaves", price: 240, type: "veg" }
  ]},
  { id: 7, name: "Soul South", cuisine: "South Indian", menu: [
    { id: 701, name: "Masala Dosa", price: 150, type: "veg" },
    { id: 702, name: "Chicken Chettinad", price: 290, type: "non-veg" },
    { id: 703, name: "Idli Sambar", price: 110, type: "veg" },
    { id: 704, name: "Fish Curry", price: 330, type: "non-veg" },
    { id: 705, name: "Curd Rice", price: 130, type: "veg" }
  ]},
  { id: 8, name: "Grill Station", cuisine: "American", menu: [
    { id: 801, name: "Veggie Burger", price: 230, type: "veg" },
    { id: 802, name: "BBQ Chicken Burger", price: 310, type: "non-veg" },
    { id: 803, name: "Cheesy Fries", price: 170, type: "veg" },
    { id: 804, name: "Smoked Wings", price: 330, type: "non-veg" },
    { id: 805, name: "Mac & Cheese", price: 260, type: "veg" }
  ]},
  { id: 9, name: "Thai Terrace", cuisine: "Thai", menu: [
    { id: 901, name: "Green Curry Tofu", price: 270, type: "veg" },
    { id: 902, name: "Red Curry Chicken", price: 320, type: "non-veg" },
    { id: 903, name: "Pad Thai Veg", price: 250, type: "veg" },
    { id: 904, name: "Basil Chicken Rice", price: 300, type: "non-veg" },
    { id: 905, name: "Mango Sticky Rice", price: 190, type: "veg" }
  ]},
  { id: 10, name: "Paris Oven", cuisine: "French", menu: [
    { id: 1001, name: "Ratatouille", price: 280, type: "veg" },
    { id: 1002, name: "Chicken Cordon Bleu", price: 390, type: "non-veg" },
    { id: 1003, name: "French Onion Soup", price: 230, type: "veg" },
    { id: 1004, name: "Herb Roast Chicken", price: 370, type: "non-veg" },
    { id: 1005, name: "Mushroom Crepe", price: 260, type: "veg" }
  ]}
];

const fallbackPromos = {
  SAVE100: { mode: "flat", value: 100 },
  FEAST20: { mode: "percent", value: 20 }
};

let restaurants = [];
let promos = {};
const cart = [];
const placedOrders = [];
let appliedPromo = null;
let trackingTimer = null;
let currentUser = null;

const loginSectionEl = document.getElementById("loginSection");
const dashboardHeaderEl = document.getElementById("dashboardHeader");
const customerDashboardEl = document.getElementById("customerDashboard");
const ownerDashboardEl = document.getElementById("ownerDashboard");
const deliveryDashboardEl = document.getElementById("deliveryDashboard");
const welcomeTextEl = document.getElementById("welcomeText");
const roleInfoEl = document.getElementById("roleInfo");

const restaurantListEl = document.getElementById("restaurantList");
const searchInputEl = document.getElementById("searchInput");
const filterEl = document.getElementById("foodTypeFilter");
const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotalValue");
const discountEl = document.getElementById("discountValue");
const finalEl = document.getElementById("finalValue");
const paymentMsgEl = document.getElementById("paymentMsg");
const trackingStatusEl = document.getElementById("trackingStatus");
const promoInputEl = document.getElementById("promoInput");
const ownerRestaurantCardsEl = document.getElementById("ownerRestaurantCards");
const ownerOrdersListEl = document.getElementById("ownerOrdersList");
const deliveryOrdersListEl = document.getElementById("deliveryOrdersList");
const ownerSearchInputEl = document.getElementById("ownerSearchInput");
const ownerRestaurantInfoEl = document.getElementById("ownerRestaurantInfo");

function setVisibility(isHidden, ...elements) {
  elements.forEach((element) => element.classList.toggle("hidden", isHidden));
}

function showDashboardForRole(role) {
  setVisibility(true, customerDashboardEl, ownerDashboardEl, deliveryDashboardEl);
  if (role === "customer") setVisibility(false, customerDashboardEl);
  if (role === "owner") setVisibility(false, ownerDashboardEl);
  if (role === "delivery") setVisibility(false, deliveryDashboardEl);
}

function getOwnerRestaurant() {
  if (!restaurants.length) return null;
  if (!currentUser || currentUser.role !== "owner") return restaurants[0];

  const total = currentUser.name
    .toLowerCase()
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return restaurants[total % restaurants.length];
}

function renderRoleDashboards() {
  const ownerRestaurant = getOwnerRestaurant();
  const ownerSearch = ownerSearchInputEl ? ownerSearchInputEl.value.trim().toLowerCase() : "";

  if (ownerRestaurant) {
    const vegCount = ownerRestaurant.menu.filter((item) => item.type === "veg").length;
    const ownerMenu = ownerRestaurant.menu.filter((item) => {
      if (!ownerSearch) return true;
      return `${item.name} ${item.type}`.toLowerCase().includes(ownerSearch);
    });

    ownerRestaurantInfoEl.textContent = `Managing ${ownerRestaurant.name} | ${ownerRestaurant.cuisine} cuisine | ${ownerRestaurant.menu.length} total items`;
    ownerRestaurantCardsEl.innerHTML = `
      <article class="restaurant">
        <h4>${ownerRestaurant.name}</h4>
        <p><strong>Cuisine:</strong> ${ownerRestaurant.cuisine}</p>
        <p>Items: ${ownerRestaurant.menu.length} | Veg: ${vegCount} | Non-Veg: ${ownerRestaurant.menu.length - vegCount}</p>
        <p>Search-ready menu view for this restaurant only.</p>
        <div>
          ${ownerMenu.length
            ? ownerMenu
                .map(
                  (item) => `
                <div class="menu-item">
                  <span>${item.name}</span>
                  <span>Rs. ${item.price} <span class="${item.type}">(${item.type})</span></span>
                </div>`
                )
                .join("")
            : "<p>No menu items match your search.</p>"}
        </div>
      </article>
    `;
  }

  const visibleOwnerOrders = placedOrders.filter((order) => {
    const matchesRestaurant = ownerRestaurant
      ? order.items.some((item) => item.restaurant === ownerRestaurant.name)
      : true;
    const matchesSearch = !ownerSearch || `${order.customer} ${order.status} ${order.id}`.toLowerCase().includes(ownerSearch);
    return matchesRestaurant && matchesSearch;
  });

  ownerOrdersListEl.innerHTML = visibleOwnerOrders.length
    ? visibleOwnerOrders
        .map((order) => `<li>Order #${order.id} | ${order.customer} | ${order.items.length} items | Rs. ${order.total} | ${order.status}</li>`)
        .join("")
    : "<li>No matching incoming orders.</li>";

  deliveryOrdersListEl.innerHTML = placedOrders.length
    ? placedOrders
        .map((order) => `<li>Delivery #${order.id} for ${order.customer} | ${order.status}</li>`)
        .join("")
    : "<li>No assigned deliveries yet.</li>";
}

function renderRestaurants() {
  const term = searchInputEl.value.trim().toLowerCase();
  const filter = filterEl.value;

  const filtered = restaurants
    .map((restaurant) => {
      const menu = restaurant.menu.filter((item) => {
        const keywordHit = `${restaurant.name} ${restaurant.cuisine} ${item.name}`.toLowerCase().includes(term);
        const typeHit = filter === "all" || item.type === filter;
        return keywordHit && typeHit;
      });
      return { ...restaurant, menu };
    })
    .filter((restaurant) => restaurant.menu.length > 0);

  restaurantListEl.innerHTML = "";
  filtered.forEach((restaurant) => {
    const card = document.createElement("article");
    card.className = "restaurant";
    card.innerHTML = `
      <h4>${restaurant.name}</h4>
      <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
      <div>
        ${restaurant.menu
          .map(
            (item) => `
          <div class="menu-item">
            <span>${item.name} - Rs. ${item.price} <span class="${item.type}">(${item.type})</span></span>
            <button data-id="${item.id}">Add</button>
          </div>`
          )
          .join("")}
      </div>
    `;
    restaurantListEl.appendChild(card);
  });

  restaurantListEl.querySelectorAll("button[data-id]").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(itemId) {
  for (const restaurant of restaurants) {
    const found = restaurant.menu.find((item) => item.id === itemId);
    if (found) {
      cart.push({ ...found, restaurant: restaurant.name });
      renderCart();
      return;
    }
  }
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  let discount = 0;
  if (appliedPromo) {
    discount = appliedPromo.mode === "flat"
      ? Math.min(appliedPromo.value, subtotal)
      : Math.round((subtotal * appliedPromo.value) / 100);
  }
  return { subtotal, discount, total: Math.max(subtotal - discount, 0) };
}

function renderCart() {
  cartItemsEl.innerHTML = cart.length
    ? cart
        .map(
          (item, index) =>
            `<li>${item.name} (${item.restaurant}) - Rs. ${item.price} <button onclick="removeItem(${index})">x</button></li>`
        )
        .join("")
    : "<li>Your cart is empty.</li>";

  const totals = calculateTotals();
  subtotalEl.textContent = `Rs. ${totals.subtotal}`;
  discountEl.textContent = `Rs. ${totals.discount}`;
  finalEl.textContent = `Rs. ${totals.total}`;
}

window.removeItem = function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
};

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("loginName").value.trim();
  const role = document.getElementById("roleSelect").value;
  if (!name || !role) return;

  const roleNames = {
    customer: "Customer",
    owner: "Restaurant Owner",
    delivery: "Delivery Partner"
  };
  currentUser = { name, role };
  welcomeTextEl.textContent = `Welcome, ${name}`;
  roleInfoEl.textContent = `${roleNames[role]} Portal`;
  setVisibility(true, loginSectionEl);
  setVisibility(false, dashboardHeaderEl);
  showDashboardForRole(role);
  renderRoleDashboards();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  currentUser = null;
  setVisibility(false, loginSectionEl);
  setVisibility(true, dashboardHeaderEl, customerDashboardEl, ownerDashboardEl, deliveryDashboardEl);
  document.getElementById("loginForm").reset();
});

document.getElementById("applyPromoBtn").addEventListener("click", () => {
  const code = promoInputEl.value.trim().toUpperCase();
  if (!code) {
    paymentMsgEl.textContent = "Please enter a promo code.";
    return;
  }
  if (!promos[code]) {
    paymentMsgEl.textContent = "Promo code is invalid.";
    return;
  }
  appliedPromo = promos[code];
  paymentMsgEl.textContent = `Promo ${code} applied successfully.`;
  renderCart();
});

document.getElementById("payBtn").addEventListener("click", async () => {
  if (!cart.length) {
    paymentMsgEl.textContent = "Cart is empty. Add items before payment.";
    return;
  }

  const totals = calculateTotals();
  let orderId = Date.now() % 100000;
  let orderIdNote = "";
  try {
    const payload = {
      items: cart.map((item) => ({ id: item.id, name: item.name, price: item.price })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      total: totals.total
    };
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const data = await response.json();
      if (data.ok && data.orderId) orderId = data.orderId;
    }
  } catch (error) {
    // Fallback for local static mode.
  }

  orderIdNote = ` Order ID: ${orderId}.`;
  localStorage.setItem("scootEatsPayment", JSON.stringify({
    orderId,
    customer: currentUser ? currentUser.name : "Guest",
    items: [...cart],
    total: totals.total
  }));
  location.href = "payment.html";
});

function startTracking(orderId) {
  const stages = ["Order placed", "Restaurant preparing", "Picked up by delivery partner", "Out for delivery", "Delivered"];
  let index = 0;
  trackingStatusEl.textContent = `#${orderId} - ${stages[index]}`;
  if (trackingTimer) clearInterval(trackingTimer);
  trackingTimer = setInterval(() => {
    index += 1;
    if (index >= stages.length) {
      clearInterval(trackingTimer);
      trackingTimer = null;
      return;
    }
    trackingStatusEl.textContent = `#${orderId} - ${stages[index]}`;
    if (placedOrders[0] && placedOrders[0].id === orderId) {
      placedOrders[0].status = stages[index];
      renderRoleDashboards();
    }
  }, 2500);
}

document.getElementById("feedbackForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const rating = document.getElementById("rating").value;
  const text = document.getElementById("feedbackText").value.trim();
  if (!name || !rating || !text) return;

  const li = document.createElement("li");
  li.textContent = `${name} (${rating}/5): ${text}`;
  document.getElementById("feedbackList").prepend(li);

  try {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating: Number(rating), text })
    });
  } catch (error) {
    // Fallback for local static mode.
  }

  event.target.reset();
});

const themeBtnEl = document.getElementById("themeBtn");
const themeCycle = ["theme-blue", "theme-purple", "theme-pink"];
const themeLabels = {
  "theme-blue": "Blue",
  "theme-purple": "Purple",
  "theme-pink": "Pink"
};
let activeThemeIndex = 0;

function applyTheme(index) {
  const themeClass = themeCycle[index];
  document.body.classList.remove(...themeCycle);
  document.body.classList.add(themeClass);
  themeBtnEl.textContent = `Theme: ${themeLabels[themeClass]}`;
}

themeBtnEl.addEventListener("click", () => {
  activeThemeIndex = (activeThemeIndex + 1) % themeCycle.length;
  applyTheme(activeThemeIndex);
});

ownerSearchInputEl.addEventListener("input", renderRoleDashboards);

async function bootstrapData() {
  const paymentParams = new URLSearchParams(window.location.search);
  if (paymentParams.get("payment") === "success") {
    const session = JSON.parse(localStorage.getItem("scootEatsPayment") || "{}");
    const orderId = Number(paymentParams.get("orderId") || session.orderId || Date.now() % 100000);
    const amount = Number(paymentParams.get("amount") || session.total || 0);
    if (session.items && session.items.length) {
      placedOrders.unshift({
        id: orderId,
        customer: session.customer || "Guest",
        items: session.items,
        total: amount,
        status: "Order placed"
      });
      paymentMsgEl.textContent = `Payment successful. Amount paid: Rs. ${amount}. Order ID: ${orderId}.`;
      startTracking(orderId);
      cart.length = 0;
      appliedPromo = null;
      promoInputEl.value = "";
      renderCart();
      localStorage.removeItem("scootEatsPayment");
      window.history.replaceState({}, "", "index.html");
    }
  }

  try {
    const [restaurantsResponse, promosResponse] = await Promise.all([fetch("/api/restaurants"), fetch("/api/promos")]);
    if (restaurantsResponse.ok) restaurants = await restaurantsResponse.json();
    if (promosResponse.ok) promos = await promosResponse.json();
  } catch (error) {
    restaurants = fallbackRestaurants;
    promos = fallbackPromos;
  }
  if (!restaurants.length) restaurants = fallbackRestaurants;
  if (!Object.keys(promos).length) promos = fallbackPromos;
  renderRestaurants();
  renderCart();
  renderRoleDashboards();
}

searchInputEl.addEventListener("input", renderRestaurants);
filterEl.addEventListener("change", renderRestaurants);
applyTheme(activeThemeIndex);
bootstrapData();
