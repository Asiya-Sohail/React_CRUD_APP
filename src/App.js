import axios from 'axios';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  //Step 1: Setting initial states for CRUD operations
  //task, tasks, isEditing, currentTask
  const [task, settask] = useState('');
  const [tasks, settasks] = useState([]);
  const [isediting, setisediting] =useState(false);
  const [currenttask, setcurrenttask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://retoolapi.dev/anBnvu/data'); // Replace with your API URL
            settasks(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []); // Empty dependency array means it runs once on mount

  //Step 2: Handle input
  const handleinputchange = (e) => {
    settask(e.target.value)
  }

  //Step 3: Adding a task (create operation)
  const handleaddtask = () => {
    if (task !== ''){
      settasks([...tasks, {id: tasks.length + 1, name : task}])
    }
    settask('')
  }

  //Step 4: Handling Edit state
  const handleedittask = (t) => {
    setisediting(true) 
    settask(t.name) //Why not VALUE
    setcurrenttask(t)
  }

  //Step 5: Save the edited task
  const handlesaveedittask = () => {
    settasks(
      tasks.map((t) => (
        t.id === currenttask.id ? {...t, name : task} : t
      ))
    )
    setisediting(false)
    settask('')
    setcurrenttask(null)
  }

  //Step 6: Handle Delete Task
  const handledeletetask = (id) => {
    settasks(tasks.filter((t) => t.id !== id))
  }

  if (loading) return <div className='comments'>Loading...</div>
  if (error) return <div className='comments'>Error : {error.message}</div>

  return (
<div className="App">
  <h1>CRUD app with React JS</h1>
  <input className='ip' type='text' value={task} onChange={handleinputchange} placeholder='Add a task...' />
  {!isediting ? (
    <button onClick={handleaddtask}>Add Task</button>
  ) : (
    <button onClick={handlesaveedittask}>Save Task</button>
  )}
  <div className='records'>
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>
              <button onClick={() => handleedittask(t)}>Edit</button>
              <button onClick={() => handledeletetask(t.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default App;
