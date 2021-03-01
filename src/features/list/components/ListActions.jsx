import * as React from "react";
import { Button } from "react-bootstrap";

const ListActions = ({ setViewAll, viewAll, addNewModalSetState }) => {
  return (
    <div>
      <Button variant="secondary" onClick={() => setViewAll(!viewAll)}>
        {viewAll ? "View only active" : "View All"}
      </Button>
      <Button variant="primary" onClick={() => addNewModalSetState(true)}>
        Add new task
      </Button>
    </div>
  );
};

export default ListActions;
