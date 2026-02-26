import Link from 'next/link';
import { Appointment } from '../types';
import { getText, getStatusConfig } from '../utils/helpers';

interface PatientFlowCardProps {
  appointments: Appointment[];
}

export default function PatientFlowCard({ appointments }: PatientFlowCardProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-xl">groups</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Live Patient Flow</h3>
            <p className="text-sm text-gray-600 font-medium mt-0.5">
              <span className="text-teal-600 font-bold">{appointments.length}</span> patients today
            </p>
          </div>
        </div>
        <Link 
          href="/pages/doctor/schedule" 
          className="px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1"
        >
          View Schedule
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
      
      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const config = getStatusConfig(appointment.status);
            
            return (
              <div 
                key={appointment.id}
                className={`group bg-linear-to-br ${config.bgColor} rounded-xl border ${config.borderColor}`}
              >
                <div className="flex items-center gap-3 p-4">
                  <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${config.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                    <span className="material-icons text-white text-xl">person</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{getText(appointment.patientName)}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`font-bold ${config.textColor} px-2.5 py-0.5 rounded-lg bg-white/60`}>
                        {config.label}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 font-medium">{config.location}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-bold text-teal-600">{appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 shadow-sm">
              <span className="material-icons text-3xl text-gray-300">event_busy</span>
            </div>
            <p className="text-sm font-bold text-gray-500">No patients today</p>
            <p className="text-xs text-gray-400 mt-0.5">Your schedule is clear</p>
          </div>
        )}
      </div>
    </div>
  );
}
