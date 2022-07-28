import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { BiUserCircle } from 'react-icons/bi'

export default function Home() {
  const [text, setText] = useState("")
  const [texts, setTexts] = useState([])
  
  function addText() {
    setTexts([...texts, text])
  }

  function clearTexts() {
    setTexts([])
  }

  return (
    <>
    <a>
      <button className={styles.profile_btn}>
        <BiUserCircle size={60}/>
      </button>
      </a>
      <div className={styles.container}>
        <div className={styles.control}>
          <div className={styles.inp_container}>
            <input className={styles.inp} onChange={(e) => {setText(e.target.value)}}/>
          </div>
          <div className={styles.btns}>
            <button className={styles.btn} onClick={() => addText()}>Add</button>
            <button className={styles.btn} onClick={() => {clearTexts()}}>Clear</button>
          </div>
        </div>
        <form className={styles.form}>
        {texts.map((el, ind) => {
          return <div className={styles.task} key={ind}>{ind+1}. {el}</div>
        })}
        </form>
      </div>
    </>
  )
}
