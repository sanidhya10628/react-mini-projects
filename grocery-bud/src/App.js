import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLoaclStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLoaclStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // alert
      showAlert(true, 'Please Enter Value', 'danger')
    }
    else if (name && isEditing) {
      // deal with editing
      const newList = list.map((item) => {
        if (item.id !== editID)
          return item
        return { id: editID, name }
      })
      setIsEditing(false)
      setList(newList)
      setName('')
      setEditID(null)
      showAlert(true, 'Value Changed', 'success')
    }
    else {
      setList([...list, { id: new Date().getTime().toString(), name }])
      setName('')
      showAlert(true, 'Item Added To The List', 'success')
    }
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }

  const clearList = () => {
    setList([])
    showAlert(true, 'Empty List', 'danger')
  }

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
    showAlert(true, 'Item Removed', 'danger')
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setName(specificItem.name)
    setEditID(id)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <>
      <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>Grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className='grocery'
              placeholder='e.g. egss'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className='submit-btn'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {
          list.length > 0 &&
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>Clear List</button>
          </div>
        }
      </section>
    </>
  )
}

export default App
