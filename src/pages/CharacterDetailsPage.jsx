import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CharacterDetailsPage = () => {
  const { charId } = useParams()

  const [character, setCharacter] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const fetchCharacter = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`)
    console.log(response)
    if (response.ok) {
      const parsed = await response.json()
      console.log(parsed)
      setCharacter(parsed)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [])

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <img src={character.image} alt={character.name} style={{ height: '200px' }} />
      <h1>{character.name}</h1>
      <p>Location: {character.location.name}</p>
      <p>{character.status}</p>
    </>
  )
}

export default CharacterDetailsPage
