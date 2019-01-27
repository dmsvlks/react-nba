import React, { Component } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  max-width: 920px;
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 hsla(0, 0%, 0%, 0.2);
  margin-bottom: 20px;
`;

const Stat = styled.div`
  width: 70px;
  min-width: 60px;
  max-width: 60px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  height: 30px;
  margin-left: -15px;
  padding-left: 15px;
  margin-right: -15px;
  padding-right: 15px;

  :hover {
    background-color: hsl(0, 0%, 97%);
  }
`;

const Image = styled.div`
  width: 15px;
  margin-right: 5px;
  background: url(${props => props.src}) no-repeat center bottom;
  background-size: contain;

  img {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  color: hsl(0, 0%, 20%);
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

class Boxscore extends Component {
  state = {
    allPlayers: []
  };

  componentDidMount() {
    fetch('/api/2018/players.json')
      .then(res => res.json())
      .then(res => {
        return res.league.standard.map(player => ({
          personId: player.personId,
          name: `${player.firstName} ${player.lastName}`
        }));
      })
      .then(players => this.setState({ allPlayers: players }));
  }

  render() {
    const { players, totals, team } = this.props;
    const { allPlayers } = this.state;

    return (
      <Wrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            padding: 15,
            backgroundColor: 'hsl(0, 0%, 95%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 150, fontWeight: 'bold' }}>
            <Image>
              <img src={`${process.env.PUBLIC_URL}/assets/teamLogos/${team.teamId}.png`} alt={team.fullName} />
            </Image>
            {team.nickname}
          </div>
          <Stat>MIN</Stat>
          <Stat>FG</Stat>
          <Stat>3PT</Stat>
          <Stat>FT</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>OREB</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>DREB</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>REB</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>AST</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>STL</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>BLK</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>TO</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>PF</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>+/-</Stat>
          <Stat style={{ minWidth: 40, maxWidth: 50 }}>PTS</Stat>
        </div>
        <div style={{ padding: 15, paddingTop: 0, paddingBottom: 0 }}>
          {players.map((player, index) => (
            <Row
              key={player.personId}
              style={{
                paddingBottom: index === 4 && 5,
                paddingTop: index === 5 && 5,
                borderBottom: index === 4 && '1px solid hsl(0, 0%, 75%)'
              }}
            >
              <div
                style={{
                  width: 150,
                  minWidth: 150,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <StyledLink to={`/players/${player.personId}`}>
                  {allPlayers.length > 0 && allPlayers.find(allPlayer => allPlayer.personId === player.personId).name}{' '}
                  <span style={{ fontSize: '0.7rem' }}>{player.pos}</span>
                </StyledLink>
              </div>
              <Stat>{player.min.slice(0, player.min.indexOf(':'))}</Stat>
              <Stat>
                {player.fgm}-{player.fga}
              </Stat>
              <Stat>
                {player.tpm}-{player.tpa}
              </Stat>
              <Stat>
                {player.ftm}-{player.fta}
              </Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.offReb}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.defReb}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.totReb}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.assists}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.steals}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.blocks}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.turnovers}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>{player.pFouls}</Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50 }}>
                {player.plusMinus > 0 && '+'}
                {player.plusMinus}
              </Stat>
              <Stat style={{ minWidth: 40, maxWidth: 50, fontWeight: 'bold' }}>{player.points}</Stat>
            </Row>
          ))}
        </div>
        <div style={{ padding: 15, backgroundColor: 'hsl(0, 0%, 95%)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ minWidth: 150 }} />
            <Stat />
            <Stat>
              {totals.fgm}-{totals.fga}
            </Stat>
            <Stat>
              {totals.tpm}-{totals.tpa}
            </Stat>
            <Stat>
              {totals.ftm}-{totals.fta}
            </Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.offReb}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.defReb}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.totReb}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.assists}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.steals}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.blocks}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.turnovers}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.pFouls}</Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>
              {totals.plusMinus > 0 && '+'}
              {totals.plusMinus}
            </Stat>
            <Stat style={{ minWidth: 40, maxWidth: 50 }}>{totals.points}</Stat>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              marginTop: 10
            }}
          >
            <div style={{ minWidth: 150 }} />
            <Stat />
            <Stat>{((totals.fgm / totals.fga) * 100).toFixed(1)}%</Stat>
            <Stat>{((totals.tpm / totals.tpa) * 100).toFixed(1)}%</Stat>
            <Stat>{((totals.ftm / totals.fta) * 100).toFixed(1)}%</Stat>
            <Stat />
            <Stat />
            <Stat />
            <Stat />
            <Stat />
            <Stat />
            <Stat />
            <Stat />
            <Stat />
            <Stat />
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Boxscore;
