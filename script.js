const formEle = document.forms[0];
const table_body = document.getElementsByTagName('tbody')[0];
const section = document.getElementsByTagName('section')[0];
const recent_button = document.getElementsByTagName('button')[0];
const help_button = document.getElementsByTagName('div')[0];
const help_text = document.getElementById('help_text')
let state = true;

help_button.children[0].addEventListener('click', function(){
    if(state){
        help_text.style.display = "block";
    }else{
        help_text.style.display = "none";
    }
    state = !state;
})

let arr = []

formEle.addEventListener('submit', function(e){
    e.preventDefault();
    let output = []

    const form = e.currentTarget;
    
    let formData = new FormData(form);
    let entries = Object.fromEntries(formData.entries());

    arr = entries.text.split("\n")
    
    for(let i = 0; i < arr.length; i++){
        let extract_item = arr[i].slice(0, arr[i].indexOf(arr[i].match(/(\d+)/)[0]));
        let extract_price = Number(arr[i].match(/(\d+)/)[0]);

        output.push({
            item : extract_item,
            price: extract_price,
        })
    }

    localStorage.items = JSON.stringify(output)
    displayResult(output)
    
    formEle.reset();
})

function totalSum(obj){
    let sum = 0;
    for(let key in obj){
        sum += obj[key].price
    }
   return sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

let tr, td_1, td_2, serial_number = 0;

function displayResult(data){
    recent_button.setAttribute('disabled', true)
    if(data){
        section.style.display = "block";
    }
    data.push({ item: "Total", price: totalSum(data) })

    for(let i in data){

        tr = document.createElement('tr');
        td_1 = document.createElement('td');
        td_2 = document.createElement('td');
        td_3 = document.createElement('td');

        td_1.innerText = ++serial_number
        td_2.innerText = data[i].item
        td_3.innerText = data[i].price

        tr.append(td_1, td_2, td_3)
        table_body.appendChild(tr)
    }
    
    let last_child = [...table_body.children].lastIndexOf(tr)
    table_body.children[last_child].children[0].innerText = "";
    
}

recent_button.addEventListener('click', function(){
    let savedItems = JSON.parse(localStorage.getItem('items'))
    recent_button.setAttribute('disabled', true)
    displayResult(savedItems)
})