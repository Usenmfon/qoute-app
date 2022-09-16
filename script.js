const formEle = document.forms[0];
const table_body = document.getElementsByTagName('tbody')[0];
const section = document.getElementsByTagName('section')[0];
const recent_button = document.getElementsByTagName('button')[0];

let arr = []
let output = []

formEle.addEventListener('submit', function(e){
    e.preventDefault();

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

let tr, td_1, td_2;

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

        td_1.innerText = data[i].item
        td_2.innerText = data[i].price

        tr.append(td_1, td_2)
        table_body.appendChild(tr)
    }
}

recent_button.addEventListener('click', function(){
    let savedItems = JSON.parse(localStorage.getItem('items'))
    recent_button.setAttribute('disabled', true)
    displayResult(savedItems)
})