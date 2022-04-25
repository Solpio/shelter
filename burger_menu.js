let Burger = {
    createButton: async function(){
        let burger_button = document.querySelector(".burger_menu");
        let mobile_menu = document.querySelector(".menu-mobile");
        let blackout = document.querySelector(".blackout");
        let body = document.querySelector("body");
        let article = document.querySelector(".header__logo");
        let navigation_table = document.querySelector(".navigation__table--mobile");
        let navigation_table_items = navigation_table.children;

        burger_button.addEventListener("click", ()=>{
                burger_button.classList.toggle("rotated");
                mobile_menu.classList.toggle("menu-mobile--active");
                blackout.classList.toggle("hidden");
                body.classList.toggle("noscroll");
                article.classList.toggle("novision");
        });

        blackout.addEventListener("click",()=>{
            burger_button.classList.remove("rotated");
            mobile_menu.classList.remove("menu-mobile--active");
            blackout.classList.add("hidden");
            body.classList.remove("noscroll");
            article.classList.remove("novision");
        });

        for (let item of navigation_table_items){
            item.addEventListener("click", ()=>{
                burger_button.classList.remove("rotated");
                mobile_menu.classList.remove("menu-mobile--active");
                blackout.classList.add("hidden");
                body.classList.remove("noscroll");
                article.classList.remove("novision");
            })
        }
    }
}


export default Burger;