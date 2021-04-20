/*
Copyright 2020 Alliance for Sustainable Energy, LLC
 
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const MODULE_MARKUP = 1.15

// allows for use of popovers and tooltips between javascript and html
$(function(){
  $('[data-toggle="popover"]').popover({html:true});  
  $('[data-toggle="tooltip"]').tooltip() 
});

// tooltip that service life input must be an integer
$('#baseline_service_life_text').tooltip('disable')
$('#proposed_service_life_text').tooltip('disable')

// tooltip if both LCOEs don't match perfectly
$('#lcoe_proposed').tooltip('disable')
$('#lcoe_baseline').tooltip('disable')



// toggle between link and broken link icon for baseline discount rate slider
function baselineToggle() {
  if (document.getElementById('baselineLinkImage').src.includes('broken')) {
    document.getElementById("baselineLinkImage").src = "link.svg";
    document.getElementById("proposedLinkImage").src = "link.svg";

    // baseline and proposed discount rate move together
    $('#proposed_discount_rate_text').val($('#baseline_discount_rate_text').val()) 
    document.getElementById('proposed_discount_rate').noUiSlider.set($('#baseline_discount_rate_text').val())
    calculate();

  } else {
    document.getElementById("baselineLinkImage").src = "broken_link.svg";
    document.getElementById("proposedLinkImage").src = "broken_link.svg";

  } // tooltip goes away after 3 sec
  setTimeout(function(){
     $('#baselineDiscountPrepend').tooltip('hide');
  }, 3000);
}

// toggle between link and broken link icon for proposed discount rate slider
function proposedToggle() {
  if (document.getElementById('proposedLinkImage').src.includes('broken')) {
    document.getElementById("baselineLinkImage").src = "link.svg";
    document.getElementById("proposedLinkImage").src = "link.svg";

    // baseline and proposed discount rate move together
    $('#baseline_discount_rate_text').val($('#proposed_discount_rate_text').val())
    document.getElementById('baseline_discount_rate').noUiSlider.set($('#proposed_discount_rate_text').val())
    calculate();

  } else {
    document.getElementById("baselineLinkImage").src = "broken_link.svg";
    document.getElementById("proposedLinkImage").src = "broken_link.svg";
  }
  setTimeout(function(){ // tooltip goes away after 3 sec
     $('#proposedDiscountPrepend').tooltip('hide');
  }, 3000);
}

/* update slider position based on number entered in input box */
function update_slider(slider_name, value) { 
  $('#baseline_service_life_text').tooltip('hide')
  $('#proposed_service_life_text').tooltip('hide')
  $('#lcoe_proposed').tooltip('hide')
  $('#lcoe_baseline').tooltip('hide')

  var slider = document.getElementById(slider_name);
  var max = slider.noUiSlider.options.range.max
  var min = slider.noUiSlider.options.range.min
  value = parseFloat(value)

  key = slider_name.substring(0, 8) // 'baseline' and 'proposed' are both 8 letters

  // var degradation_rate, year, max_year, max_degradation;

  // console.log('testing', max_year, max_degradation, year)




var flag = false;

  if (slider_name == 'baseline_degradation_rate') {

var year = parseFloat($('#'+key+'_service_life_text').val())
var max_degradation = 1 / (year - 0.5) * 100
console.log('baseline deg', value, max_degradation)
   if (!(value < max_degradation)) {

flag = true
console.log('break even deg', flag)
    value = max_degradation
    $('#baseline_degradation_rate_text').val(max_degradation.toFixed(2))
    document.getElementById('baseline_degradation_rate_text').setAttribute('data-original-title', 'Choose a shorter service life to enable a larger degradation rate.');

     $('#baseline_degradation_rate_text').tooltip('enable')
     $('#baseline_degradation_rate_text').tooltip('show')
  setTimeout(function(){
     $('#baseline_degradation_rate_text').tooltip('hide');
  }, 3000);
   } else {
     $('#baseline_degradation_rate_text').tooltip('disable')
   }
//console.log('inside')
  }
//console.log('if')
  if (slider_name == 'proposed_degradation_rate') {
var year = parseFloat($('#'+key+'_service_life_text').val())
var max_degradation = 1 / (year - 0.5) * 100
   if (!(value < max_degradation)) {
    value = max_degradation
     $('#proposed_degradation_rate_text').val(max_degradation.toFixed(2))
     document.getElementById('proposed_degradation_rate_text').setAttribute('data-original-title', 'Choose a shorter service life to enable a larger degradation rate.');

     $('#proposed_degradation_rate_text').tooltip('enable')
     $('#proposed_degradation_rate_text').tooltip('show')
  setTimeout(function(){
     $('#proposed_degradation_rate_text').tooltip('hide');
  }, 3000);
   } else {
     $('#proposed_degradation_rate_text').tooltip('disable')
   }
  }
  if (slider_name == 'baseline_service_life') {
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var max_year = 1 / degradation_rate + 0.5
  // max_year.toFixed(0)

console.log('here', value, max_year.toFixed(0), flag)
   if (!(value < max_year.toFixed(0))) {
    value = max_year.toFixed(0)
console.log('even year')
flag = true
    $('#baseline_service_life_text').val(max_year.toFixed(0))
    document.getElementById('baseline_service_life_text').setAttribute('data-original-title', 'Choose a smaller degradation rate to enable a larger service life.');

     $('#baseline_service_life_text').tooltip('enable')
     $('#baseline_service_life_text').tooltip('show')

  setTimeout(function(){
     $('#baseline_service_life_text').tooltip('hide');
  }, 3000);
   } else {
     $('#baseline_service_life_text').tooltip('disable')
   }
  } 
  if (slider_name == 'proposed_service_life') {
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var max_year = parseInt(1 / degradation_rate + 0.5)
   if (!(value < max_year)) {
    value = parseInt(max_year)
flag = true

    $('#proposed_service_life_text').val(max_year.toFixed(0))
    document.getElementById('proposed_service_life_text').setAttribute('data-original-title', 'Choose a smaller degradation rate to enable a larger service life.');

     $('#proposed_service_life_text').tooltip('enable')
     $('#proposed_service_life_text').tooltip('show')

  setTimeout(function(){
     $('#proposed_service_life_text').tooltip('hide');
  }, 3000);
   } else {
     $('#proposed_service_life_text').tooltip('disable')
   }
  } 
//console.log('after')
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var year = parseFloat($('#'+key+'_service_life_text').val())
  var max_year = 1 / degradation_rate + 0.5
  if (max_year > 1000) {
    max_year_bound = 1000
  } else {
    max_year_bound = max_year
  }
  var max_degradation = 1 / (year - 0.5) * 100

console.log(slider_name, degradation_rate)

  if (slider_name == 'baseline_degradation_rate') {
// console.log('max_year', max_year_bound)
if (degradation_rate > 0) {
    document.getElementById('baseline_service_life').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_year_bound
    }
   });
}
  }
  if (slider_name == 'proposed_degradation_rate') {
if (degradation_rate > 0) {
    document.getElementById('proposed_service_life').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_year_bound
    }
   });
}
  }
  if (slider_name == 'baseline_service_life') {
    document.getElementById('baseline_degradation_rate').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_degradation
    }
   });
  }
  if (slider_name == 'proposed_service_life') {
    document.getElementById('proposed_degradation_rate').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_degradation
    }
   });
  }

  

  // efficiency capped at 100%
  if (slider_name == 'baseline_efficiency' && value > 100) {
    $('#baseline_efficiency_text').val(100)
  }
  if (slider_name == 'proposed_efficiency' && value > 100) {
    $('#proposed_efficiency_text').val(100)
  }



  // displays warning if non-integer service life
  if ((slider_name == 'baseline_service_life' && (!Number.isInteger(value))) || (slider_name == 'baseline_service_life' && value >= 1000)) {
console.log('test1')
     if (value > 1000) { // set service life maximum at 1000 (calculator freezes if service life is too large)
       $('#baseline_service_life_text').val(1000)
     }
console.log('testing', flag)
     if (!flag) {
console.log('wrong')
       document.getElementById('baseline_service_life_text').setAttribute('data-original-title', 'Service life must be a positive integer no greater than 1000.');
      

     $('#baseline_service_life_text').tooltip('enable')
     $('#baseline_service_life_text').tooltip('show')
	}
  } else {
     $('#baseline_service_life_text').tooltip('disable')
  }


  if ((slider_name == 'proposed_service_life' && (!Number.isInteger(value))) || (slider_name == 'proposed_service_life' && value >= 1000)) {
console.log('test2')
     if (value > 1000) { // set service life maximum at 1000 (calculator freezes if service life is too large)
       $('#proposed_service_life_text').val(1000)
     }

      if (!flag) {
     document.getElementById('proposed_service_life_text').setAttribute('data-original-title', 'Service life must be a positive integer no greater than 1000.');
     
     $('#proposed_service_life_text').tooltip('enable')
     $('#proposed_service_life_text').tooltip('show')
	}
  } else {
     $('#proposed_service_life_text').tooltip('disable')
  } 



  // The conditionals allow the user to put in an out-of-bounds number
  if (value >= max) {
      slider.noUiSlider.set(max);
  } else if (value <= min) {
      slider.noUiSlider.set(min);
  } else {
      slider.noUiSlider.set(value);
  }
}

