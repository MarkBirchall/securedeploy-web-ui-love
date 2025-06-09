
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Server, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users,
  Settings,
  Plus
} from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { title: 'Total Devices', value: '1,234', icon: Server, change: '+12%' },
    { title: 'Active Deployments', value: '23', icon: Activity, change: '+5%' },
    { title: 'Success Rate', value: '98.5%', icon: CheckCircle, change: '+2.1%' },
    { title: 'Pending Tasks', value: '7', icon: Clock, change: '-3%' }
  ];

  const recentDeployments = [
    { id: '1', device: 'WS-001-Desktop', sequence: 'Windows 11 Pro Setup', status: 'completed', progress: 100 },
    { id: '2', device: 'WS-002-Laptop', sequence: 'Office 365 Deployment', status: 'running', progress: 65 },
    { id: '3', device: 'WS-003-Desktop', sequence: 'Security Suite Install', status: 'pending', progress: 0 },
    { id: '4', device: 'WS-004-Laptop', sequence: 'Driver Updates', status: 'failed', progress: 45 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor your device deployments and system health</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Deployment
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deployments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
            <CardDescription>Latest device deployment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeployments.map((deployment) => (
                <div key={deployment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{deployment.device}</h4>
                      <Badge className={getStatusColor(deployment.status)}>
                        {deployment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{deployment.sequence}</p>
                    <Progress value={deployment.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system status and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Deployment Service</h4>
                    <p className="text-sm text-gray-600">All systems operational</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium">Storage Usage</h4>
                    <p className="text-sm text-gray-600">87% of capacity used</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Active Users</h4>
                    <p className="text-sm text-gray-600">12 users currently online</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
