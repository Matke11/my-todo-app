import * as React from "react";
import { Button, Dropdown } from "react-bootstrap";

const ListActions = ({
  setViewAll,
  viewAll,
  addNewModalSetState,
  setSortValue,
  sortValue
}) => {
  return (
    <div>
      <Button variant="secondary" onClick={() => setViewAll(!viewAll)}>
        {viewAll ? "View only active" : "View All"}
      </Button>
      <Button variant="primary" onClick={() => addNewModalSetState(true)}>
        Add new task
      </Button>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          {!!sortValue ? sortValue : "Sort by"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortValue("priority")}>
            Priority
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortValue("dueDate")}>
            Due Date
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ListActions;
