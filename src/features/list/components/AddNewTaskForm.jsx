import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FieldWrapper = styled.div`
  input,
  select {
    min-width: 100%;
    border: 1px solid blue;
    padding: 10px;
    border-bottom: 1px solid blue;
    padding: 10px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    outline: none;
  }
  span {
    color: red;
    font-size: 12px;
    font-weight: 600;
  }
  margin-bottom: 16px;
`;

const ModalContentWrapper = styled(Modal.Body)`
  padding: 32px;
`;

const ModalHeaderWrapper = styled(Modal.Header)`
  padding: 32px;
`;

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const AddNewTaskForm = ({ handleSubmitTask, modalState, setModalState }) => {
  return (
    <Modal show={modalState} onHide={() => setModalState(false)}>
      <ModalHeaderWrapper closeButton>
        <Modal.Title>Add new task</Modal.Title>
      </ModalHeaderWrapper>
      <ModalContentWrapper>
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
              <SubmitButton variant="primary" type="submit">
                Submit
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </ModalContentWrapper>
    </Modal>
  );
};

const AddNNewTaskFormValidation = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required"),
  timeEstimated: Yup.string()
    .required("Required")
    .test(
      "chars-number",
      "Please input a value like 1 day or 1 Day",
      timeEstimated =>
        timeEstimated
          ? timeEstimated.includes("week") ||
            timeEstimated.includes("month") ||
            timeEstimated.includes("day") ||
            timeEstimated.includes("year") ||
            timeEstimated.includes("Week") ||
            timeEstimated.includes("Month") ||
            timeEstimated.includes("Day") ||
            timeEstimated.includes("Year")
          : null
    )
});

export default AddNewTaskForm;
