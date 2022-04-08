const Filter = (props) => {

  const handleFilterChange = (event) => {
    props.handleFilterChange(event.target.value)
  }

  return (
    <div>
        filter shown with 
        <input 
          value={props.filter}
          onChange={handleFilterChange}
        />
      </div>
  )
}

export default Filter