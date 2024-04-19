import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import { useCookies } from "react-cookie";
import { Spinner } from "react-bootstrap";

interface Event {
  eventID: number;
  eventName: string;
  eventDesc: string;
  eventStart: string;
  eventEnd: string;
  eventFinished: boolean;
}

const Tasks: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFinished, setShowFinished] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  const [cookies] = useCookies(["Auth_Token"]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/events/" + cookies.Auth_Token
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data: Event[] = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = () => {
    setShowFinished(!showFinished);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateFilter(e.target.value);
  };

  const handleReset = () => {
    setStartDateFilter("");
    setEndDateFilter("");
    setShowFinished(false);
  };

  const filteredEvents = events.filter((event) => {
    const startDatePass =
      startDateFilter === "" ||
      new Date(event.eventStart) >= new Date(startDateFilter);
    const endDatePass =
      endDateFilter === "" ||
      new Date(event.eventEnd) <= new Date(endDateFilter + "T23:59:59");
    const showFinishedPass = showFinished || !event.eventFinished;
    return startDatePass && endDatePass && showFinishedPass;
  });

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
    <div>
      <div className="m-5">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={showFinished}
                onChange={handleCheckboxChange}
                id="showFinishedCheckbox"
              />
              <label
                className="form-check-label"
                htmlFor="showFinishedCheckbox"
              >
                Show Finished Events
              </label>
            </div>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="startDateInput">
              Filter by Start Date:
            </label>
            <input
              type="date"
              className="form-control mb-2"
              id="startDateInput"
              value={startDateFilter}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="endDateInput">
              Filter by End Date:
            </label>
            <input
              type="date"
              className="form-control mb-2"
              id="endDateInput"
              value={endDateFilter}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary mb-2" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div>
        {filteredEvents.map((event) => (
          <Task
            key={event.eventID}
            eventName={event.eventName}
            eventDesc={event.eventDesc}
            eventStart={event.eventStart}
            eventEnd={event.eventEnd}
            eventID={event.eventID.toString()}
            eventfinished={event.eventFinished}
            yourevent={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
