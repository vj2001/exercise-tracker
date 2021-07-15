import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker'
import axios from 'axios'
import api from "../api/API"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function EditExercise () {
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${api}/exercises/${id}`)
      .then((exercise)=>{
      const data= exercise.data;
      console.log(data)
      setUsername(data.username)
      setDescription(data.description)
      setDuration(data.duration)
      setStartDate(data.startDate)
    })
    .then(()=>{
      axios.get(`${api}/users/`)
      .then((res)=>{
        const userz = res.data
        if (userz.length > 0) {
          setUsers(userz.map((usei) => usei.username))
        } else {
          window.location = '/user'
        }
      })
      .catch((err)=>{console.log(err)})
    })
    .catch((err)=>{console.log(err)})
    }
   , [id])


  function handleSubmit (e) {
    e.preventDefault()

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: startDate
    }

   axios.post(`${api}/exercises/update/${id}`, exercise)
      .then((res)=>{
        const data = res.data
        console.log(data)
        window.location = '/exerciselist'
      })
      .catch((err)=>{console.log(err)})
    }

  return (
    <div className='container'>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Client: </label>
          <select required className='form-control' onChange={e => setUsername(e.target.value)} value={username}>
            {users.map((user) => {
              return (
                <option key={user} value={user}>{user}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            required
            className='form-control'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='number'
            required
            className='form-control'
            onChange={e => setDuration(e.target.value)}
            value={duration}
          />
        </div>

        <br/><br/>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker required selected={startDate} onChange={date => setStartDate(date)}/>
          </div>
        </div>
        <br/><br/>
        <div className='form-group'>
          <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}
