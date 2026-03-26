var map = L.map('map').setView([40.7062, -74.5493] , 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
 L.marker([40.7062, -74.5493]).addTo(map)
  .bindPopup("<b>Basking Ridge Center</b><br>Historic town square of Basking Ridge");
L.marker([40.7071, -74.5542]).addTo(map)
  .bindPopup("<b>Basking Ridge Presybetarian Church</b><br>Site of former 600 year old oak tree. ");
L.marker([40.7066, -74.5500]).addTo(map)
  .bindPopup("<b>Brick Academy</b><br>Museum and former schoolhouse located in Basking Ridge operated by the Somerset Hills Historical Society.");
 
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
     newSection.innerHTML = `<div class="person-card" style="justify-content:center"><h1 style="padding-bottom:50px" > ${people["name"]} </h1> <div style="justify-content:center"> <img src= ${people["image"]} width=240; height=300;> </div> <p>${people["description"]}</p> </div>`
     people_div.appendChild(newSection)
   }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / document.body.scrollHeight) * 100;
  document.querySelector(".progress-bar").style.width = scrolled + "%";
});

document.addEventListener("mousemove", e => {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.style.left = e.pageX + "px";
  glow.style.top = e.pageY + "px";
  document.body.appendChild(glow);

  setTimeout(() => glow.remove(), 500);
});
fetchData();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".element-scroll").forEach(el => {
  observer.observe(el);
});
const sections = document.querySelectorAll("#people section");

const sliderObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sections.forEach(s => s.classList.remove("active"));
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.6 });

sections.forEach(sec => sliderObserver.observe(sec));
function submit() {
  let fname = document.getElementById("fname")
  let lname = document.getElementById("lname")
  let subject = document.getElementById("subject")
  let fnameval = fname.value
  let lnameval = lname.value
  let subjectval = subject.value

  const userapp = { fnameval, lnameval, subjectval};
  if (localStorage.getItem("user")) {
  var storedUser = JSON.parse(localStorage.getItem('user'));
  storedUser.append(userapp)
  console.log(storedUser)
  localStorage.setItem("user", JSON.stringify(storedUser))
  
  } else { 
    let user = []
    user.push(userapp)
    console.log(user)
    localStorage.setItem("user", JSON.stringify(user))
  }



}