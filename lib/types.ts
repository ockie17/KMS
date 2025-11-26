export interface Collection {
  id: string
  name: string
  category: string
  origin: string
  year: string
  condition: "Baik" | "Perlu Perawatan" | "Rusak" | "Dalam Restorasi"
  location: string
  image?: string
  description?: string
  acquisitionDate: string
  value?: number
}

export interface Exhibition {
  id: string
  name: string
  startDate: string
  endDate: string
  status: "Upcoming" | "Ongoing" | "Completed"
  location: string
  curator: string
  collections: string[]
  visitors?: number
}

export interface Employee {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  joinDate: string
  status: "Active" | "Inactive" | "On Leave"
  photo?: string
}

export interface Visitor {
  id: string
  date: string
  ticketType: "Regular" | "Student" | "Group" | "VIP"
  quantity: number
  total: number
}

export interface FinanceRecord {
  id: string
  date: string
  type: "Income" | "Expense"
  category: string
  amount: number
  description: string
  status: "Pending" | "Approved" | "Completed"
}

export interface ConservationRecord {
  id: string
  collectionId: string
  collectionName: string
  type: "Inspection" | "Treatment" | "Restoration"
  date: string
  technician: string
  status: "Scheduled" | "In Progress" | "Completed"
  notes: string
}

export interface ResearchProject {
  id: string
  title: string
  researcher: string
  startDate: string
  endDate?: string
  status: "Active" | "Completed" | "On Hold"
  collections: string[]
  publications: number
}

export interface SecurityLog {
  id: string
  timestamp: string
  type: "Access" | "Alert" | "Incident" | "Audit"
  location: string
  description: string
  severity: "Low" | "Medium" | "High" | "Critical"
}

export interface ProcurementItem {
  id: string
  name: string
  vendor: string
  quantity: number
  unitPrice: number
  totalPrice: number
  status: "Requested" | "Approved" | "Ordered" | "Received"
  requestDate: string
  expectedDate?: string
}

export type ModuleType =
  | "dashboard"
  | "collections"
  | "exhibitions"
  | "finance"
  | "procurement"
  | "conservation"
  | "visitors"
  | "hr"
  | "research"
  | "security"
  | "analytics"
  | "settings"
