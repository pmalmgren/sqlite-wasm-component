import './App.css';

import { getPerson } from './wasm/example';

function App() {
  const person = getPerson();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello from WASM!</h1>
        <p>getPerson() == {getPerson()}</p>
      </header>
    </div>
  );
}

export default App;
