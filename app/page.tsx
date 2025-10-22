"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MenuIcon,
  ShoppingCart,
  MapPin,
  Clock,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { UserProfileDropdown } from "@/components/UserProfileDropdown"
import { AddToCartModal } from "@/components/AddToCartModal"
import { meals } from "@/lib/meals"

const heroSlides = [
  {
    id: 1,
    title: "Authentic African Flavors",
    subtitle: "Experience the rich taste of traditional African cuisine",
    description: "Discover delectable cuisine and unforgettable moments at our welcoming culinary haven.",
    image: "/african-food-spread-with-jollof-rice-and-grilled-m.jpg",
    cta: "Order Now",
  },
  {
    id: 2,
    title: "Fresh Ingredients Daily",
    subtitle: "Made with love, served with pride",
    description: "Our chefs prepare every dish with the finest ingredients and authentic African spices.",
    image: "/african-chef-cooking-traditional-dishes-in-kitchen.jpg",
    cta: "Explore Menu",
  },
  {
    id: 3,
    title: "Your Meal, Your Way",
    subtitle: "Customize every ingredient to match your taste",
    description:
      "Be part of the process! View all ingredients and personalize your dish to suit your preferences or dietary needs.",
    image: "/ingredients-customization-african-cuisine.jpg",
    cta: "Explore Menu",
  },
]

