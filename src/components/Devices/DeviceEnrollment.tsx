
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Eye, EyeOff, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeviceEnrollment = () => {
  const navigate = useNavigate();
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [formData, setFormData] = useState({
    azureAppId: "",
    tenantId: "",
    clientSecret: "",
    defaultGroupTag: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving enrollment configuration:", formData);
    // Implement save logic
  };

  const handleTest = () => {
    console.log("Testing Azure AD connection");
    // Implement test connection logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate("/devices")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Devices
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Device Enrollment</h1>
          <p className="text-muted-foreground">
            Configure Azure AD Autopilot integration for automated device enrollment
          </p>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Before you begin:</strong> You'll need to create an Azure AD application registration in your Azure portal. 
          This application will be used to automatically enrol devices via Windows Autopilot.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Azure AD Application Configuration</CardTitle>
          <CardDescription>
            Enter the details from your Azure AD application registration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="azure-app-id">Azure AD Application ID</Label>
            <Input
              id="azure-app-id"
              type="text"
              placeholder="12345678-1234-1234-1234-123456789012"
              value={formData.azureAppId}
              onChange={(e) => handleInputChange("azureAppId", e.target.value)}
              aria-describedby="app-id-help"
            />
            <p id="app-id-help" className="text-xs text-muted-foreground">
              Also known as Client ID. Found in your Azure AD app registration overview page.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenant-id">Azure AD Tenant ID</Label>
            <Input
              id="tenant-id"
              type="text"
              placeholder="87654321-4321-4321-4321-210987654321"
              value={formData.tenantId}
              onChange={(e) => handleInputChange("tenantId", e.target.value)}
              aria-describedby="tenant-id-help"
            />
            <p id="tenant-id-help" className="text-xs text-muted-foreground">
              Your organisation's Azure AD tenant identifier.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-secret">Client Secret Value</Label>
            <div className="relative">
              <Input
                id="client-secret"
                type={showClientSecret ? "text" : "password"}
                placeholder="Enter your client secret"
                value={formData.clientSecret}
                onChange={(e) => handleInputChange("clientSecret", e.target.value)}
                aria-describedby="client-secret-help"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowClientSecret(!showClientSecret)}
                aria-label={showClientSecret ? "Hide client secret" : "Show client secret"}
              >
                {showClientSecret ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
            <p id="client-secret-help" className="text-xs text-muted-foreground">
              Generate this in your Azure AD app registration under "Certificates & secrets".
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-tag">Default Group Tag</Label>
            <Input
              id="group-tag"
              type="text"
              placeholder="SecureDeploy-Managed"
              value={formData.defaultGroupTag}
              onChange={(e) => handleInputChange("defaultGroupTag", e.target.value)}
              aria-describedby="group-tag-help"
            />
            <p id="group-tag-help" className="text-xs text-muted-foreground">
              Tag applied to all enrolled devices for identification and management.
            </p>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
            <Button variant="outline" onClick={handleTest}>
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>
            Follow these steps to configure your Azure AD application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">1. Create Azure AD Application</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Sign in to the Azure portal as a Global Administrator</li>
                <li>Navigate to Azure Active Directory → App registrations</li>
                <li>Click "New registration" and provide a name</li>
                <li>Set redirect URI to: https://login.microsoftonline.com/common/oauth2/nativeclient</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">2. Configure API Permissions</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Go to API permissions and add Microsoft Graph permissions</li>
                <li>Add "Device.ReadWrite.All" and "DeviceManagementManagedDevices.ReadWrite.All"</li>
                <li>Grant admin consent for your organisation</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">3. Create Client Secret</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Navigate to Certificates & secrets</li>
                <li>Click "New client secret" and set an appropriate expiry</li>
                <li>Copy the secret value immediately (it won't be shown again)</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">4. Note Required Information</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Application (client) ID from the Overview page</li>
                <li>Directory (tenant) ID from the Overview page</li>
                <li>Client secret value from step 3</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceEnrollment;
