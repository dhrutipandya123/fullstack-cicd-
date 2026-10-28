
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [status, setStatus] = useState('Connecting to backend...')

  useEffect(() => {
   fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/students`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Backend request failed')
        }
        return response.json()
      })
      .then((data) => {
        setStudents(data)
        setStatus('Backend and MongoDB Connected Successfully!')
      })
      .catch(() => {
        setStatus('Backend connection failed. Please check the server.')
      })
  }, [])

  return (
    <div className="app">
      <div className="card">
        <h1>Full Stack CI/CD Pipeline</h1>
        <h2>React + Node.js + MongoDB</h2>

        <p>Welcome to my Full Stack Application!</p>

        <div className="status">{status}</div>

        <h2>Student Records</h2>

        {students.length > 0 ? (
          students.map((student) => (
            <div className="student" key={student._id}>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Course:</strong> {student.course}</p>
            </div>
          ))
        ) : (
          <p>No student records available.</p>
        )}

        <button onClick={() => window.location.reload()}>
          Refresh Data
        </button>
      </div>
    </div>
  )
}

export default App
