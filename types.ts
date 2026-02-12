import React from 'react';

export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum AppView {
  // Public
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  SERVICE_DETAIL = 'SERVICE_DETAIL',
  PRICING = 'PRICING',
  CONTACT = 'CONTACT',
  FAQ = 'FAQ',
  // Auth
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  // User
  USER_DASHBOARD = 'USER_DASHBOARD',
  USER_PROFILE = 'USER_PROFILE',
  USER_SERVICE_SELECTION = 'USER_SERVICE_SELECTION',
  USER_REQUIREMENTS = 'USER_REQUIREMENTS',
  USER_ORDER_SUMMARY = 'USER_ORDER_SUMMARY',
  USER_PAYMENT = 'USER_PAYMENT',
  USER_CONFIRMATION = 'USER_CONFIRMATION',
  USER_TRACKING = 'USER_TRACKING',
  USER_SUBSCRIPTION = 'USER_SUBSCRIPTION',
  USER_AI_TOOLS = 'USER_AI_TOOLS',
  // Admin
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_CUSTOMERS = 'ADMIN_CUSTOMERS',
  ADMIN_ORDERS = 'ADMIN_ORDERS',
  ADMIN_REQUIREMENTS = 'ADMIN_REQUIREMENTS',
  ADMIN_SUBSCRIPTIONS = 'ADMIN_SUBSCRIPTIONS',
  ADMIN_PAYMENTS = 'ADMIN_PAYMENTS',
  ADMIN_SERVICES = 'ADMIN_SERVICES'
}

export interface ServicePackage {
  id: string;
  title: string;
  category: 'Startup' | 'Cafe' | 'Influencer' | 'Wedding' | 'Real Estate' | 'E-Commerce' | 'Wellness' | 'Corporate';
  price: number;
  features: string[];
  description: string;
  image: string;
  deliverables: string[];
  premiumPerks: string[];
  strategy: string;
  idealFor: string[];
  process: { week: string; title: string; desc: string }[];
}

export interface Order {
  id: string;
  customerName: string;
  service: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  date: string;
  amount: number;
  timeline?: { title: string; date: string; completed: boolean }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export interface Subscription {
  id: string;
  customerName: string;
  plan: 'Standard' | 'Premium';
  billingCycle: 'Monthly' | 'Annual';
  nextBilling: string;
  status: 'Active' | 'Past Due' | 'Cancelled';
  amount: number;
}

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  method: string;
  status: 'Succeeded' | 'Failed' | 'Refunded';
}

export interface Requirement {
  id: string;
  orderId: string;
  customerName: string;
  serviceName: string;
  submittedDate: string;
  status: 'Reviewed' | 'Pending Review' | 'Needs Info';
  details: {
    handles: string;
    aesthetic: string;
    objectives: string;
    brandAssets?: string; // Name of file uploaded
  };
}

export interface BookingData {
  serviceId?: string;
  requirements?: {
    businessName: string;
    handles: string;
    aesthetic: string;
    objectives: string;
    fileName?: string;
  };
  billingCycle?: 'monthly' | 'annual';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Shared State Props
export interface SharedStateProps {
  orders: Order[];
  customers: Customer[];
  requirements: Requirement[];
  services: ServicePackage[];
  subscriptions: Subscription[];
  payments: Payment[];
  
  // Actions
  addOrder: (o: Order) => void;
  updateOrder: (o: Order) => void;
  addCustomer: (c: Customer) => void;
  updateCustomer: (c: Customer) => void;
  deleteCustomer: (id: string) => void;
  addRequirement: (r: Requirement) => void;
  updateRequirement: (id: string, status: any) => void;
  addService: (s: ServicePackage) => void;
  updateService: (s: ServicePackage) => void;
  deleteService: (id: string) => void;
}
