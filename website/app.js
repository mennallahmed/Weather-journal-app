/* Global Variables */
const baseUrl='http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey=',&appid=5ccb5216f8c706393e17660c1893fbd3&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',performAction);
/* Function called by event listener */
function performAction(e){
  const newZip = document.getElementById('zip').value;
  const newContent = document.getElementById('feelings').value;
  getWeather(baseUrl,newZip,apiKey)
  .then(function(data){
    console.log(data);
    postData('http://localhost:8000/add',{date: newDate, temp: data.main.temp, content: newContent})
    .then(
      updateUi()
    )
  })
}
/* Function to GET Web API Data*/
const getWeather= async (baseUrl, zip, key)=>{

  const res = await fetch(baseUrl+zip+key)
  try{
    const data = await res.json();
    console.log(data)
    return data;
  } 
  catch(error){
    console.log("error",error);
  }
}
/* Function to POST data */
const postData = async(url = '', data = {})=>{
  const response = await fetch(url,{
    method: 'POST',
    credentials:'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }

}

/* Function to GET Project Data */
const updateUi = async () => {
  const request = await fetch('http://localhost:8000/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.content}`;
  
  }catch(error){
    console.log("error", error);
  }

}