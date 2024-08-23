const { PesquisarNomes} = require('./livros');

const searchWrapper = document.querySelector('.Search');
const inputBox = searchWrapper.querySelector('input');
const suggestBox = searchWrapper.querySelector('.list');
const  icon = searchWrapper.querySelector('.icon')
let linkTag = searchWrapper.querySelector('.Algo')
let webLink;


console.log(searchWrapper)


 inputBox.addEventListener('input', (event) =>{
     const value = event.target.value;
     let emptyArray = []
     if(value){
         emptyArray = PesquisarNomes(value).filter((data) =>{
             return data.toLocaleLowerCase().startsWith(value.toLocaleLowerCase());
         });
         emptyArray = emptyArray.map((data) =>{
             return data = `<li>${data}<li>`;
         });
        searchWrapper.classList.add('active');
         ShowSuggestions(emptyArray);
         let allList = suggestBox.querySelectorAll('li');
         for (let i = 0; i < allList.length; i++) {
             allList[i].setAttribute('onclick', 'select(this)');
            
         }
    
     }

 })

 function select(element){
     let selecData = element.textContent;
     inputBox.value = selecData;
     icon.onclick = () => {
         webLink = `https://www.google.com/search?q=${selecData}`;
         linkTag.setAttribute('href', webLink);
         linkTag.click()
     }
     searchWrapper.classList.remove('active')
 }

 function ShowSuggestions(list){
     let listData;
     if(!list.length){
         uservalue = inputBox.value;
         listData=`<li>${uservalue}<li>`
     }else{
         listData = list.join('');
     }
     suggestBox.innerHTML = listData
 }