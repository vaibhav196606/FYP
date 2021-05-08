//Getting var from ids
var form = document.querySelector('#designNew');
var sD = document.querySelector('#status');
var iD = document.querySelector('#tDisplay');
var rD = document.querySelector('#rDisplay');
var cD = document.querySelector('#cDisplay');
var rdown = document.querySelector('#report');
var v = document.querySelector('#wT');
var w = document.querySelector('#wP');
var a = document.querySelector('#msg');
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
    };
v.addEventListener('click',()=>{
       topFunction();
       a.classList.remove('help');
       a.classList.add('transform');
       v.style.color = 'red';
       a.innerText = 'Unable to connect with "BX-2985 TEMP BT MODULE"';
      document.querySelector('#ftp').setAttribute('placeholder',"Connect or write manually ");
      document.querySelector('#ftp').style.border = '3px solid red';
       setTimeout(()=>{
        a.classList.add('help');
        document.querySelector('#ftp').style.border = '1px solid black';
       }, 5000);

       


    
});
w.addEventListener('click',()=>{
       topFunction(); 
       a.classList.remove('help');
       a.classList.add('transform');
       w.style.color = 'red';
       a.innerText = 'Unable to connect with "BX-26 PRES BT MODULE"';
      document.querySelector('#eps').setAttribute('placeholder',"Connect or write manually");
      document.querySelector('#eps').style.border = '3px solid red';
       setTimeout(()=>{
        a.classList.add('help');
        document.querySelector('#eps').style.border = '1px solid black';
       }, 5000);
       
        


});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    //Values extraction from form
    var frate = form.elements.frate.value;
    var eps = form.elements.eps.value;
    var ftp = form.elements.ftp.value;
    var icom = form.elements.icom.value;
    var fcom = form.elements.fcom.value;
    var htc = form.elements.htc.value;
    var stp = form.elements.stp.value;
    var ptype = form.elements.ptype.value;
    var etl = form.elements.etl.value;
    var eps1 = eps;
    var stp1 = stp;
    //Calculated L and V

    var l = Math.ceil(frate*(icom/fcom)) -1;
    var v = frate-l;

    //Pressure converted from atm to kpa
    eps = eps*101.325;
    stp = stp*101.325;

    //Fixed values of tube diameter
    var dout = 0.0508;
    var di = 0.0447;

    //Extraction from steam table

    var hf = (4.30173*ftp) - 7.23119;
    var hl = 269.302*(Math.pow(eps,0.18998)) - 231.283;
    var hv = 1443.32*(Math.pow(eps,0.0241518)) + 1064.22;
    var ls = 2235;
    var tf ;
    var ts ;
