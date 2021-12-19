function SideBar() {
  return (
    <Container>
      <aside>
        <div className="menu">
          <i>
            <svg
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M4 8h24M4 16h24M4 24h24" />
              </g>
            </svg>
          </i>
        </div>
        <div tabIndex={0} className="home">
          <i tabIndex={0} className=" home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <g fill="none">
                <path
                  d="M14.07 3.567a3 3 0 0 1 3.86 0l9 7.568A3 3 0 0 1 28 13.431v12.57a2 2 0 0 1-2 2h-5.5a2 2 0 0 1-2-2v-7h-5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V13.43a3 3 0 0 1 1.07-2.296l9-7.568z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </i>
          <p>Home</p>
        </div>
        <div tabIndex={1} className="explore">
          <i tabIndex={0} className="explore">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                d="M350.67 150.93l-117.2 46.88a64 64 0 0 0-35.66 35.66l-46.88 117.2a8 8 0 0 0 10.4 10.4l117.2-46.88a64 64 0 0 0 35.66-35.66l46.88-117.2a8 8 0 0 0-10.4-10.4zM256 280a24 24 0 1 1 24-24a24 24 0 0 1-24 24z"
                fill="currentColor"
              />
            </svg>
          </i>
          <p>Explore</p>
        </div>
        <div tabIndex={2} className="subs">
          <i>
            <svg
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path d="M13 15v8l7-4l-7-4z" fill="currentColor" />
              <path
                d="M26 28H6a2.002 2.002 0 0 1-2-2V12a2.002 2.002 0 0 1 2-2h20a2.002 2.002 0 0 1 2 2v14a2.002 2.002 0 0 1-2 2zM6 12v14h20V12z"
                fill="currentColor"
              />
              <path d="M6 6h20v2H6z" fill="currentColor" />
              <path d="M8 2h16v2H8z" fill="currentColor" />
            </svg>
          </i>
          <p>Subscriptions</p>
        </div>
        <div tabIndex={3} className="library">
          <i>
            <svg
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"
                fill="currentColor"
              />
            </svg>
          </i>
          <p>Library</p>
        </div>
        <div tabIndex={4} className="history">
          <i>
            <svg
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.507 12.324a7 7 0 0 0 .065-8.56A7 7 0 0 0 2 4.393V2H1v3.5l.5.5H5V5H2.811a6.008 6.008 0 1 1-.135 5.77l-.887.462a7 7 0 0 0 11.718 1.092zm-3.361-.97l.708-.707L8 7.792V4H7v4l.146.354l3 3z"
                />
              </g>
            </svg>
          </i>
          <p>History</p>
        </div>
      </aside>
    </Container>
  );
}

export default SideBar;

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 6%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  background: white;

  aside {
    margin-top: 20px;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
    padding: 5px;
    cursor: pointer;

    &:first-child {
      margin-top: 0px;
      align-self: center;
      justify-self: flex-start;
    }
    &:nth-child(2) {
      margin-top: 50%;
    }

    &:hover {
      background: #f1f1f1;
    }

    &:focus {
      background: #f1f1f1;
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 300;
    }

    svg {
      font-size: 26px;
      font-weight: 300;
    }
  }
`;
