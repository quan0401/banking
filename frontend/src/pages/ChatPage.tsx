import { FC, ReactElement, useEffect, useState } from "react";
import ChatList from "./chat/ChatList";
import ChatWindow from "./chat/ChatWindow";
import { chatService } from "@services/api/chat/chat.service";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { IMessageDocument } from "@interfaces/features/chat.interface";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";
import { socket, socketService } from "@services/sockets/chat.socket";

const ChatPage: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const navigate: NavigateFunction = useNavigate();
  const { conversationId } = useParams<string>();

  const [participants, setParticipants] = useState<any[]>([]);
  const [chatList, setChatList] = useState<IMessageDocument[]>([]);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const [fetchingList, setFetchingList] = useState<boolean>(false);
  const [allowedFetchMessages, setAllowedFetchMessages] =
    useState<boolean>(true);

  useEffect(() => {
    if (!conversationId) return;
    chatService
      .getAllParticipantsOfConversation(conversationId)
      .then((res) => {
        const data: any[] = res.data.participants;
        const isInConversatoin = data.find(
          (participant) => participant.userId === authUser?.id
        );
        setAllowedFetchMessages(!!isInConversatoin);
        if (isInConversatoin) {
          setParticipants(res.data.participants);
        } else {
          navigate("/chat/view");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [conversationId, navigate]);

  useEffect(() => {
    // Assuming setupSocketConnection now ensures a single socket instance is reused
    socketService.setupSocketConnection();

    const handleMessageReceived = (_data: any) => {
      console.log("received message in chat page");
      // Increment the counter to trigger refetch
      setRefetchCounter((prev) => prev + 1);
    };

    socket.on("message received", handleMessageReceived);

    // Cleanup on component unmount or if socket changes
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (!authUser?.id) return;
    setFetchingList(true);
    chatService
      .getConversationsOfUser(authUser.id)
      .then((res) => {
        setChatList(res.data.conversations);
        setFetchingList(false);
      })
      .catch((err) => {
        console.log(err);
        setFetchingList(false);
      });
  }, [refetchCounter]);

  return (
    <div className=" h-screen">
      <div className="border-grey mx-2 my-5 flex h-[86%]  flex-wrap border lg:container lg:mx-auto">
        <div className="lg:border-grey relative w-full overflow-hidden lg:w-1/3 lg:border-r">
          <ChatList
            chatList={chatList}
            setChatList={setChatList}
            fetchingList={fetchingList}
          />
        </div>

        <div className="relative hidden w-full overflow-hidden md:w-2/3 lg:flex">
          {participants.length > 0 && allowedFetchMessages ? (
            <ChatWindow
              participants={participants}
              allowedFetchMessages={allowedFetchMessages}
            />
          ) : (
            <div className="flex w-full items-center justify-center">
              Select a user to chat with.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
