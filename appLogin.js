function animateForm(){
const arrows = document.querySelectorAll(".fa-arrow-down");

arrows.forEach(arrow => {
    arrow.addEventListener('click', ()=>{
        const input = arrow.previousElementSibling;
        const parent = arrow.parentElement;
        const nextForm = parent.nextElementSibling;
    
        //chech validae
        if(input.type === "text" && validateUser(input)){
            nextSlide(parent,nextForm);
            setTimeout(() => {
                location.replace("main.html?"+document.querySelector("input").value);
            }, 1000);
        }
        else{
            parent.style.animation = "shake 0.5s ease";
        }
        
            
        
        parent.addEventListener("animationend", ()=>{
            parent.style.animation="";
        })
    });
});
}

function validateUser(user){ // check username length
    if(user.value.length < 6){
        error('rgb(10, 15, 12)');
    }
    else{
        error('rgb(10, 15, 12)');
        return true;
    }
}

function nextSlide(parent, nextForm){
    parent.classList.add('innactive');
    parent.classList.remove('active');
    nextForm.classList.remove('innactive');
    nextForm.classList.add('active');
}
function error(color){
    document.body.style.backgroundColor = color;
}
animateForm();