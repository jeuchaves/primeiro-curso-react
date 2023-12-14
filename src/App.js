import './App.css';

function App() {
  const name = 'Jeú Chaves';
  const newName = name.toUpperCase();
  function sum(a,b) {
    return a+b;
  }
  const url = "https://via.placeholder.com/150"
  return (
    <div className="App">
      <h1>Olá React!</h1>
      <p>Olá, {newName}</p>
      <p>Soma: {sum(1,2)}</p>
      <img src={url} alt="Placeholder" />
    </div>
  );
}

export default App;
