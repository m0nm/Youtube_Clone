import Head from "next/head";
import React from "react";

// basic styles
const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  alignItems: "center",
};

const heading = {
  fontSize: "22px",
  fontWeight: "500",
  width: "90%",
};

const button = {
  fontSize: "20px",
  padding: "10px 1rem",
  textDecoration: "underline",
};

function ErrorMessage() {
  return (
    <>
      <Head>
        <title>Error - Quotas exeeded</title>
      </Head>

      <div style={container}>
        <h1 style={heading}>
          Sorry the website is not working right now (quotas exeeded)
        </h1>
        <a style={button} href="#">
          Try this one instead
        </a>
      </div>
    </>
  );
}

export default ErrorMessage;