/* display "pips" at 1.1, 1.3 and 1.4 on ILR slider to emphasize it's non-linear */
function filterPips(value) {
  if (value.toFixed(1) == 1.1 || value.toFixed(1) == 1.3 || value.toFixed(1) == 1.4) return 0;
  return -1;
}

/* set up sliders based on name of slider, name of input box, and settings (features for sliders) */
function slider_setup(slider_name, number_name, settings) {
  // Make variables for the slider and number input objects
  var slider = document.getElementById(slider_name);
  var number = document.getElementById(number_name);
  
  if (slider_name == 'ilr_preset') { // create non-linear preset slider with pips
    noUiSlider.create(slider, {
    start: [1.1],
    range: {'min': [1.09], '0.1%': [1.1, 0.2], '65%': [1.3, 0.1], 'max': [1.4]}, // min needs to be 1.09 to get all pips to appear
    pips: {mode: 'steps', density: 50, filter: filterPips}
   });
  } else { // Create all other sliders
     noUiSlider.create(slider, {start: settings['start'], step: settings['step'], connect: true, range: {'min': settings['min'], 'max': settings['max']}});
  }

  // Set the number input to equal the slider's starting point
  number.value = parseFloat(slider.noUiSlider.get()).toFixed(settings['digits']);

  // When the slider moves, update the number
  slider.noUiSlider.on('slide', function(values) {
    // console.log('break even happened slider')
    $('#lcoe_proposed').tooltip('hide')
    $('#lcoe_baseline').tooltip('hide')
    $('#baseline_service_life_text').tooltip('hide')
    $('#proposed_service_life_text').tooltip('hide')

    var val = parseFloat(values[0]).toFixed(settings['digits']);
    number.value = val

  if (val >= 1000 && (slider_name == 'proposed_service_life' || slider_name == 'baseline_service_life')) {

	console.log('slider and large', slider_name+'_text')

      
       document.getElementById(slider_name+'_text').setAttribute('data-original-title', 'Service life must be a positive integer no greater than 1000.');


     $('#'+slider_name+'_text').tooltip('enable')
     $('#'+slider_name+'_text').tooltip('show')
  } else {
     $('#'+slider_name+'_text').tooltip('disable')
  } 

  key = slider_name.substring(0, 8) // 'baseline' and 'proposed' are both 8 letters
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var year = parseFloat($('#'+key+'_service_life_text').val())
  var max_year = 1 / degradation_rate + 0.5
  if (max_year > 1000) {
    max_year_bound = 1000
    console.log('slider too large')
  } else {
    max_year_bound = max_year
  }
  var max_degradation = 1 / (year - 0.5) * 100

  if (slider_name == 'baseline_degradation_rate') {
    document.getElementById('baseline_service_life').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_year_bound
    }
   });
  }
  if (slider_name == 'proposed_degradation_rate') {
    document.getElementById('proposed_service_life').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_year_bound
    }
   });
  }
  if (slider_name == 'baseline_service_life') {
    document.getElementById('baseline_degradation_rate').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_degradation
    }
   });
  }
  if (slider_name == 'proposed_service_life') {
    document.getElementById('proposed_degradation_rate').noUiSlider.updateOptions({
    range: {
        'min': 0,
        'max': max_degradation
    }
   });
  }
 
    

    // if discount rate is linked, move baseline and proposed sliders together
    if (slider_name == 'baseline_discount_rate' && !document.getElementById('baselineLinkImage').src.includes('broken')) {
      update_slider('proposed_discount_rate', number.value)
      $('#proposed_discount_rate_text').val(number.value)
    }
    if (slider_name == 'proposed_discount_rate' && !document.getElementById('proposedLinkImage').src.includes('broken')) {
      update_slider('baseline_discount_rate', number.value)
      $('#baseline_discount_rate_text').val(number.value)
    }

    calculate()
  });

  // When the number changes, update the slider
  number.addEventListener('input', function(){
    // console.log('break even happened number')
	//console.log('num moving')

  
    update_slider(slider_name, this.value);


    // if discount rate is linked, update baseline and proposed input boxes together
    if (slider_name == 'baseline_discount_rate' && !document.getElementById('baselineLinkImage').src.includes('broken')) {
      $('#proposed_discount_rate_text').val(this.value)
    }
    if (slider_name == 'proposed_discount_rate' && !document.getElementById('proposedLinkImage').src.includes('broken')) {
      $('#baseline_discount_rate_text').val(this.value)
    }
    
    $('#lcoe_proposed').tooltip('hide')
    $('#lcoe_baseline').tooltip('hide')
    calculate()
  });
}

