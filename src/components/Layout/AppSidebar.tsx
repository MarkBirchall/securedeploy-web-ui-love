
import {
  BarChart3,
  Monitor,
  FileImage,
  Package,
  HardDrive,
  Smartphone,
  Library,
  History,
  Settings,
  UserCog,
  Shield
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: 'Admin' | 'Technician' | 'Dashboard' | 'Read-Only' | 'Helpdesk';
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const mainItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      roles: ['Admin', 'Technician', 'Dashboard', 'Read-Only', 'Helpdesk']
    },
    {
      title: "Task Sequences",
      url: "/task-sequences",
      icon: Monitor,
      roles: ['Admin', 'Technician']
    },
    {
      title: "Reference Images",
      url: "/reference-images",
      icon: FileImage,
      roles: ['Admin', 'Technician']
    },
    {
      title: "Applications",
      url: "/applications",
      icon: Package,
      roles: ['Admin', 'Technician']
    },
    {
      title: "App Library",
      url: "/app-library",
      icon: Library,
      roles: ['Admin', 'Technician', 'Read-Only']
    },
    {
      title: "Drivers",
      url: "/drivers",
      icon: HardDrive,
      roles: ['Admin', 'Technician']
    },
    {
      title: "Devices",
      url: "/devices",
      icon: Smartphone,
      roles: ['Admin', 'Technician', 'Dashboard', 'Read-Only', 'Helpdesk']
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
      roles: ['Admin', 'Technician', 'Dashboard']
    },
    {
      title: "Audit Log",
      url: "/audit",
      icon: History,
      roles: ['Admin', 'Technician']
    }
  ];

  const adminItems = [
    {
      title: "Admin Panel",
      url: "/admin",
      icon: UserCog,
      roles: ['Admin']
    }
  ];

  const settingsItems = [
    {
      title: "User Profile",
      url: "/profile",
      icon: Settings,
      roles: ['Admin', 'Technician', 'Dashboard', 'Read-Only', 'Helpdesk']
    },
    {
      title: "Tenant Settings",
      url: "/settings",
      icon: Settings,
      roles: ['Admin', 'Technician']
    }
  ];

  const filteredMainItems = mainItems.filter(item => item.roles.includes(userRole));
  const filteredAdminItems = adminItems.filter(item => item.roles.includes(userRole));
  const filteredSettingsItems = settingsItems.filter(item => item.roles.includes(userRole));

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="font-bold text-lg">SecureDeploy</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <button 
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center space-x-2 p-2"
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {filteredAdminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                    >
                      <button 
                        onClick={() => navigate(item.url)}
                        className="w-full flex items-center space-x-2 p-2"
                      >
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSettingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <button 
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center space-x-2 p-2"
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
