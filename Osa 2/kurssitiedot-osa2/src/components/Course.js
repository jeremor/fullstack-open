const Course = (props) => {
  return (
    <div>
      <CourseHeader name={props.name} />
      <Content parts={props.parts} />
      <Total parts={props.parts} />
    </div>
  )
}

const CourseHeader = (props) => {
  return (
    <div>
      <h2>
        {props.name}
      </h2>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  const allExercises = props.parts.map(part => part.exercises)
  const initialValue = 0
  const total = allExercises.reduce(
    (previousValue, currentValue) => previousValue + currentValue, initialValue
  )
  return (
    <b>
      Total of {total} exercises
    </b>
  )
}

export default Course