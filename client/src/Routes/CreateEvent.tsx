import { useState } from 'react';
import Select from 'react-select';

const CreateEvent = () => {
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

    const users = [
      { label: 'User 1', value: 1 },
      { label: 'User 2', value: 2 },
      { label: 'User 3', value: 3 },
    ];
  
    const handleUserSelect = (selectedOption: any) => {
        setSelectedUsers([selectedOption]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(selectedUsers); 
    };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Event Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input type="text" className="form-control" id="eventName" placeholder="Enter event name" />
            </div>
            <div className="form-group">
              <label htmlFor="eventDesc">Event Description</label>
              <input type="text" className="form-control" id="eventDesc" placeholder="Enter event description" />
            </div>
            <div className="form-group">
            <label htmlFor="userSearch">Search and Add Users</label>
            <Select
              id="userSearch"
              options={users}
              onChange={handleUserSelect}
              isMulti
              placeholder="Search users..."
            />
          </div>
            <div className="form-group">
              <label htmlFor="eventStart">Event Start</label>
              <input type="datetime-local" className="form-control" id="eventStart" />
            </div>
            <div className="form-group">
              <label htmlFor="eventEnd">Event End</label>
              <input type="datetime-local" className="form-control" id="eventEnd" />
            </div>
            <button type="submit" className="btn btn-primary my-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
