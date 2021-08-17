import Message from "./message";

/**
 * This component is used to display messages at the top right corner of the current window
 * @param {*} param0
 * @returns
 */
const MessageList = ({ messages, handleRemoveMessage }) => {
  return (
    <div className="messageListWrapper">
      <div className="messageList">
        {messages.slice(0, 5).map((message) => {
          return (
            <Message
              message={message}
              handleRemoveMessage={handleRemoveMessage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
