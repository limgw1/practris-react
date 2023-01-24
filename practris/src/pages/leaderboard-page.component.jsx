import { useState, useEffect } from "react"

const Leaderboard = () => {

  //Initialize new state variable as empty list
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)


  let headers = ["ID", "Rank", "Time", "Time played", "Name"] //Temp solution for static case, fix when using DB


  //Use useEffect to get data upon rendering of the component
  //Most of the code here will change when querying from db
  useEffect(() => {
    fetch('../../../leaderboards.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.slice(offset, offset+20)))
      .then(setTimeout(10000))
      .then(setIsLoading(false))
      .catch(error => console.log(error))
  }, [,offset])

  
  return(
    <div>
      LEADERBOARD PAGE
      <div>
      <table border="1">
        <thead>
          <tr>
            {headers.map((key, index) => <th key={index}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key, index) => (
                <td key={index}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {offset >= 20 && <button onClick={() => setOffset(offset - 20)}>Previous Page</button>}
      {20 <= data.length && <button onClick={() => setOffset(offset + 20)}>Next Page</button>}
    </div>
    </div>
  )
}

export default Leaderboard