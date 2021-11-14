import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react';
import  DashBoard from './components/DashBoard/DashBoard'

function App() {
  return (
    <div className="App">
      <Container>
        <DashBoard />
      </Container>
    </div>
  );
}

export default App;
