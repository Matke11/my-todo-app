import * as React from "react";
import { Button, Dropdown } from "react-bootstrap";
import styled from "styled-components";

const ListActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  button:nth-child(2) {
    margin: 0 12px;
  }
`;

const ListActions = ({
  setViewAll,
  viewAll,
  addNewModalSetState,
  handleSort,
  sortValue
}) => {
  return (
    <ListActionsWrapper>
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
          <Dropdown.Item onClick={() => handleSort("Priority")}>
            Priority
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort("Due Date")}>
            Due Date
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ListActionsWrapper>
  );
};

export default ListActions;
