
import {MedicalContextProps}from '../types/types'

export default function MedicalContext({ reason, setReason, file, handleFileChange }: MedicalContextProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-teal-600">medical_information</span>
        <h3 className="text-lg font-bold text-gray-900">Medical Context</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Reason for Visit / Symptoms</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none resize-none text-gray-900 text-base"
            placeholder="Briefly describe your concerns or symptoms..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Previous Reports or Prescriptions (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <span className="material-icons text-4xl text-gray-400 mb-2 block">upload_file</span>
              <p className="text-base font-semibold text-gray-900 mb-1">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-600">PDF, JPG or PNG (max. 10MB)</p>
              {!file && (
                <button type="button" className="mt-3 px-4 py-2 text-sm text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
                  Browse files
                </button>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
