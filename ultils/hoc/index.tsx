import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

export default function withAuth(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const isAuthenticated =  getCookie('refreshToken');
        
    if (isAuthenticated === null || isAuthenticated === undefined) {
      toast.error('please login !!');
      router.push('/auth/sign-in');
    }
    return <Component {...props} />;
  };
}
