// import papaparse from 'papaparse';
import React from 'react'
import Branding from './components/Data/Branding'

function App() {
  return (
    <div>
      <Branding />

      {/* // const Papa = papaparse;
  // const handleFileSubmit = (e) => {
  //   e.preventDefault();
  //   const files = e.target[0].files;
  //   if(files){
  //     const result = Papa.parse(files[0],{
  //       complete: (result, file) => {
  //         console.log(file)
  //         console.log(result);
  //       },
  //     })

  //   }
  // } */}
      {/* <form onSubmit={e => handleFileSubmit(e)}>
        <div>
          <label>Choose file to upload</label>
          <input type="file" accept=".csv,.xlsx,.xls" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form> */}
    </div>
  )
}

export default App
