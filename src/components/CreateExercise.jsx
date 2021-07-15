import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import api from "../api/API"
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CreateExercise () {
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${api}/users`)
      .then((res)=>{
        const userz = res.data
       if (userz.length > 0) {
        setUsers(userz.map((usei) => usei.username))
        setUsername(userz[0].username)
      } else {
        window.location = '/user'
      }})
      .catch((err)=>{console.log(err)})
    },[])

  function descript (e) {
    const d = e.target.value
    setDescription(d)
  }

  function userN (e) {
    const uN = e.target.value
    setUsername(uN)
  }

  function dura (e) {
    const dura = e.target.value
    setDuration(dura)
  }

  function handleSubmit (e) {
    e.preventDefault()

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: startDate
    }

    axios.post(`${api}/exercises/add`, exercise)
      .then((res)=>{
        const data = res.data
        window.location = '/exerciselist'
    })
    .catch((err)=>{console.log(err)})
  }

  return (
    <div className='container'>
      <h3>Create New Exercise</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Client Name: </label>
          <select required className='form-control' onChange={userN} value={username}>
            {users.map((user) => {
              return (
                <option key={user} value={user}>{user}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input type='text' required className='form-control' onChange={descript} />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input type='number' required className='form-control' onChange={dura} value={duration} />
        </div>

        <br/><br/>
        <div className='form-group'>
          <label>Date: </label>
          <DatePicker required selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <br/><br/>
        <div className='form-group'>
          <input type='submit' value='Create Exercise Log' className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}
