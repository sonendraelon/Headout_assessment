// SharePopup.jsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
} from "@mui/material";
import { Close, ContentCopy, WhatsApp } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SharePopup = ({ username, onClose }) => {
  const shareLink = `${window.location.origin}/challenge?user=${username}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=Join%20me%20in%20the%20Globetrotter%20Challenge!%20Check%20out%20my%20score%20and%20play:%20${encodeURIComponent(
    shareLink
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
          color: "white",
          padding: 4,
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <Close />
        </IconButton>

        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: "'Pacifico', cursive" }}
        >
          Challenge Friends
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Share your explorer link:
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleCopy}
              startIcon={<ContentCopy />}
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                py: 1.5,
                px: 4,
              }}
            >
              Copy Link
            </Button>
            <Button
              variant="contained"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsApp />}
              sx={{
                background: "linear-gradient(45deg, #25D366 30%, #128C7E 90%)",
                py: 1.5,
                px: 4,
              }}
            >
              WhatsApp
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              padding: 3,
              borderRadius: 2,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Your Unique Challenge Code:
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
                letterSpacing: 4,
                color: "#4CAF50",
              }}
            >
              {username.toUpperCase()}-GLOBETROTTER
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SharePopup;
