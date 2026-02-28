'use client';

import { usePersonalInfo, usePasswordChange, useDeleteAccount } from './personalinfo/hooks';
import {
  SuccessMessage,
  ProfileHeader,
  ContactInfo,
  PersonalDetails,
  AddressInfo,
  PasswordSection,
  DeleteAccountButton,
  PasswordModal,
  DeleteModal
} from './personalinfo/components';

export default function PersonalInfoPage() {
  const {
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    loading: profileLoading,
    showSuccess,
    successMessage,
    errorMessage,
    passwordData,
    setPasswordData,
    deletePassword,
    setDeletePassword,
    handleSubmit
  } = usePersonalInfo();

  const {
    showPasswordModal,
    setShowPasswordModal,
    showPasswordError,
    passwordErrorMsg,
    showCurrent,
    setShowCurrent,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    loading: passwordLoading,
    handleChangePassword
  } = usePasswordChange();

  const {
    showDeleteModal,
    setShowDeleteModal,
    showDeleteError,
    deleteErrorMsg,
    showDeletePassword,
    setShowDeletePassword,
    loading: deleteLoading,
    handleDeleteAccount
  } = useDeleteAccount();

  return (
    <div className="max-w-7xl">
      <SuccessMessage showSuccess={showSuccess} errorMessage={errorMessage} successMessage={successMessage} />

      <ProfileHeader
        name={formData.name}
        email={formData.email}
        isEditing={isEditing}
        loading={profileLoading}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={(e) => handleSubmit(e)}
      />

      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <ContactInfo formData={formData} isEditing={isEditing} onChange={setFormData} />
            <PersonalDetails formData={formData} isEditing={isEditing} onChange={setFormData} />
          </div>

          <AddressInfo formData={formData} isEditing={isEditing} onChange={setFormData} />
        </form>

        <PasswordSection onChangePassword={() => setShowPasswordModal(true)} />

        <DeleteAccountButton onDelete={() => setShowDeleteModal(true)} />
      </div>
      <PasswordModal
        show={showPasswordModal}
        passwordData={passwordData}
        showCurrent={showCurrent}
        showNew={showNew}
        showConfirm={showConfirm}
        showError={showPasswordError}
        errorMsg={passwordErrorMsg}
        loading={passwordLoading}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={(e) => handleChangePassword(e, passwordData, setPasswordData, () => {}, () => {}, () => {})}
        onChange={setPasswordData}
        onToggleCurrent={() => setShowCurrent(!showCurrent)}
        onToggleNew={() => setShowNew(!showNew)}
        onToggleConfirm={() => setShowConfirm(!showConfirm)}
      />

      <DeleteModal
        show={showDeleteModal}
        deletePassword={deletePassword}
        showPassword={showDeletePassword}
        showError={showDeleteError}
        errorMsg={deleteErrorMsg}
        loading={deleteLoading}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={(e) => handleDeleteAccount(e, deletePassword)}
        onPasswordChange={setDeletePassword}
        onTogglePassword={() => setShowDeletePassword(!showDeletePassword)}
      />
    </div>
  );
}
