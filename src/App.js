import './App.css';
import Koleksi from './components/Koleksi';
import Keanggotaan from './components/Keanggotaan';
import Pengembalian from './components/Pengembalian';

function App() {
  return (
    <div className="App">
      <Pengembalian />
      <Koleksi />
      <Keanggotaan />
    </div>
  );
}

export default App;
