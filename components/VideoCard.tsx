import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { find_channel_img } from "../helpers/find_channel_img";
import Loading from "../public/loading.gif";
import { useStore } from "../store/store";

type VideoCardProps = {
  video: any;
  search: boolean;
  watch: boolean;
};

function VideoCard({ video, search, watch }: VideoCardProps) {
  //-- hooks -----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);
  const [channelImg, setChannelImg] = useState("");
  const router = useRouter();
  const setStorageTrigger = useStore((state) => state.setStorageTrigger);

  // -- handlers -------------------------------------------
  const handleClick = () => {
    router.push({
      pathname: "/watch",
      query: {
        video: video.video_id,
      },
    });

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "query",
        JSON.stringify({
          video: video.video_id,
          title: video.title,
          desc: video.description,
          channel: video.channel_name,
          channel_img: channelImg,
          publish_date: video.publish_date,
        })
      );

      setStorageTrigger();
    }
  };

  // -- fetch channel image --------------------------------

  useEffect(() => {
    (async () => {
      let channel_img: any = await find_channel_img(video.channel_id);
      setChannelImg(channel_img);
      setIsLoading(false);
    })();
  }, [video.channel_id]);

  // -- return ---------------------------------------------

  return (
    <Container onClick={handleClick} search={search} watch={watch}>
      {/* --- thumbnail --- */}

      <div className="thumbnail">
        <Image
          width="600"
          height="380"
          src={video.thumbnail}
          alt=""
          quality={100}
        />
      </div>

      {/* --- channel section --- */}
      <div className="channel-section">
        {/* --- don't show up on search page --- */}
        {!search && (
          <div className="channel-image">
            <Image
              src={isLoading ? Loading : channelImg}
              alt=""
              width="44"
              height="44"
            ></Image>
          </div>
        )}

        <div className="channel-info">
          <h3 className="title">{video.title}</h3>
          {/* --- show up on search page below title --- */}
          {search && (
            <div className="channel-image">
              <Image
                src={isLoading ? Loading : channelImg}
                alt=""
                width="33px"
                height="33px"
              ></Image>
              <p className="channel-name">{video.channel_name}</p>
            </div>
          )}
          {!search && <p className="channel-name">{video.channel_name}</p>}
          <p className="publish-date">
            Published at: {video.publish_date.slice(0, 10)}
          </p>
        </div>
      </div>
    </Container>
  );
}

export default VideoCard;

//-- styled component ---------------------------------------------------//

type StyledProps = {
  search: boolean;
  watch: boolean;
};

const Container = styled.div<StyledProps>`
  /* --------------    vars    ------------- */

  /* home page vars --------------*/
  --h-width: 25%;

  /* channel section -------- */
  --h-cs-mt: 5%;
  --h-cs-width: 100%;

  /* channel img -------- */
  --h-ch-img-width: 20%;
  --h-ch-img-mt: 0;

  /* channel info -------- */
  --h-ch-inf-ml: auto;

  /* title -------- */
  --h-title-fs: 1rem;
  /* paragraph -------- */
  --h-p-fs: 0.8em;

  /*------------------------------------------------------------*/

  /* search page vars --------------*/
  --s-width: 90%;

  /* channel section -------- */
  --s-cs-mt: 0;
  --s-cs-width: 60%;

  /* channel img -------- */
  --s-ch-img-width: auto;
  --s-ch-img-mt: 1.2rem;

  /* channel info -------- */
  --s-ch-inf-ml: 0rem;

  /* title -------- */
  --s-title-fs: 1.2rem;

  /* paragraph -------- */
  --s-p-fs: 1.2rem;

  /*---------------------------------------------------*/

  /* watch page vars -------------- */
  --w-width: 100%;
  --w-title-fs: 1rem;
  --w-p-fs: 0.8rem;
  --w-thumb-width: 160px;
  --w-ch-img-mt: 0.2rem;
  --w-ch-inf-ml: 0.4rem;
  --w-ch-inf-width: 100%;

  /* ----------     styles      ------------ */
  padding: 15px 10px;
  display: flex;
  cursor: pointer;
  height: auto;
  width: ${(p) => (p.search ? "var(--s-width)" : "var(--h-width)")};
  width: ${(p) => p.watch && "var(--w-width)"};
  flex-direction: ${(p) => (p.search ? "row" : "column")};
  justify-content: space-between;
  align-items: flex-start;

  .thumbnail {
    max-width: ${(p) => (p.watch ? "var(--w-thumb-width)" : "400px")};
  }

  .channel-section {
    margin-top: ${(p) => (p.search ? "var(--s-cs-mt)" : "var(--h-cs-mt)")};
    width: ${(p) => (p.search ? "var(--s-cs-width)" : "var(--h-cs-width)")};
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .channel-image {
      display: flex;
      align-self: flex-start;
      width: ${(p) =>
        p.search ? "var(--s-ch-img-width)" : "var(--h-ch-img-width)"};
      align-items: center;
      margin-top: ${(p) =>
        p.search ? "var(--s-ch-img-mt)" : "var(--h-ch-img-mt)"};
      margin-top: ${(p) => p.watch && "var(--w-ch-img-mt)"};

      img {
        border-radius: 100%;
      }
    }
    .channel-info {
      margin-left: ${(p) =>
        p.search ? "var(--s-ch-inf-ml)" : "var(--h-ch-inf-ml)"};
      margin-left: ${(p) => p.watch && "var(--w-ch-inf-ml)"};
      width: ${(p) => (p.watch ? "var(--w-ch-inf-width)" : "75%")};
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      text-align: start;

      .title {
        font-size: ${(p) =>
          p.search ? "var(--s-title-fs)" : "var(--h-title-fs)"};
        font-size: ${(p) => p.watch && "var(--w-title-fs)"};
        font-weight: 400;
        line-height: 1.4rem;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        font-size: ${(p) => (p.search ? "var(--s-p-fs)" : "var(--h-p-fs)")};
        font-size: ${(p) => p.watch && "var(--w-p-fs)"};
        line-height: 1.4em;
        padding-top: 0.4rem;
        color: hsl(0, 0%, 30%);
      }

      .channel-name {
        display: ${(p) => p.search && "inline"};
        margin-left: ${(p) => p.search && "0.6rem"};
      }

      .publish-date {
        margin-top: 0.3rem;
      }
    }
  }

  /*-- mobile styles --------------------------------------*/

  @media only screen and (max-width: 800px) {
    width: 100%;
    min-height: 6rem;
    font-size: 3vw;
    flex-direction: column !important;
    align-items: center;
    transform: scale(0.9);
    margin: 0 auto;

    .thumbnail {
      min-width: 100%;
    }

    .channel-section {
      width: ${(p) => p.search && "100%"};
      .channel-image {
        width: 15% !important;
        img {
          width: 3em !important;
        }
      }
    }
  }
`;
//TODO: fix styling video card, use css var, add 403 ,build
