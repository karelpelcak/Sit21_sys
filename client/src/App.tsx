import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./Routes/Home";
import Error from "./Routes/Error";
import UserPage from "./Routes/UserPage";
import Tasks from "./Routes/Tasks";
import AllUsers from "./Routes/AllUsers";
import CreateEvent from "./Routes/CreateEvent";

const App = () => (
  <>
    <BrowserRouter>
      <main>
        <div>
          <Layout />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="*" element={<Error />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/createevent" element={<CreateEvent />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  </>
);

export default App;
