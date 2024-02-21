import { TextField } from '@mui/material';
import { Cloudy, Search, ThermometerSun, Wind } from 'lucide-react';
import Style from './weather.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { MagnifyingGlass } from 'react-loader-spinner';
import noresult from '../assets/images/noresults.png'
import toast, { Toaster } from 'react-hot-toast';
import Loaderss from './Loders/Loader';

const Weather = () => {

    //date for both date and time wise
    const date = new Date();

    // onchange value 
    const [city, setCity] = useState('')

    // variable declartion for store data of weather
    const [weatherr, setWeather] = useState("");

    //loder-spinner 
    const [loading, setLoading] = useState(false)

    //time 
    const [formattedTime, setFormattedTime] = useState('');


    //only time declaration
    useEffect(() => {
        const intervalId = setInterval(() => {
            const options = { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const currentDate = new Date();
            const newFormattedTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);
            setFormattedTime(newFormattedTime);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []); 

    //declartion for day date month year
    const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate2 = date.toLocaleDateString('en-US', options2);

    //api key, need to create in openweather website
    const apiKey = '237dbfce9f6bccdc080c69c1a5445483'

    //onclick function 
    const handleSearch = () => {
        setLoading(true)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then((res) => {
                setWeather(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                setWeather("")
                toast.error("Invalid city name")
            })
    }

    return (

        <div className={Style.maincontainer}>
            <div className={Style.cardcontainer}>
                <div className="text-center">
                    <div className={Style.time}>{formattedTime}</div>
                    <div className={Style.date}>{formattedDate2}</div>
                </div>
                <div className={Style.sidcscon}>
                    <br />
                    <div className='flex items-center justify-center gap-4'>
                        <div className='w-3/4'>
                            <TextField
                                id="city"
                                label="Search"
                                type="search"
                                variant="standard"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className='cursor-pointer' onClick={() => handleSearch()}>
                            <Search className={Style.scon} color="#FFFFFF" size={32} />
                        </div>
                    </div>
                    {
                        !loading ?
                            <div className={Style.idcscon}>
                                {
                                    weatherr ?
                                        <div>
                                            <div className={Style.img}></div>
                                            <div className='flex flex-col items-center justify-center gap-3 mt-7'>
                                                <div className='uppercase mb-0 font-bold text-4xl text-white flex items-center gap-3'><ThermometerSun size={36} color="#87CEEB" />{weatherr.main.temp}°C</div>
                                                <div className='uppercase mb-0 font-bold text-sm text-white flex items-center gap-2 tracking-widest'><Cloudy size={28} color="#87CEEB" />{weatherr.weather[0].description}</div>
                                                <div className='uppercase mb-0 font-bold text-sm text-white tracking-widest'>{weatherr.name}, {weatherr.sys.country}</div>
                                                <div className='uppercase mb-0 font-bold text-2xl text-white flex items-start gap-2'>
                                                    <div>
                                                        <Wind size={32} color="#87CEEB" />
                                                    </div>
                                                    <div className='tracking-wide'>
                                                        {weatherr.wind.speed}<span className='lowercase font-thin text-xs'>km / h</span> <br /><span className='lowercase font-thin text-xs'>wind speed</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='flex justify-center items-center mt-10'>
                                            <img src={noresult} className='w-100' />
                                            <span className=' mb-0 text-2lg text-white'>Please search for get weather details</span>
                                        </div>
                                }

                            </div>
                            :
                            <div className='flex items-center justify-center'>
                                <Loaderss />
                            </div>
                    }
                </div>
            </div>
            <Toaster />
        </div>

    );
};

export default Weather;
