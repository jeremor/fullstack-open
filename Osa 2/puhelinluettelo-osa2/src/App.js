import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const foundName = persons.find( ({name}) => name.toLowerCase() === newName.toLowerCase())
    if (foundName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(foundName.id, nameObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== foundName.id ? person : returnedPerson))
              setNotificationMessage(
                `Updated ${returnedPerson.name}`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
            })
      } 
    }
    else {
      personService
        .create(nameObject)
          .then(returnedObject => {
            setPersons(persons.concat(returnedObject))
            setNotificationMessage(
              `Added ${returnedObject.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const handleNameChange  = (newNameValue) => {
    setNewName(newNameValue)
  }

  const handleNumberChange = (newNumberValue) => {
    setNewNumber(newNumberValue)
  }

  const handleFilterChange = (newFilterValue) => {
    setFilter(newFilterValue)
  }

  const handleDeletePerson = (id) => {
    const deletedObject = persons.find(person => person.id === id)
    
    if (window.confirm(`Delete ${deletedObject.name}?`)) {
      personService
      .deletePerson(id)
      .then(response => {
        const newPersons = persons.filter(person => person.id !== id)
        setNotificationMessage(
          `Deleted ${deletedObject.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(newPersons)
      })
      .catch(error => {
        setIsError(true)
        setNotificationMessage(
          `Information of ${deletedObject.name} has already been removed from the server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )

}

export default App