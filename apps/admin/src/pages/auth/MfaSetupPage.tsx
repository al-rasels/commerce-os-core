import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { api } from "@/lib/api/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function MfaSetupPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isMfaEnabled, setIsMfaEnabled] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [secret, setSecret] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await api.get<{ mfa_configured: boolean }>("/api/v1/auth/me")
        setIsMfaEnabled(data.mfa_configured)
      } catch (err: any) {
        toast.error("Failed to load MFA status")
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [])

  const handleSetup = async () => {
    setSubmitting(true)
    try {
      const data = await api.post<{ secret: string; qr_code: string }>("/api/v1/auth/mfa/setup", {
        user_id: user?.id,
      })
      setQrCode(data.qr_code)
      setSecret(data.secret)
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate MFA setup")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEnable = async (e: React.FormEvent) => {
    e.preventDefault()
    if (verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code")
      return
    }

    setSubmitting(true)
    try {
      await api.post("/api/v1/auth/mfa/enable", {
        user_id: user?.id,
        code: verificationCode,
      })
      toast.success("Two-factor authentication enabled")
      setIsMfaEnabled(true)
      setQrCode("")
      setSecret("")
      setVerificationCode("")
    } catch (err: any) {
      toast.error(err.message || "Invalid verification code")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDisable = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post("/api/v1/auth/mfa/disable", {
        user_id: user?.id,
        password: password,
      })
      toast.success("Two-factor authentication disabled")
      setIsMfaEnabled(false)
      setPassword("")
    } catch (err: any) {
      toast.error(err.message || "Failed to disable MFA")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Two-Factor Authentication</h1>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
      </div>

      {isMfaEnabled ? (
        <Card>
          <CardHeader>
            <CardTitle>MFA is Enabled</CardTitle>
            <CardDescription>
              Your account is currently protected with two-factor authentication.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleDisable}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Enter password to disable</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>Back</Button>
              <Button type="submit" variant="destructive" disabled={submitting}>
                {submitting ? "Disabling..." : "Disable MFA"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : qrCode ? (
        <Card>
          <CardHeader>
            <CardTitle>Setup Authenticator App</CardTitle>
            <CardDescription>
              Scan the QR code with your authenticator app (e.g., Google Authenticator, Authy), then enter the code it generates below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleEnable}>
            <CardContent className="space-y-6 flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col items-center">
                <img src={qrCode} alt="QR Code for MFA" className="w-48 h-48" />
                {secret && (
                  <p className="mt-2 text-xs font-mono text-muted-foreground select-all">
                    Manual key: <span className="font-semibold text-foreground">{secret}</span>
                  </p>
                )}
              </div>
              <div className="space-y-2 w-full text-left">
                <Label htmlFor="code">Verification Code</Label>
                <Input 
                  id="code" 
                  type="text" 
                  inputMode="numeric"
                  className="text-center text-xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  value={verificationCode} 
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} 
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setQrCode("")}>Cancel</Button>
              <Button type="submit" disabled={submitting || verificationCode.length !== 6}>
                {submitting ? "Verifying..." : "Enable MFA"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Secure Your Account</CardTitle>
            <CardDescription>
              Two-factor authentication requires you to enter a code from an authenticator app in addition to your password when signing in.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>Back</Button>
            <Button onClick={handleSetup} disabled={submitting}>
              {submitting ? "Loading..." : "Set up MFA"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
