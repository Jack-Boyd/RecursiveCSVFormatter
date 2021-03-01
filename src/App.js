import React, { useState, useEffect } from 'react';
import { readString } from 'react-papaparse'

import DisplayLists from './DisplayLists';

const App = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      //Get data from txt file
      const response = await fetch('https://raw.githubusercontent.com/ecoPortal/dev-test/master/data.txt')
      const result = await response.body.getReader().read() // raw array
      const decoder = new TextDecoder('utf-8')
      //Turn csv text into a javascript array using papaparse
      const csvData = readString(decoder.decode(result.value))
      //Set state
      setRows(csvData.data)
    }

    //Call async function in useEffect hook
    getData()
  }, [])



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {
            //Show data if its loaded, otherwise show loading text
            rows ? <DisplayLists rows={rows}/> : (<h4>Loading...</h4>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
