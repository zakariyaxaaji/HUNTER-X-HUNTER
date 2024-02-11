// const personalInfo = {
//   email: "yourEmail@gmail.com",
//   name: "your name",
//   usage: "am trying to learn how to use APIs",
// };
// fetching to register sooo i can get API key
// fetch("https://hxh-api.onrender.com/api/v1/guest/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(personalInfo),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//variables
const baseURL = "https://hxh-api.onrender.com";
const api_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzBmZGI1MDYyMDQxMWZjYjNmODM3OCIsImlhdCI6MTcwNzE0NjY3NywiZXhwIjoxNzA5NzM4Njc3fQ.xlIScOWTIR2i2MkWGufclmkmsncaEBTJaxoAit2MH7g";
let ArrayOfCharacters = []; // this is populated from fetchData()
const cards = document.querySelector(".cards");
const temp = document.querySelector(".template");
const content = temp.content;
const searchInput = document.querySelector("#search");

// Create helper funcitons below
async function fetchData(baseURL, api_key) {
  const response = await fetch(
    `${baseURL}/api/v1/characters?api_key=${api_key}&page=1&limit=24`
  );
  const data = await response.json(); //data is an object
  const results = data.data; // results is an Array of objects
  // console.log(results);

  ArrayOfCharacters = results.map((result) => {
    return {
      name: result.name,
      gender: result.gender,
      also_known_as: result.also_known_as,
      nen_type: result.nen_type,
      img: result.image[0].secure_url,
    };
  });
}

function createCard(array) {
  array.forEach((element, index) => {
    // Clone the template content for each item
    const clone = content.cloneNode(true);

    // Modify the cloned content with data from the array item
    let el = clone.querySelector(".card");
    const name = clone.querySelector(".name");
    const img = clone.querySelector(".img");
    const gender = clone.querySelector(".gender");
    const nen = clone.querySelector(".nen");

    element["li"] = el;
    name.textContent = `${index + 1}  ${element.name}`;
    gender.textContent = `Gender: ${element.gender}`;
    nen.textContent = `Nen-type: ${element.nen_type}`;
    img.setAttribute("src", element.img);
    img.setAttribute("alt", `this is an img of ${element.name}`);

    // Append the modified content to the cards
    cards.appendChild(clone);
  });
}

//Search functionality
searchInput.addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase();
  console.log(ArrayOfCharacters);
  ArrayOfCharacters.forEach((character) => {
    const isVisible =
      character.name.toLowerCase().includes(text) ||
      character.nen_type.includes(text);
    character.li.classList.toggle("hide", !isVisible);
  });
});

// Run functions below
(async () => {
  await fetchData(baseURL, api_key);
  createCard(ArrayOfCharacters);
})();
