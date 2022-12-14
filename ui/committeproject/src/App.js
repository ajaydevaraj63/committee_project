
import './App.css';



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components\'/Login';

// import { ChakraProvider } from '@chakra-ui/react'





function App() {
  return (
<>
<BrowserRouter>
<Routes>

<Route path='/'  exact element={<Login/>}></Route>
</Routes>
  


</BrowserRouter>

</>
  );
}

export default App;
