const PersonForm = (props) => {
  const handleNameChange  = (event) => {
    props.handleNameChange(event.target.value)
  }

  const handleNumberChange = (event) => {
    props.handleNumberChange(event.target.value)
  }

  return(
    <form onSubmit={props.addName} >
        <div>
          name: 
          <input 
            value={props.newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            value={props.newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm