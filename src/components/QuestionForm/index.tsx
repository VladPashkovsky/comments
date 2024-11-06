import './style.css'

const QuestionForm = () => {
  return (
    <div className="box">
      <div className="user">
        <span className="online"></span>
        <span className="user_info">User: <span className="user_item">Somebody</span> </span>
      </div>
      <div className="login">
        <form className="loginBx">
          <h2><i>Questions</i></h2>
          <div className="inptBtn">
            <input type="text" placeholder="Question" />
            <button>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionForm