"use client"
import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/hooks/useUser"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { loading, isValid } = useUser()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#052f2e] to-neutral-900">
        <div className="text-neutral-300">
          <Loader2 className="animate-spin h-5 w-5" />
        </div>  
      </div>
    )
  }

  if (isValid) {
    // Redirect to login page
    navigate("/")
    return <></>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password })
      localStorage.setItem("authToken", res.data.token)
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError("Invalid email or password")
      } else if (err.response?.status === 429) {
        setError("Too many login attempts. Please try again later.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection.")
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen overscroll-none overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#052f2e] to-neutral-900 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#14b8a6] rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-white rounded-md"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-neutral-400">Sign in to your account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-200 font-medium">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-200 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 disabled:opacity-50 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#14b8a6] cursor-pointer hover:bg-[#14b8a6]/70 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-neutral-700">
            <p className="text-neutral-400">
              {"Don't have an account? "}
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-[#14b8a6] p-0 h-auto font-medium"
                disabled={isLoading}
              >
                Sign up
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
