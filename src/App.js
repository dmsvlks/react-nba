import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from './components';
import { Home, Players, Player, Team, Teams, Game } from './pages';

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: hsl(0, 0%, 98%);
  padding-top: 0;
  padding-bottom: 50px;
  margin: 0 auto;
`;

const MainContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  padding: 10px;
  padding-top: 20px;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Router>
          <>
            <Header>NBA</Header>
            <MainContainer>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/boxscore/:date/:id' component={Game} />
                <Route exact path='/players' component={Players} />
                <Route path='/players/:id' component={Player} />
                <Route exact path='/teams' component={Teams} />
                <Route path='/teams/:id' component={Team} />
                <Redirect to='/' />
              </Switch>
            </MainContainer>
          </>
        </Router>
      </AppWrapper>
    );
  }
}

export default App;
