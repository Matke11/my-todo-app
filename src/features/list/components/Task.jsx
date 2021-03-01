import * as React from "react";
import styled from "styled-components";

const TaskWrapper = styled.div`
  text-align: left;
  height: ${props => (props.isExpanded ? "200px" : `100px`)};
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  padding: 12px;
  position: relative;
  transition: all ease-in-out 0.3s;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.16);
  }
  p {
    text-decoration: ${props => (props.isDone ? "line-through" : "none")};
    margin-top: 0;
    padding: 0;
  }
  span {
    text-decoration: ${props => (props.isDone ? "line-through" : "none")};
  }
`;

const TaskTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const getTaskPriorityBackground = priority => {
  if (priority === "highest") {
    return "red";
  } else if (priority === "low") {
    return "green";
  } else if (priority === "medium") {
    return "yellow";
  } else if (priority === "high") {
    return "orange";
  }
};

const PriorityIcon = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: ${props => getTaskPriorityBackground(props.priority)};
  position: absolute;
  right: 5px;
  top: 5px;
`;

const DueDate = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.2);
`;

const AdditionalInfo = styled.div`
  opacity: ${props => (props.isExpanded ? 1 : 0)};
  visibility: ${props => (props.isExpanded ? "visible" : "hidden")};
  transition: all ease-in-out 0.3s;
`;

const StatusAndTimeWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Task = ({
  priority,
  title,
  description,
  dueDate,
  id,
  status,
  timeEstimated
}) => {
  const [isTaskExpended, setTaskExpand] = React.useState(false);

  const isTaskStatusDone = status === "Done";

  return (
    <TaskWrapper
      key={id}
      isExpanded={isTaskExpended}
      onClick={() => setTaskExpand(!isTaskExpended)}
      isDone={isTaskStatusDone}
    >
      <PriorityIcon priority={priority} />
      <TaskTitle>{title}</TaskTitle>
      <DueDate>Due Date: {dueDate}</DueDate>
      <AdditionalInfo isExpanded={isTaskExpended}>
        <StatusAndTimeWrapper>
          <p>
            Status: <span>{status}</span>
          </p>
          <p>Time estimated: {timeEstimated}</p>
        </StatusAndTimeWrapper>
        <DescriptionText>{description}</DescriptionText>
      </AdditionalInfo>
    </TaskWrapper>
  );
};

export default Task;
