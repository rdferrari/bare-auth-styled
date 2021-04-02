import styled from "styled-components";

const TagContainer = styled.div`
  text-align: center;
  padding: 0 10px;

  @media only screen and (min-width: 1024px) {
    margin-right: 50px;
    text-align: left;
    padding: 0;
  }
`;

const Tagline = () => {
  return (
    <TagContainer>
      <h1>Bare Auth Styled</h1>
      <p>
        This is an AWS Amplify + PWA React TypeScript custom authentication
        boilerplate to start new App projects.
      </p>
      <p>Developed and designed by Rod</p>
    </TagContainer>
  );
};

export default Tagline;
