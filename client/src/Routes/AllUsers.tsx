import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { Spinner } from "react-bootstrap";

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <Spinner />
  </div>
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {users.map((user, index) => (
          <div key={index} className="col-md-4 mb-4">
            <UserCard
              username={user.firstname + " " + user.lastname}
              userHref={user.username}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
