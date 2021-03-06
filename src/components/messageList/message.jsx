import { Collapse } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";
import { useState } from "react";

/**
 * This component is a message that can be displayed a the top right corner of the screen
 * A Message can be either closed automatically or will close after a certain amount of time
 * @param {*} param0
 * @returns
 */
const Message = ({ message, handleRemoveMessage }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [autoClose, setAutoClose] = useState(() =>
    setTimeout(() => {
      fadeOutMessage();
    }, 6000)
  );

  // useEffect(() => {
  //   const timeout = ;
  // }, []);

  useEffect(() => {
    if (!isVisible)
      setTimeout(() => {
        handleRemoveMessage(message.id);
      }, 3000);
  }, [isVisible]);

  const fadeOutMessage = () => {
    setIsVisible(false);
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
