import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

interface RegisterFormProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responsseState, setResponsseState] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.repassword) {
      setResponseMessage("Hesla se neshodují");
      setResponsseState(false);
      return;
    }

    if (!passwordIsValid) {
      setResponseMessage(
        "Heslo musí obsahovat číslice a velká písmena a mít minimální délku 8 znaků"
      );
      setResponsseState(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setResponseMessage("Úspěšně registrace");
        setResponsseState(true);
        setTimeout(() => {
          setLoading(false);
          setLogin(true);
        }, 500);
      } else {
        setResponseMessage("Chyba při registraci");
        setResponsseState(false);
        setLoading(false);
      }
    } catch (error) {
      setResponseMessage("Chyba serveru");
      setResponsseState(false);
      setLoading(false);
    }
  };

  const handlePasswordBlur = () => {
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const isLengthValid = formData.password.length > 7;

    setPasswordIsValid(hasUpperCase && hasNumber && isLengthValid);
  };

  useEffect(() => {
    setPasswordsMatch(formData.password === formData.repassword);
  }, [formData.password, formData.repassword]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group d-flex flex-column mt-5">
          <div>
            <label htmlFor="firstName">Jméno</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Příjmení</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Heslo</label>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handlePasswordBlur}
            />
            <label htmlFor="repassword">Heslo znovu</label>
            <br />
            <input
              className="form-control"
              type="password"
              name="repassword"
              value={formData.repassword}
              onChange={handleInputChange}
              onBlur={handlePasswordBlur}
            />
            {passwordIsValid && (
              <span style={{ color: "green" }}>Heslo je vhodné</span>
            )}
            {!passwordIsValid && (
              <span style={{ color: "red" }}>
                Heslo musí obsahovat:
                <br />
                Číslice
                <br />
                Velká písmena
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-3">
            {!passwordsMatch && (
              <span style={{ color: "red" }}>Hesla se neshodují</span>
            )}
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner />
              </div>
            ) : (
              <input
                type="submit"
                value="Registrovat se"
                className="form-control bg-info"
                disabled={!passwordsMatch || !passwordIsValid} 
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

export default RegisterForm;
