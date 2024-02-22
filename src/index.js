import './style.css';

import rainpng from './images/rain.png';
import sunpng from './images/sun.png';
import cloudpng from './images/cloud.png';

console.log('helo working');

// 7869b01f3d68411aaf2171821241502  : api key weather

// seting constant

const container = document.querySelector('.container');
const searchInput = document.querySelector('.search');
const btn = document.querySelector('#submit');
const form = document.querySelector('#form');
const tempratureContainer = document.querySelector('.temprature');
const celciusContaier = document.querySelector('.tempratureCelcius');
const cityContainer = document.querySelector('.cityName');
const tempratureTitle = document.querySelector('.tempratureTitle');
const tempratureImage = document.querySelector('.tempratureImage');
const mainContent = document.querySelector('.mainContent');
const imageContainer = document.querySelector('.imageContainer');

document.addEventListener('DOMContentLoaded', () => {
  weather('dehradun');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log("btn is cliked")
  const searchValue = searchInput.value;
  weather(searchValue);
});

//  backgrounds
let sunBack =
  'linear-gradient(90deg, rgba(224,220,164,1) 0%, rgba(210,177,85,1) 35%, rgba(210,135,17,1) 100%)';
let rainBack =
  'linear-gradient(90deg, rgba(141,144,144,1) 0%, rgba(102,105,106,1) 35%, rgba(58,59,60,1) 100%)';
let cloudBack =
  'linear-gradient(90deg, rgba(154,203,200,1) 0%, rgba(40,175,231,1) 35%, rgba(5,55,65,1) 100%)';

//
const weather = async function (city) {
  try {
    const weatherData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=7869b01f3d68411aaf2171821241502&q=${city}`,
    );
    // console.log(weatherData)
    const data = await weatherData.json();
    const temprature = '';
    let conditionText = data.current.condition.text;
    let currentTempC = data.current.temp_c;
    let cloudValue = data.current.cloud;
    tempratureTitle.textContent = conditionText;
    celciusContaier.textContent = currentTempC;

    const degree = document.createElement('span');
    degree.innerHTML = `&#176;C`;
    celciusContaier.appendChild(degree);

    cityContainer.textContent = city;

    // changing background

    if (cloudValue <= 30) {
      //sunny

      imageCreate(sunpng);
      container.style.background = sunBack;
      document.body.style.background = sunBack;
    } else if (cloudValue > 30 && cloudValue <= 85) {
      //patch rain

      imageCreate(cloudpng);
      document.body.style.background = cloudBack;

      container.style.background = cloudBack;
    } else if (cloudValue > 85) {
      //rain
      imageCreate(rainpng);
      document.body.style.background = rainBack;

      container.style.background = rainBack;
    }

    console.log(data);
  } catch (err) {
    console.log(err);
    alert('enter correct city name');
  } finally {
    console.log('weather is here');
  }
};

function imageCreate(weatherCondition) {
  // clear previous svg content
  imageContainer.innerHTML = '';

  const imgElem = document.createElement('img');
  imgElem.src = weatherCondition;

  imgElem.width = 150;
  imgElem.height = 150;

  // //set svg content as inner html
  // svgElem.innerHTML = weatherCondition;
  // // svgElem.appendChild(imageElem)

  // //apend svg to container
  imageContainer.appendChild(imgElem);
}
