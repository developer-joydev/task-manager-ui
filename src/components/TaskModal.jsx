import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskModal = (props) => {
  const { showModal, modalTitle, handleClose, children } = props;
  return (
    <div>
      <Modal open={showModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default TaskModal;
