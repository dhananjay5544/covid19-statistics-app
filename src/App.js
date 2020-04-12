import React, { Component } from 'react'
import Cards from './components/cards/Cards'
import Chart from './components/chart/Chart'
import CountryPicker from './components/countryPicker/CountryPicker'
import { fetchData } from './api'

import style from './App.module.css'
import image from './images/logo.png'
import { brown } from '@material-ui/core/colors'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      country: ''
    }
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData1 = await fetchData(country);
    this.setState({ data: fetchedData1, country: country });
  }
  render() {
    return (
      <div className={style.container}>
        <p>developed by Post_exploit <a href="https://github.com/dhananjay5544"> Github</a></p>
        <img className={style.image} src={image} alt="COVID-19" />
        <Cards data={this.state.data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state.data} country={this.state.country} />
      </div>
    )
  }
}

export default App
