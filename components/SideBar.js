import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import { MoreVert } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, query, where } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import Image from "next/legacy/image";
export default function SideBar() {
  const [user] = useAuthState(auth);
  const userChatRef = collection(db, "chats");
  const userChatQuery = query(
    userChatRef,
    where("users", "array-contains", user.email)
  );
  const [chatSnapshot] = useCollection(userChatQuery);
  const createChat = () => {
    const input = prompt("INPUT");
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // add chat in db 'chats' collection if it doesnt alreeady exists and is valid
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      }).catch(alert);
    }
  };

  const chatAlreadyExists = (reciptionEmail) => {
    console.info(
      chatSnapshot?.docs?.map((chat) => {
        console.info(chat.data().users.find((user) => user === reciptionEmail));
      })
    );
    return !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === reciptionEmail)?.length > 0
    );
  };
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()}>
          <Image
            src={user?.photoURL}
            layout={"fill"}
            objectFit="contain"
          ></Image>
        </UserAvatar>
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new Chat</SidebarButton>
      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opactity: 0.8;
  }
`;
const IconContainer = styled.div``;
