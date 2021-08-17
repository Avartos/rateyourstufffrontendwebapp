import Message from "./message";

const MessageList = ({ messages, handleRemoveMessage }) => {
  return (
    <div className="messageListWrapper">
      <div className="messageList">
        {messages.slice(0,5).map((message) => {
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
