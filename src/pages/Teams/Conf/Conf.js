import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 45px;
  margin: 10px 10px;
  color: #333;
  text-decoration: none;
  transition: transform 0.1s ease-in-out;

  > img {
    width: 100%;
    margin-bottom: 10px;
  }

  :hover {
    transform: scale(1.1);
  }

  @media (min-width: 500px) {
    width: 60px;
  }

  @media (min-width: 600px) {
    width: 35px;
  }

  @media (min-width: 750px) {
    width: 45px;
  }

  @media (min-width: 950px) {
    width: 65px;
  }
`;

const ConfName = styled.span`
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
  font-size: 1.4rem;
`;

const Teams = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const TeamName = styled.span`
  margin-top: auto;
  text-align: center;
`;

class Conf extends Component {
  render() {
    const { teams, name } = this.props;
    return (
      <div>
        <ConfName>{teams.length > 0 && name}</ConfName>
        <Teams>
          {teams.map(team => (
            <StyledLink key={team.teamId} to={`/teams/${team.teamId}`}>
              <img src={`${process.env.PUBLIC_URL}/assets/teamLogos/${team.teamId}.png`} alt={team.tricode} />
              <TeamName>{team.tricode}</TeamName>
            </StyledLink>
          ))}
        </Teams>
      </div>
    );
  }
}

export default Conf;
