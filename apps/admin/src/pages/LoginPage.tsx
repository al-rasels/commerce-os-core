import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck, ArrowRight, Command, WifiOff } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginError {
  message: string
  kind: "auth" | "network" | "generic"
}

function toLoginError(err: unknown): LoginError {
  const raw = err instanceof Error ? err.message : String(err || "An unexpected error occurred.")
  if (/failed to fetch|networkerror|network error|cannot connect to server|api server is running/i.test(raw)) {
    return {
      message: "Cannot connect to the server. Please verify the API is running and try again.",
      kind: "network",
    }
  }
  if (/incorrect email or password|invalid credentials|unauthorized/i.test(raw)) {
    return { message: raw, kind: "auth" }
  }
  return { message: raw, kind: "generic" }
}

const REMEMBER_EMAIL_KEY = "admin_remember_email"

export default function LoginPage() {
  const { login, mfaVerify } = useAuth()
  const navigate = useNavigate()

  const [mfaCode, setMfaCode] = useState("")
  const [mfaToken, setMfaToken] = useState("")
  const [error, setError] = useState<LoginError | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mfaLoading, setMfaLoading] = useState(false)
  const [rememberEmail, setRememberEmail] = useState<boolean>(
    () => localStorage.getItem(REMEMBER_EMAIL_KEY) !== null
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      email: rememberEmail ? localStorage.getItem(REMEMBER_EMAIL_KEY) ?? "" : "",
      password: "",
    },
  })

  const email = watch("email")
  const password = watch("password")
  const canSubmit = Boolean(email?.trim() && password)

  // Detect caps lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setCapsLock(e.getModifierState("CapsLock"))
    const handleKeyUp = (e: KeyboardEvent) => setCapsLock(e.getModifierState("CapsLock"))

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  async function onSubmit(data: LoginFormValues) {
    setError("")

    try {
      const mfaState = await login(data.email, data.password)

      if (mfaState && mfaState.mfa_token) {
        setMfaToken(mfaState.mfa_token)
        return
      }

      setSuccess(true)
      toast.success("Authentication successful")

      setTimeout(() => {
        navigate("/", { replace: true })
      }, 600)
    } catch (err: any) {
      const message = err.message || "An unexpected network error occurred."
      setError(message)
      toast.error("Authentication Failed", { description: message })
    }
  }

  async function handleMfaSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setMfaLoading(true)
    try {
      await mfaVerify(mfaToken, mfaCode)
      setSuccess(true)
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 600)
    } catch (err: any) {
      setError(err.message || "Invalid authentication code")
      setMfaLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Panel - Branding/Hero */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r bg-zinc-950 p-10 lg:flex dark:border-r-white/10">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glow effect */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] w-[500px] h-[500px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2 text-white">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Command className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">CommerceOS</span>
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="text-2xl font-medium leading-relaxed text-zinc-100">
              "The platform has fundamentally transformed how we operate. We've scaled our operations globally without adding overhead to our engineering teams."
            </p>
            <footer className="flex items-center gap-4 text-sm">
              <div className="size-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">Sarah Jenkins</span>
                <span className="text-zinc-400">VP of Engineering, Acme Corp</span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {!mfaToken ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <div className="flex justify-center lg:hidden mb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
                    <Command className="size-6 text-primary-foreground" />
                  </div>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Sign in
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to access the admin panel.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      autoComplete="email"
                      className={cn(
                        "pl-10 h-10",
                        errors.email && "border-destructive focus-visible:ring-destructive"
                      )}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className={cn(
                        "pl-10 pr-10 h-10",
                        errors.password && "border-destructive focus-visible:ring-destructive"
                      )}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
                  )}
                  {capsLock && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-warning font-medium"
                    >
                      Caps lock is on
                    </motion.p>
                  )}
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="text-sm text-destructive font-medium bg-destructive/10 px-3 py-2 rounded-md border border-destructive/20 mt-1">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  className="w-full h-10 transition-all relative"
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Authenticating...
                    </>
                  ) : success ? (
                    "Signing in..."
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-2">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-6" />
                  </div>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Two-Factor Auth
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app to continue.
                </p>
              </div>

              <form onSubmit={handleMfaSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code">Authentication Code</Label>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="000 000"
                    className="text-center text-2xl tracking-widest h-14 font-mono"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-destructive font-medium bg-destructive/10 px-3 py-2 rounded-md border border-destructive/20 overflow-hidden"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  className="w-full h-10" 
                  disabled={mfaLoading || success || mfaCode.length < 6}
                >
                  {mfaLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
                
                <button
                  type="button"
                  onClick={() => setMfaToken("")}
                  className="w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-4"
                >
                  Cancel
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
