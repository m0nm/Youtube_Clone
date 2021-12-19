import Image from "next/image";
import styled from "styled-components";

function Error403() {
  return (
    <Container>
      <h2>
        Sorry the site is unavaible at the moment (quotas has been exceeded),
        You may have to come back later :). In the meantime you may look at
        this:
      </h2>
      <br />
      <br />
      <div className="img">
        <Image
          src="https://i.ibb.co/grSDC0w/image-2021-09-23-015846.png"
          alt=""
          width="700px"
          height="400px"
        />
      </div>
    </Container>
  );
}

export default Error403;

// --- styled components ----------------------------

const Container = styled.div`
  position: absolute;
  top: 15vh;
  left: 6%;

  h2,
  .img {
    margin: 0 auto;
    width: 70%;
  }
`;
