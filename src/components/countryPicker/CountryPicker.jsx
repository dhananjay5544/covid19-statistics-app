import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountriesData } from '../../api'

//style component
import style from './CountryPicker.module.css'

const CountryPicker = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountriesData());
        }
        fetchAPI();
    }, [setCountries]);
    return (
        <div>
            <FormControl variant="outlined" className={style.formControl}>
                <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                    <option value="global">Global</option>
                    {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker
