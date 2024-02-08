import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Calendar from "./Routes/Calendar";
import { Home } from "./Routes/Home";
import Error from "./Routes/Error";
import UserPage from "./Routes/UserPage";

const App = () => (
  <>
    <BrowserRouter>
      <main>
        <div>
          <Layout />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="*" element={<Error />} />
              <Route path="/user/:username" element={<UserPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  </>
);

export default App;
