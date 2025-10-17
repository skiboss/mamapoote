"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, User, Mail, Phone, Calendar, Star, Heart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "",
  })

  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const memberSince = user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "Recently"

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      <Star className="h-3 w-3 mr-1" />
                      Member since {memberSince}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Orders</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Favorite Dishes</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Loyalty Points</span>
                      <span className="font-medium text-accent">240</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => {
                      if (isEditing) {
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone || "",
                          bio: "",
                        })
                      }
                      setIsEditing(!isEditing)
                    }}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{user.phone || "Not provided"}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Member Since</Label>
                      <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{memberSince}</span>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preferences Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Food Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Dietary Restrictions</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences?.dietaryRestrictions?.length ? (
                        user.preferences.dietaryRestrictions.map((restriction) => (
                          <Badge key={restriction} variant="outline">
                            {restriction}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">None specified</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Favorite Categories</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences?.favoriteCategories?.length ? (
                        user.preferences.favoriteCategories.map((category) => (
                          <Badge key={category} variant="secondary">
                            <Heart className="h-3 w-3 mr-1" />
                            {category}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">None specified</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Spice Level</Label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-4 h-4 rounded-full ${
                            level <= (user.preferences?.spiceLevel || 2) ? "bg-accent" : "bg-muted"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {["Mild", "Medium", "Medium+", "Hot", "Very Hot"][(user.preferences?.spiceLevel || 2) - 1]}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
