import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import BikeIndex from './BUSINESS.js';

//UI Logic
function getManuStats(response) {
  let manufacturerArray = [];
  response.bikes.map(function(bike) {
    manufacturerArray.push(bike.manufacturer_name);
  });
  console.log(manufacturerArray);

  let manufacturerCounts = {};
  for (var i in manufacturerArray){
    if (!({}.propertyIsEnumerable.call(manufacturerCounts, (manufacturerArray[i])))) {
      (manufacturerCounts[manufacturerArray[i]] = 1);
    } else {
      manufacturerCounts[manufacturerArray[i]] += 1;
    }
  }

  const sortable = Object.entries(manufacturerCounts).sort(([,a],[,b]) => b-a).reduce((r, [k, v]) => ({...r, [k]: v}), {}); 
  console.log(sortable);
}

function clearFields() {
  $('#location').val("");
  $('.bike').val("");
}

function getElements(response) {
  const manufacturerStats = getManuStats(response);
  if (response.bikes.length === 0) {
    $('#showBike1').text("No stolen bikes near this zipcode");
  } else if(response.bikes) {
    for (let i = 0; i < response.bikes.length; i++) {
      $('#showBike' + (i + 1)).append(response.bikes[i].title);
    }
    $('#showManuStats').append(manufacturerStats[0], manufacturerStats[1], manufacturerStats[3]);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(zipCode) {
  const response = await BikeIndex.getBikes(zipCode);
  getElements(response);
}

//JQUERY UI Logic
$(document).ready(function() {
  $('#zipCode').click(function() {
    let zipCode = $('#location').val();
    clearFields();
    makeApiCall(zipCode);


    // BikeIndex.getBikes(zipCode)
    //   .then(function(response) {
    //     getElements(response);
    //   });
    // let promise = BikeIndex.getBikes(zipCode);
    // promise.then(function(response) {
    //   const body = JSON.parse(response);
    //   if (body.bikes.length === 0) {
    //     $('.showBikes').text("No stolen bikes near this zipcode");
    //   } else {
    //     $('.showBikes').text(body.bikes[0].frame_model);
    //   }
    // }, function (error) {
    //   $('.showErrors').text(`There was an error processing your request: ${error}`);
    // });
  });
});