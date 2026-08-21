# FoodHub IIT Mandi

A comprehensive food ordering web application designed specifically for the IIT Mandi campus community, supporting multiple canteens, live order tracking, and administration dashboards.

## 🌟 Key Features

*   **Interactive Timings & Canteen Badger System**: Shows real-time Open/Closed status badges on all canteen listings. Ordering is automatically disabled and warned against when a canteen is closed.
*   **Inline Quantity Controls**: Homepage product cards dynamically transition into inline `[−] qty [+]` selectors once added, allowing convenient quantity management without entering the cart page.
*   **Smart Landmark Presets & Autofill**: Provides a dropdown list of campus landmark presets (e.g., Gagangarh, Suhrawardy, Beas) to instantly autofill delivery addresses. The selected address is saved to the user's profile for future orders.
*   **Live Order Tracking**: An interactive timeline tracker (`Ordered` -> `Kitchen (Processing)` -> `Delivery (Out for Delivery)` -> `Delivered`) showing the live status of active orders.
*   **Admin Dashboard Board**: Dedicated administrative orders board (`/admin/orders`) allowing administrators to filter active orders and update preparation status in real-time.
*   **Polished Glassmorphism & Animations**: Premium visual styling featuring translucent backdrop blurs, smooth hover card zooms, and cart-shaking icon events.
*   **Robust Security & Configurations**:
    *   Dynamic cookie validation (`secure` / `sameSite`) adjusting configuration automatically for local HTTP development.
    *   Mongoose pre-save password checks preventing credential corruption/double-hashing on address updates.
    *   Audited food-accurate image seeding.

## 🛠 Tech Stack

*   **Frontend**: React.js, Tailwind CSS, Redux Toolkit, React Router, Axios
*   **Backend**: Node.js, Express.js, JWT, Cookie-Parser, Bcrypt
*   **Database**: MongoDB, Mongoose

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   Local MongoDB Instance running on port 27017

### Installation

1.  **Clone and Install Dependencies**:
    ```sh
    npm install
    ```

2.  **Initialize Database Seeds**:
    *   Seed the menu catalog (inserts food-accurate items):
        ```sh
        cd "FoodHub IIT Mandi Backend"
        node src/seed.js
        ```
    *   Seed test user accounts (creates user & admin profiles):
        ```sh
        node src/seedUsers.js
        ```

3.  **Start Services**:
    *   Run the Backend Server (runs on port 8080):
        ```sh
        cd "FoodHub IIT Mandi Backend"
        npm run dev
        ```
    *   Run the Frontend Client (runs on port 5173):
        ```sh
        cd "../FoodHub IIT Mandi Frontend"
        npm install
        npm run dev
        ```

4.  **Access the Application**:
    Open [http://localhost:5173/FoodHub-IIT-Mandi/](http://localhost:5173/FoodHub-IIT-Mandi/) in your browser.

### 🔑 Test Accounts
*   **Standard User**: `user@foodhub.com` / `password123`
*   **Administrator**: `admin@foodhub.com` / `adminpassword`

---

*Developed with ❤️ for the IIT Mandi community*
