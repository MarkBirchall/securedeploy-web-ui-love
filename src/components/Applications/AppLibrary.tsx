
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Plus, Package } from "lucide-react";

const AppLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularApps = [
    {
      id: 1,
      name: "Google Chrome",
      description: "Fast and secure web browser",
      category: "Browsers",
      version: "Latest",
      size: "95 MB",
      publisher: "Google",
      autoUpdate: true
    },
    {
      id: 2,
      name: "Adobe Acrobat Reader",
      description: "PDF viewer and editor",
      category: "Productivity",
      version: "Latest",
      size: "165 MB",
      publisher: "Adobe",
      autoUpdate: true
    },
    {
      id: 3,
      name: "Microsoft Teams",
      description: "Collaboration and communication platform",
      category: "Communication",
      version: "Latest",
      size: "142 MB",
      publisher: "Microsoft",
      autoUpdate: true
    },
    {
      id: 4,
      name: "7-Zip",
      description: "File archiver with high compression ratio",
      category: "Utilities",
      version: "23.01",
      size: "1.4 MB",
      publisher: "Igor Pavlov",
      autoUpdate: false
    },
    {
      id: 5,
      name: "VLC Media Player",
      description: "Cross-platform multimedia player",
      category: "Media",
      version: "Latest",
      size: "42 MB",
      publisher: "VideoLAN",
      autoUpdate: true
    },
    {
      id: 6,
      name: "Notepad++",
      description: "Source code editor and Notepad replacement",
      category: "Development",
      version: "Latest",
      size: "4.2 MB",
      publisher: "Don Ho",
      autoUpdate: false
    }
  ];

  const categories = ["All", "Browsers", "Productivity", "Communication", "Utilities", "Media", "Development", "Security"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredApps = popularApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Application Library</h1>
          <p className="text-muted-foreground">
            Browse and add applications from our curated library
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Library</CardTitle>
          <CardDescription>
            Automatically updated applications ready for deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                aria-label="Search applications"
              />
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {app.description}
                        </CardDescription>
                      </div>
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Publisher:</span>
                      <span>{app.publisher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Version:</span>
                      <span>{app.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span>{app.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{app.category}</Badge>
                      {app.autoUpdate && (
                        <Badge className="bg-green-100 text-green-800">Auto-update</Badge>
                      )}
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Sequence
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No applications found matching your criteria.</p>
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppLibrary;
