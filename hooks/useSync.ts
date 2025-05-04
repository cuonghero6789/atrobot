import { ASTROME_DAILY, ASTROME_DOMINANT, ASTROME_MANIFEST, ASTROME_QUOTE, UPDATE_LOCATION_INFO } from "@/apollo/mutation";
import { ACCOUNT, CHATS } from "@/apollo/query";
import useAccountStore from "@/stores/AccountStore";
import useChatStore from "@/stores/ChatStore";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";

export default function useSync() {
  const [AstroDaily, { data, loading: loadingAstroDaily, error }] = useMutation(ASTROME_DAILY);
  const [
    AstroQuote,
    { data: dataQuote, loading: loadingQuote, error: errorQuote },
  ] = useMutation(ASTROME_QUOTE);
  const [
    AstroMeDominant,
    { data: astroMeDominant, loading: loadingMeDominant, error: errorMeDominant },
  ] = useMutation(ASTROME_DOMINANT);
  const {
    data: dataMessage,
    loading: loadingMessage,
    error: errorMessage,
    refetch: refetchChat,
  } = useQuery(CHATS);
  const {
    data: dataAccount,
    loading: loadingAccount,
    error: errorAccount,
    refetch: refretchAccount,
  } = useQuery(ACCOUNT);
  // const { data: dataManifest, loading: loadingManifest, error: errorManifest, refetch } = useQuery(ASTROME_MANIFEST);
  const actionChat = useChatStore(state => state.actions);
  const actionAccount = useAccountStore(state => state.actions);
  const [
    UpdateLocationInfo,
    { data: dataLocation, loading: loadingLocation, error: errorLocation },
  ] = useMutation(UPDATE_LOCATION_INFO);

  useEffect(() => {
    if (dataAccount?.account) {
      actionAccount.setAccount(dataAccount.account);
    }
  }, [dataAccount?.account]);

  useEffect(() => {
    if (dataMessage?.chats?.length > 0) {
      actionChat.setChats(dataMessage?.chats);
    }
  }, [dataMessage]);

  const updateCurrentLocation = useCallback((latitude: number, longitude: number) => {
    UpdateLocationInfo({
      variables: {
        lat: latitude,
        lng: longitude,
      },
    });
  }, [UpdateLocationInfo]);

  const onRefresh = (fromDate: string) => {
    refretchAccount();
    AstroDaily({ variables: { from_date: fromDate } });
    AstroQuote({ variables: { from_date: fromDate } });
    AstroMeDominant({ variables: {} });
    refetchChat();
  }

  const getAstroDaily = (fromDate: string) => {
    AstroDaily({ variables: { from_date: fromDate } });
  }

  return { onRefresh, updateCurrentLocation, getAstroDaily, loadingAstroDaily, loadingQuote, loadingMeDominant, loadingMessage, loadingLocation };
}