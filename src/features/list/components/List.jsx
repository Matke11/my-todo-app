import * as React from "react";
import styled from "styled-components";
import Task from "./Task";

const ListTaskWrapper = styled.div`
  margin: 24px;
  max-width: 350px;
  position: relative;
`;

const List = ({
  title,
  description,
  priority,
  id,
  status,
  dueDate,
  timeEstimated
}) => {
  return (
    <ListTaskWrapper key={id}>
      <p>{title}</p>
    </ListTaskWrapper>
  );
};

export default List;
