import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: {
    title: 'تأكيد الحذف',
    message: 'هل أنت متأكد من حذف د.',
    cancel: 'إلغاء',
    delete: 'حذف',
  },
  en: {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete Dr.',
    cancel: 'Cancel',
    delete: 'Delete',
  },
};

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  doctorName: string;
}

export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel, doctorName }: DeleteConfirmModalProps) {
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'] ?? t.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-4">{tr.title}</h3>
        <p className="text-gray-300 mb-6">
          {tr.message} {doctorName}?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {tr.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {tr.delete}
          </button>
        </div>
      </div>
    </div>
  );
}
