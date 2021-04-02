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

const LinkA = styled.a`
  color: #ff00eb;
  cursor: pointer;
`;

const Tagline = () => {
  return (
    <TagContainer>
      <h1>Dark Auth</h1>
      <p>
        This is an AWS Amplify + PWA React TypeScript + Dark or Light style +
        custom AWS Cognito authentication. Explore the{" "}
        <LinkA
          className="button-text"
          href="https://github.com/rdferrari/bare-auth-styled"
          target="blank"
        >
          {"< repo :) />"}
        </LinkA>{" "}
      </p>
    </TagContainer>
  );
};

export default Tagline;
