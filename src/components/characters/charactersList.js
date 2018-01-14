import React from 'react';
import Character from './character';
import './charactersList.css';

const CharacterList = (props) => {
  return(
    <ul className="characters-list">
      {props.characters.map(character => {
        return <Character
          key={character.id}
          character={character}
          bookmark={props.bookmark}
          bookmarkedCharacters={props.bookmarkedCharacters}/>;
      })}
    </ul>
  );
};

export default CharacterList;