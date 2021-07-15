import React, {useState} from 'react';
import axios from 'axios';

export default function CreateUser(props) {


    const [user,setUser]= useState({username:""});


  function onChangeUsername(e)
   {
    setUser({
      username: e.target.value
    })
  }

  function insertUser(e) {
    e.preventDefault();

    const newUser = {
      username: user.username
    }

    console.log(newUser);

    axios.post('http://localhost:5000/users/add', newUser)
      .then(res => console.log(res.data));

     setUser({
      username: ""
    })
  }

  function deleteUser(e) {
    e.preventDefault();

    const newUser = {
      username: user.username
    }

    console.log(newUser);

    axios.post('http://localhost:5000/users/delete', newUser)
      .then(res => console.log(res.data));

     setUser({
      username: ""
    })
  }

    return (
      <div>
        <h3>Create OR Delete User</h3>
        <form>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={user.username}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group">
            <button type="submit" onClick={insertUser}className="btn btn-primary btn-lg">Create User</button>
            <button type="submit" onClick={deleteUser} className="btn btn-danger btn-lg">Delete User</button>
          </div>
        </form>
      </div>
    )
}