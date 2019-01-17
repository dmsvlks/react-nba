import React from 'react';
import { Link } from 'react-router-dom';
import { shape, string, number } from 'prop-types';
import styled from 'styled-components';

const Name = styled.div`
  position: relative;
  min-height: 50px;
  padding: 10px 5px;
  color: hsl(0, 0%, 10%);
  font-weight: bold;
  font-size: 0.7rem;
  transition: all 0.15s ease-in-out;

  @media (min-width: 900px) {
    font-size: 0.9rem;
  }
`;

const Image = styled.div`
  width: 100%;
  background: linear-gradient(0deg, hsl(0, 0%, 100%), hsl(0, 0%, 88%));
  overflow: hidden;
  transition: all 1s ease-in-out;

  > img {
    width: 100%;
  }
`;

const PlayerCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  background-color: hsl(0, 0%, 99%);
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0 2px 10px -2px hsla(0, 0%, 0%, 0.2);
    transform: scale(1.03);
    text-decoration: none;

    ${Image} {
      background: linear-gradient(0deg, hsl(0, 0%, 100%), hsl(0, 0%, 90%));
    }
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 5px;

  > div {
    color: hsl(0, 0%, 20%);
    font-size: 0.75rem;
  }

  @media (min-width: 600px) {
    padding: 10px;
    padding-top: 5px > div {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 900px) {
    > div {
      font-size: 0.9rem;
    }
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30px;
  justify-content: space-between;
`;

class PlayerCard extends React.Component {
  constructor() {
    super();
    this.imageWrap = React.createRef();
    this.wrapper = React.createRef();
  }

  handleResize = () => {
    // this.imageWrap.current.style.height = `${this.imageWrap.current.clientWidth}px`;
    // this.wrapper.current.style.height = `${this.wrapper.current.clientWidth * 1.4}px`;
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { player } = this.props;
    return (
      <PlayerCardWrapper ref={this.wrapper}>
        <Link style={{ textDecoration: 'none' }} to={`/players/${player.personId}`}>
          <Image ref={this.imageWrap}>
            <Name>{player.name}</Name>
            <img src={`${process.env.PUBLIC_URL}/assets/players/${player.personId}.png`} alt={player.name} />
          </Image>
          <Stats>
            <Category>
              <div>PPG</div>
              <div style={{ fontWeight: 'bold' }}>{player.ppg}</div>
            </Category>
            <Category>
              <div>RPG</div>
              <div style={{ fontWeight: 'bold' }}>{player.rpg}</div>
            </Category>
            <Category>
              <div>APG</div>
              <div style={{ fontWeight: 'bold' }}>{player.apg}</div>
            </Category>
          </Stats>
        </Link>
      </PlayerCardWrapper>
    );
  }
}

PlayerCard.propTypes = {
  player: shape({
    name: string,
    personId: string,
    ppg: number,
    rpg: number,
    apg: number
  }).isRequired
};

export default PlayerCard;
