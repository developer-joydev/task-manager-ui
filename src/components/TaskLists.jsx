import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Layout from "./Layout";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";
import TaskItem from "./TaskItem";
import useRequest from "../hooks/useRequest";
import TaskContext from "../context/task";

const TaskLists = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { callEndpoint } = useRequest();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await callEndpoint(
        `${process.env.REACT_APP_API_URL}/tasks`
      );
      if (response?.data?.data) {
        setTasks(response?.data?.data);
      }
    } catch (error) {
      console.log("data fetch error", error);
    }
  }, [callEndpoint]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks: fetchTasks,
      }}
    >
      <Layout>
        <Box sx={{ bgcolor: "#E9E0F9", px: 2, height: "100%" }}>
          <MenuList>
            {tasks.map((task) => (
              <TaskItem
                key={task?._id}
                label={task?.title}
                description={task?.description}
                duedate={task?.dueDate}
                status={task?.completionStatus}
                id={task?._id}
              />
            ))}
          </MenuList>
          {tasks.length === 0 && (
            <Box sx={{ bgcolor: "#E9E0F9", px: 2, height: "100%" }}>
              <Typography>No task found</Typography>
            </Box>
          )}
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              bgcolor: "#AE84F4",
            }}
            onClick={() => setShowModal(true)}
          >
            <AddIcon />
          </Fab>
        </Box>
        <CreateTask showModal={showModal} setShowModal={setShowModal} />
      </Layout>
    </TaskContext.Provider>
  );
};

export default TaskLists;
