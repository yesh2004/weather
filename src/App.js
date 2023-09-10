import { useState,useEffect } from "react";
import Clear from './asset/clear.svg'
import ClearN from './asset/Clear-moon.svg'
import Cloud from './asset/cloud.svg'
import CloudN from './asset/moon-cloud.svg'
import Haze from './asset/haze.svg'
import Rain from './asset/Rains.svg'
import Snow from './asset/snow.svg'
import Storm from './asset/storm.svg'
function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState();
  const [icon,setIcon]=useState("");
  
  
  useEffect(()=>{
    console.log("weather changed")
    const setImage=()=>{
      
     if(weather){
      const time=(weather.weather[0].icon).includes("n")?"Night":"Day"
      const id=weather.weather[0].id
       if(id === 800){
        if(time ==="Day"){
          setIcon(Clear)
        }else{
          setIcon(ClearN)
        }
         ;
     }else if(id >= 200 && id <= 232){
         setIcon(Storm);  
     }else if(id >= 600 && id <= 622){
         setIcon(Snow);
     }else if(id >= 701 && id <= 781){
         setIcon(Haze);
     }else if(id >= 801 && id <= 804){
      if(time ==="Day"){
        setIcon(Cloud)
      }else{
        setIcon(CloudN)
      }
         
     }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
         setIcon(Rain);
     }
     console.log(icon)
     }
     
   }
   setImage()
  },[weather,icon])
   const  fetchWeather = async () => {
     await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82d2e6c408d294eebce8b6f227d42775&units=metric`
    )
      .then((res) => {
        if(!res.ok){
          alert("Invalid Input Please Check Your Spelling")
          setWeather(weather)
        }else{
          return res.json()
        }
        })
      .then((data) =>{
        if(data){
          setWeather(data)
          
        }else{
          setWeather(weather)
          
        }
      })
      .catch((error) => console.log(error));
      
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  return (
    <div className="app flex flex-col items-center">
      <h1 className="py-4 text-5xl text-white font-bold">Search Weather</h1>
      <div className="form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter city name"
                  className="px-4 py-3 rounded-l-lg border-none focus:border-none focus:outline-none outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit" className="px-4 py-3 bg-[#8696FE] text-white rounded-r-lg">
                  Search
                </button>
              </form>
        </div>
        
        {weather && (
          
        <div className="card bg-[#8696FE] text-white w-[320px] h-[450px] flex flex-col justify-center items-center mt-10 rounded-lg">
          <h4 className="text-4xl font-bold">{weather.name}</h4>
          <img
            src={icon}
            alt=""
            className="w-[150px]"
          />
          <h2 className="text-5xl font-bold mb-2">{weather.main.temp}&deg;</h2>
          <p className="font-semibold text-xl">{weather.weather[0].main}</p>
          <p className="font-semibold text-xl">{(weather.weather[0].icon).includes("n")?"Night":"Day"}</p>
          <div className="flex flex-row justify-between">
            <div className="">
              <h3 className="text-xl font-bold">Feels Like</h3>
              <p className="font-semibold">{weather.main.feels_like}&deg;</p>
            </div>
            <div className="ml-14">
              <h3 className="text-xl font-bold">Humidty</h3>
              <p className="font-semibold">{weather.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
