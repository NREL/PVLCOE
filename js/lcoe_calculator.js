/*
Copyright 2020 Alliance for Sustainable Energy, LLC
 
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const MODULE_MARKUP = 1.15
$('#baseline_service_life_text').tooltip('disable')
//$('#baseline_service_life_text').tooltip('toggleEnabled')
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function update_slider(slider_name, value) { 
  $('#baseline_service_life_text').tooltip('hide')
  //$('#baseline_service_life_text').tooltip('show')
  var slider = document.getElementById(slider_name);
  var max = slider.noUiSlider.options.range.max
  var min = slider.noUiSlider.options.range.min
  value = parseFloat(value)
  //console.log(value, Number.isInteger(value))
  if ((slider_name == 'baseline_service_life' || slider_name == 'proposed_service_life') && (!Number.isInteger(value))) {
     console.log(slider_name == 'baseline_service_life' || slider_name == 'proposed_service_life', !Number.isInteger(value), 'invalid')
     $('#baseline_service_life_text').tooltip('enable')
     $('#baseline_service_life_text').tooltip('show')
  } else {$('#baseline_service_life_text').tooltip('disable')}
  if (value >= max) {
      slider.noUiSlider.set(max);
  } else if (value <= min) {
      slider.noUiSlider.set(min);
  } else {
      slider.noUiSlider.set(value);
  }
}

/*if (!Number.isInteger(parseFloat($('#baseline_service_life_text').val())) || !Number.isInteger(parseFloat($('#proposed_service_life_text').val()))) {
     //console.log(slider_name == 'baseline_service_life' || slider_name == 'proposed_service_life', !Number.isInteger(value), 'invalid')
     
     $('#baseline_service_life_text').tooltip('enable')
     $('#baseline_service_life_text').tooltip('show')
  } else {
$('#baseline_service_life_text').tooltip('disable')
console.log('not int')
}*/

function slider_setup(slider_name, number_name, settings) {
  // Set up sliders
  // Make variables for the slider and number input objects
  var slider = document.getElementById(slider_name);
  var number = document.getElementById(number_name);
  // Create the slider
  noUiSlider.create(slider, {keyboardSupport: true, keyboardDefaultStep: 1, start: settings['start'], step: settings['step'], connect: true, range: {'min': settings['min'], 'max': settings['max']}});



  // Set the number input to equal the slider's starting point
  number.value = parseFloat(slider.noUiSlider.get()).toFixed(settings['digits']);
  // When the slider moves, update the number
  slider.noUiSlider.on('slide', function(values) {
    number.value = parseFloat(values[0]).toFixed(settings['digits']);
    calculate()
  });
  // When the number changes, update the slider
  // The conditionals allow the user to put in an out-of-bounds number
  number.addEventListener('input', function(){
    update_slider(slider_name, this.value)
    calculate()
  });
}

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
  'common_discount_rate',
  'common_discount_rate_text',
  {'start': 0, 'min': 0, 'max': 10, 'step': 0.01, 'digits': 2}
)

function func_deg(deg, key) {
  var common_discount_rate = parseFloat($('#common_discount_rate_text').val())/100.0
  var year = $('#'+key+'_service_life_text').val()
  var outputs = calculate()
  var energy_yield = parseFloat($('#'+key+'_energy_yield_text').val())/1000
  if (key == 'baseline') {
     var cost_comparison = outputs[2]
     var energy_comparison = outputs[3]
     var cost_current = outputs[0]
  } else if (key == 'proposed') {
     var cost_comparison = outputs[0]
     var energy_comparison = outputs[1]
     var cost_current = outputs[2]
  }
  
  var wanted = energy_comparison*cost_current/(energy_yield*cost_comparison)
  return wanted - (1 - Math.pow((1-deg)/(1+common_discount_rate), year)) / (deg + common_discount_rate)
}

function reset_degradation(key) {
  new_value = secant_method(func_deg, 0, 0.05, 0.0001, key) * 100

  $('#'+key+'_degradation_rate_text').val((new_value).toFixed(2))

  update_slider(key+'_degradation_rate', new_value)
  calculate()
}

function reset_OM(key) {
  var outputs = calculate()
  var common_discount_rate = parseFloat($('#common_discount_rate_text').val())/100.0
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
  var new_value = nonzero_yrs/((1 - 1/Math.pow(1 + common_discount_rate, service_life))/common_discount_rate)

  if (new_value == 0) {
    new_value = (0.00).toFixed(2) // otherwise will display -0.00
  } 

  new_value *= 1000
  $('#'+key+'_cost_om_text').val((new_value).toFixed(2))
  
  update_slider(key+'_cost_om', new_value)
  calculate()

}

