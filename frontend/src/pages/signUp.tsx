"use client"
import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/useUser"

export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword && confirmPassword !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("Password is too weak. Please include uppercase, lowercase, and numbers.")
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", { email, password })
      localStorage.setItem("authToken", res.data.token)

      navigate("/")
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("An account with this email already exists")
      } else if (err.response?.status === 429) {
        setError("Too many registration attempts. Please try again later.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection.")
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthClass = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-[#14b8a6]"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  const getStrengthTextColor = (strength: number) => {
    if (strength < 2) return "text-red-400"
    if (strength < 4) return "text-yellow-400"
    return "text-[#14b8a6]"
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
            <h2 className="text-2xl font-bold text-white">Create account</h2>
            <p className="text-neutral-400">Sign up to get started</p>
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
                placeholder="Create a password"
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

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Password strength:</span>
                  <span className={`font-medium ${getStrengthTextColor(passwordStrength)}`}>
                    {getStrengthText(passwordStrength)}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 rounded-full flex-1 transition-colors ${
                        level <= passwordStrength ? getStrengthClass(passwordStrength) : "bg-neutral-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-neutral-200 font-medium">
              Confirm password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={isLoading}
                className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 disabled:opacity-50 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className="flex items-center space-x-2 text-sm">
                {passwordsMatch ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-[#14b8a6]" />
                    <span className="text-[#14b8a6]">Passwords match</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
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
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-neutral-700">
            <p className="text-neutral-400">
              Already have an account?{" "}
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/login")}
                className="cursor-pointer text-[#14b8a6] p-0 h-auto font-medium"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
