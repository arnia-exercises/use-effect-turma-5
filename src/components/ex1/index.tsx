// 1 - Faça um programa em React/TS que escreve no centro da tela uma mensagem aleatória. Esta mensagem deverá vir da API https://github.com/lukePeavey/quotable. Utilize o useEffect para fazer este fetch.

import { useEffect, useState } from "react"

interface PhraseType {
  userId: number
  id: number
  title: string
  completed: boolean
}

async function getRandomPhrase (): Promise<PhraseType> {
  try {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 100) + 1}`, {
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

export default function Ex1 () {
  const [phrase, setPhrase] = useState<PhraseType>()
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    getRandomPhrase().then(response => setPhrase(response))
  }, [flag])

  return (
    <>
      <h1>{phrase?.title}</h1>
      <button onClick={() => setFlag(!flag)}>Buscar nova mensagem</button>
    </>
    
  )
}
