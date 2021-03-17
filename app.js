var v = document.querySelector('#pvtmain');
var a = document.querySelector('#pvtmenu');
var x = document.querySelector('#evtmain');
var y = document.querySelector('#evtmenu');
var j =0;
let i = 0;
v.addEventListener('click',()=>{
    if(i%2==0){
        a.classList.remove('help');
        v.style.backgroundColor = '#6eacad';
    }
    else{
        a.classList.add('help');
        v.style.backgroundColor = '#a8dadc';
    }
    i++;
    
});
x.addEventListener('click',()=>{
    if(j%2==0){
        y.classList.remove('help');
        x.style.backgroundColor = '#6eacad';
    }
    else{
        y.classList.add('help');
        x.style.backgroundColor = '#a8dadc';
    }
    j++;
    
});