import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

import Logo from "../public/youtube-logo.svg";
import micIcon from "../public/appbar/mic.svg";
import userIcon from "../public/appbar/user.svg";
import searchIcon from "../public/appbar/search.svg";
import appsIcon from "../public/appbar/apps.svg";
import settingsIcon from "../public/appbar/settings.svg";

import styled from "styled-components";
import Head from "next/head";
import { useStore } from "../store/store";
function AppBar() {
  // --- hooks ----------------------------------------

  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);
  const router = useRouter();

  //--- handlers ---------------------------------------

  // --- submit handler --- //
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        value: search,
      },
    });
  };
  // --- change handler --- //
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  // --- return ----------------------------------------
  return (
    <Container>
      <Head>
        <title>Youtube Clone V2</title>
        <meta name="description" content="A Simple Youtube Clone" />
      </Head>
      <Link passHref href="/">
        <Image className="logo" width="120px" height="30px" src={Logo} alt="" />
      </Link>
      <Form onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={handleChange}
          type="text"
          placeholder="search"
        />
        <button>
          <i className="search-icon pointer">
            <Image src={searchIcon} alt="" width="34px" height="34px"></Image>
          </i>
        </button>
        <i className="mic-icon pointer">
          <Image src={micIcon} alt="" width="24px" height="24px" />
        </i>
      </Form>

      <Options>
        <i className="apps-icon pointer">
          <Image src={appsIcon} alt="" width="20px" height="20px" />
        </i>
        <i className="settings-app pointer">
          <Image src={settingsIcon} alt="" width="26px" height="26px" />
        </i>
        <button className="pointer">
          <Image src={userIcon} alt="" width="26px" height="26px" />
          SIGN IN
        </button>
      </Options>
    </Container>
  );
}

export default AppBar;

// styled

const Container = styled.div`
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 94%;
  height: 10vh;
  z-index: 10;
  padding: 7px;

  .logo {
    cursor: pointer;
  }

  .pointer {
    cursor: pointer;
  }
`;

const Form = styled.form`
  padding: 10px;
  flex: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;
    width: 80px;
    background-color: rgb(242, 242, 242);
    border: none;
  }

  input {
    height: 40px;
    width: 96%;
    padding: 10px;
    border: 1px solid lightgray;
  }

  .mic-icon {
    padding-left: 10px;
  }
`;

const Options = styled.div`
  flex: 0.18;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 2px solid #3ea6ff;
    color: #3ea6ff;
    background: none;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 500;
    width: 108px;
    height: 45px;
  }
`;
