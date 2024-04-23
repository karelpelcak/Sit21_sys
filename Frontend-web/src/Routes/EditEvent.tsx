import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useData } from "../Checker";

interface EventEditEventModel {
  eventName: string;
  eventDesc: string;
  eventStart: string;
  eventEnd: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditEventPage: React.FC = () => {
  const { url } = useData();
  const navigate = useNavigate();
  const { eventid } = useParams<{ eventid: string }>();
  const [eventData, setEventData] = useState<EventEditEventModel>({
    eventName: "",
    eventDesc: "",
    eventStart: "",
    eventEnd: "",
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(url + `event/${eventid}`);
        if (response.ok) {
          const eventDataFromApi = await response.json();
          setEventData({
            eventName: eventDataFromApi.eventName,
            eventDesc: eventDataFromApi.eventDesc,
            eventStart: formatDate(eventDataFromApi.eventStart),
            eventEnd: formatDate(eventDataFromApi.eventEnd),
          });
        } else {
          throw new Error("Failed to fetch event data");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        url + `editevent/${eventid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );
      if (response.ok) {
        alert("Event úspěšně upraven");
        navigate("/");
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="container">
      <h1>Upravit úkol</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="eventName">
          <Form.Label>Název</Form.Label>
          <Form.Control
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="eventDesc">
          <Form.Label>Popis</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="eventDesc"
            value={eventData.eventDesc}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="eventStart">
          <Form.Label>Začátek</Form.Label>
          <Form.Control
            type="datetime-local"
            name="eventStart"
            value={eventData.eventStart}
            onChange={handleInputChange}
            required
            className="w-auto"
          />
        </Form.Group>
        <Form.Group controlId="eventEnd">
          <Form.Label>Konec</Form.Label>
          <Form.Control
            type="datetime-local"
            name="eventEnd"
            value={eventData.eventEnd}
            onChange={handleInputChange}
            required
            className="w-auto"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Uložit změny
        </Button>
      </Form>
    </div>
  );
};

export default EditEventPage;
