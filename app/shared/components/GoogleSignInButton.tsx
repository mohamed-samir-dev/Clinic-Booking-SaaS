import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

interface GoogleSignInButtonProps {
  onSuccess?: (accessToken: string) => void;
  onError?: (error: string) => void;
  loading?: boolean;
}

export default function GoogleSignInButton({ onSuccess, onError, loading }: GoogleSignInButtonProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.auth.login : messages.auth.login;

  const login = useGoogleLogin({
    onSuccess: (response) => onSuccess?.(response.access_token),
    onError: () => onError?.('Google sign-in failed'),
    flow: 'implicit',
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={loading}
      className={`w-full border-2 cursor-pointer rounded-lg font-semibold py-2 xs:py-2.5 sm:py-3 text-sm sm:text-base transition-colors flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'}`}
    >
      <FcGoogle className="text-lg sm:text-xl" />
      {loading ? (locale === 'ar' ? 'جاري التسجيل...' : 'Signing in...') : t.signInWithGoogle}
    </button>
  );
}
