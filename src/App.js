
import './App.css';
import NewsApp from './components/newsApp';
import logo from "./logo.jpg"


function App() {
  return (
    <div className="App">
      <img src={logo} width="auto" height="100px"/>
   
     <NewsApp/>
    </div>
  );
}

export default App;