//7.1372
//2236.85

    if(stp<=125){
        ts = 111.528*(Math.pow(stp,0.12989)) - 104.564;
    }
    else{
        ts = 65.9499*(Math.pow(stp,0.186755))- 59.2519;
    }

    if(eps<=125){
        tf = 111.528*(Math.pow(eps,0.12989)) - 104.564;
    }
    else{
        tf = 65.9499*(Math.pow(eps,0.186755))- 59.2519;
    }

    if(stp<=1500){
        ls = 2566.8 - 91.8525*(Math.pow(stp,0.260384));
    }
    else{
        ls = 2711.16 - 226.526*(Math.pow(stp,0.14804));
    }


    //Main calculations

    var srate = (v*hv + l*hl - frate*hf)/ls;
    srate = Math.ceil(srate) + 1;
    var q = srate*ls;
    var area = q/((ts-tf)*htc);
    area= Math.ceil(area);
    var ntube = area/(3.14*dout*etl);
    ntube = Math.ceil(ntube);
    var pt = 1.25*dout;
    var a1;
    var a2;
    var a3;

    if(ptype=='triangle'){
        ntube = ntube + (3- (ntube%3));
        a1 = ntube*0.866*pt*pt;
    }
    else{
        ntube = ntube + (4- (ntube%4));
        a1 = ntube*pt*pt;
    }

    a2 = 0.11*a1;
    a3 = 0.4*ntube*0.785*di*di;

    var atotal = a1+a2+a3;
    var dc = Math.pow(1.2738*atotal,0.5);
    dc *=100;
    dc = Math.ceil(dc);
    dc /=100;

    //DOM
    sD.innerHTML = `<b>Status : </b> <span>Success! <i style="color:green" class="fas fa-check-circle"></i></span>`;

    rD.innerHTML = `<div class="col-12"><h2>Input Table</h2></div>
    <div class="col-12 row justify-content-center align-items-center">
        <table class="p-4 col-md-7" border="1px" style="background-color: white;">
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
                    Feed FlowRate (Kg/hr)
                </td>
                <td>
                    ${frate}
                </td>
            </tr>
            <tr>
                <td>
                    Operating Pressure (atm)
                </td>
                <td>
                    ${eps1}
                </td>
            </tr>
            <tr>
                <td>
                    Feed Temp (°C)
                </td>
                <td>
                    ${ftp}
                </td>
            </tr>
            <tr>
                <td>
                    Initial Composition
                </td>
                <td>
                    ${icom}
                </td>
            </tr>
            <tr>
                <td>
                     Final Composition
                </td>
                <td>
                    ${fcom}
                </td>
            </tr>
            <tr>
                <td>
                    HT Coefficient (KJ/hKm2)
                </td>
                <td>
                    ${htc}
                </td>
            </tr>
            <tr>
                <td>
                     Steam Pressure (atm)
                </td>
                <td>
                    ${stp1}
                </td>
            </tr>
            <tr>
                <td>
                     Pitch Type
                </td>
                <td>
                    ${ptype}
                </td>
            </tr>
            <tr>
                <td>
                     Tube length (m)
                </td>
                <td>
                    ${etl}
                </td>
            </tr>
        </table>
        <img src="evd.gif" class="col-md-5">
    </div>`;
    //Results display
    atotal *=100;
    atotal = Math.ceil(atotal);
    atotal /=100;
    var el = 3*etl;
    el *=10;
    el = Math.ceil(el);
    el /=10;
    iD.innerHTML = `<div class="col-12"><h2>Results</h2></div>
    <div class="col-12 row justify-content-center">
        <table class="p-4" border="1px" style="background-color: white;">
            <tr class="bg-primary" style="color: white;">
                <td>
                    Property
                </td>
                <td>
                   Required Value
                </td>
            </tr>
            <tr>
                <td>
                    Steam FlowRate (Kg/hr)
                </td>
                <td>
                    ${srate}
                </td>
            </tr>
            <tr>
                <td>
                    Number Of Tubes
                </td>
                <td>
                    ${ntube}
                </td>
            </tr>
            <tr>
                <td>
                    Total Area (m^2)
                </td>
                <td>
                    ${atotal}
                </td>
            </tr>
            <tr>
                <td>
                    Diameter Required (m)
                </td>
                <td>
                    ${dc}
                </td>
            </tr>
            <tr>
                <td>
                     Evaporator Length (m)
                </td>
                <td>
                    ${el}
                </td>
            </tr>
        </table>
    </div>`;
    var svol =(area+(3.14*dc*el)+2*atotal)*(dout-di);
    var at = (area+(3.14*dc*el)+2*atotal);
    at *=100;
    at  = Math.round(at);
    at /=100;
    var fcost = 1200;
    var sden = 8000;
    var skg = Math.round(svol*sden);
    var sprice = 50;
    var en = Math.round(q*6);
    var enp = Math.round(5.5*en/3600);
    cD.innerHTML = `<div class="col-12"><h2>Cost Analysis</h2>(As on ${curday('/')})</div>
    <div class="col-12 row justify-content-center">
        <h4>Fixed Capital</h4>
    </div>    
    <div class="col-12 row justify-content-center">
        <table class="p-4" border="1px" style="background-color: white;">
            <tr class="bg-primary" style="color: white;">
                <td>
                    Material
                </td>
                <td>
                   Required Quantity
                </td>
                <td>
                   Price (₹)
                </td>
            </tr>
            <tr>
                <td>
                  Stainless Steel
                </td>
                <td>
                    ${skg} Kg
                </td>
                <td>
                    ${skg*sprice} ₹
                </td>
            </tr>
            <tr>
                <td>
                    Fabrication
                </td>
                <td>
                    ${at} m2
                </td>
                <td>
                    ${at*fcost} ₹
                </td>
            </tr>
        </table>
    </div> 
    <div class="col-12 row justify-content-center">
        <h4 style="color: rgb(191, 13, 96);">Total : ${skg*sprice + at*fcost} ₹</h4>
    </div>
    <br>
    <div class="col-12 row justify-content-center">
        <h4>Working Capital (Per Day)</h4>
    </div>    
    <div class="col-12 row justify-content-center">
        <table class="p-4" border="1px" style="background-color: white;">
            <tr class="bg-primary" style="color: white;">
                <td>
                    Material
                </td>
                <td>
                   Required Quantity
                </td>
                <td>
                   Price (₹)
                </td>
            </tr>
            <tr>
                <td>
                  Energy
                </td>
                <td>
                    ${en} KJoules/Day
                </td>
                <td>
                    ${enp} ₹/Day
                </td>
            </tr>
            <tr>
                <td>
                    Workers
                </td>
                <td>
                    8
                </td>
                <td>
                    ${8*1200} ₹/Day
                </td>
            </tr>
        </table>
    </div> 
    <div class="col-12 row justify-content-center">
        <h4 style="color: rgb(191, 13, 96);">Total : ${enp+ 8*1200} ₹/Day</h4>
    </div>
    <div class="col-12 row justify-content-center">
        <a class="col-md-3 mr-1 btn btn-primary" href="https://www.ofbusiness.com/">BUY STEEL</a>
        <a class="col-md-2 mr-1 btn btn-warning" href="http://www.linkzila.com/showcase">STAFF</a>
        <a class="col-md-3 mr-1 btn btn-primary" href="https://novatechprojects.com/steel-structural-fabricators/">FABRICATOR</a>
        <a class="col-md-2 mr-1 btn btn-warning" href="https://www.bajajfinserv.in/small-scale-industries-loan">LOAN</a>
    </div>`;
    rdown.innerHTML = `<button class='col-10 col-md-6 btn btn-primary' onclick="saveDiv('tDisplay','Title')">Save Report</button>`;


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
