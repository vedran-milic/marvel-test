import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios'
import {
  BASE_URL,
  TS,
  AUTH_TOKEN,
  HASH
} from './constants/constants';
import HomeView from './views/homeView';
import SearchBar from './components/searchBar/searchBar';


describe('App testing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HomeView /> );
  });

  describe('search test', () => {
    let searchComponent;

    it('should render <SearchBar /> component', () => {
      searchComponent = wrapper.find(SearchBar);
      expect(
        searchComponent.length
      ).toBe(1);
    });

    it('search should contain input', () => {
      expect(
        searchComponent.containsMatchingElement(
          <input type="text"/>
        )).toBe(true);
    });

    describe('user enters text inside input', () => {
      const item = 'a';
      let input;

      beforeEach(() => {
        input = searchComponent.find('.search-bar input');
        input.value = item;
        input.simulate('change');

      });

      it('should update input value', () => {
        expect(
          input.value
        ).toBe(item);
      });

      describe('state gets updated - mocked up data', function() {
        it('should return character data status text OK and array of data greater than 0', () => {
          expect.assertions(3);

          return axios({
            method:'get',
            url: BASE_URL+'v1/public/characters',
            params: {
              apikey: AUTH_TOKEN,
              ts: TS,
              hash: HASH.toString()
            }
          }).then(function (response) {
            expect(response).toBeDefined();
            expect(response.statusText).toBe('OK');
            expect(response.data.data.results.length).toBeGreaterThan(0);
          });
        });

        it('should return an array of results by name and limit', () => {
          expect.assertions(2);

          return axios({
            method:'get',
            url: BASE_URL+'v1/public/characters',
            params: {
              apikey: AUTH_TOKEN,
              ts: TS,
              hash: HASH.toString(),
              nameStartsWith: 'a',
              limit: 1
            }
          }).then(function (response) {
            expect(response).toBeDefined();
            expect(response.data.data.results.length).toBe(1);
          });
        });
      });
    });
  });
});


