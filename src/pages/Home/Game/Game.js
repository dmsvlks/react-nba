import React, { Component } from 'react';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Team from './Team/Team';

const Wrapper = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-flow: column;
  background-color: hsl(0, 0%, 100%);
  margin: 0 auto 20px auto;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 hsla(0, 0%, 0%, 0.2);
`;

const Header = styled.div`
  display: flex;
  padding: 10px;
  background-color: hsl(0, 0%, 94%);
`;

const Main = styled.div`
  padding: 10px;
`;

const Info = styled.span`
  flex-grow: 1;
  font-size: 0.9rem;
  font-weight: bold;

  color: ${props => (props.active ? 'hsl(0, 80%, 55%);' : 'hsl(0, 0%, 40%);')};
`;

const Periods = styled.div`
  display: flex;
  font-size: 0.9rem;
  align-items: center;
  color: hsl(0, 0%, 40%);
  font-weight: bold;

  > span {
    width: 30px;
    text-align: center;
  }
`;

class Game extends Component {
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
        case 7:
          return 'End of OT3';
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
        case 7:
          return `${data.clock} - OT3`;
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
    const { data, teams } = this.props;

    data.vTeam.nickname = teams.find(({ teamId }) => teamId === data.vTeam.teamId).nickname;
    data.hTeam.nickname = teams.find(({ teamId }) => teamId === data.hTeam.teamId).nickname;

    if (data.hTeam.linescore.length > 4) {
      this.periods = data.hTeam.linescore;
    }

    const started = isPast(data.startTimeUTC);

    return (
      <Wrapper>
        <Link
          style={{ textDecoration: 'none', color: 'hsl(0, 0%, 20%)' }}
          to={`/boxscore/${this.props.date}/${this.props.data.gameId}`}
        >
          <Header>
            <Info active={data.isGameActivated}>{this.getInfoText(data)}</Info>
            {started && (
              <Periods>
                {this.periods.map((_, i) => (
                  <span key={i}>{i === 6 ? 'OT3' : i === 5 ? 'OT2' : i === 4 ? 'OT' : i + 1}</span>
                ))}
              </Periods>
            )}
            <div style={{ width: 45 }} />
          </Header>

          <Main>
            <Team
              data={data.vTeam}
              periods={this.periods}
              lost={Number(data.vTeam.score) < Number(data.hTeam.score) && !data.isGameActivated}
              started={started}
              away
            />
            <Team
              data={data.hTeam}
              periods={this.periods}
              lost={Number(data.hTeam.score) < Number(data.vTeam.score) && !data.isGameActivated}
              started={started}
            />
          </Main>
        </Link>
      </Wrapper>
    );
  }
}

export default Game;
