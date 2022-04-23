const desktop = 1280;
const tablet = 768;
const mobile = 320;

let bundle = [];

const router = async () => {
  await fetch("../../assets/data/pets.json").then((response) =>
    response.json().then((pets) => {
      for (let pet of pets) {
        bundle.push(pet);
      }
    })
  );
    await createSlider(bundle);
};


window.addEventListener('load', router);


async function createSlider(bundle){

  let item_active = document.querySelector("#item-active");
  let item_left = document.querySelector("#item-left");
  let item_right = document.querySelector("#item-right");

  let activeSlides = takeSlides(bundle);
  let restSlides = bundle.filter((e)=> activeSlides.indexOf(e) === -1);

  let leftSlides = takeSlides(restSlides);
  let rightSlides = takeSlides(restSlides);
  // console.log(activeSlides);
  // console.log(leftSlides);
  // console.log(rightSlides);

  let cards_active = createCards(activeSlides);
  let cards_left = createCards(leftSlides);
  let cards_right = createCards(rightSlides);


  item_active.append(...cards_active);
  item_left.append(...cards_left);
  item_right.append(...cards_right);

  await rotateSlider(bundle, leftSlides, rightSlides, activeSlides);

}


async function rotateSlider(bundle, left, right, active) {
  let item_active = document.querySelector("#item-active");
  let item_left = document.querySelector("#item-left");
  let item_right = document.querySelector("#item-right");

  let buttons = document.getElementsByClassName("slider__button");
  let button_left = buttons[0];
  let button_right = buttons[1];

  let card_wrapper = document.querySelector(".card__wrapper");

  button_left.addEventListener("click", moveSlider().left);
  button_right.addEventListener("click", moveSlider().right);

  function moveSlider() {
    let width = window.innerWidth;
    return {
      left: function () {
        if (width >= desktop) {
          card_wrapper.classList.add("transition-left");
        } else if (width >= tablet) {
          card_wrapper.classList.add("transition-left-tablet");
        } else {
          card_wrapper.classList.add("transition-left-mobile");
        }
      },
      right: function () {
        if (width >= desktop) {
          card_wrapper.classList.add("transition-right");
        } else if (width >= tablet) {
          card_wrapper.classList.add("transition-right-tablet");
        } else {
          card_wrapper.classList.add("transition-right-mobile");
        }
      },
    };
  }

  card_wrapper.addEventListener("animationend", (animationEvent) => {
    card_wrapper.classList.remove("transition-left");
    card_wrapper.classList.remove("transition-left-tablet");
    card_wrapper.classList.remove("transition-left-mobile");
    card_wrapper.classList.remove("transition-right");
    card_wrapper.classList.remove("transition-right-tablet");
    card_wrapper.classList.remove("transition-right-mobile");
    let changed_item;
    if (
      animationEvent.animationName === "move-left" ||
      animationEvent.animationName == "move-left-tablet" ||
      animationEvent.animationName == "move-left-mobile"
    ) {
      // item_right.innerHTML = item_active.innerHTML; // saving last active slide if we wanna return to prev slide 
      // right = active;
      changed_item = item_left;
      item_active.innerHTML = "";
      item_active.append(...item_left.childNodes);
      let restSlides = bundle.filter((e) => left.indexOf(e) === -1);
      let leftSlides = takeSlides(restSlides);
      let cards = createCards(leftSlides);
      item_left.innerHTML = "";
      item_left.append(...cards);
      left = leftSlides;
    } else {
      // item_left.innerHTML = item_active.innerHTML;
      // left = active;
      changed_item = item_right;
      item_active.innerHTML = "";
      item_active.append(...item_right.childNodes);
      let restSlides = bundle.filter((e) => right.indexOf(e) === -1);
      let rightSlides = takeSlides(restSlides);
      let cards = createCards(rightSlides);
      item_right.innerHTML = "";
      item_right.append(...cards);
      right = rightSlides;
    }
  });
}




function shaffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}


function createCard(obj){
  let div = document.createElement("div");
  div.classList.add("pet_card");

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

  card_button.addEventListener("click",()=>console.log(obj.name))

  card_details.append(card_name, card_button);
  div.append(card_image,card_details);
  return div;
}


function createCards(arr){
  let cards = [];
  for (let pet of arr){
    cards.push(createCard(pet));
  }
  return cards
}

function takeSlides(arr){
  let activeSlides = [];
  shaffle(arr);
  if (window.innerWidth >= desktop){
    activeSlides.push(arr[0]);
    activeSlides.push(arr[1]);
    activeSlides.push(arr[2]);
  } else if(window.innerWidth >= tablet){
    activeSlides.push(arr[0]);
    activeSlides.push(arr[1]);
  } else{
    activeSlides.push(arr[0]);
  }

  return activeSlides
}














