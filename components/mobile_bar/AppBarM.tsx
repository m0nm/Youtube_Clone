import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { useStore } from "../../store/store";
function AppBarM({ title }: { title: string }) {
  const router = useRouter();
  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);
  // handlers ------------------------------------------
  //--- submit handler --- /
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
  // --- return -------------------------------------------
  return (
    <AppBar>
      <h3>{title}</h3>
      <div className="search-settings">
        <form onSubmit={handleSubmit} className="search-input">
          <i tabIndex={0} className="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 50 50"
            >
              <path
                d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13zm0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11z"
                fill="currentColor"
              />
              <path
                d="M32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
                fill="currentColor"
              />
            </svg>
          </i>
          <input value={search} onChange={handleChange} type="text" />
        </form>
        <i className="settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              d="M16 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm0 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm0 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z"
              fill="currentColor"
            />
          </svg>
        </i>
      </div>
    </AppBar>
  );
}

export default AppBarM;

//--- styled components --------------------------------

export const AppBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;

  h3 {
    color: white;
    font-size: 30px;
  }

  .search-settings {
    position: relative;
    width: 120px;
    display: flex;
    justify-content: space-between;

    .search-input {
      display: flex;
      align-items: center;

      .search {
        z-index: 10;

        &:focus + input {
          opacity: 1;
        }
      }

      input {
        opacity: 0;
        color: white;
        font-weight: 500;
        font-size: 16px;
        padding: 12px;
        position: absolute;
        right: 80px;
        width: 30vw;
        height: 35px;
        border-radius: 20px;
        border: none;
        background: rgba(00, 00, 00, 0.2);

        &:focus {
          opacity: 1;
        }
      }
    }
  }

  svg {
    cursor: pointer;
    font-size: 32px;
  }
`;
