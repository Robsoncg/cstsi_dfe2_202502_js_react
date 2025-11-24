import { useRef, useState } from 'react'
import coffeLogo from './assets/js-coffe.svg'
import './App.css'

function App() {
  const [qtdCafeDisponivel, setQtdCafeDisponivel] = useState(3)
  const [reabastecendo, setReabastecendo] = useState(false)
  const inputName = useRef(null)

  const fazerCafe = nome => new Promise((resolve, reject) => {
    if (reabastecendo) {
      return reject('Estamos reabastecendo o café, volte em instantes!')
    }

    if (qtdCafeDisponivel <= 0) {
      return reject('Acabou o café!!!')
    }

    setQtdCafeDisponivel(prev => prev - 1)
    console.log(`Preparando o café de ${nome} !!!`)

    setTimeout(() => {
      resolve(`${nome}! Seu café está pronto!!!`)
    }, 5000)
  })

  const solicitaCafe = async () => {
    const nome = inputName.current.value.trim()
    inputName.current.value = ''
    inputName.current.focus()

    try {
      const resultado = await fazerCafe(nome)
      alert(resultado)
    } catch (error) {
      alert(`Desculpe ${nome}! ${error}`)
    } finally {
      console.log(`Processo finalizado para ${nome}`)
    }
  }

  const reabastecerCafe = () => {
    return new Promise((resolve) => {
      setReabastecendo(true)
      console.log("Reabastecendo café...")

      setTimeout(() => {
        setQtdCafeDisponivel(3) 
        setReabastecendo(false)
        resolve("Café reabastecido!")
      }, 4000)
    })
  }

  const solicitarReabastecimento = async () => {
    try {
      const msg = await reabastecerCafe()
      alert(msg)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={coffeLogo} className="logo" alt="React logo" />
        </a>
      </div>

      <h1>Peça um Café!</h1>
      <p>Cafés disponíveis: {qtdCafeDisponivel}</p>
      {reabastecendo && <p style={{color:'orange'}}>Reabastecendo... aguarde ⏳</p>}

      <div className="card">
        <input type='text' ref={inputName} placeholder='Seu nome!!' />
        <hr />

        <button 
          onClick={solicitaCafe}
          disabled={reabastecendo}
        >
          Pedir um Café!!!
        </button>
      </div>

      <button 
        onClick={solicitarReabastecimento}
        disabled={reabastecendo}
      >
        Adicionar Café
      </button>
    </>
  )
}

export default App
