import React, { useState, useContext } from "react";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskModal";
import TaskContext from "../context/task";
import useRequest from "../hooks/useRequest";

const CreateTask = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    duedate: "",
    description: "",
  });

  const taskContext = useContext(TaskContext);
  const { callEndpoint } = useRequest();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(document.getElementById("task-form"));
    const title = data.get("title");
    const dueDate = data.get("duedate");
    const description = data.get("description");

    try {
      await callEndpoint(
        `${process.env.REACT_APP_API_URL}/tasks`,
        "POST",
        JSON.stringify({
          title,
          description,
          dueDate,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      taskContext.getTasks();
      handleClose();
    } catch (error) {
      console.log("Create task error: ", error);
    }
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <TaskModal
      showModal={showModal}
      handleClose={handleClose}
      modalTitle="Create new Task"
    >
      <TaskForm
        handleSubmit={handleSubmit}
        onChangeHandler={onChangeHandler}
        taskValue={formData}
      />
    </TaskModal>
  );
};

export default CreateTask;
