import React, {useState, useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faCloud, faPooStorm, faCloudRain, faCloudSun, faCloudSunRain, faCloudShowersHeavy, faCloudMoonRain, faCloudMeatball, faSnowflake, faCloudMoon, faMoon, faSmog} from '@fortawesome/free-solid-svg-icons'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    
  },
  paper: {
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: 'cadetblue'
  },
  cardBlock: {
    display: "block",
    
  },
  card: {
    justifyContent: "space-between",
    padding: "5px",
  },
  cardLine: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    fontSize: "10px",
    backgroundColor: 'dimgrey',
    '&:hover':{
      backgroundColor: 'green'
    }
    
  },
  icon: {
    paddingLeft: '10px',
    fontSize: '24px'
  },

  buttonDelete: {
    color: "crimson",
  },
  link: {
    textDecoration: 'none'
  },
  name: {
    fontSize: '20px'
  }
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);



function WeatherCard(weatherCard) {
  
  const classes = useStyles();

  const [weatherListCard, setWeatherListCard] = useState(weatherCard);
  
  const API_KEY = "69237bcd47ff54fb3b8740cfde008960";
  let id;

  
 
  

  async function FetchData() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
   
    setWeatherListCard({ weather: data });
    
    
   
  }

  
  const refetchData = () => {
    id = weatherListCard.weather.id;
    FetchData();
    
  };
  let iconColor;
  let weatherIcon;
  
  const arr = weatherListCard.weather.weather
  switch(arr[0].main) {
    case 'Clouds':
       weatherIcon = faCloud;
       iconColor = 'lightgray';
       break;
    case 'Rain': 
      weatherIcon = faCloudRain;
      iconColor = 'gray'
      break;
    case 'Snow': 
      weatherIcon = faSnowflake;
      iconColor = 'white'
      break;
    case 'Clear':
      weatherIcon = faSun 
      iconColor = 'yellow'
      
      break;
    case 'Mist':
      weatherIcon = faSmog;
      iconColor = 'gray';
  }
  
  
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.cardBlock}>
          <Grid container className={classes.card}>
            <Grid item className={classes.cardLine}>
            <Grid item className={classes.name}>{weatherListCard.weather.name}</Grid>
           <FontAwesomeIcon className={classes.icon} icon={weatherIcon} color={iconColor}/>
           </Grid>
            <Grid item className={classes.cardLine}>
              <Grid item className={classes.name}>{weatherListCard.weather.main.temp} C°</Grid>
              <IconButton  aria-label="delete" className={classes.buttonDelete} onClick={() => (weatherCard.onDelete(weatherCard.index))} >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container className={classes.card}>
            <NavLink to={'/Details/' + weatherListCard.weather.id} className={classes.link}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              
            >
              Детальнее
            </Button>
            </NavLink>
            <ColorButton
              className={classes.button}
              onClick={() => refetchData()}
              variant="contained"
              color="primary"
            >
              Обновить данные о погоде
            </ColorButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default WeatherCard;
