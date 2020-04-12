import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'


//style component
import style from './Chart.module.css'


const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);

    //fetching daily covid data fro API
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, [])

    const linechart = (
        dailyData.length
            ? <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: 'rgba(0,0,255,0.4)',
                        fill: true
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true
                    }]
                }}
                width={10}
                height={3}
            /> : null
    );
    const barChart = (
        data.confirmed
            ? (
                <Bar
                    data={{
                        labels:['Infected','Recovered' ,'Deaths'],
                        datasets:[{
                            label:'People',
                            backgroundColor:[
                                'rgba(0,0,255,0.5)',
                                'rgba(0,255,0,0.5)',
                                'rgba(255,0,0,0.5)'
                            ],
                            data:[data.confirmed.value,data.recovered.value,data.deaths.value]
                        }]
                    }}
                    options={{
                        legend:{display:false},
                        title:{display:true,text:`Current Situation in ${country}`}
                    }}
                    width={20}
                    height={6}
                />
            ): null
    );
    return (
        <div className={style.container}>
            {country? barChart: linechart}
        </div>
    )
}

export default Chart
