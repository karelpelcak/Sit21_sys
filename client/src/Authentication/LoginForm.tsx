import { useState } from "react";
import { useCookies } from "react-cookie";

const LoginForm = () => {
  var currentTime = new Date();
  var expirationTime = new Date(currentTime.getTime() + 10 * 60 * 60 * 1000);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [, setCookie] = useCookies(["Auth_Token"]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const jwtToken = await response.text();
        setCookie("Auth_Token", jwtToken, { expires:  expirationTime,  path: "/" });

      } else {
        console.error("Bad response from server");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };


  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group d-flex flex-column mt-5">
          <div>
            <label htmlFor="Name">Uživatelské jméno</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="Password">Heslo</label>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Přihlásit se"
              className="form-control bg-info"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
