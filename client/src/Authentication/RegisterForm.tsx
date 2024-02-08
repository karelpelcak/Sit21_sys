import { useState } from "react";

interface RegisterFormProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [passwordIsValid, setPasswordIsValid] = useState(false);

  //
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Post to api to register user
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("test");
      if (response.ok) {
        setLogin(true)
      } else {
      }
    } catch (error) {
    }
  };

  const handlePasswordBlur = () => {
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const isLengthValid = formData.password.length > 7;

    setPasswordIsValid(hasUpperCase && hasNumber && isLengthValid);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group d-flex flex-column mt-5">
          <div>
            <label htmlFor="FirstName">Jméno</label>
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
            <label htmlFor="LastName">Příjmení</label>
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
            <label htmlFor="Email">E-mail</label>
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
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
                Velké písmena
              </span>
            )}
          </div>
          <div className="mt-3">
            <input
              id="subbtn"
              type="submit"
              value="Registrovat"
              className="form-control bg-info"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
