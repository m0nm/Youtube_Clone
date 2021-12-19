import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

type SideBarMProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

function SideBarM({ setTitle }: SideBarMProps) {
  const router = useRouter();

  // --- handlers --------------------------------------
  const returnHome = () => {
    router.push("/");
  };
  return (
    <SideBar>
      <i
        onClick={() => {
          setTitle("Home");
          returnHome();
        }}
        tabIndex={0}
        className=" home"
      >
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
      <i onClick={() => setTitle("Explore")} tabIndex={0} className="explore">
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
      <i onClick={() => setTitle("Subscribes")} tabIndex={0} className="subs">
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
    </SideBar>
  );
}

export default SideBarM;

// styled

const SideBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  i {
    flex: 0.33;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    &:focus {
      border-bottom: 2px solid white;
      color: white;
    }

    svg {
      font-size: 32px;
    }
  }
`;
