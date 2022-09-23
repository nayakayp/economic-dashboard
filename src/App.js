// import papaparse from 'papaparse';
import React, {useEffect, useState} from 'react'
import Brand from './pages/Brand'
import Media from './pages/Media'
import Sales from './pages/Sales'
import Loading from './components/Loading'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayList, setDisplayList] = useState([
    {
      name: 'Brand',
      isActive: true,
      render: <Brand />,
    },
    {
      name: 'Media',
      isActive: false,
      render: <Media />,
    },
    {
      name: 'Sales',
      isActive: false,
      render: <Sales />,
    },
  ])

  const handleActiveList = name => {
    const newDisplayList = displayList.map(list => {
      if (list.name === name) return {...list, isActive: true}

      return {...list, isActive: false}
    })
    setIsLoading(true)
    setDisplayList(newDisplayList)
  }
  const handleDisplay = state => {
    switch (state) {
      case 'Brand':
        handleActiveList('Brand')
        break
      case 'Media':
        handleActiveList('Media')
        break
      case 'Sales':
        handleActiveList('Sales')
        break
      default:
        break
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="pt-4">
      {isLoading && <Loading />}
      <ul className="flex space-x-4 justify-start mb-8 px-10">
        {displayList.map(list => (
          <li
            key={list.name}
            onClick={() => handleDisplay(list.name)}
            className="font-bold text-lg cursor-pointer"
            style={{
              color: list.isActive ? '#4f46e5' : '#7b78b9',
              textDecoration: list.isActive ? 'underline' : 'none',
            }}
          >
            {list.name}
          </li>
        ))}
      </ul>

      {displayList.map(list => list.isActive && <>{list.render}</>)}

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
