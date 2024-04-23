import { useParams } from "react-router-dom";
import { useData } from "../Checker";
import Task from "../components/Task";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const LoggedUser = () => {
  const { data } = useData();
  console.log(data);
  if (!data) return null;
  const [cookies] = useCookies(["Auth_Token"]);
  return (
    <div>
      <InfoCard
        username={data.username}
        firstname={data.firstname}
        lastname={data.lastname}
        email={data.email}
      />
      <TodayTask AuthToken={cookies.Auth_Token} Logged={true}/>
    </div>
  );
};

interface UserData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  hashedID: string;
}
const NotLoggedUser = () => {
  const { url } = useData();
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url + `user/${username}`);
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
      <TodayTask AuthToken={userData.hashedID} Logged={false}/>
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
interface propsTasks{
  AuthToken: string;
  Logged: boolean;
}
const TodayTask: React.FC<propsTasks> = ({ AuthToken, Logged }) => {
  const { url } = useData();
    const [todayTasks, setTodayTasks] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTodayTasks = async () => {
        try {
          const response = await fetch(
            url + `events/today/${AuthToken}`
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
    }, [AuthToken]);
  
    const formatDate = (dateTimeString: string) => {
      const date = new Date(dateTimeString);
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
            eventfinished={false}
            yourevent={Logged}
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
