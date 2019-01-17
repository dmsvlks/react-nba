import React, { Component } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 920px;
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 hsla(0, 0%, 0%, 0.2);
  padding: 15px;
  margin-bottom: 20px;
`;

const BoxscoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  background-color: hsl(0, 0%, 108%);
`;

const Main = styled.div`
  padding: 5px;
`;

const Info = styled.span`
  flex-grow: 1;
  align-self: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: bold;

  color: ${props => (props.active ? 'hsl(0, 80%, 55%);' : 'hsl(0, 0%, 20%);')};
`;

const TeamWrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 0.9rem;
  ${props => props.away && 'margin-bottom: 15px'};
  color: ${props => props.lost && '#999'};
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => (props.lost ? '#999' : 'hsl(0, 0%, 20%)')};

  :hover {
    text-decoration: underline;
  }
`;

const Image = styled.div`
  width: 50px;
  background: url(${props => props.src}) no-repeat center bottom;
  background-size: contain;

  img {
    width: 100%;
  }
`;

const Periods = styled.div`
  display: flex;
  font-size: 0.9rem;
  align-items: center;

  > span {
    width: 30px;
    text-align: center;
  }
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 30px;
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: bold;
`;

class Team extends Component {
  render() {
    const { data, lost, periods, away } = this.props;
    return (
      <TeamWrapper away={away} lost={lost}>
        <span style={{ width: 35 }}>{data.triCode}</span>
        <Periods>
          {periods.map((_, i) => (
            <span key={i}>{data.linescore[i] ? data.linescore[i].score : 0}</span>
          ))}
        </Periods>
        <Score lost={lost}>{data.score}</Score>
      </TeamWrapper>
    );
  }
}

class Header extends Component {
  constructor() {
    super();
    this.periods = [0, 1, 2, 3];
  }

  getPeriodText = data => {
    const { isEndOfPeriod, current } = data.period;
    if (isEndOfPeriod) {
      switch (current) {
        case 1:
          return 'End of 1st';
        case 2:
          return 'Halftime';
        case 3:
          return 'End of 3rd';
        case 4:
          return 'End of 4th';
        case 5:
          return 'End of OT';
        case 6:
          return 'End of OT2';
        default:
      }
    } else {
      switch (current) {
        case 1:
          return `${data.clock} - 1st`;
        case 2:
          return `${data.clock} - 2nd`;
        case 3:
          return `${data.clock} - 3rd`;
        case 4:
          return `${data.clock} - 4th`;
        case 5:
          return `${data.clock} - OT`;
        case 6:
          return `${data.clock} - OT2`;
        default:
          return 'Starting';
      }
    }
  };

  getInfoText = data => {
    if (data.isGameActivated) {
      return this.getPeriodText(data);
    } else if (isPast(data.startTimeUTC)) {
      return 'Final';
    } else {
      return format(data.startTimeUTC, 'h:mm A');
    }
  };

  render() {
    const { data } = this.props;

    if (data.hTeam.linescore.length > 4) {
      this.periods = data.hTeam.linescore;
    }

    const vLost = Number(data.vTeam.score) < Number(data.hTeam.score) && !data.isGameActivated;
    const hLost = Number(data.hTeam.score) < Number(data.vTeam.score) && !data.isGameActivated;

    return (
      <Wrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledLink lost={vLost ? 1 : 0} to={`teams/${data.vTeam.teamId}`}>
            <span style={{ width: 130, textAlign: 'center', marginRight: 10 }}>{data.vTeam.fullName}</span>
            <Image>
              <img
                src={`${process.env.PUBLIC_URL}/assets/teamLogos/${data.vTeam.teamId}.png`}
                alt={data.vTeam.fullName}
              />
            </Image>
          </StyledLink>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: vLost && '#999', margin: '0 30px' }}>
            {data.vTeam.score}
          </div>
        </div>
        <div>
          <BoxscoreHeader>
            <Info active={data.isGameActivated}>{this.getInfoText(data)}</Info>
            <Periods>
              <span style={{ width: 35 }} />
              {this.periods.map((_, i) => (
                <span key={i}>{i === 5 ? 'OT2' : i === 4 ? 'OT' : i + 1}</span>
              ))}
            </Periods>
            <div style={{ width: 30 }} />
          </BoxscoreHeader>
          <Main>
            <Team data={data.vTeam} periods={this.periods} lost={vLost ? 1 : 0} away />
            <Team data={data.hTeam} periods={this.periods} lost={hLost ? 1 : 0} />
          </Main>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: hLost && '#999', margin: '0 30px' }}>
            {data.hTeam.score}
          </div>
          <StyledLink lost={hLost ? 1 : 0} to={`teams/${data.hTeam.teamId}`}>
            <Image lost={hLost ? 1 : 0}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/teamLogos/${data.hTeam.teamId}.png`}
                alt={data.hTeam.fullName}
              />
            </Image>
            <span style={{ width: 130, textAlign: 'center', marginLeft: 10 }}>{data.hTeam.fullName}</span>
          </StyledLink>
        </div>
      </Wrapper>
    );
  }
}

export default Header;
