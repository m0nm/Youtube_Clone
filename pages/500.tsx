import Head from "next/head";
import React from "react";

// basic styles
const container = {
  height: "90vh",
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  alignItems: "center",
};

const heading = {
  fontSize: "22px",
  fontWeight: "500",
  width: "60%",
  marginLeft: "10%",
};

const button = {
  fontSize: "20px",
  padding: "10px 1rem",
  textDecoration: "underline",
};

// if quotas exeeded then use this website
const fallback_url = "https://youtube-clone-v3-duplicate.vercel.app";

function Custom500() {
  return (
    <>
      <Head>
        <title>Error - Quotas exeeded</title>
      </Head>

      <div style={container}>
        <h1 style={heading}>
          Sorry the website is not working right now (quotas exeeded)
        </h1>
        <a style={button} href={fallback_url}>
          Try this one instead
        </a>
      </div>
    </>
  );
}

export default Custom500;
