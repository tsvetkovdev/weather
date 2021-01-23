import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WeatherCard from '../WeatherCard/WeatherCard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../Loader/Loader'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
    height: '100vh',
    
    padding: theme.spacing(15),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'rgb(230, 238, 255)',
    borderRadius: '10px'
  },
  cardBlock: {
    display: 'block'
  },
  card: {
    justifyContent: 'space-around'
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    textAlign: 'center',
    padding: '16px'
  },
  title: {
    width: '100%',
    margin: '30px',
    fontSize: '28px'
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
   
  },
  
  
  
}));




 

function Wrapper() {

  const classes = useStyles();
  let citiesArray = [524901, 703448, 264374]
  const AddLocalStorage = () => {
    localStorage.setItem('weather', JSON.stringify(citiesArray))
  }

  if (localStorage.getItem('weather')) {
    citiesArray = JSON.parse(localStorage.getItem('weather'))
  }
  else AddLocalStorage()
  const [cities, setCities] = useState(JSON.parse(localStorage.getItem('weather')))
  const [weatherList, setWeatherList] = useState([])
  const [cityName, setCityName] = useState('')
  const [alertStateForAlreadyAdded, setalertStateForAlreadyAdded] = useState(false)

  const [alertStateForNonExistent, setalertStateForNonExistent] = useState(false)
  const { register, handleSubmit } = useForm();
  
  

  const API_KEY = '69237bcd47ff54fb3b8740cfde008960'
  const position = {
    vertical: 'top',
    horizontal: 'center',
  }

  const { vertical, horizontal} = position;

  useEffect(() => {
      
    FetchData()
    
  },[])
  


  
    useEffect(()=>{
      localStorage.setItem('weather',JSON.stringify(cities))
    }, [cities])
   
  

  

  async function FetchData() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${cities}&appid=${API_KEY}&units=metric`)
    const data = await res.json()
    setWeatherList(data.list)
   
    
  }


  async function FetchCityWeather() {
   
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
    const data = await res.json() 

    const checkCity = () => {
     return weatherList.find(weather => (weather.name === data.name)) ? false : true;
     }
   
    const setStates = () => {
      setWeatherList([...weatherList, data]) 
      setCities([...cities, data.id])
    }

    data.weather ? (checkCity() ? setStates() : setalertStateForAlreadyAdded(true) ) : setalertStateForNonExistent(true)
    
    
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const onDelete = (id) => {
    const tempWeather = [...weatherList]
    tempWeather.splice(id, 1)
    setWeatherList(tempWeather)
    const tempCities = [...cities]
    tempCities.splice(id, 1)
    setCities(tempCities)
    
  }
  
  const addCity = () => {
    document.getElementById('outlined-basic').value= '';
    FetchCityWeather()
  }

 

  
 
  
  
  
  

 
 
   

 
  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
       
      

        <Grid container >
        
        <span className={classes.title}>Погода в разных городах мира</span>
        <Grid item className={classes.form} >
       
        <Grid item  sm={9}>
        <form onSubmit={handleSubmit(addCity)}>
        <TextField className={classes.input} ref={register} id="outlined-basic" label="Введите название города" variant="outlined" onChange={e => (setCityName(e.target.value))}/>
        </form>
        </Grid>
        <Grid item   >
        <Button className={classes.input} variant="contained" color="primary" onClick={() => (addCity())} >Узнать погоду</Button>
        </Grid>
       
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertStateForAlreadyAdded} autoHideDuration={6000} onClose={()=>{setalertStateForAlreadyAdded(false)}} key={vertical + horizontal}>
        <Alert onClose={()=>{setalertStateForAlreadyAdded(false)}} severity="info">
          Вы уже добавили этот город
        </Alert>
        </Snackbar>

        <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertStateForNonExistent} autoHideDuration={6000} onClose={()=>{setalertStateForNonExistent(false)}} key={vertical + horizontal}>
        <Alert onClose={()=>{setalertStateForNonExistent(false)}} severity="warning">
          Такого города не существует
        </Alert>
        </Snackbar>


        </Grid>
        {weatherList ?
        weatherList.map((weather, index) => (<WeatherCard key={weather.id} setCities={setCities} onDelete={onDelete} index={index}  weather={weather}/>))
        : 
        <Loader />
      }
          
          
          
        </Grid>
      
      </Paper>
    </div>
  )
}

export default Wrapper
