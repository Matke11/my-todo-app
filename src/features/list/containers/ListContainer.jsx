import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllTasks, getAllActiveTasks } from "../store/selectors";
import { getAllTasksFromApi, addNewTask } from "../store/actions";
import styled from "styled-components";
import List from "../components/List";
import ListActions from "../components/ListActions";
import AddNewTaskForm from "../components/AddNewTaskForm";

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const ListContainer = () => {
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);

  const listOfAllTasks = useSelector(getAllTasks);
  const listOfActiveTasks = useSelector(getAllActiveTasks);

  React.useEffect(() => {
    dispatch(getAllTasksFromApi());
  }, [dispatch]);

  const handleSubmitTask = response => {
    const estimated = moment().to(response.dueDate);
    const biggestId = Math.max.apply(
      null,
      listOfAllTasks.map(item => item.id)
    );
    const data = {
      title: response.title,
      description: response.description,
      dueDate: response.dueDate,
      priority: response.priority,
      timeEstimated: estimated,
      status: "active",
      id: biggestId + 1
    };
    dispatch(addNewTask(data));
    setModalState(false);
  };

  return (
    <React.Fragment>
      <ListWrapper>
        <ListActions
          setViewAll={setViewAll}
          addNewModalSetState={setModalState}
          viewAll={viewAll}
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
