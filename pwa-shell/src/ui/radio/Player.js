import React from 'react';

const Player = ({ url, imgPlay, imgStop }) => {
  return (
    <div className="Player">
      <a href={url} target={'_blank'}>
        <img src={imgPlay} alt={'radio esercito'} />
      </a>
    </div>
  );
};

export default Player;