/*
Used to find the service life (in years). The solution for service life doesn't have a closed form solution.
While Brent's method can also be used to find the degradation rate, secant method is preferred since it can find roots
outside of the slider range (like negative numbers) and display them. 
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

/*
This is used to find the degradation rate. The equation for degradation rate doesn't have a closed form solution. Secant method 
allows values outside of the slider range to be displayed. It cannot be used to find service life since the LCOE curve is too 
flat (and creates divide by 0 behavior) for large numbers. 
*/
function secant_method(f, x0, x1, precision, key) {
  var prev = 0
  var x2 = x1 - f(x1, key) * (x1 - x0) / parseFloat(f(x1, key) - f(x0, key))
  while (Math.abs(x2 - prev) > precision) {
    prev = x2
    // console.log('before: ', x0, x1, x2)
    x0 = x1
    x1 = x2
    // console.log('after: ', x0, x1, f(x1, key), (x1 - x0), parseFloat(f(x1, key) - f(x0, key)))
    x2 = x1 - f(x1, key) * (x1 - x0) / parseFloat(f(x1, key) - f(x0, key))
    
  }
  return x2;

}

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
  var common_discount_rate = parseFloat($('#common_discount_rate_text').val())/100.0
  var degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var energy_yield = parseFloat($('#'+key+'_energy_yield_text').val())/1000

  cost_val = initial_cost(key) + om_cost * ((1 - 1/Math.pow(1 + common_discount_rate, year))/common_discount_rate)
  energy_val = energy_yield * (1-Math.pow((1-degradation_rate)/(1+common_discount_rate), year)) / (degradation_rate + common_discount_rate)
  return lcoe - cost_val/energy_val
}

function reset_year(key) {
  var new_value = 0
  new_value = brents_method(func_year, 1, 100, 0.0001, 1e-10, key)
  new_value = new_value.toFixed(0)
  if (new_value == -1) {
    if (Math.abs(func_year(1, key)) < Math.abs(func_year(100, key))) {
      new_value = 1
    } else {
      new_value = 100
    }
  }
  $('#'+key+'_service_life_text').val(new_value)
  update_slider(key+'_service_life', new_value)
  calculate()

}

function match_LCOE(slider_name, number_name, key) {
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
    cost_front_layer = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency) - cost_cell - cost_back_layer - cost_noncell - cost_extra).toFixed(2)
    new_value = cost_front_layer
  } else if (slider_name == 'cost_cell') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_cell = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_back_layer - cost_noncell - cost_extra).toFixed(2)
    new_value = cost_cell
  } else if (slider_name == 'cost_back_layer') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_back_layer = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_cell - cost_noncell - cost_extra)
    new_value = cost_back_layer.toFixed(2)
  } else if (slider_name == 'cost_noncell') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_noncell = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_cell - cost_back_layer - cost_extra).toFixed(2)
    new_value = cost_noncell
  } else if (slider_name == 'cost_extra') {
    wanted_cost = (lcoe * energy_current) - later_cost - cost_bos_power - cost_bos_area/(10.0*efficiency)
    cost_extra = ((wanted_cost/MODULE_MARKUP)*(10.0*efficiency)- cost_front_layer - cost_cell - cost_back_layer - cost_noncell).toFixed(2)
    new_value = cost_extra
  } else if (slider_name == 'cost_bos_power') {
    wanted_cost = (lcoe * energy_current) - later_cost - (MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency))
    cost_bos_power = wanted_cost - cost_bos_area/(10.0*efficiency)
    new_value = cost_bos_power.toFixed(2)
  } else if (slider_name == 'cost_bos_area') {
    wanted_cost = (lcoe * energy_current) - later_cost - (MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency))
    cost_bos_area = (wanted_cost - cost_bos_power)*(10.0*efficiency)
    new_value = cost_bos_area.toFixed(2)
  } else if (slider_name == 'efficiency') {
    wanted_cost = (lcoe * energy_current) - later_cost 
    efficiency = (cost_bos_area + MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)) / (10 * (wanted_cost-cost_bos_power))
    new_value = efficiency.toFixed(1) 
  }
  
  if (new_value == 0.00) {
    new_value = (0.00).toFixed(2) // otherwise will display -0.00
  } 

  var cost_module = MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency)
  document.getElementById('module_cost_per_watt_'+key).innerHTML = cost_module.toFixed(2)
  document.getElementById('system_cost_per_watt_'+key).innerHTML = (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module).toFixed(2)
  
  $('#'+key+'_'+slider_name+'_text').val(new_value)
  update_slider(key+'_'+slider_name, new_value)
  calculate()
  
}


