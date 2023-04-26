import Koleksi from './components/Koleksi';
import App from './App';


function RedirectReact() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="koleksi" element={<Koleksi />} />
    </Routes>
  );
}
  
export default RedirectReact;