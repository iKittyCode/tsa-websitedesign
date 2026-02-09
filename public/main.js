function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
 
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  function myFunction(x) {
    x.classList.toggle("change");
    openNav()
  }
let people_div = document.getElementById("people")
let people_data;
async function fetchData() {
  try {
    const response = await fetch('accurate_people.json');

    const data = await response.json(); 
    
   
    console.log(data); 
    people_data = data
    data.forEach(item => console.log(item.date, item.description)

    );
    
   for (people of people_data) { 
     const newSection = document.createElement("section")
     newSection.innerHTML = `<h1> ${people["description"]} </h1>`
     people_div.appendChild(newSection)
   }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
