
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Copy, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MFASetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedCodes, setCopiedCodes] = useState(false);

  // Mock QR code data and backup codes
  const qrCodeData = "otpauth://totp/SecureDeploy:john.doe@company.com?secret=JBSWY3DPEHPK3PXP&issuer=SecureDeploy";
  const backupCodes = [
    "abc123def",
    "ghi456jkl",
    "mno789pqr",
    "stu012vwx",
    "yz345abc6",
    "def789ghi",
    "jkl012mno",
    "pqr345stu"
  ];

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      setError("Verification code is required");
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError("Verification code must be 6 digits");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate verification API call
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === "123456") {
        setStep(2);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }, 1000);
  };

  const handleComplete = () => {
    navigate("/dashboard");
  };

  const copyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  const handleCodeChange = (value: string) => {
    // Only allow numeric input and limit to 6 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(numericValue);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl">Save your backup codes</CardTitle>
            <CardDescription>
              Store these codes in a safe place. You can use them to access your account if you lose your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                Each backup code can only be used once. Save them securely!
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-2 text-center font-mono text-sm">
                {backupCodes.map((code, index) => (
                  <div key={index} className="p-2 bg-white rounded">
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mb-4"
              onClick={copyBackupCodes}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copiedCodes ? "Copied!" : "Copy codes"}
            </Button>

            <Button className="w-full" onClick={handleComplete}>
              I've saved my backup codes
            </Button>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-sm"
              >
                Skip for now (not recommended)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl">Set up Two-Factor Authentication</CardTitle>
          <CardDescription>
            Scan this QR code with your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm text-muted-foreground text-center">
                  QR Code would be displayed here<br />
                  (Mock implementation)
                </span>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Can't scan the code?</strong><br />
                Manually enter this key in your authenticator app:<br />
                <code className="text-sm bg-muted px-1 rounded">JBSWY3DPEHPK3PXP</code>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification">Verification Code</Label>
                <Input
                  id="verification"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="text-center text-xl tracking-widest"
                  maxLength={6}
                  aria-required="true"
                  aria-invalid={!!error}
                  aria-describedby={error ? "verification-error" : "verification-help"}
                />
                <p id="verification-help" className="text-xs text-muted-foreground text-center">
                  Enter the 6-digit code from your authenticator app
                </p>
                {error && (
                  <p id="verification-error" className="text-sm text-destructive text-center" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MFASetup;
