import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {users.map((user, index) => (
        <UserCard
          key={index}
          username={user.username}
          userHref={user.username}
          email={user.email}
        />
      ))}
    </div>
  );
};

export default AllUsers;
