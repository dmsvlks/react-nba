import React from 'react';

const Recent = ({player, addOppTeam, addScore}) => (
  <div>
    <div className="tableTitle"><div>Last 3 games</div></div>
    <table className="table">
      <thead className="head">
        <tr>
          <th title="Date">Date</th>
          <th title="Team">TM</th>
          <th />
          <th title="Opponent">OPP</th>
          <th title="Score">SCR</th>
          <th title="Points">PTS</th>
          <th title="Total rebounds">TRB</th>
          <th title="Assists">AST</th>
        </tr>
      </thead>
      <tbody>
        {player.gamelog.map(game =>
          <tr key={game.gameId}>
            <td>
              {game.gameDateUTC}
            </td>
            <td>
              {player.teams.slice(-1)[0].team.tricode}
            </td>
            <td>
              {!game.isHomeGame && <span>@</span>}
            </td>
            <td>
              {addOppTeam(game)}
            </td>
            <td>
              {addScore(game)}
            </td>
            <td>
              {game.stats.points}
            </td>
            <td>
              {game.stats.totReb}
            </td>
            <td>
              {game.stats.assists}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Recent;