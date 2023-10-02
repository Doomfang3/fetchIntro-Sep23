import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CharactersPage = () => {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAllCharacters = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
    console.log(response)
    if (response.ok) {
      const parsed = await response.json()
      console.log(parsed)
      setCharacters(parsed.results)
    }
  }

  useEffect(() => {
    fetchAllCharacters()
  }, [])

  useEffect(() => {
    fetchAllCharacters()
  }, [currentPage])

  return (
    <>
      <h1>All the characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <h4>{character.name}</h4>
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex' }}>
        <button
          type='button'
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1)
            }
          }}
        >
          Previous
        </button>
        <p>Current page : {currentPage}</p>
        <button
          type='button'
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default CharactersPage
