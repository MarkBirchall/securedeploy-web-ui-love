
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone
} from "lucide-react";

const Reporting = () => {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [dateRange, setDateRange] = useState("last-30-days");

  const reportTypes = [
    { value: "deployment-summary", label: "Deployment Summary" },
    { value: "device-status", label: "Device Status Report" },
    { value: "application-audit", label: "Application Audit" },
    { value: "driver-usage", label: "Driver Usage Statistics" },
    { value: "user-activity", label: "User Activity Report" },
    { value: "performance-metrics", label: "Performance Metrics" }
  ];

  const summaryStats = [
    {
      title: "Total Deployments",
      value: "1,247",
      change: "+12% from last month",
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1% from last month",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Failed Deployments",
      value: "72",
      change: "-8% from last month",
      icon: XCircle,
      color: "text-red-600"
    },
    {
      title: "Avg. Deploy Time",
      value: "42 min",
      change: "-5 min from last month",
      icon: Clock,
      color: "text-purple-600"
    }
  ];

  const recentReports = [
    {
      name: "Monthly Deployment Summary",
      type: "Deployment Summary",
      generated: "2024-06-08 09:00",
      size: "2.3 MB",
      format: "PDF"
    },
    {
      name: "Device Inventory Report",
      type: "Device Status",
      generated: "2024-06-07 17:30",
      size: "1.8 MB",
      format: "CSV"
    },
    {
      name: "Application Usage Audit",
      type: "Application Audit",
      generated: "2024-06-06 14:15",
      size: "945 KB",
      format: "PDF"
    },
    {
      name: "Driver Deployment Stats",
      type: "Driver Usage",
      generated: "2024-06-05 10:45",
      size: "1.2 MB",
      format: "CSV"
    }
  ];

  const handleGenerateReport = () => {
    console.log("Generating report:", {
      type: selectedReportType,
      dateRange: dateRange
    });
    // Implement report generation logic
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate insights and download reports about your deployments
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="generate">
            <Download className="mr-2 h-4 w-4" />
            Generate Reports
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="mr-2 h-4 w-4" />
            Report History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Summary Statistics */}
            <section aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="text-xl font-semibold mb-4">Deployment Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryStats.map((stat, index) => (
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

            {/* Charts and Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Deployment Trends
                  </CardTitle>
                  <CardDescription>
                    Daily deployment activity over the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart showing deployment trends would be displayed here
                    <br />
                    (Using recharts library)
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Device Status Distribution
                  </CardTitle>
                  <CardDescription>
                    Current status of all managed devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Deployed</span>
                      </div>
                      <span className="text-sm font-medium">156 (73%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Deploying</span>
                      </div>
                      <span className="text-sm font-medium">12 (6%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Ready</span>
                      </div>
                      <span className="text-sm font-medium">28 (13%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Error</span>
                      </div>
                      <span className="text-sm font-medium">8 (4%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="text-sm">Offline</span>
                      </div>
                      <span className="text-sm font-medium">9 (4%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Create custom reports for specific time periods and data types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {reportTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger id="date-range">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 days</SelectItem>
                      <SelectItem value="last-year">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {dateRange === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium">Output Format</h4>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="format" value="pdf" defaultChecked className="form-radio" />
                    <span className="text-sm">PDF</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="format" value="csv" className="form-radio" />
                    <span className="text-sm">CSV</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="format" value="excel" className="form-radio" />
                    <span className="text-sm">Excel</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={!selectedReportType}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Previously generated reports available for download
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge variant="outline">{report.type}</Badge>
                        <span className="text-sm text-muted-foreground">{report.generated}</span>
                        <span className="text-sm text-muted-foreground">{report.size}</span>
                        <Badge variant="secondary">{report.format}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              {recentReports.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports generated yet.</p>
                  <Button className="mt-4" onClick={() => setSelectedReportType("deployment-summary")}>
                    Generate your first report
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reporting;
