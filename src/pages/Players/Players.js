import React, { Component } from 'react';

import Search from './Search/Search';
import Results from './Results/Results';
import { searchPlayer } from '../../services/http-service';

let cachedResults = [];

class Players extends Component {
  state = {
    results: [],
    searchStatus: 'default'
  };

  componentDidMount() {
    this.setState({ results: cachedResults });
  }

  newSearch = async query => {
    if (query === '') {
      this.setState({ results: [] });
      return;
    }

    this.setState({ searchStatus: 'searching' });

    const results = await searchPlayer(query);
    if (results.length === 0) {
      this.setState({ results, searchStatus: 'zero' });
    } else {
      cachedResults = results;
      this.setState({ results, searchStatus: 'default' });
    }
  };

  handleSort = key => {
    const { results } = this.state;

    switch (key) {
      case 'ppg':
        this.setState({ results: results.sort((a, b) => b.ppg - a.ppg) });
        break;
      case 'rpg':
        this.setState({ results: results.sort((a, b) => b.rpg - a.rpg) });
        break;
      case 'apg':
        this.setState({ results: results.sort((a, b) => b.apg - a.apg) });
        break;
      default:
        console.warn('Invalid sort key provided');
    }
  };

  render() {
    const { results, searchStatus } = this.state;

    return (
      <div>
        <Search searchStatus={searchStatus} onSearch={this.newSearch} />
        <Results results={results} sortBy={this.handleSort} />
      </div>
    );
  }
}

export default Players;
