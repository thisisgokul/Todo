import TaskManager from "./Components/TaskManager";
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <TaskManager/>
    </div>
  );
}

export default App;
