import React, { useState } from 'react'
import style from './Filter.module.css'
import { useDispatch } from "react-redux";
import { getCategories } from '../../redux/actions';

const Filter = () => {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState("")

  const handleFilter = (category) => {
    setSelected(category)
    dispatch(getCategories(category))
  };

  return (

    <div className={style.container}>
      <h3 className={style.title}>Collections</h3>
      <button className={`${style.button} ${selected === '' && style.selected}`} onClick={() => handleFilter("")}>All</button>
      <button className={`${style.button} ${selected === 'tablet' && style.selected}`} onClick={() => handleFilter("tablet")}>Tablets</button>
      <button className={`${style.button} ${selected === 'laptop' && style.selected}`} onClick={() => handleFilter("laptop")}>Laptops</button>
      <button className={`${style.button} ${selected === 'smartphone' && style.selected}`} onClick={() => handleFilter("smartphone")}>SmartPhones</button>
      <button className={`${style.button} ${selected === 'headphone' && style.selected}`} onClick={() => handleFilter("headphone")}>Headphones</button>
      <button className={`${style.button} ${selected === 'keyboard' && style.selected}`} onClick={() => handleFilter("keyboard")}>Keyboards</button>
    </div>
  )
}

export default Filter;
