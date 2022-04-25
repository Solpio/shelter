let Popup = {
    createPopup: async function (obj){
        let popup = document.querySelector(".pop-up");
        let blackout = document.querySelector(".blackout");
        let body = document.querySelector("body");

        let button = document.createElement("button");
        button.classList.add("pop-up__button");
        button.textContent = "X";

        let information = document.createElement("div");
        let text = document.createElement("div");

        information.classList.add("pet_information");
        text.classList.add("pop-up__text");

        let img = document.createElement("img");
        img.classList.add("pop-up__img");
        img.alt = obj.name;
        img.src = obj.img;

        let h3 = document.createElement("h3");
        h3.classList.add("main__article");
        h3.classList.add("pop-up--article");
        h3.textContent = obj.name;


        let h4 = document.createElement("h4");
        h4.classList.add("main__article");
        h4.classList.add("pop-up--under");
        h4.textContent = `${obj.type} - ${obj.breed}`;


        let p = document.createElement("p");
        p.classList.add("pop-up__text_p");
        p.textContent = obj.description;

        let ul = document.createElement("ul");
        ul.classList.add("pet_extra");
        
        let ul_item1 = document.createElement("li");
        ul_item1.classList.add("pet_extra--item");
        ul_item1.textContent = "Age: ";

        let ul_item2 = document.createElement("li");
        ul_item2.classList.add("pet_extra--item");
        ul_item2.textContent = "Inoculations: ";
        
        let ul_item3 = document.createElement("li");
        ul_item3.classList.add("pet_extra--item");
        ul_item3.textContent = "Diseases: ";

        let ul_item4 = document.createElement("li");
        ul_item4.classList.add("pet_extra--item");
        ul_item4.textContent = "Parasites: ";


        let span1 = document.createElement("span");
        span1.id = "age";
        span1.textContent = obj.age;

        let span2 = document.createElement("span");
        span2.id = "inoculations";
        span2.textContent = obj.inoculations;

        let span3 = document.createElement("span");
        span3.id = "diseases";
        span3.textContent = obj.diseases;
        
        let span4 = document.createElement("span");
        span4.id = "parasites";
        span4.textContent = obj.parasites;

        ul_item1.append(span1);
        ul_item2.append(span2);
        ul_item3.append(span3);
        ul_item4.append(span4);
        ul.append(ul_item1,ul_item2,ul_item3,ul_item4);
        text.append(h3,h4,p, ul);
        information.append(img, text);
        popup.append(button,information);

        blackout.classList.toggle("hidden");
        body.classList.add("noscroll");
        blackout.addEventListener("click",Popup.deletePopup);
        button.addEventListener("click", Popup.deletePopup);

        let button_popup = document.querySelector(".pop-up__button");

        blackout.addEventListener("mouseover", () => {
            button_popup.setAttribute("style", "background-color: #FDDCC4");
        })

        popup.addEventListener("mouseover", ()=>{
            button_popup.removeAttribute("style");
        })
    },
    deletePopup:()=>{
        let body = document.querySelector("body");
        let popup = document.querySelector(".pop-up");
        let blackout = document.querySelector(".blackout");
        blackout.classList.add("hidden");
        popup.innerHTML = "";
        body.classList.remove("noscroll");
    }
}


export default Popup;