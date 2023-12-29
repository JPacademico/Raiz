import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState("")
  const [dados, setDados] = useState()
  const [dataUser, setDataUser] = useState()
  const [dataUserRepos, setDataUserRepos] = useState()


  function handlelimpar(){
    document.getElementById('texto-input').value = ""
    setDataUser(null)

  }

  async function buscaRepo(){
    const dataRepos = await axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => response.data)
    setDataUserRepos(dataRepos)
    console.log(dataUserRepos)
  

  }

  async function handleBuscar(){
    const data = await axios.get(`https://api.github.com/users/${usuario}`).then(response => response.data)

      const {avatar_url, name, location } = data;
      setDataUser({avatar_url, name, location})
      console.log(dataUser)

      buscaRepo()


  
    }
      

      
  

  



  return (
    <>
      <header>
        <h1>GITFIND</h1>
      </header>
      <div>
        <input type="text" id='texto-input' placeholder='@user' value={usuario} onChange={e => setUsuario(e.target.value)} />
        <button onClick={handleBuscar}>Procurar</button>
        <button onClick={handlelimpar}>Limpar</button>
      </div>
       {
        dataUser &&  <div>
        <img src={dataUser.avatar_url} alt="" />
        <p>{dataUser.name}</p>
        <h3>{dataUser.location}</h3>

       

      </div> }


      {
        dataUserRepos.forEach(element => {
          <p> {element.name }</p>
        })
      }
       
       
      
    </>
  )
}

export default App
