import './App.css';
import Frase from './components/Frase';
import SayMyName from './components/SayMyName'
import Pessoa from './components/Pessoa'
import List from './components/List'

function App() {
  const nome = "João";

  return (
    <div className="App">
      <Frase />
      <Frase />
      <SayMyName nome="Matheus" />
      <SayMyName nome={nome} />
      <SayMyName nome="Maria" />
      <Pessoa 
        foto="https://via.placeholder.com/150"
        nome="Jeú Chaves"
        idade="23"
        peso="95.5"
        altura="1.75"
        genero="Masculino"
      />
      <List />
    </div>
  );
}

export default App;
