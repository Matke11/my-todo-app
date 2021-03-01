import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, getAllActiveTasks } from "../store/selectors";
import { getAllTasksFromApi } from "../store/actions";
import styled from "styled-components";
import List from "../components/List";
import { Button } from "react-bootstrap";

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const ListContainer = () => {
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = React.useState(false);

  const listOfAllTasks = useSelector(getAllTasks);
  const listOfActiveTasks = useSelector(getAllActiveTasks);

  React.useEffect(() => {
    dispatch(getAllTasksFromApi());
  }, [dispatch]);

  return (
    <ListWrapper>
      <div>
        <Button variant="secondary" onClick={() => setViewAll(!viewAll)}>
          {viewAll ? "View only active" : "View All"}
        </Button>
      </div>
      {viewAll
        ? listOfAllTasks.map(item => (
            <List
              title={item.title}
              description={item.description}
              priority={item.priority}
              id={item.id}
              dueDate={item.dueDate}
              status={item.status}
              timeEstimated={item.timeEstimated}
              key={item.id}
            />
          ))
        : listOfActiveTasks.map(item => (
            <List
              title={item.title}
              description={item.description}
              priority={item.priority}
              id={item.id}
              dueDate={item.dueDate}
              status={item.status}
              timeEstimated={item.timeEstimated}
              key={item.id}
            />
          ))}
    </ListWrapper>
  );
};

export default ListContainer;
