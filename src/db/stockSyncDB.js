import Dexie from 'dexie';

const uuid = () => crypto?.randomUUID?.() || `${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;

export const db = new Dexie('StockSyncDB');

db.version(1).stores({
  branches: '&id, name, code',
  users: '&id, email, role',
  products: '&id, sku, name, category',
  stockItems: '&id, branchId, productId, quantity',
  sales: '&id, branchId, cashierId, createdAt, status',
  saleItems: '&id, saleId, productId',
  settings: '&id, category',
  syncQueue: '&id, entity, recordId, operation, createdAt',
});

const branchIds = {
  riyadh: uuid(),
  jeddah: uuid(),
  dammam: uuid(),
};

const userIds = {
  admin: uuid(),
  manager: uuid(),
  cashier: uuid(),
};

const productIds = {
  wirelessCharger: uuid(),
  bluetoothHeadset: uuid(),
  posTerminal: uuid(),
  powerBank: uuid(),
  thermalPrinter: uuid(),
  barcodeScanner: uuid(),
};

const saleIds = {
  sale1: uuid(),
  sale2: uuid(),
};

export async function initializeDatabase() {
  const existing = await db.products.count();
  if (existing > 0) {
    return;
  }

  const branches = [
    {
      id: branchIds.riyadh,
      name: 'فرع الرياض',
      code: 'RYD',
      address: 'الرياض - العليا',
      phone: '059-123-4567',
      managerId: userIds.manager,
      createdAt: '2026-04-12T08:00:00Z',
      updatedAt: '2026-04-12T08:00:00Z',
    },
    {
      id: branchIds.jeddah,
      name: 'فرع جدة',
      code: 'JED',
      address: 'جدة - التحلية',
      phone: '059-234-5678',
      managerId: userIds.manager,
      createdAt: '2026-04-12T08:10:00Z',
      updatedAt: '2026-04-12T08:10:00Z',
    },
    {
      id: branchIds.dammam,
      name: 'فرع الدمام',
      code: 'DAM',
      address: 'الدمام - الخبر',
      phone: '059-345-6789',
      managerId: userIds.manager,
      createdAt: '2026-04-12T08:20:00Z',
      updatedAt: '2026-04-12T08:20:00Z',
    },
  ];

  const users = [
    {
      id: userIds.admin,
      name: 'محمد الشمري',
      email: 'admin@stocksync.sa',
      role: 'admin',
      branchIds: [branchIds.riyadh, branchIds.jeddah, branchIds.dammam],
      active: true,
      createdAt: '2026-04-12T08:05:00Z',
      updatedAt: '2026-04-12T08:05:00Z',
    },
    {
      id: userIds.manager,
      name: 'سلمان الأحمدي',
      email: 'manager@stocksync.sa',
      role: 'manager',
      branchIds: [branchIds.riyadh, branchIds.jeddah],
      active: true,
      createdAt: '2026-04-12T08:06:00Z',
      updatedAt: '2026-04-12T08:06:00Z',
    },
    {
      id: userIds.cashier,
      name: 'نورة الزهراني',
      email: 'cashier@stocksync.sa',
      role: 'staff',
      branchIds: [branchIds.riyadh],
      active: true,
      createdAt: '2026-04-12T08:07:00Z',
      updatedAt: '2026-04-12T08:07:00Z',
    },
  ];

  const products = [
    {
      id: productIds.wirelessCharger,
      sku: 'SS-CHG-100',
      name: 'شاحن لاسلكي سريع',
      barcode: '1234567890123',
      category: 'إكسسوارات',
      brand: 'StockSync Tech',
      cost: 45,
      price: 99,
      taxRate: 15,
      reorderLevel: 8,
      createdAt: '2026-04-12T08:30:00Z',
      updatedAt: '2026-04-12T08:30:00Z',
    },
    {
      id: productIds.bluetoothHeadset,
      sku: 'SS-BH-210',
      name: 'سماعة بلوتوث لاسلكية',
      barcode: '9876543210987',
      category: 'إلكترونيات',
      brand: 'SoundSync',
      cost: 70,
      price: 159,
      taxRate: 15,
      reorderLevel: 6,
      createdAt: '2026-04-12T08:32:00Z',
      updatedAt: '2026-04-12T08:32:00Z',
    },
    {
      id: productIds.posTerminal,
      sku: 'SS-POS-310',
      name: 'جهاز نقاط البيع المحمول',
      barcode: '4567891234567',
      category: 'نقاط البيع',
      brand: 'POS Sync',
      cost: 1200,
      price: 1899,
      taxRate: 5,
      reorderLevel: 2,
      createdAt: '2026-04-12T08:34:00Z',
      updatedAt: '2026-04-12T08:34:00Z',
    },
    {
      id: productIds.powerBank,
      sku: 'SS-PB-520',
      name: 'باور بانك 20000mAh',
      barcode: '3216549870123',
      category: 'إكسسوارات',
      brand: 'ChargePro',
      cost: 85,
      price: 169,
      taxRate: 15,
      reorderLevel: 10,
      createdAt: '2026-04-12T08:36:00Z',
      updatedAt: '2026-04-12T08:36:00Z',
    },
    {
      id: productIds.thermalPrinter,
      sku: 'SS-TP-410',
      name: 'طابعة حرارية للمبيعات',
      barcode: '7891234567890',
      category: 'نقاط البيع',
      brand: 'PrintFlow',
      cost: 550,
      price: 949,
      taxRate: 5,
      reorderLevel: 3,
      createdAt: '2026-04-12T08:38:00Z',
      updatedAt: '2026-04-12T08:38:00Z',
    },
    {
      id: productIds.barcodeScanner,
      sku: 'SS-BS-220',
      name: 'ماسح باركود محمول',
      barcode: '6543217890123',
      category: 'إلكترونيات',
      brand: 'ScanFast',
      cost: 230,
      price: 399,
      taxRate: 15,
      reorderLevel: 5,
      createdAt: '2026-04-12T08:40:00Z',
      updatedAt: '2026-04-12T08:40:00Z',
    },
  ];

  const stockItems = [
    { id: uuid(), branchId: branchIds.riyadh, productId: productIds.wirelessCharger, quantity: 32, reserved: 4, lastUpdated: '2026-04-12T09:00:00Z' },
    { id: uuid(), branchId: branchIds.jeddah, productId: productIds.wirelessCharger, quantity: 14, reserved: 2, lastUpdated: '2026-04-12T09:05:00Z' },
    { id: uuid(), branchId: branchIds.dammam, productId: productIds.wirelessCharger, quantity: 8, reserved: 1, lastUpdated: '2026-04-12T09:07:00Z' },
    { id: uuid(), branchId: branchIds.riyadh, productId: productIds.bluetoothHeadset, quantity: 24, reserved: 3, lastUpdated: '2026-04-12T09:10:00Z' },
    { id: uuid(), branchId: branchIds.jeddah, productId: productIds.bluetoothHeadset, quantity: 18, reserved: 1, lastUpdated: '2026-04-12T09:15:00Z' },
    { id: uuid(), branchId: branchIds.riyadh, productId: productIds.posTerminal, quantity: 5, reserved: 0, lastUpdated: '2026-04-12T09:20:00Z' },
    { id: uuid(), branchId: branchIds.jeddah, productId: productIds.posTerminal, quantity: 2, reserved: 0, lastUpdated: '2026-04-12T09:22:00Z' },
    { id: uuid(), branchId: branchIds.dammam, productId: productIds.powerBank, quantity: 12, reserved: 1, lastUpdated: '2026-04-12T09:25:00Z' },
    { id: uuid(), branchId: branchIds.riyadh, productId: productIds.thermalPrinter, quantity: 3, reserved: 0, lastUpdated: '2026-04-12T09:30:00Z' },
    { id: uuid(), branchId: branchIds.jeddah, productId: productIds.barcodeScanner, quantity: 10, reserved: 0, lastUpdated: '2026-04-12T09:35:00Z' },
  ];

  const saleItems = [
    {
      id: uuid(),
      saleId: saleIds.sale1,
      productId: productIds.wirelessCharger,
      name: 'شاحن لاسلكي سريع',
      quantity: 2,
      unitPrice: 99,
      discount: 0,
      tax: 29.7,
      subtotal: 227.7,
    },
    {
      id: uuid(),
      saleId: saleIds.sale1,
      productId: productIds.powerBank,
      name: 'باور بانك 20000mAh',
      quantity: 1,
      unitPrice: 169,
      discount: 0,
      tax: 25.35,
      subtotal: 194.35,
    },
    {
      id: uuid(),
      saleId: saleIds.sale2,
      productId: productIds.barcodeScanner,
      name: 'ماسح باركود محمول',
      quantity: 1,
      unitPrice: 399,
      discount: 0,
      tax: 59.85,
      subtotal: 458.85,
    },
  ];

  const sales = [
    {
      id: saleIds.sale1,
      branchId: branchIds.riyadh,
      cashierId: userIds.cashier,
      customerName: 'سامي الأحمد',
      items: saleItems.filter((item) => item.saleId === saleIds.sale1).map((item) => item.id),
      totalAmount: 422.05,
      taxTotal: 55.05,
      discountTotal: 0,
      paymentMethod: 'card',
      status: 'completed',
      createdAt: '2026-04-12T10:30:00Z',
      updatedAt: '2026-04-12T10:30:00Z',
    },
    {
      id: saleIds.sale2,
      branchId: branchIds.jeddah,
      cashierId: userIds.cashier,
      customerName: 'هدى الزهراني',
      items: saleItems.filter((item) => item.saleId === saleIds.sale2).map((item) => item.id),
      totalAmount: 458.85,
      taxTotal: 59.85,
      discountTotal: 0,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: '2026-04-12T11:15:00Z',
      updatedAt: '2026-04-12T11:15:00Z',
    },
  ];

  const settings = [
    {
      id: uuid(),
      category: 'identity',
      storeName: 'StockSync Store',
      logo: null,
      currency: 'SAR',
      language: 'ar',
      theme: 'light',
      createdAt: '2026-04-12T08:00:00Z',
      updatedAt: '2026-04-12T08:00:00Z',
    },
    {
      id: uuid(),
      category: 'accounting',
      vatRate: 15,
      enableDiscounts: true,
      createdAt: '2026-04-12T08:00:00Z',
      updatedAt: '2026-04-12T08:00:00Z',
    },
    {
      id: uuid(),
      category: 'alerts',
      lowStockThreshold: 10,
      createdAt: '2026-04-12T08:00:00Z',
      updatedAt: '2026-04-12T08:00:00Z',
    },
    {
      id: uuid(),
      category: 'printing',
      receiptFooter: 'شكراً لزيارتكم',
      printerType: 'thermal',
      printerSize: '80mm',
      createdAt: '2026-04-12T08:00:00Z',
      updatedAt: '2026-04-12T08:00:00Z',
    },
    {
      id: uuid(),
      category: 'sync',
      autoSync: true,
      createdAt: '2026-04-12T08:00:00Z',
      updatedAt: '2026-04-12T08:00:00Z',
    },
  ];

  await db.transaction('rw', db.branches, db.users, db.products, db.stockItems, db.saleItems, db.sales, db.settings, async () => {
    await db.branches.bulkAdd(branches);
    await db.users.bulkAdd(users);
    await db.products.bulkAdd(products);
    await db.stockItems.bulkAdd(stockItems);
    await db.saleItems.bulkAdd(saleItems);
    await db.sales.bulkAdd(sales);
    await db.settings.bulkAdd(settings);
  });
}
