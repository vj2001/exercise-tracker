import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import api from "../api/API"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Exerciseslist () {
  const [exercises, setExercises] = useState([])

  function deleteFetch(id){
    axios.delete(`${api}/exercises/${id}`)
    .then((res)=>{
      const del = res.data
    setExercises(exercises.filter(el => el._id !== id))
    console.log(del)})
    .catch((err)=>{console.log(err)})
  }

  useEffect(() => {
      axios.get(`${api}/exercises/`)
      .then((res)=>{
      setExercises(res.data)
    })
    .catch((err)=>{console.log(err)})
  }, [])

   function Exercise(props) {
     return(
    <tr style={{ color: 'red' }}>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${props.exercise._id}`} className='button' style={{ textDecoration: 'none' }}>edit</Link>
        <div style={{ paddingTop: '5px' }} />
        <Button onClick={() => props.deleteExercise(props.exercise._id)} variant='outline-warning' size='sm'>Delete</Button>
      </td>
    </tr>
    )
   }

  return (
    <div className='container'>
      <h3>Logged Exercises</h3>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead className='thead-light'>
            <tr>
              <th>Client</th>
              <th>Description</th>
              <th>Duration(in minutes)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => {
              return (<Exercise exercise={exercise} key={exercise._id} deleteExercise={deleteFetch} />)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
