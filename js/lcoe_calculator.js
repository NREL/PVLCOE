/*
Copyright 2020 Alliance for Sustainable Energy, LLC
 
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const MODULE_MARKUP = 1.15

$(document).ready(function(){
  $('[data-toggle="popover"]').popover({html:true});   
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function baselineToggle() {
  if (document.getElementById('baselineCheckBox').checked) {
    document.getElementById("proposedCheckBox").checked = true;
  } else {
    document.getElementById("proposedCheckBox").checked = false;
  }
  setTimeout(function(){
     $('#baselineCheckBox').tooltip('hide');
  }, 1500);
}

function proposedToggle() {
  if (document.getElementById('proposedCheckBox').checked) {
    document.getElementById("baselineCheckBox").checked = true;
  } else {
    document.getElementById("baselineCheckBox").checked = false;
  }
  setTimeout(function(){
     $('#proposedCheckBox').tooltip('hide');
  }, 1500);
}


function update_slider(slider_name, value) {
  var slider = document.getElementById(slider_name);
  var max = slider.noUiSlider.options.range.max
  var min = slider.noUiSlider.options.range.min

  if (value >= max) {
      slider.noUiSlider.set(max);
  } else if (value <= min) {
      slider.noUiSlider.set(min);
  } else {
      slider.noUiSlider.set(value);
  }
}

function filterPips(value) {
  if (value.toFixed(1) == 1.1 || value.toFixed(1) == 1.3 || value.toFixed(1) == 1.4) return 0;
  return -1;
}

function slider_setup(slider_name, number_name, settings) {
  // Set up sliders
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
    number.value = parseFloat(values[0]).toFixed(settings['digits']);
    if (slider_name == 'baseline_discount_rate' && !document.getElementById('baselineCheckBox').checked) {
      update_slider('proposed_discount_rate', number.value)
      $('#proposed_discount_rate_text').val(number.value)
    }
    if (slider_name == 'proposed_discount_rate' && !document.getElementById('proposedCheckBox').checked) {
      update_slider('baseline_discount_rate', number.value)
      $('#baseline_discount_rate_text').val(number.value)
    }
    calculate()
  });
  // When the number changes, update the slider
  // The conditionals allow the user to put in an out-of-bounds number
  number.addEventListener('input', function(){
    update_slider(slider_name, this.value);
    if (slider_name == 'baseline_discount_rate' && !document.getElementById('baselineCheckBox').checked) {
      update_slider('proposed_discount_rate', this.value)
      $('#proposed_discount_rate_text').val(this.value)
    }
    if (slider_name == 'proposed_discount_rate' && !document.getElementById('proposedCheckBox').checked) {
      update_slider('baseline_discount_rate', this.value)
      $('#baseline_discount_rate_text').val(this.value)
    }
    calculate();
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

  var baseline_discount_rate = parseFloat($('#baseline_discount_rate_text').val())/100.0
  var proposed_discount_rate = parseFloat($('#proposed_discount_rate_text').val())/100.0

  // Calculate baseline and proposed 
  var cost_baseline = 0.0
  var energy_baseline = 0.0
  for (var year = 0; year <= baseline_service_life; year++) {
    cost_baseline += cost('baseline', year)/Math.pow(1 + baseline_discount_rate, year)
    energy_baseline += energy('baseline', year)/Math.pow(1 + baseline_discount_rate, year)
  }
  var lcoe_baseline = cost_baseline/energy_baseline

  var cost_proposed = 0.0
  var energy_proposed = 0.0
  for (var year = 0; year <= proposed_service_life; year++) {
    cost_proposed += cost('proposed', year)/Math.pow(1 + proposed_discount_rate, year)
    energy_proposed += energy('proposed', year)/Math.pow(1 + proposed_discount_rate, year)
  }
  var lcoe_proposed = cost_proposed/energy_proposed

  // Put the final answer into the little pills in the Results section
  document.getElementById('lcoe_baseline').innerHTML = lcoe_baseline.toFixed(4)
  document.getElementById('lcoe_proposed').innerHTML = lcoe_proposed.toFixed(4)

  return [cost_baseline, energy_baseline, cost_proposed, energy_proposed]
}