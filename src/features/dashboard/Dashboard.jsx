import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshDashboardStats } from '../../store/dashboardSlice';

const statCards = [
  { label: 'إجمالي الفواتير', key: 'totalSales' },
  { label: 'إيرادات اليوم', key: 'todayRevenue', isCurrency: true },
  { label: 'منتجات منخفضة المخزون', key: 'lowStockCount' },
  { label: 'الفروع النشطة', key: 'activeBranches' },
  { label: 'المستخدمين النشطين', key: 'activeUsers' },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.dashboard);
  const settings = useSelector((state) => state.settings.data);

  useEffect(() => {
    if (stats.status === 'idle') {
      dispatch(refreshDashboardStats());
    }
  }, [dispatch, stats.status]);

  const formatCurrency = (amount) => {
    const currency = settings.identity.currency;
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">لوحة التحكم الرئيسية</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">مرحباً بك في {settings.identity.storeName}</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-100 dark:bg-slate-700 px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
            <span>آخر تحديث</span>
            <strong>الآن</strong>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.key} className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
              {card.isCurrency && typeof stats[card.key] === 'number'
                ? formatCurrency(stats[card.key])
                : typeof stats[card.key] === 'number'
                ? stats[card.key]
                : 0}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">موجز المخزون</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">آخر التحديثات</span>
          </div>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>يتم تحميل بيانات المنتجات المخزنية من قاعدة Dexie المحلية.</p>
            <p>يمكنك فتح صفحة المنتجات لتنفيذ بحث مباشر على الكتالوج.</p>
            <p>عند إضافة مبيعات جديدة، تتحدث الإحصائيات تلقائياً.</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">موجز المبيعات</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">المعلومات الحالية</span>
          </div>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>إجمالي عدد الفواتير محلياً: {stats.totalSales}</p>
            <p>إجمالي الإيرادات المسجلة في النظام: {formatCurrency(stats.todayRevenue)}</p>
            <p>هناك {stats.lowStockCount} منتجاً تحت مستوى إعادة الطلب.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
