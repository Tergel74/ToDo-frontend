import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { BiUserCircle } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Popup from 'reactjs-popup'
import axios from 'axios'

export default function Home() {
  const [text, setText] = useState("")
  const [texts, setTexts] = useState([])
  
  var checked = false
  // function loadData(){

  // }
  // make a function that loads all todos in dabase after refresh or after starting the project

  // give id from backend to avoid deleting all todos with the same todo tasks when deleting one in frontend
  // objects in array

  function addText() {
    setTexts([...texts, text])

    axios
      .post('http://localhost:3001/create', {
        todo: text
      })
      .then(response => {
        console.log(response);
      });
  }

  function clearTexts() {
    setTexts([])
    axios
      .delete('http://localhost:3001/todos')
      .then(response => {
        console.log(response);
      });
  }

  function deleteTask(ind) {
    var todoDel = texts[ind]
    texts.splice(ind, 1)
    setTexts([...texts])
    
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
        todo: texts[ind],
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
            <input className={styles.inp} onChange={(e) => {setText(e.target.value)}} placeholder='Add to your list ...'/>
          </div>
          <div className={styles.btns}>
            <button className={styles.btn} onClick={() => addText()}>Add</button>
            <Popup trigger={<button className={styles.btn}>Clear</button>} position='bottom right'>
              <div className={styles.popup}>
                <p>This will Delete all your tasks and you can't retrieve it later!</p>
                <button className={styles.clear_btn} onClick={() => {clearTexts()}}>Clear</button>
              </div>
            </Popup>
          </div>
        </div>
        <form className={styles.form}>
        {texts.map((el, ind) => {
          return <div className={styles.task} key={ind}>
                  <div>
                    <input type='checkbox' id={ind+1} className={styles.todo_check} onClick={() => {check(ind)}}/>
                    <label htmlFor={ind+1} className={styles.todo_value}>{el}</label>
                  </div>
                  < AiFillDelete id='delete' className={styles.delete} onClick={() => {deleteTask(ind)}}/>
                </div>
        })}
        </form>
      </div>
    </>
  )
}
