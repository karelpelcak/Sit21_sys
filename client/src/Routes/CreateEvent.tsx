import { useEffect, useState } from "react";
import Select from "react-select";

interface Event {
  eventname: string;
  eventdesc: string;
  userids: number[];
  eventstart: Date;
  eventend: Date;
}
interface User {
  firstname: string;
  lastname: string;
  userId: number;
}

const CreateEvent = () => {
  const [formData, setFormData] = useState<Event>({
    eventname: "",
    eventdesc: "",
    userids: [],
    eventstart: new Date(),
    eventend: new Date(),
  });
  const [userList, setUserList] = useState();

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
            value: user.userId, // Check if user.id is defined here
            label: `${user.firstname} ${user.lastname}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.eventname ||
      !formData.eventdesc ||
      !formData.userids.length ||
      !formData.eventstart ||
      !formData.eventend
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.eventstart >= formData.eventend) {
      alert("Event start date should be before event end date.");
      return;
    }

    const { userids, ...formDataWithoutUserIds } = formData;

    try {
      const queryParams = formData.userids.map((id) => `ids=${id}`).join("&");
      const url = `http://localhost:5001/createevent?${queryParams}`;
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithoutUserIds),
      });

      if (!response.ok) {
        throw new Error("Failed to create event.");
      }

      alert("Event created successfully!");
      setFormData({
        eventname: "",
        eventdesc: "",
        userids: [],
        eventstart: new Date(),
        eventend: new Date(),
      });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    const userIds = selectedOptions.map((option: any) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      userids: userIds,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Nový úkol</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Název úkolu</label>
              <input
                type="text"
                className="form-control"
                id="eventname"
                placeholder="Název úkolu"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDesc">Popis úkolu</label>
              <input
                type="text"
                className="form-control"
                id="eventdesc"
                placeholder="Popis úkolu"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userSearch">Hledat a Přidat Uživatele</label>
              <Select
                id="userSearch"
                isMulti
                options={userList}
                placeholder="Hledej uživatele..."
                onChange={handleSelectChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventStart">Od</label>
              <input
                type="datetime-local"
                className="form-control"
                id="eventstart"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventEnd">Do</label>
              <input
                type="datetime-local"
                className="form-control"
                id="eventend"
                onChange={handleInputChange}
              />
            </div>
            <input
              type="submit"
              value="Vytvořit"
              className="btn btn-primary my-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
