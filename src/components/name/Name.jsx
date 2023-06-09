import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../../store/slice/name.slice';

function Button() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.button.name);

  function handleClick() {
    dispatch(changeName('Aram'));
  }

  return (
    <div>
      <button onClick={handleClick}>Change Name</button>
      <p>Name: {name}</p>
    </div>
  );
}

export default Button;