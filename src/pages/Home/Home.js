import React, { Component } from 'react';
import getTime from 'date-fns/get_time';
import subHours from 'date-fns/sub_hours';
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import addDays from 'date-fns/add_days';
import isPast from 'date-fns/is_past';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getScoreboards } from '../../services/http-service';
import Game from './Game/Game';
import SidePanel from './SidePanel/SidePanel';

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  position: absolute;
  background-color: hsl(0, 0%, 98%);
  color: hsl(0, 0%, 20%);
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  ${props => props.left && 'left: 0; padding: 10px 10px 10px 0;'};
  ${props => props.right && 'right: 0; padding: 10px 0 10px 10px;'};

  :active {
    transform: scale(0.95);
  }
`;

const CenterPanel = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Navigation = styled.div`
  position: relative;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
`;

const GameDate = styled.div`
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
`;

const WeekDay = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const gamesCache = {};
let teamsCache = [];

class Home extends Component {
  state = {
    games: [],
    teams: [],
    date: null,
    showSides: false
  };

  handleResize = e => {
    if (e.target.innerWidth > 600 && !this.state.showSides) {
      this.setState({ showSides: true });
    } else if (e.target.innerWidth < 600 && this.state.showSides) {
      this.setState({ showSides: false });
    }
  };

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.dispatchEvent(new Event('resize'));

    if (teamsCache.length !== 0) {
      this.setState({ teams: teamsCache });
    } else {
      fetch('/api/2018/teams.json')
        .then(res => res.json())
        .then(res => res.league.standard.filter(team => team.isNBAFranchise))
        .then(teams => {
          teamsCache = teams;
          this.setState({ teams });
        });
    }

    this.date = format(new Date(), 'YYYYMMDD');

    if (!gamesCache[this.date]) {
      gamesCache[this.date] = await getScoreboards(this.date);
    }

    const startTime = getTime(gamesCache[this.date][0].startTimeUTC);

    if (!isPast(getTime(subHours(startTime, 8)))) {
      this.date = format(subDays(this.date, 1), 'YYYYMMDD');
    }

    this.setState({ date: this.date });

    this.updateScoreboards();
    this.interval = setInterval(() => this.updateScoreboards(), 10000);
  }

  updateScoreboards = async () => {
    const games = await getScoreboards(this.date);
    gamesCache[this.date] = games;
    this.setState({ games, date: this.date });
  };

  handlePrevClick = () => {
    this.date = format(subDays(this.date, 1), 'YYYYMMDD');
    if (gamesCache[this.date]) {
      this.setState({ games: gamesCache[this.date], date: this.date });
    } else {
      this.updateScoreboards();
    }
  };

  handleNextClick = () => {
    this.date = format(addDays(this.date, 1), 'YYYYMMDD');
    if (gamesCache[this.date]) {
      this.setState({ games: gamesCache[this.date], date: this.date });
    } else {
      this.updateScoreboards();
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { showSides, games, teams, date } = this.state;
    const westConf = teams.filter(team => team.confName === 'West');
    const eastConf = teams.filter(team => team.confName === 'East');

    return (
      <Wrapper>
        {showSides && <SidePanel teams={westConf} confName='WEST' />}

        {teams.length > 0 && (
          <CenterPanel>
            <Navigation>
              <Button onClick={this.handlePrevClick} left>
                <FontAwesomeIcon icon='chevron-left' />
              </Button>
              <Button onClick={this.handleNextClick} right>
                <FontAwesomeIcon icon='chevron-right' />
              </Button>{' '}
              */}
              <GameDate>{date && format(date, 'YYYY-MM-DD')}</GameDate>
              <WeekDay>{date && format(date, 'dddd')}</WeekDay>
            </Navigation>

            {games.map(game => (
              <Game key={game.gameId} date={date} teams={teams} data={game} />
            ))}
          </CenterPanel>
        )}

        {showSides && <SidePanel teams={eastConf} confName='EAST' />}
      </Wrapper>
    );
  }
}

export default Home;
