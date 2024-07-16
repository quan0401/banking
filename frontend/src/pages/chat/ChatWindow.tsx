import { IMessageDocument } from "@interfaces/features/chat.interface";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";
import { chatService } from "@services/api/chat/chat.service";
import { socket, socketService } from "@services/sockets/chat.socket";
import Button from "@shared/button/Button";
import TextInput from "@shared/inputs/TextInput";
import { TimeAgo } from "@utils/timeago.utils";
import { showErrorToast } from "@utils/utils.service";
import { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface IChatWindowProps {
  participants: any[];
  allowedFetchMessages: boolean;
}

const ChatWindow: FC<IChatWindowProps> = ({
  participants,
  allowedFetchMessages,
}): ReactElement => {
  const [chatMessages, setChatMessages] = useState<IMessageDocument[]>([]);
  const [showImagePreview, _setShowImagePreview] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [message, setMessage] = useState<string>("");
  // console.log(chatMessages);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message.trim() === "") return;
    const messageData: IMessageDocument = {
      conversationId: participants[0].conversationId,
      messageText: message,
      userId: authUser?.id!,
      messageType: "text",
    };
    try {
      const res = await chatService.sendMessage(messageData);

      setChatMessages([...chatMessages, res.data.messageData]);
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to send message");
    }

    setMessage("");
  };
  const handleFileChange = (_e: any) => {
    // const file = e.target.files[0];
    // if (file) {
    //   setSelectedFile(file);
    //   setShowImagePreview(true);
    // }
  };
  const { conversationId } = useParams<string>();
  // console.log(chatMessages[0]);

  useEffect(() => {
    if (!conversationId || !allowedFetchMessages) return;
    chatService
      .getMessagesByConversationId(conversationId)
      .then((res) => {
        setChatMessages(res.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [conversationId, navigate]);

  const receiver = participants.find((part) => {
    return part.userId !== authUser?.id;
  });
  useEffect(() => {
    socketService.setupSocketConnection();
    const handleMessageReceived = (data: any) => {
      setChatMessages((prev) => {
        // Check if the message id already exists in the current state
        const messageExists = prev.find((message) => message.id === data.id);
        // If it doesn't exist, add the new message to the state
        if (!messageExists) {
          return [...prev, data];
        }
        // If it exists, just return the current state without adding the new message
        return prev;
      });
      console.log("chatwindow sokcet", data);
    };
    socket.on("message received", handleMessageReceived);
  }, []);

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="border-grey flex w-full flex-col border-b px-5 py-0.5 ">
        {/* {receiverEmail === receiverRef.current?.email ? ( */}
        {true ? (
          <>
            {/* <div className="text-lg font-semibold">{receiverRef?.current?.username}</div> */}
            <div className="text-lg font-semibold">{receiver.username}</div>
            <div className="flex gap-1 pb-1 text-xs font-normal">
              Online
              <span className="flex h-2.5 w-2.5 self-center rounded-full border-2 border-white bg-green-400"></span>
            </div>
          </>
        ) : (
          <>
            <div className="py-2.5 text-lg font-semibold">
              {/* {receiverRef?.current?.username} */}
            </div>
            <span className="py-2.5s text-xs font-normal"></span>
          </>
        )}
      </div>
      <div className="relative h-[100%]">
        <div
          // className="absolute flex h-[98%] w-screen grow flex-col overflow-scroll"
          className="absolute flex h-[98%] w-screen grow flex-col overflow-scroll"
          // ref={scrollRef}
        >
          {chatMessages.map((msg: any) => (
            <div key={uuidv4()} className="mb-4">
              <div className="flex w-full cursor-pointer items-center space-x-4 px-5 py-2">
                <div className="flex self-start">
                  <img
                    className="h-10 w-10 object-cover rounded-full"
                    src={msg.user.profilePicture}
                    alt=""
                  />
                </div>
                <div className="w-full text-sm dark:text-white">
                  <div className="flex gap-x-2 pb-1 font-bold text-[#777d74]">
                    {/* <span>{msg.senderUsername}</span> */}
                    <span>{msg.user.username}</span>
                    <span className="mt-1 self-center text-xs font-normal">
                      {TimeAgo.dayMonthYear(`${msg.sentAt}`)}
                    </span>
                  </div>
                  <div className="flex flex-col text-[#777d74] font-extrabold">
                    {/* <span>{msg.body}</span> */}
                    <span>{msg.messageText}</span>

                    {/* {msg.file && <ChatFile message={msg} />} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex flex-col">
        {/* {showImagePreview && (
          <ChatImagePreview
            image={URL.createObjectURL(selectedFile as File)}
            file={selectedFile as File}
            isLoading={isUploadingFile}
            message={message}
            onSubmit={sendMessage}
            onRemoveImage={() => {
              setSelectedFile(null);
              setShowImagePreview(MESSAGE_STATUS.IS_LOADING);
            }}
            handleChange={setChatMessage}
          />
        )} */}

        {!showImagePreview && (
          <div className="bottom-0 left-0 right-0 z-0 px-4 ">
            <form
              onSubmit={sendMessage}
              className="mb-1 w-full flex gap-4 items-center"
            >
              {!showImagePreview && (
                <FaPaperclip
                  className="mt-1 self-center"
                  // onClick={() => fileRef.current?.click()}
                />
              )}
              {/* {!showImagePreview && !!seller._id && (
                  <Button
                    className="rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                    disabled={false}
                    label="Add Offer"
                    onClick={() => 
                      setDisplayCustomOffer(MESSAGE_STATUS.LOADING)
                    }
                  />
                )} */}
              <TextInput
                type="text"
                name="message"
                value={message}
                className="field-input border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal focus:outline-none"
                placeholder="Enter your message..."
                onChange={(e: ChangeEvent) => {
                  setMessage((e.target as HTMLInputElement).value);
                }}
              />
              <div className="flex gap-4">
                <Button
                  className="rounded max-h-8  bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                  disabled={false}
                  label={<FaPaperPlane className="self-center" />}
                  onClick={sendMessage}
                />
              </div>
            </form>
            {showImagePreview && (
              <div className="flex cursor-pointer flex-row justify-between">
                <div className="flex gap-4">
                  <TextInput
                    name="chatFile"
                    // ref={fileRef}
                    type="file"
                    style={{ display: "none" }}
                    onClick={() => {
                      // if (fileRef.current) {
                      //   fileRef.current.value = "";
                      // }
                    }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
