var form = document.querySelector('#designNew');
var res = document.querySelector('#results');
var cj = document.querySelector('#j');
var dj = document.querySelector('#jDisplay');
var iD = document.querySelector('#tDisplay');
var rD = document.querySelector('#rDisplay');
var sD = document.querySelector('#status');
var rdown = document.querySelector('#report');
cj.addEventListener('click', () => {
    dj.innerText = cj.value / 100;
});
var v = document.querySelector('#wT');
var w = document.querySelector('#wP');
var a = document.querySelector('#msg');
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
v.addEventListener('click',()=>{
       topFunction();
       a.classList.remove('help');
       a.classList.add('transform');
       v.style.color = 'red';
       a.innerText = 'Unable to connect with "BX-2985 TEMP BT MODULE"';
      document.querySelector('#Temp').setAttribute('placeholder',"Connect or write manually ");
      document.querySelector('#Temp').style.border = '3px solid red';
       setTimeout(()=>{
        a.classList.add('help');
        document.querySelector('#Temp').style.border = '1px solid black';
       }, 5000);

       

    
});
w.addEventListener('click',()=>{
       topFunction(); 
       a.classList.remove('help');
       a.classList.add('transform');
       w.style.color = 'red';
       a.innerText = 'Unable to connect with "BX-26 PRES BT MODULE"';
      document.querySelector('#Pres').setAttribute('placeholder',"Connect or write manually");
      document.querySelector('#Pres').style.border = '3px solid red';
       setTimeout(()=>{
        a.classList.add('help');
        document.querySelector('#Pres').style.border = '1px solid black';
       }, 5000);
       
        


});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var vType = form.elements.vessel_type.value;
    var mType = form.elements.material.value;
    var t = form.elements.temp.value;
    var p = form.elements.pres.value;
    var d = form.elements.dia.value;
    var dType = form.elements.dtype.value;
    var thic = form.elements.thick.value;
    var j = form.elements.j.value / 100;
    var f = 118000000;
    var pNew = 0;
    var ans;

    if (mType == 'Carbon steel') {
        f = -0.2 * t + 145;
    }
    else if (mType == 'Carbon-manganese steel') {
        f = -0.2 * t + 180;
    }
    else if (mType == 'Carbon-molybdenum') {
        f = -0.2 * t + 185;
    }
    else if (mType == 'Low alloy steel') {
        if (t <= 350) {
            f = 240;
        }
        else {
            f = -0.6 * t + 460;
        }

    }
    else {
        f = -0.166 * t + 173;
    }
    f *= 1000000;
    var tcn = thic/1000;
    if (vType == 'cylinder') {
        if (dType == 'internal') {
            ans = (p * 1000 * d) / (2 * f * j - p * 1000);
            pNew = (2 * f * j * tcn) / (d);
        }
        else {
            ans = (p * 1000 * d) / (2 * f * j + p * 1000);
            pNew = (2 * f * j * tcn) / (d);
        }
    }
    else {
        if (dType == 'internal') {
            ans = (p * 1000 * d) / (4 * f * j - p * 1000);
            pNew = (4 * f * j * tcn) / (d);
        }
        else {
            ans = (p * 1000 * d) / (4 * f * j + p * 1000);
            pNew = (4 * f * j * tcn) / (d);
        }
    }
    //console.log(pNew);
    pNew /= 1000;
    pNew = Math.ceil(pNew);
    ans *= 1000;
    ans *= 100;
    ans = Math.ceil(ans);
    ans /= 100;
    rdown.innerHTML = `<button class='col-10 col-md-6 btn btn-primary' onclick="saveDiv('results','Title')">Save Report</button>`;
    iD.innerHTML = `<div class="col-12">Input Table</div>
    <div class="col-12 row justify-content-center">
        <table class="p-4" border="1px" style="background-color: white;">
            <tr class="bg-primary" style="color: white;">
                <td>
                    Property
                </td>
                <td>
                    Value
                </td>
            </tr>
            <tr>
                <td>
                    Shape
                </td>
                <td>
                    ${vType}
                </td>
            </tr>
            <tr>
                <td>
                    Material
                </td>
                <td>
                    ${mType}
                </td>
            </tr>
            <tr>
                <td>
                    Temperature (°C)
                </td>
                <td>
                    ${t}
                </td>
            </tr>
            <tr>
                <td>
                    Pressure (kPa)
                </td>
                <td>
                    ${p}
                </td>
            </tr>
            <tr>
                <td>
                    Diameter (m)
                </td>
                <td>
                    <span id="dValue">${d}</span> <span id="ie">(${dType})</span>
                </td>
            </tr>
            <tr>
                <td>
                    Welded joint efficiency
                </td>
                <td>
                    ${j}
                </td>
            </tr>
        </table>
    </div>`;
    if (ans <= thic) {
        sD.innerHTML = `<b>Status : </b> <span>Plant is safe <i style="color:green" class="fas fa-check-circle"></i></span>`;
        rDisplay.innerHTML = ` <div class="col-12 mt-2"><b>Result</b> </div>
    <div class="col-12" style="font-size: 1em;">
        <b>Thickness(reqd): </b> <span style="font-size: 1.2em; color: green;">${ans} MM</span> 
    </div>
    <div class="col-12" style="font-size: 1em;">
        <b>Thickness(actual): </b> <span style="font-size: 1.2em; color: blue;">${thic} MM</span> 
    </div>
    <div class="col-12" style="font-size: 1em;">
    Reqd thickness is less then current thickness hence your plant is safe to work! moreover you can increase your pressure from <span style="color: blue; font-size:1.1em"> ${p} kPa </span> to<span style="color: green; font-size:1.1em"> ${pNew} kPa </span>  
    </div>`;

    }
    else {
        sD.innerHTML = `<b>Status : </b> <span>Plant is in Danger <i style="color:red" class="fas fa-times-circle"></i></span>`;
        rDisplay.innerHTML = ` <div class="col-12 mt-2"><b>Result</b> </div>
    <div class="col-12" style="font-size: 1em;">
        <b>Thickness(reqd): </b> <span style="font-size: 1.2em; color: red;">${ans} MM</span> 
    </div>
    <div class="col-12" style="font-size: 1em;">
        <b>Thickness(actual): </b> <span style="font-size: 1.2em; color: blue;">${thic} MM</span> 
    </div>
    <div class="col-12" style="font-size: 1em;">
        Reqd thickness is more then current thickness hence your plant is not safe to work! moreover to work with current thickness you can reduce your pressure from <span style="color: red; font-size:1.1em"> ${p} kPa </span> to<span style="color: green; font-size:1.1em"> ${pNew} kPa </span> 
    </div>`;
    }

})

var doc = new jsPDF();

 function saveDiv(divId, title) {
 doc.fromHTML(`<html><head><meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <script src="https://kit.fontawesome.com/93fd6bbb87.js" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700">
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
     integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
 <link rel="stylesheet" href="app.css"><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
 doc.save('nitwlab_report.pdf');
}