const featuredMenuItem = [
  {
    id: 1,
    name: "Jollof Rice Special",
    price: "$18.99",
    image: "/jollof-rice-with-chicken-and-vegetables.jpg",
    description: "Traditional West African rice dish with aromatic spices",
  },
  {
    id: 2,
    name: "Suya Platter",
    price: "$22.99",
    image: "/suya-grilled-meat-skewers-with-spices.jpg",
    description: "Grilled spiced meat skewers with traditional seasonings",
  },
  {
    id: 3,
    name: "Plantain & Fish",
    price: "$16.99",
    image: "/fried-plantain-with-grilled-fish-african-style.jpg",
    description: "Perfectly fried plantains with seasoned grilled fish",
  },
  {
    id: 4,
    name: "Egusi Soup",
    price: "$19.99",
    image: "/egusi-soup-with-meat-and-vegetables.jpg",
    description: "Rich melon seed soup with assorted meat and vegetables",
  },
]
const featuredMenuItems = meals.slice(0, 4)

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Downtown, Lagos",
    rating: 5,
    comment:
      "The best restaurant! Last night we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    avatar: "/smiling-african-woman.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Victoria Island",
    rating: 5,
    comment:
      "Simply delicious! The flavors were cozy and relaxed, making it a perfect venue for our anniversary dinner.",
    avatar: "/smiling-asian-man.png",
  },
  {
    id: 3,
    name: "Amara Okafor",
    location: "Ikeja, Lagos",
    rating: 5,
    comment:
      "One of a kind restaurant! The culinary experience at this place is first to none. The food was the highlight of our evening.",
    avatar: "/african-woman-professional-portrait.png",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { user, signOut } = useAuth()
  const { items } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const handleAddToCart = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">Mamapoote</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-orange-600 transition-colors">
                Menu
              </Link>
              {/* <Link href="/gallery" className="text-gray-700 hover:text-orange-600 transition-colors">
                Gallery
              </Link> */}
              <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
                Contact
              </Link>
            </div>
            {/* <div className="flex items-center space-x-4">
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
      </nav> */}
      <div className="flex items-center space-x-3">
              <div className="relative">
                <Button variant="ghost" size="icon" asChild className="hover:bg-accent/10">
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {cartItemsCount}
                  </Badge>
                )}
              </div>

              {user ? (
                <UserProfileDropdown />
              ) : (
                <div className="hidden sm:flex z-50 space-x-3">
                  <Button variant="outline" size="sm" asChild className="font-medium bg-transparent">
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild className="font-medium">
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* asChild */}
                  <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600">
                    <MenuIcon className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 space-y-2 py-4 px-2">
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100">
                    <Link href="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100">
                    <Link href="/menu">Menu</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100">
                    <Link href="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100">
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                  {!user && (
                    <>
                      <DropdownMenuItem asChild className="mx-2 border border-orange-400 bg-orange-400 hover:bg-orange-600 text-white cursor-pointer">
                        <Link href="/auth/signin" className="flex justify-center">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="mx-2 mt-3 border border-orange-400 hover:border-orange-600 bg-white text-orange-400 hover:text-orange-600 cursor-pointer">
                        <Link href="/auth/signup" className="flex justify-center">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-5xl px-4 sm:px-6 space-y-4 sm:space-y-6 lg:space-y-8">
                <h2 className="hero-text text-4xl sm:text-6xl md:text-7xl font-bold mb-4 text-balance text-shadow tracking-tight">{slide.title}</h2>
                <p className="hero-subtitle text-lg sm:text-2xl md:text-3xl mb-2 text-orange-300 text-shadow">{slide.subtitle}</p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-pretty leading-relaxed px-4">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
                  {/* space-y-4 sm:space-y-0 sm:space-x-6 pt-4 */}
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-base sm:text-lg font-semibold elegant-shadow w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4">
                    {slide.cta}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.location.href = '/menu'}
                    className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-transparent backdrop-blur-sm"
                  >
                    View Menu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full h-10 w-10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full h-10 w-10 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-orange-600" : "bg-white/50"
              }`}
            />
          ))}
        </div> */}
      </section>

      {/* Featured Menu Items */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3 sm:space-y-4 lg:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance tracking-tight">Our Signature Dishes</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 text-pretty">
              Discover our most beloved dishes, crafted with authentic African flavors and the finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredMenuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 p-0 gap-0 bg-card cursor-pointer">
                <Link href={`/meal/${item.id}`}>
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                </Link>
                <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3 lg:space-y-4">
                  {/* <h3 className="font-semibold text-lg mb-2">{item.name}</h3> */}
                  <Link href={`/meal/${item.id}`}>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground hover:text-orange-600 transition-colors cursor-pointer line-clamp-2">
                        {item.name}
                      </h3>
                      </Link>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-lg sm:text-xl font-bold text-gray-500">{item.price}</span>
                    <Button size="sm" onClick={() => handleAddToCart(item)} className="bg-orange-600 hover:bg-orange-700 font-medium text-xs sm:text-sm">
                      <ShoppingCart className="w-3 h-3 sm:h-4 sm:w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-4 sm:pt-8 lg:pt-10">
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg sm:font-semibold"
              >
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance tracking-tight">What Our Customers Say</h2>
            <p className="text-base sm:text-lg text-gray-600 text-pretty px-4">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-4 sm:p-6 elegant-shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card">
                <CardContent className="p-0 space-y-3 sm:space-y-4">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-sm sm:text-base lg:text-lg leading-snug">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3 sm:space-x-4 pt-2">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-sm sm:text-base">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Restaurant Info */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-4">Mamapoote</h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
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
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p>Mon - Fri: 9:00 AM - 9:30 PM</p>
                <p>Saturday: 10:00 AM - 11:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0 text-orange-400" />
                  <span>Victoria Island, Lagos, Nigeria</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 mt-0.5 text-orange-400" />
                  <span>+234 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 text-orange-400" />
                  <span>hello@mamapoote.com</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 text-sm sm:text-base mb-4">Subscribe to get special offers and updates</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-1 bg-gray-800 border border-gray-700 sm:rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 w-full text-sm sm:text-base"
                />
                <Button className="bg-orange-600 hover:bg-orange-700 sm:rounded-l-none py-1 ring-1 ring-orange-600 font-medium sm:text-base">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-4 sm:pt-6 lg:pt-8 text-center text-sm sm:text-base text-gray-400">
            <p>&copy; {new Date().getFullYear()} Mamapoote. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AddToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
    </div>
  )
}
