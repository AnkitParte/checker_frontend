import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Clients from './components/Clients';
import Tasks from './components/Task';
import Projects from './components/Projects';


function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/clients" element={ <Clients/>}/>
        <Route path="/tasks" element={ <Tasks/>}/>
        <Route path='/projects' element={ <Projects/>}/>
      </Routes>
    </div>
  );
}

export default App;
