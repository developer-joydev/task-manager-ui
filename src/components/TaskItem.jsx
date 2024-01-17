import React, { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import useRequest from "../hooks/useRequest";
import TaskContext from "../context/task";

const TaskItem = ({ id, label, status, duedate }) => {
  const { callEndpoint } = useRequest();
  const taskContext = useContext(TaskContext);

  const handleDelete = async (id) => {
    try {
      const response = await callEndpoint(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      if (response) {
        taskContext.getTasks();
      }
    } catch (error) {
      console.log("Error deleting task: ", error);
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      const response = await callEndpoint(
        `${process.env.REACT_APP_API_URL}/tasks/${id}/status`,
        "PATCH"
      );

      if (response?.data?.task) {
        taskContext.getTasks();
      }
    } catch (error) {
      console.log("Error upating status: ", error);
    }
  };

  return (
    <MenuItem
      sx={{
        mb: 1,
        bgcolor: "#fff",
        borderRadius: 1.5,
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={status ? true : false}
                onChange={() => handleStatusUpdate(id)}
              />
            }
            label={label}
            sx={{ textDecoration: status ? "line-through" : "none" }}
          />
        </FormGroup>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ModeEditIcon />
          <DeleteIcon onClick={() => handleDelete(id)} />
        </FormGroup>
      </Box>
    </MenuItem>
  );
};

export default TaskItem;
