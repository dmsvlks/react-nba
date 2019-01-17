import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Picture, Loader } from '../../components';
import { Category } from './components';
import { searchTeamById } from '../../services/http-service';
import FadeDown from '../../animations/FadeDown';
import FadeScaleUp from '../../animations/FadeScaleUp';
import './styles.css';

const cachedTeams = {};

class Team extends Component {
  state = {
    team: null
  };

  componentWillMount() {
    const teamId = this.props.match.params.id;
    this.setState({ team: cachedTeams[teamId] });
  }

  async componentDidMount() {
    const teamId = this.props.match.params.id;
    if (!this.state.team) {
      const team = await searchTeamById(teamId);
      this.setState({ team });
      cachedTeams[teamId] = team;
    }
  }

  addName = personId => {
    const player = this.state.team.roster.filter(el => el.personId === personId)[0];
    return `${player.firstName} ${player.lastName}`;
  };

  render() {
    const team = this.state.team;
    if (team) {
      return (
        <div>
          <FadeDown>
            <div className='teamName'>{team.fullName}</div>
          </FadeDown>

          <div className='info'>
            <FadeScaleUp>
              <Picture team id={team.teamId} alt={team.fullName} />
            </FadeScaleUp>
            <FadeDown>
              <div className='teamInfo'>
                <div className='left'>
                  <div>Conference:</div>
                  <div>Division:</div>
                  <div>City:</div>
                  <div>Head Coach:</div>
                </div>
                <div className='right'>
                  <div>{team.confName}</div>
                  <div>{team.divName}</div>
                  <div>{team.city}</div>
                  <div>
                    {team.coachingStaff[0].firstName} {team.coachingStaff[0].lastName}
                  </div>
                </div>
              </div>
            </FadeDown>
          </div>

          <FadeDown>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className='season-statistics'>
                <table className='table' style={{ margin: 0 }}>
                  <thead className='head'>
                    <tr>
                      <th title='Wins'>W</th>
                      <th title='Losses'>L</th>
                      <th title='Win percentage'>W%</th>
                      <th title='Conference ranking'>Con</th>
                      <th title='Division ranking'>Div</th>
                      <th title='Home wins'>HW</th>
                      <th title='Home losses'>HL</th>
                      <th title='Away wins'>AW</th>
                      <th title='Away losses'>AL</th>
                      <th title='Last 10 games record'>L10</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{team.seasonStats.win}</td>
                      <td>{team.seasonStats.loss}</td>
                      <td>{team.seasonStats.winPctV2}</td>
                      <td>{team.seasonStats.confRank}</td>
                      <td>{team.seasonStats.divRank}</td>
                      <td>{team.seasonStats.homeWin}</td>
                      <td>{team.seasonStats.homeLoss}</td>
                      <td>{team.seasonStats.awayWin}</td>
                      <td>{team.seasonStats.awayLoss}</td>
                      <td>
                        {team.seasonStats.lastTenWin} / {team.seasonStats.lastTenLoss}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div className='tableTitle'>
                  <div>Team ranking</div>
                </div>
                <table className='table team-rankings'>
                  <thead className='head'>
                    <tr>
                      <th />
                      <th title='Points per game'>PPG</th>
                      <th title='Opponent points per game'>OPPG</th>
                      <th title='Efficiency'>EFF</th>
                      <th title='Field goal percentage'>FG%</th>
                      <th title='Three point percentage'>3P%</th>
                      <th title='Free throw percentage'>FT%</th>
                      <th title='Total rebounds per game'>TRPG</th>
                      <th title='Assists per game'>APG</th>
                      <th title='Steals per game'>SPG</th>
                      <th title='Blocks per game'>BPG</th>
                      <th title='Turnovers per game'>TPG</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>AVG</td>
                      <td>{team.teamStats.ppg.avg}</td>
                      <td>{team.teamStats.oppg.avg}</td>
                      <td>{team.teamStats.eff.avg}</td>
                      <td>{team.teamStats.fgp.avg}</td>
                      <td>{team.teamStats.tpp.avg}</td>
                      <td>{team.teamStats.ftp.avg}</td>
                      <td>{team.teamStats.trpg.avg}</td>
                      <td>{team.teamStats.apg.avg}</td>
                      <td>{team.teamStats.spg.avg}</td>
                      <td>{team.teamStats.bpg.avg}</td>
                      <td>{team.teamStats.tpg.avg}</td>
                    </tr>
                    <tr>
                      <td>Rank</td>
                      <td>{team.teamStats.ppg.rank}</td>
                      <td>{team.teamStats.oppg.rank}</td>
                      <td>{team.teamStats.eff.rank}</td>
                      <td>{team.teamStats.fgp.rank}</td>
                      <td>{team.teamStats.tpp.rank}</td>
                      <td>{team.teamStats.ftp.rank}</td>
                      <td>{team.teamStats.trpg.rank}</td>
                      <td>{team.teamStats.apg.rank}</td>
                      <td>{team.teamStats.spg.rank}</td>
                      <td>{team.teamStats.bpg.rank}</td>
                      <td>{team.teamStats.tpg.rank}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div className='tableTitle'>
                  <div>Roster</div>
                </div>
                <table className='table'>
                  <thead className='head'>
                    <tr>
                      <th title='Jersey Number'>No.</th>
                      <th title='Name'>Player</th>
                      <th title='Position'>Pos</th>
                      <th title='Height'>Ht</th>
                      <th title='Weight'>Wt</th>
                      <th title='Date Of Birth'>Birthday</th>
                      <th title='Country'>C</th>
                      <th title='Years Pro'>Yrs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.roster.map(player => (
                      <tr key={player.personId}>
                        <td>{player.jersey}</td>
                        <td>
                          <Link to={`/players/${player.personId}`}>
                            {player.firstName} {player.lastName}
                          </Link>
                        </td>
                        <td>{player.pos}</td>
                        <td>
                          {player.heightFeet}-{player.heightInches}
                        </td>
                        <td>{player.weightPounds}</td>
                        <td>{player.dateOfBirthUTC}</td>
                        <td title={`${player.country}`}>{player.country.toUpperCase().slice(0, 3)}</td>
                        <td>{+player.yearsPro + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className='tableTitle'>
                  <div>Team leaders</div>
                </div>
                {team.leaders.ppg.length !== 0 && (
                  <div className='leaders'>
                    <Category player={team.leaders.ppg[0]} fullName={this.addName(team.leaders.ppg[0].personId)}>
                      Points per game
                    </Category>

                    <Category player={team.leaders.trpg[0]} fullName={this.addName(team.leaders.trpg[0].personId)}>
                      Rebounds per game
                    </Category>

                    <Category player={team.leaders.apg[0]} fullName={this.addName(team.leaders.apg[0].personId)}>
                      Assists per game
                    </Category>

                    <Category perc player={team.leaders.fgp[0]} fullName={this.addName(team.leaders.fgp[0].personId)}>
                      Field goal %
                    </Category>

                    <Category perc player={team.leaders.tpp[0]} fullName={this.addName(team.leaders.tpp[0].personId)}>
                      3 point %
                    </Category>

                    <Category perc player={team.leaders.ftp[0]} fullName={this.addName(team.leaders.ftp[0].personId)}>
                      Free throw %
                    </Category>

                    <Category player={team.leaders.spg[0]} fullName={this.addName(team.leaders.spg[0].personId)}>
                      Steals per game
                    </Category>

                    <Category player={team.leaders.bpg[0]} fullName={this.addName(team.leaders.bpg[0].personId)}>
                      Blocks per game
                    </Category>
                  </div>
                )}
              </div>
            </div>
          </FadeDown>
        </div>
      );
    } else return <Loader />;
  }
}

export default Team;
