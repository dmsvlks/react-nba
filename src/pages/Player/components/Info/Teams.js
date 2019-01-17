import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > div div:not(:first-child) {
    padding-left: 10px;
    margin-bottom: 5px;
  }
`;

const Teams = ({teams}) => (
  <Wrapper>
    <div>
      <div style={{marginBottom: '10px'}}>Career:</div>
      {teams.map((team, index) =>
        <div key={index}>
          {team.seasonStart}-{team.seasonEnd}: <Link to={'/teams/' + team.teamId}>{team.team.fullName}</Link>
        </div>
      )}
    </div>
  </Wrapper>
);

export default Teams;