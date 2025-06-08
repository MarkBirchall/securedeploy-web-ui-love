# SecureDeploy Web UI - Complete Implementation Guide

## 1. Project Setup & Dependencies

### package.json
```json
{
  "name": "securedeploy-web-ui",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.462.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### Project Structure
```
src/
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   ├── Layout/                 # Layout components
│   │   ├── AppSidebar.tsx
│   │   ├── Header.tsx
│   │   └── MainLayout.tsx
│   ├── Auth/                   # Authentication components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── MFAPrompt.tsx
│   │   └── MFASetup.tsx
│   ├── Dashboard/              # Dashboard components
│   ├── TaskSequences/          # Task sequence management
│   ├── ReferenceImages/        # Reference image management
│   ├── Applications/           # Application management
│   ├── Drivers/                # Driver management
│   ├── Devices/                # Device management
│   ├── Reports/                # Reporting components
│   ├── AdminPanel/             # Admin panel components
│   ├── Settings/               # Settings & profile
│   └── Shared/                 # Shared components
│       ├── Modal/
│       ├── Notification/
│       ├── Loader/
│       └── ErrorBoundary/
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── types/                      # TypeScript type definitions
├── stores/                     # State management (Zustand/Context)
├── services/                   # API services
├── assets/                     # Static assets
└── styles/                     # Global styles
```

### Environment Configuration
```bash
# .env.example
VITE_API_BASE_URL=https://api.securedeploy.ai
VITE_APP_NAME=SecureDeploy
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

## 2. Core Types & Interfaces

### User & Authentication Types
```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  avatarUrl?: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'Admin' | 'Technician' | 'Dashboard' | 'Read-Only' | 'Helpdesk';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface MFAChallenge {
  challengeId: string;
  type: 'totp' | 'sms' | 'email';
  maskedTarget?: string;
}
```

### Device & Deployment Types
```typescript
// types/device.ts
export interface Device {
  id: string;
  name: string;
  macAddress: string;
  ipAddress?: string;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  status: DeviceStatus;
  lastSeen?: Date;
  deploymentHistory: Deployment[];
  tags: string[];
  location?: string;
  assignedUser?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DeviceStatus = 
  | 'online' 
  | 'offline' 
  | 'deploying' 
  | 'error' 
  | 'maintenance' 
  | 'retired';

export interface Deployment {
  id: string;
  deviceId: string;
  sequenceId: string;
  status: DeploymentStatus;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  logs: DeploymentLog[];
}

export type DeploymentStatus = 
  | 'pending' 
  | 'running' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';
```

### Task Sequence Types
```typescript
// types/taskSequence.ts
export interface TaskSequence {
  id: string;
  name: string;
  description?: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  tasks: Task[];
  estimatedDuration: number;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  type: TaskType;
  name: string;
  description?: string;
  configuration: TaskConfiguration;
  dependencies: string[];
  timeout: number;
  retryCount: number;
  continueOnError: boolean;
}

export type TaskType = 
  | 'image_deployment' 
  | 'application_install' 
  | 'driver_install' 
  | 'configuration' 
  | 'restart' 
  | 'validation';
```

## 3. Component Implementation Patterns

### Base Component Structure
```typescript
// components/Shared/BaseComponent.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BaseComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  error?: string;
  variant?: 'default' | 'compact';
}

export const BaseComponent = forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ className, loading, error, variant = 'default', children, ...props }, ref) => {
    if (loading) {
      return <ComponentLoader variant={variant} />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    return (
      <div
        ref={ref}
        className={cn('component-base', variant === 'compact' && 'compact', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
```

### Error Boundary Implementation
```typescript
// components/Shared/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert variant="destructive" className="m-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={this.handleRetry} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
```

## 4. State Management with Zustand

### Auth Store
```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials } from '@/types/auth';
import { authService } from '@/services/authService';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authService.login(credentials);
          localStorage.setItem('authToken', token);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } finally {
          localStorage.removeItem('authToken');
          set({ user: null, isAuthenticated: false, error: null });
        }
      },

      refreshToken: async () => {
        try {
          const { user, token } = await authService.refreshToken();
          localStorage.setItem('authToken', token);
          set({ user, isAuthenticated: true });
        } catch (error) {
          get().logout();
        }
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);
```

## 5. API Service Layer

### Base API Client
```typescript
// services/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh or redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
```

## 6. Custom Hooks

### Data Fetching Hook
```typescript
// hooks/useQuery.ts
import { useQuery as useTanstackQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';

interface UseQueryOptions<T> {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

export function useQuery<T>(
  key: string[],
  endpoint: string,
  options?: UseQueryOptions<T>
) {
  return useTanstackQuery({
    queryKey: key,
    queryFn: () => apiClient.get<T>(endpoint),
    enabled: options?.enabled,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
  });
}
```

### Form Hook
```typescript
// hooks/useForm.ts
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useForm<T extends z.ZodType>(
  schema: T,
  defaultValues?: Partial<z.infer<T>>
) {
  return useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
}
```

## 7. Routing Configuration

### Route Definitions
```typescript
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

// Lazy load components
const LandingPage = lazy(() => import('@/components/LandingPage'));
const Login = lazy(() => import('@/components/Auth/Login'));
const Dashboard = lazy(() => import('@/components/Dashboard/Dashboard'));
const TaskSequences = lazy(() => import('@/components/TaskSequences/SequenceList'));
// ... other imports

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'sequences', element: <TaskSequences /> },
      { path: 'sequences/new', element: <SequenceEditor /> },
      { path: 'devices', element: <DeviceList /> },
      // ... other protected routes
    ],
  },
]);
```

## 8. Accessibility Implementation

### Focus Management
```typescript
// hooks/useFocusManagement.ts
import { useEffect, useRef } from 'react';

export function useFocusManagement(isOpen: boolean) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element in container
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.[0]) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      // Restore focus when closing
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  return containerRef;
}
```

### Screen Reader Announcements
```typescript
// hooks/useAnnouncements.ts
import { useCallback } from 'react';

export function useAnnouncements() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return { announce };
}
```

## 9. Testing Setup

### Component Testing
```typescript
// tests/utils/test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## 10. Performance Optimization

### Code Splitting
```typescript
// utils/loadable.tsx
import { lazy, Suspense } from 'react';
import { ComponentLoader } from '@/components/Shared/Loader';

export function loadable<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(importFunc);

  return function LoadableComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={<ComponentLoader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
```

### Memoization Patterns
```typescript
// hooks/useMemoizedValue.ts
import { useMemo } from 'react';

export function useMemoizedValue<T>(
  value: T,
  deps: React.DependencyList
): T {
  return useMemo(() => value, deps);
}

export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}
```

This implementation guide provides a solid foundation for building the SecureDeploy web application with modern React patterns, TypeScript, accessibility considerations, and scalable architecture.
