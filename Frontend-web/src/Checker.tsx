import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import App from "./App";
import Authentication from "./Authentication";
import { Spinner } from "react-bootstrap";
import { BrowserRouter as Router } from 'react-router-dom';
import json_url from './secret/jsons/secret_values.json'

interface UserData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

interface DataContextValue {
  data: UserData | null;
  url: string | null
}

const DataContext = createContext<DataContextValue>({
  data: null,
  url: null
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
            json_url.backend_url + "hash/" + cookies.Auth_Token
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
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ data: data, url: json_url.backend_url }}>
      {cookies.Auth_Token ? (
        <App />
      ) : (
        <Router>
          <Authentication />
        </Router>
      )}
    </DataContext.Provider>
  );
};

export default Checker;
