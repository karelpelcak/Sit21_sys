import { useParams } from "react-router-dom";
import { useData } from "../Checker";
import Task from "../components/Task";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const LoggedUser = () => {
  const { data } = useData();
  if (!data) return null;
  return (
    <div>
      <InfoCard
        username={data.username}
        firstname={data.firstname}
        lastname={data.lastname}
        email={data.email}
      />
      <TodayTask />
    </div>
  );
};

interface UserData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}
const NotLoggedUser = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/user/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading || userData == null) {
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
    <div>
      <InfoCard
        username={userData.username}
        firstname={userData.firstname}
        lastname={userData.lastname}
        email={userData.email}
      />
    </div>
  );
};

interface InfoPanel {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}
const InfoCard: React.FC<InfoPanel> = ({
  username,
  firstname,
  lastname,
  email,
}) => {
  return (
    <div className="card border-secondary mb-3 mt-5">
      <div className="card-header bg-secondary text-white">
        <h5 className="card-title mb-0">
          {firstname} {lastname}
        </h5>
      </div>
      <div className="card-body text-dark">
        <h6 className="card-subtitle mb-2">Username: {username}</h6>
        <h6 className="card-subtitle mb-2">Email: {email}</h6>
      </div>
    </div>
  );
};

interface Event {
  eventID: number;
  eventName: string;
  eventDesc: string;
  eventEnd: string;
  eventStart: string;
}
const TodayTask = () => {
    const [todayTasks, setTodayTasks] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(["Auth_Token"]);
  
    useEffect(() => {
      const fetchTodayTasks = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/events/today/${cookies.Auth_Token}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch today's tasks");
          }
          const data = await response.json();
  
          const formattedData = data.map((task: any) => ({
            ...task,
            eventEnd: formatDate(task.eventEnd),
            eventStart: formatDate(task.eventStart),
          }));
  
          setTodayTasks(formattedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching today's tasks:", error);
          setLoading(false);
        }
      };
  
      fetchTodayTasks();
    }, [cookies.Auth_Token]);
  
    // Function to format date and time
    const formatDate = (dateTimeString: string) => {
      const date = new Date(dateTimeString);
      // Format the date and time as desired
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
  
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
      <>
        <div className="card border-secondary mb-3 mt-5">
          <div className="card-header bg-secondary text-white">
            <h5 className="card-title mb-0">Dnešní Úkoly</h5>
          </div>
        </div>
  
        {todayTasks.map((task) => (
          <Task
            key={task.eventID}
            eventName={task.eventName}
            eventDesc={task.eventDesc}
            eventStart={task.eventStart}
            eventEnd={task.eventEnd}
            eventID={task.eventID.toString()}
          />
        ))}
      </>
    );
  };
  

const UserPage = () => {
  const { data } = useData();
  let { username } = useParams();

  const isLoggedUser = () => {
    return username === data?.username;
  };

  return <div>{isLoggedUser() ? <LoggedUser /> : <NotLoggedUser />}</div>;
};

export default UserPage;
