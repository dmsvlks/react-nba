import React, { Component } from 'react';
import { oneOf, func } from 'prop-types';

import styled from 'styled-components';
import { fromEvent } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';

const SearchWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 60px;
`;
const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Search players...'
})`
  width: 100%;
  max-width: 400px;
  padding: 8px 10px;
  border: 1px solid hsl(0, 0%, 75%);
  border-radius: 3px;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.1);
`;
const Message = styled.div`
  position: absolute;
  top: 45px;
  left: 50%;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 0.9rem;
  text-align: center;
  border-radius: 3px;
  transform: translateX(-50%);

  ${props =>
    props.error && 'color: hsl(0, 30%, 20%); border: 1px solid hsl(0, 30%, 60%); background: hsl(0, 100%, 90%);'}
`;

let cachedQuery = '';

class Search extends Component {
  static propTypes = {
    searchStatus: oneOf(['default', 'searching', 'zero']).isRequired,
    onSearch: func.isRequired
  };

  constructor(props) {
    super(props);
    this.search = React.createRef();
  }

  componentDidMount() {
    this.search.current.value = cachedQuery;
    this.search.current.focus();
    fromEvent(this.search.current, 'input')
      .pipe(
        debounceTime(500),
        map(e => e.target.value),
        filter(query => query.length > 1),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.props.onSearch(query);
        cachedQuery = query;
      });

    fromEvent(this.search.current, 'input')
      .pipe(
        map(e => e.target.value),
        filter(query => query.length === 0)
      )
      .subscribe(query => this.props.onSearch(query));
  }

  render() {
    let { searchStatus } = this.props;
    return (
      <SearchWrapper>
        <Input ref={this.search} />
        {searchStatus === 'searching' && <Message>Searching...</Message>}
        {searchStatus === 'zero' && <Message error>Sorry, no players found</Message>}
      </SearchWrapper>
    );
  }
}

export default Search;
