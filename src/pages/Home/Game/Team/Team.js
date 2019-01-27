import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  ${props => props.away && 'margin-bottom: 15px'};
  color: ${props => props.lost && '#999'};
`;

const TeamLink = styled.div`
  display: flex;
  flex-grow: 1;
  width: 150px;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => (props.lost ? '#999' : 'hsl(0, 0%, 20%)')};

  :hover {
    text-decoration: underline;
  }
`;

const Image = styled.div`
  width: 30px;
  margin-right: 10px;
  background: url(${props => props.src}) no-repeat center bottom;
  background-size: contain;

  img {
    width: 100%;
  }
`;

const Periods = styled.div`
  display: flex;
  font-size: 0.85rem;
  align-items: center;

  > span {
    width: 30px;
    text-align: center;
  }
`;

const Score = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  width: 45px;
  margin-left: auto;
  font-size: 1.1rem;
  font-weight: bold;
`;

class Team extends Component {
  render() {
    const { data, lost, started, periods, away } = this.props;

    return (
      <Wrapper away={away} lost={lost}>
        <TeamLink>
          <StyledLink lost={lost ? 1 : 0} to={`teams/${data.teamId}`} onClick={e => e.stopPropagation()}>
            <Image lost={lost}>
              <img src={`${process.env.PUBLIC_URL}/assets/teamLogos/${data.teamId}.png`} alt={data.nickname} />
            </Image>
            <span>{data.nickname}</span>
          </StyledLink>
          <div style={{ flexGrow: 1 }} />
        </TeamLink>
        {started && (
          <Periods>
            {periods.map((_, i) => (
              <span key={i}>{data.linescore[i] ? data.linescore[i].score : 0}</span>
            ))}
          </Periods>
        )}
        <Score lost={lost}>{started && data.score}</Score>
      </Wrapper>
    );
  }
}

export default Team;
