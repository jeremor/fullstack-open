const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  
  let errorClass = "notification"
  if (props.isError) {
    errorClass = "error"
  }
  return(
    <div className={errorClass}>{props.message}</div>
  )
}

export default Notification