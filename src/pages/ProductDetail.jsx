import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db, initializeDatabase } from '../db/stockSyncDB';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [stockItems, setStockItems] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      await initializeDatabase();
      const selectedProduct = await db.products.get(productId);
      const productStock = await db.stockItems.where('productId').equals(productId).toArray();
      const branchList = await db.branches.toArray();
      setProduct(selectedProduct);
      setStockItems(productStock);
      setBranches(branchList);
    }

    loadProduct();
  }, [productId]);

  const stockByBranch = useMemo(() => {
    return stockItems.map((item) => {
      const branch = branches.find((branchItem) => branchItem.id === item.branchId);
      return {
        branchName: branch?.name || 'فرع غير معروف',
        quantity: item.quantity,
      };
    });
  }, [branches, stockItems]);

  if (!product) {
    return <p className="rounded-3xl bg-white dark:bg-slate-800 p-6 text-slate-600 dark:text-slate-300 shadow-soft">جاري تحميل تفاصيل المنتج...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">تفاصيل المنتج</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{product.name}</h1>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            العودة إلى المنتجات
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">معلومات المنتج</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">SKU:</span> {product.sku}</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">الفئة:</span> {product.category}</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">العلامة:</span> {product.brand}</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">السعر:</span> {product.price.toLocaleString()} ريال</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">تكلفة الشراء:</span> {product.cost.toLocaleString()} ريال</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">الضرائب:</span> {product.taxRate}%</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">ترتيب الطلب:</span> {product.reorderLevel} وحدة</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">مخزون حسب الفرع</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {stockByBranch.map((item) => (
              <div key={item.branchName} className="flex items-center justify-between rounded-3xl bg-slate-50 dark:bg-slate-700 px-4 py-3">
                <span>{item.branchName}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
