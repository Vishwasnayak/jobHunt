import React from 'react'
import { useAppContext } from '../../context/appContext';
import Wrapper from './SearchContainerCSS';
import FormRowSelect from '../FormRowSelect';
import { useState, useMemo } from 'react';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading, search, searchStatus, searchType,sort, sortOptions, statusOptions, jobTypeOptions,
    handleChange, clearFilters } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className='form'>
        <h4 style={{marginLeft:"38%",fontSize:"25px"}}>Search form</h4>
        {/* search position */}
        <div className='form-center'>
          <div>
          <label 
          style={{display:"block",marginLeft:"50%",fontFamily:"inherit",fontSize:"15px"}}>
            <b>Search</b></label>
          <input
            type='text'
            name='search'
            value={localSearch}
            style={{display:"block",width:"120%",height:"6vh"}}
            onChange={optimizedDebounce}
          ></input>
          </div>
          <div style={{paddingLeft:"15%"}}>
           <FormRowSelect
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]} //append all
          ></FormRowSelect>
          </div>
          {/* search by type */}
          <div style={{display:"inline-block"}}>
          <div style={{marginLeft:"-35%",marginTop:"-3%"}}>
          <FormRowSelect
            labelText='job type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          ></FormRowSelect>
          </div>
          {/* sort */}
          <div style={{paddingLeft:"20%",marginTop:"-16%"}}>
              <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>
          </div>
          </div>
          <button style={{width:"40%",marginLeft:"290%",marginTop:"-60%"}}
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
 

export default SearchContainer