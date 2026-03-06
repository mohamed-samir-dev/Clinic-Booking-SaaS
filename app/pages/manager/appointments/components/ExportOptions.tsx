import { Download, FileSpreadsheet, Printer } from 'lucide-react';
import toast from 'react-hot-toast';
import { Appointment } from '../types';

interface ExportOptionsProps {
  appointments: Appointment[];
}

export const ExportOptions = ({ appointments }: ExportOptionsProps) => {
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const exportToCSV = () => {
    const headers = ['Patient', 'Doctor', 'Date', 'Time', 'Status', 'Phone'];
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
    toast.success('Exported to CSV');
  };

  const exportToExcel = () => {
    // Simple Excel export using HTML table
    const headers = ['Patient', 'Doctor', 'Date', 'Time', 'Status', 'Phone'];
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
    toast.success('Exported to Excel');
  };

  const printAppointments = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Appointments - ${new Date().toLocaleDateString()}</title>
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
          <h1>Daily Appointment Sheet</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Phone</th>
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
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
        title="Export to CSV"
      >
        <Download size={18} />
        <span className="hidden sm:inline">CSV</span>
      </button>

      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
        title="Export to Excel"
      >
        <FileSpreadsheet size={18} />
        <span className="hidden sm:inline">Excel</span>
      </button>

      <button
        onClick={printAppointments}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
        title="Print"
      >
        <Printer size={18} />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
};
