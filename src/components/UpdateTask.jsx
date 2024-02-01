import React, { useState, useContext } from "react";
import TaskModal from "./TaskModal";
import TaskForm from "./TaskForm";
import useRequest from "../hooks/useRequest";
import AuthContext from "../context/auth";
import TaskContext from "../context/task";

const UpdateTask = ({ task, showModal, setShowModal }) => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);
  const { callEndpoint } = useRequest();
  const [formData, setFormData] = useState({
    title: task.title,
    duedate: task.dueDate,
    description: task.description,
  });

  const onChangeHandler = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
        `${process.env.REACT_APP_API_URL}/tasks/${task?._id}`,
        "PATCH",
        JSON.stringify({
          title,
          description,
          dueDate,
        }),
        {
          Authorization: "Bearer " + authContext.accessToken,
          "Content-Type": "application/json",
        }
      );
      taskContext.getTasks();
      handleClose();
    } catch (error) {
      console.log("Update task error: ", error);
    }
  };

  return (
    <TaskModal
      showModal={showModal}
      handleClose={handleClose}
      modalTitle="Edit Task"
    >
      <TaskForm
        handleSubmit={handleSubmit}
        taskValue={formData}
        onChangeHandler={onChangeHandler}
        formType="edit"
      />
    </TaskModal>
  );
};

export default UpdateTask;
