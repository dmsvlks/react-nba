import styled from 'styled-components';

const Loader = styled.div`
  margin: 0 auto;
  margin-top: 25%;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid hsla(0, 0%, 80%, 1);
  border-right: 1.1em solid hsla(0, 0%, 80%, 1);
  border-bottom: 1.1em solid hsla(0, 0%, 80%, 1);
  border-left: 1.1em solid hsl(0, 0%, 40%);
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
  border-radius: 50%;
  width: 10em;
  height: 10em;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
