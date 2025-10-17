"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight, MapPin, Clock, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

const galleryCategories = [
  { id: "all", name: "All Photos", count: 24 },
  { id: "food", name: "Our Dishes", count: 12 },
  { id: "restaurant", name: "Restaurant", count: 8 },
  { id: "events", name: "Events", count: 4 },
]

const galleryImages = [
  {
    id: 1,
    src: "/jollof-rice-with-chicken-and-vegetables.jpg",
    alt: "Jollof Rice with Chicken",
    category: "food",
    title: "Signature Jollof Rice",
    description: "Our famous jollof rice with tender chicken and fresh vegetables",
  },
  {
    id: 2,
    src: "/suya-grilled-meat-skewers-with-spices.jpg",
    alt: "Suya Grilled Meat Skewers",
    category: "food",
    title: "Traditional Suya",
    description: "Perfectly grilled meat skewers with authentic African spices",
  },
  {
    id: 3,
    src: "/fried-plantain-with-grilled-fish-african-style.jpg",
    alt: "Fried Plantain with Grilled Fish",
    category: "food",
    title: "Plantain & Fish",
    description: "Golden fried plantains served with seasoned grilled fish",
  },
  {
    id: 4,
    src: "/egusi-soup-with-meat-and-vegetables.jpg",
    alt: "Egusi Soup",
    category: "food",
    title: "Rich Egusi Soup",
    description: "Traditional melon seed soup with assorted meat and vegetables",
  },
  {
    id: 5,
    src: "/african-food-spread-with-jollof-rice-and-grilled-m.jpg",
    alt: "African Food Spread",
    category: "food",
    title: "Family Feast",
    description: "A beautiful spread of our most popular dishes",
  },
  {
    id: 6,
    src: "/african-chef-cooking-traditional-dishes-in-kitchen.jpg",
    alt: "Chef Cooking",
    category: "restaurant",
    title: "Our Master Chef",
    description: "Chef preparing traditional dishes with passion and expertise",
  },
  {
    id: 7,
    src: "/placeholder-z7sy1.png",
    alt: "Restaurant Interior",
    category: "restaurant",
    title: "Warm Atmosphere",
    description: "Our cozy dining area with traditional African decor",
  },
  {
    id: 8,
    src: "/placeholder-1e5nh.png",
    alt: "Dining Experience",
    category: "restaurant",
    title: "Dining Experience",
    description: "Guests enjoying their meals in our welcoming space",
  },
  {
    id: 9,
    src: "/placeholder-1kyw0.png",
    alt: "Kitchen Team",
    category: "restaurant",
    title: "Our Kitchen Team",
    description: "Dedicated chefs preparing fresh meals daily",
  },
  {
    id: 10,
    src: "/placeholder-3cbmk.png",
    alt: "Bar Area",
    category: "restaurant",
    title: "Refreshment Bar",
    description: "Our bar featuring traditional and modern beverages",
  },
  {
    id: 11,
    src: "/placeholder-ls9d9.png",
    alt: "Cultural Event",
    category: "events",
    title: "Cultural Night",
    description: "Special cultural events celebrating African heritage",
  },
  {
    id: 12,
    src: "/placeholder-eiu3k.png",
    alt: "Birthday Celebration",
    category: "events",
    title: "Birthday Celebrations",
    description: "Making special occasions memorable with great food",
  },
  {
    id: 13,
    src: "/placeholder-ebq8m.png",
    alt: "Wedding Reception",
    category: "events",
    title: "Wedding Receptions",
    description: "Beautiful wedding celebrations with authentic cuisine",
  },
  {
    id: 14,
    src: "/placeholder-jwmjt.png",
    alt: "Corporate Event",
    category: "events",
    title: "Corporate Events",
    description: "Professional gatherings with exceptional catering",
  },
  {
    id: 15,
    src: "/placeholder-0bz7c.png",
    alt: "Grilled Tilapia",
    category: "food",
    title: "Grilled Tilapia",
    description: "Fresh tilapia grilled to perfection with seasonal vegetables",
  },
  {
    id: 16,
    src: "/african-pepper-soup-with-meat.jpg",
    alt: "Pepper Soup",
    category: "food",
    title: "Spicy Pepper Soup",
    description: "Traditional pepper soup with tender meat and aromatic spices",
  },
  {
    id: 17,
    src: "/placeholder-g7rur.png",
    alt: "Rice and Beans",
    category: "food",
    title: "Rice & Beans",
    description: "Hearty rice and beans served with sweet plantains",
  },
  {
    id: 18,
    src: "/placeholder-ma28r.png",
    alt: "Meat Pies",
    category: "food",
    title: "Fresh Meat Pies",
    description: "Homemade meat pies and pastries baked daily",
  },
  {
    id: 19,
    src: "/placeholder-4uzxn.png",
    alt: "Outdoor Seating",
    category: "restaurant",
    title: "Outdoor Dining",
    description: "Beautiful outdoor seating area for al fresco dining",
  },
  {
    id: 20,
    src: "/placeholder-1g5ts.png",
    alt: "Private Dining",
    category: "restaurant",
    title: "Private Dining",
    description: "Intimate private dining rooms for special occasions",
  },
  {
    id: 21,
    src: "/placeholder-9x461.png",
    alt: "Traditional Drinks",
    category: "food",
    title: "Traditional Beverages",
    description: "Authentic African drinks and refreshing beverages",
  },
  {
    id: 22,
    src: "/placeholder-0czox.png",
    alt: "African Desserts",
    category: "food",
    title: "Sweet Treats",
    description: "Traditional African desserts and sweet delicacies",
  },
  {
    id: 23,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Restaurant Entrance",
    category: "restaurant",
    title: "Welcome to Mamapoote",
    description: "Our inviting entrance welcomes you to an authentic experience",
  },
  {
    id: 24,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Our Team",
    category: "restaurant",
    title: "Meet Our Team",
    description: "The dedicated team behind your exceptional dining experience",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex((img) => img.id === image.id))
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(filteredImages[prevIndex])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-orange-600">Mamapoote</h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-orange-600 transition-colors">
                Menu
              </Link>
              <Link href="/gallery" className="text-orange-600 font-medium">
                Gallery
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our Gallery</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-pretty">
            Take a visual journey through our authentic African cuisine, warm atmosphere, and memorable moments
          </p>
        </div>
      </section>

      {/* Gallery Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                onClick={() => openLightbox(image)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg">{selectedImage.description}</p>
              <p className="text-sm mt-2 opacity-75">
                {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div>
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Mamapoote</h3>
              <p className="text-gray-300 mb-4">
                Authentic African cuisine served with love and tradition. Experience the rich flavors of our heritage.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-400" />
                Opening Hours
              </h4>
              <div className="space-y-2 text-gray-300">
                <p>Mon - Fri: 9:00 AM - 9:30 PM</p>
                <p>Saturday: 10:00 AM - 11:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-400" />
                  <span>Victoria Island, Lagos, Nigeria</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-orange-400" />
                  <span>+234 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-orange-400" />
                  <span>hello@mamapoote.com</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-4">Subscribe to get special offers and updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button className="bg-orange-600 hover:bg-orange-700 rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mamapoote. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
