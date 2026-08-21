import PizzaImage from '../assets/Images/pizza2.png';

export const restaurants = [
    {
        id: 1,
        name: "Drongo Canteen",
        type: "Campus Canteen",
        timing: "8:00 AM - 10:00 PM",
        specialties: ["Patiz", "Burger", "Tea", "Coffee", "Fast Food"],
        image: PizzaImage,
        description: "Popular campus canteen known for quick bites and beverages"
    },
    {
        id: 2,
        name: "Monal Canteen",
        type: "Campus Canteen",
        timing: "7:00 AM - 11:00 PM",
        specialties: ["Parantha", "Egg Roll", "Paneer Roll", "Noodles", "Momos", "South Indian"],
        image: PizzaImage,
        description: "Diverse menu with North and South Indian options"
    },
    {
        id: 3,
        name: "Baba Ka Dhaba",
        type: "Local Restaurant",
        timing: "11:00 AM - 10:00 PM",
        specialties: ["Indian Veg Menu", "Chicken Items", "Dal-Rice", "Roti"],
        image: PizzaImage,
        description: "Authentic Indian cuisine with both vegetarian and non-vegetarian options"
    },
    {
        id: 4,
        name: "Himalayan Cafe",
        type: "Local Restaurant",
        timing: "9:00 AM - 9:00 PM",
        specialties: ["Indian Veg Menu", "Mountain Cuisine", "Organic Food"],
        image: PizzaImage,
        description: "Fresh vegetarian meals with a mountain touch"
    },
    {
        id: 5,
        name: "Bake O Mocha",
        type: "Cafe & Bakery",
        timing: "10:00 AM - 11:00 PM",
        specialties: ["Snacks", "Burger", "Beverages", "Pastry", "Sandwich", "Garlic Bread"],
        image: PizzaImage,
        description: "Modern cafe with snacks, beverages and baked goods"
    },
    {
        id: 6,
        name: "Pizza Bite",
        type: "Campus Restaurant",
        timing: "5:00 PM - 11:00 PM",
        specialties: ["Pizza", "Garlic Bread", "Italian Cuisine", "Fast Food"],
        image: PizzaImage,
        description: "Great Italian pizzas, pastas and sides"
    },
    {
        id: 7,
        name: "The Daig",
        type: "Campus Canteen",
        timing: "8:00 AM - 10:00 PM",
        specialties: ["Tandoori Roti", "Chaap", "Momos", "Chowmein", "North Indian"],
        image: PizzaImage,
        description: "Authentic North Indian food with tandoor specialties"
    },
    {
        id: 8,
        name: "Griffon Canteen",
        type: "Campus Canteen",
        timing: "7:00 AM - 11:00 PM",
        specialties: ["Samosa", "Patiz", "Chai", "Budget Meals", "Quick Snacks"],
        image: PizzaImage,
        description: "Budget-friendly canteen for students with affordable quick bites"
    },
    {
        id: 9,
        name: "Markandey",
        type: "Campus Restaurant",
        timing: "11:00 AM - 10:00 PM",
        specialties: ["Butter Chicken", "Biryani", "Premium Curries", "Main Course"],
        image: PizzaImage,
        description: "Premium dining with authentic Indian main course dishes"
    },
    {
        id: 10,
        name: "Tragopan Canteen",
        type: "Campus Canteen",
        timing: "8:00 AM - 9:00 PM",
        specialties: ["Jain Food", "Pure Veg", "No Onion/Garlic", "Healthy Options"],
        image: PizzaImage,
        description: "Specialized Jain and pure vegetarian food without onion/garlic"
    },
    {
        id: 11,
        name: "Bulbul Canteen",
        type: "Campus Canteen",
        timing: "7:00 AM - 10:00 PM",
        specialties: ["Paratha", "Rolls", "Dal-Rice", "Indian Breakfast"],
        image: PizzaImage,
        description: "Traditional Indian cuisine with fresh parathas and regional specialties"
    }
];

export const isCanteenOpen = (timingStr) => {
    if (!timingStr) return false;
    try {
        const [openStr, closeStr] = timingStr.split('-').map(s => s.trim());
        const parseTime = (timeStr) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) {
                hours += 12;
            }
            if (modifier === 'AM' && hours === 12) {
                hours = 0;
            }
            return hours * 60 + minutes;
        };

        const openMinutes = parseTime(openStr);
        const closeMinutes = parseTime(closeStr);

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        if (openMinutes <= closeMinutes) {
            return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
        } else {
            // Over midnight (e.g. 5 PM - 1 AM)
            return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
        }
    } catch (e) {
        console.error("Error parsing timing string:", timingStr, e);
        return true; // Fallback to open
    }
};
