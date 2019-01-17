import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: bolder;
  text-align: right;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    padding-left: 10px;
  }
`;

const PlayerInfo = ({ player }) => (
  <Wrapper>
    <Left>
      <div>Date Of Birth:</div>
      <div>Height:</div>
      <div>Weight:</div>
      <div>Team:</div>
      <div>Position:</div>
      <div>Number:</div>
      <div>Debut:</div>
      <div>Draft Nr.</div>
      <div>Years pro:</div>
      <div>Country:</div>
      <div>College:</div>
    </Left>
    <Right>
      <div>{player.dateOfBirthUTC}</div>
      <div>
        {player.heightFeet}-{player.heightInches}
      </div>
      <div>{player.weightPounds}</div>
      <div>
        <Link to={`/teams/${player.teamId}`}>{player.teams.slice(-1)[0].team.fullName}</Link>
      </div>
      <div>{player.pos}</div>
      <div>{player.jersey}</div>
      <div>{player.nbaDebutYear}</div>
      <div>{player.draft.pickNum}</div>
      <div>{+player.yearsPro}</div>
      <div>{player.country}</div>
      <div>{player.collegeName}</div>
    </Right>
  </Wrapper>
);

export default PlayerInfo;
