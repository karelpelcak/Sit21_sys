import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import App from "./App";
import Authentication from "./Authentication";
import Spinner from "./components/Spinner";

interface UserData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

interface DataContextValue {
  data: UserData | null;
}

const DataContext = createContext<DataContextValue>({
  data: null,
});

export const useData = () => useContext(DataContext);

const Checker = () => {
  const [cookies] = useCookies(["Auth_Token"]);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cookies.Auth_Token) {
          const response = await fetch(
            "http://localhost:5001/hash/" + cookies.Auth_Token
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
          setLoading(false);
          console.log(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.Auth_Token]);

  const CheckLogin = () => {
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

  if (loading) {
    return (
      <Spinner/>
    );
  }

  return (
    <DataContext.Provider value={{ data }}>
      <div>{CheckLogin() ? <App /> : <Authentication />}</div>
    </DataContext.Provider>
  );
};

export default Checker;
