const Person = (props) => {
  return(
    <p>{props.name} {props.number} <button onClick={() => props.handleDeletePerson(props.id)} >Delete</button></p>
  )
}

export default Person