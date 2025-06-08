
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Monitor, 
  FileImage, 
  Package, 
  Smartphone, 
  Plus, 
  Upload, 
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tvMode, setTvMode] = useState(false);

  const stats = [
    {
      title: "Task Sequences",
      value: "24",
      change: "+3 this week",
      icon: Monitor,
      color: "text-blue-600"
    },
    {
      title: "Reference Images",
      value: "12",
      change: "+1 this week",
      icon: FileImage,
      color: "text-green-600"
    },
    {
      title: "Applications",
      value: "156",
      change: "+8 this week",
      icon: Package,
      color: "text-purple-600"
    },
    {
      title: "Active Devices",
      value: "89",
      change: "5 deploying",
      icon: Smartphone,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Task sequence 'Windows 11 Enterprise' completed",
      device: "DESK-001",
      timestamp: "2 minutes ago",
      status: "success"
    },
    {
      id: 2,
      action: "New reference image uploaded",
      device: "Windows 11 22H2",
      timestamp: "15 minutes ago",
      status: "info"
    },
    {
      id: 3,
      action: "Device deployment started",
      device: "LAPTOP-045",
      timestamp: "32 minutes ago",
      status: "pending"
    },
    {
      id: 4,
      action: "Application update failed",
      device: "Adobe Acrobat Reader",
      timestamp: "1 hour ago",
      status: "error"
    }
  ];

  const getStartedItems = [
    {
      title: "Create your first Task Sequence",
      description: "Build automated deployment workflows",
      action: "Create Sequence",
      path: "/task-sequences/new",
      completed: false
    },
    {
      title: "Upload a Reference Image",
      description: "Add Windows images for deployment",
      action: "Upload Image",
      path: "/reference-images",
      completed: true
    },
    {
      title: "Add Applications",
      description: "Configure software for installation",
      action: "Browse Apps",
      path: "/app-library",
      completed: false
    },
    {
      title: "Register Devices",
      description: "Set up device enrollment",
      action: "Setup Enrollment",
      path: "/devices/enrollment",
      completed: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  if (tvMode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">SecureDeploy Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Label htmlFor="tv-mode" className="text-xl">TV Mode</Label>
            <Switch
              id="tv-mode"
              checked={tvMode}
              onCheckedChange={setTvMode}
              className="scale-150"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xl text-slate-300">{stat.title}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Live Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-lg text-white">{activity.action}</p>
                    <p className="text-slate-400">{activity.device} • {activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" role="main">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your deployments.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="tv-mode-toggle">TV Mode</Label>
          <Switch
            id="tv-mode-toggle"
            checked={tvMode}
            onCheckedChange={setTvMode}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Quick Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <section aria-labelledby="actions-heading">
          <Card>
            <CardHeader>
              <CardTitle id="actions-heading">Quick Actions</CardTitle>
              <CardDescription>Common tasks to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start" 
                onClick={() => navigate("/task-sequences/new")}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Task Sequence
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/reference-images")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/app-library")}
              >
                <Package className="mr-2 h-4 w-4" />
                Browse Apps
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Getting Started */}
        <section aria-labelledby="onboarding-heading">
          <Card>
            <CardHeader>
              <CardTitle id="onboarding-heading">Getting Started</CardTitle>
              <CardDescription>Complete these steps to set up your environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getStartedItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    {!item.completed && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(item.path)}
                      >
                        {item.action}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section aria-labelledby="activity-heading">
          <Card>
            <CardHeader>
              <CardTitle id="activity-heading">Recent Activity</CardTitle>
              <CardDescription>Latest deployment events and system changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.device} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-4" onClick={() => navigate("/audit")}>
                View all activity
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
