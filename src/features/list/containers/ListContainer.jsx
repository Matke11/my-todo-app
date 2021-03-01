import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../store/selectors";
import { getAllTasksFromApi } from "../store/actions";
import styled from "styled-components";

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
        <p>{item.title}</p>
      ))}
    </ListWrapper>
  );
};

export default ListContainer;