slider_setup(
  'ilr_preset',
  'ilr_preset_text',
  {'start': 1.1, 'min': 1.1, 'max': 1.4, 'step': 0.1, 'digits': 1}
)

slider_setup(
  'baseline_cost_front_layer',
  'baseline_cost_front_layer_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_cell',
  'baseline_cost_cell_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_back_layer',
  'baseline_cost_back_layer_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_noncell',
  'baseline_cost_noncell_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_extra',
  'baseline_cost_extra_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_om',
  'baseline_cost_om_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_bos_power',
  'baseline_cost_bos_power_text',
  {'start': 0, 'min': 0, 'max': 2, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_cost_bos_area',
  'baseline_cost_bos_area_text',
  {'start': 0, 'min': 0, 'max': 200, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_efficiency',
  'baseline_efficiency_text',
  {'start': 0, 'min': 0, 'max': 60, 'step': 0.1, 'digits': 1}
)
slider_setup(
  'baseline_energy_yield',
  'baseline_energy_yield_text',
  {'start': 0, 'min': 0, 'max': 3000, 'step': 1, 'digits': 0}
)
slider_setup(
  'baseline_degradation_rate',
  'baseline_degradation_rate_text',
  {'start': 0, 'min': 0, 'max': 5, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'baseline_service_life',
  'baseline_service_life_text',
  {'start': 0, 'min': 1, 'max': 50, 'step': 1, 'digits': 0}
)
slider_setup(
  'proposed_cost_front_layer',
  'proposed_cost_front_layer_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_cell',
  'proposed_cost_cell_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_back_layer',
  'proposed_cost_back_layer_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_noncell',
  'proposed_cost_noncell_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_extra',
  'proposed_cost_extra_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_om',
  'proposed_cost_om_text',
  {'start': 0, 'min': 0, 'max': 100, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_bos_power',
  'proposed_cost_bos_power_text',
  {'start': 0, 'min': 0, 'max': 2, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_cost_bos_area',
  'proposed_cost_bos_area_text',
  {'start': 0, 'min': 0, 'max': 200, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_efficiency',
  'proposed_efficiency_text',
  {'start': 0, 'min': 0, 'max': 60, 'step': 0.1, 'digits': 1}
)
slider_setup(
  'proposed_energy_yield',
  'proposed_energy_yield_text',
  {'start': 0,  'min': 0, 'max': 3000, 'step': 1, 'digits': 0}
)
slider_setup(
  'proposed_degradation_rate',
  'proposed_degradation_rate_text',
  {'start': 0, 'min': 0, 'max': 5, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_service_life',
  'proposed_service_life_text',
  {'start': 0,  'min': 1, 'max': 50, 'step': 1, 'digits': 0}
)
slider_setup(
  'baseline_discount_rate',
  'baseline_discount_rate_text',
  {'start': 0, 'min': 0, 'max': 10, 'step': 0.01, 'digits': 2}
)
slider_setup(
  'proposed_discount_rate',
  'proposed_discount_rate_text',
  {'start': 0, 'min': 0, 'max': 10, 'step': 0.01, 'digits': 2}
)

/* function with calculations for break even degradation rate
   key: baseline or proposed
*/
function reset_degradation(key) {
  $('#lcoe_proposed').tooltip('disable')
  $('#lcoe_baseline').tooltip('disable')

  if (document.getElementById('lcoe_proposed').innerHTML != document.getElementById('lcoe_baseline').innerHTML) {

  var new_value = 0
  var year = parseFloat($('#'+key+'_service_life_text').val())
  var upper_bound = 1 / (year - 0.5)
//console.log('upper', upper_bound)
  new_value = brents_method(func_deg, -1e10, upper_bound, 0.0001, 1e-10, key)

  // Brent's method failed, determine if largest or smallest value should be displayed
  if (new_value == -1) {
    new_value = upper_bound
  }
  new_value *= 100
  $('#'+key+'_degradation_rate_text').val(new_value)
  update_slider(key+'_degradation_rate', new_value)
  calculate()


  }
}

function func_deg(deg, key) {
  var outputs = calculate()
  var discount_rate = parseFloat($('#'+key+'_discount_rate_text').val())/100.0
  if (key == 'baseline') {
      var cost_comparison = outputs[2]
      var energy_comparison = outputs[3]
      var cost_current = outputs[0]
  } else if (key == 'proposed') {
      var cost_comparison = outputs[0]
      var energy_comparison = outputs[1]
      var cost_current = outputs[2]
  }
  
  var lcoe = cost_comparison/energy_comparison
  var energy_wanted = cost_current/lcoe
  var energy_yield = parseFloat($('#'+key+'_energy_yield_text').val())/1000
  var year = parseFloat($('#'+key+'_service_life_text').val())

  var energy_mult = (1 - Math.pow(1 + discount_rate, year)) / (-1 * discount_rate * Math.pow(1 + discount_rate, year))
  var energy_deg_mult = (1 / Math.pow(1 + discount_rate, year - 1) - 1 - discount_rate) / Math.pow(discount_rate, 2) - ((0.5 - year) / Math.pow(1 + discount_rate, year) - 0.5) / discount_rate
  
  return energy_wanted - (energy_yield * energy_mult + energy_yield * deg * energy_deg_mult)

}

// break even O&M cost
function reset_OM(key) {
  // only perform break even calculations if baseline and proposed LCOEs are different
  if (document.getElementById('lcoe_proposed').innerHTML != document.getElementById('lcoe_baseline').innerHTML) {
  var outputs = calculate()
  var discount_rate = parseFloat($('#'+key+'_discount_rate_text').val())/100.0
  var init_cost = initial_cost(key)
  var service_life = parseFloat($('#'+key+'_service_life_text').val())
  if (key == 'baseline') {
    var cost_comparison = outputs[2]
    var energy_comparison = outputs[3]
    var energy_current = outputs[1]
  } else if (key == 'proposed') {
    var cost_comparison = outputs[0]
    var energy_comparison = outputs[1]
    var energy_current = outputs[3]
  }
  
  var lcoe = cost_comparison/energy_comparison
  var nonzero_yrs = lcoe * energy_current - init_cost
  var new_value = nonzero_yrs/((1 - 1/Math.pow(1 + discount_rate, service_life))/discount_rate)


  new_value *= 1000
  $('#'+key+'_cost_om_text').val((new_value))
  
  update_slider(key+'_cost_om', new_value)
  calculate()
  }

  var lcoe_proposed = document.getElementById('lcoe_proposed').innerHTML
  var lcoe_baseline = document.getElementById('lcoe_baseline').innerHTML

  // resolve tiny rounding errors
  if (lcoe_proposed != lcoe_baseline && Math.abs(lcoe_proposed - lcoe_baseline) <= 0.0001) {
    document.getElementById('lcoe_'+key).innerHTML = lcoe.toFixed(4)
  }
}

/*
Used to find the service life (in years) since the solution for service life doesn't have a closed form equation.
*/
function brents_method(f, a, b, precision, root_precision, key) {

  if (f(a, key) * f(b, key) >= 0) { // method doesn't work
    return -1;
  } 
  
  if (Math.abs(f(a, key)) < Math.abs(f(b, key))) {
      var temp = a
      a = b
      b = temp
  }
  
  var c = a
  var flag = true
  var s = b

  while ((Math.abs(f(b, key)) > root_precision || Math.abs(f(s, key)) > root_precision) || (b - a) > precision) {
    if (f(a, key) != f(c, key) && f(b, key) != f(c, key)) {
      s = a*f(b, key)*f(c, key)/((f(a, key)-f(b, key))*(f(a, key)-f(c, key))) + b*f(a, key)*f(c, key)/((f(b, key)-f(a, key))*(f(b, key)-f(c, key))) + c*f(a, key)*f(b, key)/((f(c, key)-f(a, key))*(f(c, key)-f(b, key)))
    } else {
      s = b-f(b, key) * (b-a)/(f(b, key)-f(a, key))
    }
    if (!((s < b) && (s > ((3*a+b)/4))) || (flag && (Math.abs(s-b) >= Math.abs(b-c)/2)) || (!flag && (Math.abs(s-b) >= Math.abs(c-d)/2)) || (flag && (Math.abs(b-c) < precision)) || (!flag && (Math.abs(c-d) < precision))) {
      s = (a+b)/2
      flag = true
    } else {
      flag = false
    }
    
    var d = c
    c = b
    if (f(a, key) * f(s, key) < 0) {
      b = s
    } else {
      a = s
    }
    if (Math.abs(f(a, key)) < Math.abs(f(b, key))) {
      var temp = a
      a = b	
      b = temp
    }
    
  }
  return b;
} 

// function used by Brent's method to break even service life
function func_year(year, key) {
  var outputs = calculate()
  if (key == 'baseline') {
    var cost_comparison = outputs[2]
    var energy_comparison = outputs[3]
  } else if (key == 'proposed') {
    var cost_comparison = outputs[0]
    var energy_comparison = outputs[1]
  }

  var lcoe = cost_comparison/energy_comparison
  var om_cost = parseFloat($('#'+key+'_cost_om_text').val())/1000
  var discount_rate = parseFloat($('#'+key+'_discount_rate_text').val())/100.0
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var energy_yield = parseFloat($('#'+key+'_energy_yield_text').val())/1000

  cost_val = initial_cost(key) + om_cost * ((1 - 1/Math.pow(1 + discount_rate, year))/discount_rate)

  var energy_mult = (1 - Math.pow(1 + discount_rate, year)) / (-1 * discount_rate * Math.pow(1 + discount_rate, year))
  var energy_deg_mult = (1 / Math.pow(1 + discount_rate, year - 1) - 1 - discount_rate) / Math.pow(discount_rate, 2) - ((0.5 - year) / Math.pow(1 + discount_rate, year) - 0.5) / discount_rate
  energy_val = energy_yield * energy_mult + energy_yield * degradation_rate * energy_deg_mult

  return lcoe - cost_val/energy_val
}

// break even service life using Brent's method
function reset_year(key) {
  $('#lcoe_proposed').tooltip('disable')
  $('#lcoe_baseline').tooltip('disable')
  var mismatch = false;
  var new_value = 0
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var upper_bound = 1 / degradation_rate + 0.5
  new_value = brents_method(func_year, 1, upper_bound, 0.0001, 1e-10, key)
  // new_value = new_value.toFixed(0)

  // Brent's method failed, determine if largest or smallest value should be displayed
  if (new_value == -1) {
    mismatch = true;
    if (Math.abs(func_year(1, key)) < Math.abs(func_year(upper_bound, key))) {
      new_value = 1
    } else {
      new_value = upper_bound
    }
  }
  new_value = new_value.toFixed(0)
  $('#'+key+'_service_life_text').val(new_value)
  update_slider(key+'_service_life', new_value)
  calculate()

  // show a tooltip with a warning for 3 seconds if LCOEs don't match for rounding reasons
if (!mismatch) {
  if ((document.getElementById('lcoe_proposed').innerHTML != document.getElementById('lcoe_baseline').innerHTML) && (key == 'proposed')) {

    
    document.getElementById('lcoe_proposed').setAttribute('data-original-title', 'Break even result is approximate because service life has been rounded.');

    $('#lcoe_proposed').tooltip('enable')
    $('#lcoe_proposed').tooltip('show')

    setTimeout(function(){
        $('#lcoe_proposed').tooltip('hide');
    }, 3000);
  }
  if ((document.getElementById('lcoe_proposed').innerHTML != document.getElementById('lcoe_baseline').innerHTML) && (key == 'baseline')) {

    
      document.getElementById('lcoe_baseline').setAttribute('data-original-title', 'Break even result is approximate because service life has been rounded.');


      $('#lcoe_baseline').tooltip('enable')
      $('#lcoe_baseline').tooltip('show')

    setTimeout(function(){
        $('#lcoe_baseline').tooltip('hide');
    }, 3000);
  }
}


}

// function to break even front layer cost, cell cost, back layer cost, non-cell module cost, extra component cost,
// BOS cost power scaling, BOS cost area scaling, and efficiency
function match_LCOE(slider_name, number_name, key) {
  // only perform break even calculations if baseline and proposed LCOEs are different
  if (document.getElementById('lcoe_proposed').innerHTML != document.getElementById('lcoe_baseline').innerHTML) {

  var number = document.getElementById(number_name);
  var outputs = calculate()
  var init_cost = initial_cost(key)
  var cost_bos_power = parseFloat($('#'+key+'_cost_bos_power_text').val())
  var cost_bos_area = parseFloat($('#'+key+'_cost_bos_area_text').val())
  var efficiency = parseFloat($('#'+key+'_efficiency_text').val())

  var cost_front_layer = parseFloat($('#'+key+'_cost_front_layer_text').val())
  var cost_cell = parseFloat($('#'+key+'_cost_cell_text').val())
  var cost_back_layer = parseFloat($('#'+key+'_cost_back_layer_text').val())
  var cost_noncell = parseFloat($('#'+key+'_cost_noncell_text').val())
  var cost_extra = parseFloat($('#'+key+'_cost_extra_text').val())

  if (key == 'baseline') {
    var cost_comparison = outputs[2]
    var energy_comparison = outputs[3]
    var cost_current = outputs[0]
    var energy_current = outputs[1]
  } else if (key == 'proposed') {
    var cost_comparison = outputs[0]
    var energy_comparison = outputs[1]
    var cost_current = outputs[2]
    var energy_current = outputs[3]
  }

  var later_cost = cost_current - init_cost
  var lcoe = cost_comparison/energy_comparison
  
  if (slider_name == 'cost_front_layer') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_front_layer = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency) - cost_cell - cost_back_layer - cost_noncell - cost_extra) //.toFixed(2)
    new_value = cost_front_layer
  } else if (slider_name == 'cost_cell') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_cell = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_back_layer - cost_noncell - cost_extra) //.toFixed(2)
    new_value = cost_cell
  } else if (slider_name == 'cost_back_layer') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_back_layer = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_cell - cost_noncell - cost_extra)
    new_value = cost_back_layer
  } else if (slider_name == 'cost_noncell') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_noncell = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_cell - cost_back_layer - cost_extra) //.toFixed(2)
    new_value = cost_noncell
  } else if (slider_name == 'cost_extra') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_extra = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_cell - cost_back_layer - cost_noncell) //.toFixed(2)
    new_value = cost_extra
  } else if (slider_name == 'cost_bos_power') {
    wanted_cost = (lcoe * energy_current) - later_cost - (MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency))
    cost_bos_power = wanted_cost - cost_bos_area/(10.0*efficiency)
    new_value = cost_bos_power
  } else if (slider_name == 'cost_bos_area') {
    wanted_cost = (lcoe * energy_current) - later_cost - (MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency))
    cost_bos_area = (wanted_cost - cost_bos_power)*(10.0*efficiency)
    new_value = cost_bos_area
  } else if (slider_name == 'efficiency') {
    wanted_cost = (lcoe * energy_current) - later_cost 
    efficiency = (cost_bos_area + MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)) / (10 * (wanted_cost-cost_bos_power))
    new_value = efficiency 
  }
  

  var cost_module = MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency)
  document.getElementById('module_cost_per_watt_'+key).innerHTML = cost_module.toFixed(2)
  document.getElementById('system_cost_per_watt_'+key).innerHTML = (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module).toFixed(2)
  
  $('#'+key+'_'+slider_name+'_text').val(new_value)
  update_slider(key+'_'+slider_name, new_value)
  calculate()

  var lcoe_proposed = document.getElementById('lcoe_proposed').innerHTML
  var lcoe_baseline = document.getElementById('lcoe_baseline').innerHTML

  // resolve tiny rounding errors
  if (lcoe_proposed != lcoe_baseline && Math.abs(lcoe_proposed - lcoe_baseline) <= 0.0001) {
    document.getElementById('lcoe_'+key).innerHTML = lcoe.toFixed(4)
  }

  }

}

