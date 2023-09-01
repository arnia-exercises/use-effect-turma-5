/**
2 - Usando a API do Star Wars (https://swapi.dev/) faça  uma página que apresente uma tabela. Esta tabela deverá conter os seguintes dados acerca de planetas: Nome, Período de Rotação, Período Orbital, Diâmetro e População. 
Abaixo da tabela deverá ser renderizado dois botões, para atualizar os dados da tabela com outros planetas da api ou voltar aos anteriores. Veja que os botões só podem ser renderizados caso o link para busca de novos planetas ou de planetas anteriores exista. Estilize a tabela da forma que achar melhor.
 */

import { useEffect, useState } from "react"

interface PlanetType {
  name: string 
  rotation_period: string
  orbital_period: string
  diameter: string
  population: string
}

interface PlanetsType {
  count: number
  next?: string
  previous?: string
  results: PlanetType[]
}

async function getPlanets (url: string): Promise<PlanetsType> {
  try {
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await data.json()
    return json
  } catch (e) {
    throw new Error('Deu ruim...')
  }
}

export default function Ex2 () {
  const [planets, setPlanets] = useState<PlanetsType>()
  const [url, setUrl] = useState('https://swapi.dev/api/planets?page=1')

  useEffect(() => {
    getPlanets(url)
    .then(response => setPlanets(response))
  }, [url])

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de Rotação</th>
            <th>Período Orbital</th>
            <th>Diâmetro</th>
            <th>População</th>
          </tr>
        </thead>
        <tbody>
          {planets?.results?.map(planet => (
            <tr key={planet.name}>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Boolean(planets?.previous) && (
          <button onClick={() => setUrl(planets?.previous)}>Previous</button>
        )}

        {Boolean(planets?.next) && (
          <button onClick={() => setUrl(planets?.next)}>Next</button>
        )}
      </div>

    </>
  )
}