
import './App.css';



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components\'/Login';
import User from './Components\'/User';
import Admin from './Components\'/Admin';
import Committee from './Components\'/Committee';

// import { ChakraProvider } from '@chakra-ui/react'





function App() {
  return (
<>
<BrowserRouter>
<Routes>

<Route path='/'  exact element={<Login/>}></Route>
<Route path='/User'  exact element={<User/>}></Route>
<Route path='/Admin'  exact element={<Admin/>}></Route>
<Route path='/Committee'  exact element={<Committee/>}></Route>
</Routes>
  


</BrowserRouter>

</>
  );
}

export default App;
