import Image from "next/image";
import React from "react";
import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Image
          width={200}
          height={200}
          src={
            "https://www.tanjunglesung.com/wp-content/uploads/2018/12/logo-wa-whatsapp-300x300.png"
          }
          alt="WA LOGO"
          style={{
            marginBottom: 10,
          }}
        ></Image>
        <Circle color="#3CBC2B" size={60} />
      </div>
    </center>
  );
}
