export const roles = ['admin', 'manager', 'staff'];

export const branches = {
  id: '',
  name: '',
  code: '',
  address: '',
  phone: '',
  managerId: '',
  createdAt: '',
  updatedAt: '',
};

export const users = {
  id: '',
  name: '',
  email: '',
  role: 'staff',
  branchIds: [],
  active: true,
  createdAt: '',
  updatedAt: '',
};

export const products = {
  id: '',
  sku: '',
  name: '',
  barcode: '',
  category: '',
  brand: '',
  cost: 0,
  price: 0,
  taxRate: 0,
  reorderLevel: 0,
  createdAt: '',
  updatedAt: '',
};

export const stockItems = {
  id: '',
  branchId: '',
  productId: '',
  quantity: 0,
  reserved: 0,
  lastUpdated: '',
};

export const saleItems = {
  id: '',
  saleId: '',
  productId: '',
  name: '',
  quantity: 0,
  unitPrice: 0,
  discount: 0,
  tax: 0,
  subtotal: 0,
};

export const sales = {
  id: '',
  branchId: '',
  cashierId: '',
  customerName: '',
  items: [],
  totalAmount: 0,
  taxTotal: 0,
  discountTotal: 0,
  paymentMethod: 'cash',
  status: 'completed',
  createdAt: '',
  updatedAt: '',
};

export const syncQueueItems = {
  id: '',
  entity: 'product',
  recordId: '',
  operation: 'create',
  createdAt: '',
};
