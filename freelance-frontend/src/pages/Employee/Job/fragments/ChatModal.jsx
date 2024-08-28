import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";

const ChatModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (open && !socket) {
      const newSocket = new WebSocket("ws://localhost:8001/ws/employer/chat/");
      setSocket(newSocket);

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data.message]);
      };

      newSocket.onclose = () => {
        console.log("WebSocket closed");
      };

      return () => {
        newSocket.close();
      };
    }
  }, [open]); // Removed `socket` from the dependency array

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.send(JSON.stringify({ message }));
      setMessage("");
    }
  };

  const dialogBackdropStyle = {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: dialogBackdropStyle,
      }}
    >
      <DialogTitle>Chat</DialogTitle>
      <DialogContent>
        <Box mb={2} style={{ maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </Box>
        <TextField
          label="Type your message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={sendMessage} color="primary">
          Send
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatModal;
