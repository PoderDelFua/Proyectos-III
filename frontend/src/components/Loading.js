import { Loader } from 'lucide-react';

const spin = {
  display: 'inline-block',
  animation: 'spin 1.5s linear infinite',
};

const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Loading = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <style>{keyframes}</style>
      <img src="/LOGO_UTAD.png" alt="Logo" className="h-24" style={{ height: '96px', marginBottom: '20px' }} />
      <Loader size={80} color="#3790fa" style={spin} />
    </div>
  );
};

export default Loading;