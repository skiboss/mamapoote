"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, User, ShoppingBag, Settings, LogOut, Heart, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export function UserProfileDropdown() {
  const { user, signOut } = useAuth()

  if (!user) return null

  const memberSince = user.joinedDate ? new Date(user.joinedDate).getFullYear() : new Date().getFullYear()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* asChild */}
        <Button variant="ghost" className="flex items-center space-x-3 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-accent text-accent-foreground">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">Welcome, {user.name.split(" ")[0]}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {/* <Badge variant="secondary" className="text-xs mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  Member since {memberSince}
                </Badge> */}
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center space-x-2 py-3">
            <User className="h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/orders" className="flex items-center space-x-2 py-3">
            <ShoppingBag className="h-4 w-4" />
            <span>Order History</span>
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem asChild>
          <Link href="/favorites" className="flex items-center space-x-2 py-3">
            <Heart className="h-4 w-4" />
            <span>My Favorites</span>
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center space-x-2 py-3">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center space-x-2 py-3 text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
