import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const Wrapper = styled.header`
  background-color: #2c447a;
`;

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 10px;

  a {
    text-decoration: none;
    color: hsl(0, 0%, 100%);
  }

  width: 100%;
  max-width: 1200px;
`;

const Title = styled.div`
  margin-right: 20px;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: -1px;
  height: 120%;
`;

const Nav = styled.nav`
  list-style: none;
  margin-bottom: -10px;

  > * {
    display: inline-block;
    margin-right: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid transparent;
    transition: all 0.1s ease-in-out;
  }
`;

const Header = props => (
  <Wrapper>
    <AppContainer>
      <Title>
        <Link style={{ display: 'flex', alignItems: 'center' }} to='/'>
          <div style={{ width: 18, marginRight: 3 }}>
            <img style={{ width: '100%' }} src={`${process.env.PUBLIC_URL}/assets/nba.gif`} alt='' />
          </div>
          {props.children}
        </Link>
      </Title>
      <Nav>
        <NavLink exact to='/' activeClassName='selected'>
          Home
        </NavLink>
        <NavLink exact to='/players' activeClassName='selected'>
          Players
        </NavLink>
        <NavLink exact to='/teams' activeClassName='selected'>
          Teams
        </NavLink>
      </Nav>
    </AppContainer>
  </Wrapper>
);

export default Header;
