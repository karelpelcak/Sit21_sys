import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import App from "./App";
import Authentication from "./Authentication";
import { Spinner } from "react-bootstrap";

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
            console.error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.Auth_Token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <DataContext.Provider value={{ data }}>
      {cookies.Auth_Token ? <App /> : <Authentication />}
    </DataContext.Provider>
  );
};

export default Checker;
