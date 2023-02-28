import { auth, collection, db } from "@/firebaseConfig";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { where, query } from "@firebase/firestore";
import { Avatar } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";

export default function Chat({ id, users }) {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const recipientRef = collection(db, "users");
  const recipientQuery = query(
    recipientRef,
    where("email", "==", getRecipientEmail(users, user))
  );

  const [recipientSnapshot] = useCollection(recipientQuery);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar>
          <Image
            src={recipient?.photoUrl}
            layout="fill"
            objectFit="contain"
          ></Image>
        </UserAvatar>
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <p>{recipientEmail}</p>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
