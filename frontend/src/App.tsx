import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import UserPage from "./pages/User";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { selectAppState } from "./features/appSlice";

function App() {
  const { loading, error, error_msg } = useSelector(selectAppState)
  useEffect(() => {
    if(loading) 
      toast.info("Загрузка...")
    else if(error)
      toast.error("Ошибка: " + error_msg)
    else {
       toast.success("Успешно!")
    }
  }, [loading])
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
    <ToastContainer 
      position="top-right"
      hideProgressBar={true}
      newestOnTop={true}
      autoClose={1500}
      closeOnClick
      toastStyle={{color: "white", backgroundColor:"salmon", fontWeight:"bold", fontSize:"20px" }}
      pauseOnFocusLoss={false}
    />
  </>
  );
}

export default App;