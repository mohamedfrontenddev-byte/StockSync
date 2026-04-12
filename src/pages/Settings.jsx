import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSetting, setTheme } from '../store/settingsSlice';

const tabs = [
  { id: 'identity', label: 'الهوية', icon: '🏪' },
  { id: 'accounting', label: 'الحسابات', icon: '💰' },
  { id: 'alerts', label: 'التنبيهات', icon: '🚨' },
  { id: 'printing', label: 'الطباعة', icon: '🖨️' },
  { id: 'sync', label: 'المزامنة', icon: '🔄' },
];

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);
  const [activeTab, setActiveTab] = useState('identity');

  const handleUpdateSetting = (category, field, value) => {
    dispatch(updateSetting({ category, data: { [field]: value } }));
  };

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'identity':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  اسم المتجر
                </label>
                <input
                  type="text"
                  value={settings.identity.storeName}
                  onChange={(e) => handleUpdateSetting('identity', 'storeName', e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  العملة
                </label>
                <select
                  value={settings.identity.currency}
                  onChange={(e) => handleUpdateSetting('identity', 'currency', e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="EUR">يورو (EUR)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                الوضع المظهري
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    settings.identity.theme === 'light'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ☀️ وضع فاتح
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    settings.identity.theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  🌙 وضع داكن
                </button>
              </div>
            </div>
          </div>
        );
      case 'accounting':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  نسبة الضريبة VAT (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.accounting.vatRate}
                  onChange={(e) => handleUpdateSetting('accounting', 'vatRate', Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  الخصومات
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enableDiscounts"
                    checked={settings.accounting.enableDiscounts}
                    onChange={(e) => handleUpdateSetting('accounting', 'enableDiscounts', e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="enableDiscounts" className="text-sm text-slate-700 dark:text-slate-300">
                    تفعيل الخصومات
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                حد الأمان للمخزون
              </label>
              <input
                type="number"
                min="0"
                value={settings.alerts.lowStockThreshold}
                onChange={(e) => handleUpdateSetting('alerts', 'lowStockThreshold', Number(e.target.value))}
                className="w-full max-w-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
              />
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                سيتم إرسال تنبيه عندما يصل المخزون إلى هذا الحد أو أقل
              </p>
            </div>
          </div>
        );
      case 'printing':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                تذييل الفاتورة
              </label>
              <textarea
                value={settings.printing.receiptFooter}
                onChange={(e) => handleUpdateSetting('printing', 'receiptFooter', e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  نوع الطابعة
                </label>
                <select
                  value={settings.printing.printerType}
                  onChange={(e) => handleUpdateSetting('printing', 'printerType', e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                >
                  <option value="thermal">حرارية</option>
                  <option value="inkjet">حبرية</option>
                  <option value="laser">ليزر</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  حجم الورق
                </label>
                <select
                  value={settings.printing.printerSize}
                  onChange={(e) => handleUpdateSetting('printing', 'printerSize', e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                >
                  <option value="58mm">58 مم</option>
                  <option value="80mm">80 مم</option>
                  <option value="A4">A4</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'sync':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                المزامنة
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="autoSync"
                  checked={settings.sync.autoSync}
                  onChange={(e) => handleUpdateSetting('sync', 'autoSync', e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="autoSync" className="text-sm text-slate-700 dark:text-slate-300">
                  تفعيل المزامنة التلقائية مع السيرفر
                </label>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                عند التفعيل، سيتم مزامنة البيانات تلقائياً عند الاتصال بالإنترنت
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">نظام الإعدادات المتقدم</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">الإعدادات</h1>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
