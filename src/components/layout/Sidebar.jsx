import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'لوحة التحكم', to: '/', icon: '🏠' },
  { label: 'المنتجات', to: '/products', icon: '📦' },
  { label: 'الفروع', to: '/branches', icon: '🏬' },
  { label: 'المبيعات', to: '/sales', icon: '💳' },
  { label: 'التقارير', to: '/reports', icon: '📊' },
  { label: 'الإعدادات', to: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 px-5 py-6">
      <div className="mb-10">
        <div className="text-2xl font-semibold text-slate-900">StockSync</div>
        <div className="mt-2 text-sm text-slate-500">نظام إدارة المخزون متعدد الفروع</div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
