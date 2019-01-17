import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const CategoryWrapper = styled.div`
  width: 47%;
  min-height: 80px;
  max-width: 355px;
  margin-bottom: 25px;

  @media (min-width: 600px) {
    width: 32%;
  }
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
`;

const Body = styled(Link)`
  width: 100%;
  display: flex;
  text-decoration: none;
  border: 1px solid #cfcfcf;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.12), 0 1px 2px hsla(0, 0%, 0%, 0.24);
  transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 1px 4px -1px hsla(0, 0%, 0%, 0.1), 0 1px 3px -1px hsla(0, 0%, 0%, 0.2);
    transform: scale(1.02);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 5px;
`;

const Name = styled.div`
  color: #333;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Avg = styled.div`
  margin-top: auto;
  color: #333;
  font-size: 0.9rem;
`;

const Image = styled.div`
  width: 40%;
  margin-left: auto;

  img {
    width: 100%;
  }
`;

const Category = props => (
  <CategoryWrapper>
    <Title>{props.children}</Title>
    <Body to={`/players/${props.player.personId}`}>
      <Info>
        <Name>{props.fullName}</Name>
        <Avg>{props.perc ? `${(props.player.value * 100).toFixed(1)}%` : props.player.value}</Avg>
      </Info>
      <Image>
        <img src={`${process.env.PUBLIC_URL}/assets/players/${props.player.personId}.png`} alt={`${props.fullName}`} />
      </Image>
    </Body>
  </CategoryWrapper>
);

export default Category;
