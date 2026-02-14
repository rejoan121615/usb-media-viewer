import React from 'react';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const navigationItems = [
  {
    title: 'Home',
    icon: Home,
    href: '/home',
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function AppSidebar() {
  return (
    <SidebarRoot>
      <SidebarHeader>
        <div className="px-2 py-4 font-bold text-lg">My App</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="p-4">
          {/* <SidebarTrigger /> */}
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}