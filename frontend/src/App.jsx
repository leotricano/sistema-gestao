import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
  }
})

function App() {
  const [ativos, setAtivos] = useState([])
  const [chamados, setChamados] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    api.get('ativos/')
      .then(response => setAtivos(response.data))
      .catch(error => setErro(error.message))

    api.get('chamados/')
      .then(response => setChamados(response.data))
      .catch(error => setErro(error.message))
  }, [])

  return (
    <div>
      <div className="header">
        <h1><span className="brand">Aqualis</span> · Sistema de Gestão</h1>
      </div>

      <div className="content">
        {erro && <div className="erro">Erro: {erro}</div>}

        <div className="card">
          <div className="card-header">
            <h2>Ativos</h2>
            <span className="count-badge">{ativos.length} registro(s)</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Patrimônio</th>
                <th>Status</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {ativos.map(ativo => (
                <tr key={ativo.id}>
                  <td>{ativo.nome}</td>
                  <td>{ativo.numero_patrimonio}</td>
                  <td><span className={`badge badge-${ativo.status}`}>{ativo.status}</span></td>
                  <td>{ativo.responsavel || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Chamados</h2>
            <span className="count-badge">{chamados.length} registro(s)</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Solicitante</th>
                <th>Status</th>
                <th>Prioridade</th>
              </tr>
            </thead>
            <tbody>
              {chamados.map(chamado => (
                <tr key={chamado.id}>
                  <td>{chamado.titulo}</td>
                  <td>{chamado.solicitante}</td>
                  <td><span className={`badge badge-${chamado.status}`}>{chamado.status}</span></td>
                  <td><span className={`badge badge-${chamado.prioridade}`}>{chamado.prioridade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App