import React from 'react';
import styled from 'styled-components';
import { arrayOf, object, func } from 'prop-types';
import FlipMove from 'react-flip-move';
import PlayerCard from './components/PlayerCard';
import Sort from './components/Sort';

const enterAnimation = {
  from: { opacity: 0, transform: 'translateY(-15px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
};
const leaveAnimation = {
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(-15px)' }
};

const CardWrapper = styled.div`
  display: inline-block;
  width: 28%;
  margin: 0 5px;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    width: 19%;
  }

  @media (min-width: 700px) {
    width: 15.5%;
  }

  @media (min-width: 900px) {
    width: 13.5%;
  }
`;

const Players = ({ results, children }) => (
  <FlipMove
    duration={200}
    enterAnimation={enterAnimation}
    leaveAnimation={leaveAnimation}
    staggerDelayBy={10}
    style={{
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}
  >
    {children}
    {results.map(player => (
      <CardWrapper key={player.personId}>
        <PlayerCard player={player} />
      </CardWrapper>
    ))}
  </FlipMove>
);

const Results = ({ results, sortBy }) => (
  <div>
    <Players results={results}>{results.length > 1 && <Sort sortBy={sortBy} />}</Players>
  </div>
);

Results.propTypes = {
  results: arrayOf(object).isRequired,
  sortBy: func.isRequired
};

export default Results;
