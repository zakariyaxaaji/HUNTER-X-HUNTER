// const personalInfo = {
//   email: "zakariyaxaaji@gmail.com",
//   name: "Zakariya Afrah",
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

const baseURL = "https://hxh-api.onrender.com"; // should this end with a trailing slash (/)
const api_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzBmZGI1MDYyMDQxMWZjYjNmODM3OCIsImlhdCI6MTcwNzE0NjY3NywiZXhwIjoxNzA5NzM4Njc3fQ.xlIScOWTIR2i2MkWGufclmkmsncaEBTJaxoAit2MH7g";

async function fetchData(baseURL, api_key) {
  // async function returns a promise
  const response = await fetch(
    `${baseURL}/api/v1/characters?api_key=${api_key}`
  );
  const data = await response.json(); //data is an object
  const results = data.data; // results is an Array of objects

  const ArrayOfCharacters = results.map((result) => {
    const character = {
      name: "",
      gender: "",
      also_known_as: undefined,
      nen_type: undefined,
      img: "",
    };
    character.name = result.name;
    character.gender = result.gender;
    character.also_known_as = result.also_known_as;
    character.nen_type = result.nen_type;
    character.img = result.image[0].secure_url;
    return character;
  });
  createCard(ArrayOfCharacters);
  return ArrayOfCharacters
}
fetchData(baseURL, api_key)

const cards = document.querySelector(".cards");
function createCard(array) {
  const elements =[]
  const htmlString = array
    .map((arr) => {
      return `<li class="card">
      <img
        src="${arr.img}"
        alt="image of ${arr.name} "
      />
      <h2 class ="name">${arr.name}</h2>
      <p>
        Gender: ${arr.gender} <br />
        Nen-typ: ${arr.nen_type} <br />
      </p>
    </li>`;
    })
    .join(" ");
  
  cards.innerHTML = htmlString;
}

const searchBar = document.querySelector('#search')
const searchGlass = document.querySelector('.search>img')

// the logic for a searchbar 
