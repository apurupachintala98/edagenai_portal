import { ReactNode } from "react";

export interface SpinnerProps {
  zIndex?: string;
}

export interface ThemeProps {
  theme: string;
  children: React.ReactNode;
}

export interface ProgressReportData {
  name: string;
  value: number;
}

export enum TypeProps {
  Auto = "auto",
  Fixed = "fixed",
}

export interface HeaderProps {
  zIndex?: string;
  type?: TypeProps;
  isSearchEnabled?: boolean;
  sidebarType?: string;
  currentTab?: string;
  dynamicWidth?: React.RefObject<any>;
}

export interface DataTableProps {
  title: string;
  header: string[];
  row: object[];
}

export interface UserInfo {
  exp?: number;
  user: {
    username: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface AuthContextType {
  userInfo: UserInfo;
  isAuthenticated: boolean;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
  verifyAdminPassword: (input: string) => Promise<boolean>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
