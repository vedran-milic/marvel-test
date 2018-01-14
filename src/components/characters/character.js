import React from 'react';

export const Character = (props) => {
  let bookmarkedCharacters;

  if(props.bookmarkedCharacters) {
    bookmarkedCharacters = props.bookmarkedCharacters;
  } else {
    bookmarkedCharacters = [];
  }

  return(
    <li className="character">
      <div className="wrap">
        <div className="character-image" style={{
          background: `url(${props.character.thumbnail.path}.${props.character.thumbnail.extension}) center no-repeat`,
          backgroundSize: 'cover'
        }}/>
        <h3 className="character-name">{props.character.name}</h3>
        <button className={bookmarkedCharacters.indexOf(props.character) !== -1 ? 'bookmark active' : 'bookmark'} onClick={() => props.bookmark(props.character)}>★</button>
      </div>
    </li>
  );
};

export default Character;