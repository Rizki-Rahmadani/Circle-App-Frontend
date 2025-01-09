import { Box } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/CardProfile';
import Suggested from '../components/Suggestion';
import Footer from '../components/Footer';
import useAuthStore from '@/components/StoreState/authStoreToken';
import Swal from 'sweetalert2';

const PrivateLayout: React.FC = () => {
  const Navigate = useNavigate(); // Import fungsi untuk navigasi dari useNavigate dari react-router-dom
  const clearToken = useAuthStore((state) => state.clearToken);

  const onLogout = () => {
    clearToken();
    Navigate('/login');
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Logged Out successfully',
    }).then(() => {
      // window.location.reload();
    });
  };
  return (
    <Box display={'flex'} backgroundColor={'black'}>
      <Box w={'2/5'} px={10}>
        <Navbar onclick={onLogout} />
      </Box>

      <main
        className=" w-full h-screen font-['Cambria']"
        style={{ overflowY: 'auto', maxHeight: '100vh' }}
      >
        <Outlet />
      </main>
      <Box w={'2/5'} px={10}>
        <Profile />
        <Suggested />
        <Footer />
      </Box>
    </Box>
  );
};

export default PrivateLayout;
