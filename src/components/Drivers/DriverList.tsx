
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
import { Plus, Search, MoreHorizontal, Upload, Trash2, HardDrive, Edit } from "lucide-react";

const DriverList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const drivers = [
    {
      id: 1,
      name: "Dell OptiPlex 7090 Driver Pack",
      vendor: "Dell",
      model: "OptiPlex 7090",
      version: "A01",
      osSupport: "Windows 11",
      size: "245 MB",
      uploaded: "2024-05-20",
      status: "Active"
    },
    {
      id: 2,
      name: "HP EliteBook 840 G8 Drivers",
      vendor: "HP",
      model: "EliteBook 840 G8",
      version: "1.2.3",
      osSupport: "Windows 10/11",
      size: "189 MB",
      uploaded: "2024-05-15",
      status: "Active"
    },
    {
      id: 3,
      name: "Lenovo ThinkPad T14 Gen 3",
      vendor: "Lenovo",
      model: "ThinkPad T14 Gen 3",
      version: "2.1.0",
      osSupport: "Windows 11",
      size: "312 MB",
      uploaded: "2024-05-10",
      status: "Processing"
    },
    {
      id: 4,
      name: "Generic USB 3.0 Drivers",
      vendor: "Generic",
      model: "Universal",
      version: "1.0",
      osSupport: "Windows 10/11",
      size: "12 MB",
      uploaded: "2024-04-25",
      status: "Active"
    }
  ];

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Drivers</h1>
          <p className="text-muted-foreground">
            Manage hardware drivers for different device models
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Drivers
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Driver Packages</CardTitle>
          <CardDescription>
            Hardware drivers organised by vendor and device model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search drivers by name, vendor, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                aria-label="Search drivers"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>OS Support</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.vendor}</TableCell>
                  <TableCell>{driver.model}</TableCell>
                  <TableCell>{driver.version}</TableCell>
                  <TableCell>{driver.osSupport}</TableCell>
                  <TableCell>{driver.size}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(driver.status)}>
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{driver.uploaded}</TableCell>
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
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDrivers.length === 0 && (
            <div className="text-center py-8">
              <HardDrive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No drivers found.</p>
              <Button className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Upload your first driver package
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Driver Assignment</CardTitle>
          <CardDescription>
            Automatically assign drivers based on hardware detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure automatic driver assignment rules based on detected hardware models during deployment.
            </p>
            <Button variant="outline">
              Configure Auto-Assignment Rules
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverList;
