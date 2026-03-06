interface LoadingStateProps {
  theme: string;
}

export const LoadingState = ({ theme }: LoadingStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
      <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading requests...</p>
    </div>
  );
};
