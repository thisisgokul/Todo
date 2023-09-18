import TaskManager from "./Components/TaskManager";
import axios from 'axios';
axios.defaults.baseURL = "https://tudoapi.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <TaskManager/>
    </div>
  );
}

export default App;
