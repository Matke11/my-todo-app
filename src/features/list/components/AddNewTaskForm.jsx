import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FieldWrapper = styled.div`
  input,
  select {
    min-width: 100%;
    border-radius: 5px;
    border: 1px solid blue;
    padding: 10px;
  }
  span {
    color: red;
    font-size: 12px;
    font-weight: 600;
  }
  margin-bottom: 16px;
`;

const AddNewTaskForm = ({ handleSubmitTask, modalState, setModalState }) => {
  return (
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
            dueDate: "",
            timeEstimated: ""
          }}
          validationSchema={AddNNewTaskFormValidation}
          onSubmit={handleSubmitTask}
        >
          {props => (
            <Form onSubmit={props.handleSubmit} autoComplete="off">
              <div>
                <FieldWrapper>
                  <Field name="title" type="text" placeholder="Title" />
                  {props.errors.title && props.touched.title ? (
                    <span className="error-msg">{props.errors.title}</span>
                  ) : null}
                </FieldWrapper>
                <FieldWrapper>
                  <Field
                    name="description"
                    type="textarea"
                    placeholder="Description"
                  />
                  {props.errors.description && props.touched.description ? (
                    <span className="error-msg">
                      {props.errors.description}
                    </span>
                  ) : null}
                </FieldWrapper>
                <FieldWrapper>
                  <Field name="dueDate" type="date" />
                  {props.errors.dueDate && props.touched.dueDate ? (
                    <span className="error-msg">{props.errors.dueDate}</span>
                  ) : null}
                </FieldWrapper>
                <FieldWrapper>
                  <Field
                    name="timeEstimated"
                    type="text"
                    placeholder="Time Estimate"
                  />
                  {props.errors.timeEstimated && props.touched.timeEstimated ? (
                    <span className="error-msg">
                      {props.errors.timeEstimated}
                    </span>
                  ) : null}
                </FieldWrapper>
                <FieldWrapper>
                  <Field as="select" name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="highest">Highest</option>
                  </Field>
                  {props.errors.priority && props.touched.priority ? (
                    <span className="error-msg">{props.errors.priority}</span>
                  ) : null}
                </FieldWrapper>
              </div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const AddNNewTaskFormValidation = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required"),
  timeEstimated: Yup.string().required("Required")
});

export default AddNewTaskForm;
