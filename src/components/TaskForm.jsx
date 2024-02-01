import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TaskForm = (props) => {
  const { handleSubmit, onChangeHandler, taskValue, formType } = props;
  return (
    <Box
      component="form"
      id="task-form"
      noValidate
      autoComplete="off"
      sx={{ mt: 5 }}
    >
      <TextField
        id="outlined-required"
        label="Task Title"
        variant="standard"
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        name="title"
        value={taskValue?.title}
        onChange={onChangeHandler}
      />
      <TextField
        id="outlined-required"
        label="Due Date"
        variant="standard"
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        name="duedate"
        value={taskValue?.duedate}
        onChange={onChangeHandler}
      />
      <TextField
        id="outlined-required"
        label="Task Description"
        variant="standard"
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        name="description"
        value={taskValue?.description}
        onChange={onChangeHandler}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {formType === "edit" ? "Update Task" : "Create Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
