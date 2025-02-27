import { CHATS } from "@/apollo/query";
import useChatStore from "@/stores/ChatStore";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

export default function useSync() {
    const {
        data: dataMessage,
        loading: loadingMessage,
        error: errorMessage,
    } = useQuery(CHATS);
    const actionChat = useChatStore(state => state.actions);

    useEffect(() => {
        if (dataMessage?.chats?.length > 0) {
            actionChat.setChats(dataMessage?.chats);
        }
    }, [dataMessage]);
}