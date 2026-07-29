import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, Mail, Lock, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { login, mfaVerify } = useAuth()
  const navigate = useNavigate()
  
  const [mfaCode, setMfaCode] = useState("")
  const [mfaToken, setMfaToken] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mfaLoading, setMfaLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

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
      toast.success("Welcome back!", { icon: <CheckCircle2 className="size-4 text-green-500" /> })
      
      // Delay navigation slightly for success animation
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 600)
    } catch (err: any) {
      // Meaningful error handling
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

  if (mfaToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[400px]"
        >
          <div className="rounded-2xl border bg-card text-card-foreground shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <div className="p-8">
              <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ShieldCheck className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Two-Factor Auth</h1>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app to continue.
                </p>
              </div>

              <form onSubmit={handleMfaSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Authentication Code</Label>
                  <div className="relative">
                    <Input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="000 000"
                      className="text-center text-2xl tracking-widest h-14"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <Button type="submit" className="w-full h-11 text-base relative overflow-hidden" disabled={mfaLoading || success || mfaCode.length < 6}>
                  <AnimatePresence mode="wait">
                    {mfaLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                        <Loader2 className="mr-2 size-5 animate-spin" /> Verifying
                      </motion.div>
                    ) : success ? (
                      <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                        <CheckCircle2 className="mr-2 size-5" /> Success
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                        Verify Code <ArrowRight className="ml-2 size-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        <div className="rounded-2xl border bg-card text-card-foreground shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
          
          <div className="p-8">
            <div className="flex flex-col items-center space-y-2 text-center mb-10">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary shadow-inner mb-2">
                <span className="text-xl font-bold text-primary-foreground tracking-tighter">C</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
              <p className="text-sm text-muted-foreground font-medium">
                Sign in to your CommerceOS admin panel
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    autoComplete="email"
                    className={`pl-10 h-12 bg-muted/50 focus:bg-background transition-colors ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                  <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline transition-all">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`pl-10 pr-10 h-12 bg-muted/50 focus:bg-background transition-colors ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register("password")}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                )}
                {capsLock && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    className="text-xs text-amber-500 font-medium pt-1"
                  >
                    Caps lock is on
                  </motion.p>
                )}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md border border-destructive/20"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold transition-all relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed" 
                  disabled={isSubmitting || success}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                        <Loader2 className="mr-2 size-5 animate-spin" /> Authenticating...
                      </motion.div>
                    ) : success ? (
                      <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                        <CheckCircle2 className="mr-2 size-5" /> Signed In
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                        Sign In
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </form>
          </div>
          
          <div className="bg-muted/50 p-4 border-t text-center text-xs text-muted-foreground">
            Protected by CommerceOS Security. 
          </div>
        </div>
      </motion.div>
    </div>
  )
}
