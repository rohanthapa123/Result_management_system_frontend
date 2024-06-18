import React from 'react'

const Search = ({handleSearchText}) => {
    return (
        <>
            <input type="search" placeholder='search student here..' className='search' name="search" id="search" onChange={handleSearchText} />
            
        </>
    )
}

export default Search