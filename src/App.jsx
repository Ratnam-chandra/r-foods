import "./App.css";
import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  MapPin,
  Star,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  Bike,
  Sparkles,
  Tag,
  ChevronRight,
  X,
  ArrowRight,
  ShieldCheck,
  Flame,
  Heart,
  UtensilsCrossed,
  Phone,
  User,
  CreditCard,
  Check,
  LogOut,
  ShoppingBag,
  Lock,
  Mail,
  ChevronDown,
  Bot,
  MessageSquare
} from 'lucide-react';

// --- LOCATIONS LIST ---
const LOCATIONS = [
  'GITAM UNIVERSITY Bengaluru',
  'Provident Welworth City',
  'Yelahanka New Town',
  'Yelahanka Old Town',
  'Yelahanka Satellite Town',
  'Kogilu Cross, Yelahanka',
  'Allalasandra, Yelahanka',
  'Chikkajala, Yelahanka',
  'Doddaballapura Town Center',
  'Tubagere Cross, Doddaballapura',
  'Rajanukunte Junction',
  'KIADB Industrial Area, Doddaballapura',
  'Vishwanathapura Cross',
];

// --- CURATED RESTAURANTS & 100+ FOOD ITEMS ---
const RESTAURANTS = [
  { id: 1, name: "Gitam Campus Food Court", cuisine: "North & South Indian, Snacks, Juices", time: "10-15 mins", rating: 4.8, offer: "Flat ₹100 OFF with GITAM100" },
  { id: 2, name: "Truffles Burger & Cafe", cuisine: "American Burgers, Pasta, Steaks", time: "25-30 mins", rating: 4.7, offer: "Buy 1 Get 1 Burger" },
  { id: 3, name: "The Druid Garden - Yelahanka", cuisine: "Continental, Italian, Craft Beverages", time: "30-35 mins", rating: 4.9, offer: "20% OFF on Gourmet Bowls" },
  { id: 4, name: "Nagarjuna Andhra Style", cuisine: "Andhra Meals, Biryani, Spicy Chicken", time: "20-25 mins", rating: 4.6, offer: "Free Sol Kadi on ₹400+" },
  { id: 5, name: "Empire Restaurant - Yelahanka", cuisine: "Mughlai, Kebabs, Shawarma", time: "25-30 mins", rating: 4.5, offer: "Flat ₹50 OFF" },
  { id: 6, name: "Bhartiya Jalpan", cuisine: "North Indian Chaat, Sweets, Thali", time: "15-20 mins", rating: 4.6, offer: "15% OFF Thalis" },
  { id: 7, name: "Corner House Ice Creams", cuisine: "Desserts, Sundaes, DBC", time: "15-20 mins", rating: 4.9, offer: "Free Extra Hot Fudge" },
  { id: 8, name: "Oven Story Pizzas", cuisine: "Italian, Pizzas, Cheese Garlic Bread", time: "25-30 mins", rating: 4.6, offer: "50% OFF up to ₹150" }
];

const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'Biryani', name: 'Biryani & Rice', icon: '🍛' },
  { id: 'Pizza', name: 'Pizza & Garlic Bread', icon: '🍕' },
  { id: 'Burgers', name: 'Burgers & Wraps', icon: '🍔' },
  { id: 'South Indian', name: 'South Indian', icon: '🥞' },
  { id: 'North Indian', name: 'North Indian', icon: '🍲' },
  { id: 'Chinese', name: 'Chinese & Thai', icon: '🍜' },
  { id: 'Desserts', name: 'Desserts & DBC', icon: '🍰' },
  { id: 'Beverages', name: 'Beverages & Shakes', icon: '🧋' },
  { id: 'Healthy', name: 'Healthy Eats', icon: '🥗' }
];

