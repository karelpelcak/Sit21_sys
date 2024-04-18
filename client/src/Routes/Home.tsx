import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Task from "../components/Task";
import { Spinner } from "react-bootstrap";

interface Event {
  eventID: number;
  eventName: string;
  eventDesc: string;
  eventEnd: string;
}

export const Home = () => {
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
        setTodayTasks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching today's tasks:", error);
        setLoading(false);
      }
    };

    fetchTodayTasks();
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
    <>
      <div className="m-5">
        <h1>Počet dnešních úkolů: {todayTasks.length}</h1>
      </div>
      {todayTasks.map((task) => (
        <Task
          key={task.eventID}
          eventName={task.eventName}
          eventDesc={task.eventDesc}
          eventEnd={task.eventEnd}
        />
      ))}
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-2 text-center">
            <a href="/tasks" className="btn btn-primary">
              Všechny Úkoly
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
