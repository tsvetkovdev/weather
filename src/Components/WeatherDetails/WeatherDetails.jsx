import React,{useState, useEffect} from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faCloud, faPooStorm, faCloudRain, faCloudSun, faCloudSunRain, faCloudShowersHeavy, faCloudMoonRain, faCloudMeatball, faSnowflake, faCloudMoon, faMoon, faSmog, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    
  },
  paper: {
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: '600px',
    backgroundColor: 'rgba(200, 200, 200, 0.5)'
  },
  cardBlock: {
    display: "block",
    
  },
  cardParent: {
    display: 'inline-block',
    padding: "5px",
    position: 'relative'
  },
  cardChild: {
    display: 'inline-block',
   position: 'absolute',
   bottom: '0'
  },
  link: {
    textDecoration: 'none',
   
  },
  name: {
    fontSize: '24px'
  },
  
  icon: {
    fontSize: '100px',
    paddingTop: '10px',
    paddingLeft: '10px'
    
  },
  title: {
    display: 'inline-block',
    padding: '10px'
    
  },
  wrapper: {
    padding: '10px'
  },
  loader: {
    textAlign: 'center',
  },
  
}));


function WeatherDetails(weatherId) {
  

 
  const [weatherDetails, setWeatherDetails] = useState();
  const [weatherIcon, setWeatherIcon] = useState(faSun);
  const [iconColor, setIconColor] = useState('yellow');
  const [deg, setDeg] = useState()
  const [time, setTime] = useState()
  const id = weatherId.match.params.name
  const API_KEY = "69237bcd47ff54fb3b8740cfde008960";
  const classes = useStyles()
  const [weatherForHours, setweatherForHours] = useState([]);
  useEffect(()=>{
  FetchData()
  },[])

 //fffffffffffffffffffffffffffffffffff
  async function FetchData() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();
 
  setWeatherDetails(data);
  setDeg(data.wind.deg)
  chooseIconAndGetTime(data)
  }
  
 
  
  const chooseIconAndGetTime = (data) => {
    let date = new Date(); 
    const currentUTC = date.getUTCHours();
    const time = currentUTC + data.timezone/3600
    time > 23 ? setTime(time -24) : setTime(time)
    const arr = data.weather[0].main
    switch(arr) {
      case 'Clouds':
        setWeatherIcon(faCloud)
        setIconColor('lightgray')
         break;
      case 'Rain': 
      setWeatherIcon(faCloudRain)
      setIconColor('gray')
        break;
      case 'Snow': 
      setWeatherIcon(faSnowflake)
      setIconColor('white')
        break;
      case 'Clear':
        (time > 5 && time <18) ? setWeatherIcon(faSun) : setWeatherIcon(faMoon);
        (time > 5 && time <18) ? setIconColor('yellow') : setIconColor('darkblue')
        
        break;
      case 'Mist':
        setWeatherIcon(faSmog)
        setIconColor('gray')
    }
    
  }

  const getMin = () => {
    let date = new Date(); 
    const currentMin = date.getMinutes();
   
    return(currentMin)
    
  }
 
  //fffffffffffffffffffffffffffffffffff
 

  
  
 
    return(

    <div className={classes.root}>
      
      <Paper className={classes.paper}>
      
        {weatherDetails 
        ? 
        
        <Grid container className={classes.wrapper}>
         
        
          <Grid item className={classes.title} sm={6} >
          <Grid item className={classes.name}>{weatherDetails.name} </Grid>
          <FontAwesomeIcon className={classes.icon} icon={weatherIcon} color={iconColor}/>
          </Grid>
       


        <Grid item  className={classes.cardParent} sm={6}  >
          <Grid container className={classes.cardChild}>
           <Grid item >Время: {time}:{getMin()}</Grid>
           <Grid item >Температура воздуха: {weatherDetails.main.temp} C°</Grid>
           <Grid item >Ощущается как: {weatherDetails.main.feels_like} C°</Grid>
           <Grid item >Влажность: {weatherDetails.main.humidity} %</Grid>
           <Grid item >Ветер: <FontAwesomeIcon style={{transform: `rotate(${deg}deg)`}}  icon={faArrowUp} /> {weatherDetails.wind.speed}km/h</Grid>
        </Grid>
        </Grid>
       <Grid item className={classes.button}>
      <NavLink className={classes.link} to={'/weather/'}>
      <Button>Вернуться к списку городов</Button>
      </NavLink>
      </Grid>
     </Grid>
    : 
    <Grid item className={classes.loader}>
    <Loader />
    </Grid>
    }
      </Paper>
    </div> 
    
    )
}

export default WeatherDetails
