"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <Image
          src="/images/l1.jpg"
          fill
          alt="Legal meeting illustration"
          className="z-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-indigo-900/80 z-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-8 left-8 z-20">
          <div className="flex items-center gap-3 text-white">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">LegalWand</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col justify-center items-start p-16 max-w-lg ml-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Join 10,000+ Legal Professionals
            </div>

            <h1 className="text-5xl font-bold text-white leading-tight">
              Start Your
              <span className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Legal AI Journey
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Join thousands of legal professionals who are already transforming their practice with AI-powered
              solutions.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "AI-powered contract analysis",
                "Automated document generation",
                "Intelligent compliance checking",
                "24/7 legal assistant support",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 backdrop-blur-sm border border-white/10"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:w-2/5 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LegalWand</h1>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8 pt-12 px-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Create Account
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Join the future of legal practice today
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-12">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="h-14 pl-12 pr-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl bg-gray-50/50 transition-all duration-200 hover:bg-white focus:bg-white"
                      required
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-14 pl-12 pr-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl bg-gray-50/50 transition-all duration-200 hover:bg-white focus:bg-white"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="h-14 pl-12 pr-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl bg-gray-50/50 transition-all duration-200 hover:bg-white focus:bg-white"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </div>
                <Link
                  href="/sign-in"
                  className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                >
                  Sign in instead
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
