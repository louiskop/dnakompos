import "./App.css";
import { Route, Routes } from "react-router-dom";

import UserRoutes from "./components/UserRoutes";
import AdminPage from "./components/pages/AdminPage";
import HomePage from "./components/pages/HomePage";
import ProductPage from "./components/pages/ProductPage";
import InfoPage from "./components/pages/InfoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/admin" element={<AdminPage />} />
        <Route path="/" element={<UserRoutes />}>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
