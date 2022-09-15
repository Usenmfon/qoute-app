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
        output.push({
            text : arr[i].slice(0, arr[i].indexOf(arr[i].match(/(\d+)/)[0])),
            value: Number(arr[i].match(/(\d+)/)[0]),
        })
    }

    localStorage.items = JSON.stringify(output)
    displayResult(output)
    
    formEle.reset();
})

function totalSum(data){
    let sum = 0;
    for(let num in data){
        sum += data[num].value
    }
   return sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

let tr, td_1, td_2;

function displayResult(data){
    
    if(data){
        section.style.display = "block";
    }
    data.push({ text: "Total", value: totalSum(data) })

    for(let i in data){
        tr = document.createElement('tr');
        td_1 = document.createElement('td');
        td_2 = document.createElement('td');

        td_1.innerText = data[i].text
        td_2.innerText = data[i].value

        tr.append(td_1, td_2)
        table_body.appendChild(tr)
    }
}

recent_button.addEventListener('click', function(){
    let savedItems = JSON.parse(localStorage.getItem('items'))
    recent_button.setAttribute('disabled', true)
    displayResult(savedItems)
})