import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Container from './Container';
import GlobalAudioPlayer from '../UI/GlobalAudioPlayer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-green-500 selection:text-white">
      <Navbar />
      <main className="py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
      <GlobalAudioPlayer />
    </div>
  );
};

export default Layout;
