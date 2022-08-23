import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

// Import CSS
import "./index.css";

const App = () => {


    // GET CREDENTIALS FROM LOCALSTORAGE
  const getEmail = localStorage.getItem('emailData')
  const getPassword = localStorage.getItem('passwordData')

  

  return (
    <div className="App">
      {getEmail && getPassword ? (
        <Dashboard />
      ) : (
        <Login/>
      )}
    </div>
  );
}

export default App;
