var form = document.querySelector('#designNew');
var res = document.querySelector('#results');
var cj = document.querySelector('#j');
var dj = document.querySelector('#jDisplay');
var iD = document.querySelector('#tDisplay');
var rD = document.querySelector('#rDisplay');
var sD = document.querySelector('#status');
var eD = document.querySelector('#errorNote');
cj.addEventListener('click', () => {
    dj.innerText = cj.value / 100;
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var vType = form.elements.vessel_type.value;
    var mType = form.elements.material.value;
    var t = form.elements.temp.value;
    var p = form.elements.pres.value * 1.05;
    var d = form.elements.dia.value;
    var dType = form.elements.dtype.value;
    var corrosion = form.elements.corrosion.value;
    var j = form.elements.j.value / 100;
    var f = 118000000;
    var cAll = 0;
    if (corrosion == 'on') {
        cAll = 2;
    }
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
    if (vType == 'cylinder') {
        if (dType == 'internal') {
            ans = (p * 1000 * d) / (2 * f * j - p * 1000);
        }
        else {
            ans = (p * 1000 * d) / (2 * f * j + p * 1000);
        }
    }
    else {
        if (dType == 'internal') {
            ans = (p * 1000 * d) / (4 * f * j - p * 1000);
        }
        else {
            ans = (p * 1000 * d) / (4 * f * j + p * 1000);
        }
    }
    ans *= 1000;
    ans *= 100;
    ans = Math.ceil(ans);
    ans /= 100;
    ans += cAll;
    if((ans-cAll)/(d*1000)<=0.25){
        if (ans - cAll > 0) {
            eD.innerHTML = `No Error`;
            sD.innerHTML = `<b>Status : </b> <span>Success <i style="color:green" class="fas fa-check-circle"></i></span>`;
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
                        Corrosion allowance (mm)
                    </td>
                    <td>
                        ${cAll}
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
            rDisplay.innerHTML = ` <div class="col-12 mt-2"><b>Result</b> </div>
        <div class="col-12" style="font-size: 1em;">
            <b>Thickness: </b> <span style="font-size: 1.3em; color: red;">${ans} MM</span> 
        </div>`;
        }
        else{
            sD.innerHTML = `<b>Status : </b> <span>Unsuccessful <i style="color:red" class="fas fa-times-circle"></i></span>`;
            eD.innerHTML = 'Your thickness is getting negative which means either your joint efficincy is too low or operating pressure is too high !';
            iD.innerHTML= ``;
            rDisplay.innerHTML = ``;
        }
    }
    else{
            sD.innerHTML = `<b>Status : </b> <span>Unsuccessful <i style="color:red" class="fas fa-times-circle"></i></span>`;
            eD.innerHTML = `Your t/Di ratio is ${(ans-cAll)/(d*1000)} which is greater then 0.25, and its not recommended, so please increase the diameter or reduce the pressure !`;
            iD.innerHTML= ``;
            rDisplay.innerHTML = ``;
    }

})