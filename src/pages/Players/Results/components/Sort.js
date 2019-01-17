import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FadeSlideDown from '../../../../animations/FadeSlideDown';

const SortWrapper = styled.div`
  position: absolute;
  right: 0;
  margin-top: -45px;
  z-index: 999;
`;

const Button = styled.button`
  padding: 6px 10px;
  margin-bottom: 0;
  background-color: hsl(0, 0%, 98%);
  color: hsl(0, 0%, 20%);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: hsl(0, 0%, 98%);
  }

  :active {
    transform: scale(0.9);
  }
`;

const SortMenu = styled.div`
  display: inline-block;
  position: absolute;
  top: 41px;
  right: 0;
  width: 185px;
  max-height: 0;
  font-size: 0.9rem;
  text-align: left;
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  transition: all 0.15s ease-in-out;

  & > * {
    padding: 12px;
    transition: background-color 0.1s ease-in-out;
  }

  & > *:hover {
    background-color: hsl(0, 0%, 96%);
  }
`;

class Sort extends Component {
  state = {
    showMenu: false
  };

  toggleSortMenu = () => this.setState(state => ({ showMenu: !state.showMenu }));

  render() {
    const { sortBy } = this.props;
    const { showMenu } = this.state;
    return (
      <SortWrapper>
        <Button onClick={this.toggleSortMenu} open={showMenu} title='Sort'>
          <FontAwesomeIcon icon='sort' size='2x' />
        </Button>
        <FadeSlideDown in={showMenu}>
          <SortMenu>
            <div
              onClick={() => {
                sortBy('ppg');
                this.toggleSortMenu();
              }}
            >
              Points per game
            </div>
            <div
              onClick={() => {
                sortBy('rpg');
                this.toggleSortMenu();
              }}
            >
              Rebounds per game
            </div>
            <div
              onClick={() => {
                sortBy('apg');
                this.toggleSortMenu();
              }}
            >
              Assists per game
            </div>
          </SortMenu>
        </FadeSlideDown>
      </SortWrapper>
    );
  }
}

export default Sort;
