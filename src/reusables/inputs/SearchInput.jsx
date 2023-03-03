import React from 'react'
import classes from './SearchInput.module.css'
import {BiSearch} from 'react-icons/bi'

const SearchInput = ({placeholder, myWidth}) => {
  return (
    <div className={classes['search-box']}>
        <BiSearch/>
        <input type="search" placeholder={placeholder} style={{width: `${myWidth}`}} />
    </div>
  )
}

export default SearchInput