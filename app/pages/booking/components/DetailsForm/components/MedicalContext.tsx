
import {MedicalContextProps}from '../types/types'

export default function MedicalContext({ reason, setReason, files, handleFileChange, handleFileRemove }: MedicalContextProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="material-icons text-teal-600 text-lg sm:text-xl">medical_information</span>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Medical Context</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">Reason for Visit / Symptoms</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none resize-none text-gray-900 text-sm sm:text-base"
            placeholder="Briefly describe your concerns or symptoms..."
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">Previous Reports or Prescriptions (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <span className="material-icons text-3xl sm:text-4xl text-gray-400 mb-2 block">upload_file</span>
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs sm:text-sm text-gray-600">PDF, JPG or PNG (max. 10MB each)</p>
              <button type="button" className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
                Browse files
              </button>
            </label>
          </div>
          {files && files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="material-icons text-teal-600 text-lg">description</span>
                    <span className="text-sm text-gray-900 truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)}
                    className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
                  >
                    <span className="material-icons text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
