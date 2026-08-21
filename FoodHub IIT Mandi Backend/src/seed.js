const mongoose = require('mongoose');
const Product = require('./schema/productSchema');
const serverConfig = require('./config/serverConfig');

const menuItems = [
  // Drongo Canteen (Fast Food & Snacks)
  { 
    name: "Classic Veg Burger", 
    desc: "Crispy vegetable patty with fresh lettuce, onions, and mayonnaise.", 
    price: 80, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Cheese Burger", 
    desc: "Veg burger loaded with a slice of melted Cheddar cheese.", 
    price: 100, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Paneer Burger", 
    desc: "Spiced paneer patty topped with fresh cheese and house dressing.", 
    price: 120, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "French Fries", 
    desc: "Golden-crisp salted potato fries served with ketchup.", 
    price: 70, 
    cat: "sides", 
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Cheese Loaded Fries", 
    desc: "Fries topped with melted warm cheese sauce and jalapenos.", 
    price: 90, 
    cat: "sides", 
    img: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Aloo Tikki Burger", 
    desc: "Spiced potato tikki burger with sweet and spicy chutneys.", 
    price: 60, 
    cat: "veg", 
    img: "", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Veg Grilled Sandwich", 
    desc: "Grilled sandwich stuffed with capsicum, tomatoes, potatoes, and cheese.", 
    price: 80, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Spring Rolls (2 Pcs)", 
    desc: "Crispy rolls filled with shredded sautéed cabbage, carrots, and onions.", 
    price: 80, 
    cat: "sides", 
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },
  { 
    name: "Veg Hakka Noodles", 
    desc: "Stir-fried Chinese noodles cooked with garlic, soy sauce, and veggies.", 
    price: 100, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80", 
    cant: "Drongo Canteen" 
  },

  // Monal Canteen (Paranthas & Rolls)
  { 
    name: "Aloo Parantha", 
    desc: "Whole wheat parantha stuffed with spiced mashed potatoes.", 
    price: 40, 
    cat: "veg", 
    img: "/FoodHub-IIT-Mandi/parantha.jpg", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Paneer Parantha", 
    desc: "Whole wheat parantha stuffed with seasoned grated paneer.", 
    price: 60, 
    cat: "veg", 
    img: "/FoodHub-IIT-Mandi/parantha.jpg", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Onion Parantha", 
    desc: "Parantha stuffed with finely chopped spiced onions.", 
    price: 45, 
    cat: "veg", 
    img: "/FoodHub-IIT-Mandi/parantha.jpg", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Paneer Kathi Roll", 
    desc: "Spiced paneer, onions, and capsicum wrapped in a soft roti roll.", 
    price: 100, 
    cat: "veg", 
    img: "", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Single Egg Roll", 
    desc: "Pan-fried parantha rolled with a single fried egg and onions.", 
    price: 70, 
    cat: "non-veg", 
    img: "", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Double Egg Roll", 
    desc: "Pan-fried parantha rolled with two fried eggs, spices, and chillies.", 
    price: 90, 
    cat: "non-veg", 
    img: "", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Veg Spring Roll", 
    desc: "Deep-fried rolls stuffed with seasoned Chinese style stir-fry veggies.", 
    price: 80, 
    cat: "veg", 
    img: "", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Masala Dosa", 
    desc: "Fermented rice crepe stuffed with spiced potato mash, served with sambar.", 
    price: 90, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80", 
    cant: "Monal Canteen" 
  },
  { 
    name: "Idli Sambar (2 Pcs)", 
    desc: "Steamed fluffy white rice cakes served with hot vegetable sambar.", 
    price: 60, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", 
    cant: "Monal Canteen" 
  },

  // Baba Ka Dhaba (Indian Meals)
  { 
    name: "Butter Chicken", 
    desc: "Tender chicken chunks cooked in a rich, buttery, spiced tomato gravy.", 
    price: 280, 
    cat: "non-veg", 
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Kadai Chicken", 
    desc: "Chicken simmered in wok with bell peppers, onions, and kadai spices.", 
    price: 260, 
    cat: "non-veg", 
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Dal Makhani", 
    desc: "Creamy, rich slow-cooked black lentils flavored with butter.", 
    price: 160, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Paneer Butter Masala", 
    desc: "Soft paneer cubes simmered in a luscious butter tomato gravy.", 
    price: 180, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Mix Veg Dry", 
    desc: "Stir-fried seasonal veggies cooked in dry Indian spices.", 
    price: 140, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Jeera Rice", 
    desc: "Long grain basmati rice tempered with ghee and cumin seeds.", 
    price: 80, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Butter Naan", 
    desc: "Leavened flatbread baked in clay oven, brushed with rich butter.", 
    price: 40, 
    cat: "veg", 
    img: "", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Garlic Naan", 
    desc: "Clay-oven flatbread topped with minced garlic and butter.", 
    price: 50, 
    cat: "veg", 
    img: "", 
    cant: "Baba Ka Dhaba" 
  },
  { 
    name: "Tandoori Roti (Butter)", 
    desc: "Whole wheat tandoori flatbread brushed with butter.", 
    price: 12, 
    cat: "veg", 
    img: "", 
    cant: "Baba Ka Dhaba" 
  },

  // Himalayan Cafe (Mountain Cuisine & Organic)
  { 
    name: "Himalayan Thukpa", 
    desc: "Traditional noodle soup with seasonal mountain greens and herbs.", 
    price: 120, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Veg Steamed Momos", 
    desc: "Steamed dumplings stuffed with finely minced fresh vegetables.", 
    price: 80, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Veg Fried Momos", 
    desc: "Crispy, deep-fried dumplings stuffed with mixed vegetables.", 
    price: 90, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1625220194771-7ebedd0b4869?auto=format&fit=crop&w=600&q=80", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Paneer Steamed Momos", 
    desc: "Steamed dumplings stuffed with spiced cottage cheese filling.", 
    price: 110, 
    cat: "veg", 
    img: "", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Traditional Siddu with Ghee", 
    desc: "Himachali steamed yeast bread stuffed with poppy seeds, served with ghee.", 
    price: 80, 
    cat: "veg", 
    img: "", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Organic Red Rice Meal", 
    desc: "Nourishing local organic red rice served with mountain lentils.", 
    price: 140, 
    cat: "veg", 
    img: "", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Mountain Herbal Tea", 
    desc: "Brew of fresh wild mountain herbs and local honey.", 
    price: 30, 
    cat: "drinks", 
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Local Rajma Chawal", 
    desc: "Spicy rajma (kidney beans) cooked in mountain style, served with rice.", 
    price: 100, 
    cat: "veg", 
    img: "", 
    cant: "Himalayan Cafe" 
  },
  { 
    name: "Himalayan Cheese Momos", 
    desc: "Dumplings stuffed with rich mountain cheese and spices.", 
    price: 120, 
    cat: "veg", 
    img: "", 
    cant: "Himalayan Cafe" 
  },

  // Bake O Mocha (Cafe & Bakery)
  { 
    name: "Chocolate Pastry", 
    desc: "Moist chocolate sponge slice layered with rich chocolate fudge.", 
    price: 70, 
    cat: "dessert", 
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Black Forest Pastry", 
    desc: "Pastry slice with fresh whipped cream, dark cherries, and chocolate flakes.", 
    price: 80, 
    cat: "dessert", 
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Warm Choco Lava Cake", 
    desc: "Baked chocolate cake with a hot, oozing liquid chocolate center.", 
    price: 90, 
    cat: "dessert", 
    img: "", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Crispy Paneer Patty", 
    desc: "Flaky puff pastry stuffed with spiced cottage cheese cubes.", 
    price: 40, 
    cat: "veg", 
    img: "", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Aloo Puff Patty", 
    desc: "Crispy puff pastry stuffed with seasoned potatoes and green peas.", 
    price: 30, 
    cat: "veg", 
    img: "", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Hot Cappuccino", 
    desc: "Rich espresso with steamed milk foam and chocolate dusting.", 
    price: 50, 
    cat: "drinks", 
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Classic Cold Coffee", 
    desc: "Chilled blended espresso, milk, and sugar, served cold.", 
    price: 70, 
    cat: "drinks", 
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Chocolate Frappe", 
    desc: "Ice-blended coffee beverage with heavy chocolate syrup.", 
    price: 90, 
    cat: "drinks", 
    img: "", 
    cant: "Bake O Mocha" 
  },
  { 
    name: "Blueberry Muffin", 
    desc: "Soft, spongy muffin loaded with sweet baked blueberries.", 
    price: 80, 
    cat: "dessert", 
    img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80", 
    cant: "Bake O Mocha" 
  },

  // Pizza Bite (Pizza & Italian)
  { 
    name: "Margherita Pizza", 
    desc: "Classic cheese pizza with rich tomato sauce and fresh basil.", 
    price: 199, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Farmhouse Veg Pizza", 
    desc: "Topped with onions, bell peppers, tomatoes, mushrooms, and cheese.", 
    price: 249, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Peppy Paneer Pizza", 
    desc: "Topped with spiced paneer, green capsicum, and red paprika.", 
    price: 279, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Spicy Chicken Pizza", 
    desc: "Loaded with shredded chicken, hot chillies, and mozzarella.", 
    price: 329, 
    cat: "non-veg", 
    img: "", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Garlic Breadsticks", 
    desc: "Baked breadsticks glazed with garlic butter and Italian herbs.", 
    price: 99, 
    cat: "sides", 
    img: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Stuffed Garlic Bread", 
    desc: "Baked bread stuffed with sweet corn, cheese, and jalapenos.", 
    price: 139, 
    cat: "sides", 
    img: "", 
    cant: "Pizza Bite" 
  },
  { 
    name: "White Sauce Pasta", 
    desc: "Penne pasta cooked in a rich, creamy cheese sauce with mushrooms.", 
    price: 159, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Red Sauce Pasta", 
    desc: "Penne pasta in spicy, tangy tomato sauce with herbs.", 
    price: 149, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", 
    cant: "Pizza Bite" 
  },
  { 
    name: "Cheesy Dip", 
    desc: "Tangy and creamy cheese dip cup.", 
    price: 30, 
    cat: "sides", 
    img: "", 
    cant: "Pizza Bite" 
  },

  // The Daig (Chinese & Tandoor)
  { 
    name: "Tandoori Paneer Tikka", 
    desc: "Paneer cubes marinated in yogurt spices and grilled in clay tandoor.", 
    price: 180, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80", 
    cant: "The Daig" 
  },
  { 
    name: "Tandoori Soya Chaap", 
    desc: "Marinated soya chaap cooked in clay oven, tossed with butter.", 
    price: 160, 
    cat: "veg", 
    img: "", 
    cant: "The Daig" 
  },
  { 
    name: "Chinese Veg Chowmein", 
    desc: "Stir-fried Hakka noodles with soy sauce and fresh vegetables.", 
    price: 90, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80", 
    cant: "The Daig" 
  },
  { 
    name: "Paneer Hakka Chowmein", 
    desc: "Spicy stir-fried noodles tossed with crispy paneer cubes.", 
    price: 110, 
    cat: "veg", 
    img: "", 
    cant: "The Daig" 
  },
  { 
    name: "Chilli Paneer (Gravy)", 
    desc: "Paneer cubes tossed in garlic, soy sauce, and sweet chilli gravy.", 
    price: 160, 
    cat: "veg", 
    img: "", 
    cant: "The Daig" 
  },
  { 
    name: "Honey Chilli Potato", 
    desc: "Crispy potato fries tossed in honey, sesame, and sweet chilli sauce.", 
    price: 120, 
    cat: "sides", 
    img: "", 
    cant: "The Daig" 
  },
  { 
    name: "Chinese Fried Rice", 
    desc: "Wok-fried long rice tossed with soy sauce and fine veggies.", 
    price: 100, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80", 
    cant: "The Daig" 
  },
  { 
    name: "Veg Manchurian Dry", 
    desc: "Fried vegetable balls tossed in soy, onion, and garlic dry sauce.", 
    price: 130, 
    cat: "veg", 
    img: "", 
    cant: "The Daig" 
  },
  { 
    name: "Schezwan Spicy Noodles", 
    desc: "Hakka noodles cooked in hot and fiery schezwan sauce.", 
    price: 110, 
    cat: "veg", 
    img: "", 
    cant: "The Daig" 
  },

  // Griffon Canteen (Affordable Budget Snacks)
  { 
    name: "Crispy Samosa", 
    desc: "Flaky pastry stuffed with potatoes, peas, and spices (1 Pc).", 
    price: 15, 
    cat: "veg", 
    img: "", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Bread Pakora", 
    desc: "Deep-fried bread sandwich coated in spiced gram flour batter.", 
    price: 20, 
    cat: "veg", 
    img: "", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Hot Masala Chai", 
    desc: "Brewed milk tea infused with fresh ginger, cardamom, and tea leaves.", 
    price: 15, 
    cat: "drinks", 
    img: "", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Elaichi Tea", 
    desc: "Traditional hot tea brewed with sweet green cardamom.", 
    price: 15, 
    cat: "drinks", 
    img: "", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Strong Black Coffee", 
    desc: "Hot robust black coffee brewed with premium beans.", 
    price: 20, 
    cat: "drinks", 
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Plain Maggi", 
    desc: "Instant noodles cooked with classic masala seasoning.", 
    price: 40, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1612966608997-300e84b228b7?auto=format&fit=crop&w=600&q=80", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Cheese Masala Maggi", 
    desc: "Maggi cooked with spices and loaded with grated processed cheese.", 
    price: 60, 
    cat: "veg", 
    img: "", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Egg Masala Maggi", 
    desc: "Noodles cooked with scrambled eggs, veggies, and spices.", 
    price: 70, 
    cat: "non-veg", 
    img: "", 
    cant: "Griffon Canteen" 
  },
  { 
    name: "Butter Bun Maska", 
    desc: "Soft bun stuffed with fresh white butter.", 
    price: 35, 
    cat: "veg", 
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", 
    cant: "Griffon Canteen" 
  },

  // Markandey (Premium Meals & Biryani)
  { 
    name: "Special Veg Biryani", 
    desc: "Aromatic basmati rice cooked with fresh vegetables and saffron.", 
    price: 180, 
    cat: "veg", 
    img: "", 
    cant: "Markandey" 
  },
  { 
    name: "Hyderabadi Chicken Biryani", 
    desc: "Premium long basmati rice layered with spiced marinated chicken.", 
    price: 220, 
    cat: "non-veg", 
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", 
    cant: "Markandey" 
  },
  { 
    name: "Shahi Paneer Curry", 
    desc: "Paneer cubes cooked in cream, yogurt, onion, and cashew gravy.", 
    price: 220, 
    cat: "veg", 
    img: "", 
    cant: "Markandey" 
  },
  { 
    name: "Creamy Malai Kofta", 
    desc: "Fried cottage cheese balls cooked in rich cashew tomato gravy.", 
    price: 240, 
    cat: "veg", 
    img: "", 
    cant: "Markandey" 
  },
  { 
    name: "Mughlai Chicken Korma", 
    desc: "Chicken stewed in rich, aromatic yogurt and nut sauce.", 
    price: 280, 
    cat: "non-veg", 
    img: "", 
    cant: "Markandey" 
  },
  { 
    name: "Premium Mutton Curry", 
    desc: "Tender mutton pieces slow-cooked in traditional north Indian spices.", 
    price: 350, 
    cat: "non-veg", 
    img: "", 
    cant: "Markandey" 
  },
  { 
    name: "Laccha Parantha (Tandoor)", 
    desc: "Crispy tandoori parantha baked layered with butter.", 
    price: 40, 
    cat: "veg", 
    img: "/FoodHub-IIT-Mandi/parantha.jpg", 
    cant: "Markandey" 
  },
  { 
    name: "Sweet Kesari Pulao", 
    desc: "Sweet aromatic rice cooked with saffron, ghee, and mixed nuts.", 
    price: 160, 
    cat: "veg", 
    img: "", 
    cant: "Markandey" 
  },
  { 
    name: "Spicy Matar Paneer", 
    desc: "Green peas and paneer cubes cooked in a spiced tomato gravy.", 
    price: 200, 
    cat: "veg", 
    img: "", 
    cant: "Markandey" 
  },

  // Tragopan Canteen (Jain Food & Pure Veg)
  { 
    name: "Jain Special Thali", 
    desc: "Lentils, seasonal vegetable curry, rice, and rotis (No Onion/Garlic).", 
    price: 150, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Jain Yellow Dal Fry", 
    desc: "Yellow lentils tempered with ghee, cumin, and fresh tomatoes.", 
    price: 100, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Jain Paneer Tomato Sabzi", 
    desc: "Cottage cheese cooked in sweet tomato sauce without onions/garlic.", 
    price: 140, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Plain Steamed Rice", 
    desc: "Fluffy steamed long-grain white basmati rice.", 
    price: 60, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Tawa Roti (No Butter)", 
    desc: "Whole wheat plain soft roti made on home pan.", 
    price: 8, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Jain Raw Banana Samosa", 
    desc: "Crispy samosa filled with mashed raw banana and spices.", 
    price: 20, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Sweet Yogurt Lassi", 
    desc: "Sweet, rich blended curd drink served chilled.", 
    price: 50, 
    cat: "drinks", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Masala Butter Milk", 
    desc: "Chilled watered buttermilk seasoned with cumin and ginger.", 
    price: 30, 
    cat: "drinks", 
    img: "", 
    cant: "Tragopan Canteen" 
  },
  { 
    name: "Fresh Fruit Salad", 
    desc: "Salad with chopped apples, bananas, pomegranates, and papaya.", 
    price: 80, 
    cat: "veg", 
    img: "", 
    cant: "Tragopan Canteen" 
  },

  // Bulbul Canteen (Breakfast & Comfort Meals)
  { 
    name: "Indori Poha", 
    desc: "Poha steamed with spices, topped with fresh coriander and sev.", 
    price: 40, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Vegetable Upma", 
    desc: "Roasted semolina cooked with ghee, mustard seeds, and veggies.", 
    price: 45, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Chole Bhature (2 Pcs)", 
    desc: "Spicy chickpea curry served with hot fried leavened bhaturas.", 
    price: 80, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Puri Sabzi Meal", 
    desc: "Deep-fried golden wheat puris served with potato curry (4 Puris).", 
    price: 60, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "South Indian Curd Rice", 
    desc: "Cooked rice blended with milk, fresh curd, and mustard seed tempering.", 
    price: 70, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Comforting Khichdi", 
    desc: "Healthy yellow lentil and rice mash served with fresh pure ghee.", 
    price: 80, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Dal Tadka Punjabi", 
    desc: "Yellow lentils tempered with ghee, dry red chilli, and garlic.", 
    price: 110, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Aloo Gobhi Dry", 
    desc: "Dry cauliflower and potato curry stir-fried with turmeric and ginger.", 
    price: 120, 
    cat: "veg", 
    img: "", 
    cant: "Bulbul Canteen" 
  },
  { 
    name: "Sweet Lassi Creamy", 
    desc: "Chilled yogurt drink blended sweet with fresh cardamom.", 
    price: 50, 
    cat: "drinks", 
    img: "", 
    cant: "Bulbul Canteen" 
  }
];

const sampleProducts = menuItems.map(item => ({
  productName: item.name,
  description: item.desc,
  price: item.price,
  category: item.cat,
  quantity: 20,
  inStock: true,
  productImage: item.img,
  canteen: item.cant
}));

async function seedDB() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Connected. Clearing existing products...");
        await Product.deleteMany({});
        console.log(`Inserting ${sampleProducts.length} sample products with specific related images...`);
        await Product.insertMany(sampleProducts);
        console.log("Database seeded successfully with food-accurate Unsplash images!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.connection.close();
        console.log("DB connection closed.");
    }
}

seedDB();
