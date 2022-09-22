// import papaparse from 'papaparse';
import React from 'react'
import Brand from './components/Data/Brand'
import Media from './components/Data/Media'

function App() {
  return (
    <div>
      <ul className="flex space-x-4 justify-center underline mb-8">
        <li className="font-bold text-2xl cursor-pointer">Brand</li>
        <li className="font-bold text-2xl cursor-pointer">Media</li>
        <li className="font-bold text-2xl cursor-pointer">Sales</li>
      </ul>
      <Media />
      <Brand />

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
