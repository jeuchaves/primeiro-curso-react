import './App.css';
import HelloWorld from './components/HelloWorld';
import SayMyName from './components/SayMyName';
import Pessoa from './components/Pessoa';

function App() {
  const nome = 'Maria';
  return (
    <div className="App">
      <SayMyName nome="Jeú" />
      <SayMyName nome="João" />
      <SayMyName nome={nome} />
      <Pessoa 
        nome="Jeú" 
        idade="22" 
        peso="95.5" 
        altura="171" 
        genero="Masculino" 
        foto="https://via.placeholder.com/150" 
      />
    </div>
  );
}

export default App;
