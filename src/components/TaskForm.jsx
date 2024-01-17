import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TaskForm = (props) => {
  const { handleSubmit, onChangeHandler, taskValue } = props;
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
        value={taskValue.title}
        onChange={onChangeHandler}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%", mb: 3 }}
          name="duedate"
          value={taskValue.duedate}
        />
      </LocalizationProvider>
      <TextField
        id="outlined-required"
        label="Task Description"
        variant="standard"
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        name="description"
        value={taskValue.description}
        onChange={onChangeHandler}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Create Task
      </Button>
    </Box>
  );
};

export default TaskForm;
