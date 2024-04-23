import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { Spinner } from "react-bootstrap";
import { useData } from "../Checker";

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

const AllUsers = () => {
  const { url } = useData();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + "users");
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

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
    <div className="container mt-5">
      <input
        type="text"
        placeholder="Vyhledat uživatele"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <div className="row">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-md-4 mb-4">
            <UserCard
              username={`${user.firstname} ${user.lastname}`}
              userHref={user.username}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