// function to break even energy yield
function reset_energy_yield(key) {
  // only perform break even calculations if baseline and proposed LCOEs are different
  if (document.getElementById('lcoe_proposed').innerHTML != document.getElementById('lcoe_baseline').innerHTML) {
  var outputs = calculate()
  var discount_rate = parseFloat($('#'+key+'_discount_rate_text').val())/100.0
  if (key == 'baseline') {
      var cost_comparison = outputs[2]
      var energy_comparison = outputs[3]
      var cost_current = outputs[0]
  } else if (key == 'proposed') {
      var cost_comparison = outputs[0]
      var energy_comparison = outputs[1]
      var cost_current = outputs[2]
  }
  
  var lcoe = cost_comparison/energy_comparison
  var energy_wanted = cost_current/lcoe
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var year = parseFloat($('#'+key+'_service_life_text').val())

  var energy_mult = (1 - Math.pow(1 + discount_rate, year)) / (-1 * discount_rate * Math.pow(1 + discount_rate, year))
  var energy_deg_mult = (1 / Math.pow(1 + discount_rate, year - 1) - 1 - discount_rate) / Math.pow(discount_rate, 2) - ((0.5 - year) / Math.pow(1 + discount_rate, year) - 0.5) / discount_rate

  var new_value = energy_wanted / (energy_mult + degradation_rate * energy_deg_mult) * 1000



  $('#'+key+'_energy_yield_text').val(new_value)

  update_slider(key+'_energy_yield', new_value)

  calculate()


  var lcoe_proposed = document.getElementById('lcoe_proposed').innerHTML
  var lcoe_baseline = document.getElementById('lcoe_baseline').innerHTML

  // resolve tiny rounding errors
  if (lcoe_proposed != lcoe_baseline && Math.abs(lcoe_proposed - lcoe_baseline) <= 0.0001) {
    document.getElementById('lcoe_'+key).innerHTML = lcoe.toFixed(4)
  }
  }
}

