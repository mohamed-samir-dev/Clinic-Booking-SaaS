import { Download, FileSpreadsheet, Printer } from 'lucide-react';
import toast from 'react-hot-toast';
import { Appointment } from '../types';

interface ExportOptionsProps {
  appointments: Appointment[];
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    exportedCSV: 'تم التصدير إلى CSV',
    exportedExcel: 'تم التصدير إلى Excel',
    patient: 'المريض',
    doctor: 'الطبيب',
    date: 'التاريخ',
    time: 'الوقت',
    status: 'الحالة',
    phone: 'الهاتف',
    dailySheet: 'قائمة المواعيد اليومية',
    exportCSV: 'تصدير إلى CSV',
    exportExcel: 'تصدير إلى Excel',
    print: 'طباعة'
  },
  en: {
    exportedCSV: 'Exported to CSV',
    exportedExcel: 'Exported to Excel',
    patient: 'Patient',
    doctor: 'Doctor',
    date: 'Date',
    time: 'Time',
    status: 'Status',
    phone: 'Phone',
    dailySheet: 'Daily Appointment Sheet',
    exportCSV: 'Export to CSV',
    exportExcel: 'Export to Excel',
    print: 'Print'
  }
};

export const ExportOptions = ({ appointments, language = 'ar' }: ExportOptionsProps) => {
  const t = translations[language];
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  const exportToCSV = () => {
    const headers = [t.patient, t.doctor, t.date, t.time, t.status, t.phone];
    const rows = appointments.map(apt => [
      getName(apt.patientName),
      getName(apt.doctorName),
      new Date(apt.date).toLocaleDateString(),
      apt.time,
      apt.status,
      apt.patientPhone || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success(t.exportedCSV);
  };

  const exportToExcel = () => {
    // Simple Excel export using HTML table
    const headers = [t.patient, t.doctor, t.date, t.time, t.status, t.phone];
    const rows = appointments.map(apt => [
      getName(apt.patientName),
      getName(apt.doctorName),
      new Date(apt.date).toLocaleDateString(),
      apt.time,
      apt.status,
      apt.patientPhone || 'N/A'
    ]);

    let html = '<table><thead><tr>';
    headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(row => {
      html += '<tr>';
      row.forEach(cell => html += `<td>${cell}</td>`);
      html += '</tr>';
    });
    html += '</tbody></table>';

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    toast.success(t.exportedExcel);
  };

  const printAppointments = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t.dailySheet} - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #14b8a6; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${t.dailySheet}</h1>
          <p>${t.date}: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>${t.patient}</th>
                <th>${t.doctor}</th>
                <th>${t.date}</th>
                <th>${t.time}</th>
                <th>${t.status}</th>
                <th>${t.phone}</th>
              </tr>
            </thead>
            <tbody>
              ${appointments.map(apt => `
                <tr>
                  <td>${getName(apt.patientName)}</td>
                  <td>${getName(apt.doctorName)}</td>
                  <td>${new Date(apt.date).toLocaleDateString()}</td>
                  <td>${apt.time}</td>
                  <td>${apt.status}</td>
                  <td>${apt.patientPhone || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
        title={t.exportCSV}
      >
        <Download size={16} />
        <span className="hidden sm:inline">CSV</span>
      </button>

      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
        title={t.exportExcel}
      >
        <FileSpreadsheet size={16} />
        <span className="hidden sm:inline">Excel</span>
      </button>

      <button
        onClick={printAppointments}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
        title={t.print}
      >
        <Printer size={16} />
        <span className="hidden sm:inline">{t.print}</span>
      </button>
    </div>
  );
};