// Generate 100+ items across restaurants and categories
const generateFoodItems = () => {
  const baseItems = [
    // --- BIRYANI & RICE ---
    { name: "Andhra Special Chicken Biryani", cat: "Biryani", rest: "Nagarjuna Andhra Style", price: 320, veg: false, desc: "Fiery spicy Andhra style dum biryani served with spicy gravy & raita", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
    { name: "GITAM Special Student Biryani Combo", cat: "Biryani", rest: "Gitam Campus Food Court", price: 199, veg: false, desc: "Aromatic chicken biryani + boiled egg + thums up 250ml", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUz-6BRw15R2Ek0tlwnmdqjR2K13kXEZKtb76KqLrrBA&s=10" },
    { name: "Paneer Subz Dum Biryani", cat: "Biryani", rest: "Empire Restaurant - Yelahanka", price: 279, veg: true, desc: "Fragrant basmati rice layered with spiced paneer cubes and saffron", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpu6J0XSakACDQYxCrjY20NQFfzaMYtS_-4nKplcg5g&s=10" },
    { name: "Hyderabadi Mutton Dum Biryani", cat: "Biryani", rest: "Empire Restaurant - Yelahanka", price: 420, veg: false, desc: "Tender lamb chunks marinated in secret spices and slow cooked in dum", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tkczIbL580UQ2AHLnI7QdJzKVmbI8U-1NlEaZph3mA&s=10" },
    { name: "Kolkata Special Egg & Potato Biryani", cat: "Biryani", rest: "Empire Restaurant - Yelahanka", price: 210, veg: false, desc: "Aromatic basmati rice cooked with whole boiled eggs and spiced golden potatoes", img: "https://media.istockphoto.com/id/1328536879/photo/delicious-mutton-biryani-served-in-black-pot-with-raita-kolkata-style-dum-biryani-with-mutton.webp?a=1&b=1&s=612x612&w=0&k=20&c=u2BGYSsp4DyqDfKUpi-2pIl6N0UxG9Fa9SCrRHWBmqo=" },
    { name: "Chicken 65 Dum Biryani", cat: "Biryani", rest: "Nagarjuna Andhra Style", price: 340, veg: false, desc: "Spicy deep-fried Chicken 65 layered with aromatic biryani rice", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTOVtrHE0dQYAJvfnNaQsFZABu6g3Z2r2NV10T-gEosQ&s=10" },
    { name: "Malabar Prawn Biryani", cat: "Biryani", rest: "Nagarjuna Andhra Style", price: 390, veg: false, desc: "Coastal Kerala style spiced rice cooked with succulent fresh prawns", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2VceKA1LwoiAeaiHAna_f4ExloM9Sor9Jm3BWHYJppw&s=10" },
    { name: "Mushroom Pepper Fry Biryani", cat: "Biryani", rest: "Gitam Campus Food Court", price: 240, veg: true, desc: "Earthy mushrooms tossed in black pepper masala layered with aromatic basmati rice", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgRpPHh4ABu93wQiJ5rVD7nu6sWhiVGUNKu-POQJvlg&s=10" },
    { name: "Chicken Tikka Special Biryani", cat: "Biryani", rest: "Empire Restaurant - Yelahanka", price: 350, veg: false, desc: "Smoky tandoori chicken tikka pieces folded into rich saffron ghee rice", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qIqm_0XzzhSJiIDWh9uhFzARBYYvvbDc9JfL_d7Ibw&s=10" },
    { name: "Thalassery Chicken Biryani", cat: "Biryani", rest: "Nagarjuna Andhra Style", price: 330, veg: false, desc: "Made with aromatic Kaima rice, ghee, mild spices, and cashews", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },

    // --- PIZZA & GARLIC BREAD ---
    { name: "Peri Peri Paneer Supreme Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 399, veg: true, desc: "Loaded with peri peri paneer, capsicum, red paprika and melted cheese", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1e7OXtcThnhT1RW2Hx06cxonMYtJkP4_HCIdkYdgA&s=10" },
    { name: "Chicken Tikka Overloaded Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 479, veg: false, desc: "Smoky chicken tikka chunks with red onions and spicy mint mayo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-p0P9pSltwxn5LPHMt5LAG-r-i6NcioEMIQQ2LFu-yA&s=10" },
    { name: "Cheesy Garlic Breadstix", cat: "Pizza", rest: "Oven Story Pizzas", price: 169, veg: true, desc: "Freshly baked garlic bread filled with molten cheese", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdgewh8X3BeRqJcQHvlidIB3PhxM6Qbr22Y7uNg0qD0Q&s=10" },
    { name: "Double Cheese Margherita Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 299, veg: true, desc: "Classic tomato sauce with an overload of 100% mozzarella cheese and basil", img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80" },
    { name: "BBQ Smoked Chicken Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 449, veg: false, desc: "Smokey barbecue chicken strips, sweet corn, and red onions on a crispy crust", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLD2jRc9PeFKrodom903OEx64bmtMAlkQj7h-1ffwLA&s=10" },
    { name: "Farmhouse Loaded Veggie Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 379, veg: true, desc: "Crispy crust topped with crunchy capsicum, onion, grilled mushroom, and fresh tomatoes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDMl9zSS0Zxunyunv6eRxv38XLkFyYQ0L1V0VUd3E6g&s=10" },
    { name: "Spicy Mexican Green Wave Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 360, veg: true, desc: "Crispy thin crust topped with jalapenos, sliced olives, onions, and spicy herbs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSS98xnLYHvaGqSZ0ve_bcAocmTvBabrP9j3OJTWHWAg&s=10" },
    { name: "Four Cheese Blast Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 490, veg: true, desc: "Mozzarella, cheddar, parmesan, and gouda cheese blend on buttery crust", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8x60tzSqJPN6GyLTZ8wuKIJOFG7SjDp4NcSndflylA&s=10" },
    { name: "Pepperoni Style Chicken Pizza", cat: "Pizza", rest: "Oven Story Pizzas", price: 460, veg: false, desc: "Loaded with spiced chicken sausage slices and extra mozzarella cheese", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80" },
    { name: "Stuffed Garlic Bread with Jalapeno Dip", cat: "Pizza", rest: "Oven Story Pizzas", price: 199, veg: true, desc: "Warm oven-baked bread stuffed with sweet corn, cheese, and spicy jalapenos", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS61ONJ4u8xDW1yuD771SqeHVLHRR2bpvmtl-MsUFmJqg&s=10" },

    // --- BURGERS & WRAPS ---
    { name: "Truffles Classic All-Star Burger", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 240, veg: false, desc: "Juicy beef/chicken patty with caramelized onions, cheddar and signature sauce", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
    { name: "Crispy Paneer Crunchy Burger", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 195, veg: true, desc: "Deep fried crispy paneer slab topped with spicy chipotle sauce", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" },
    { name: "Loaded Cheese Fries", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 160, veg: true, desc: "Crispy golden fries smothered in warm cheese sauce and jalapeños", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80" },
    { name: "Fiery Jalapeno Chicken Burger", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 220, veg: false, desc: "Crispy chicken patty with spicy jalapeno slices, cheese melt, and hot sauce", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
    { name: "Paneer Tikka Kathi Roll", cat: "Burgers", rest: "Gitam Campus Food Court", price: 150, veg: true, desc: "Grilled paneer tikka, mint chutney, and spiced onions wrapped in a soft paratha", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknV7fbym0GDKTAnJA_coslSquWDbgkETk16zMRta2Bg&s=10" },
    { name: "Smoky BBQ Chicken Wrap", cat: "Burgers", rest: "Gitam Campus Food Court", price: 160, veg: false, desc: "Grilled chicken strips tossed in smoky barbecue sauce wrapped in a soft tortilla", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33TwuVFB-ZKrFGg-TYR493addkra9lj-yXoeGyoRL5Q&s=10" },
    { name: "Double Decker Mushroom Burger", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 260, veg: true, desc: "Two herb mushroom patties with Swiss cheese and truffle mayo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaHq6t-ALSlYIhSrkkX1puMx4wVoWD9MOYsEBM1G7Kjw&s=10" },
    { name: "Spicy Peri Peri Chicken Burger", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 230, veg: false, desc: "Crispy chicken fillet coated in fiery peri peri seasoning with lettuce and mayo", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
    { name: "Crispy Chicken Zinger Burger", cat: "Burgers", rest: "Truffles Burger & Cafe", price: 240, veg: false, desc: "Extra crunchy fried chicken breast with iceberg lettuce and creamy coleslaw", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe94g6S1XAGiotpKtkQEZfvKxwxuY-09tk_D1JE_zpLA&s=10" },

    // --- SOUTH INDIAN ---
    { name: "Ghee Roast Masala Dosa", cat: "South Indian", rest: "Gitam Campus Food Court", price: 110, veg: true, desc: "Crispy dosa roasted in pure ghee served with spiced potato mash & chutneys", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80" },
    { name: "Button Idli Sambar Dip (12 pcs)", cat: "South Indian", rest: "Bhartiya Jalpan", price: 130, veg: true, desc: "Mini steamed rice cakes immersed in hot aromatic sambar topped with ghee", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTecU3hyAIWcVAh3viHXp6iQVsgqmm41tr_eWi06Q_pZg&s=10" },
    { name: "Mysore Masala Dosa", cat: "South Indian", rest: "Gitam Campus Food Court", price: 120, veg: true, desc: "Crispy dosa spread with spicy red garlic-chilli chutney and potato masala", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqisl7JGiy36sxyvj2YSrWlosEoMDtiM783wZ601l0vA&s=10" },
    { name: "Crispy Medu Vada (3 pcs)", cat: "South Indian", rest: "Bhartiya Jalpan", price: 90, veg: true, desc: "Golden fried savory lentil donuts served with coconut chutney and hot sambar", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPd1MfiInd7XQFoyJpM_uugzlJL-mzNM_6vf0Ouv1Ig&s=10" },
    { name: "Cheese Onion Rava Dosa", cat: "South Indian", rest: "Gitam Campus Food Court", price: 135, veg: true, desc: "Crispy semolina dosa loaded with chopped onions, green chillies, and melted cheese", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTff_owOAp9UEMjaCViajZ2q7BGsW0x_AzwrHtKehYnZg&s=10" },
    { name: "Filter Coffee & Uttapam Combo", cat: "South Indian", rest: "Bhartiya Jalpan", price: 140, veg: true, desc: "Soft onion tomato uttapam served with two chutneys and traditional filter coffee", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0qcluVpXVZmuZa3EtKpYyX2XqcUOdIdCV9ZBs4FWMaw&s=10" },
    { name: "Podi Masala Dosa", cat: "South Indian", rest: "Gitam Campus Food Court", price: 130, veg: true, desc: "Crispy dosa coated with spicy gun powder (podi) and dollops of melted ghee", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx8tvkDbkC_S79kx_spZsmY945pzjMYhOFBeg2nydcBA&s=10" },
    { name: "Thattidose with Spicy Chutney", cat: "South Indian", rest: "Bhartiya Jalpan", price: 95, veg: true, desc: "Thick soft Bangalore style tawa idli loaded with butter and special red chutney", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAno_GiHW8ps_Ukrt1hZZk8K5Fv-CvFDT4rxnKI7W-pQ&s=10" },
    { name: "Bisi Bele Bath with Boondi", cat: "South Indian", rest: "Bhartiya Jalpan", price: 120, veg: true, desc: "Spiced hot lentil rice dish cooked with vegetables and topped with crispy boondi", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUB_pOECs_RANDJqD-QIlEl-7tRu6kcaVaq_U6UQ3s9Q&s=10" },
    { name: "Mangalore Bun with Coconut Chutney", cat: "South Indian", rest: "Gitam Campus Food Court", price: 80, veg: true, desc: "Sweet, fluffy fried banana flour puris served with spicy coconut chutney", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAZI1Uarah2N8e7lYrmHCPRkhGKtnzg-9BbP-gKNZ-Wg&s=10" },

    // --- NORTH INDIAN ---
    { name: "Butter Chicken with 2 Butter Naan", cat: "North Indian", rest: "Empire Restaurant - Yelahanka", price: 380, veg: false, desc: "Tender chicken cooked in rich creamy tomato and butter gravy served with naan", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT378ipZqGdYDxy_AX1DrwC9p5frJb2nmJyjR7-_vU8Rw&s=10" },
    { name: "Paneer Butter Masala Thali", cat: "North Indian", rest: "Bhartiya Jalpan", price: 250, veg: true, desc: "Paneer butter masala, dal makhani, 2 rotis, jeera rice, salad, and gulab jamun", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVcnxUizw6e2bbvt6VDM_iX5y5gStBMOgKKIJaBHxJg&s=10" },
    { name: "Dal Makhani with 2 Tandoori Rotis", cat: "North Indian", rest: "Bhartiya Jalpan", price: 210, veg: true, desc: "Slow-cooked black lentils in rich cream and butter served with hot tandoori rotis", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRws6xQqCJZnpmBpBFP8mO0XXmDHxKZ7yBKBY4tMj3GRA&s=10" },
    { name: "Shahi Paneer Curry", cat: "North Indian", rest: "Empire Restaurant - Yelahanka", price: 260, veg: true, desc: "Soft paneer cubes simmered in a rich, sweet, and aromatic cashew-tomato gravy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrx2lneViaQX_m8I4dwv6jICD_I5c-wMD92dJ18IgCw&s=10" },
    { name: "Amritsari Chole Bhature (2 pcs)", cat: "North Indian", rest: "Bhartiya Jalpan", price: 180, veg: true, desc: "Spicy chickpea curry served with large fluffy deep-fried bhature and pickles", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4nziJhqGV2MHFjGPi0IF59vrhz_jgxNHMCz-zeebnYA&s=10" },
    { name: "Chicken Tikka Masala Bowl", cat: "North Indian", rest: "Empire Restaurant - Yelahanka", price: 310, veg: false, desc: "Grilled chicken chunks in thick spicy onion-tomato gravy with jeera rice", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOqRClCm_yoXbiX9wxs_UoSr1LixNxioJo1yb7lkOgoA&s=10" },
    { name: "Malai Kofta Curry", cat: "North Indian", rest: "Bhartiya Jalpan", price: 240, veg: true, desc: "Rich potato and cottage cheese dumplings in a creamy, sweet cashew gravy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3YF5mBlYD7RcBUUBcfDInjjIXxuZjrvFyIdGjRUfh7A&s=10" },
    { name: "Tandoori Chicken Platter", cat: "North Indian", rest: "Empire Restaurant - Yelahanka", price: 390, veg: false, desc: "Whole chicken pieces marinated in yogurt and tandoori spices, charcoal grilled", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXYquCroDsFCBORQMUTeFgyBgKcPSUggR5yMdpgFpoGA&s=10" },
    { name: "Palak Paneer with Garlic Naan", cat: "North Indian", rest: "Bhartiya Jalpan", price: 270, veg: true, desc: "Soft cottage cheese cubes in smooth spiced spinach puree gravy with garlic naan", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRso31ttvcSsrqFGHiYsIS9RGXsFojeZ057Ry_27BLFOQ&s=10" },
    { name: "Mughlai Chicken Korma", cat: "North Indian", rest: "Empire Restaurant - Yelahanka", price: 340, veg: false, desc: "Tender chicken stewed in an aromatic yogurt, almond, and saffron sauce", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPY-a719Iugcd-bMeAwLcFKVkjWl-a-wklhW4NW94yQ&s=10" },

    // --- CHINESE & THAI ---
    { name: "Hakha Veg Fried Rice with Manchurian", cat: "Chinese", rest: "Gitam Campus Food Court", price: 180, veg: true, desc: "Classic vegetable fried rice served with veg manchurian balls in spicy gravy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgzlAtOQBPe96bojqOofI9r6aK7tHpbu-0-F7jZw0pVA&s=10" },
    { name: "Chilli Chicken Dry", cat: "Chinese", rest: "Empire Restaurant - Yelahanka", price: 260, veg: false, desc: "Crispy chicken pieces tossed with green chillies, bell peppers, and soy sauce", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo6XMqoaSs_iQRhISwtcCXyj0JY675dE04kKsJrOJ7hw&s=10" },
    { name: "Chicken Schezwan Noodles", cat: "Chinese", rest: "Empire Restaurant - Yelahanka", price: 220, veg: false, desc: "Wok-tossed noodles with shredded chicken and crunchy veggies in spicy Schezwan sauce", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
    { name: "Veg Steamed Momos (8 pcs)", cat: "Chinese", rest: "Gitam Campus Food Court", price: 120, veg: true, desc: "Soft dumplings filled with minced veggies, served with spicy red momo chutney", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfTchu5UE66R9Gb9RoEiM-13iOyGBvaaZ3mbcyuTTzfw&s=10" },
    { name: "Crispy Honey Chilli Potato", cat: "Chinese", rest: "Truffles Burger & Cafe", price: 170, veg: true, desc: "Fried potato fingers tossed in a sweet and spicy honey chilli glaze with sesame seeds", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZMtuEgGNd3m2T46q3g2kBloovi6NncTM_ubUCegtVg&s=10" },
    { name: "Chicken Fried Rice & Chilli Paneer Combo", cat: "Chinese", rest: "Empire Restaurant - Yelahanka", price: 290, veg: false, desc: "Wok chicken fried rice paired with semi-gravy chilli paneer cubes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdeys78V0x2VUa3XjqJseOnFtkiZbFObdMvssaWahFg&s=10" },
    { name: "Pan Fried Chicken Momos", cat: "Chinese", rest: "Empire Restaurant - Yelahanka", price: 170, veg: false, desc: "Golden pan-fried chicken dumplings tossed in spicy garlic schezwan sauce", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSNlydOTg-CjztwQj3kkcCKXHSzom68-hDtUDEgT33fA&s=10" },
    { name: "Veg Spring Rolls (6 pcs)", cat: "Chinese", rest: "Gitam Campus Food Court", price: 140, veg: true, desc: "Crispy fried rolls stuffed with cabbage, carrots, and glass noodles", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCB-fL_OSfrtIDHlkUvUudjtLtRM0Pbjv1kh35YoFYbg&s=10" },
    { name: "Thai Green Curry with Jasmine Rice", cat: "Chinese", rest: "The Druid Garden - Yelahanka", price: 340, veg: true, desc: "Fragrant coconut milk curry infused with lemongrass, bamboo shoots, and basil", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkcn3ET8JrrLxMK1Sj0URFQELyWzeztrJ-klgQ-7rtg&s=10" },
    { name: "Crispy Garlic Pepper Prawns", cat: "Chinese", rest: "Empire Restaurant - Yelahanka", price: 360, veg: false, desc: "Tender prawns tossed in crushed black pepper, garlic, and spring onions", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQeIn3sXorAzDB8SYS87ljQoqsoO_4QAvxYZzT2cr7w&s=10" },

    // --- DESSERTS ---
    { name: "Death By Chocolate (DBC)", cat: "Desserts", rest: "Corner House Ice Creams", price: 260, veg: true, desc: "Iconic sundae with chocolate cake, vanilla ice cream, hot fudge, cherries and nuts", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
    { name: "Hot Fudge Brownie Sundae", cat: "Desserts", rest: "Corner House Ice Creams", price: 190, veg: true, desc: "Warm walnut brownie served with vanilla ice cream and hot chocolate sauce", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAKIuvUxGMJx9Y35mHVflKKtWP46X0F_MFR-tJcqEJ3A&s=10" },
    { name: "Sizzling Chocolate Brownie with Ice Cream", cat: "Desserts", rest: "Corner House Ice Creams", price: 220, veg: true, desc: "Hot fudge brownie served on a sizzling hot plate with vanilla ice cream", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwRvJSxR21FvaCFl1W6dPp-lMfZkRKVpks5vSedfmL2g&s=10" },
    { name: "Warm Gulab Jamun (4 pcs)", cat: "Desserts", rest: "Bhartiya Jalpan", price: 110, veg: true, desc: "Soft milk solid dumplings soaked in cardamom infused sugar syrup", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFJ0g7olF76WAujYglhd6bBLtRjXoT1zx8PQ98ZqGWXw&s=10" },
    { name: "Chocolate Lava Cake", cat: "Desserts", rest: "Corner House Ice Creams", price: 130, veg: true, desc: "Warm chocolate cake with a gooey molten chocolate center", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOK0vLLe2NifW5kVXJxBvUfN6fvKOCHE1BIQnJuJF-bQ&s=10" },
    { name: "Royal Rasmalai (2 pcs)", cat: "Desserts", rest: "Bhartiya Jalpan", price: 120, veg: true, desc: "Soft spongy cottage cheese discs immersed in chilled sweetened thickened saffron milk", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSzX-SLmd3imL9BRQ0wt4cjAishWkrQ06FE8lXH7OCw&s=10" },
    { name: "Mango Cheesecake Jar", cat: "Desserts", rest: "Corner House Ice Creams", price: 170, veg: true, desc: "Layered creamy cream cheese dessert with fresh Alphonso mango compote and biscuit crumble", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEQCElt1TpkUQidEFKOvzLtqdK7z7IuUy_cerPrdxYeQ&s=10" },
    { name: "Classic Vanilla Bean Ice Cream Scoop", cat: "Desserts", rest: "Corner House Ice Creams", price: 90, veg: true, desc: "Two rich scoops of real vanilla bean ice cream topped with roasted almonds", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80" },
    { name: "Caramel Butterscotch Sundae", cat: "Desserts", rest: "Corner House Ice Creams", price: 180, veg: true, desc: "Butterscotch ice cream layered with crunchy praline bits and golden caramel sauce", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdmriXSole0Ch5N_B9-JheVjqY7XwXnuQxUwaw4KUlzA&s=10" },
    { name: "Shahi Rabri with Dry Fruits", cat: "Desserts", rest: "Bhartiya Jalpan", price: 140, veg: true, desc: "Thickened sweet reduced milk garnished with pistachios, almonds, and saffron strands", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3ff1K9jWbgE-1xZ0ZLyrEfyb3lJUuRsLgi5UHntheA&s=10" },

    // --- BEVERAGES & SHAKES ---
    { name: "Classic Cold Coffee with Ice Cream", cat: "Beverages", rest: "Truffles Burger & Cafe", price: 180, veg: true, desc: "Rich and creamy cold coffee topped with a generous scoop of vanilla ice cream", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn57j2cw_wUgKAa7we6evl1RYB_4_ZU051pZBxqUKNEg&s=10" },
    { name: "Thick Belgian Chocolate Shake", cat: "Beverages", rest: "Corner House Ice Creams", price: 210, veg: true, desc: "Decadent dark Belgian chocolate blended into a rich, velvety thickshake", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS471qdyS-j7WzLdC65HHS8DMev0FdegCXTqryuAdVQkQ&s=10" },
    { name: "Fresh Alphonso Mango Smoothie", cat: "Beverages", rest: "Gitam Campus Food Court", price: 140, veg: true, desc: "Refreshing yogurt-based smoothie made with sweet seasonal Alphonso mango pulp", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMaHIrhwcNohXpenZZzfV9Zl9wPGf0ETqN565cAkh4Q&s=10" },
    { name: "Virgin Mojito Mint Cooler", cat: "Beverages", rest: "The Druid Garden - Yelahanka", price: 190, veg: true, desc: "Muddled fresh mint leaves, lime juice, cane sugar, and sparkling soda water", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80" },
    { name: "Oreo Cookie Crumble Shake", cat: "Beverages", rest: "Truffles Burger & Cafe", price: 200, veg: true, desc: "Crushed Oreo cookies blended with thick milk and sweet cream, topped with chocolate bits", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80" },
    { name: "Fresh Tender Coconut Water Shake", cat: "Beverages", rest: "Gitam Campus Food Court", price: 110, veg: true, desc: "Cool and refreshing blend of tender coconut water and soft coconut pulp", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXbaE1BpBZAMHDpUGwZbW09LXLucYMsHfKCk7aFyDvQ&s=10" },
    { name: "Royal Rose Falooda with Dry Fruits", cat: "Beverages", rest: "Empire Restaurant - Yelahanka", price: 170, veg: true, desc: "Traditional rich falooda loaded with rose syrup, vermicelli, basil seeds, and nuts", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7qvpDKGfYA2VyoRVtpp9O_dDAsL7OeQtAxhB2Q6kmw&s=10" },
    { name: "Strawberry Cheesecake Thickshake", cat: "Beverages", rest: "Corner House Ice Creams", price: 230, veg: true, desc: "Creamy cheesecake flavor blended with fresh strawberry puree and crumbly crust", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_WU7nWSxF7E0-UfPlvlo_kvnaDDh3CpOV-uAqr5Tgg&s=10" },
    { name: "Iced Caramel Macchiato", cat: "Beverages", rest: "The Druid Garden - Yelahanka", price: 220, veg: true, desc: "Espresso combined with vanilla syrup, chilled milk, and a sweet caramel drizzle", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
    { name: "Spiced Masala Chaas (Buttermilk)", cat: "Beverages", rest: "Bhartiya Jalpan", price: 70, veg: true, desc: "Traditional cooling yogurt drink seasoned with roasted cumin, green chillies, and fresh coriander", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgcuPR_cAG8F8NJDm7fdg8xmdEu0zTv8i_u-n4F3H2cA&s=10" },

    // --- HEALTHY EATS ---
    { name: "Mediterranean Quinoa Bowl", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 340, veg: true, desc: "Fresh avocado, feta cheese, cherry tomatoes, cucumbers and olive oil dressing", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwuUVxQBQcf0na3sFSzZcuAMej0f-Dg9YqQ47fEMr0Hg&s=10" },
    { name: "Grilled Chicken Protein Salad Bowl", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 360, veg: false, desc: "Herb grilled chicken breast, fresh greens, cherry tomatoes, and olive oil dressing", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBeWQFPjIYFzkfdqEZtZrswHnwa7v8GdboOJ4mM4rG5w&s=10" },
    { name: "Avocado Toast with Poached Egg", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 280, veg: false, desc: "Mashed avocado on toasted sourdough topped with chilli flakes and a poached egg", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
    { name: "Greek Salad with Feta Cheese", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 310, veg: true, desc: "Cucumbers, tomatoes, bell peppers, black olives, and feta cheese with lemon-oregano dressing", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_KGSalMXtVR837azBYw2AjHL33eoz3bPaYOOMdxIE4w&s=10" },
    { name: "Sprouts & Pomegranate Detox Salad", cat: "Healthy", rest: "Gitam Campus Food Court", price: 150, veg: true, desc: "Boiled moong sprouts, fresh pomegranate arils, diced cucumber, lemon juice, and chaat masala", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGwgaFLD9IWZlF-BIfQMwrXo3eiLcNNBpu2JMxXSgcRA&s=10" },
    { name: "Grilled Cottage Cheese & Herb Salad", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 290, veg: true, desc: "Marinated grilled paneer cubes over crisp iceberg lettuce, bell peppers, and vinaigrette", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFOHJY25wPHXKc4YvKOZtYzLiMA8VE1_UHDLH6CEmH7A&s=10" },
    { name: "Warm Roasted Sweet Potato & Chickpea Bowl", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 270, veg: true, desc: "Honey-roasted sweet potatoes, spiced chickpeas, baby spinach, and tahini dressing", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCFYtsxjMNYfJVlO9lZKOsmXvWPIRchnpTnOxYFU7YA&s=10" },
    { name: "Oatmeal Berry Breakfast Bowl", cat: "Healthy", rest: "Gitam Campus Food Court", price: 160, veg: true, desc: "Rolled oats cooked in almond milk topped with mixed berries, chia seeds, and honey", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecGAvII9FibylD9o-XPs2_JxFqT9ZcH4gPqmV1h5V5Q&s=10" },
    { name: "Steamed Salmon & Asparagus Plate", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 480, veg: false, desc: "Gently steamed salmon fillet served with garlic sautéed asparagus and lemon herb drizzle", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFA5gcR_4fPU62K72Ucq9lYtimBmJJuEOxqPT5ArZ8A&s=10" },
    { name: "Tofu Brown Rice Power Bowl", cat: "Healthy", rest: "The Druid Garden - Yelahanka", price: 310, veg: true, desc: "Pan-seared organic tofu chunks served over brown rice, steamed broccoli, and peanut sauce", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_eiuvZ2BRmLNlIkny4YLDmxNg0XQRqGTh7JgsFiKmFA&s=10" }
  ];

  const fullList = [];

  let idCounter = 1;

  while (fullList.length < 130) {
    baseItems.forEach(item => {
      const variant = {
        ...item,
        id: idCounter++,
        name: fullList.length >= 70 ? `${item.name} (${['Special', 'Deluxe', 'Supreme', 'Jumbo', 'Classic'][idCounter % 5] || 'Classic'})` : item.name,
        price: item.price + (idCounter % 8) * 10,
        rating: (4.3 + (idCounter % 7) * 0.1).toFixed(1),
        reviews: 40 + (idCounter * 13) % 450
      };
      if (fullList.length < 130) {
        fullList.push(variant);
      }
    });
  }
  return fullList;
};

const ALL_FOODS = generateFoodItems();

export default function App() {
  // Application State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState('popular');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountName, setDiscountName] = useState('');
  const [tipAmount, setTipAmount] = useState(30);
  // --- AI ASSISTANT STATE ---
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: '👋 Hi! I am R-Bot, your R Foods AI Assistant. Ask me for recommendations, budget meals, or discount codes!' }
  ]);

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userText = aiInput.trim();
    const newMessages = [...aiMessages, { sender: 'user', text: userText }];
    setAiMessages(newMessages);
    setAiInput('');

    // Instant Smart AI Response Logic
    setTimeout(() => {
      let botReply = "I can help you find tasty dishes! Try searching for Biryani, Burgers, or dishes under ₹200.";
      const query = userText.toLowerCase();

      if (query.includes('coupon') || query.includes('offer') || query.includes('code') || query.includes('discount')) {
        botReply = "🎉 You can use promo code **RATNAM100** for flat ₹100 OFF, or **RFODS50** for ₹50 OFF!";
      } else if (query.includes('cheap') || query.includes('budget') || query.includes('under 200') || query.includes('under 150')) {
        botReply = "💡 Budget Student Meals:\n• GITAM Special Student Biryani Combo (₹199)\n• Paneer Tikka Kathi Roll (₹150)\n• Sprouts & Pomegranate Salad (₹150)\n• Ghee Roast Masala Dosa (₹110)";
      } else if (query.includes('gitam') || query.includes('delivery') || query.includes('time')) {
        botReply = "⚡ Delivery to GITAM Hostels & Doddaballapura takes about 15-25 mins!";
      } else if (query.includes('veg') || query.includes('vegetarian')) {
        botReply = "🌱 Popular Pure Veg choices:\n• Peri Peri Paneer Supreme Pizza (₹399)\n• Death By Chocolate (₹260)\n• Button Idli Sambar Dip (₹130)";
      } else if (query.includes('biryani')) {
        botReply = "🍛 Top Biryanis:\n• Andhra Special Chicken Biryani (₹320)\n• GITAM Special Student Combo (₹199)\n• Paneer Subz Dum Biryani (₹279)";
      }

      setAiMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };
  const [currentVideo, setCurrentVideo] = useState(`${import.meta.env.BASE_URL}videos/video1.mp4`);
  
  // Delivery Location State
  const [currentLocation, setCurrentLocation] = useState('GITAM UNIVERSITY Bengaluru');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  
  // Customization Modal
  const [customizingItem, setCustomizingItem] = useState(null);
  const [customSize, setCustomSize] = useState('Medium');
  const [customCheese, setCustomCheese] = useState(false);

  // Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  // Checkout & Order Tracking State
  const [viewState, setViewState] = useState('browse'); // 'browse', 'checkout', 'tracking'
  const [orderId, setOrderId] = useState(null);
  const [deliveryStep, setDeliveryStep] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: 'Boys Hostel 3, GITAM UNIVERSITY Bengaluru, Nagadenahalli, Doddaballapura, Bengaluru, Karnataka 561203',
    paymentMethod: 'UPI'
  });

  // Sync address when location changes
  useEffect(() => {
    setCustomerDetails(prev => ({
      ...prev,
      address: `${currentLocation}, Karnataka`
    }));
  }, [currentLocation]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('r_foods_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
    const savedUser = localStorage.getItem('r_foods_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setCustomerDetails(prev => ({ ...prev, name: user.name, phone: user.phone || '' }));
      } catch (e) { console.error(e); }
    }
    const savedOrders = localStorage.getItem('r_foods_orders');
    if (savedOrders) {
      try { setOrderHistory(JSON.parse(savedOrders)); } catch (e) { console.error(e); }
    }
  }, []);

  // Save cart & orders
  useEffect(() => { localStorage.setItem('r_foods_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('r_foods_orders', JSON.stringify(orderHistory)); }, [orderHistory]);

  // Filter food items
  const filteredFoods = useMemo(() => {
    let result = ALL_FOODS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.cat === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.rest.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRestaurant = selectedRestaurant === 'all' || item.rest === selectedRestaurant;
      const matchesVeg = !vegOnly || item.veg;
      const matchesPrice = item.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesRestaurant && matchesVeg && matchesPrice;
    });

    if (sortBy === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, selectedRestaurant, vegOnly, maxPrice, sortBy]);

  // Cart operations
  const addToCart = (item, options = {}) => {
    const finalPrice = item.price + (options.extraCheese ? 40 : 0);
    const itemKey = `${item.id}-${options.size || 'std'}-${options.extraCheese ? 'cheese' : 'std'}`;

    setCart(prev => {
      const existing = prev.find(i => i.key === itemKey);
      if (existing) {
        return prev.map(i => i.key === itemKey ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        ...item,
        key: itemKey,
        price: finalPrice,
        size: options.size || null,
        extraCheese: options.extraCheese || false,
        qty: 1
      }];
    });
    setCustomizingItem(null);
  };

  const removeFromCart = (key) => {
    setCart(prev => {
      const existing = prev.find(i => i.key === key || i.id === key);
      if (existing && existing.qty > 1) {
        return prev.map(i => (i.key === key || i.id === key) ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter(i => i.key !== key && i.id !== key);
    });
  };

  const clearCart = () => setCart([]);

  const totalItemsCount = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.qty, 0), [cart]);
  const deliveryFee = subtotal > 400 ? 0 : 35;
  const restaurantCharges = 20;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal + deliveryFee + restaurantCharges + taxes + tipAmount - appliedDiscount);

  // Promo code handler
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'RATNAM100') {
      setAppliedDiscount(100);
      setDiscountName('RATNAM100 (₹100 OFF)');
    } else if (code === 'RFODS50') {
      setAppliedDiscount(50);
      setDiscountName('RFODS50 (₹50 OFF)');
    } else if (code === 'YELAHANKA20') {
      const discountVal = Math.round(subtotal * 0.2);
      setAppliedDiscount(discountVal);
      setDiscountName('YELAHANKA20 (20% OFF)');
    } else {
      alert('Invalid Promo Code. Try RATNAM100, RFODS50 or YELAHANKA20');
    }
  };

  // Auth Handler
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password || (authMode === 'register' && !authForm.name)) {
      alert('Please fill in all required fields.');
      return;
    }
    const userData = {
      name: authMode === 'register' ? authForm.name : (authForm.email.split('@')[0]),
      email: authForm.email,
      phone: authForm.phone || '+91 98765 43210'
    };
    setCurrentUser(userData);
    localStorage.setItem('r_foods_user', JSON.stringify(userData));
    setCustomerDetails(prev => ({ ...prev, name: userData.name, phone: userData.phone }));
    setIsAuthModalOpen(false);
    setAuthForm({ name: '', email: '', phone: '', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('r_foods_user');
    setIsProfileMenuOpen(false);
  };

  // Order Placement
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (cart.length === 0) return;
    const newOrderId = 'RF-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      total: grandTotal,
      status: 'Out for Delivery',
      address: customerDetails.address
    };
    setOrderHistory(prev => [newOrder, ...prev]);
    setOrderId(newOrderId);
    setViewState('tracking');
    setIsCartOpen(false);
    setDeliveryStep(0);
  };

  // Live Tracking Simulator
  useEffect(() => {
    let timer;
    if (viewState === 'tracking' && deliveryStep < 4) {
      timer = setTimeout(() => {
        setDeliveryStep(prev => prev + 1);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [viewState, deliveryStep]);

  const scrollToMenu = () => {
    setViewState('browse');
    const el = document.getElementById('explore-menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-rose-500 selection:text-white ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <style>{`
        /* Smooth theme transition */
        .dark-mode,
        .dark-mode * {
          transition: background-color 0.3s ease,
                      color 0.3s ease,
                      border-color 0.3s ease;
        }

        /* DARK MODE: Main backgrounds */
        .dark-mode {
          background-color: #0f172a !important;
          color: #e2e8f0 !important;
        }

        .dark-mode [class~="bg-white"] {
          background-color: #1e293b !important;
        }

        .dark-mode [class~="bg-slate-50"],
        .dark-mode [class~="bg-slate-100"] {
          background-color: #334155 !important;
        }

        .dark-mode [class~="bg-slate-200"] {
          background-color: #475569 !important;
        }

        /* DARK MODE: Text colors */
        .dark-mode [class~="text-slate-800"],
        .dark-mode [class~="text-slate-900"],
        .dark-mode [class~="text-slate-700"] {
          color: #f1f5f9 !important;
        }

        .dark-mode [class~="text-slate-600"],
        .dark-mode [class~="text-slate-500"] {
          color: #cbd5e1 !important;
        }

        .dark-mode [class~="text-slate-400"] {
          color: #94a3b8 !important;
        }

        /* DARK MODE: Borders */
        .dark-mode [class~="border-slate-100"],
        .dark-mode [class~="border-slate-200"] {
          border-color: #475569 !important;
        }

        /* DARK MODE: Inputs */
        .dark-mode input,
        .dark-mode select,
        .dark-mode textarea {
          background-color: #334155 !important;
          color: #f1f5f9 !important;
          border-color: #475569 !important;
        }

        .dark-mode input::placeholder {
          color: #94a3b8 !important;
        }

        /* DARK MODE: Dropdowns and cards */
        .dark-mode [class~="hover:bg-slate-50"]:hover,
        .dark-mode [class~="hover:bg-slate-100"]:hover {
          background-color: #475569 !important;
        }

        /* LIGHT MODE */
        .light-mode {
          background-color: #f8fafc;
          color: #1e293b;
        }

        
/* ========================================= */
/* VEG / NON-VEG BADGE - DARK MODE FIX       */
/* ========================================= */

.dark-mode .food-type-badge {
  background-color: rgba(15, 23, 42, 0.95) !important;

  border: 1px solid rgba(148, 163, 184, 0.35);

  box-shadow:
    0 0 8px rgba(148, 163, 184, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.35) !important;
}

/* Keep Veg / Non-Veg text clearly visible */

.dark-mode .food-type-text {
  color: #f8fafc !important;
}

/* Bright Green Glow for Veg */

.dark-mode .food-type-badge:has(.bg-emerald-600) {
  border-color: rgba(16, 185, 129, 0.6);

  box-shadow:
    0 0 8px rgba(16, 185, 129, 0.2),
    0 0 15px rgba(16, 185, 129, 0.1) !important;
}

/* Bright Red Glow for Non-Veg */

.dark-mode .food-type-badge:has(.bg-rose-600) {
  border-color: rgba(244, 63, 94, 0.6);

  box-shadow:
    0 0 8px rgba(244, 63, 94, 0.2),
    0 0 15px rgba(244, 63, 94, 0.1) !important;
}

/* R FOODS LOGO GLOW - DARK MODE */
.dark-mode .r-foods-logo-icon {
  box-shadow:
    0 0 10px rgba(255, 60, 60, 0.8),
    0 0 25px rgba(255, 60, 60, 0.6),
    0 0 45px rgba(255, 90, 30, 0.4) !important;

  animation: logoGlow 2s ease-in-out infinite alternate;
}

.dark-mode .r-foods-logo-text {
  text-shadow:
    0 0 8px rgba(255, 50, 70, 0.8),
    0 0 18px rgba(255, 50, 70, 0.5);

  animation: textGlow 2s ease-in-out infinite alternate;
}

/* LOGO GLOW ANIMATION */
@keyframes logoGlow {
  from {
    box-shadow:
      0 0 8px rgba(255, 60, 60, 0.5),
      0 0 18px rgba(255, 60, 60, 0.3);
  }

  to {
    box-shadow:
      0 0 15px rgba(255, 60, 60, 0.9),
      0 0 35px rgba(255, 60, 60, 0.7),
      0 0 55px rgba(255, 90, 30, 0.5);
  }
}

@keyframes textGlow {
  from {
    text-shadow: 0 0 5px rgba(255, 50, 70, 0.4);
  }

  to {
    text-shadow:
      0 0 12px rgba(255, 50, 70, 0.9),
      0 0 25px rgba(255, 50, 70, 0.6);
  }
}

      `}</style>
      
  {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Delivery Location */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2 sm:gap-6">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setViewState('browse')}>
              <div className="r-foods-logo-icon w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
                <UtensilsCrossed className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="r-foods-logo-text text-xl sm:text-2xl font-black tracking-tight text-rose-600">
                  R Foods
                </span>
                <span className="text-[9px] sm:text-[10px] block font-extrabold text-slate-400 tracking-widest uppercase">Food Delivery</span>
              </div>
            </div>

            {/* Delivery Location Selector */}
            <div className="relative flex items-center gap-1.5 pl-3 sm:pl-6 border-l border-slate-200">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
              <div className="text-left cursor-pointer" onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}>
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delivery Location</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1 max-w-[110px] sm:max-w-[220px] truncate">
                  {currentLocation} <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>

              {/* Location Dropdown Modal */}
              {isLocationDropdownOpen && (
                <div className="absolute top-12 left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-2 border-b border-slate-100 mb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Delivery Location</p>
                    <p className="text-[11px] text-rose-600 font-semibold">GITAM & Yelahanka / Doddaballapura Zones</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1 scrollbar-none">
                    {LOCATIONS.map(loc => (
                      <div 
                        key={loc}
                        onClick={() => { setCurrentLocation(loc); setIsLocationDropdownOpen(false); }}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between ${currentLocation === loc ? 'bg-rose-50 text-rose-600 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                      >
                        <span className="truncate">{loc}</span>
                        {currentLocation === loc && <Check className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search food items, cuisines, or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/80 border border-transparent focus:border-rose-500 focus:bg-white pl-11 pr-4 py-2.5 rounded-2xl text-xs font-semibold transition-all outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Actions: Explore Menu, Cart & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={scrollToMenu}
              className="hidden md:flex items-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border border-rose-200"
            >
              <UtensilsCrossed className="w-4 h-4" /> Explore Menu
            </button>

            {/* Dark / Light Mode Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-bold border transition-all"
              title="Toggle Dark / Light Mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Cart Button with Bouncing Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 active:scale-95 transition-all group"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 pl-2 border-l border-slate-200 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center border-2 border-rose-500 text-xs shadow-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Hello,</p>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[90px]">{currentUser.name}</p>
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-12 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="p-3 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => { setIsOrderHistoryOpen(true); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-rose-500" /> Order History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border border-slate-200"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="lg:hidden p-3 bg-white border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items, biryani, burgers or restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-transparent focus:border-rose-500 focus:bg-white pl-11 pr-4 py-2.5 rounded-2xl text-xs font-medium transition-all outline-none"
          />
        </div>
      </div>

      {/* ================= MAIN CONTENT VIEW ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {viewState === 'browse' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-900 via-rose-800 to-orange-900 text-white p-8 md:p-12 shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase text-rose-200 border border-white/10">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> R Foods Student Special
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Hot Meals Delivered to <span className="text-amber-400">{currentLocation}</span>
                </h1>
                <p className="text-slate-200 text-sm md:text-base font-medium">
                  Use coupon <span className="text-amber-300 font-bold bg-white/10 px-2 py-0.5 rounded-md border border-white/20">RATNAM100</span> for flat ₹100 OFF on your favorite food items.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={scrollToMenu} className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm hover:bg-rose-50 transition-colors shadow-xl flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-rose-600" /> Explore Full Menu (100+ Items)
                  </button>
                  <button onClick={() => setSelectedCategory('Biryani')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-3 rounded-2xl font-bold text-xs hover:bg-white/20 transition-colors">
                    🍛 Biryani
                  </button>
                  <button onClick={() => setSelectedCategory('Burgers')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-3 rounded-2xl font-bold text-xs hover:bg-white/20 transition-colors">
                    🍔 Burgers
                  </button>
                </div>
              </div>
            </div>

            
          {/* RIGHT SIDE - MIXKIT FOOD VIDEO (FULL CARD) */}
            <div className="relative min-h-[280px] md:min-h-[350px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 flex items-center justify-center">

              {/* Background Video (Stretched to Full Container) */}
              <video
                key={currentVideo}
                className="absolute inset-0 w-full h-full object-cover"
                src={currentVideo}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => {
                  setCurrentVideo((prev) => 
                    prev.includes("video1") 
                      ? `${import.meta.env.BASE_URL}videos/video2.mp4` 
                      : `${import.meta.env.BASE_URL}videos/video1.mp4`
                  );
                }}
              />

              {/* Dark Gradient Overlay for High Text Legibility */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none"></div>

              {/* Overlay Text */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white pointer-events-none space-y-1">
                <p className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                  🍔 R FOODS SPECIAL
                </p>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                  Fresh. Hot. Delicious.
                </h3>
                <p className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                  MADE WITH LOVE
                </p>
              </div>

            </div>


            {/* Category Filter Carousel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Food Categories</h2>
                  <p className="text-xs text-slate-400">Filter dishes by meal type</p>
                </div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">{CATEGORIES.length} Categories</span>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center gap-2.5 p-4 min-w-[100px] rounded-2xl transition-all duration-300 shrink-0 ${selectedCategory === cat.id ? 'bg-gradient-to-b from-rose-600 to-orange-500 text-white shadow-lg shadow-rose-500/30 scale-105' : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-100 shadow-sm'}`}
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Restaurant Filter Chips */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Featured Restaurants around GITAM & Yelahanka</h2>
                  <p className="text-xs text-slate-400">Top rated partner outlets</p>
                </div>
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${vegOnly ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                  <span className={`w-3 h-3 rounded-full border-2 border-emerald-600 flex items-center justify-center ${vegOnly ? 'bg-emerald-600' : ''}`}></span>
                  Pure Veg
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setSelectedRestaurant('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedRestaurant === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                  All Restaurants ({RESTAURANTS.length})
                </button>
                {RESTAURANTS.map(rest => (
                  <button
                    key={rest.id}
                    onClick={() => setSelectedRestaurant(rest.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedRestaurant === rest.name ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    {rest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= EXPLORE MENU SECTION ================= */}
            <div id="explore-menu-section" className="space-y-6 pt-4 border-t border-slate-200">
              
              {/* Menu Section Header & Controls */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <UtensilsCrossed className="w-6 h-6 text-rose-600" /> Explore Menu Catalog
                    </h2>
                    <p className="text-xs text-slate-500">Showing {filteredFoods.length} items available for {currentLocation}</p>
                  </div>

                  {/* Filter & Sort Controls */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Max Price Slider */}
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-500">Max Price: ₹{maxPrice}</span>
                      <input
                        type="range"
                        min="100"
                        max="600"
                        step="50"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-24 accent-rose-600 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>15-20 mins delivery</span>
                    </div>

                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-xl outline-none"
                    >
                      <option value="popular">Popularity</option>
                      <option value="rating">Rating (High to Low)</option>
                      <option value="low">Price (Low to High)</option>
                      <option value="high">Price (High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Food Grid */}
              {filteredFoods.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">🍔</div>
                  <h3 className="text-lg font-bold text-slate-800">No dishes found</h3>
                  <p className="text-slate-500 text-xs max-w-md mx-auto">Try resetting your filters or search query.</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedRestaurant('all'); setVegOnly(false); setMaxPrice(600); }} className="bg-rose-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-rose-700 transition-colors">
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredFoods.map(food => {
                    const cartItem = cart.find(i => i.id === food.id);
                    const qty = cartItem ? cartItem.qty : 0;

                    return (
                      <div key={food.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                        
                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                          <img src={food.img} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                          
                          
                    {/* Veg / Non-Veg Indicator */}
                    <div className="food-type-badge absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                    <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          food.veg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                    ></span>

                    <span className="food-type-text text-[10px] font-black uppercase text-slate-700">
                    {food.veg ? 'Veg' : 'Non-Veg'}
                      </span>
                        </div>

                          {/* Rating Badge */}
                          <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-md">
                            <Star className="w-3.5 h-3.5 fill-white" />
                            {food.rating}
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <p className="text-[11px] font-semibold text-rose-200 truncate">{food.rest}</p>
                            <h3 className="text-base font-bold truncate">{food.name}</h3>
                          </div>
                        </div>

                        {/* Body Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                          <p className="text-xs text-slate-500 line-clamp-2 font-medium">{food.desc}</p>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div>
                              <span className="text-[10px] text-slate-400 block font-bold uppercase">Price</span>
                              <span className="text-lg font-black text-slate-900">₹{food.price}</span>
                            </div>

                            {/* Add / Customize Buttons */}
                            <div className="flex items-center gap-2">
                              {food.cat === 'Pizza' || food.cat === 'Burgers' ? (
                                <button
                                  onClick={() => setCustomizingItem(food)}
                                  className="text-[10px] font-bold text-slate-500 hover:text-rose-600 underline"
                                >
                                  Customize
                                </button>
                              ) : null}

                              {qty === 0 ? (
                                <button
                                  onClick={() => addToCart(food)}
                                  className="bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
                                >
                                  <Plus className="w-3.5 h-3.5" /> ADD
                                </button>
                              ) : (
                                <div className="flex items-center gap-2.5 bg-rose-600 text-white px-2.5 py-1 rounded-xl shadow-md">
                                  <button onClick={() => removeFromCart(food.id)} className="hover:bg-rose-700 p-0.5 rounded transition-colors">
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-black w-3 text-center">{qty}</span>
                                  <button onClick={() => addToCart(food)} className="hover:bg-rose-700 p-0.5 rounded transition-colors">
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= CHECKOUT VIEW ================= */}
        {viewState === 'checkout' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <button onClick={() => setViewState('browse')} className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
                &larr; Back to menu
              </button>
              <h1 className="text-2xl font-black text-slate-900">Checkout Order</h1>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-6">
                
                {/* Contact Info */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-600" /> Delivery Address & Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Address ({currentLocation})</label>
                    <textarea
                      rows="2"
                      required
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-rose-600" /> Select Payment Method
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['UPI', 'Card', 'COD'].map(method => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setCustomerDetails({...customerDetails, paymentMethod: method})}
                        className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all ${customerDetails.paymentMethod === method ? 'border-rose-600 bg-rose-50 text-rose-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        {method === 'UPI' ? '⚡ GooglePay / UPI' : method === 'Card' ? '💳 Card' : '💵 Cash on Delivery'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 h-fit">
                <h3 className="text-sm font-bold text-slate-900">Summary ({totalItemsCount} items)</h3>
                
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1 scrollbar-none">
                  {cart.map(item => (
                    <div key={item.key || item.id} className="flex items-center justify-between text-xs">
                      <div className="flex-1 truncate pr-2">
                        <p className="font-bold text-slate-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400">Qty: {item.qty} × ₹{item.price}</p>
                      </div>
                      <span className="font-bold text-slate-900">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-emerald-600">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (5% GST)</span>
                    <span>₹{taxes}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Discount ({discountName})</span>
                      <span>-₹{appliedDiscount}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Grand Total</span>
                  <span className="text-lg font-black text-rose-600">₹{grandTotal}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-xs"
                >
                  Place Order Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ================= LIVE TRACKING VIEW ================= */}
        {viewState === 'tracking' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner animate-bounce">
                <Bike className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h1>
              <p className="text-slate-500 text-xs">
                Order ID: <span className="font-bold text-slate-800">{orderId}</span> • Delivery to <span className="font-bold text-slate-800">{currentLocation}</span>
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-base font-black text-slate-900">Live Order Tracking</h3>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {[
                  { title: "Order Confirmed", desc: "Restaurant has accepted your order." },
                  { title: "Food Preparation", desc: "Chefs are cooking your fresh meal." },
                  { title: "Rider Assigned", desc: "Karan (4.9★) is picking up your package." },
                  { title: "Out for Delivery", desc: "Rider is en-route to " + currentLocation },
                  { title: "Delivered", desc: "Enjoy your food!" }
                ].map((stepObj, idx) => {
                  const isDone = deliveryStep >= idx;
                  const isCurrent = deliveryStep === idx;

                  return (
                    <div key={idx} className="flex items-start gap-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isDone ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'} ${isCurrent ? 'ring-4 ring-emerald-100 animate-pulse' : ''}`}>
                        {isDone ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-bold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>{stepObj.title}</h4>
                        <p className="text-xs text-slate-500">{stepObj.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {deliveryStep >= 4 && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-800">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Order Delivered!
                  </div>
                  <button onClick={() => { setCart([]); setViewState('browse'); }} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700">
                    Order More
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* ================= CUSTOMIZE ITEM MODAL ================= */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setCustomizingItem(null)}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">{customizingItem.name}</h3>
                <p className="text-xs text-slate-500">{customizingItem.rest}</p>
              </div>
              <button onClick={() => setCustomizingItem(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Select Portion Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Regular', 'Medium', 'Large'].map(size => (
                    <button
                      key={size}
                      onClick={() => setCustomSize(size)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${customSize === size ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-600'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Extra Add-ons</label>
                <button
                  type="button"
                  onClick={() => setCustomCheese(!customCheese)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${customCheese ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-700'}`}
                >
                  <span>Extra Cheese Crust / Dip</span>
                  <span>+₹40</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(customizingItem, { size: customSize, extraCheese: customCheese })}
              className="w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-rose-500/30"
            >
              Add Customized Item (₹{customizingItem.price + (customCheese ? 40 : 0)})
            </button>
          </div>
        </div>
      )}

      {/* ================= SLIDE-OVER CART DRAWER ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 w-full max-w-md flex">
            <div className="w-full bg-white shadow-2xl flex flex-col h-full overflow-hidden">
              
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">Your Shopping Cart</h2>
                    <p className="text-xs text-slate-500">{totalItemsCount} items selected</p>
                  </div>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">🛒</div>
                    <h3 className="text-sm font-bold text-slate-800">Your cart is empty</h3>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto">Explore 100+ dishes from top restaurants.</p>
                    <button onClick={() => setIsCartOpen(false)} className="bg-rose-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md">
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Selected Items</span>
                      <button onClick={clearCart} className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.key || item.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                            <p className="text-[10px] text-slate-400">₹{item.price} {item.size ? `• ${item.size}` : ''}</p>
                          </div>
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200">
                            <button onClick={() => removeFromCart(item.key || item.id)} className="text-slate-600 hover:text-rose-600">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black w-3 text-center">{item.qty}</span>
                            <button onClick={() => addToCart(item)} className="text-slate-600 hover:text-rose-600">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Input */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-rose-600" /> Apply Student Coupon
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Try GITAM100"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-slate-100 border border-transparent focus:border-rose-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-bold uppercase outline-none"
                        />
                        <button onClick={handleApplyPromo} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold">
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Tip Selection */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Tip Delivery Partner</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[20, 30, 50, 100].map(amt => (
                          <button
                            key={amt}
                            onClick={() => setTipAmount(amt)}
                            className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${tipAmount === amt ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-slate-200 text-slate-600'}`}
                          >
                            ₹{amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bill Breakdown */}
                    <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs font-medium text-slate-600">
                      <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-slate-900">₹{subtotal}</span></div>
                      <div className="flex justify-between"><span>Delivery Fee</span><span className="font-bold text-emerald-600">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                      <div className="flex justify-between"><span>Taxes (5% GST)</span><span>₹{taxes}</span></div>
                      {appliedDiscount > 0 && <div className="flex justify-between text-rose-600 font-bold"><span>Discount</span><span>-₹{appliedDiscount}</span></div>}
                    </div>
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Grand Total</span>
                      <span className="text-xl font-black text-slate-900">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setIsAuthModalOpen(true);
                      } else {
                        setIsCartOpen(false);
                        setViewState('checkout');
                      }
                    }}
                    className="w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"
                  >
                    {!currentUser ? 'Sign In to Checkout' : 'Proceed to Checkout'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================= AUTH MODAL ================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAuthModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">{authMode === 'login' ? 'Sign In' : 'Create Account'}</h3>
                <p className="text-xs text-slate-500">Order from R Foods</p>
              </div>
              <button onClick={() => setIsAuthModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-2xl">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 rounded-xl text-xs font-bold ${authMode === 'login' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}>Login</button>
              <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 rounded-xl text-xs font-bold ${authMode === 'register' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}>Register</button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === 'register' && (
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-rose-500"
                />
              )}
              <input
                type="email"
                required
                placeholder="Email Address"
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-rose-500"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-rose-500"
              />
              <button type="submit" className="w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-rose-500/30">
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= ORDER HISTORY MODAL ================= */}
      {isOrderHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOrderHistoryOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 z-10 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Your Past Orders</h3>
              <button onClick={() => setIsOrderHistoryOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><X className="w-4 h-4" /></button>
            </div>
            {orderHistory.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No order history available.</p>
            ) : (
              <div className="space-y-3">
                {orderHistory.map(ord => (
                  <div key={ord.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold border-b border-slate-200 pb-2">
                      <span className="text-rose-600">{ord.id} ({ord.date})</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{ord.status}</span>
                    </div>
                    <p className="text-slate-500 font-medium">Deliver to: {ord.address}</p>
                    <div className="flex justify-between font-extrabold text-slate-900 pt-1">
                      <span>Total</span>
                      <span>₹{ord.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= FLOATING AI ASSISTANT ================= */}
      {/* Floating Chatbot Widget Button */}
     <button
        onClick={() => setIsAiOpen(!isAiOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-rose-600 to-orange-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white group"
        title="R Foods AI Chatbot Assistant"
      >
        {isAiOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Modern Robot Icon */}
            <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
            {/* Small Glowing Online Indicator Badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* AI Chat Popup Window */}
      {isAiOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[420px] animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-600 to-orange-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black">R-Bot AI Assistant</h3>
                <p className="text-[10px] text-rose-100 font-semibold">Online • Ask anything about menu</p>
              </div>
            </div>
            <button onClick={() => setIsAiOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl ${msg.sender === 'user' ? 'bg-rose-600 text-white font-semibold rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none font-medium whitespace-pre-line'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            <button onClick={() => setAiInput("Show cheap meals")} className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 shrink-0">
              💰 Budget Meals
            </button>
            <button onClick={() => setAiInput("Any coupon codes?")} className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 shrink-0">
              🏷️ Coupons
            </button>
            <button onClick={() => setAiInput("Popular Biryani")} className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 shrink-0">
              🍛 Biryanis
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleAiSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Ask R-Bot..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              className="flex-1 bg-slate-100 border border-transparent focus:border-rose-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold outline-none"
            />
            <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
              Send
            </button>
          </form>
        </div>
      )}
    {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-20 py-8 text-center text-slate-400 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 R Foods Inc. All rights reserved.</p>
          
          {/* Support Buttons with Phone and Mail Icons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-rose-200"
            >
              <Phone className="w-4 h-4 text-rose-600" />
              <span>Call Hotline (+91 1234567890)</span>
            </a>

            <a
              href="mailto:support@rfoods.com"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-200"
            >
              <Mail className="w-4 h-4 text-rose-600" />
              <span>Email Support</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="hover:text-rose-600 cursor-pointer">GITAM Bengaluru Zone</span>
            <span className="hover:text-rose-600 cursor-pointer">Yelahanka Hub</span>
            <span className="hover:text-rose-600 cursor-pointer">Doddaballapura Zone</span>
          </div>
        </div>
      </footer>

    </div>
  );
}