
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
import { Plus, Search, MoreHorizontal, Edit, Copy, Trash2, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SequenceList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sequences = [
    {
      id: 1,
      name: "Windows 11 Enterprise Standard",
      description: "Complete Windows 11 deployment with standard applications",
      status: "Active",
      lastModified: "2024-06-01",
      devices: 12,
      steps: 8
    },
    {
      id: 2,
      name: "Developer Workstation",
      description: "Development environment with Visual Studio and tools",
      status: "Draft",
      lastModified: "2024-05-28",
      devices: 0,
      steps: 12
    },
    {
      id: 3,
      name: "Kiosk Mode Deployment",
      description: "Locked-down kiosk configuration",
      status: "Active",
      lastModified: "2024-05-25",
      devices: 5,
      steps: 6
    },
    {
      id: 4,
      name: "LTSC Base Image",
      description: "Long-term servicing channel deployment",
      status: "Archived",
      lastModified: "2024-05-20",
      devices: 0,
      steps: 5
    }
  ];

  const filteredSequences = sequences.filter(sequence =>
    sequence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sequence.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Task Sequences</h1>
          <p className="text-muted-foreground">
            Create and manage automated deployment workflows
          </p>
        </div>
        <Button onClick={() => navigate("/task-sequences/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Sequence
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Sequences</CardTitle>
          <CardDescription>
            Build, edit, and deploy automated task sequences for device imaging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search task sequences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                aria-label="Search task sequences"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Steps</TableHead>
                <TableHead>Devices</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSequences.map((sequence) => (
                <TableRow key={sequence.id}>
                  <TableCell className="font-medium">{sequence.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {sequence.description}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sequence.status)}>
                      {sequence.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sequence.steps}</TableCell>
                  <TableCell>{sequence.devices}</TableCell>
                  <TableCell>{sequence.lastModified}</TableCell>
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
                        <DropdownMenuItem onClick={() => navigate(`/task-sequences/${sequence.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Deploy
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

          {filteredSequences.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No task sequences found.</p>
              <Button 
                className="mt-4" 
                onClick={() => navigate("/task-sequences/new")}
              >
                Create your first task sequence
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SequenceList;
