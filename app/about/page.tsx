"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Clock, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Mama Adunni",
    role: "Head Chef & Founder",
    image: "/placeholder.svg?key=chef1",
    bio: "With over 20 years of culinary experience, Mama Adunni brings authentic Nigerian flavors to every dish.",
  },
  {
    name: "Chef Kemi",
    role: "Sous Chef",
    image: "/placeholder.svg?key=chef2",
    bio: "Specializing in traditional West African cuisine with a modern twist.",
  },
  {
    name: "Chef Tunde",
    role: "Grill Master",
    image: "/placeholder.svg?key=chef3",
    bio: "Expert in suya and grilled specialties, bringing the authentic taste of Nigerian street food.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Authentic Flavors",
    description:
      "We use traditional recipes passed down through generations, ensuring every dish captures the true essence of African cuisine.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe food brings people together. Our restaurant is a place where families and friends create lasting memories.",
  },
  {
    icon: Award,
    title: "Quality Ingredients",
    description: "We source the finest ingredients, including authentic African spices and fresh local produce.",
  },
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "Every dish is prepared fresh daily with love and attention to detail, just like home cooking.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-accent/20 to-accent/10 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/placeholder.svg?key=restaurant-interior')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Bringing the authentic taste of Africa to your table, one dish at a time
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          {/* Our Story */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Mamapoote Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020 by Mama Adunni, Mamapoote began as a dream to share the rich culinary heritage of West
                  Africa with the world. Growing up in Lagos, Nigeria, Mama Adunni learned the art of cooking from her
                  grandmother, who taught her that food is more than sustenance—it's love, culture, and connection.
                </p>
                <p>
                  After moving to the diaspora, Mama Adunni noticed how difficult it was to find authentic African
                  cuisine that truly captured the flavors of home. This inspired her to create Mamapoote, a place where
                  traditional recipes meet modern dining, and where every meal tells a story of heritage and passion.
                </p>
                <p>
                  Today, Mamapoote has become a beloved destination for food lovers seeking authentic African flavors.
                  We take pride in using traditional cooking methods, sourcing authentic ingredients, and creating an
                  atmosphere that feels like home.
                </p>
              </div>
            </div>
            <div className="relative">
              <img src="/african-restaurant-kitchen-with-traditional-cookin.jpg" alt="Mamapoote kitchen" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">4+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These core values guide everything we do, from sourcing ingredients to serving our guests
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 border-0 bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Meet Our Team */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate chefs and staff who bring authentic African flavors to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden border-0 bg-card hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`/ceholder-svg-key-team-.jpg?key=team-${index}&height=300&width=300&query=${encodeURIComponent(member.name + " African chef portrait")}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <Badge variant="secondary">{member.role}</Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Awards & Recognition</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Best African Restaurant 2023</h3>
                  <p className="text-muted-foreground">Lagos Food Awards</p>
                </div>

                <div className="space-y-3">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Community Choice Award</h3>
                  <p className="text-muted-foreground">Local Business Excellence</p>
                </div>

                <div className="space-y-3">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">4.9/5 Customer Rating</h3>
                  <p className="text-muted-foreground">Based on 500+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Visit Us Today</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-accent" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Victoria Island, Lagos</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6 text-accent" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-muted-foreground">+234 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-accent" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground">hello@mamapoote.com</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/menu">View Our Menu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
