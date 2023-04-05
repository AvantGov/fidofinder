// depends 
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';

// data 
import {breeds} from '../assets/data/breeds.js';

// utils 
import { makeFilteredSearch, makeFilteredSearchIDs } from '../utils/features/sessionSlice.js';

// css 
import '../CSS/Filter.css'


const Filter = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            breed: '',
            maxAge: '20',
            minAge: '0',
            resultCount: 25,
        }
    });

    const [breed,maxAge,minAge,resultCount] = watch(["breed","maxAge","minAge","resultCount"]);

    // turns the account nav icon a color so the user knows where we are 
    useEffect(() => {
        const activenavlink = document.getElementById('navlink_filter')
        activenavlink.style.backgroundColor = '#D86C64'
        activenavlink.style.color = '#DADADA'
        activenavlink.style.boxShadow = '0px 0px 10px 2px #D86C64'
    },[])

    // used the check if the errors object is empty in order to show or hide the container at the bottom of the screen. 
    const isEmpty = (obj) => {
        if (Object.keys(obj).length === 0) {
            return false
        } else {
            return true
        }
    };

    // used to check the existence of a specified error, to apply element.style properties to inputs.
    const hasError = (obj, target) => {
        if (Object.keys(obj).includes(target)) {
            return true
        } else {
            return false
        }
    };

    const formSubmit = (data) => {
        const first100 = []
        while (first100.length > 100) {
            breed.map((item) => {
                return first100.push(item)
            })
            console.log('fir100 made:', first100)
        }

        axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                },
                params: {
                    breeds: (breed === '') ? first100 : [breed], 
                    ageMax: maxAge,
                    ageMin: minAge,
                    size: resultCount
                }
            })
            .then((res) => {
                console.log('form submitted:', data)
                console.log('GET success:', res.data.resultIds)
                dispatch(makeFilteredSearchIDs(res.data.resultIds))
                dispatch(makeFilteredSearch(true))
                nav('/browse')
            })
            .catch((err) => {
                console.log('error on the GET req:', err)
            })
    }

    
    return(
        <div className='Filter'>
            <div className='Filter__titleContainer'>
                <p className='titleContainer__title'>Filtered Search</p>
                <p className='titleContainer__caption'>Specify optional search parameters below to view a more personalized selection </p>
            </div>
            <form id="form_filter" className="Filter__form" onSubmit={handleSubmit(formSubmit)}>
                <label className='form__label' id='lbl_breed' htmlFor='breed'>Select Breed:</label>
                <select 
                    name='breed' 
                    className='form__select' 
                    id='filter_breed'
                    style={{border: hasError(errors,"breed") ? "1.5px solid #F20000" : "1.5px solid #1E2329"}}
                    {...register('breed')}
                >
                    <option value={''} className='breed__option'>All Breeds</option>
                    {breeds.map((breed) => {
                        return <option value={breed} key={`breed_${breeds.indexOf(breed)}`} className='breed__option'>{breed}</option>
                    })}
                </select>

                <label className='form__label' id='lbl_minAge' htmlFor='minAge'>Minimum Age:</label>
                <input 
                    name='minAge' 
                    className='form__input' 
                    id='inp_minAge' 
                    type='number' 
                    max='59' 
                    min='0' 
                    placeholder='0'
                    style={{border: hasError(errors,"minAge") ? "1.5px solid #F20000" : "1.5px solid #1E2329"}}
                    {...register('minAge', {max: 59, min: 0})}
                />

                <label className='form__label' id='lbl_maxAge' htmlFor='maxAge'>Max Age:</label>
                <input 
                    name='maxAge' 
                    className='form__input' 
                    id='inp_maxAge' 
                    type='number' 
                    max='60' 
                    min='0' 
                    placeholder='5'
                    style={{border: hasError(errors,"maxAge") ? "1.5px solid #F20000" : "1.5px solid #1E2329"}}
                    {...register('maxAge', {max: 60, min: 0})}
                />

                <label className='form__label' id='lbl_resultCount' htmlFor='resultCount'>Desired Number of Results <br/> (max 99, default is 25)</label>
                <input 
                    name='resultCount' 
                    className='form__input' 
                    id='inp_resultCount' 
                    type='number' 
                    max='99' 
                    min='0' 
                    style={{border: hasError(errors,"resultCount") ? "1.5px solid #F20000" : "1.5px solid #1E2329"}}
                    {...register('resultCount', {max: 99, min: 1})}
                />
                <div className='form__errors' style={{display: isEmpty(errors) ? "block" : "none"}}>
                    <p className='errors__dialog'>Please resolve the following errors before submitting:</p>
                    <ul className='errors__list'>
                        {errors.minAge && <li className='form__error'> Minimum age cannot be less than 0</li>} 
                        {errors.maxAge && <li className='form__error'> Maximum age is 60</li>} 
                        {errors.resultCount && <li className='form__error'>Desired results must be greater than 1 and less than 100</li>} 
                    </ul>
                </div>
                <input type="submit" lable="submit" value="Submit" className='Filter__submit' id='submit_filter'/>
            </form>
        </div>
    );
};

export default Filter;
