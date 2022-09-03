import axios from "axios";
import React from "react";



const URLWEATHER='https://eeeeeeeend.herokuapp.com/getweather';
const URLMOVIE='https://eeeeeeeend.herokuapp.com/movie';
const URLLOCATION='https://eu1.locationiq.com/v1/search';
const LOCATION_API='pk.e6f569abb6089f922ac76a14ac4bc5e4';


class Main extends React.Component{


    constructor(props){

        super(props)

        this.state={

        weatherData:'',
        lon:'',
        lat:'',
        moviedata:'',
        cityName:''


        };
    
    }


handleSearch=(event)=>{

    event.preventDefault();
    const cityname=event.target.City.value
    
    
    // get lan and lon from location API 

  
    axios.get(`${URLLOCATION}?key=${LOCATION_API}&q=${cityname}&format=json`).then(res=>{
        const apiData=res.data[0];
        this.setState({
            lon:apiData.lon,
            lat:apiData.lat,
            cityName:cityname

        })

    })




    // get weather from localhost:3002 
    axios.get(`${URLWEATHER}?city=${cityname}`).then(res=>{   
        const resData=res.data;
        
        this.setState({
            weatherData:resData

        })
       console.log(resData)
    })

    



    // get movie from localhost:3002 
    axios.get(`${URLMOVIE}?city=${cityname}`).then(res=>{   
        const resData=res.data;
        
        
            this.setState({

        
                moviedata:resData
    
    
                })

            

        })
        .catch( error =>{
            console.log(error);
          })
         
        
              
            

        
    }
    







render(){

  return(

    <div class='bodyitmes'>

    <form onSubmit={this.handleSearch}>

        <label >Your Location  </label>
        <input type='text' name='City'></input>
        <button type='submit' >Explore</button>

    </form>

    <br></br>


    <div class="card1">
         <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_API}&center=${this.state.lat},${this.state.lon}`} alt='City Map' class= 'mapimage'/>
         <div class="container">
         <h3><b>{this.state.cityName}</b></h3>
         <br></br> 
         <p><h4>lon:{this.state.lon} || lan: {this.state.lat} </h4></p> 
         </div>
         </div>

   
    
    <hr></hr>
    <div class='weather'>
        <div class="row">
    {Array.isArray( this.state.weatherData)?
    this.state.weatherData.map(element=>{
       return(
        
        <div class="column">
            <div class="card"> 
            <img class='cloud' src='./images/cloud.jpg'></img>
            <h1>Date: {element.localTime}</h1>
               <h1>weather: {element.forecast}</h1></div>
        </div>
        
        
      )
    })

:null}
    

    </div>
        </div>
    
    


    
   
    
    
    
    <div class='movie'>
        <div class="row">
      {Array.isArray(this.state.moviedata)
        ? this.state.moviedata.map(element => {

            return (

                <div class="column">
                    <div class ='card'>
                <img class = 'cloud' src={`https://image.tmdb.org/t/p/w500${element.img}`}/>
                <h1>{element.title}</h1>
                
                <p>{element.overview}</p></div>
  
                 </div>
            
           );
          })
        : null}
 

    </div>
    </div>

  

      
  
    </div>

    
    
      
 
   
 
 
  



  )}
}


export default Main;
