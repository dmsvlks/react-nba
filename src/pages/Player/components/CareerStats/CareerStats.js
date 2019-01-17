import React from 'react';

const CareerStats = ({ stats, addTeam }) => {
  const renderStats = stats => {
    const arr = [].concat(...stats.regularSeason.season.map(season => ([...season.teams.map(team => ({ year: season.seasonYear, ...team }))])))
      .sort((a, b) => a.year - b.year);

    const maxValues = {...arr[0]};

    for (let season of arr) {
      for (let key in season) {
        if (Number(season[key]) > Number(maxValues[key])) {
          maxValues[key] = season[key];
        }
      }
    }

    const ifMaxValue = (value, key) => Number(value) === Number(maxValues[key]) ? true : false;

    return arr.map((year, id) => (
      <tr key={id}>
          <td>{year.year}</td>
          <td>{addTeam(year.teamId)}</td>
          <td style={ifMaxValue(year.gamesPlayed, 'gamesPlayed') ? {fontWeight: 'bold'} : {} }>{year.gamesPlayed < 0 ? 0 : year.gamesPlayed}</td>
          <td style={ifMaxValue(year.gamesStarted, 'gamesStarted') ? {fontWeight: 'bold'} : {} }>{year.gamesStarted < 0 ? 0 : year.gamesStarted}</td>
          <td style={ifMaxValue(year.mpg, 'mpg') ? {fontWeight: 'bold'} : {} }>{year.mpg < 0 ? 0 : year.mpg}</td>
          <td style={ifMaxValue(year.fgp, 'fgp') ? {fontWeight: 'bold'} : {} }>{year.fgp < 0 ? 0 : year.fgp}%</td>
          <td style={ifMaxValue(year.ftp, 'ftp') ? {fontWeight: 'bold'} : {} }>{year.ftp < 0 ? 0 : year.ftp}%</td>
          <td style={ifMaxValue(year.rpg, 'rpg') ? {fontWeight: 'bold'} : {} }>{year.rpg < 0 ? 0 : year.rpg}</td>
          <td style={ifMaxValue(year.apg, 'apg') ? {fontWeight: 'bold'} : {} }>{year.apg < 0 ? 0 : year.apg}</td>
          <td style={ifMaxValue(year.spg, 'spg') ? {fontWeight: 'bold'} : {} }>{year.spg < 0 ? 0 : year.spg}</td>
          <td style={ifMaxValue(year.bpg, 'bpg') ? {fontWeight: 'bold'} : {} }>{year.bpg < 0 ? 0 : year.bpg}</td>
          <td style={ifMaxValue(year.ppg, 'ppg') ? {fontWeight: 'bold'} : {} }>{year.ppg < 0 ? 0 : year.ppg}</td>
      </tr>
    ))
  }

  return (
    <div>
      <div className="tableTitle"><div>Seasons statistics</div></div>
      <table className="table season">
        <thead className="head">
          <tr>
            <th title="Year">Year</th>
            <th title="Team">TM</th>
            <th title="Games played">GP</th>
            <th title="Games started">GS</th>
            <th title="Minutes per game">MPG</th>
            <th title="Field goal percentage">FG%</th>
            <th title="Free throw percentage">FT%</th>
            <th title="Rebounds per game">RPG</th>
            <th title="Assists per game">APG</th>
            <th title="Steals per game">SPG</th>
            <th title="Blocks per game">BPG</th>
            <th title="Points per game">PPG</th>
          </tr>
        </thead>
        <tbody>
          {renderStats(stats)}
          <tr>
            <td>Career</td>
            <td />
            <td>{stats.careerSummary.gamesPlayed}</td>
            <td>{stats.careerSummary.gamesStarted}</td>
            <td>{stats.careerSummary.mpg}</td>
            <td>{stats.careerSummary.fgp}%</td>
            <td>{stats.careerSummary.ftp}%</td>
            <td>{stats.careerSummary.rpg}</td>
            <td>{stats.careerSummary.apg}</td>
            <td>{stats.careerSummary.spg}</td>
            <td>{stats.careerSummary.bpg}</td>
            <td>{stats.careerSummary.ppg}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default CareerStats;