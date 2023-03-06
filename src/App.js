import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Player from "./pages/Player";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import SignIn from "./pages/Signin";


function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/'>
            <Route index element = {<Home/>}/>
            <Route path = 'player/:id' element = {<Player/>}/>
          </Route>
            <Route path = '/signin' element = {<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
