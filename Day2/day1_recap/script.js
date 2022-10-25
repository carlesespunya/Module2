const labs = [["CSS Reies clone", 2], ["CSS Slack", 1],["JS Basic Algo", 3], ["JS Clue", 1], ["JS Vikings", 5]]
const labsList = document.querySelector(".labs")


function startLab(day) {
  return new Promise((resolve, reject) => {
    if (labs[day]) {
      setTimeout(() => {
        resolve(labs[day][0])
      }, labs[day][1] * 1000);
    } else {
      reject(`There's no lab for today: day ${day + 1}`)
    }
  })
}


// startLab(0)
//   .then((lab) => {
//     labsList.innerHTML += `<li>${lab}</li>`
//     return startLab(1)
//   })
//   .then((lab) => {
//     labsList.innerHTML += `<li>${lab}</li>`
//     return startLab(2)
//   })
//   .then((lab) => {
//     labsList.innerHTML += `<li>${lab}</li>`
//     return startLab(3)
//   })
//   .then((lab) => {
//     labsList.innerHTML += `<li>${lab}</li>`
//     return startLab(4)
//   })
//   .then((lab) => {
//     labsList.innerHTML += `<li>${lab}</li>`
//   })

async function makeLabs() {
  try {
    const lab1 = await startLab(0)
    labsList.innerHTML += `<li>${lab1}</li>`
    const lab2 = await startLab(1)
    labsList.innerHTML += `<li>${lab2}</li>`
    const lab3 = await startLab(2)
    labsList.innerHTML += `<li>${lab3}</li>`
    const lab4 = await startLab(9)
    labsList.innerHTML += `<li>${lab4}</li>`
    const lab5 = await startLab(4)
    labsList.innerHTML += `<li>${lab5}</li>`
  }catch (error) {
    labsList.innerHTML += `<li>${error}</li>`
    console.log(error)
  }
}



makeLabs()
