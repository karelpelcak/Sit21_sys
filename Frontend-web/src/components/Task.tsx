import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useData } from "../Checker";

interface TaskProps {
  eventName: string;
  eventDesc: string;
  eventStart: string;
  eventEnd: string;
  eventID: string;
  eventfinished: boolean;
  yourevent: boolean;
}

const Task: React.FC<TaskProps> = ({
  eventName,
  eventDesc,
  eventEnd,
  eventID,
  eventStart,
  eventfinished,
  yourevent,
}) => {
  const { url } = useData();
  const trimmedEventDesc =
    eventDesc.length > 600 ? eventDesc.substring(0, 600) + "..." : eventDesc;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Jste si jisti, že chcete tento úkol smazat?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(url + `${eventID}/delete`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting event:", error);
    }
  };

  const handleFinish = async () => {
    const confirmed = window.confirm(
      "Jste si jisti, že chcete označit tento úkol jako dokončený?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(url + `${eventID}/finish`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to mark task as finished");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error marking task as finished:", error);
    }
  };

  return (
    <>
      {eventfinished ? (
        <Card
          className="rounded mb-2 shadow border-success"
          style={{ width: "100%" }}
        >
          <Card.Body>
            <Card.Title>{eventName}</Card.Title>
            <Card.Text style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {trimmedEventDesc}
            </Card.Text>
            <Card.Text>
              {eventStart} - {eventEnd}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card className="rounded mb-2 shadow" style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{eventName}</Card.Title>
            <Card.Text style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {trimmedEventDesc}
            </Card.Text>
            <Card.Text>
              {eventStart} - {eventEnd}
            </Card.Text>

            {yourevent ? (
              <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
                <a href={"editevent/" + eventID}>Upravit</a>{" "}
                <Button variant="success" onClick={handleFinish}>
                  Finish
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Task;
