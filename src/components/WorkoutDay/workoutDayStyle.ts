import css from 'styled-jsx/css';

const workoutDayStyle = css`
  .workout-set-item-btn {
    border: none;

    border-radius: 30px;
    width: 95%;
    min-height: 7em;
    cursor: pointer;
  }

  .workout-set-item-btn:hover {
    filter: brightness(0.8);
  }
  .workout-set-item-btn:active {
    position: relative;
    top: 1px;
  }

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

  .set-item-number {
    text-align: left;
    display: inline-block;
    font-size: 1.5em;
    font-weight: bold;
  }

  .set-item-text {
    margin-left: 2em;
    display: inline-block;
    text-align: left;
    font-size: larger;
  }
`;
export default workoutDayStyle;
