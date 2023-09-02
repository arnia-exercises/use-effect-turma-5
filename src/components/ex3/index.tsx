/*
3 - Utilizando a API do Rick and Morty (https://rickandmortyapi.com/) faça uma recriação da página inicial da API, que apresenta 6 cards com personagens. Utilize a seguinte rota para buscar os 6 primeiros personagens, que deverão aparecer quando a página carregar https://rickandmortyapi.com/api/character/1,2,3,4,5,6. Veja que os ids dos personagens são sequenciais e passados ao final da URL. Crie um botão ao final da página que ao ser clicado, irá aleatorizar 6 números entre 1 e 826 e irá buscar estes personagens para apresentar nos cards da tela. 

Lembre-se: Utilize as boas práticas do useEffect e useCallback, não deixe nenhum warning de linter no seu código.

*/

import { useCallback, useEffect, useState } from "react"

interface Character {
  id: number
  name: string
  status: string
  species: string
  type?: string
  gender: string
  image: string
}

type Characters = Array<Character>

const urlBase = 'https://rickandmortyapi.com/api/character/'

async function getCharacters (ids: number[]): Promise<Characters> {
  const url = urlBase + ids.join(',')

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status === 200) {
    return await response.json()
  }
  
  if (response.status < 500) {
    throw new Error('Algum parametro está inválido')
  }

  throw new Error('Deu ruim')
}

function gererateRandomNumber (max: number): number {
  return Math.floor(Math.random() * max) + 1
}

function generateRandomIds (): number[] {
  const numbers: number[] = []

  for (let i = 0; i < 6; i++) {
    numbers.push(gererateRandomNumber(826))
  }

  return numbers
}

export default function Ex3 () {
  const [characters, setCharacters] = useState<Characters>([])
  const [ids, setIds] = useState<number[]>([1, 2, 3, 4, 5, 6])

  const loadCharacters = useCallback(async () => {
    try {
      const data = await getCharacters(ids)
      setCharacters(data)
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
        return
      }

      alert('Ocorreu um erro inexperado')
    }
  }, [ids])

  useEffect(() => {
    loadCharacters()
  }, [ loadCharacters ])

  const handleNewCharacters = () => {
    setIds(generateRandomIds())
  }

  return (
    <>
      <button onClick={handleNewCharacters}>Buscar novos personagens</button>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(char => (
            <tr key={char.id}>
              <td>{char.id}</td>
              <td>{char.name}</td>
              <td><img height={32} src={char.image} alt={char.name} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}