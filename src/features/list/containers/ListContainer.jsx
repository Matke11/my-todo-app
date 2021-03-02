import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, getAllActiveTasks } from "../store/selectors";
import {
  getAllTasksFromApi,
  addNewTask,
  sortListOfTasksAction
} from "../store/actions";
import styled from "styled-components";
import List from "../components/List";
import ListActions from "../components/ListActions";
import AddNewTaskForm from "../components/AddNewTaskForm";

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 600px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 24px;
`;

const ListContainer = () => {
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);
  const [sortValue, setSortValue] = React.useState(null);

  const handleSort = sortType => {
    setSortValue(sortType);
    dispatch(sortListOfTasksAction(sortType));
  };

  const listOfAllTasks = useSelector(getAllTasks);
  const listOfActiveTasks = useSelector(getAllActiveTasks);

  React.useEffect(() => {
    dispatch(getAllTasksFromApi());
  }, [dispatch]);

  const handleSubmitTask = response => {
    const biggestId = Math.max.apply(
      null,
      listOfAllTasks.map(item => item.id)
    );
    const data = {
      title: response.title,
      description: response.description,
      dueDate: response.dueDate,
      priority: response.priority,
      timeEstimated: response.timeEstimated,
      status: "active",
      id: biggestId + 1
    };
    dispatch(addNewTask(data));
    setModalState(false);
  };

  return (
    <React.Fragment>
      <ListWrapper>
        <Title>MY-TODO-LIST</Title>
        <div>
          <ListActions
            setViewAll={setViewAll}
            addNewModalSetState={setModalState}
            viewAll={viewAll}
            handleSort={handleSort}
            sortValue={sortValue}
          />
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
        </div>
      </ListWrapper>
      <AddNewTaskForm
        handleSubmitTask={handleSubmitTask}
        modalState={modalState}
        setModalState={setModalState}
      />
    </React.Fragment>
  );
};

export default ListContainer;
