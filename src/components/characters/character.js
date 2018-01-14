import React from 'react';

export const Character = (props) => {
  let bookmarkedCharacters,
    bookmarked;

  if(props.bookmarkedCharacters) {
    bookmarkedCharacters = props.bookmarkedCharacters;
  } else {
    bookmarkedCharacters = [];
  }

  for(let i = 0; i < bookmarkedCharacters.length; i++) {
    if(bookmarkedCharacters[i].id === props.character.id) {
      bookmarked = true;
    }
  }

  return(
    <li className="character">
      <div className="wrap">
        <div className="character-image" style={{
          background: `url(${props.character.thumbnail.path}.${props.character.thumbnail.extension}) center no-repeat`,
          backgroundSize: 'cover'
        }}/>
        <h3 className="character-name">{props.character.name}</h3>
        <button className={bookmarked ? 'bookmark active' : 'bookmark'} onClick={() => props.bookmark(props.character)}>★</button>
      </div>
    </li>
  );
};

export default Character;