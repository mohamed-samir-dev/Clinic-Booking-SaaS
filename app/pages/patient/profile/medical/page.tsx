'use client';

import { useMedicalForm } from './hooks/useMedicalForm';
import { SuccessNotification } from './components/SuccessNotification';
import { PageHeader } from './components/PageHeader';
import { BasicHealthSection } from './components/BasicHealthSection';
import { AllergiesSection } from './components/AllergiesSection';
import { ChronicConditionsSection } from './components/ChronicConditionsSection';
import { MedicationsSection } from './components/MedicationsSection';
import { NotesSection } from './components/NotesSection';

export default function MedicalInfoPage() {
  const {
    formData,
    setFormData,
    editingSection,
    setEditingSection,
    loading,
    showSuccess,
    successMessage,
    errorMessage,
    newAllergy,
    setNewAllergy,
    newMedication,
    setNewMedication,
    handleAddAllergy,
    handleRemoveAllergy,
    handleAddMedication,
    handleRemoveMedication,
    handleChronicConditionToggle,
    handleSubmit
  } = useMedicalForm();

  return (
    <div className="max-w-7xl">
      <SuccessNotification showSuccess={showSuccess} errorMessage={errorMessage} successMessage={successMessage} />
      <PageHeader />

      
      <div className="space-y-4 sm:space-y-6">
        <BasicHealthSection 
          formData={formData}
          setFormData={setFormData}
          editingSection={editingSection}
          setEditingSection={setEditingSection}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        
        <AllergiesSection 
          formData={formData}
          editingSection={editingSection}
          setEditingSection={setEditingSection}
          loading={loading}
          handleSubmit={handleSubmit}
          newAllergy={newAllergy}
          setNewAllergy={setNewAllergy}
          handleAddAllergy={handleAddAllergy}
          handleRemoveAllergy={handleRemoveAllergy}
        />
        
        <ChronicConditionsSection 
          formData={formData}
          setFormData={setFormData}
          editingSection={editingSection}
          setEditingSection={setEditingSection}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChronicConditionToggle={handleChronicConditionToggle}
        />
        
        <MedicationsSection 
          formData={formData}
          editingSection={editingSection}
          setEditingSection={setEditingSection}
          loading={loading}
          handleSubmit={handleSubmit}
          newMedication={newMedication}
          setNewMedication={setNewMedication}
          handleAddMedication={handleAddMedication}
          handleRemoveMedication={handleRemoveMedication}
        />
        
        <NotesSection 
          formData={formData}
          setFormData={setFormData}
          editingSection={editingSection}
          setEditingSection={setEditingSection}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
