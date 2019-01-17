import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 42px;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  min-height: 50px;
  color: hsl(0, 0%, 20%);
  text-decoration: none;
  margin-bottom: 20px;
  transition: transform 0.15s ease-in-out;

  > img {
    width: 100%;
    margin-bottom: 5px;
  }

  > span {
    margin-top: auto;
    font-size: 0.8rem;
    text-align: center;
  }

  :hover {
    transform: scale(1.1);
  }
`;

const ConfName = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

class SidePanel extends Component {
  render() {
    const { teams, confName } = this.props;
    return (
      <Wrapper>
        {teams.length !== 0 && <ConfName>{confName}</ConfName>}
        {teams.map(team => (
          <StyledLink key={team.teamId} to={`/teams/${team.teamId}`}>
            <img src={`${process.env.PUBLIC_URL}/assets/teamLogos/${team.teamId}.png`} alt={team.nickname} />
            <span>{team.tricode}</span>
          </StyledLink>
        ))}
      </Wrapper>
    );
  }
}

export default SidePanel;
