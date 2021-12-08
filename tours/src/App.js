import React, { useState, useEffect, useContext } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

// Create Context
export const tourContext = React.createContext()



function App() {
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  // fetch data
  const getTours = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setTours(data)
      setIsLoading(false)
    }
    catch (e) {
      setIsLoading(true)
      console.log(e)
    }
  }
  useEffect(() => {
    getTours()
  }, [])


  if (isLoading) {
    return (
      <>
        <main>
          <Loading />
        </main>
      </>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => getTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <tourContext.Provider value={{ removeTour }}>
      <main>
        <Tours tours={tours} />
      </main>
    </tourContext.Provider>
  )
}

export default App
