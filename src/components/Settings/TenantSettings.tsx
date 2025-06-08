
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Building, 
  Palette, 
  Shield, 
  Globe,
  Upload,
  Image as ImageIcon
} from "lucide-react";

const TenantSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    organisationName: "Main Organisation",
    description: "Primary deployment organisation for enterprise devices",
    website: "https://company.com",
    supportEmail: "support@company.com",
    timezone: "Europe/London"
  });

  const [brandingSettings, setBrandingSettings] = useState({
    logoUrl: "",
    primaryColor: "#2563eb",
    secondaryColor: "#64748b",
    backgroundImage: "",
    customCss: ""
  });

  const [securitySettings, setSecuritySettings] = useState({
    enforcePasswordPolicy: true,
    requireMfa: true,
    sessionTimeout: 480, // minutes
    allowApiAccess: true,
    ipWhitelist: ""
  });

  const [deploymentDefaults, setDeploymentDefaults] = useState({
    defaultTimeZone: "Europe/London",
    automaticUpdates: true,
    retentionDays: 90,
    compressionLevel: "standard",
    deploymentWindow: "24x7"
  });

  const handleGeneralUpdate = () => {
    console.log("Updating general settings:", generalSettings);
    // Implement general settings update logic
  };

  const handleBrandingUpdate = () => {
    console.log("Updating branding settings:", brandingSettings);
    // Implement branding settings update logic
  };

  const handleSecurityUpdate = () => {
    console.log("Updating security settings:", securitySettings);
    // Implement security settings update logic
  };

  const handleDeploymentUpdate = () => {
    console.log("Updating deployment defaults:", deploymentDefaults);
    // Implement deployment defaults update logic
  };

  const updateGeneralSetting = (field: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateBrandingSetting = (field: string, value: string) => {
    setBrandingSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateSecuritySetting = (field: string, value: string | boolean | number) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const updateDeploymentSetting = (field: string, value: string | boolean | number) => {
    setDeploymentDefaults(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tenant Settings</h1>
        <p className="text-muted-foreground">
          Configure organisation-wide settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Building className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="branding">
            <Palette className="mr-2 h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="deployment">
            <Globe className="mr-2 h-4 w-4" />
            Deployment Defaults
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic organisation information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organisation Name</Label>
                <Input
                  id="org-name"
                  value={generalSettings.organisationName}
                  onChange={(e) => updateGeneralSetting("organisationName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-description">Description</Label>
                <Textarea
                  id="org-description"
                  value={generalSettings.description}
                  onChange={(e) => updateGeneralSetting("description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={generalSettings.website}
                    onChange={(e) => updateGeneralSetting("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => updateGeneralSetting("supportEmail", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Input
                  id="timezone"
                  value={generalSettings.timezone}
                  onChange={(e) => updateGeneralSetting("timezone", e.target.value)}
                />
              </div>
              <Button onClick={handleGeneralUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Customise the appearance of deployment interfaces and task sequences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Logo Configuration</h4>
                <div className="space-y-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="logo-url"
                      value={brandingSettings.logoUrl}
                      onChange={(e) => updateBrandingSetting("logoUrl", e.target.value)}
                      placeholder="https://your-domain.com/logo.png"
                    />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Logo will be displayed during device deployment. Recommended size: 200x60px.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Colour Scheme</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Colour</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => updateBrandingSetting("primaryColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingSettings.primaryColor}
                        onChange={(e) => updateBrandingSetting("primaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Colour</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => updateBrandingSetting("secondaryColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => updateBrandingSetting("secondaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Background Configuration</h4>
                <div className="space-y-2">
                  <Label htmlFor="background-image">Background Image URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="background-image"
                      value={brandingSettings.backgroundImage}
                      onChange={(e) => updateBrandingSetting("backgroundImage", e.target.value)}
                      placeholder="https://your-domain.com/background.jpg"
                    />
                    <Button variant="outline">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optional background image for deployment screens. Will be displayed with overlay.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Custom Styling</h4>
                <div className="space-y-2">
                  <Label htmlFor="custom-css">Custom CSS</Label>
                  <Textarea
                    id="custom-css"
                    value={brandingSettings.customCss}
                    onChange={(e) => updateBrandingSetting("customCss", e.target.value)}
                    placeholder="/* Add custom CSS for deployment interface */"
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Advanced: Custom CSS will be applied to the deployment interface.
                  </p>
                </div>
              </div>

              <Button onClick={handleBrandingUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Branding Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Authentication Policies</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enforce Strong Password Policy</p>
                      <p className="text-sm text-muted-foreground">
                        Require complex passwords with minimum 8 characters
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.enforcePasswordPolicy}
                      onCheckedChange={(checked) => updateSecuritySetting("enforcePasswordPolicy", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Require Multi-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        All users must enable MFA to access the system
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.requireMfa}
                      onCheckedChange={(checked) => updateSecuritySetting("requireMfa", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => updateSecuritySetting("sessionTimeout", parseInt(e.target.value))}
                    min="30"
                    max="1440"
                  />
                  <p className="text-xs text-muted-foreground">
                    Users will be automatically logged out after this period of inactivity.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">API Access</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Allow API Access</p>
                    <p className="text-sm text-muted-foreground">
                      Enable REST API access for external integrations
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.allowApiAccess}
                    onCheckedChange={(checked) => updateSecuritySetting("allowApiAccess", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">IP Address Restrictions</h4>
                <div className="space-y-2">
                  <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                  <Textarea
                    id="ip-whitelist"
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => updateSecuritySetting("ipWhitelist", e.target.value)}
                    placeholder="192.168.1.0/24&#10;10.0.0.0/8&#10;203.0.113.0/24"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: Restrict access to specific IP addresses or ranges (one per line).
                  </p>
                </div>
              </div>

              <Button onClick={handleSecurityUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Defaults</CardTitle>
              <CardDescription>
                Configure default settings for new task sequences and deployments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Regional Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="deployment-timezone">Default Time Zone</Label>
                  <Input
                    id="deployment-timezone"
                    value={deploymentDefaults.defaultTimeZone}
                    onChange={(e) => updateDeploymentSetting("defaultTimeZone", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Time zone applied to new deployments and scheduling.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Deployment Behaviour</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enable Automatic Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically download application updates
                      </p>
                    </div>
                    <Switch
                      checked={deploymentDefaults.automaticUpdates}
                      onCheckedChange={(checked) => updateDeploymentSetting("automaticUpdates", checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-days">Log Retention (days)</Label>
                    <Input
                      id="retention-days"
                      type="number"
                      value={deploymentDefaults.retentionDays}
                      onChange={(e) => updateDeploymentSetting("retentionDays", parseInt(e.target.value))}
                      min="7"
                      max="365"
                    />
                    <p className="text-xs text-muted-foreground">
                      How long to keep deployment logs and history.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Performance Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="compression-level">Image Compression Level</Label>
                  <Input
                    id="compression-level"
                    value={deploymentDefaults.compressionLevel}
                    onChange={(e) => updateDeploymentSetting("compressionLevel", e.target.value)}
                    placeholder="standard, fast, maximum"
                  />
                  <p className="text-xs text-muted-foreground">
                    Compression level for reference images (standard, fast, maximum).
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deployment-window">Deployment Window</Label>
                  <Input
                    id="deployment-window"
                    value={deploymentDefaults.deploymentWindow}
                    onChange={(e) => updateDeploymentSetting("deploymentWindow", e.target.value)}
                    placeholder="e.g., 24x7, 09:00-17:00, weekdays"
                  />
                  <p className="text-xs text-muted-foreground">
                    Default time window for automatic deployments.
                  </p>
                </div>
              </div>

              <Button onClick={handleDeploymentUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Deployment Defaults
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantSettings;
