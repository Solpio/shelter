import Popup from "./popup.js";
import Burger from "./burger_menu.js";

const desktop = 1280;
const tablet = 768;
const mobile = 320;

let bundle = [];

const router = async () => {
  await Burger.createButton();
  await fetch("../../assets/data/pets.json").then((response) =>
    response.json().then((pets) => {
      for (let pet of pets) {
        bundle.push(pet);
      }
    })
  );
  let pagination_bundle = await cutBundle(createPaginationBundle(bundle));

  await renderPagination(pagination_bundle[0]);
  await PaginationController(pagination_bundle);
};

window.addEventListener('load', router);


function createPaginationBundle(bundle){
    const pages = 6;
    let result = [];
    for (let i = 0; i < pages; i++){

        result.push(...shaffle(bundle));
    }
    console.log(result)
    return result;
}

function cutBundle(bundle){

    let num_of_cards;
    if (window.innerWidth >= desktop){
        num_of_cards = 8;
    } else if (window.innerWidth >= tablet){
        num_of_cards = 6;
    } else {
        num_of_cards = 3;
    }
    let result = [];

    for (let i = 0; i < bundle.length; i+= num_of_cards){
        result.push(bundle.slice(i, i + num_of_cards));
    }
 
    return result
}

function renderPagination(array, page = 0){
  console.log(array);
    let pagination_wrapper = document.querySelector(".pagination__wrapper");
    let span = document.querySelector("#page_id");
    span.textContent = page + 1;
    pagination_wrapper.append(...createCards(array));
}

function deletePagination() {
    let pagination_wrapper = document.querySelector(".pagination__wrapper");
    pagination_wrapper.innerHTML = "";
}

function PaginationController(bundle){
    let left_button = document.querySelector("#left");
    let right_button = document.querySelector("#right");
    let max_left_button = document.querySelector("#max_left");
    let max_right_button = document.querySelector("#max_right");
    let page = 0;
    left_button.addEventListener("click", ()=>{
        page -= 1;
        controllPaginationButtons(page, bundle.length - 1);
        deletePagination();
        renderPagination(bundle[page], page);
    });

    right_button.addEventListener("click", ()=>{
        page += 1;
        controllPaginationButtons(page, bundle.length - 1);
        deletePagination();
        renderPagination(bundle[page], page);
    });

    max_left_button.addEventListener("click", ()=>{
        page = 0;
        controllPaginationButtons(page, bundle.length - 1);
        deletePagination();
        renderPagination(bundle[page], page);
    });

    max_right_button.addEventListener("click", ()=>{
        page = bundle.length - 1;
        controllPaginationButtons(page, bundle.length - 1);
        deletePagination();
        renderPagination(bundle[page], page);
    });
}

function controllPaginationButtons(page, maxpage){
    let left_button = document.querySelector("#left");
    let right_button = document.querySelector("#right");
    let max_left_button = document.querySelector("#max_left");
    let max_right_button = document.querySelector("#max_right");
    
    if (page === maxpage){
        right_button.disabled = true;
        max_right_button.disabled = true;
        right_button.classList.add("pagination__button--disabled");
        max_right_button.classList.add("pagination__button--disabled");
    } else{
        right_button.disabled = false;
        max_right_button.disabled = false;
        right_button.classList.remove("pagination__button--disabled");
        max_right_button.classList.remove("pagination__button--disabled");
    }

    if (page === 0){
        left_button.disabled = true;
        max_left_button.disabled = true;
        left_button.classList.add("pagination__button--disabled");
        max_left_button.classList.add("pagination__button--disabled");
    } else{
        left_button.disabled = false;
        max_left_button.disabled = false;
        left_button.classList.remove("pagination__button--disabled");
        max_left_button.classList.remove("pagination__button--disabled");
    }
}


function shaffle(array) {
    let new_arr  = [...array];
    let currentIndex = new_arr.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [new_arr[currentIndex], new_arr[randomIndex]] = [
        new_arr[randomIndex], new_arr[currentIndex]];
    }
    return new_arr;
  }
  
  
  function createCard(obj){
    let div = document.createElement("div");
    div.classList.add("pet_card");
    div.classList.add("pet_card--pets_page");
  
    let card_image = document.createElement("img");
    card_image.classList.add("card__image");
    card_image.setAttribute("alt", obj.type);
    card_image.setAttribute("src", obj.img);
  
    let card_details = document.createElement("div");
    card_details.classList.add("card__details");
  
    let card_name = document.createElement("span");
    card_name.classList.add("card__name")
    card_name.textContent = obj.name;
  
  // add popup-create-function
    let card_button = document.createElement("button");
    card_button.classList.add("card__button");
    card_button.classList.add("button--secondary");
    card_button.textContent = "Learn more";
  
  
    card_details.append(card_name, card_button);
    div.append(card_image,card_details);
  
  
    div.addEventListener("click", ()=>{
      Popup.createPopup(obj);
    })
  
  
    return div;
  }
  
  
  function createCards(arr){
    let cards = [];

    for (let pet of arr){
      cards.push(createCard(pet));
    }

    return cards
  }