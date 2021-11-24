import css from 'styled-jsx/css';

const workoutDayStyle = css`
  .workout-set-item-delete-btn {
    padding: 10px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: lightgray;
  }

  .workout-set-item-delete-btn:hover {
    background-color: #ededed;
    border-radius: 50px;
    color: red;
  }

  .workout-set-item-delete-btn:active {
    position: relative;
    top: 1px;
    filter: brightness(0.8);
  }

  .set-item-text {
    margin-left: 2em;
    display: inline-block;
    text-align: left;
    font-size: larger;
  }

  .numInp {
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
    align-self: center;
    margin-bottom: 10px;
  }

  .numInp:focus {
    outline: none;
    border-bottom: 2px solid #1e90ff;
  }

  .focusInp {
    color: #1e90ff;
  }

  .btn {
    border-radius: 5px;
    background-color: transparent;
    color: black;
    padding: 2px 8px;
    font-size: 13px;
    cursor: pointer;
  }
  .cancel-btn {
    border: 1px solid black;
    border-color: #0079f0;
    color: #0079f0;
  }
  .cancel-btn:hover {
    filter: brightness(1.2);
    color: #0079f0;
  }

  .submit-btn {
    border: none;
    color: white;
    background-color: #0079f0;
  }

  .submit-btn:hover {
    filter: brightness(0.8);
  }
`;
export default workoutDayStyle;
