'use strict';
var hourlyTimeArray = ['7AM', '8AM', '9AM', '10AM', '11AM', 'NOON', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];
var cookieTotal= [];
var locations =[];
var footer = document.createElement('tfoot');
var storeTable = document.getElementById('table');


function Location(name, min, max, avg){
  this.shopName = name;
  this.minHourlyCustomers = min;
  this.maxHourlyCustomers = max;
  this.avgCookiesPerCustomer = avg;
  this.hourlyCustomerArray = [];
  this.hourlyCookieArray = [];
  this.totalCookies = 0;
}

Location.prototype.setHourlyCustomerArray = function() {
  for (var i=0; i< hourlyTimeArray.length; i++) {
    this.hourlyCustomerArray.push(setHourlyCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));

  }
};

Location.prototype.setHourlyCookieArray = function() {
  for (var i=0; i< hourlyTimeArray.length; i++) {
    this.hourlyCookieArray.push(Math.floor((this.avgCookiesPerCustomer * this.hourlyCustomerArray[i])));
  }
  return this.hourlyCookieArray;
};

Location.prototype.setTotalCookies = function() {
  for (var i=0; i< hourlyTimeArray.length; i++)
    this.totalCookies += this.hourlyCookieArray[i];
};

Location.prototype.render = function(){
  var tableBody = document.getElementById('tBody');
  var list = document.createElement('tr');
  var shops = document.createElement('td');
  var cookieSales = [];
  shops.textContent = this.shopName;
  tableBody.appendChild(list);
  list.appendChild(shops);
  for (var i = 0; i < hourlyTimeArray.length; i++){
    var data = document.createElement('td');
    data.textContent = this.hourlyCookieArray[i];
    cookieSales[i] = this.hourlyCookieArray[i];
    list.appendChild(data);
  }
  cookieSales.push(this.totalCookies);
  cookieTotal.push(cookieSales);
  var storeData = document.createElement('td');
  storeData.textContent = this.totalCookies;
  tableBody.appendChild(list);
  list.appendChild(storeData);
};

function createHeaderRow(){
  var storeTableHead = document.getElementById('tableHead');
  var headRow = document.getElementById('headerRow');
  var hoursData = document.createElement('td');
  headRow.appendChild(hoursData);
  for (var i = 0; i < hourlyTimeArray.length; i ++){
    var data = document.createElement('td');
    data.textContent = hourlyTimeArray[i];
    headRow.appendChild(data);
  }
  var empty = document.getElementById('empty');
  empty.appendChild(document.createTextNode('     '));
  hoursData.textContent = 'Daily Location Total';
  headRow.appendChild(hoursData);
  storeTableHead.appendChild(headRow);
  storeTable.appendChild(storeTableHead);
}

function createFooterRow() {
  var footerRow = document.createElement('tr');
  var footerData = document.createElement('td');
  footerData.textContent = 'Totals';
  footerRow.appendChild(footerData);
  var totalSales = 0;
  for (var i = 0; i < hourlyTimeArray.length; i++){
    var hourlyData = document.createElement('td');
    var hourlyTotal = 0;
    console.log(locations);
    for (var j = 0; j< locations.length; j++) {
      hourlyTotal += locations[j].hourlyCookieArray[i];
    }
    totalSales += hourlyTotal;
    hourlyData.textContent = hourlyTotal;
    footerRow.appendChild(hourlyData);
  }
  var finalSales = document.createElement('td');
  finalSales.textContent = totalSales;
  footerRow.appendChild(finalSales);
  footer.appendChild(footerRow);
  storeTable.appendChild(footer);
}

createHeaderRow();

function setHourlyCustomers (min, max){
  var answer =  Math.floor((Math.random())*(max-min))+min;
  return answer;
}

var seattle = new Location('Seattle',23, 65, 6.3);

seattle.setHourlyCustomerArray(seattle.minHourlyCustomers, seattle.maxHourlyCustomers);
seattle.setHourlyCookieArray();
seattle.setTotalCookies();
seattle.render();
locations.push(seattle);

var tokyo = new Location('Tokyo', 3, 24, 1.2);

tokyo.setHourlyCustomerArray(tokyo.minHourlyCustomers, tokyo.maxHourlyCustomers);
tokyo.setHourlyCookieArray();
tokyo.setTotalCookies();
tokyo.render();
locations.push(tokyo);

var dubai = new Location('Dubai', 11, 38, 3.7);

dubai.setHourlyCustomerArray(dubai.minHourlyCustomers, dubai.maxHourlyCustomers);
dubai.setHourlyCookieArray();
dubai.setTotalCookies();
dubai.render();
locations.push(dubai);

var paris = new Location('Paris', 20, 38, 2.3);

paris.setHourlyCustomerArray(paris.minHourlyCustomers, paris.maxHourlyCustomers);
paris.setHourlyCookieArray();
paris.setTotalCookies();
paris.render();
locations.push(paris);

var lima = new Location('Lima', 16, 2, 4.6);

lima.setHourlyCustomerArray(lima.minHourlyCustomers, lima.maxHourlyCustomers);
lima.setHourlyCookieArray();
lima.setTotalCookies();
lima.render();
locations.push(lima);

function handleFormSubmitted(event) {
  event.preventDefault();
  var shopInput = document.getElementById('shopLocation');
  var shopValue = shopInput.value;
  var minInput = document.getElementById('minimumCookieSales');
  var minValue = minInput.value;
  var maxInput = document.getElementById('maximumCookieSales');
  var maxValue = maxInput.value;
  var avgInput = document.getElementById('averageCookieSales');
  var avgValue = avgInput.value;
  var newShop = new Location(shopValue, parseInt(minValue, 10), parseInt(maxValue, 10), parseFloat(avgValue));
  newShop.setHourlyCustomerArray();
  newShop.setHourlyCookieArray();
  newShop.setTotalCookies();
  newShop.render();
  locations.push(newShop);
  var form = document.getElementById('new-location');
  form.reset();
  document.removeElement('tfoot');
  createFooterRow();
}

var formElement = document.getElementById('new-location');

formElement.addEventListener('submit', handleFormSubmitted);

createFooterRow();
