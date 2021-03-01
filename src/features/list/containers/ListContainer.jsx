import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../store/selectors";
import { getAllTasksFromApi } from "../store/actions";
import styled from "styled-components";
import List from "../components/List";

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const ListContainer = () => {
  const dispatch = useDispatch();

  const listOfAllTasks = useSelector(getAllTasks);

  React.useEffect(() => {
    dispatch(getAllTasksFromApi());
  }, [dispatch]);

  return (
    <ListWrapper>
      {listOfAllTasks.map(item => (
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
