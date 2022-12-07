import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function GameCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [gameTitle, setTitle] = useState('');
  const [gameConsole, setConsole] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [gameCondition, setCondition] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setTitle(props.game.gameTitle);
    setConsole(props.game.gameConsole);
    setReleaseYear(props.game.releaseYear);
    setCondition(props.game.gameCondition);
  }, []);

  const updateGame = () => {
    const updatedGameData = {gameTitle:gameTitle, gameConsole:gameConsole, releaseYear:releaseYear, gameCondition:gameCondition, id:props.game.id};
    props.updateGame(updatedGameData);
    setEditMode(false);
  };

  return (
    <div className="card mb-5">
      <img src={props.game.image} alt="Cover art missing" className="card-img-top mx-auto" />
      {!editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center fst-italic">{props.game.gameTitle}</li>
          <li className="list-group-item text-center fst-italic">{props.game.gameConsole}</li>
          <li className="list-group-item text-center fw-bold">{props.game.releaseYear}</li>
          <li className="list-group-item text-center">{props.game.gameCondition}</li>
          <button type="button" className="btn btn-sm btn-warning" onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => props.removeGame(props.game)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </ul>
      )}
      {editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center fst-italic">
            <input
              type="text"
              className="form-control"
              value={gameTitle}
              onChange={(evt) => setTitle(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center fst-italic">
            <input
              type="text"
              className="form-control"
              value={gameConsole}
              onChange={(evt) => setConsole(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center fw-bold">
            <input
              type="text"
              className="form-control"
              value={releaseYear}
              onChange={(evt) => setReleaseYear(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={gameCondition}
              onChange={(evt) => setCondition(evt.currentTarget.value)}
            />
          </li>
          <button type="button" className="btn btn-sm btn-secondary" onClick={updateGame}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </ul>
      )}
    </div>
  );
}

export default GameCard;
