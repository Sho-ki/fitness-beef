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
    font-size: 20px;
  }

  .numInput {
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
    align-self: center;
    margin-bottom: 10px;
  }

  .numInput:focus {
    outline: none;
    border-bottom: 2px solid #1976d2;
  }

  .focusInput {
    color: #1976d2;
  }

  .btn {
    border-radius: 5px;
    background-color: transparent;
    color: #000000;
    padding: 2px 8px;
    font-size: 13px;
    cursor: pointer;
  }
  .cancel-btn {
    border: 1px solid #000000;
    border-color: #1976d2;
    color: #1976d2;
  }
  .cancel-btn:hover {
    filter: brightness(1.2);
    color: #1976d2;
  }

  .submit-btn {
    border: none;
    color: #ffffff;
    background-color: #1976d2;
  }

  .submit-btn:hover {
    filter: brightness(0.8);
  }
`;
export default workoutDayStyle;
