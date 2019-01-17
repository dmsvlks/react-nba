import React from 'react';
import styled from 'styled-components';

const Image = styled.div`
  width: 100px;
  height: 100px;
  ${props => props.team && 'width: 170px;'};
  ${props => props.team && 'height: 170px;'};
  margin-bottom: 20px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  ${props => props.player && 'background-size: cover;'};
  ${props => props.player && 'background-color: #cfcfcf'};
  ${props => props.player && 'border-radius: 50%'};
`;

const Picture = ({ player, team, id, alt }) => {
  const src = player
    ? `${process.env.PUBLIC_URL}/assets/players/${id}.png`
    : team
    ? `${process.env.PUBLIC_URL}/assets/teamLogos/${id}.png`
    : null;

  return <Image className='picture' src={src} title={alt} player={player} team={team} />;
};

export default Picture;
