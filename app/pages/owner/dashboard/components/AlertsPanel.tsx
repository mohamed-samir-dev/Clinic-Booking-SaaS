import { Alert as AlertType } from '../types';
import { AlertTriangle, TrendingDown, Star, XCircle } from 'lucide-react';

interface AlertsPanelProps {
  locale: 'ar' | 'en';
  alerts: AlertType[];
  onAlertAction: (alert: AlertType) => void;
}

const t = {
  ar: { title: 'التنبيهات والرؤى', allGood: 'جميع الأنظمة تعمل بشكل جيد!' },
  en: { title: 'Alerts & Insights', allGood: 'All systems running smoothly!' },
} as const;

export const AlertsPanel = ({ locale, alerts, onAlertAction }: AlertsPanelProps) => {
  const tr = t[locale];

  const getAlertIcon = (type: AlertType['type']) => {
    switch (type) {
      case 'no_manager': return AlertTriangle;
      case 'revenue_drop': return TrendingDown;
      case 'low_rating': return Star;
      case 'high_cancellation': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: AlertType['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'low': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const getSeverityBadgeColor = (severity: AlertType['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{tr.title}</h3>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{tr.allGood}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tr.title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadgeColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white mb-3">
                    {typeof alert.message === 'string' ? alert.message : alert.message[locale]}
                  </p>
                  <button
                    onClick={() => onAlertAction(alert)}
                    className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                  >
                    {alert.cta} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
