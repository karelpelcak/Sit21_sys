import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useCookies } from "react-cookie";

const LoginForm = () => {
  var currentTime = new Date();
  var expirationTime = new Date(currentTime.getTime() + 10 * 60 * 60 * 1000);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [, setCookie] = useCookies(["Auth_Token"]);
  const [responseMessage, setResponseMessage] = useState("");
  const [responsseState, setResponsseState] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
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
        setResponseMessage("Úspěšně přihlášen");
        setResponsseState(true);
        setTimeout(async () => {
          const authToken = await response.text();
          setCookie("Auth_Token", authToken, {
            expires: expirationTime,
            path: "/",
          });
          setLoading(false);
        }, 500);
      } else {
        console.error("Bad response from server");
        setResponseMessage("Špatný uživatelské jméno nebo heslo");
        setLoading(false);
      }
    } catch (error) {
      console.error("Network error", error);
      setResponseMessage("Network error");
      setLoading(false);
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
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner />
              </div>
            ) : (
              <input
                type="submit"
                value="Přihlásit se"
                className="form-control bg-info"
              />
            )}
          </div>
          {responsseState ? (
            <span className="text-success">{responseMessage}</span>
          ) : (
            <span className="text-danger">{responseMessage}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
