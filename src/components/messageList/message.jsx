import { Collapse } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";
import { useState } from "react";

const Message = ({ message, handleRemoveMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeOutMessage = () => {
    handleRemoveMessage(message.id);
  };

  return (
    <div className="message">
      <Collapse in={isVisible}>
        <Alert
          severity={message.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => fadeOutMessage()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{message.title}</AlertTitle>
          {message.body}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Message;
