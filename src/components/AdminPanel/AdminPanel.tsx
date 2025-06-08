
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UserCog, 
  Users, 
  Shield, 
  Building, 
  BarChart3, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Key,
  UserX
} from "lucide-react";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Admin",
      tenant: "Main Organisation",
      lastLogin: "2024-06-08 09:15",
      status: "Active",
      mfaEnabled: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Technician",
      tenant: "Main Organisation",
      lastLogin: "2024-06-07 16:30",
      status: "Active",
      mfaEnabled: true
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@subsidiary.com",
      role: "Dashboard",
      tenant: "Subsidiary Ltd",
      lastLogin: "2024-06-06 11:20",
      status: "Active",
      mfaEnabled: false
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@company.com",
      role: "Read-Only",
      tenant: "Main Organisation",
      lastLogin: "2024-06-05 14:45",
      status: "Disabled",
      mfaEnabled: true
    }
  ];

  const roles = [
    {
      name: "Admin",
      description: "Full system access including user management and configuration",
      permissions: ["All permissions"],
      userCount: 2
    },
    {
      name: "Technician",
      description: "Create and manage task sequences, deploy to devices",
      permissions: ["Task Sequences", "Images", "Applications", "Drivers", "Devices", "Reports"],
      userCount: 15
    },
    {
      name: "Dashboard",
      description: "View-only access to dashboard and deployment status",
      permissions: ["Dashboard", "Device Status", "Basic Reports"],
      userCount: 8
    },
    {
      name: "Read-Only",
      description: "Read-only access to most system information",
      permissions: ["View Task Sequences", "View Applications", "View Devices"],
      userCount: 5
    },
    {
      name: "Helpdesk",
      description: "Limited access for helpdesk operations",
      permissions: ["Dashboard", "Device Status", "Basic Device Info"],
      userCount: 3
    }
  ];

  const tenants = [
    {
      id: 1,
      name: "Main Organisation",
      users: 25,
      devices: 150,
      created: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Subsidiary Ltd",
      users: 8,
      devices: 45,
      created: "2024-03-20",
      status: "Active"
    },
    {
      id: 3,
      name: "Regional Office",
      users: 12,
      devices: 78,
      created: "2024-04-10",
      status: "Active"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Disabled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Technician":
        return "bg-blue-100 text-blue-800";
      case "Dashboard":
        return "bg-green-100 text-green-800";
      case "Read-Only":
        return "bg-gray-100 text-gray-800";
      case "Helpdesk":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users, roles, and system configuration
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="tenants">
            <Building className="mr-2 h-4 w-4" />
            Customer Management
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="mr-2 h-4 w-4" />
            System Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Create, edit, and manage user accounts and their access
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                    aria-label="Search users"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>MFA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{user.tenant}</TableCell>
                      <TableCell>
                        <Badge variant={user.mfaEnabled ? "default" : "destructive"}>
                          {user.mfaEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Reset MFA
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserX className="mr-2 h-4 w-4" />
                              {user.status === "Active" ? "Disable" : "Enable"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                System roles and their associated permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roles.map((role, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <Badge variant="outline">{role.userCount} users</Badge>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, permIndex) => (
                          <Badge key={permIndex} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>
                    Manage customer tenants and their configurations
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organisation Name</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Devices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.name}</TableCell>
                      <TableCell>{tenant.users}</TableCell>
                      <TableCell>{tenant.devices}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tenant.status)}>
                          {tenant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{tenant.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Users
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
                <div className="text-xs text-muted-foreground mt-1">Across all tenants</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">423</div>
                <div className="text-sm text-muted-foreground">Total Devices</div>
                <div className="text-xs text-muted-foreground mt-1">Managed devices</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-muted-foreground">Deployments Today</div>
                <div className="text-xs text-muted-foreground mt-1">+15% from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-muted-foreground">Active Tenants</div>
                <div className="text-xs text-muted-foreground mt-1">Customer organisations</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Statistics</CardTitle>
              <CardDescription>
                Deployment trends and system usage across all tenants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Detailed statistics and charts would be displayed here, showing deployment success rates,
                  popular applications, device models, and usage trends over time.
                </p>
                <Button variant="outline">
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
