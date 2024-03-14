//import { useData } from "../Checker";
import Task from "../components/Task";

export const Home = () => {
  //const { data } = useData();

  const TodayTaskCount = 7;
  return (
    <>
      <div className="m-5">
        <h1>Počet dnešních úkolu: {TodayTaskCount}</h1>
      </div>
      <Task
        eventName={"Name"}
        eventDesc={""}
        eventEnd={"2024-03-13T06:42:48.994Z"}
      />
      <Task
        eventName={"Name"}
        eventDesc={""}
        eventEnd={"2024-03-13T06:42:48.994Z"}
      />
      <Task
        eventName={"Name"}
        eventDesc={""}
        eventEnd={"2024-03-13T06:42:48.994Z"}
      />
      <Task
        eventName={"Name"}
        eventDesc={""}
        eventEnd={"2024-03-13T06:42:48.994Z"}
      />
      <Task
        eventName={"Name"}
        eventDesc={""}
        eventEnd={"2024-03-13T06:42:48.994Z"}
      />
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
