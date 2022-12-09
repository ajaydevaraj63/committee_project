import logo from './logo.svg';
import './App.css';

function App() {
  const data=[
    84,
    104,
    117,
    32,
    68,
    101,
    99,
    32,
    48,
    56,
    32,
    50,
    48,
    50,
    50,
    32,
    49,
    54,
    58,
    51,
    54,
    58,
    50,
    54,
    32,
    71,
    77,
    84,
    43,
    48,
    53,
    51,
    48,
    32,
    40,
    73,
    110,
    100,
    105,
    97,
    32,
    83,
    116,
    97,
    110,
    100,
    97,
    114,
    100,
    32,
    84,
    105,
    109,
    101,
    41,
    83,
    99,
    114,
    101,
    101,
    110,
    115,
    104,
    111,
    116,
    32,
    102,
    114,
    111,
    109,
    32,
    50,
    48,
    50,
    50,
    45,
    48,
    57,
    45,
    48,
    50,
    32,
    49,
    56,
    45,
    48,
    51,
    45,
    52,
    57,
    46,
    112,
    110,
    103
];
  const base64String=btoa(String.fromCharCode(...new Uint8Array(data)))
  console.log(base64String)
  return (
    <div className="App">
      <header className="App-header">
    {/* <img src={`data:image/png;base64,${base64String}`}/>
    {base64String} */}


<img src='http://localhost:4006/images/Fri Dec 09 2022 09:54:33 GMT+0530 (India Standard Time)Screenshot from 2022-09-05 18-26-32.png'/>
    {base64String} 

        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        
        </a>
      </header>
    </div>
  );
}

export default App;