function reset_energy_yield(key) {
  var outputs = calculate()
  var common_discount_rate = parseFloat($('#common_discount_rate_text').val())/100.0
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
  degradation_rate = parseFloat($('#'+key+'_degradation_rate_text').val())/100.0
  var year = parseFloat($('#'+key+'_service_life_text').val())

  var new_value = energy_wanted / ((1 - Math.pow((1-degradation_rate)/(1+common_discount_rate), year)) / (degradation_rate + common_discount_rate)) * 1000

  $('#'+key+'_energy_yield_text').val(new_value.toFixed(0))

  update_slider(key+'_energy_yield', new_value.toFixed(0))

  calculate()
}

// Set up the baseline Preset model
var preset_cell_technology = document.getElementById('cell_technology')
var preset_location_yield = document.getElementById('location_yield')
var preset_system_type = document.getElementById('system_type')
var preset_package_type = document.getElementById('package_type')
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

function preset_set(){
  var preset = preset_tree[preset_cell_technology.value][preset_package_type.value][preset_system_type.value][preset_location_yield.value]
  var service_life_default = 25
  var discount_rate_default = 6.30
  // Set the text input fields
  $('#baseline_cost_front_layer_text').val(preset['cost_front_layer'].toFixed(2))
  $('#baseline_cost_cell_text').val(preset['cost_cell'].toFixed(2))
  $('#baseline_cost_back_layer_text').val(preset['cost_back_layer'].toFixed(2))
  $('#baseline_cost_noncell_text').val(preset['cost_noncell'].toFixed(2))
  $('#baseline_cost_extra').val(0)
  $('#baseline_cost_om_text').val(preset['cost_om'].toFixed(2))
  $('#baseline_cost_bos_power_text').val(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_power'].toFixed(2))
  $('#baseline_cost_bos_area_text').val(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_area'].toFixed(2))
  $('#baseline_efficiency_text').val(preset['efficiency'].toFixed(1))
  $('#baseline_energy_yield_text').val(preset['energy_yield'].toFixed(0))
  $('#baseline_degradation_rate_text').val(preset['degradation_rate'].toFixed(2))
  $('#baseline_service_life_text').val(service_life_default)
  $('#common_discount_rate_text').val(discount_rate_default)

  // Set the sliders
  document.getElementById('baseline_cost_front_layer').noUiSlider.set(preset['cost_front_layer'])
  document.getElementById('baseline_cost_cell').noUiSlider.set(preset['cost_cell'])
  document.getElementById('baseline_cost_back_layer').noUiSlider.set(preset['cost_back_layer'])
  document.getElementById('baseline_cost_noncell').noUiSlider.set(preset['cost_noncell'])
  document.getElementById('baseline_cost_extra').noUiSlider.set(0.00)
  document.getElementById('baseline_cost_om').noUiSlider.set(preset['cost_om'].toFixed(2))
  document.getElementById('baseline_cost_bos_power').noUiSlider.set(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_power'])
  document.getElementById('baseline_cost_bos_area').noUiSlider.set(cost_bos_tree[preset_system_type.value][preset['state']]['cost_bos_area'])
  document.getElementById('baseline_efficiency').noUiSlider.set(preset['efficiency'])
  document.getElementById('baseline_energy_yield').noUiSlider.set(preset['energy_yield'])
  document.getElementById('baseline_degradation_rate').noUiSlider.set(preset['degradation_rate'])
  document.getElementById('baseline_service_life').noUiSlider.set(service_life_default)
  document.getElementById('common_discount_rate').noUiSlider.set(discount_rate_default)

  calculate()
  $('#preset_modal').modal('hide')
}


preset_set()
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

  calculate()
}

function copy_from_proposed(){
  $('#baseline_cost_front_layer_text').val($('#proposed_cost_front_layer_text').val())
  $('#baseline_cost_cell_text').val($('#proposed_cost_cell_text').val())
  $('#baseline_cost_back_layer_text').val($('#proposed_cost_back_layer_text').val())
  $('#baseline_cost_noncell_text').val($('#proposed_cost_noncell_text').val())
  $('#baseline_cost_extra_text').val($('#proposed_cost_extra_text').val())
  $('#baseline_cost_om_text').val($('#proposed_cost_om_text').val())
  $('#baseline_efficiency_text').val($('#proposed_efficiency_text').val())
  $('#baseline_energy_yield_text').val($('#proposed_energy_yield_text').val())
  $('#baseline_degradation_rate_text').val($('#proposed_degradation_rate_text').val())
  $('#baseline_service_life_text').val($('#proposed_service_life_text').val())
  calculate()
}

// Set up functions for calculating cost
function initial_cost(key) {
  if (key=='baseline') {
    var cost_front_layer = parseFloat($('#baseline_cost_front_layer_text').val())
    var cost_cell = parseFloat($('#baseline_cost_cell_text').val())
    var cost_back_layer = parseFloat($('#baseline_cost_back_layer_text').val())
    var cost_noncell = parseFloat($('#baseline_cost_noncell_text').val())
    var cost_extra = parseFloat($('#baseline_cost_extra_text').val())
    var cost_bos_power = parseFloat($('#baseline_cost_bos_power_text').val())
    var cost_bos_area = parseFloat($('#baseline_cost_bos_area_text').val())
    var efficiency = parseFloat($('#baseline_efficiency_text').val())
  } else if (key=='proposed') {
    var cost_front_layer = parseFloat($('#proposed_cost_front_layer_text').val())
    var cost_cell = parseFloat($('#proposed_cost_cell_text').val())
    var cost_back_layer = parseFloat($('#proposed_cost_back_layer_text').val())
    var cost_noncell = parseFloat($('#proposed_cost_noncell_text').val())
    var cost_extra = parseFloat($('#proposed_cost_extra_text').val())
    var cost_bos_power = parseFloat($('#proposed_cost_bos_power_text').val())
    var cost_bos_area = parseFloat($('#proposed_cost_bos_area_text').val())
    var efficiency = parseFloat($('#proposed_efficiency_text').val())
  }
  var cost_module = MODULE_MARKUP * (cost_front_layer + cost_cell + cost_back_layer + cost_noncell + cost_extra)/(10.0*efficiency)

  // Update the cost per watt results
  if (key=='baseline') {
    document.getElementById('module_cost_per_watt_baseline').innerHTML = cost_module.toFixed(2)
    document.getElementById('system_cost_per_watt_baseline').innerHTML = (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module).toFixed(2)
  } else if (key=='proposed') {
    document.getElementById('module_cost_per_watt_proposed').innerHTML = cost_module.toFixed(2)
    document.getElementById('system_cost_per_watt_proposed').innerHTML = (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module).toFixed(2)
  }

  return (cost_bos_power + cost_bos_area/(10.0*efficiency) + cost_module)
}

function om_cost(key, year) {
  // For now, O&M cost is zero in the zeroth year and constant thereafter
  // This is a function so an escalator or whatever can be added later
  if (year==0) {
    return 0.0
  } else {
    if (key=='baseline') {
      return parseFloat($('#baseline_cost_om_text').val())/1000.0
    } else if (key=='proposed') {
      return parseFloat($('#proposed_cost_om_text').val())/1000.0
    }
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
  if (key=='baseline') {
    energy_yield = parseFloat($('#baseline_energy_yield_text').val())/1000.0
    degradation_rate = parseFloat($('#baseline_degradation_rate_text').val())/100.0
  } else if (key=='proposed') {
    energy_yield = parseFloat($('#proposed_energy_yield_text').val())/1000.0
    degradation_rate = parseFloat($('#proposed_degradation_rate_text').val())/100.0
  }
  if(year == 0){
    return 0
  } else {
    var energy_thisyear = energy_yield*Math.pow(1 - degradation_rate, (year - 1))
    if(energy_thisyear > 0){
      return energy_thisyear
    } else {
      return 0
    }
  }
}

function calculate() {
  // Read the UI elements into variables
  var baseline_service_life = parseFloat($('#baseline_service_life_text').val())
  var proposed_service_life = parseFloat($('#proposed_service_life_text').val())

  var common_discount_rate = parseFloat($('#common_discount_rate_text').val())/100.0
  var common_parameter_2 = parseFloat($('#common_parameter_2_text').val())
  var common_parameter_3 = parseFloat($('#common_parameter_3_text').val())

  // Calculate baseline and proposed 
  var cost_baseline = 0.0
  var energy_baseline = 0.0
  for (var year = 0; year <= baseline_service_life; year++) {
    cost_baseline += cost('baseline', year)/Math.pow(1 + common_discount_rate, year)
    energy_baseline += energy('baseline', year)/Math.pow(1 + common_discount_rate, year)
  }
  var lcoe_baseline = cost_baseline/energy_baseline

  var cost_proposed = 0.0
  var energy_proposed = 0.0
  var mine = 0.0
  for (var year = 0; year <= proposed_service_life; year++) {
    cost_proposed += cost('proposed', year)/Math.pow(1 + common_discount_rate, year)
    energy_proposed += energy('proposed', year)/Math.pow(1 + common_discount_rate, year)
  }
  var lcoe_proposed = cost_proposed/energy_proposed

  // Put the final answer into the little pills in the Results section
  document.getElementById('lcoe_baseline').innerHTML = lcoe_baseline.toFixed(4)
  document.getElementById('lcoe_proposed').innerHTML = lcoe_proposed.toFixed(4)

  return [cost_baseline, energy_baseline, cost_proposed, energy_proposed]
}

