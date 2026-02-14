import {InfoCardProps}from '../../types/index'
export default function InfoCard({ icon: Icon, iconColor, iconBgColor, label, value, className }: InfoCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md p-[3px] rounded-xl md:rounded-2xl shadow-xl border border-white/30">
      <div className={`bg-white/95 backdrop-blur-sm p-3 rounded-lg md:rounded-xl shadow-lg h-full flex items-center ${className}`}>
        <div className="flex items-center gap-2 md:gap-3 w-full">
          <div className={`w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 ${iconBgColor} rounded-full flex items-center justify-center shrink-0`}>
            <Icon className={`${iconColor} text-lg md:text-xl`} />
          </div>
          <div className="flex-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900">{label}</p>
            <p className="font-semibold text-sm md:text-base lg:text-lg text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
