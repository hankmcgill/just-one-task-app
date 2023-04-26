/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function MainContainer () {
  const [currentUser, setCurrentUser] = useState('725543eb-8fd4-4e43-b5ac-2374c16900ef');
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskComplete, setCurrentTaskComplete] = useState(true);

  const handleInput = () => {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`api/${currentUser}/${currentTask.replace(' ', '_')}`, reqOptions)
      .then(setCurrentTaskComplete(false));
  };

  const handleComplete = () => {
    if (currentTask !== '' && currentTaskComplete === false) {
      const reqOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions).then(setCurrentTaskComplete(true)).then(setCurrentTask(''));
    };
  };

  const handleDelete = () => {
    if (currentTask !== '' && currentTaskComplete === false) {
      const reqOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions).then(setCurrentTaskComplete(true)).then(setCurrentTask(''));
    }
  };

  const handleGet = () => {
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`api/${currentUser}`, reqOptions)
      .then((data) => { JSON.parse(data); console.log(data); });
  };

  return (
    <>
    <div>hello there!</div>
    <input placeholder='text goes here' minLength={1} maxLength ={35} value={currentTask} onChange={e => { setCurrentTask(e.target.value); }}></input>
    <button onClick={() => handleInput()}>Submit</button>
    <button onClick={() => handleComplete()}>Completed</button>
    <button onClick={() => handleDelete()}>Delete</button>
    <button onClick={() => handleGet()}>GETdb</button>
    </>
  );
}