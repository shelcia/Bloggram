import React from "react";
import { Box, Modal } from "@mui/material";
import { customModalContentStyle, customModalStyle } from "./CustomStylings";
import { ShareSocial } from "react-share-social";

const SocialModal = ({ open, setOpen, url, name }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={customModalStyle}>
        <ShareSocial
          title={`Hello folks I have published ${name}`}
          url={url}
          socialTypes={[
            "facebook",
            "twitter",
            "reddit",
            "linkedin",
            "whatsapp",
          ]}
          style={customModalContentStyle}
        />
      </Box>
    </Modal>
  );
};

export default SocialModal;
