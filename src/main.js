import axios from "axios";
import React from "react";
const URLWEATHER='http://localhost:3002/getweather';
const URLMOVIE='http://localhost:3002/movie';
const URLLOCATION='https://eu1.locationiq.com/v1/search';
const LOCATION_API='pk.e6f569abb6089f922ac76a14ac4bc5e4';

class Main extends React.Component{


    constructor(props){

        super(props)

        this.state={

        weather:'',
        date:'',
        lon:'',
        lat:'',
        moviedata:'',


        };
    
    }


handleSearch=(event)=>{

    event.preventDefault();
    const cityname=event.target.City.value



    // // get lan and lon from location API 
    // axios.get(`${URLLOCATION}?key=${LOCATION_API}&q=${cityname}&format=json`).then(res=>{
    //     const apiData=res.data[0];
    //     this.setState({
    //         lon:apiData.lon,
    //         lat:apiData.lat

    //     })

    // })




    // // get weather from localhost:3002 
    // axios.get(`${URLWEATHER}?city=${cityname}`).then(res=>{   
    //     const resData=res.data;
        
    //     this.setState({
    //         weather:resData.forecast,
    //         date:resData.localTime

    //     })
    // })


    // get movie from localhost:3002 
    axios.get(`${URLMOVIE}?city=${cityname}`).then(res=>{   
        const resData=res.data;
            this.setState({

        
                moviedata:resData
    
    
                })

            

        })
         
        
              
            

        
    }
    







render(){

  return(

    <div>

    <form onSubmit={this.handleSearch}>

        <label >City: </label>
        <input type='text' name='City'></input>
        <button type='submit' >Explore</button>

    </form>

    <h2>lon: {this.state.lon}</h2>
    <h2>lan: {this.state.lat}</h2>
    <hr></hr>
    
    <hr></hr>
    <h1>weather: {this.state.weather}</h1>
    <h1>Date: {this.state.date}</h1>
    <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_API}&center=${this.state.lat},${this.state.lon}`} alt='City Map'/>
    <hr></hr>
    <hr></hr>
    <div>
    <>
    
      </>
  </div>
    </div>

    
    
      
 
   
 
 
  



  )}
}


export default Main;
