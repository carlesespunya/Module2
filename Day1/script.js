'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const body = document.querySelector("body")

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
    </article>
  `

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

const renderError = function (message) {
  const html = `<p> ${message} </p> `
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;

}

// --------- Old school method to make api calls ------ !! don't use this !!

// const  getCountry = function (country) {
//   // AJAX call
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send();

//   request.addEventListener("load", function () {
//     const dataArray = JSON.parse(this.responseText)
//     const data = dataArray[0]
//     renderCountry(data)

//     const neighbour = data.borders[0]
//     // MAking a second request
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`)
//     request2.send()

//     request2.addEventListener("load", function () {
//       const dataArray2 = JSON.parse(this.responseText)
//       const data2 = dataArray2[0]
//       renderCountry(data2, "neighbour")
//     })
//   })
// }

// -------------- Callback hell --------------

// setTimeout(() => {
//   console.log("1sec")
//   setTimeout(() => {
//     console.log("2sec")
//     setTimeout(() => {
//       console.log("3sec")
//     }, 1000);
//   }, 1000);
// }, 1000);


// -------- Creating pomises --------------


// const lotteryPromise = new Promise(function( resolve, reject) {
//   console.log("lottery started")
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve("You won")
//     }else {
//       reject( new Error("You lost"))
//     }
//   }, 3000);
// })

// console.log(lotteryPromise)


// -------------- Consuming promises with (.then / .catch) ---------------


// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err))

///////////////////////////////////////

// ------------ fetch() ----- promise -------------


// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error( "Country not found")
//       }
//       console.log(response)
//       return response.json()
//     })
//     .then((data) => {
//       renderCountry(data[0])
//       if (!data[0].borders) {
//         throw new Error("Neigbhour not found")
//       }
//       const neighbour = data[0].borders[0];

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then((response) => {
//       return response.json()
//     })
//     .then((data) => {
//       renderCountry(data[0], "neighbour")
//     })
//     .catch((err) => {
//       console.error(`Error: ${err}`)
//       renderError(`We had some problems: ${err} `)
//     })
// }


// ----------- unins async / await to consume promises -------------


const getCountryData = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    if (!res.ok) {
      throw new Error( "Country not found")
    }
    const data = await res.json();
    console.log(data)
    renderCountry(data[0])

    if (!data[0].borders) {
     throw new Error("Neigbhour not found")
    }
    const nei = data[0].borders[0]

    const res2 = await fetch(`https://restcountries.com/v3.1/alpha/${nei}`)
    const data2 = await res2.json()
    renderCountry(data2[0], "neighbour")

  } catch (err){
    console.error(`Error: ${err}`)
    renderError(`We had some problems: ${err} `)
  }


}

btn.addEventListener("click", () => {
  getCountryData("spain")
})
