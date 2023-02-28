import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, orderBy, query } from "@firebase/firestore";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

export default function Chat() {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <SideBar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const ref = doc(db, "chats", context.query.id);
  // const q = query(orderBy())
  const messageRef = await getDoc(ref, orderBy("timestamp", "asc"));
  console.info(messageRef, "<<<< messageref");
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
