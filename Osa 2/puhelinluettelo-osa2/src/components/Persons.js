import Person from "./Person"

const Persons = (props) => {
  return(
    <div>
        {props.personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDeletePerson={props.handleDeletePerson} />)}
    </div>
  )
}

export default Persons