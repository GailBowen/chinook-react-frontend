import './App.css';

import AlbumsContainer from './AlbumsContainer.js';

function App() {
  return (
    <div className="App">
      <span>Hi there</span>
      <ul>
        <li><a href="/albums">Albums List</a></li>
        <li><a href="/artists">Artists List</a></li>
        <li><a href="/customers">Customers List</a></li>
        <li><a href="/employees">Employees List</a></li>
      </ul>
    </div>
  );
}

export default App;
