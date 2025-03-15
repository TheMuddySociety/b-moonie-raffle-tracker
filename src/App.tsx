
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { WalletContextProvider } from './context/WalletContextProvider';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <WalletContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </WalletContextProvider>
  );
}

export default App;
