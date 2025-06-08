
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MFAPrompt = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      setError("Verification code is required");
      return;
    }
    
    if (code.length !== 6) {
      setError("Verification code must be 6 digits");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate MFA verification API call
    setTimeout(() => {
      setIsLoading(false);
      if (code === "123456") {
        navigate("/dashboard");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }, 1000);
  };

  const handleCodeChange = (value: string) => {
    // Only allow numeric input and limit to 6 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(numericValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                aria-required="true"
                aria-invalid={!!error}
                aria-describedby={error ? "code-error" : "code-help"}
              />
              <p id="code-help" className="text-xs text-muted-foreground text-center">
                Open your authenticator app and enter the 6-digit code
              </p>
              {error && (
                <p id="code-error" className="text-sm text-destructive text-center" role="alert">
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="text-sm"
            >
              Use a backup code instead
            </Button>
            <div className="text-xs text-muted-foreground">
              Having trouble? Contact your administrator
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MFAPrompt;
