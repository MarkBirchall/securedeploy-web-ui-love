
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Eye, 
  EyeOff, 
  Shield, 
  Key, 
  Bell, 
  User,
  Building,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserProfile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailDeploymentComplete: true,
    emailDeploymentFailed: true,
    emailSystemAlerts: false,
    smsDeploymentFailed: false,
    smsSystemAlerts: false
  });

  const [selectedTenant, setSelectedTenant] = useState("main-org");

  const tenants = [
    { id: "main-org", name: "Main Organisation", role: "Admin" },
    { id: "subsidiary", name: "Subsidiary Ltd", role: "Technician" },
    { id: "regional", name: "Regional Office", role: "Dashboard" }
  ];

  const backupCodes = [
    "abc123def",
    "ghi456jkl",
    "mno789pqr",
    "stu012vwx"
  ];

  const handleProfileUpdate = () => {
    console.log("Updating profile:", profileData);
    // Implement profile update logic
  };

  const handlePasswordChange = () => {
    console.log("Changing password");
    // Implement password change logic
  };

  const handleNotificationUpdate = () => {
    console.log("Updating notifications:", notificationSettings);
    // Implement notification settings update
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Multi-tenant Switcher */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Organisation Access
          </CardTitle>
          <CardDescription>
            Switch between organisations you have access to
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenant-select">Current Organisation</Label>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger id="tenant-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {tenants.map(tenant => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{tenant.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {tenant.role}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              You have access to {tenants.length} organisations. Switch between them to manage different environments.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <Button onClick={handleProfileUpdate}>
            <Save className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
        </CardContent>
      </Card>

      {/* Password & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Password & Security
          </CardTitle>
          <CardDescription>
            Manage your password and two-factor authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Change Password</h4>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={profileData.currentPassword}
                  onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={profileData.newPassword}
                  onChange={(e) => handleInputChange("newPassword", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={profileData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
            <Button onClick={handlePasswordChange}>
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">MFA Status</p>
                <p className="text-sm text-muted-foreground">Two-factor authentication is enabled</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Backup Codes</h5>
              <p className="text-sm text-muted-foreground">
                Use these codes if you lose access to your authenticator app
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {backupCodes.map((code, index) => (
                  <div key={index} className="p-2 bg-muted rounded text-center font-mono text-sm">
                    {code}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline">Reset MFA</Button>
              <Button variant="outline">Generate New Backup Codes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about system events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Email Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Deployment Completed</p>
                  <p className="text-sm text-muted-foreground">Notify when deployments finish successfully</p>
                </div>
                <Switch
                  checked={notificationSettings.emailDeploymentComplete}
                  onCheckedChange={(checked) => handleNotificationChange("emailDeploymentComplete", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Deployment Failed</p>
                  <p className="text-sm text-muted-foreground">Notify when deployments fail</p>
                </div>
                <Switch
                  checked={notificationSettings.emailDeploymentFailed}
                  onCheckedChange={(checked) => handleNotificationChange("emailDeploymentFailed", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">System Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify about system maintenance and updates</p>
                </div>
                <Switch
                  checked={notificationSettings.emailSystemAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("emailSystemAlerts", checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">SMS Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Critical Deployment Failures</p>
                  <p className="text-sm text-muted-foreground">SMS for urgent deployment issues only</p>
                </div>
                <Switch
                  checked={notificationSettings.smsDeploymentFailed}
                  onCheckedChange={(checked) => handleNotificationChange("smsDeploymentFailed", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">System Alerts</p>
                  <p className="text-sm text-muted-foreground">SMS for critical system issues</p>
                </div>
                <Switch
                  checked={notificationSettings.smsSystemAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("smsSystemAlerts", checked)}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleNotificationUpdate}>
            <Save className="mr-2 h-4 w-4" />
            Save Notification Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
