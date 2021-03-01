import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { getAllTasks, getAllActiveTasks } from "../store/selectors";
import { getAllTasksFromApi, addNewTask } from "../store/actions";
import styled from "styled-components";
import List from "../components/List";
import { Button, Modal } from "react-bootstrap";
import ListActions from "../components/ListActions";

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
      <Modal show={modalState} onHide={() => setModalState(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: "",
              description: "",
              priority: "low",
              dueDate: ""
            }}
            validationSchema={SubmitTask}
            onSubmit={handleSubmitTask}
          >
            {props => (
              <Form onSubmit={props.handleSubmit} autoComplete="off">
                <div className="field-wrapper">
                  <Field name="title" type="text" />
                  {props.errors.title && props.touched.title ? (
                    <span className="error-msg">{props.errors.title}</span>
                  ) : null}
                  <Field name="description" type="text" />
                  {props.errors.description && props.touched.description ? (
                    <span className="error-msg">
                      {props.errors.description}
                    </span>
                  ) : null}
                  <Field name="dueDate" type="date" />
                  {props.errors.dueDate && props.touched.dueDate ? (
                    <span className="error-msg">{props.errors.dueDate}</span>
                  ) : null}
                  <Field as="select" name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="highest">Highest</option>
                  </Field>
                  {props.errors.priority && props.touched.priority ? (
                    <span className="error-msg">{props.errors.priority}</span>
                  ) : null}
                </div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

const SubmitTask = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required")
});

export default ListContainer;