// Set up the baseline Preset model
var preset_cell_technology = document.getElementById('cell_technology')
var preset_location_yield = document.getElementById('location_yield')
var preset_system_type = document.getElementById('system_type')
var preset_package_type = document.getElementById('package_type')
var ilr_slider = document.getElementById('ilr_preset')
// Fill in the preset cell technologies
for (var key in preset_tree) {
  var option = document.createElement('option');
  option.text = key;
  option.value = key;
  preset_cell_technology.appendChild(option)
}

function setup_preset_package_type() {
  // Fill in the package type menu
  // Get the current selection
  var selected = preset_package_type.value
  // Clear the options
  preset_package_type.options.length = 0
  // Now fill in the options available for the cell technology
  for (var key in preset_tree[preset_cell_technology.value]) {
    var option = document.createElement('option');
    option.text = key;
    option.value = key;
    preset_package_type.add(option)
  }
  if (selected in preset_tree[preset_cell_technology.value]){
    preset_package_type.value = selected
  }
  setup_preset_system_type()
}

function setup_preset_system_type() {
  // Fill in the system type menu
  // Get the current selection
  var selected = preset_system_type.value
  // Clear the options
  preset_system_type.options.length = 0
  // Now fill in the options available for the cell technology and package type
  for (var key in preset_tree[preset_cell_technology.value][preset_package_type.value]) {
    var option = document.createElement('option');
    option.text = key;
    option.value = key;
    preset_system_type.appendChild(option)
  }
  if (selected in preset_tree[preset_cell_technology.value][preset_package_type.value]){
    preset_system_type.value = selected
  }
  setup_preset_location_yield()
}

