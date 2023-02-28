import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "@mui/material";
import { auth, provider } from "@/firebaseConfig";
import { signInWithPopup } from "@firebase/auth";

export default function login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo
          width={200}
          height={200}
          src={
            "https://www.tanjunglesung.com/wp-content/uploads/2018/12/logo-wa-whatsapp-300x300.png"
          }
          alt="WA LOGO"
        />
        <Button variant="outlined" onClick={signIn}>
          Sign in with google
        </Button>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.7);
`;
const Logo = styled(Image)`
  margin-bottom: 50px;
`;
