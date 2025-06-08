
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, MoreHorizontal, Upload, Trash2, Info, FileImage } from "lucide-react";

const ImageList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const images = [
    {
      id: 1,
      name: "Windows 11 Enterprise 22H2",
      filename: "win11_ent_22h2.wim",
      size: "4.2 GB",
      osVersion: "Windows 11 22H2",
      architecture: "x64",
      created: "2024-05-15",
      status: "Ready",
      sequences: 3
    },
    {
      id: 2,
      name: "Windows 10 LTSC 2021",
      filename: "win10_ltsc_2021.vhd",
      size: "3.8 GB",
      osVersion: "Windows 10 LTSC",
      architecture: "x64",
      created: "2024-04-20",
      status: "Ready",
      sequences: 1
    },
    {
      id: 3,
      name: "Windows 11 Pro with Office",
      filename: "win11_pro_office.wim",
      size: "5.1 GB",
      osVersion: "Windows 11 23H2",
      architecture: "x64",
      created: "2024-06-01",
      status: "Processing",
      sequences: 0
    }
  ];

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.osVersion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
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
          <h1 className="text-3xl font-bold">Reference Images</h1>
          <p className="text-muted-foreground">
            Manage Windows images for deployment
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Reference Image</DialogTitle>
              <DialogDescription>
                Upload a new WIM or VHD file for deployment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="image-name">Image Name</Label>
                <Input id="image-name" placeholder="Enter a descriptive name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-file">Image File</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop your WIM or VHD file here, or click to browse
                  </p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadOpen(false)}>
                  Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reference Images</CardTitle>
          <CardDescription>
            Windows images ready for deployment across your devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                aria-label="Search reference images"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>OS Version</TableHead>
                <TableHead>Architecture</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sequences</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell className="font-medium">{image.name}</TableCell>
                  <TableCell>{image.osVersion}</TableCell>
                  <TableCell>{image.architecture}</TableCell>
                  <TableCell>{image.size}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(image.status)}>
                      {image.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{image.sequences}</TableCell>
                  <TableCell>{image.created}</TableCell>
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
                          <Info className="mr-2 h-4 w-4" />
                          View Details
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

          {filteredImages.length === 0 && (
            <div className="text-center py-8">
              <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reference images found.</p>
              <Button className="mt-4" onClick={() => setIsUploadOpen(true)}>
                Upload your first image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageList;
