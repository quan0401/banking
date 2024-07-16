import { IMessageDocument } from "@interfaces/features/chat.interface";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";
import { chatService } from "@services/api/chat/chat.service";
import { TimeAgo } from "@utils/timeago.utils";
import { showErrorToast } from "@utils/utils.service";
import { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import { FaCircle, FaCheckDouble } from "react-icons/fa";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface IChatListProps {
  chatList: IMessageDocument[];
  setChatList: Dispatch<SetStateAction<IMessageDocument[]>>;
  fetchingList: boolean;
}

const ChatList: FC<IChatListProps> = ({
  chatList,
  fetchingList,
}): ReactElement => {
  // const [chatList, setChatList] = useState<IMessageDocument[]>([]);
  const [selectedUser, _setSelectedUser] = useState<IMessageDocument>();
  const { conversationId } = useParams<string>();
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const navigate: NavigateFunction = useNavigate();

  const selectUserFromList = (data: any) => {
    navigate(`/chat/view/${data.conversationId}`);
  };

  const handleConnectWithAdmin = async () => {
    try {
      await chatService.connectWithAdmin();
    } catch (error) {
      showErrorToast("Error connecting with admin");
    }
  };

  return (
    <>
      <div className="border-grey truncate border-b px-5 py-3 text-base font-medium">
        <h2 className="w-6/12 truncate text-sm md:text-base lg:text-lg">
          All Conversations
        </h2>
      </div>
      {!fetchingList && chatList.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => handleConnectWithAdmin()}
            className="btn btn--primary"
          >
            Chat with admin
          </button>
        </div>
      ) : (
        <div className="absolute h-full w-full overflow-scroll pb-14">
          {authUser?.id &&
            chatList.map((data: any, index: number) => {
              return (
                <div
                  key={uuidv4()}
                  onClick={() => selectUserFromList(data)}
                  className={`flex w-full cursor-pointer items-center space-x-4 px-5 py-4 hover:bg-gray-50 ${
                    index !== chatList.length - 1 ? "border-grey border-b" : ""
                  }  ${data.id === conversationId ? "bg-[#f5fbff]" : ""}`}
                >
                  <img
                    src={data.profilePicture}
                    alt="profile image"
                    className="h-10 w-10 object-cover rounded-full"
                    // placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
                    // effect="blur"
                  />
                  {/* <div className="w-full text-sm dark:text-white"> */}
                  <div className={`w-full text-sm font-extrabold`}>
                    <div className="flex justify-between pb-1 font-bold">
                      <span
                        className={`${selectedUser ? "flex items-center" : ""}`}
                      >
                        {data.receiverUsername}
                      </span>

                      {data.sentAt && (
                        <span className="font-normal">
                          {TimeAgo.transform(`${data.sentAt}`)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {/* {data.receiverEmail === authUser.email ? "" : "Me: "} */}
                        {data.senderId !== authUser.id ? "" : "Me: "}
                        {data.messageText}
                      </span>

                      {!true ? (
                        <>
                          {false ? (
                            <FaCircle className="mt-2 text-sky-500" size={8} />
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <FaCheckDouble className="mt-2 text-sky-500" size={8} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default ChatList;
