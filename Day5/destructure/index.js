let person = {
  name: 'Ironhacker',
  age: 25,
  favoriteMusic: 'Metal',
};

//let { name, age, favoriteMusic } = person

// let pName = person.name
// let age = person.age
// let favMusic = person.favoriteMusic



const data = {
  name: {
    firstName: 'ana',
    lastName: ['marino',"serra"],
  },
  isStudent: true,
  favoriteFootballTeam: 'fc barcelona',
  hometown: {
    city: 'buenos aires',
    country: 'argentina',
  },
  birthtown: {
    city: 'Olot',
    country: 'Spain',
  },
};

let {name: {firstName , lastName: [lastFirst, lastSecond] } , isStudent, favoriteFootballTeam, hometown: {city, country}, birthtown: {city1,country1} } = data

console.log(firstName)

console.log(isStudent)
console.log(favoriteFootballTeam)
console.log(lastFirst)
console.log(lastSecond)
console.log(city1) //undefined
console.log(country1) //undefined





const campuses = ['madrid', 'barcelona', 'miami'];

// let [firstCampus, secondCampus, thirdCampus] = campuses

// console.log(firstCampus)
// console.log(secondCampus)
// console.log(thirdCampus)

const europeanCampuses = [
  ['madrid', 'es'],
  ['barcelona', 'es'],
  ['berlin', 'de'],
  ['paris', 'fr'],
  ['amsterdam', 'nl'],
  ['lisbon', 'pt'],
];

let [[firstCampus, firstCountry], [secondCampus, secondCountry], [thirdCampus, thirdCountry]] = europeanCampuses


console.log(firstCampus)
console.log(secondCountry)
console.log(thirdCampus)