function setup_preset_location_yield() {
  // Fill in the location menu
  var selected = preset_location_yield.value
  // Clear the options
  preset_location_yield.options.length = 0
  // Now fill in the options available for the cell technology, package type, system type
  for (var key in preset_tree[preset_cell_technology.value][preset_package_type.value][preset_system_type.value]) {
    var option = document.createElement('option');
    option.text = key;
    option.value = key;
    preset_location_yield.appendChild(option)
  }
  if (selected in preset_tree[preset_cell_technology.value][preset_package_type.value][preset_system_type.value]){
    preset_location_yield.value = selected
  }
}

// Set up the presets for the first time
preset_cell_technology.value = 'mono-Si'
setup_preset_package_type()
preset_package_type.value = 'glass-polymer backsheet'
preset_system_type.value = 'fixed tilt, utility scale'
preset_location_yield.value = 'USA MO Kansas City'
//ilr_slider.value = 1.3
//$('#ilr_slider_text').val(1.3)

// Set up the presets anytime a menu selection is made
preset_cell_technology.addEventListener('input', function(){
  setup_preset_package_type()
})
preset_package_type.addEventListener('input', function(){
  setup_preset_system_type()
})
preset_system_type.addEventListener('input', function(){
  setup_preset_location_yield()
})


function preset_set(key){
  var preset = preset_tree[preset_cell_technology.value][preset_package_type.value][preset_system_type.value][preset_location_yield.value]
  var service_life_default = 25
  var discount_rate_default = 6.30

  // Set the text input fields
  $('#'+key+'_cost_front_layer_text').val(preset['cost_front_layer'].toFixed(2))
  $('#'+key+'_cost_cell_text').val(preset['cost_cell'].toFixed(2))
  $('#'+key+'_cost_back_layer_text').val(preset['cost_back_layer'].toFixed(2))
  $('#'+key+'_cost_noncell_text').val(preset['cost_noncell'].toFixed(2))
  $('#'+key+'_cost_extra').val(0)
  $('#'+key+'_cost_om_text').val(preset['cost_om'].toFixed(2))
  $('#'+key+'_cost_bos_power_text').val(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_power'].toFixed(2))
  $('#'+key+'_cost_bos_area_text').val(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_area'].toFixed(2))
  $('#'+key+'_efficiency_text').val(preset['efficiency'].toFixed(1))
  $('#'+key+'_energy_yield_text').val(preset['energy_yield'].toFixed(0))
  $('#'+key+'_degradation_rate_text').val(preset['degradation_rate'].toFixed(2))
  $('#'+key+'_service_life_text').val(service_life_default)
  $('#'+key+'_discount_rate_text').val(discount_rate_default)

  // Set the sliders
  document.getElementById(key+'_cost_front_layer').noUiSlider.set(preset['cost_front_layer'])
  document.getElementById(key+'_cost_cell').noUiSlider.set(preset['cost_cell'])
  document.getElementById(key+'_cost_back_layer').noUiSlider.set(preset['cost_back_layer'])
  document.getElementById(key+'_cost_noncell').noUiSlider.set(preset['cost_noncell'])
  document.getElementById(key+'_cost_extra').noUiSlider.set(0.00)
  document.getElementById(key+'_cost_om').noUiSlider.set(preset['cost_om'].toFixed(2))
  document.getElementById(key+'_cost_bos_power').noUiSlider.set(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_power'])
  document.getElementById(key+'_cost_bos_area').noUiSlider.set(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_area'])
  document.getElementById(key+'_efficiency').noUiSlider.set(preset['efficiency'])
  document.getElementById(key+'_energy_yield').noUiSlider.set(preset['energy_yield'])
  document.getElementById(key+'_degradation_rate').noUiSlider.set(preset['degradation_rate'])
  document.getElementById(key+'_service_life').noUiSlider.set(service_life_default)
  document.getElementById(key+'_discount_rate').noUiSlider.set(discount_rate_default)

  calculate()
}


preset_set('baseline')
copy_from_baseline()

function copy_from_baseline(){
  // Set the text input fields
  $('#proposed_cost_front_layer_text').val($('#baseline_cost_front_layer_text').val())
  $('#proposed_cost_cell_text').val($('#baseline_cost_cell_text').val())
  $('#proposed_cost_back_layer_text').val($('#baseline_cost_back_layer_text').val())
  $('#proposed_cost_noncell_text').val($('#baseline_cost_noncell_text').val())
  $('#proposed_cost_extra_text').val($('#baseline_cost_extra_text').val())
  $('#proposed_cost_om_text').val($('#baseline_cost_om_text').val())
  $('#proposed_cost_bos_power_text').val($('#baseline_cost_bos_power_text').val())
  $('#proposed_cost_bos_area_text').val($('#baseline_cost_bos_area_text').val())
  $('#proposed_efficiency_text').val($('#baseline_efficiency_text').val())
  $('#proposed_energy_yield_text').val($('#baseline_energy_yield_text').val())
  $('#proposed_degradation_rate_text').val($('#baseline_degradation_rate_text').val())
  $('#proposed_service_life_text').val($('#baseline_service_life_text').val())
  $('#proposed_discount_rate_text').val($('#baseline_discount_rate_text').val())

  // Set the sliders
  document.getElementById('proposed_cost_front_layer').noUiSlider.set($('#baseline_cost_front_layer_text').val())
  document.getElementById('proposed_cost_cell').noUiSlider.set($('#baseline_cost_cell_text').val())
  document.getElementById('proposed_cost_back_layer').noUiSlider.set($('#baseline_cost_back_layer_text').val())
  document.getElementById('proposed_cost_noncell').noUiSlider.set($('#baseline_cost_noncell_text').val())
  document.getElementById('proposed_cost_extra').noUiSlider.set($('#baseline_cost_extra_text').val())
  document.getElementById('proposed_cost_om').noUiSlider.set($('#baseline_cost_om_text').val())
  document.getElementById('proposed_cost_bos_power').noUiSlider.set($('#baseline_cost_bos_power_text').val())
  document.getElementById('proposed_cost_bos_area').noUiSlider.set($('#baseline_cost_bos_area_text').val())
  document.getElementById('proposed_efficiency').noUiSlider.set($('#baseline_efficiency_text').val())
  document.getElementById('proposed_energy_yield').noUiSlider.set($('#baseline_energy_yield_text').val())
  document.getElementById('proposed_degradation_rate').noUiSlider.set($('#baseline_degradation_rate_text').val())
  document.getElementById('proposed_service_life').noUiSlider.set($('#baseline_service_life_text').val())
  document.getElementById('proposed_discount_rate').noUiSlider.set($('#baseline_discount_rate_text').val())

  calculate()
}

// set max for degradation rate and service life based on each other
document.getElementById('baseline_degradation_rate').noUiSlider.updateOptions({
  range: {'min': 0, 'max': 100 / (parseFloat($('#baseline_service_life_text').val()) - 0.5)}
});
document.getElementById('proposed_degradation_rate').noUiSlider.updateOptions({
  range: {'min': 0, 'max': 100 / (parseFloat($('#proposed_service_life_text').val()) - 0.5)}
});
document.getElementById('baseline_service_life').noUiSlider.updateOptions({
  range: {'min': 0, 'max': 100 / parseFloat($('#baseline_degradation_rate_text').val()) + 0.5}
});
document.getElementById('proposed_service_life').noUiSlider.updateOptions({
  range: {'min': 0, 'max': 100 / parseFloat($('#proposed_degradation_rate_text').val()) + 0.5}
});

// Set up functions for calculating cost
function initial_cost(key) {
  var cost_front_layer = parseFloat($('#'+key+'_cost_front_layer_text').val())
  var cost_cell = parseFloat($('#'+key+'_cost_cell_text').val())
  var cost_back_layer = parseFloat($('#'+key+'_cost_back_layer_text').val())
  var cost_noncell = parseFloat($('#'+key+'_cost_noncell_text').val())
  var cost_extra = parseFloat($('#'+key+'_cost_extra_text').val())
  var cost_bos_power = parseFloat($('#'+key+'_cost_bos_power_text').val())
  var cost_bos_area = parseFloat($('#'+key+'_cost_bos_area_text').val())
  var efficiency = parseFloat($('#'+key+'_efficiency_text').val())

  var cost_module = MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency)

  // Update the cost per watt results
  document.getElementById('module_cost_per_watt_'+key).innerHTML = cost_module.toFixed(2)
  document.getElementById('system_cost_per_watt_'+key).innerHTML = (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module).toFixed(2)

  return (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module)
}

function om_cost(key, year) {
  // For now, O&M cost is zero in the zeroth year and constant thereafter
  // This is a function so an escalator or whatever can be added later
  if (year == 0) {
    return 0.0
  } else {
    return parseFloat($('#'+key+'_cost_om_text').val())/1000.0
  }
}

function capital_cost(key, year) {
  // For now, this is only initial cost
  // This is a function so inverter replacement or whatever can be added later
  if (year == 0) {
    return initial_cost(key)
  } else {
    return 0.0
  }
}

function cost(key, year) {
  return capital_cost(key, year) + om_cost(key, year)
}

// To calculate energy for each year
function energy(key, year) {
  energy_yield = parseFloat($('#'+key+'_energy_yield_text').val())/1000.0
  degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0

  if(year == 0){
    return 0
  } else {
    var energy_thisyear = energy_yield*(1 - degradation_rate * (year - 0.5)) // linear degradation rate
    // return energy_thisyear
    if(energy_thisyear > 0){
      return energy_thisyear
    } else {
// console.log(year)
      return 0
    }
  }
}

function calculate() {
  // Read the UI elements into variables
  var baseline_service_life = parseFloat($('#baseline_service_life_text').val())
  var proposed_service_life = parseFloat($('#proposed_service_life_text').val())

  var baseline_discount_rate = parseFloat($('#baseline_discount_rate_text').val())/100.0
  var proposed_discount_rate = parseFloat($('#proposed_discount_rate_text').val())/100.0

  // Calculate baseline and proposed 
  var cost_baseline = 0.0
  var energy_baseline = 0.0
  for (var year = 0; year <= baseline_service_life; year++) {
    if (energy('baseline', year) == 0 && year > 0) {
	// console.log('going 0')
	break;
    }
    cost_baseline += cost('baseline', year)/Math.pow(1 + baseline_discount_rate, year)
    energy_baseline += energy('baseline', year)/Math.pow(1 + baseline_discount_rate, year)
// console.log('energy_loop', year, energy_baseline)
  }
  var lcoe_baseline = cost_baseline/energy_baseline

  var cost_proposed = 0.0
  var energy_proposed = 0.0
  for (var year = 0; year <= proposed_service_life; year++) {
    if (energy('proposed', year) == 0 && year > 0) {
	// console.log('going 0', year)
	break;
    }
    cost_proposed += cost('proposed', year)/Math.pow(1 + proposed_discount_rate, year)
    energy_proposed += energy('proposed', year)/Math.pow(1 + proposed_discount_rate, year)
  }
  var lcoe_proposed = cost_proposed/energy_proposed


  // console.log(lcoe_baseline, lcoe_proposed)

  // display 'error' if service life input is invalid 
  // Put the final answer into the little pills in the Results section
  if (!Number.isInteger(parseFloat($('#baseline_service_life_text').val()))) {
     document.getElementById('lcoe_baseline').innerHTML = 'error'
  } else {
     document.getElementById('lcoe_baseline').innerHTML = lcoe_baseline.toFixed(4)
  }
  if (!Number.isInteger(parseFloat($('#proposed_service_life_text').val()))) {
     document.getElementById('lcoe_proposed').innerHTML = 'error'
  } else {
     document.getElementById('lcoe_proposed').innerHTML = lcoe_proposed.toFixed(4)
  }

  // return values used in break even calculations
  return [cost_baseline, energy_baseline, cost_proposed, energy_proposed]
}