import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 ">
    <Header />
    <Outlet />
  </div>
  );
}

export default App;
