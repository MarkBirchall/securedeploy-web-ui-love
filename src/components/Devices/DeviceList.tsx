
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, MoreHorizontal, Smartphone, RefreshCw, Play, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeviceList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const devices = [
    {
      id: 1,
      hostname: "DESK-001",
      status: "Deployed",
      ipAddress: "192.168.1.101",
      lastSequence: "Windows 11 Enterprise Standard",
      lastDeployed: "2024-06-01 14:30",
      model: "Dell OptiPlex 7090",
      serialNumber: "ABC123456"
    },
    {
      id: 2,
      hostname: "LAPTOP-045",
      status: "Deploying",
      ipAddress: "192.168.1.145",
      lastSequence: "Developer Workstation",
      lastDeployed: "2024-06-08 09:15",
      model: "HP EliteBook 840 G8",
      serialNumber: "DEF789012"
    },
    {
      id: 3,
      hostname: "KIOSK-12",
      status: "Ready",
      ipAddress: "192.168.1.212",
      lastSequence: "Kiosk Mode Deployment",
      lastDeployed: "2024-05-28 11:45",
      model: "Lenovo ThinkCentre M75q",
      serialNumber: "GHI345678"
    },
    {
      id: 4,
      hostname: "WKS-089",
      status: "Error",
      ipAddress: "192.168.1.189",
      lastSequence: "Windows 11 Enterprise Standard",
      lastDeployed: "2024-06-07 16:20",
      model: "Dell Precision 3650",
      serialNumber: "JKL901234"
    },
    {
      id: 5,
      hostname: "LAB-003",
      status: "Offline",
      ipAddress: "192.168.1.203",
      lastSequence: "LTSC Base Image",
      lastDeployed: "2024-05-15 10:00",
      model: "HP Z2 Mini G9",
      serialNumber: "MNO567890"
    }
  ];

  const filteredDevices = devices.filter(device =>
    device.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.ipAddress.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Deployed":
        return "bg-green-100 text-green-800";
      case "Deploying":
        return "bg-blue-100 text-blue-800";
      case "Ready":
        return "bg-yellow-100 text-yellow-800";
      case "Error":
        return "bg-red-100 text-red-800";
      case "Offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Devices</h1>
          <p className="text-muted-foreground">
            Monitor and manage devices across your network
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate("/devices/enrollment")}>
            <Settings className="mr-2 h-4 w-4" />
            Configure Enrollment
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">15</div>
            <div className="text-sm text-muted-foreground">Deployed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-muted-foreground">Deploying</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-muted-foreground">Error</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">5</div>
            <div className="text-sm text-muted-foreground">Offline</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Inventory</CardTitle>
          <CardDescription>
            All devices registered for deployment management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search devices by hostname, model, or IP address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                aria-label="Search devices"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostname</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sequence</TableHead>
                <TableHead>Last Deployed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.hostname}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell className="font-mono text-sm">{device.ipAddress}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(device.status)}>
                      {device.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{device.lastSequence}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{device.lastDeployed}</TableCell>
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
                          <Smartphone className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Deploy Sequence
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Restart
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDevices.length === 0 && (
            <div className="text-center py-8">
              <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No devices found.</p>
              <Button className="mt-4" onClick={() => navigate("/devices/enrollment")}>
                Set up device enrollment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceList;
