import "./App.css";
import Background from "./components/Background/Background.jsx";
import ToDo from "./components/ToDo/ToDo.jsx";

function App() {
  return (
    <div className="App">
      <Background>
        <ToDo />
      </Background>
    </div>
  );
}

export default App;
