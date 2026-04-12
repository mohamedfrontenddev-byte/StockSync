import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts, setSearchTerm } from '../store/productSlice';

export default function Products() {
  const dispatch = useDispatch();
  const { items, stockItems, status, searchTerm, error } = useSelector((state) => state.products);
  const settings = useSelector((state) => state.settings.data);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return items;
    }
    return items.filter((product) => {
      return [product.name, product.sku, product.category, product.brand]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [items, searchTerm]);

  const formatCurrency = (amount) => {
    const currency = settings.identity.currency;
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const productCount = items.length;
  const totalStock = stockItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <div className="mb-8 rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">قائمة المنتجات</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">المنتجات الحقيقية</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">ابحث في المخزون حسب الاسم، SKU، الفئة أو العلامة التجارية.</p>
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
            placeholder="ابحث عن منتج أو فئة..."
            className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">إجمالي المنتجات</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{productCount}</p>
              </div>
              <div className="rounded-3xl bg-blue-50 dark:bg-blue-900 px-4 py-3 text-blue-700 dark:text-blue-300">مخزون إجمالي {totalStock}</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProducts.map((product) => {
              const availableStock = stockItems
                .filter((item) => item.productId === product.id)
                .reduce((sum, item) => sum + item.quantity, 0);

              return (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{product.name}</h2>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{product.category} · {product.brand}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 dark:bg-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-300">SKU {product.sku}</div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span>السعر: {formatCurrency(product.price)}</span>
                    <span>الكمية المتاحة: {availableStock}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {status === 'loading' && <p className="text-slate-600 dark:text-slate-300">جاري تحميل المنتجات...</p>}
          {status === 'failed' && <p className="text-red-600 dark:text-red-400">حدث خطأ: {error}</p>}
          {status === 'succeeded' && filteredProducts.length === 0 && (
            <p className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-6 text-slate-600 dark:text-slate-300">لم يتم العثور على نتائج لبحثك.</p>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">نظرة عامة على الفئات</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>تم تجهيز هذه الصفحة باستخدام بيانات حقيقية من قاعدة البيانات المحلية.</p>
              <p>كل منتج قابل للنقر لعرض تفاصيله وتحديث المخزون لاحقاً.</p>
              <p>ابحث عن المنتجات لتحسين سير العمل في نظام POS الخاص بك.</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">نقاط القوة</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>• بحث سريع ومنظم في قاعدة بيانات Dexie.</li>
              <li>• تنقل بين الصفحات بدون إعادة تحميل.</li>
              <li>• منتجات حقيقية قابلة للتوسع.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
