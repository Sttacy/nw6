import React, { useRef, useState, useEffect } from 'react';
import style from '../style/userInfo.module.css';

export default function UserInfo() {
  const [inputValues, setInputValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    tel: '',
  });

  const searchInputFirst = useRef();
  const searchInputLast = useRef();
  const searchInputEmail = useRef();
  const searchInputTel = useRef();

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem('inputValues'));
    if (storedValues) {
      setInputValues(storedValues);
    }
  }, []);

  function searchInputChange() {
    const newInputValues = {
      ...inputValues,
      firstname: searchInputFirst.current.value,
      lastname: searchInputLast.current.value,
      email: searchInputEmail.current.value,
      tel: searchInputTel.current.value,
    };

    setInputValues(newInputValues);
  }

  function onFormBtnClick(e) {
    e.preventDefault();
    const changedValues = {};
    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== '' && inputValues[key] !== null) {
        changedValues[key] = inputValues[key];
      }
    });
    localStorage.setItem('inputValues', JSON.stringify(changedValues));

    searchInputFirst.current.value = '';
    searchInputLast.current.value = '';
    searchInputEmail.current.value = '';
    searchInputTel.current.value = '';
  }

  return (
    <form className={style.form}>
      <div className={style.flex}>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className={style.input}
            ref={searchInputFirst}
            onChange={searchInputChange}
            value={inputValues.firstname}
          />
          <span>Firstname</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className={style.input}
            ref={searchInputLast}
            onChange={searchInputChange}
            value={inputValues.lastname}
          />
          <span>Lastname</span>
        </label>
      </div>

      <label>
        <input
          required=""
          placeholder=""
          type="email"
          className={style.input}
          ref={searchInputEmail}
          onChange={searchInputChange}
          value={inputValues.email}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required=""
          placeholder=""
          type="tel"
          className={style.input}
          ref={searchInputTel}
          onChange={searchInputChange}
          value={inputValues.tel}
        />
        <span>Telefon</span>
      </label>
      <button className={style.submit} onClick={onFormBtnClick}>
        Submit
      </button>
    </form>
  );
}
