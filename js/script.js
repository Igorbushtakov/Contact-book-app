function onPageLoaded() {
let inputName = document.querySelector(".name")
let inputNumber = document.querySelector(".number");
let ul = document.querySelector("ul.numbers");
let saveBtn = document.querySelector(".save");
let clearBtn = document.querySelector("button.clear");
let showTipsBtn = document.querySelector("button.showTips");
let closeTipsBtn = document.querySelector("a.closeTips");
let closeTipTwoBtn = document.querySelector("a.closeTipTwo");
let overlay = document.querySelector("#overlay");
let edit = document.querySelector("#edit");
let objData = {};
let datas = [];


function createNumber(){
    //create an item as span and add att dom tree with append
    let li = document.createElement("li");
    let textSpan = document.createElement("span");
    textSpan.classList.add("numbers-text");
    let newNumber= `${inputName.value}: ${inputNumber.value}`;
    textSpan.append(newNumber);

    // create a button delete which all items have
    let deletebtn = document.createElement("span");
    deletebtn.classList.add("numbers-trash");
   // icon of delete button from font awesome 
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt");
    deletebtn.appendChild(icon);
    // create of edit button
    let buttonEdit = document.createElement("span");
    buttonEdit.innerHTML="Редактировать";
    buttonEdit.classList.add("buttonEdit");
    //adding all elements together in ul with .numbers class

    ul.appendChild(li).append(textSpan, deletebtn, buttonEdit);
    
    //call of function which remove an item
    listenDeleteNumber(deletebtn);

    //adding each phone number to an array of objects that displayed at console
    objData.name = inputName.value;
    objData.number = inputNumber.value;
    datas.push(objData);    
    console.log(datas)

    //event handlers for popping up a modal window which is intended to edit a contacts item
    buttonEdit.addEventListener("click", () => {
        edit.style.display="block";
    });
    closeTipTwoBtn.addEventListener("click", () => {
        edit.style.display="none";
    });

       
//editing of contact
li.addEventListener('click', function(event){
        let parent = event.target.parentElement;
        let spanEdit = parent.querySelector("span.numbers-text");
        let editBtn = document.querySelector(".submit")
         editBtn.addEventListener("click", (evt) =>{
             let inputs = document.querySelectorAll("#edit input");
             if(inputs[0].value == '' || inputs[0].value == ' ' ){
               alert("Введите корректные данные")}
             else{
             let editValue = `${inputs[0].value} : ${inputs[1].value}`
            if(event.target.tagName == "SPAN"){
                spanEdit.innerHTML = editValue;
            }
         };  
       })
   })
    

};

//function of delete an item
function listenDeleteNumber(elem) {
    elem.addEventListener("click", (evt) => {
       elem.parentElement.remove();
        evt.stopPropagation();
    });
}
//call of function which create a item of contact
saveBtn.addEventListener("click", createNumber);

//the function of putting data in local storage

saveBtn.addEventListener("click", () => {  
    localStorage.setItem("name", ul.innerHTML);
    inputName.value="";
    inputNumber.value="";
});
//function of remove all the data from page and local storage
clearBtn.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.removeItem("name", ul.innerHTML);
});
//open/close a reference window
showTipsBtn.addEventListener("click", () => {
    overlay.style.height = "100%";
});
closeTipsBtn.addEventListener("click", () => {
    overlay.style.height = "0";
});

//writen to retreive data from local storage and load it after reloadinf the intire page
function loadNumbers() {
    let dataNumbers = localStorage.getItem("name");
    if (dataNumbers) {
        ul.innerHTML = dataNumbers;
    }
    let deleteBtns = document.querySelectorAll("span.numbers-trash");
    for (let button of deleteBtns) {
        listenDeleteNumber(button);
    }
}

//call of storage function
loadNumbers();

};
document.addEventListener("DOMContentLoaded", onPageLoaded);
