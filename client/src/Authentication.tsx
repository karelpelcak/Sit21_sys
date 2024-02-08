import { useState } from "react";
import LoginForm from "./Authentication/LoginForm";
import RegisterForm from "./Authentication/RegisterForm";

function Authentication() {
  const [login, setLogin] = useState(true);
  return (
    <main>
      <div>
        <div className="d-flex justify-content-center mt-5">
          <button
            className={login ? "border-0 rounded p-2 bg-info" : "border-0 rounded p-2 bg-transparent"}
            onClick={() => setLogin(true)}
          >
            Login
          </button>
          <button
            className={login ? "border-0 rounded p-2 bg-transparent" : "border-0 rounded p-2 bg-info"}
            onClick={() => setLogin(false)}
          >
            Register
          </button>
        </div>
        <div className="Content">
          {login ? <LoginForm /> : <RegisterForm setLogin={setLogin} />}
        </div>
      </div>
    </main>
  );
}

export default Authentication;
