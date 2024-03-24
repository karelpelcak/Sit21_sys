import Card from "react-bootstrap/Card";

interface TaskProps {
  eventName: string;
  eventDesc: string;
  eventEnd: string;
}

const Task: React.FC<TaskProps> = ({ eventName, eventDesc, eventEnd }) => {
  const trimmedEventDesc =
    eventDesc.length > 600 ? eventDesc.substring(0, 600) + "..." : eventDesc;

  return (
    <>
      <Card className="shadow rounded m-2" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{eventName}</Card.Title>
          <Card.Text style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {trimmedEventDesc}
          </Card.Text>
          <Card.Text>{eventEnd}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Task;
