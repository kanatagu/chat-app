import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  return (
    <>
      <div>Hello World!</div>
    </>
  );
}

export default App;
