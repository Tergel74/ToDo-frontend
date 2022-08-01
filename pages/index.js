import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { BiUserCircle } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Popup from 'reactjs-popup'
import axios from 'axios'

export default function Home() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const taskIds = []
  let isIdUnique = false
  
  var checked = false
  // function loadData(){

  // }
  // make a function that loads all todos in dabase after refresh or after starting the project

  // give id from backend to avoid deleting all todos with the same todo tasks when deleting one in frontend
  // objects in array

  function addTodo() {
    // generate random 4 digit number for the id
    let randomId = Math.floor(1000 + Math.random() * 9000);

    while (isIdUnique != true) {
      randomId = Math.floor(1000 + Math.random() * 9000);
      if (taskIds.length > 0) {
        for (let i = 0; i < taskIds.length; i++) {
          if (taskIds[i] == randomId) {
            isIdUnique = false
          } else {
            taskIds.push(randomId)
            isIdUnique = true
          }
        }
      } else {
        taskIds.push(randomId)
        isIdUnique = true
      }
    }

    let todoBody = {
      id: randomId,
      todo: todo
    }

    setTodos([...todos, todoBody])

    axios
      .post('http://localhost:3001/create', {
        id: randomId,
        todo: todo
      })
      .then(response => {
        console.log(response);
      });

      console.log(todos)
  }

  function clearTodos() {
    setTodos([])
    axios
      .delete('http://localhost:3001/todos')
      .then(response => {
        console.log(response);
      });
  }

  function deleteTask(ind) {
    var todoDel = todos[ind].todo
    todos.splice(ind, 1)
    setTodos([...todos])
    
    axios
      .post('http://localhost:3001/delete', {
        todo: todoDel
      })
      .then(response => {
        console.log(response);
      });
  }

  function check(ind) {
    if (checked == false) {
      checked = true
    } else {
      checked = false
    }
    axios
      .put('http://localhost:3001/todos', {
        todo: todos[ind].todo,
        completed: checked
      })
      .then(response => {
        console.log(response);
      });
  }

  return (
    <>
      {/* <a>
        <button className={styles.profile_btn}>
          <BiUserCircle size={60}/>
        </button>
      </a> */}
      <div className={styles.container}>
        <div className={styles.control}>
          <div className={styles.inp_container}>
            <input className={styles.inp} onChange={(e) => {setTodo(e.target.value)}} placeholder='Add to your list ...'/>
          </div>
          <div className={styles.btns}>
            <button className={styles.btn} onClick={() => addTodo()}>Add</button>
            <Popup trigger={<button className={styles.btn}>Clear</button>} position='bottom right'>
              <div className={styles.popup}>
                <p>This will Delete all your tasks and you can't retrieve it later!</p>
                <button className={styles.clear_btn} onClick={() => {clearTodos()}}>Clear</button>
              </div>
            </Popup>
          </div>
        </div>
        <form className={styles.form}>
        {todos.map((el, ind) => {
          return <div className={styles.task} key={ind}>
                  <div>
                    <input type='checkbox' id={ind+1} className={styles.todo_check} onClick={() => {check(ind)}}/>
                    <label htmlFor={ind+1} className={styles.todo_value}>{el.todo}</label>
                  </div>
                  < AiFillDelete id='delete' className={styles.delete} onClick={() => {deleteTask(ind)}}/>
                </div>
        })}
        </form>
      </div>
    </>
  )
}
