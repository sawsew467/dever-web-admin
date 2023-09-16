import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

export default function withAuth(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await getCookie('refreshToken');
        
        if (isAuthenticated === null || isAuthenticated === undefined) {
          toast.error('please login !!');
          router.push('/auth/sign-in');
        }
        else  return <Component {...props} />;
      } catch (error) {
        console.error('Error while checking authentication:', error);
      }
    };

    checkAuthentication();
  };
}
