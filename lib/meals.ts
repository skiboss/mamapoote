export interface Meal {
  id: number
  name: string
  price: string
  image: string
  description: string
  longDescription: string
  ingredients: string[]
  allergens: string[]
  category: string
  spiceLevel: number
  preparationTime: string
  calories: number
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
}

export const meals: Meal[] = [
  {
    id: 1,
    name: "Jollof Rice Special",
    price: "$18.99",
    image: "/jollof-rice-with-chicken-and-vegetables.jpg",
    description: "Traditional West African rice dish with aromatic spices",
    longDescription:
      "Our signature Jollof Rice is a beloved West African dish that brings together perfectly seasoned rice with a rich tomato base, aromatic spices, and tender pieces of chicken. This one-pot wonder is slow-cooked to perfection, allowing each grain of rice to absorb the complex flavors of our special spice blend.",
    ingredients: [
      "Basmati rice",
      "Tomatoes",
      "Onions",
      "Bell peppers",
      "Chicken",
      "Garlic",
      "Ginger",
      "Bay leaves",
      "Thyme",
      "Curry powder",
      "Paprika",
      "Stock cubes",
    ],
    allergens: ["None"],
    category: "Main Course",
    spiceLevel: 2,
    preparationTime: "45 minutes",
    calories: 520,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: 2,
    name: "Suya Platter",
    price: "$22.99",
    image: "/suya-grilled-meat-skewers-with-spices.jpg",
    description: "Grilled spiced meat skewers with traditional seasonings",
    longDescription:
      "Experience the authentic taste of Nigerian street food with our Suya Platter. Tender beef is marinated in our secret blend of ground peanuts, spices, and herbs, then grilled to perfection over an open flame. Served with fresh onions, tomatoes, and our signature suya spice for an extra kick.",
    ingredients: ["Beef", "Peanuts", "Ginger", "Garlic", "Onions", "Cayenne pepper", "Paprika", "Stock cubes", "Salt"],
    allergens: ["Peanuts"],
    category: "Grilled",
    spiceLevel: 4,
    preparationTime: "30 minutes",
    calories: 680,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: 3,
    name: "Plantain & Fish",
    price: "$16.99",
    image: "/fried-plantain-with-grilled-fish-african-style.jpg",
    description: "Perfectly fried plantains with seasoned grilled fish",
    longDescription:
      "A delightful combination of sweet and savory flavors. Our ripe plantains are fried to golden perfection, creating a caramelized exterior while maintaining a soft, sweet interior. Paired with fresh fish seasoned with African spices and grilled to flaky perfection.",
    ingredients: [
      "Plantains",
      "Fresh fish",
      "Palm oil",
      "Onions",
      "Tomatoes",
      "Scotch bonnet peppers",
      "Ginger",
      "Garlic",
      "Seasoning cubes",
    ],
    allergens: ["Fish"],
    category: "Seafood",
    spiceLevel: 3,
    preparationTime: "25 minutes",
    calories: 450,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: 4,
    name: "Egusi Soup",
    price: "$19.99",
    image: "/egusi-soup-with-meat-and-vegetables.jpg",
    description: "Rich melon seed soup with assorted meat and vegetables",
    longDescription:
      "A traditional Nigerian delicacy made from ground melon seeds, creating a rich and nutritious soup. Our Egusi is loaded with assorted meat, fish, and leafy vegetables, simmered in palm oil and seasoned with authentic African spices. Served with your choice of pounded yam, rice, or fufu.",
    ingredients: [
      "Ground melon seeds",
      "Assorted meat",
      "Stockfish",
      "Palm oil",
      "Spinach",
      "Onions",
      "Tomatoes",
      "Scotch bonnet peppers",
      "Locust beans",
      "Seasoning cubes",
    ],
    allergens: ["Fish"],
    category: "Soup",
    spiceLevel: 3,
    preparationTime: "60 minutes",
    calories: 580,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: 5,
    name: "Pepper Soup",
    price: "$15.99",
    image: "/african-pepper-soup-with-meat.jpg",
    description: "Spicy traditional soup with aromatic herbs and spices",
    longDescription:
      "A warming and invigorating soup that's perfect for any weather. Our Pepper Soup is made with a blend of traditional African spices and herbs, creating a clear, flavorful broth with tender pieces of meat. Known for its medicinal properties and bold flavors.",
    ingredients: [
      "Goat meat",
      "Pepper soup spice",
      "Scent leaves",
      "Onions",
      "Ginger",
      "Garlic",
      "Scotch bonnet peppers",
      "Salt",
      "Seasoning cubes",
    ],
    allergens: ["None"],
    category: "Soup",
    spiceLevel: 5,
    preparationTime: "40 minutes",
    calories: 320,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: 6,
    name: "Vegetable Jollof",
    price: "$14.99",
    image: "/african-food-spread-with-jollof-rice-and-grilled-m.jpg",
    description: "Plant-based version of our famous Jollof rice",
    longDescription:
      "All the flavors you love in our traditional Jollof rice, made completely plant-based. This vegetarian version is packed with colorful vegetables, aromatic spices, and plant-based protein, creating a satisfying and nutritious meal that doesn't compromise on taste.",
    ingredients: [
      "Basmati rice",
      "Mixed vegetables",
      "Tomatoes",
      "Onions",
      "Bell peppers",
      "Carrots",
      "Green beans",
      "Garlic",
      "Ginger",
      "Vegetable stock",
      "Nutritional yeast",
    ],
    allergens: ["None"],
    category: "Vegetarian",
    spiceLevel: 2,
    preparationTime: "35 minutes",
    calories: 380,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
]

export function getMealById(id: number): Meal | undefined {
  return meals.find((meal) => meal.id === id)
}

export function getMealsByCategory(category: string): Meal[] {
  return meals.filter((meal) => meal.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(meals.map((meal) => meal.category))]
}
