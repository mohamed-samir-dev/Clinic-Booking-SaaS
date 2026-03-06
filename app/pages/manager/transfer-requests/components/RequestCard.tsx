import { Send } from 'lucide-react';
import { TransferRequest } from '../types';
import { getStatusIcon, getStatusColor } from '../utils';

interface RequestCardProps {
  request: TransferRequest;
  locale: 'en' | 'ar';
  onReply: (requestId: string) => void;
}

export default function RequestCard({ request, locale, onReply }: RequestCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon(request.status)}
          <div>
            <h3 className="text-white font-semibold text-lg">
              Dr. {request.doctorId.firstName} {request.doctorId.lastName}
            </h3>
            <p className="text-gray-400 text-sm">
              {typeof request.doctorId.specialty === 'object' 
                ? request.doctorId.specialty[locale] 
                : request.doctorId.specialty}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm border capitalize ${getStatusColor(
            request.status
          )}`}
        >
          {request.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-750 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Your Message:</p>
          <p className="text-white">{request.message}</p>
        </div>

        {request.doctorResponse && (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-teal-400 text-sm mb-1">Doctor Response:</p>
            <p className="text-white">{request.doctorResponse}</p>
          </div>
        )}

        {request.managerResponse && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm mb-1">Your Reply:</p>
            <p className="text-white">{request.managerResponse}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Sent: {new Date(request.createdAt).toLocaleDateString()}</span>
          {request.respondedAt && (
            <span>Responded: {new Date(request.respondedAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {request.doctorResponse && (
        <button
          onClick={() => onReply(request._id)}
          className="w-full mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors flex items-center justify-center gap-2"
        >
          <Send size={16} />
          Reply to Doctor
        </button>
      )}
    </div>
  );
}
