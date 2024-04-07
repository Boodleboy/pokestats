import Main from './components/Main'
import NotFound from './components/NotFound'
import logo from './logo.svg';
import './App.css';

function App() {
  const path = window.location.pathname

  console.log(path)
  let Comp
  switch (path) {
    case "/":
      Comp = Main
      break
    default:
      Comp = NotFound
  }

  return (
    <div className="App">
      <header className="App-header">
        <Comp/>
      </header>
    </div>
  );
}

export default App;
