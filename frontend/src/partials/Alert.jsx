
export default function Alert({color,message}) {
    return (<>
    <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
        <i className="fa fa-exclamation-circle me-2" /> {message}
      </div>
    </>)
}