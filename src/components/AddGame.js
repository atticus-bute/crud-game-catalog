import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


function AddGame(props){
  // need title, console, condition, release, photo and ID
  const[gameTitle, setTitle] = useState("");
  const[gameConsole, setConsole] = useState("");
  const[releaseYear, setReleaseYear] = useState("");
  const[gameCondition, setCondition] = useState("");
  const[selectedFile, setSelectedFile] = useState(null);
  
  const doWork = () => {
    const newGame = {"id":nanoid(), "gameTitle":gameTitle, "gameConsole":gameConsole, "releaseYear":releaseYear, "gameCondition":gameCondition, "image":URL.createObjectURL(selectedFile)};
    props.addGame(newGame);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return(
    <div className="row mt-5">
      <div className="col-md-2">
        <label htmlFor="txtGameTitle" className="form-label">Enter game title:</label>
        <input type="text" name="txtGameTitle" id="txtGameTitle" className='form-control' onChange={(evt) => setTitle(evt.currentTarget.value)} value={gameTitle} />
      </div>
      <div className="col-md-2">
      <label htmlFor="txtGameConsole" className="form-label">Enter console:</label>
        <input type="text" name="txtGameConsole" id="txtGameConsole" className='form-control' onChange={(evt) => setConsole(evt.currentTarget.value)} value={gameConsole} />
      </div>
      <div className="col-md-2">
      <label htmlFor="txtReleaseYear" className="form-label">Enter release year:</label>
        <input type="text" name="txtReleaseYear" id="txtReleaseYear" className='form-control' onChange={(evt) => setReleaseYear(evt.currentTarget.value)} value={releaseYear} />
      </div>
      <div className="col-md-2">
      <label htmlFor="txtGameCondition" className="form-label">Enter condition:</label>
      <select name="txtGameCondition" id='txtGameCondition' className="form-select" onChange={(evt) => setCondition(evt.currentTarget.value)} value={gameCondition}>
        <option value="Unknown">Unknown</option>
        <option value="MISB">MISB</option>
        <option value="CIB">CIB</option>
        <option value="Incomplete">Incomplete</option>
        <option value="Loose">Loose</option>
        <option value="Damaged">Damaged</option>
      </select>
        {/* <input type="text" name="txtGameCondition" id="txtGameCondition" className='form-control' onChange={(evt) => setCondition(evt.currentTarget.value)} value={condition} /> */}
      </div>
      <div className="col-md-2">
        <label htmlFor="fileUpload" className='form-label'>Upload Cover Art</label>
        <input type="file" name="fileUpload" id="fileUpload" className='form-control form-control-sm' onChange={imageUpdate} />
      </div>
      <div className="col-md-2">
        <button type='button' id='btnAddGame' className='btn btn-success btn-lg mt-4' onClick={doWork}><FontAwesomeIcon icon={faPlus}/></button>
      </div>
    </div>
  )
}

export default AddGame;