import { useEffect, useState } from "react";
import Select from "react-select";

interface User {
  firstname: string;
  lastname: string;
  id: number;
}

interface SelectedOption {
  value: string;
  label: string;
}

const CreateEvent = () => {
  const [selectedUsers, setSelectedUsers] = useState<SelectedOption[]>([]);
  const [userList, setUserList] = useState<SelectedOption[]>([]);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDesc: "",
    eventStart: "",
    eventEnd: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/usersids");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setUserList(
          jsonData.map((user: User) => ({
            value: user.id.toString(),
            label: `${user.firstname} ${user.lastname}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUserSelect = (selectedOptions: SelectedOption[]) => {
    setSelectedUsers(selectedOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedUserIds = selectedUsers.map((user) => parseInt(user.value));

    try {
      const response = await fetch("http://localhost:5001/createevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedUserIds: selectedUserIds,
        }),
      });

      if (response.ok) {
        console.log("Event created successfully");
      } else {
        console.error("Bad response from server");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Event Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                placeholder="Enter event name"
                onChange={(e) =>
                  setFormData({ ...formData, eventName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDesc">Event Description</label>
              <input
                type="text"
                className="form-control"
                id="eventDesc"
                placeholder="Enter event description"
                onChange={(e) =>
                  setFormData({ ...formData, eventDesc: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="userSearch">Search and Add Users</label>
              <Select
                id="userSearch"
                options={userList}
                isMulti
                placeholder="Search users..."
                onChange={(selectedOptions: SelectedOption) => handleUserSelect(selectedOptions)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventStart">Event Start</label>
              <input
                type="datetime-local"
                className="form-control"
                id="eventStart"
                onChange={(e) =>
                  setFormData({ ...formData, eventStart: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventEnd">Event End</label>
              <input
                type="datetime-local"
                className="form-control"
                id="eventEnd"
                onChange={(e) =>
                  setFormData({ ...formData, eventEnd: e.target.value })
                }
              />
            </div>
            <input
              type="submit"
              value="Create"
              className="btn btn-primary my-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
