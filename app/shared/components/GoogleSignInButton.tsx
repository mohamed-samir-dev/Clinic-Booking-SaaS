import { FcGoogle } from 'react-icons/fc';

interface GoogleSignInButtonProps {
  onClick?: () => void;
}

export default function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border-2 cursor-pointer border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-3"
    >
      <FcGoogle className="text-xl" />
      Sign in with Google
    </button>
  );
}
