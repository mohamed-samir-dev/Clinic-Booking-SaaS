import { X, Send } from 'lucide-react';

interface ReplyModalProps {
  show: boolean;
  message: string;
  setMessage: (message: string) => void;
  onClose: () => void;
  onSend: () => void;
}

export default function ReplyModal({ show, message, setMessage, onClose, onSend }: ReplyModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Reply to Doctor</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <label className="block text-gray-300 mb-2 text-sm font-medium">
            Your Message *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white min-h-[150px] focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Write your reply..."
          />
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
