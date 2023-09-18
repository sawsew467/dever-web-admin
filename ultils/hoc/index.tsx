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
    const shouldRedirect = (!isAuthenticated && !isAuthProcess);
    const [isRedirecting, setIsRedirecting] = React.useState(false);

    React.useEffect(() => {
      if (shouldRedirect) {
        toast.error('please login !!');
        setIsRedirecting(true); // Bắt đầu quá trình chuyển hướng
        router.push('/auth/sign-in').then(() => {
          setIsRedirecting(false); // Chuyển hướng hoàn tất
        });
      }
    }, [shouldRedirect]);

    if (isAuthenticated && isAuthProcess) {
      toast.error("You are already authenticated !")
      router.back();
      return null; // Return null to avoid rendering the component
    }

    // Nếu đang trong quá trình chuyển hướng, không hiển thị component
    if (isRedirecting) {
      return null;
    }

    return <Component {...props} />;
  };
}
