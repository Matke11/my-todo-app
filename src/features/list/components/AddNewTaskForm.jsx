import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const AddNewTaskForm = ({handleSubmitTask, modalState, setModalState}) => {
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
            dueDate: ""
          }}
          validationSchema={AddNNewTaskFormValidation}
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
                  <span className="error-msg">{props.errors.description}</span>
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
  );
};

const AddNNewTaskFormValidation = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required")
});

export default AddNewTaskForm;
