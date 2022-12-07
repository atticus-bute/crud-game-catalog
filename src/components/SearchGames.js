import React, { useState } from 'react';
import {nanoid} from 'nanoid';


function SearchGames(props){
  const[keywords, setKeywords] = useState("");

  const searchGamesWork = () => {
    console.log('he spit on the mic, yuck saliva');
    let keywordArray = [];

    if(keywords){
      keywordArray = keywords.toLowerCase().split(' ');
    }

    if(keywordArray.length > 0){
      const searchResults = 'IDK LMAO'
    }
  }

  return(
    <div className="row mt-5">
      <div className="col-md-4">
        <label htmlFor="txtKeywords" className="form-label">Search</label>
        <input type="text" name="txtKeywords" id="txtKeywords" className='form-control' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
      </div>
      <div className="col-md-4">
        <label htmlFor="" className="form-label">Select Console</label>
        <select name="" id="" className="form-select">
          <option value="">Break So Bad</option>
        </select>
      </div>
      <div className="col-md-4">
        <button type='button' className='btn btn-lg btn-info mt-4' onClick={searchGamesWork}>Search</button>
      </div>
    </div>
  )
}

export default SearchGames;