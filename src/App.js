import './App.css';
import Koleksi from './components/Koleksi';
import Keanggotaan from './components/Keanggotaan';
import Pengembalian from './components/Pengembalian';
import Peminjaman from './components/Peminjaman';

function App() {
  return (
    <div className="App">
      <Koleksi/>
      <Keanggotaan/>
      <Peminjaman/>
      <Pengembalian />
    </div>
  );
}

export default App;
