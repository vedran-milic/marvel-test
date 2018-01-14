import React, { Component } from 'react';
import DefaultPageTemplate from '../templates/defaultTemplate';
import axios from 'axios';
import {
  BASE_URL,
  TS,
  AUTH_TOKEN,
  HASH,
  RESULTS_PER_PAGE } from '../constants/constants';
import SearchBar from '../components/searchBar/searchBar';
import CharacterList from '../components/characters/charactersList';
import Pagination from '../components/pagination/pagination';
import Callout from '../components/callouts/callouts';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      total: null,
      pages: 1,
      page: 1,
      name: null,
      searching: null,
      bookmarkedCharacters: [],
      bookmarkMessage: null,
      bookmarkType: null
    };
    this.fetchData = this.fetchData.bind(this);
    this.searchForCharacters = this.searchForCharacters.bind(this);
    this.setPage = this.setPage.bind(this);
    this.bookmarkCharacter = this.bookmarkCharacter.bind(this);
    this.getBookmarkedCharacters = this.getBookmarkedCharacters.bind(this);
    this.dismissBookmark = this.dismissBookmark.bind(this);
  }

  fetchData(name, page) {
    let scope = this;

    return axios({
      method:'get',
      url: BASE_URL+'v1/public/characters',
      params: {
        apikey: AUTH_TOKEN,
        ts: TS,
        hash: HASH.toString(),
        nameStartsWith: name || null,
        limit: RESULTS_PER_PAGE,
        offset: (page * RESULTS_PER_PAGE) - RESULTS_PER_PAGE || 0
      }
    }).then(function (response) {
      if(response.statusText === 'OK' && scope.state.searching) {
        scope.setState({
          results: response.data.data.results,
          total: response.data.data.total,
          pages: Math.floor(response.data.data.total/RESULTS_PER_PAGE),
          page: page || 1,
          searching: false
        })
      }
    });
  }

  searchForCharacters(event) {
    let scope = this,
      value = event.target.value;
      scope.setState({
        searching: true
      });
    if(value) {
      setTimeout(function() {
        scope.setState({
          name: value
        });
        scope.fetchData(value);
      }, 300);
    } else {
      scope.setState({
        results: null,
        total: null,
        pages: 1,
        page: 1,
        name: null,
        searching: null
      })
    }
  }

  setPage(page) {
    this.setState({
      searching: true
    });
    this.fetchData(this.state.name, parseInt(page, 10));
  }

  checkIfCharacterIsBookmarked(characters, character) {
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].id === character.id) {
        return i;
      }
    }
    return -1;
  }

  bookmarkCharacter(character) {
    let bookmarkedCharacters = this.state.bookmarkedCharacters,
      bookmarkMessage,
      bookmarkType,
      alreadyBookmarked = this.checkIfCharacterIsBookmarked(bookmarkedCharacters, character);

    if(alreadyBookmarked >= 0){
      bookmarkedCharacters.splice(alreadyBookmarked, 1);
      bookmarkMessage = 'Character removed from bookmarks.';
      bookmarkType = 'warning';
    } else {
      bookmarkedCharacters.push(character);
      bookmarkMessage = 'Character bookmarked. Clear search field to see it.';
      bookmarkType = 'success';
    }

    localStorage.setItem('marvelHeroes', JSON.stringify(bookmarkedCharacters));
    this.setState({
      bookmarkedCharacters,
      bookmarkMessage,
      bookmarkType
    });
  }

  getBookmarkedCharacters() {
    let charactersStorage = localStorage.getItem('marvelHeroes'),
      bookmarkedCharacters;

    if(charactersStorage) {
      bookmarkedCharacters = JSON.parse(charactersStorage);
    }

    if(bookmarkedCharacters) {
      this.setState({
        bookmarkedCharacters
      });
    }
  }

  dismissBookmark() {
    this.setState({
      bookmarkMessage: null,
      bookmarkType: null
    });
  }

  componentDidMount() {
    this.getBookmarkedCharacters();
  }

  render() {
    return (
      <div>
        <SearchBar search={this.searchForCharacters}/>
        {this.state.pages > 1 && (
          <Pagination
            totalPages={this.state.pages}
            currentPage={this.state.page}
            setPage={this.setPage}/>
        )}
        {this.state.searching && (<div className="finding-your-heroes">Working on it...</div>)}
        {this.state.results ?
          (this.state.results.length ?
            <CharacterList
              characters={this.state.results}
              bookmark={this.bookmarkCharacter}
              bookmarkedCharacters={this.state.bookmarkedCharacters}/>
          :
            <div className="no-heroes">No heroes found!</div>
          )
        :
          this.state.bookmarkedCharacters.length ?
            <CharacterList
              characters={this.state.bookmarkedCharacters}
              bookmark={this.bookmarkCharacter}
              bookmarkedCharacters={this.state.bookmarkedCharacters}/>
            :
            <div className="no-heroes">Your heroes will be displayed here, when you search them, or when you bookmark them!</div>
        }
        {this.state.pages > 1 && (
          <Pagination
            totalPages={this.state.pages}
            currentPage={this.state.page}
            setPage={this.setPage}/>
        )}
        {this.state.bookmarkMessage && (
          <Callout
            message={this.state.bookmarkMessage}
            type={this.state.bookmarkType}
            dismiss={this.dismissBookmark}
          />
        )}
      </div>
    );
  }
}

export default DefaultPageTemplate(HomeView);