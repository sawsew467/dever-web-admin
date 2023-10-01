import { useRouter, usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

export default function withAuth(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const path = usePathname();
    const authenticate = getCookie('refreshToken');
    const isAuthenticated = authenticate !== null && authenticate !== undefined;
    const isAuthProcess = path.includes("auth");    
    if (!isAuthenticated && !isAuthProcess) {
      toast.error('please login !!');
      return router.push('/auth/sign-in'); 
    }

    if (isAuthenticated && isAuthProcess) {
      toast.error("You are already authenticate !")
      return router.back();
    }

    return <Component {...props} />;
  };
}


