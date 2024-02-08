import { useCookies } from "react-cookie";
import App from "./App";
import Authentication from "./Authentication";

const Checker = () => {
    const CheckLogin = () => {
        const [cookies] = useCookies(["Auth_Token"]);
    
        try {
          if (cookies.Auth_Token) {
            return true;
          } else {
            return false;
          }
        } catch {
          return false;
        }
      };
    return <div>{CheckLogin() ? <App /> : <Authentication />}</div>;
}

export default Checker