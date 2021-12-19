import styled from "styled-components";
import Head from "next/head";
import { useState } from "react";
import AppBarM from "./mobile_bar/AppBarM";
import SideBarM from "./mobile_bar/SideBarM";

function MobileBar() {
  const [title, setTitle] = useState("Home");

  return (
    <Container>
      <Head>
        <title>Youtube Clone V2</title>
        <meta name="description" content="A Simple Youtube Clone" />
      </Head>
      <AppBarM title={title} />

      <SideBarM setTitle={setTitle} />
    </Container>
  );
}

export default MobileBar;

//--- styled ------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: #c4302b;
  padding: 10px 10px 0 10px;
  z-index: 10;
`;
