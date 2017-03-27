(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var myApp = {}; //initialize my app object
myApp.countries = {}; //initialize for array and object created via function;

myApp.events = function () {
	$('.userInfoInput__Form').on('submit', function (event) {
		event.preventDefault();
		myApp.getDateOfDeath('user');
		$('.userInfoInput').fadeOut('slow', function () {
			return $('main').fadeIn('slow');
		});
		$.when(myApp.userInfo.dateOfDeathCheck).done(function () {
			myApp.startCountdown(myApp.userInfo.dateOfDeath, 'user');
		});
	});
	$('.otherPerson__Form').on('submit', function (event) {
		event.preventDefault();
		myApp.otherPersonInfo.country = $('.otherPerson__Form .country').val();
		$('.otherPersonTitle').text('If you lived in ' + myApp.otherPersonInfo.country);
		myApp.getDateOfDeath('otherPerson');
		$('.otherPersonCountryText').text(myApp.otherPersonInfo.country);
		$.when(myApp.userInfo.dateOfDeathCheck).done(function () {
			myApp.ageDiff = myApp.getAgeDiff();
			myApp.updateAgeParagraph();
			myApp.loadPhaseTwo();
		});
	});
	$('.jobInfo__form').on('submit', function (event) {
		event.preventDefault();
		var selectedJob = $('.jobInfo__select').val().replace(/_/gi, ' ');
		myApp.chartJobs(myApp.jobSalariesList[selectedJob]);
	});
};

myApp.updateAgeParagraph = function () {
	$('.gainLoss').text(myApp.ageDiff.gainLoss);
	$('.yearsText').text(myApp.ageDiff.years);
	$('.daysText').text(myApp.ageDiff.days);
	$('.hoursText').text(myApp.ageDiff.hours);
	$('.minutesText').text(myApp.ageDiff.minutes);
	if (myApp.ageDiff.years > 1 || myApp.ageDiff.years === 0) {
		$('.pluralSyear').text('s');
	} else {
		$('.pluralSyear').text('');
	}
	if (myApp.ageDiff.days > 1 || myApp.ageDiff.years === 0) {
		$('.pluralSday').text('s');
	} else {
		$('.pluralSday').text('');
	}
	if (myApp.ageDiff.hours > 1 || myApp.ageDiff.years === 0) {
		$('.pluralShour').text('s');
	} else {
		$('.pluralShour').text('');
	}
	if (myApp.ageDiff.minutes > 1 || myApp.ageDiff.years === 0) {
		$('.pluralSminute').text('s');
	} else {
		$('.pluralSminute').text('');
	}
	$('.ofFor').text(myApp.ageDiff.ofFor);
};

myApp.getAgeDiff = function () {
	var userDeath = myApp.userInfo.dateOfDeath;
	var otherDeath = myApp.otherPersonInfo.dateOfDeath;
	var gainLoss = void 0;
	var difference = void 0;
	var ofFor = void 0;
	if (userDeath > otherDeath) {
		gainLoss = 'lose';
		difference = userDeath - otherDeath;
		ofFor = 'of';
	} else if (userDeath < otherDeath) {
		gainLoss = 'add';
		difference = otherDeath - userDeath;
		ofFor = 'to';
	}
	var seconds = Math.floor(difference / 1000 % 60);
	var minutes = Math.floor(difference / 1000 / 60 % 60);
	var hours = Math.floor(difference / (1000 * 60 * 60) % 24);
	var days = Math.floor(difference / (1000 * 60 * 60 * 24)) % 365;
	var years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
	return {
		seconds: seconds,
		minutes: minutes,
		hours: hours,
		days: days,
		years: years,
		gainLoss: gainLoss,
		ofFor: ofFor
	};
};

myApp.startCountdown = function (dateOfDeath, who) {
	if (who === "user") {
		myApp.countDowns = {};
		myApp.countDowns.user = setInterval(function () {
			myApp.userInfo.countdown = myApp.getTimeRemaining(dateOfDeath);
			$('p.userSeconds').html('<span class="timeTitle">Seconds: </span><span class="timeCounter">' + myApp.userInfo.countdown.seconds + '</span>');
			$('p.userMinutes').html('<span class="timeTitle">Minutes: </span><span class="timeCounter">' + myApp.userInfo.countdown.minutes + '</span>');
			$('p.userHours').html('<span class="timeTitle">Hours: </span><span class="timeCounter">' + myApp.userInfo.countdown.hours + '</span>');
			$('p.userDays').html('<span class="timeTitle">Days: </span><span class="timeCounter">' + myApp.userInfo.countdown.days + '</span>');
			$('p.userYears').html('<span class="timeTitle">Years: </span><span class="timeCounter">' + myApp.userInfo.countdown.years + '</span>');
			if (myApp.otherPersonInfo.timerEngaged === true) {
				myApp.otherPersonInfo.countdown = myApp.getTimeRemaining(myApp.otherPersonInfo.dateOfDeath);
				$('p.otherPersonSeconds').html('<span class="timeTitle">Seconds: </span><span class="timeCounter">' + myApp.otherPersonInfo.countdown.seconds + '</span>');
				$('p.otherPersonMinutes').html('<span class="timeTitle">Minutes: </span><span class="timeCounter">' + myApp.otherPersonInfo.countdown.minutes + '</span>');
				$('p.otherPersonHours').html('<span class="timeTitle">Hours: </span><span class="timeCounter">' + myApp.otherPersonInfo.countdown.hours + '</span>');
				$('p.otherPersonDays').html('<span class="timeTitle">Days: </span><span class="timeCounter">' + myApp.otherPersonInfo.countdown.days + '</span>');
				$('p.otherPersonYears').html('<span class="timeTitle">Years: </span><span class="timeCounter">' + myApp.otherPersonInfo.countdown.years + '</span>');
			}
		}, 1000);
	}
};

myApp.getDate = function () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}
	myApp.dateObject = today;
	return yyyy + '-' + mm + '-' + dd;
};

myApp.getCountries = function () {
	myApp.getCountriesCheck = $.ajax({
		url: 'http://api.population.io:80/1.0/countries',
		type: 'GET',
		dataType: 'json'

	}).done(function (countriesArray) {
		myApp.parseCountries(countriesArray['countries']);
		$('.worldAPIstatusIcon').removeClass('fa-spinner');
		$('.worldAPIstatusIcon').removeClass('fa-pulse');
		$('.worldAPIstatusIcon').removeClass('fa-3x');
		$('.worldAPIstatusIcon').removeClass('fa-fw');
		$('.worldAPIstatusIcon').addClass('fa-check-circle');
	}).fail(function () {
		$('.errorMessageOverlay').fadeIn('fast');
	});

	myApp.teleportCountriesCheck = $.ajax({
		url: 'https://api.teleport.org/api/countries/',
		type: 'GET',
		dataType: 'JSON'

	}).done(function (teleportCountries) {
		myApp.parseTeleportCountries(teleportCountries._links["country:items"]);
		$('.teleportAPIstatusIcon').removeClass('fa-spinner');
		$('.teleportAPIstatusIcon').removeClass('fa-pulse');
		$('.teleportAPIstatusIcon').removeClass('fa-3x');
		$('.teleportAPIstatusIcon').removeClass('fa-fw');
		$('.teleportAPIstatusIcon').addClass('fa-check-circle');
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.parseCountries = function (arrayOfCountries) {
	var countries = {};
	for (var i = 0; i < arrayOfCountries.length; i++) {
		countries[arrayOfCountries[i]] = arrayOfCountries[i];
	}
	$('.loading').remove();
	myApp.countries.objectFormat = countries;
	myApp.countries.arrayFormat = arrayOfCountries;
	// myApp.countries.checkOne = true;
	return 'countries updated';
};

myApp.parseTeleportCountries = function (teleportCountries) {
	var teleportCountriesObject = {};
	for (var i = 0; i < teleportCountries.length; i++) {
		teleportCountriesObject[teleportCountries[i].name] = teleportCountries[i];
	}
	myApp.countries.teleportCountriesObject = teleportCountriesObject;
	myApp.countries.teleportCountriesArray = teleportCountries;
	// myApp.countries.teleportCheck = true;
};

myApp.createMasterCountryList = function () {
	var combinedArray = myApp.countries.arrayFormat.map(function (country) {
		if (myApp.countries.teleportCountriesObject[country] !== undefined) {
			return myApp.countries.teleportCountriesObject[country];
		} else {
			return '';
		}
	});
	var finalizedCountries = combinedArray.filter(function (item) {
		return !(typeof item === 'string');
	});
	var finalCountryObject = {};
	for (var i = 0; i < finalizedCountries.length; i++) {
		finalCountryObject[finalizedCountries[i].name] = finalizedCountries[i];
	}
	myApp.finalCountryList = finalCountryObject;
	for (var country in myApp.finalCountryList) {
		$('.country').append('<option val="' + myApp.finalCountryList[country].name.replace(/\s/gi, '_') + '">' + myApp.finalCountryList[country].name + '</option>');
	}
};

myApp.getUserInfo = function () {
	var userInfo = {};
	var userYears = $('.years').val();
	var userMonths = $('.months').val();
	var userGender = $('.gender:checked').val();

	userInfo.userAge = userYears + 'y' + userMonths + 'm';
	userInfo.ageYears = userYears;
	userInfo.currentDate = myApp.todayDate;
	userInfo.country = $('.userInfoInput__Form .country').val().replace(/_/gi, ' ');
	userInfo.gender = userGender;

	myApp.userInfo = userInfo;
	myApp.otherPersonInfo = {};
	myApp.otherPersonInfo.timerEngaged = false;

	$('.genderText').text(userInfo.gender);
	$('.countryText').text(userInfo.country);
	$('.ageText').text(userInfo.ageYears);

	return userInfo;
};

myApp.getDateOfDeath = function (who) {
	//need to get even when for other person to fire only when this is done... currently firing in wrong order!
	if (who === 'user') {
		var personInfo = myApp.getUserInfo();
	} else {
		var personInfo = _extends({}, myApp.userInfo);
		personInfo.country = $('.otherPerson__Form .country').val();
	}
	myApp.userInfo.dateOfDeathCheck = $.ajax({
		url: 'http://api.population.io:80/1.0/life-expectancy/remaining/' + personInfo.gender + '/' + personInfo.country + '/' + personInfo.currentDate + '/' + personInfo.userAge + '/',
		type: 'GET',
		dataType: 'json'
	}).done(function (data) {
		var dateOfDeath = Date.parse(myApp.todayDate) + data.remaining_life_expectancy * 3.154e+10; //number is approx milisec in year
		if (who === 'user') {
			myApp.userInfo.dateOfDeath = dateOfDeath;
		} else {
			myApp.otherPersonInfo.dateOfDeath = dateOfDeath;
			myApp.otherPersonInfo.timerEngaged = true;
		}
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.getTimeRemaining = function (dateOfDeath) {
	//takes date of death in Epoch time
	var t = dateOfDeath - Date.parse(new Date());
	var seconds = Math.floor(t / 1000 % 60);
	var minutes = Math.floor(t / 1000 / 60 % 60);
	var hours = Math.floor(t / (1000 * 60 * 60) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24)) % 365;
	var years = Math.floor(t / (1000 * 60 * 60 * 24 * 365));
	return {
		'total': t,
		'years': years,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
};

myApp.getSalaryInfo = function (countryHREF) {
	return $.ajax({
		url: countryHREF,
		type: 'GET',
		dataType: 'JSON'
	}).done(function () {
		console.log("success");
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.createMasterSalariesList = function (leftData, rightData) {
	var leftCountry = myApp.userInfo.country;
	var rightCountry = myApp.otherPersonInfo.country;
	var leftSalaries = leftData[0].salaries;
	var rightSalaries = rightData[0].salaries;
	var salariesList = {};
	for (var job in leftSalaries) {
		var jobTitle = leftSalaries[job]['job']['title'];
		var jobSalaries = leftSalaries[job]['salary_percentiles'];
		salariesList[jobTitle] = {};
		salariesList[jobTitle]['title'] = jobTitle;
		salariesList[jobTitle][leftCountry] = {};
		salariesList[jobTitle][rightCountry] = {};
		salariesList[jobTitle][leftCountry] = jobSalaries;
		var jobSalariesRight = void 0;
		if (rightSalaries[job] === undefined) {
			jobSalariesRight = _extends({}, leftSalaries[job]['salary_percentiles']);
			jobSalariesRight.percentile_50 = 0;
		} else {
			jobSalariesRight = rightSalaries[job]['salary_percentiles'];
		}
		salariesList[jobTitle][rightCountry] = jobSalariesRight;
	}
	myApp.jobSalariesList = salariesList;
	myApp.getAverageSalary();
	myApp.populateJobList();
};

myApp.getAverageSalary = function () {
	var leftCountry = myApp.userInfo.country;
	var rightCountry = myApp.otherPersonInfo.country;
	var runningTotalLeft = 0;
	var runningTotalRight = 0;
	var counter = 0;
	for (var job in myApp.jobSalariesList) {
		runningTotalLeft = runningTotalLeft + myApp.jobSalariesList[job][leftCountry]['percentile_50'];
		runningTotalRight = runningTotalRight + myApp.jobSalariesList[job][rightCountry]['percentile_50'];
		counter++;
	}
	var averageLeft = runningTotalLeft / counter;
	var averageRight = runningTotalRight / counter;
	myApp.jobSalariesList['Overall Average'] = {};
	myApp.jobSalariesList['Overall Average'][leftCountry] = averageLeft;
	myApp.jobSalariesList['Overall Average'][rightCountry] = averageRight;
	myApp.jobSalariesList['Overall Average'].title = 'Overall Average';
};

myApp.populateJobList = function () {
	for (var job in myApp.jobSalariesList) {
		$('.jobInfo__select').append('<option val="' + myApp.jobSalariesList[job].title.replace(/\s/gi, '_') + '">' + myApp.jobSalariesList[job].title + '</option>');
	}
	$('.jobLoading').remove();
};

myApp.chartJobs = function (job) {
	$('.jobChart__container').html('<canvas id="jobChart" class="jobChart"></canvas>');
	var whereToPutChart = $('#jobChart');
	var leftCountry = myApp.userInfo.country;
	var rightCountry = myApp.otherPersonInfo.country;
	var jobTitle = void 0;
	var dataArray = void 0;
	if (job === undefined) {
		jobTitle = 'Overall Average';
	} else {
		jobTitle = job.title;
	}
	if (jobTitle === 'Overall Average') {
		dataArray = [Math.floor(myApp.jobSalariesList[jobTitle][leftCountry]), Math.floor(myApp.jobSalariesList[jobTitle][rightCountry])];
	} else {
		dataArray = [Math.floor(myApp.jobSalariesList[jobTitle][leftCountry]['percentile_50']), Math.floor(myApp.jobSalariesList[jobTitle][rightCountry]['percentile_50'])];
	}
	var jobChart = new Chart(whereToPutChart, {
		type: 'bar',
		data: {
			labels: [leftCountry, rightCountry],
			datasets: [{
				label: 'Average Salary',
				data: dataArray,
				backgroundColor: ['#FFBB00', '#A4A4A3'],
				borderColor: ['#FFBB00', '#A4A4A3'],
				borderWidth: 2
			}]
		},
		options: {
			layout: {
				padding: {
					left: 10,
					top: 20,
					bottom: 20
				}
			},
			scales: {
				yAxes: [{
					gridLines: {
						color: "#525253"
					},
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: "#fff" }
				}]
			},
			title: {
				display: true,
				text: jobTitle + " Salary",
				fontSize: 24,
				fontFamily: "'Oswald', sans-serif",
				fontColor: 'white'
			},
			legend: {
				display: false
			},
			maintainAspectRatio: false,
			responsive: true
		}
	});
};

myApp.getYourAgePop = function (country, age) {
	return $.ajax({
		url: 'http://api.population.io:80/1.0/population/' + myApp.dateObject.getFullYear() + '/' + country + '/' + age + '/',
		type: 'GET',
		dataType: 'JSON'
	}).done(function () {
		console.log("success");
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.chartAgeGenderPop = function (leftGenderPop, rightGenderPop) {
	$('.ageGenderPopChart__container').html('<canvas id="ageGenderPopChart" class="ageGenderPopChart"></canvas>');
	var whereToPutChart = $('#ageGenderPopChart');
	var leftCountry = myApp.userInfo.country;
	var rightCountry = myApp.otherPersonInfo.country;
	var capitalizedGender = myApp.userInfo.gender.charAt(0).toUpperCase() + myApp.userInfo.gender.slice(1);

	var ageGenderPopChart = new Chart(whereToPutChart, {
		type: 'bar',
		data: {
			labels: [leftCountry, rightCountry],
			datasets: [{
				label: 'Population of ' + myApp.userInfo.ageYears + 'year old ' + myApp.userInfo.gender + 's',
				data: [leftGenderPop, rightGenderPop],
				backgroundColor: ['#FFBB00', '#A4A4A3'],
				borderColor: ['#FFBB00', '#A4A4A3'],
				borderWidth: 2
			}]
		},
		options: {
			layout: {
				padding: {
					left: 10,
					top: 20,
					bottom: 20
				}
			},
			scales: {
				yAxes: [{
					gridLines: {
						color: "#525253"
					},
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: "#fff" }
				}]
			},
			title: {
				display: true,
				text: 'Population of ' + myApp.userInfo.ageYears + ' Year Old ' + capitalizedGender + 's',
				fontSize: 24,
				fontFamily: "'Oswald', sans-serif",
				fontColor: 'white'
			},
			legend: {
				display: false
			},
			maintainAspectRatio: false,
			responsive: true
		}
	});
};

myApp.chartGenBreakdown = function (allLeftGenData, leftOrRight) {
	var whereToPutChart = void 0;
	var maleColor = '#A4A4A3';
	var femaleColor = '#A4A4A3';
	if (myApp.userInfo.gender == 'male') {
		maleColor = '#FFBB00';
	}
	if (myApp.userInfo.gender == 'female') {
		femaleColor = '#FFBB00';
	}
	if (leftOrRight == 'left') {
		whereToPutChart = $('#maleVsFemalerPopChartLeft');
	} else {
		whereToPutChart = $('#maleVsFemalerPopChartRight');
	}
	var leftCountry = myApp.userInfo.country;
	var rightCountry = myApp.otherPersonInfo.country;
	var maleVsFemalerPopChart = new Chart(whereToPutChart, {
		type: 'pie',
		data: {
			labels: [myApp.userInfo.ageYears + 'Year Old Males', myApp.userInfo.ageYears + 'Year Old Females'],
			datasets: [{
				label: 'Population of ' + myApp.userInfo.ageYears + 'year old ' + myApp.userInfo.gender + 's',
				data: [allLeftGenData['males'], allLeftGenData['females']],
				backgroundColor: [maleColor, femaleColor],
				borderColor: [maleColor, femaleColor],
				borderWidth: 2
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Male and Female Population Breakdown',
				fontSize: 24,
				fontFamily: "'Oswald', sans-serif",
				fontColor: 'white'
			},
			legend: {
				display: false
			},
			maintainAspectRatio: false,
			responsive: true
		}
	});
};

myApp.getGlobalAgePop = function () {
	return $.ajax({
		url: 'http://api.population.io:80/1.0/population/' + myApp.dateObject.getFullYear() + '/aged/' + myApp.userInfo.ageYears + '/',
		type: 'GET',
		dataType: 'JSON'
	}).done(function () {
		console.log("success");
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.createGlobalAgePopDataArrays = function () {
	myApp.globalAgePopArrays = {};
	myApp.globalAgePopArrays.males = {};
	myApp.globalAgePopArrays.males.labels = [];
	myApp.globalAgePopArrays.males.numbers = [];
	myApp.globalAgePopArrays.females = {};
	myApp.globalAgePopArrays.females.labels = [];
	myApp.globalAgePopArrays.females.numbers = [];
	for (var country in myApp.finalCountryList) {
		var countryLabel = myApp.finalCountryList[country].name;
		var countryMalePop = myApp.finalCountryList[country].populationOfAge.males;
		var countryFemalePop = myApp.finalCountryList[country].populationOfAge.females;
		var maleDataArray = myApp.globalAgePopArrays.males.numbers;
		var femaleDataArray = myApp.globalAgePopArrays.females.numbers;
		var maleLabelArray = myApp.globalAgePopArrays.males.labels;
		var femaleLabelArray = myApp.globalAgePopArrays.females.labels;
		if (!(countryLabel === myApp.userInfo.country || countryLabel === myApp.otherPersonInfo.country)) {
			femaleLabelArray.push(countryLabel);
			maleLabelArray.push(countryLabel);
			maleDataArray.push(countryMalePop);
			femaleDataArray.push(countryFemalePop);
		};
	}
	myApp.globalAgePopArrays.males.labels.unshift(myApp.otherPersonInfo.country);
	myApp.globalAgePopArrays.females.labels.unshift(myApp.otherPersonInfo.country);
	myApp.globalAgePopArrays.males.numbers.unshift(myApp.finalCountryList[myApp.otherPersonInfo.country].populationOfAge.males);
	myApp.globalAgePopArrays.females.numbers.unshift(myApp.finalCountryList[myApp.otherPersonInfo.country].populationOfAge.females);

	myApp.globalAgePopArrays.males.labels.unshift(myApp.userInfo.country);
	myApp.globalAgePopArrays.females.labels.unshift(myApp.userInfo.country);
	myApp.globalAgePopArrays.males.numbers.unshift(myApp.finalCountryList[myApp.userInfo.country].populationOfAge.males);
	myApp.globalAgePopArrays.females.numbers.unshift(myApp.finalCountryList[myApp.userInfo.country].populationOfAge.females);
};

myApp.makeColourArray = function (dataArray, colour) {
	var returnArray = [];
	dataArray.forEach(function (item) {
		return returnArray.push(colour);
	}); //make a grey entry for each country that will be on the graph
	returnArray.pop(); //drop off 2 greys for the 2 coloured countries.
	returnArray.pop();
	return returnArray;
};

myApp.chartGenGlobalAgePopData = function () {
	var whereToPutChart = $('#globalAgeGenPopChart');
	var genderLabels = void 0;
	var genderData = void 0;
	if (myApp.userInfo.gender == 'male') {
		genderLabels = myApp.globalAgePopArrays.males.labels;
	} else {
		genderLabels = myApp.globalAgePopArrays.females.labels;
	}
	if (myApp.userInfo.gender == 'male') {
		genderData = myApp.globalAgePopArrays.males.numbers;
	} else {
		genderData = myApp.globalAgePopArrays.females.numbers;
	}
	var colourArray = myApp.makeColourArray(genderData, 'rgb(109,109,109)');
	var borderColourArray = myApp.makeColourArray(genderData, 'black');
	var globalGenAgeChart = new Chart(whereToPutChart, {
		type: 'pie',
		data: {
			labels: genderLabels,
			datasets: [{
				label: 'Population of ' + myApp.userInfo.ageYears + ' Year Old ' + myApp.userInfo.gender + 's.',
				data: genderData,
				backgroundColor: ['#FFBB00', '#A4A4A3'].concat(_toConsumableArray(colourArray)),
				borderColor: ['#FFBB00', '#A4A4A3'].concat(_toConsumableArray(colourArray)),
				borderWidth: 1
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Global population of ' + myApp.userInfo.ageYears + ' Year Old ' + myApp.userInfo.gender + 's.',
				fontSize: 24,
				fontFamily: "'Oswald', sans-serif",
				fontColor: 'white'
			},
			legend: {
				display: false
			},
			maintainAspectRatio: false,
			responsive: true
		}
	});
};

myApp.getTotalPopulation = function () {
	return $.ajax({
		url: 'http://api.population.io:80/1.0/population/World/' + myApp.todayDate + '/',
		type: 'GET',
		dataType: 'JSON'
	}).done(function () {
		console.log("success");
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.getGlobalAgeCount = function () {
	return $.ajax({
		url: 'http://api.population.io:80/1.0/population/' + myApp.dateObject.getFullYear() + '/World/' + myApp.userInfo.ageYears + '/',
		type: 'GET',
		dataType: 'JSON'
	}).done(function () {
		console.log("success");
	}).fail(function () {
		console.log("error");
		$('.errorMessageOverlay').fadeIn('fast');
	}).always(function () {
		console.log("complete");
	});
};

myApp.chartGlobalAgeCompare = function (numberOfageYearOlds, numberOfHumansMinusAge) {
	var whereToPutChart = $('#globalPopVsAgeChart');
	var globalAgeCompareeChart = new Chart(whereToPutChart, {
		type: 'pie',
		data: {
			labels: ['Number of ' + myApp.userInfo.ageYears + ' Year Olds', 'Remaining Global Population'],
			datasets: [{
				label: 'Population',
				data: [numberOfageYearOlds, numberOfHumansMinusAge],
				backgroundColor: ['#FFBB00', '#A4A4A3'],
				borderColor: ['#FFBB00', '#A4A4A3'],
				borderWidth: 1
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Number of ' + myApp.userInfo.ageYears + ' Year Olds out of Global Population ',
				fontSize: 24,
				fontFamily: "'Oswald', sans-serif",
				fontColor: 'white'
			},
			legend: {
				display: false
			},
			maintainAspectRatio: false,
			responsive: true
		}
	});
};

myApp.loadPhaseTwo = function () {
	$('.otherPerson__Form').fadeOut('slow');
	var countryLeftCheck = myApp.getSalaryInfo(myApp.finalCountryList[myApp.userInfo.country].href + 'salaries');
	var countryRightCheck = myApp.getSalaryInfo(myApp.finalCountryList[myApp.otherPersonInfo.country].href + 'salaries');
	$.when(countryLeftCheck, countryRightCheck).done(function (leftData, rightData) {
		myApp.createMasterSalariesList(leftData, rightData);
		myApp.chartJobs(); //starts chart with overall
		$('section.content').fadeIn('slow');
	});
	var leftCountryYourAgePopCheck = myApp.getYourAgePop(myApp.userInfo.country, myApp.userInfo.ageYears);
	var rightCountryYourAgePopCheck = myApp.getYourAgePop(myApp.otherPersonInfo.country, myApp.userInfo.ageYears);
	$.when(leftCountryYourAgePopCheck, rightCountryYourAgePopCheck).done(function (leftData, rightData) {
		var leftGenderPop = void 0;
		var rightGenderPop = void 0;
		if (myApp.userInfo.gender == 'male') {
			leftGenderPop = leftData[0][0]['males'];
			rightGenderPop = rightData[0][0]['males'];
		} else {
			leftGenderPop = leftData[0][0]['females'];
			rightGenderPop = rightData[0][0]['females'];
		}
		myApp.chartAgeGenderPop(leftGenderPop, rightGenderPop);
		var allLeftGenData = leftData[0][0];
		var allRightGenData = rightData[0][0];
		myApp.chartGenBreakdown(allLeftGenData, 'left');
		myApp.chartGenBreakdown(allRightGenData, 'right');
		$('footer').fadeIn('slow');
	});
	var globalCompareCheck = myApp.getGlobalAgePop();
	$.when(globalCompareCheck).done(function (data) {
		data.forEach(function (country) {
			if (myApp.finalCountryList[country['country']] === undefined) {} else {
				myApp.finalCountryList[country['country']].populationOfAge = {};
				myApp.finalCountryList[country['country']].populationOfAge.males = country.males;
				myApp.finalCountryList[country['country']].populationOfAge.females = country.females;
			} //adds pop data for age group to finalCountryList
		});
		myApp.createGlobalAgePopDataArrays();
		myApp.chartGenGlobalAgePopData();
	});
	var totalPopulationCheck = myApp.getTotalPopulation();
	var globalAgeCountCheck = myApp.getGlobalAgeCount();
	$.when(totalPopulationCheck, globalAgeCountCheck).done(function (totalPopData, agePopData) {
		var numberOfageYearOlds = agePopData[0][0].total;
		var numberOfHumans = totalPopData[0].total_population.population;
		var numberOfHumansMinusAge = numberOfHumans - numberOfageYearOlds;
		myApp.chartGlobalAgeCompare(numberOfageYearOlds, numberOfHumansMinusAge);
	});
};

myApp.init = function () {
	myApp.getCountries();
	myApp.todayDate = myApp.getDate();
	$.when(myApp.teleportCountriesCheck, myApp.getCountriesCheck).done(function () {
		$('.goodToGo').css('opacity', '1');
		myApp.createMasterCountryList();
	});
	myApp.events();
};

$(function () {
	myApp.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcanMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsRUFBWixDLENBQWdCO0FBQ2hCLE1BQU0sU0FBTixHQUFrQixFQUFsQixDLENBQXNCOztBQUV0QixNQUFNLE1BQU4sR0FBZSxZQUFXO0FBQ3pCLEdBQUUsc0JBQUYsRUFBMEIsRUFBMUIsQ0FBNkIsUUFBN0IsRUFBdUMsVUFBUyxLQUFULEVBQWdCO0FBQ3RELFFBQU0sY0FBTjtBQUNBLFFBQU0sY0FBTixDQUFxQixNQUFyQjtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsT0FBcEIsQ0FBNEIsTUFBNUIsRUFBb0M7QUFBQSxVQUFNLEVBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsTUFBakIsQ0FBTjtBQUFBLEdBQXBDO0FBQ0EsSUFBRSxJQUFGLENBQU8sTUFBTSxRQUFOLENBQWUsZ0JBQXRCLEVBQ0UsSUFERixDQUNPLFlBQVc7QUFDaEIsU0FBTSxjQUFOLENBQXFCLE1BQU0sUUFBTixDQUFlLFdBQXBDLEVBQWlELE1BQWpEO0FBQ0EsR0FIRjtBQUlBLEVBUkQ7QUFTQSxHQUFFLG9CQUFGLEVBQXdCLEVBQXhCLENBQTJCLFFBQTNCLEVBQXFDLFVBQVMsS0FBVCxFQUFnQjtBQUNwRCxRQUFNLGNBQU47QUFDQSxRQUFNLGVBQU4sQ0FBc0IsT0FBdEIsR0FBZ0MsRUFBRSw2QkFBRixFQUFpQyxHQUFqQyxFQUFoQztBQUNBLElBQUUsbUJBQUYsRUFBdUIsSUFBdkIsc0JBQStDLE1BQU0sZUFBTixDQUFzQixPQUFyRTtBQUNBLFFBQU0sY0FBTixDQUFxQixhQUFyQjtBQUNBLElBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsTUFBTSxlQUFOLENBQXNCLE9BQXhEO0FBQ0EsSUFBRSxJQUFGLENBQU8sTUFBTSxRQUFOLENBQWUsZ0JBQXRCLEVBQXdDLElBQXhDLENBQTZDLFlBQU07QUFDbEQs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LENBQTRCLG1CQUE1QixFQUFpRCxzQkFBakQ7QUFDQSxFQUxEO0FBT0EsQ0FqREQ7O0FBbURBLE1BQU0sSUFBTixHQUFhLFlBQVc7QUFDdkIsT0FBTSxZQUFOO0FBQ0EsT0FBTSxTQUFOLEdBQWtCLE1BQU0sT0FBTixFQUFsQjtBQUNBLEdBQUUsSUFBRixDQUFPLE1BQU0sc0JBQWIsRUFBcUMsTUFBTSxpQkFBM0MsRUFDRSxJQURGLENBQ08sWUFBVztBQUNoQixJQUFFLFdBQUYsRUFBZSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLEdBQTlCO0FBQ0EsUUFBTSx1QkFBTjtBQUNBLEVBSkY7QUFLQSxPQUFNLE1BQU47QUFDQSxDQVREOztBQVdBLEVBQUUsWUFBVztBQUNaLE9BQU0sSUFBTjtBQUNBLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG15QXBwID0ge307IC8vaW5pdGlhbGl6ZSBteSBhcHAgb2JqZWN0XHJcbm15QXBwLmNvdW50cmllcyA9IHt9OyAvL2luaXRpYWxpemUgZm9yIGFycmF5IGFuZCBvYmplY3QgY3JlYXRlZCB2aWEgZnVuY3Rpb247XHJcblxyXG5teUFwcC5ldmVudHMgPSBmdW5jdGlvbigpIHtcclxuXHQkKCcudXNlckluZm9JbnB1dF9fRm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdG15QXBwLmdldERhdGVPZkRlYXRoKCd1c2VyJyk7XHJcblx0XHQkKCcudXNlckluZm9JbnB1dCcpLmZhZGVPdXQoJ3Nsb3cnLCAoKSA9PiAkKCdtYWluJykuZmFkZUluKCdzbG93JykpO1xyXG5cdFx0JC53aGVuKG15QXBwLnVzZXJJbmZvLmRhdGVPZkRlYXRoQ2hlY2spXHJcblx0XHRcdC5kb25lKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdG15QXBwLnN0YXJ0Q291bnRkb3duKG15QXBwLnVzZXJJbmZvLmRhdGVPZkRlYXRoLCAndXNlcicpO1xyXG5cdFx0XHR9KVxyXG5cdH0pO1xyXG5cdCQoJy5vdGhlclBlcnNvbl9fRm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5ID0gJCgnLm90aGVyUGVyc29uX19Gb3JtIC5jb3VudHJ5JykudmFsKCk7XHJcblx0XHQkKCcub3RoZXJQZXJzb25UaXRsZScpLnRleHQoYElmIHlvdSBsaXZlZCBpbiAke215QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5fWApXHJcblx0XHRteUFwcC5nZXREYXRlT2ZEZWF0aCgnb3RoZXJQZXJzb24nKTtcclxuXHRcdCQoJy5vdGhlclBlcnNvbkNvdW50cnlUZXh0JykudGV4dChteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeSk7XHJcblx0XHQkLndoZW4obXlBcHAudXNlckluZm8uZGF0ZU9mRGVhdGhDaGVjaykuZG9uZSgoKSA9PiB7XHJcblx0XHRcdG15QXBwLmFnZURpZmYgPSBteUFwcC5nZXRBZ2VEaWZmKCk7XHJcblx0XHRcdG15QXBwLnVwZGF0ZUFnZVBhcmFncmFwaCgpO1xyXG5cdFx0XHRteUFwcC5sb2FkUGhhc2VUd28oKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdCQoJy5qb2JJbmZvX19mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IHNlbGVjdGVkSm9iID0gJCgnLmpvYkluZm9fX3NlbGVjdCcpLnZhbCgpLnJlcGxhY2UoL18vZ2ksICcgJyk7XHJcblx0XHRteUFwcC5jaGFydEpvYnMobXlBcHAuam9iU2FsYXJpZXNMaXN0W3NlbGVjdGVkSm9iXSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5teUFwcC51cGRhdGVBZ2VQYXJhZ3JhcGggPSBmdW5jdGlvbigpIHtcclxuXHQkKCcuZ2Fpbkxvc3MnKS50ZXh0KG15QXBwLmFnZURpZmYuZ2Fpbkxvc3MpO1xyXG5cdCQoJy55ZWFyc1RleHQnKS50ZXh0KG15QXBwLmFnZURpZmYueWVhcnMpO1xyXG5cdCQoJy5kYXlzVGV4dCcpLnRleHQobXlBcHAuYWdlRGlmZi5kYXlzKTtcclxuXHQkKCcuaG91cnNUZXh0JykudGV4dChteUFwcC5hZ2VEaWZmLmhvdXJzKTtcclxuXHQkKCcubWludXRlc1RleHQnKS50ZXh0KG15QXBwLmFnZURpZmYubWludXRlcyk7XHJcblx0aWYgKG15QXBwLmFnZURpZmYueWVhcnMgPiAxIHx8IG15QXBwLmFnZURpZmYueWVhcnMgPT09IDApIHtcclxuXHRcdCQoJy5wbHVyYWxTeWVhcicpLnRleHQoJ3MnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLnBsdXJhbFN5ZWFyJykudGV4dCgnJyk7XHJcblx0fVxyXG5cdGlmIChteUFwcC5hZ2VEaWZmLmRheXMgPiAxIHx8IG15QXBwLmFnZURpZmYueWVhcnMgPT09IDApIHtcclxuXHRcdCQoJy5wbHVyYWxTZGF5JykudGV4dCgncycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcucGx1cmFsU2RheScpLnRleHQoJycpO1xyXG5cdH1cclxuXHRpZiAobXlBcHAuYWdlRGlmZi5ob3VycyA+IDEgfHwgbXlBcHAuYWdlRGlmZi55ZWFycyA9PT0gMCkge1xyXG5cdFx0JCgnLnBsdXJhbFNob3VyJykudGV4dCgncycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcucGx1cmFsU2hvdXInKS50ZXh0KCcnKTtcclxuXHR9XHJcblx0aWYgKG15QXBwLmFnZURpZmYubWludXRlcyA+IDEgfHwgbXlBcHAuYWdlRGlmZi55ZWFycyA9PT0gMCkge1xyXG5cdFx0JCgnLnBsdXJhbFNtaW51dGUnKS50ZXh0KCdzJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5wbHVyYWxTbWludXRlJykudGV4dCgnJyk7XHJcblx0fVxyXG5cdCQoJy5vZkZvcicpLnRleHQobXlBcHAuYWdlRGlmZi5vZkZvcik7XHJcbn1cclxuXHJcbm15QXBwLmdldEFnZURpZmYgPSBmdW5jdGlvbigpIHtcclxuXHRsZXQgdXNlckRlYXRoID0gbXlBcHAudXNlckluZm8uZGF0ZU9mRGVhdGg7XHJcblx0bGV0IG90aGVyRGVhdGggPSBteUFwcC5vdGhlclBlcnNvbkluZm8uZGF0ZU9mRGVhdGg7XHJcblx0bGV0IGdhaW5Mb3NzO1xyXG5cdGxldCBkaWZmZXJlbmNlO1xyXG5cdGxldCBvZkZvcjtcclxuXHRpZiAodXNlckRlYXRoID4gb3RoZXJEZWF0aCkge1xyXG5cdFx0Z2Fpbkxvc3MgPSAnbG9zZSc7XHJcblx0XHRkaWZmZXJlbmNlID0gdXNlckRlYXRoIC0gb3RoZXJEZWF0aDtcclxuXHRcdG9mRm9yID0gJ29mJztcclxuXHR9IGVsc2UgaWYgKHVzZXJEZWF0aCA8IG90aGVyRGVhdGgpIHtcclxuXHRcdGdhaW5Mb3NzID0gJ2FkZCc7XHJcblx0XHRkaWZmZXJlbmNlID0gb3RoZXJEZWF0aCAtIHVzZXJEZWF0aDtcclxuXHRcdG9mRm9yID0gJ3RvJztcclxuXHR9XHJcblx0dmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaWZmZXJlbmNlIC8gMTAwMCkgJSA2MCk7XHJcblx0dmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaWZmZXJlbmNlIC8gMTAwMCAvIDYwKSAlIDYwKTtcclxuXHR2YXIgaG91cnMgPSBNYXRoLmZsb29yKChkaWZmZXJlbmNlIC8gKDEwMDAgKiA2MCAqIDYwKSkgJSAyNCk7XHJcblx0dmFyIGRheXMgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpICUgMzY1O1xyXG5cdHZhciB5ZWFycyA9IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0ICogMzY1KSk7XHJcblx0cmV0dXJuIHtcclxuXHRcdHNlY29uZHM6IHNlY29uZHMsXHJcblx0XHRtaW51dGVzOiBtaW51dGVzLFxyXG5cdFx0aG91cnM6IGhvdXJzLFxyXG5cdFx0ZGF5czogZGF5cyxcclxuXHRcdHllYXJzOiB5ZWFycyxcclxuXHRcdGdhaW5Mb3NzOiBnYWluTG9zcyxcclxuXHRcdG9mRm9yOiBvZkZvclxyXG5cdH1cclxufVxyXG5cclxubXlBcHAuc3RhcnRDb3VudGRvd24gPSBmdW5jdGlvbihkYXRlT2ZEZWF0aCwgd2hvKSB7XHJcblx0aWYgKHdobyA9PT0gXCJ1c2VyXCIpIHtcclxuXHRcdG15QXBwLmNvdW50RG93bnMgPSB7fTtcclxuXHRcdG15QXBwLmNvdW50RG93bnMudXNlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRteUFwcC51c2VySW5mby5jb3VudGRvd24gPSBteUFwcC5nZXRUaW1lUmVtYWluaW5nKGRhdGVPZkRlYXRoKTtcclxuXHRcdFx0JCgncC51c2VyU2Vjb25kcycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+U2Vjb25kczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAudXNlckluZm8uY291bnRkb3duLnNlY29uZHMgKyAnPC9zcGFuPicpO1xyXG5cdFx0XHQkKCdwLnVzZXJNaW51dGVzJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJ0aW1lVGl0bGVcIj5NaW51dGVzOiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW1lQ291bnRlclwiPicgKyBteUFwcC51c2VySW5mby5jb3VudGRvd24ubWludXRlcyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdCQoJ3AudXNlckhvdXJzJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJ0aW1lVGl0bGVcIj5Ib3VyczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAudXNlckluZm8uY291bnRkb3duLmhvdXJzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0JCgncC51c2VyRGF5cycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+RGF5czogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAudXNlckluZm8uY291bnRkb3duLmRheXMgKyAnPC9zcGFuPicpO1xyXG5cdFx0XHQkKCdwLnVzZXJZZWFycycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+WWVhcnM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLnVzZXJJbmZvLmNvdW50ZG93bi55ZWFycyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdGlmIChteUFwcC5vdGhlclBlcnNvbkluZm8udGltZXJFbmdhZ2VkID09PSB0cnVlKSB7XHJcblx0XHRcdFx0bXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50ZG93biA9IG15QXBwLmdldFRpbWVSZW1haW5pbmcobXlBcHAub3RoZXJQZXJzb25JbmZvLmRhdGVPZkRlYXRoKTtcclxuXHRcdFx0XHQkKCdwLm90aGVyUGVyc29uU2Vjb25kcycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+U2Vjb25kczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50ZG93bi5zZWNvbmRzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0XHQkKCdwLm90aGVyUGVyc29uTWludXRlcycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+TWludXRlczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50ZG93bi5taW51dGVzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0XHQkKCdwLm90aGVyUGVyc29uSG91cnMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPkhvdXJzOiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW1lQ291bnRlclwiPicgKyBteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRkb3duLmhvdXJzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0XHQkKCdwLm90aGVyUGVyc29uRGF5cycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+RGF5czogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50ZG93bi5kYXlzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0XHQkKCdwLm90aGVyUGVyc29uWWVhcnMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPlllYXJzOiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW1lQ291bnRlclwiPicgKyBteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRkb3duLnllYXJzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMTAwMCk7XHJcblxyXG5cdH1cclxufTtcclxuXHJcbm15QXBwLmdldERhdGUgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5cdHZhciBkZCA9IHRvZGF5LmdldERhdGUoKTtcclxuXHR2YXIgbW0gPSB0b2RheS5nZXRNb250aCgpICsgMTsgLy9KYW51YXJ5IGlzIDAhXHJcblx0dmFyIHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuXHRpZiAoZGQgPCAxMCkge1xyXG5cdFx0ZGQgPSAnMCcgKyBkZFxyXG5cdH1cclxuXHJcblx0aWYgKG1tIDwgMTApIHtcclxuXHRcdG1tID0gJzAnICsgbW1cclxuXHR9XHJcblx0bXlBcHAuZGF0ZU9iamVjdCA9IHRvZGF5O1xyXG5cdHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbn07XHJcblxyXG5teUFwcC5nZXRDb3VudHJpZXMgPSBmdW5jdGlvbigpIHtcclxuXHRteUFwcC5nZXRDb3VudHJpZXNDaGVjayA9ICQuYWpheCh7XHJcblx0XHRcdHVybDogJ2h0dHA6Ly9hcGkucG9wdWxhdGlvbi5pbzo4MC8xLjAvY291bnRyaWVzJyxcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblxyXG5cdFx0fSlcclxuXHRcdC5kb25lKGZ1bmN0aW9uKGNvdW50cmllc0FycmF5KSB7XHJcblx0XHRcdG15QXBwLnBhcnNlQ291bnRyaWVzKGNvdW50cmllc0FycmF5Wydjb3VudHJpZXMnXSk7XHJcblx0XHRcdCQoJy53b3JsZEFQSXN0YXR1c0ljb24nKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lcicpO1xyXG5cdFx0XHQkKCcud29ybGRBUElzdGF0dXNJY29uJykucmVtb3ZlQ2xhc3MoJ2ZhLXB1bHNlJyk7XHJcblx0XHRcdCQoJy53b3JsZEFQSXN0YXR1c0ljb24nKS5yZW1vdmVDbGFzcygnZmEtM3gnKTtcclxuXHRcdFx0JCgnLndvcmxkQVBJc3RhdHVzSWNvbicpLnJlbW92ZUNsYXNzKCdmYS1mdycpO1xyXG5cdFx0XHQkKCcud29ybGRBUElzdGF0dXNJY29uJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrLWNpcmNsZScpXHJcblxyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcuZXJyb3JNZXNzYWdlT3ZlcmxheScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHJcblx0bXlBcHAudGVsZXBvcnRDb3VudHJpZXNDaGVjayA9ICQuYWpheCh7XHJcblx0XHRcdHVybDogJ2h0dHBzOi8vYXBpLnRlbGVwb3J0Lm9yZy9hcGkvY291bnRyaWVzLycsXHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ0pTT04nLFxyXG5cclxuXHRcdH0pXHJcblx0XHQuZG9uZShmdW5jdGlvbih0ZWxlcG9ydENvdW50cmllcykge1xyXG5cdFx0XHRteUFwcC5wYXJzZVRlbGVwb3J0Q291bnRyaWVzKHRlbGVwb3J0Q291bnRyaWVzLl9saW5rc1tcImNvdW50cnk6aXRlbXNcIl0pO1xyXG5cdFx0XHQkKCcudGVsZXBvcnRBUElzdGF0dXNJY29uJykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXInKTtcclxuXHRcdFx0JCgnLnRlbGVwb3J0QVBJc3RhdHVzSWNvbicpLnJlbW92ZUNsYXNzKCdmYS1wdWxzZScpO1xyXG5cdFx0XHQkKCcudGVsZXBvcnRBUElzdGF0dXNJY29uJykucmVtb3ZlQ2xhc3MoJ2ZhLTN4Jyk7XHJcblx0XHRcdCQoJy50ZWxlcG9ydEFQSXN0YXR1c0ljb24nKS5yZW1vdmVDbGFzcygnZmEtZncnKTtcclxuXHRcdFx0JCgnLnRlbGVwb3J0QVBJc3RhdHVzSWNvbicpLmFkZENsYXNzKCdmYS1jaGVjay1jaXJjbGUnKVxyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG5cdFx0XHQkKCcuZXJyb3JNZXNzYWdlT3ZlcmxheScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0fSlcclxuXHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbm15QXBwLnBhcnNlQ291bnRyaWVzID0gZnVuY3Rpb24oYXJyYXlPZkNvdW50cmllcykge1xyXG5cdHZhciBjb3VudHJpZXMgPSB7fTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZDb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGNvdW50cmllc1thcnJheU9mQ291bnRyaWVzW2ldXSA9IGFycmF5T2ZDb3VudHJpZXNbaV07XHJcblx0fVxyXG5cdCQoJy5sb2FkaW5nJykucmVtb3ZlKCk7XHJcblx0bXlBcHAuY291bnRyaWVzLm9iamVjdEZvcm1hdCA9IGNvdW50cmllcztcclxuXHRteUFwcC5jb3VudHJpZXMuYXJyYXlGb3JtYXQgPSBhcnJheU9mQ291bnRyaWVzO1xyXG5cdC8vIG15QXBwLmNvdW50cmllcy5jaGVja09uZSA9IHRydWU7XHJcblx0cmV0dXJuICdjb3VudHJpZXMgdXBkYXRlZCc7XHJcbn07XHJcblxyXG5teUFwcC5wYXJzZVRlbGVwb3J0Q291bnRyaWVzID0gZnVuY3Rpb24odGVsZXBvcnRDb3VudHJpZXMpIHtcclxuXHR2YXIgdGVsZXBvcnRDb3VudHJpZXNPYmplY3QgPSB7fTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRlbGVwb3J0Q291bnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR0ZWxlcG9ydENvdW50cmllc09iamVjdFt0ZWxlcG9ydENvdW50cmllc1tpXS5uYW1lXSA9IHRlbGVwb3J0Q291bnRyaWVzW2ldXHJcblx0fVxyXG5cdG15QXBwLmNvdW50cmllcy50ZWxlcG9ydENvdW50cmllc09iamVjdCA9IHRlbGVwb3J0Q291bnRyaWVzT2JqZWN0O1xyXG5cdG15QXBwLmNvdW50cmllcy50ZWxlcG9ydENvdW50cmllc0FycmF5ID0gdGVsZXBvcnRDb3VudHJpZXM7XHJcblx0Ly8gbXlBcHAuY291bnRyaWVzLnRlbGVwb3J0Q2hlY2sgPSB0cnVlO1xyXG59O1xyXG5cclxubXlBcHAuY3JlYXRlTWFzdGVyQ291bnRyeUxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgY29tYmluZWRBcnJheSA9IG15QXBwLmNvdW50cmllcy5hcnJheUZvcm1hdC5tYXAoZnVuY3Rpb24oY291bnRyeSkge1xyXG5cdFx0aWYgKG15QXBwLmNvdW50cmllcy50ZWxlcG9ydENvdW50cmllc09iamVjdFtjb3VudHJ5XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBteUFwcC5jb3VudHJpZXMudGVsZXBvcnRDb3VudHJpZXNPYmplY3RbY291bnRyeV1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHR9KVxyXG5cdHZhciBmaW5hbGl6ZWRDb3VudHJpZXMgPSBjb21iaW5lZEFycmF5LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRyZXR1cm4gISh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpO1xyXG5cdH0pXHJcblx0Y29uc3QgZmluYWxDb3VudHJ5T2JqZWN0ID0ge307XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaW5hbGl6ZWRDb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGZpbmFsQ291bnRyeU9iamVjdFtmaW5hbGl6ZWRDb3VudHJpZXNbaV0ubmFtZV0gPSBmaW5hbGl6ZWRDb3VudHJpZXNbaV07XHJcblx0fVxyXG5cdG15QXBwLmZpbmFsQ291bnRyeUxpc3QgPSBmaW5hbENvdW50cnlPYmplY3Q7XHJcblx0Zm9yIChsZXQgY291bnRyeSBpbiBteUFwcC5maW5hbENvdW50cnlMaXN0KSB7XHJcblx0XHQkKCcuY291bnRyeScpLmFwcGVuZCgnPG9wdGlvbiB2YWw9XCInICsgbXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5XS5uYW1lLnJlcGxhY2UoL1xccy9naSwgJ18nKSArICdcIj4nICsgbXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5XS5uYW1lICsgJzwvb3B0aW9uPicpO1xyXG5cdH1cclxufTtcclxuXHJcbm15QXBwLmdldFVzZXJJbmZvID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHVzZXJJbmZvID0ge307XHJcblx0dmFyIHVzZXJZZWFycyA9ICQoJy55ZWFycycpLnZhbCgpO1xyXG5cdHZhciB1c2VyTW9udGhzID0gJCgnLm1vbnRocycpLnZhbCgpO1xyXG5cdHZhciB1c2VyR2VuZGVyID0gJCgnLmdlbmRlcjpjaGVja2VkJykudmFsKCk7XHJcblxyXG5cdHVzZXJJbmZvLnVzZXJBZ2UgPSBgJHt1c2VyWWVhcnN9eSR7dXNlck1vbnRoc31tYDtcclxuXHR1c2VySW5mby5hZ2VZZWFycyA9IHVzZXJZZWFycztcclxuXHR1c2VySW5mby5jdXJyZW50RGF0ZSA9IG15QXBwLnRvZGF5RGF0ZTtcclxuXHR1c2VySW5mby5jb3VudHJ5ID0gJCgnLnVzZXJJbmZvSW5wdXRfX0Zvcm0gLmNvdW50cnknKS52YWwoKS5yZXBsYWNlKC9fL2dpLCAnICcpO1xyXG5cdHVzZXJJbmZvLmdlbmRlciA9IHVzZXJHZW5kZXI7XHJcblxyXG5cclxuXHRteUFwcC51c2VySW5mbyA9IHVzZXJJbmZvO1xyXG5cdG15QXBwLm90aGVyUGVyc29uSW5mbyA9IHt9O1xyXG5cdG15QXBwLm90aGVyUGVyc29uSW5mby50aW1lckVuZ2FnZWQgPSBmYWxzZTtcclxuXHJcblx0JCgnLmdlbmRlclRleHQnKS50ZXh0KHVzZXJJbmZvLmdlbmRlcik7XHJcblx0JCgnLmNvdW50cnlUZXh0JykudGV4dCh1c2VySW5mby5jb3VudHJ5KTtcclxuXHQkKCcuYWdlVGV4dCcpLnRleHQodXNlckluZm8uYWdlWWVhcnMpO1xyXG5cclxuXHJcblxyXG5cdHJldHVybiB1c2VySW5mbztcclxufTtcclxuXHJcbm15QXBwLmdldERhdGVPZkRlYXRoID0gZnVuY3Rpb24od2hvKSB7IC8vbmVlZCB0byBnZXQgZXZlbiB3aGVuIGZvciBvdGhlciBwZXJzb24gdG8gZmlyZSBvbmx5IHdoZW4gdGhpcyBpcyBkb25lLi4uIGN1cnJlbnRseSBmaXJpbmcgaW4gd3Jvbmcgb3JkZXIhXHJcblx0aWYgKHdobyA9PT0gJ3VzZXInKSB7XHJcblx0XHR2YXIgcGVyc29uSW5mbyA9IG15QXBwLmdldFVzZXJJbmZvKCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBwZXJzb25JbmZvID0gT2JqZWN0LmFzc2lnbih7fSwgbXlBcHAudXNlckluZm8pO1xyXG5cdFx0cGVyc29uSW5mby5jb3VudHJ5ID0gJCgnLm90aGVyUGVyc29uX19Gb3JtIC5jb3VudHJ5JykudmFsKCk7XHJcblx0fVxyXG5cdG15QXBwLnVzZXJJbmZvLmRhdGVPZkRlYXRoQ2hlY2sgPSAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGBodHRwOi8vYXBpLnBvcHVsYXRpb24uaW86ODAvMS4wL2xpZmUtZXhwZWN0YW5jeS9yZW1haW5pbmcvJHtwZXJzb25JbmZvLmdlbmRlcn0vJHtwZXJzb25JbmZvLmNvdW50cnl9LyR7cGVyc29uSW5mby5jdXJyZW50RGF0ZX0vJHtwZXJzb25JbmZvLnVzZXJBZ2V9L2AsXHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0fSlcclxuXHRcdC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0dmFyIGRhdGVPZkRlYXRoID0gKERhdGUucGFyc2UobXlBcHAudG9kYXlEYXRlKSArIChkYXRhLnJlbWFpbmluZ19saWZlX2V4cGVjdGFuY3kgKiAzLjE1NGUrMTApKTsgLy9udW1iZXIgaXMgYXBwcm94IG1pbGlzZWMgaW4geWVhclxyXG5cdFx0XHRpZiAod2hvID09PSAndXNlcicpIHtcclxuXHRcdFx0XHRteUFwcC51c2VySW5mby5kYXRlT2ZEZWF0aCA9IGRhdGVPZkRlYXRoO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG15QXBwLm90aGVyUGVyc29uSW5mby5kYXRlT2ZEZWF0aCA9IGRhdGVPZkRlYXRoO1xyXG5cdFx0XHRcdG15QXBwLm90aGVyUGVyc29uSW5mby50aW1lckVuZ2FnZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcblx0XHRcdCQoJy5lcnJvck1lc3NhZ2VPdmVybGF5JykuZmFkZUluKCdmYXN0Jyk7XHJcblx0XHR9KVxyXG5cdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxubXlBcHAuZ2V0VGltZVJlbWFpbmluZyA9IGZ1bmN0aW9uKGRhdGVPZkRlYXRoKSB7IC8vdGFrZXMgZGF0ZSBvZiBkZWF0aCBpbiBFcG9jaCB0aW1lXHJcblx0dmFyIHQgPSBkYXRlT2ZEZWF0aCAtIERhdGUucGFyc2UobmV3IERhdGUoKSk7XHJcblx0dmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKCh0IC8gMTAwMCkgJSA2MCk7XHJcblx0dmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0IC8gMTAwMCAvIDYwKSAlIDYwKTtcclxuXHR2YXIgaG91cnMgPSBNYXRoLmZsb29yKCh0IC8gKDEwMDAgKiA2MCAqIDYwKSkgJSAyNCk7XHJcblx0dmFyIGRheXMgPSBNYXRoLmZsb29yKHQgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpICUgMzY1O1xyXG5cdHZhciB5ZWFycyA9IE1hdGguZmxvb3IodCAvICgxMDAwICogNjAgKiA2MCAqIDI0ICogMzY1KSk7XHJcblx0cmV0dXJuIHtcclxuXHRcdCd0b3RhbCc6IHQsXHJcblx0XHQneWVhcnMnOiB5ZWFycyxcclxuXHRcdCdkYXlzJzogZGF5cyxcclxuXHRcdCdob3Vycyc6IGhvdXJzLFxyXG5cdFx0J21pbnV0ZXMnOiBtaW51dGVzLFxyXG5cdFx0J3NlY29uZHMnOiBzZWNvbmRzXHJcblx0fTtcclxufTtcclxuXHJcbm15QXBwLmdldFNhbGFyeUluZm8gPSBmdW5jdGlvbihjb3VudHJ5SFJFRikge1xyXG5cdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGNvdW50cnlIUkVGLFxyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHRcdFx0Ly8gZGF0YToge3BhcmFtMTogJ3ZhbHVlMSd9LFxyXG5cdFx0fSlcclxuXHRcdC5kb25lKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcblx0XHRcdCQoJy5lcnJvck1lc3NhZ2VPdmVybGF5JykuZmFkZUluKCdmYXN0Jyk7XHJcblx0XHR9KVxyXG5cdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuXHRcdH0pO1xyXG5cclxufVxyXG5cclxubXlBcHAuY3JlYXRlTWFzdGVyU2FsYXJpZXNMaXN0ID0gZnVuY3Rpb24obGVmdERhdGEsIHJpZ2h0RGF0YSkge1xyXG5cdGNvbnN0IGxlZnRDb3VudHJ5ID0gbXlBcHAudXNlckluZm8uY291bnRyeTtcclxuXHRjb25zdCByaWdodENvdW50cnkgPSBteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeTtcclxuXHRjb25zdCBsZWZ0U2FsYXJpZXMgPSBsZWZ0RGF0YVswXS5zYWxhcmllcztcclxuXHRjb25zdCByaWdodFNhbGFyaWVzID0gcmlnaHREYXRhWzBdLnNhbGFyaWVzO1xyXG5cdGNvbnN0IHNhbGFyaWVzTGlzdCA9IHt9O1xyXG5cdGZvciAobGV0IGpvYiBpbiBsZWZ0U2FsYXJpZXMpIHtcclxuXHRcdGxldCBqb2JUaXRsZSA9IGxlZnRTYWxhcmllc1tqb2JdWydqb2InXVsndGl0bGUnXTtcclxuXHRcdGxldCBqb2JTYWxhcmllcyA9IGxlZnRTYWxhcmllc1tqb2JdWydzYWxhcnlfcGVyY2VudGlsZXMnXTtcclxuXHRcdHNhbGFyaWVzTGlzdFtqb2JUaXRsZV0gPSB7fTtcclxuXHRcdHNhbGFyaWVzTGlzdFtqb2JUaXRsZV1bJ3RpdGxlJ10gPSBqb2JUaXRsZTtcclxuXHRcdHNhbGFyaWVzTGlzdFtqb2JUaXRsZV1bbGVmdENvdW50cnldID0ge307XHJcblx0XHRzYWxhcmllc0xpc3Rbam9iVGl0bGVdW3JpZ2h0Q291bnRyeV0gPSB7fTtcclxuXHRcdHNhbGFyaWVzTGlzdFtqb2JUaXRsZV1bbGVmdENvdW50cnldID0gam9iU2FsYXJpZXM7XHJcblx0XHRsZXQgam9iU2FsYXJpZXNSaWdodDtcclxuXHRcdGlmIChyaWdodFNhbGFyaWVzW2pvYl0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRqb2JTYWxhcmllc1JpZ2h0ID0gT2JqZWN0LmFzc2lnbih7fSxsZWZ0U2FsYXJpZXNbam9iXVsnc2FsYXJ5X3BlcmNlbnRpbGVzJ10pO1xyXG5cdFx0XHRqb2JTYWxhcmllc1JpZ2h0LnBlcmNlbnRpbGVfNTAgPSAwO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0am9iU2FsYXJpZXNSaWdodCA9IHJpZ2h0U2FsYXJpZXNbam9iXVsnc2FsYXJ5X3BlcmNlbnRpbGVzJ107XHJcblx0XHR9XHJcblx0XHRzYWxhcmllc0xpc3Rbam9iVGl0bGVdW3JpZ2h0Q291bnRyeV0gPSBqb2JTYWxhcmllc1JpZ2h0O1xyXG5cdH1cclxuXHRteUFwcC5qb2JTYWxhcmllc0xpc3QgPSBzYWxhcmllc0xpc3Q7XHJcblx0bXlBcHAuZ2V0QXZlcmFnZVNhbGFyeSgpO1xyXG5cdG15QXBwLnBvcHVsYXRlSm9iTGlzdCgpO1xyXG59O1xyXG5cclxubXlBcHAuZ2V0QXZlcmFnZVNhbGFyeSA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IGxlZnRDb3VudHJ5ID0gbXlBcHAudXNlckluZm8uY291bnRyeTtcclxuXHRjb25zdCByaWdodENvdW50cnkgPSBteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeTtcclxuXHRsZXQgcnVubmluZ1RvdGFsTGVmdCA9IDA7XHJcblx0bGV0IHJ1bm5pbmdUb3RhbFJpZ2h0ID0gMDtcclxuXHRsZXQgY291bnRlciA9IDA7XHJcblx0Zm9yIChsZXQgam9iIGluIG15QXBwLmpvYlNhbGFyaWVzTGlzdCkge1xyXG5cdFx0cnVubmluZ1RvdGFsTGVmdCA9IHJ1bm5pbmdUb3RhbExlZnQgKyBteUFwcC5qb2JTYWxhcmllc0xpc3Rbam9iXVtsZWZ0Q291bnRyeV1bJ3BlcmNlbnRpbGVfNTAnXTtcclxuXHRcdHJ1bm5pbmdUb3RhbFJpZ2h0ID0gcnVubmluZ1RvdGFsUmlnaHQgKyBteUFwcC5qb2JTYWxhcmllc0xpc3Rbam9iXVtyaWdodENvdW50cnldWydwZXJjZW50aWxlXzUwJ107XHJcblx0XHRjb3VudGVyKys7XHJcblx0fVxyXG5cdGxldCBhdmVyYWdlTGVmdCA9IHJ1bm5pbmdUb3RhbExlZnQgLyBjb3VudGVyO1xyXG5cdGxldCBhdmVyYWdlUmlnaHQgPSBydW5uaW5nVG90YWxSaWdodCAvIGNvdW50ZXI7XHJcblx0bXlBcHAuam9iU2FsYXJpZXNMaXN0WydPdmVyYWxsIEF2ZXJhZ2UnXSA9IHt9O1xyXG5cdG15QXBwLmpvYlNhbGFyaWVzTGlzdFsnT3ZlcmFsbCBBdmVyYWdlJ11bbGVmdENvdW50cnldID0gYXZlcmFnZUxlZnQ7XHJcblx0bXlBcHAuam9iU2FsYXJpZXNMaXN0WydPdmVyYWxsIEF2ZXJhZ2UnXVtyaWdodENvdW50cnldID0gYXZlcmFnZVJpZ2h0O1xyXG5cdG15QXBwLmpvYlNhbGFyaWVzTGlzdFsnT3ZlcmFsbCBBdmVyYWdlJ10udGl0bGUgPSAnT3ZlcmFsbCBBdmVyYWdlJztcclxufVxyXG5cclxubXlBcHAucG9wdWxhdGVKb2JMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblx0Zm9yIChsZXQgam9iIGluIG15QXBwLmpvYlNhbGFyaWVzTGlzdCkge1xyXG5cdFx0JCgnLmpvYkluZm9fX3NlbGVjdCcpLmFwcGVuZCgnPG9wdGlvbiB2YWw9XCInICsgbXlBcHAuam9iU2FsYXJpZXNMaXN0W2pvYl0udGl0bGUucmVwbGFjZSgvXFxzL2dpLCAnXycpICsgJ1wiPicgKyBteUFwcC5qb2JTYWxhcmllc0xpc3Rbam9iXS50aXRsZSArICc8L29wdGlvbj4nKVxyXG5cdH1cclxuXHQkKCcuam9iTG9hZGluZycpLnJlbW92ZSgpO1xyXG59XHJcblxyXG5teUFwcC5jaGFydEpvYnMgPSBmdW5jdGlvbihqb2IpIHtcclxuXHQkKCcuam9iQ2hhcnRfX2NvbnRhaW5lcicpLmh0bWwoJzxjYW52YXMgaWQ9XCJqb2JDaGFydFwiIGNsYXNzPVwiam9iQ2hhcnRcIj48L2NhbnZhcz4nKTtcclxuXHRsZXQgd2hlcmVUb1B1dENoYXJ0ID0gJCgnI2pvYkNoYXJ0Jyk7XHJcblx0bGV0IGxlZnRDb3VudHJ5ID0gbXlBcHAudXNlckluZm8uY291bnRyeTtcclxuXHRsZXQgcmlnaHRDb3VudHJ5ID0gbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnk7XHJcblx0bGV0IGpvYlRpdGxlO1xyXG5cdGxldCBkYXRhQXJyYXk7XHJcblx0aWYgKGpvYiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRqb2JUaXRsZSA9ICdPdmVyYWxsIEF2ZXJhZ2UnXHJcblx0fSBlbHNlIHtcclxuXHRcdGpvYlRpdGxlID0gam9iLnRpdGxlO1xyXG5cdH1cclxuXHRpZiAoam9iVGl0bGUgPT09ICdPdmVyYWxsIEF2ZXJhZ2UnKSB7XHJcblx0XHRkYXRhQXJyYXkgPSBbTWF0aC5mbG9vcihteUFwcC5qb2JTYWxhcmllc0xpc3Rbam9iVGl0bGVdW2xlZnRDb3VudHJ5XSksIE1hdGguZmxvb3IobXlBcHAuam9iU2FsYXJpZXNMaXN0W2pvYlRpdGxlXVtyaWdodENvdW50cnldKV07XHJcblx0fSBlbHNlIHtcclxuXHRcdGRhdGFBcnJheSA9IFtNYXRoLmZsb29yKG15QXBwLmpvYlNhbGFyaWVzTGlzdFtqb2JUaXRsZV1bbGVmdENvdW50cnldWydwZXJjZW50aWxlXzUwJ10pLCBNYXRoLmZsb29yKG15QXBwLmpvYlNhbGFyaWVzTGlzdFtqb2JUaXRsZV1bcmlnaHRDb3VudHJ5XVsncGVyY2VudGlsZV81MCddKV07XHJcblx0fVxyXG5cdHZhciBqb2JDaGFydCA9IG5ldyBDaGFydCh3aGVyZVRvUHV0Q2hhcnQsIHtcclxuXHRcdHR5cGU6ICdiYXInLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRsYWJlbHM6IFtsZWZ0Q291bnRyeSwgcmlnaHRDb3VudHJ5XSxcclxuXHRcdFx0ZGF0YXNldHM6IFt7XHJcblx0XHRcdFx0bGFiZWw6ICdBdmVyYWdlIFNhbGFyeScsXHJcblx0XHRcdFx0ZGF0YTogZGF0YUFycmF5LFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRib3JkZXJDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnLFxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDJcclxuXHRcdFx0fV1cclxuXHRcdH0sXHJcblx0XHRvcHRpb25zOiB7XHJcblx0XHRcdGxheW91dDoge1xyXG5cdFx0XHRcdHBhZGRpbmc6IHtcclxuXHRcdFx0XHRcdGxlZnQ6IDEwLFxyXG5cdFx0XHRcdFx0dG9wOiAyMCxcclxuXHRcdFx0XHRcdGJvdHRvbTogMjBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNjYWxlczoge1xyXG5cdFx0XHRcdHlBeGVzOiBbe1xyXG5cdFx0XHRcdFx0Z3JpZExpbmVzOiB7XHJcblx0XHRcdFx0XHRcdGNvbG9yOiBcIiM1MjUyNTNcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpY2tzOiB7XHJcblx0XHRcdFx0XHRcdGJlZ2luQXRaZXJvOiB0cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0eEF4ZXM6IFt7XHJcblx0XHRcdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogZmFsc2UsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dGlja3M6IHtcclxuXHRcdFx0XHRcdFx0Zm9udENvbG9yOiBcIiNmZmZcIiwgLy8gdGhpcyBoZXJlXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogam9iVGl0bGUgKyBcIiBTYWxhcnlcIixcclxuXHRcdFx0XHRmb250U2l6ZTogMjQsXHJcblx0XHRcdFx0Zm9udEZhbWlseTogXCInT3N3YWxkJywgc2Fucy1zZXJpZlwiLFxyXG5cdFx0XHRcdGZvbnRDb2xvcjogJ3doaXRlJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZVxyXG5cdFx0fSxcclxuXHR9KTtcclxufVxyXG5cclxubXlBcHAuZ2V0WW91ckFnZVBvcCA9IGZ1bmN0aW9uKGNvdW50cnksIGFnZSkge1xyXG5cdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGBodHRwOi8vYXBpLnBvcHVsYXRpb24uaW86ODAvMS4wL3BvcHVsYXRpb24vJHtteUFwcC5kYXRlT2JqZWN0LmdldEZ1bGxZZWFyKCl9LyR7Y291bnRyeX0vJHthZ2V9L2AsXHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ0pTT04nLFxyXG5cdFx0fSlcclxuXHRcdC5kb25lKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcblx0XHRcdCQoJy5lcnJvck1lc3NhZ2VPdmVybGF5JykuZmFkZUluKCdmYXN0Jyk7XHJcblx0XHR9KVxyXG5cdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG5teUFwcC5jaGFydEFnZUdlbmRlclBvcCA9IGZ1bmN0aW9uKGxlZnRHZW5kZXJQb3AsIHJpZ2h0R2VuZGVyUG9wKSB7XHJcblx0JCgnLmFnZUdlbmRlclBvcENoYXJ0X19jb250YWluZXInKS5odG1sKCc8Y2FudmFzIGlkPVwiYWdlR2VuZGVyUG9wQ2hhcnRcIiBjbGFzcz1cImFnZUdlbmRlclBvcENoYXJ0XCI+PC9jYW52YXM+Jyk7XHJcblx0bGV0IHdoZXJlVG9QdXRDaGFydCA9ICQoJyNhZ2VHZW5kZXJQb3BDaGFydCcpO1xyXG5cdGxldCBsZWZ0Q291bnRyeSA9IG15QXBwLnVzZXJJbmZvLmNvdW50cnk7XHJcblx0bGV0IHJpZ2h0Q291bnRyeSA9IG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5O1xyXG5cdGxldCBjYXBpdGFsaXplZEdlbmRlciA9IG15QXBwLnVzZXJJbmZvLmdlbmRlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG15QXBwLnVzZXJJbmZvLmdlbmRlci5zbGljZSgxKTtcclxuXHJcblxyXG5cdHZhciBhZ2VHZW5kZXJQb3BDaGFydCA9IG5ldyBDaGFydCh3aGVyZVRvUHV0Q2hhcnQsIHtcclxuXHRcdHR5cGU6ICdiYXInLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRsYWJlbHM6IFtsZWZ0Q291bnRyeSwgcmlnaHRDb3VudHJ5XSxcclxuXHRcdFx0ZGF0YXNldHM6IFt7XHJcblx0XHRcdFx0bGFiZWw6ICdQb3B1bGF0aW9uIG9mICcgKyBteUFwcC51c2VySW5mby5hZ2VZZWFycyArICd5ZWFyIG9sZCAnICsgbXlBcHAudXNlckluZm8uZ2VuZGVyICsgJ3MnLFxyXG5cdFx0XHRcdGRhdGE6IFtsZWZ0R2VuZGVyUG9wLCByaWdodEdlbmRlclBvcF0sXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBbXHJcblx0XHRcdFx0XHQnI0ZGQkIwMCcsXHJcblx0XHRcdFx0XHQnI0E0QTRBMydcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBbXHJcblx0XHRcdFx0XHQnI0ZGQkIwMCcsXHJcblx0XHRcdFx0XHQnI0E0QTRBMycsXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRib3JkZXJXaWR0aDogMlxyXG5cdFx0XHR9XVxyXG5cdFx0fSxcclxuXHRcdG9wdGlvbnM6IHtcclxuXHRcdFx0bGF5b3V0OiB7XHJcblx0XHRcdFx0cGFkZGluZzoge1xyXG5cdFx0XHRcdFx0bGVmdDogMTAsXHJcblx0XHRcdFx0XHR0b3A6IDIwLFxyXG5cdFx0XHRcdFx0Ym90dG9tOiAyMFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c2NhbGVzOiB7XHJcblx0XHRcdFx0eUF4ZXM6IFt7XHJcblx0XHRcdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRcdFx0Y29sb3I6IFwiIzUyNTI1M1wiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dGlja3M6IHtcclxuXHRcdFx0XHRcdFx0YmVnaW5BdFplcm86IHRydWVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0XHR4QXhlczogW3tcclxuXHRcdFx0XHRcdGdyaWRMaW5lczoge1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBmYWxzZSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aWNrczoge1xyXG5cdFx0XHRcdFx0XHRmb250Q29sb3I6IFwiI2ZmZlwiLCAvLyB0aGlzIGhlcmVcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiAnUG9wdWxhdGlvbiBvZiAnICsgbXlBcHAudXNlckluZm8uYWdlWWVhcnMgKyAnIFllYXIgT2xkICcgKyBjYXBpdGFsaXplZEdlbmRlciArICdzJyxcclxuXHRcdFx0XHRmb250U2l6ZTogMjQsXHJcblx0XHRcdFx0Zm9udEZhbWlseTogXCInT3N3YWxkJywgc2Fucy1zZXJpZlwiLFxyXG5cdFx0XHRcdGZvbnRDb2xvcjogJ3doaXRlJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZVxyXG5cdFx0fSxcclxuXHR9KTtcclxufVxyXG5cclxubXlBcHAuY2hhcnRHZW5CcmVha2Rvd24gPSBmdW5jdGlvbihhbGxMZWZ0R2VuRGF0YSwgbGVmdE9yUmlnaHQpIHtcclxuXHRsZXQgd2hlcmVUb1B1dENoYXJ0O1xyXG5cdGxldCBtYWxlQ29sb3IgPSAnI0E0QTRBMyc7XHJcblx0bGV0IGZlbWFsZUNvbG9yID0gJyNBNEE0QTMnO1xyXG5cdGlmIChteUFwcC51c2VySW5mby5nZW5kZXIgPT0gJ21hbGUnKSB7XHJcblx0XHRtYWxlQ29sb3IgPSAnI0ZGQkIwMCc7XHJcblx0fVxyXG5cdGlmIChteUFwcC51c2VySW5mby5nZW5kZXIgPT0gJ2ZlbWFsZScpIHtcclxuXHRcdGZlbWFsZUNvbG9yID0gJyNGRkJCMDAnO1xyXG5cdH1cclxuXHRpZiAobGVmdE9yUmlnaHQgPT0gJ2xlZnQnKSB7XHJcblx0XHR3aGVyZVRvUHV0Q2hhcnQgPSAkKCcjbWFsZVZzRmVtYWxlclBvcENoYXJ0TGVmdCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGVyZVRvUHV0Q2hhcnQgPSAkKCcjbWFsZVZzRmVtYWxlclBvcENoYXJ0UmlnaHQnKTtcclxuXHR9XHJcblx0bGV0IGxlZnRDb3VudHJ5ID0gbXlBcHAudXNlckluZm8uY291bnRyeTtcclxuXHRsZXQgcmlnaHRDb3VudHJ5ID0gbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnk7XHJcblx0dmFyIG1hbGVWc0ZlbWFsZXJQb3BDaGFydCA9IG5ldyBDaGFydCh3aGVyZVRvUHV0Q2hhcnQsIHtcclxuXHRcdHR5cGU6ICdwaWUnLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRsYWJlbHM6IFtteUFwcC51c2VySW5mby5hZ2VZZWFycyArICdZZWFyIE9sZCBNYWxlcycsIG15QXBwLnVzZXJJbmZvLmFnZVllYXJzICsgJ1llYXIgT2xkIEZlbWFsZXMnXSxcclxuXHRcdFx0ZGF0YXNldHM6IFt7XHJcblx0XHRcdFx0bGFiZWw6ICdQb3B1bGF0aW9uIG9mICcgKyBteUFwcC51c2VySW5mby5hZ2VZZWFycyArICd5ZWFyIG9sZCAnICsgbXlBcHAudXNlckluZm8uZ2VuZGVyICsgJ3MnLFxyXG5cdFx0XHRcdGRhdGE6IFthbGxMZWZ0R2VuRGF0YVsnbWFsZXMnXSwgYWxsTGVmdEdlbkRhdGFbJ2ZlbWFsZXMnXV0sXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBbXHJcblx0XHRcdFx0XHRtYWxlQ29sb3IsXHJcblx0XHRcdFx0XHRmZW1hbGVDb2xvclxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IFtcclxuXHRcdFx0XHRcdG1hbGVDb2xvcixcclxuXHRcdFx0XHRcdGZlbWFsZUNvbG9yLFxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDJcclxuXHRcdFx0fV1cclxuXHRcdH0sXHJcblx0XHRvcHRpb25zOiB7XHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiAnTWFsZSBhbmQgRmVtYWxlIFBvcHVsYXRpb24gQnJlYWtkb3duJyxcclxuXHRcdFx0XHRmb250U2l6ZTogMjQsXHJcblx0XHRcdFx0Zm9udEZhbWlseTogXCInT3N3YWxkJywgc2Fucy1zZXJpZlwiLFxyXG5cdFx0XHRcdGZvbnRDb2xvcjogJ3doaXRlJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZVxyXG5cdFx0fSxcclxuXHR9KTtcclxufVxyXG5cclxubXlBcHAuZ2V0R2xvYmFsQWdlUG9wID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogYGh0dHA6Ly9hcGkucG9wdWxhdGlvbi5pbzo4MC8xLjAvcG9wdWxhdGlvbi8ke215QXBwLmRhdGVPYmplY3QuZ2V0RnVsbFllYXIoKX0vYWdlZC8ke215QXBwLnVzZXJJbmZvLmFnZVllYXJzfS9gLFxyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHRcdH0pXHJcblx0XHQuZG9uZShmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG5cdFx0XHQkKCcuZXJyb3JNZXNzYWdlT3ZlcmxheScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0fSlcclxuXHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XHJcblx0XHR9KTtcclxufVxyXG5cclxubXlBcHAuY3JlYXRlR2xvYmFsQWdlUG9wRGF0YUFycmF5cyA9IGZ1bmN0aW9uKCkge1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cyA9IHt9O1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcyA9IHt9XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLm1hbGVzLmxhYmVscyA9IFtdO1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5udW1iZXJzID0gW107XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLmZlbWFsZXMgPSB7fVxyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLmxhYmVscyA9IFtdO1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLm51bWJlcnMgPSBbXTtcclxuXHRmb3IgKGxldCBjb3VudHJ5IGluIG15QXBwLmZpbmFsQ291bnRyeUxpc3QpIHtcclxuXHRcdGxldCBjb3VudHJ5TGFiZWwgPSBteUFwcC5maW5hbENvdW50cnlMaXN0W2NvdW50cnldLm5hbWU7XHJcblx0XHRsZXQgY291bnRyeU1hbGVQb3AgPSBteUFwcC5maW5hbENvdW50cnlMaXN0W2NvdW50cnldLnBvcHVsYXRpb25PZkFnZS5tYWxlcztcclxuXHRcdGxldCBjb3VudHJ5RmVtYWxlUG9wID0gbXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5XS5wb3B1bGF0aW9uT2ZBZ2UuZmVtYWxlcztcclxuXHRcdGxldCBtYWxlRGF0YUFycmF5ID0gbXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLm1hbGVzLm51bWJlcnM7XHJcblx0XHRsZXQgZmVtYWxlRGF0YUFycmF5ID0gbXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLmZlbWFsZXMubnVtYmVycztcclxuXHRcdGxldCBtYWxlTGFiZWxBcnJheSA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5sYWJlbHM7XHJcblx0XHRsZXQgZmVtYWxlTGFiZWxBcnJheSA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLmxhYmVscztcclxuXHRcdGlmICghKGNvdW50cnlMYWJlbCA9PT0gbXlBcHAudXNlckluZm8uY291bnRyeSB8fCBjb3VudHJ5TGFiZWwgPT09IG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5KSkge1xyXG5cdFx0XHRmZW1hbGVMYWJlbEFycmF5LnB1c2goY291bnRyeUxhYmVsKTtcclxuXHRcdFx0bWFsZUxhYmVsQXJyYXkucHVzaChjb3VudHJ5TGFiZWwpO1xyXG5cdFx0XHRtYWxlRGF0YUFycmF5LnB1c2goY291bnRyeU1hbGVQb3ApO1xyXG5cdFx0XHRmZW1hbGVEYXRhQXJyYXkucHVzaChjb3VudHJ5RmVtYWxlUG9wKVxyXG5cdFx0fTtcclxuXHR9XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLm1hbGVzLmxhYmVscy51bnNoaWZ0KG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5KTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5sYWJlbHMudW5zaGlmdChteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeSk7XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLm1hbGVzLm51bWJlcnMudW5zaGlmdChteUFwcC5maW5hbENvdW50cnlMaXN0W215QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5XS5wb3B1bGF0aW9uT2ZBZ2UubWFsZXMpO1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLm51bWJlcnMudW5zaGlmdChteUFwcC5maW5hbENvdW50cnlMaXN0W215QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5XS5wb3B1bGF0aW9uT2ZBZ2UuZmVtYWxlcyk7XHJcblxyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5sYWJlbHMudW5zaGlmdChteUFwcC51c2VySW5mby5jb3VudHJ5KTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5sYWJlbHMudW5zaGlmdChteUFwcC51c2VySW5mby5jb3VudHJ5KTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMubnVtYmVycy51bnNoaWZ0KG15QXBwLmZpbmFsQ291bnRyeUxpc3RbbXlBcHAudXNlckluZm8uY291bnRyeV0ucG9wdWxhdGlvbk9mQWdlLm1hbGVzKTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5udW1iZXJzLnVuc2hpZnQobXlBcHAuZmluYWxDb3VudHJ5TGlzdFtteUFwcC51c2VySW5mby5jb3VudHJ5XS5wb3B1bGF0aW9uT2ZBZ2UuZmVtYWxlcyk7XHJcbn1cclxuXHJcbm15QXBwLm1ha2VDb2xvdXJBcnJheSA9IGZ1bmN0aW9uKGRhdGFBcnJheSwgY29sb3VyKSB7XHJcblx0bGV0IHJldHVybkFycmF5ID0gW107XHJcblx0ZGF0YUFycmF5LmZvckVhY2goKGl0ZW0pID0+IHJldHVybkFycmF5LnB1c2goY29sb3VyKSk7IC8vbWFrZSBhIGdyZXkgZW50cnkgZm9yIGVhY2ggY291bnRyeSB0aGF0IHdpbGwgYmUgb24gdGhlIGdyYXBoXHJcblx0cmV0dXJuQXJyYXkucG9wKCk7IC8vZHJvcCBvZmYgMiBncmV5cyBmb3IgdGhlIDIgY29sb3VyZWQgY291bnRyaWVzLlxyXG5cdHJldHVybkFycmF5LnBvcCgpO1xyXG5cdHJldHVybiByZXR1cm5BcnJheTtcclxufVxyXG5cclxubXlBcHAuY2hhcnRHZW5HbG9iYWxBZ2VQb3BEYXRhID0gZnVuY3Rpb24oKSB7XHJcblx0bGV0IHdoZXJlVG9QdXRDaGFydCA9ICQoJyNnbG9iYWxBZ2VHZW5Qb3BDaGFydCcpO1xyXG5cdGxldCBnZW5kZXJMYWJlbHM7XHJcblx0bGV0IGdlbmRlckRhdGE7XHJcblx0aWYgKG15QXBwLnVzZXJJbmZvLmdlbmRlciA9PSAnbWFsZScpIHtcclxuXHRcdGdlbmRlckxhYmVscyA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5sYWJlbHM7XHJcblx0fSBlbHNlIHtcclxuXHRcdGdlbmRlckxhYmVscyA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLmxhYmVsc1xyXG5cdH1cclxuXHRpZiAobXlBcHAudXNlckluZm8uZ2VuZGVyID09ICdtYWxlJykge1xyXG5cdFx0Z2VuZGVyRGF0YSA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5udW1iZXJzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRnZW5kZXJEYXRhID0gbXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLmZlbWFsZXMubnVtYmVyc1xyXG5cdH1cclxuXHRsZXQgY29sb3VyQXJyYXkgPSBteUFwcC5tYWtlQ29sb3VyQXJyYXkoZ2VuZGVyRGF0YSwgJ3JnYigxMDksMTA5LDEwOSknKTtcclxuXHRsZXQgYm9yZGVyQ29sb3VyQXJyYXkgPSBteUFwcC5tYWtlQ29sb3VyQXJyYXkoZ2VuZGVyRGF0YSwgJ2JsYWNrJyk7XHJcblx0dmFyIGdsb2JhbEdlbkFnZUNoYXJ0ID0gbmV3IENoYXJ0KHdoZXJlVG9QdXRDaGFydCwge1xyXG5cdFx0dHlwZTogJ3BpZScsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdGxhYmVsczogZ2VuZGVyTGFiZWxzLFxyXG5cdFx0XHRkYXRhc2V0czogW3tcclxuXHRcdFx0XHRsYWJlbDogJ1BvcHVsYXRpb24gb2YgJyArIG15QXBwLnVzZXJJbmZvLmFnZVllYXJzICsgJyBZZWFyIE9sZCAnICsgbXlBcHAudXNlckluZm8uZ2VuZGVyICsgJ3MuJyxcclxuXHRcdFx0XHRkYXRhOiBnZW5kZXJEYXRhLFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnLFxyXG5cdFx0XHRcdFx0Li4uY29sb3VyQXJyYXlcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBbXHJcblx0XHRcdFx0XHQnI0ZGQkIwMCcsXHJcblx0XHRcdFx0XHQnI0E0QTRBMycsXHJcblx0XHRcdFx0XHQuLi5jb2xvdXJBcnJheVxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDFcclxuXHRcdFx0fV1cclxuXHRcdH0sXHJcblx0XHRvcHRpb25zOiB7XHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiAnR2xvYmFsIHBvcHVsYXRpb24gb2YgJyArIG15QXBwLnVzZXJJbmZvLmFnZVllYXJzICsgJyBZZWFyIE9sZCAnICsgbXlBcHAudXNlckluZm8uZ2VuZGVyICsgJ3MuJyxcclxuXHRcdFx0XHRmb250U2l6ZTogMjQsXHJcblx0XHRcdFx0Zm9udEZhbWlseTogXCInT3N3YWxkJywgc2Fucy1zZXJpZlwiLFxyXG5cdFx0XHRcdGZvbnRDb2xvcjogJ3doaXRlJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZVxyXG5cdFx0fSxcclxuXHR9KTtcclxufVxyXG5cclxubXlBcHAuZ2V0VG90YWxQb3B1bGF0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogYGh0dHA6Ly9hcGkucG9wdWxhdGlvbi5pbzo4MC8xLjAvcG9wdWxhdGlvbi9Xb3JsZC8ke215QXBwLnRvZGF5RGF0ZX0vYCxcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHR9KVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcclxuXHRcdH0pXHJcblx0XHQuZmFpbChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuXHRcdFx0JCgnLmVycm9yTWVzc2FnZU92ZXJsYXknKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHRcdH0pXHJcblx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmdldEdsb2JhbEFnZUNvdW50ID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogYGh0dHA6Ly9hcGkucG9wdWxhdGlvbi5pbzo4MC8xLjAvcG9wdWxhdGlvbi8ke215QXBwLmRhdGVPYmplY3QuZ2V0RnVsbFllYXIoKX0vV29ybGQvJHtteUFwcC51c2VySW5mby5hZ2VZZWFyc30vYCxcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHR9KVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcclxuXHRcdH0pXHJcblx0XHQuZmFpbChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuXHRcdFx0JCgnLmVycm9yTWVzc2FnZU92ZXJsYXknKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHRcdH0pXHJcblx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmNoYXJ0R2xvYmFsQWdlQ29tcGFyZSA9IGZ1bmN0aW9uKG51bWJlck9mYWdlWWVhck9sZHMsIG51bWJlck9mSHVtYW5zTWludXNBZ2UpIHtcclxuXHRsZXQgd2hlcmVUb1B1dENoYXJ0ID0gJCgnI2dsb2JhbFBvcFZzQWdlQ2hhcnQnKVxyXG5cdHZhciBnbG9iYWxBZ2VDb21wYXJlZUNoYXJ0ID0gbmV3IENoYXJ0KHdoZXJlVG9QdXRDaGFydCwge1xyXG5cdFx0dHlwZTogJ3BpZScsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdGxhYmVsczogW2BOdW1iZXIgb2YgJHtteUFwcC51c2VySW5mby5hZ2VZZWFyc30gWWVhciBPbGRzYCwgJ1JlbWFpbmluZyBHbG9iYWwgUG9wdWxhdGlvbiddLFxyXG5cdFx0XHRkYXRhc2V0czogW3tcclxuXHRcdFx0XHRsYWJlbDogJ1BvcHVsYXRpb24nLFxyXG5cdFx0XHRcdGRhdGE6IFtudW1iZXJPZmFnZVllYXJPbGRzLCBudW1iZXJPZkh1bWFuc01pbnVzQWdlXSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFtcclxuXHRcdFx0XHRcdCcjRkZCQjAwJyxcclxuXHRcdFx0XHRcdCcjQTRBNEEzJyxcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBbXHJcblx0XHRcdFx0XHQnI0ZGQkIwMCcsXHJcblx0XHRcdFx0XHQnI0E0QTRBMycsXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRib3JkZXJXaWR0aDogMVxyXG5cdFx0XHR9XVxyXG5cdFx0fSxcclxuXHRcdG9wdGlvbnM6IHtcclxuXHRcdFx0dGl0bGU6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHRleHQ6ICdOdW1iZXIgb2YgJyArIG15QXBwLnVzZXJJbmZvLmFnZVllYXJzICsgJyBZZWFyIE9sZHMgb3V0IG9mIEdsb2JhbCBQb3B1bGF0aW9uICcsXHJcblx0XHRcdFx0Zm9udFNpemU6IDI0LFxyXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiJ09zd2FsZCcsIHNhbnMtc2VyaWZcIixcclxuXHRcdFx0XHRmb250Q29sb3I6ICd3aGl0ZSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IHRydWVcclxuXHRcdH0sXHJcblx0fSk7XHJcbn07XHJcblxyXG5teUFwcC5sb2FkUGhhc2VUd28gPSBmdW5jdGlvbigpIHtcclxuXHQkKCcub3RoZXJQZXJzb25fX0Zvcm0nKS5mYWRlT3V0KCdzbG93Jyk7XHJcblx0Y29uc3QgY291bnRyeUxlZnRDaGVjayA9IG15QXBwLmdldFNhbGFyeUluZm8obXlBcHAuZmluYWxDb3VudHJ5TGlzdFtteUFwcC51c2VySW5mby5jb3VudHJ5XS5ocmVmICsgJ3NhbGFyaWVzJyk7XHJcblx0Y29uc3QgY291bnRyeVJpZ2h0Q2hlY2sgPSBteUFwcC5nZXRTYWxhcnlJbmZvKG15QXBwLmZpbmFsQ291bnRyeUxpc3RbbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnldLmhyZWYgKyAnc2FsYXJpZXMnKTtcclxuXHQkLndoZW4oY291bnRyeUxlZnRDaGVjaywgY291bnRyeVJpZ2h0Q2hlY2spLmRvbmUoKGxlZnREYXRhLCByaWdodERhdGEpID0+IHtcclxuXHRcdG15QXBwLmNyZWF0ZU1hc3RlclNhbGFyaWVzTGlzdChsZWZ0RGF0YSwgcmlnaHREYXRhKTtcclxuXHRcdG15QXBwLmNoYXJ0Sm9icygpOyAvL3N0YXJ0cyBjaGFydCB3aXRoIG92ZXJhbGxcclxuXHRcdCQoJ3NlY3Rpb24uY29udGVudCcpLmZhZGVJbignc2xvdycpO1xyXG5cdH0pO1xyXG5cdGNvbnN0IGxlZnRDb3VudHJ5WW91ckFnZVBvcENoZWNrID0gbXlBcHAuZ2V0WW91ckFnZVBvcChteUFwcC51c2VySW5mby5jb3VudHJ5LCBteUFwcC51c2VySW5mby5hZ2VZZWFycylcclxuXHRjb25zdCByaWdodENvdW50cnlZb3VyQWdlUG9wQ2hlY2sgPSBteUFwcC5nZXRZb3VyQWdlUG9wKG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5LCBteUFwcC51c2VySW5mby5hZ2VZZWFycylcclxuXHQkLndoZW4obGVmdENvdW50cnlZb3VyQWdlUG9wQ2hlY2ssIHJpZ2h0Q291bnRyeVlvdXJBZ2VQb3BDaGVjaykuZG9uZSgobGVmdERhdGEsIHJpZ2h0RGF0YSkgPT4ge1xyXG5cdFx0bGV0IGxlZnRHZW5kZXJQb3A7XHJcblx0XHRsZXQgcmlnaHRHZW5kZXJQb3A7XHJcblx0XHRpZiAobXlBcHAudXNlckluZm8uZ2VuZGVyID09ICdtYWxlJykge1xyXG5cdFx0XHRsZWZ0R2VuZGVyUG9wID0gbGVmdERhdGFbMF1bMF1bJ21hbGVzJ107XHJcblx0XHRcdHJpZ2h0R2VuZGVyUG9wID0gcmlnaHREYXRhWzBdWzBdWydtYWxlcyddO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGVmdEdlbmRlclBvcCA9IGxlZnREYXRhWzBdWzBdWydmZW1hbGVzJ107XHJcblx0XHRcdHJpZ2h0R2VuZGVyUG9wID0gcmlnaHREYXRhWzBdWzBdWydmZW1hbGVzJ107XHJcblx0XHR9XHJcblx0XHRteUFwcC5jaGFydEFnZUdlbmRlclBvcChsZWZ0R2VuZGVyUG9wLCByaWdodEdlbmRlclBvcClcclxuXHRcdGxldCBhbGxMZWZ0R2VuRGF0YSA9IGxlZnREYXRhWzBdWzBdO1xyXG5cdFx0bGV0IGFsbFJpZ2h0R2VuRGF0YSA9IHJpZ2h0RGF0YVswXVswXTtcclxuXHRcdG15QXBwLmNoYXJ0R2VuQnJlYWtkb3duKGFsbExlZnRHZW5EYXRhLCAnbGVmdCcpO1xyXG5cdFx0bXlBcHAuY2hhcnRHZW5CcmVha2Rvd24oYWxsUmlnaHRHZW5EYXRhLCAncmlnaHQnKTtcclxuXHRcdCQoJ2Zvb3RlcicpLmZhZGVJbignc2xvdycpO1xyXG5cdH0pXHJcblx0Y29uc3QgZ2xvYmFsQ29tcGFyZUNoZWNrID0gbXlBcHAuZ2V0R2xvYmFsQWdlUG9wKCk7XHJcblx0JC53aGVuKGdsb2JhbENvbXBhcmVDaGVjaykuZG9uZSgoZGF0YSkgPT4ge1xyXG5cdFx0ZGF0YS5mb3JFYWNoKChjb3VudHJ5KSA9PiB7XHJcblx0XHRcdGlmIChteUFwcC5maW5hbENvdW50cnlMaXN0W2NvdW50cnlbJ2NvdW50cnknXV0gPT09IHVuZGVmaW5lZCkge30gZWxzZSB7XHJcblx0XHRcdFx0bXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5Wydjb3VudHJ5J11dLnBvcHVsYXRpb25PZkFnZSA9IHt9O1xyXG5cdFx0XHRcdG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeVsnY291bnRyeSddXS5wb3B1bGF0aW9uT2ZBZ2UubWFsZXMgPSBjb3VudHJ5Lm1hbGVzO1xyXG5cdFx0XHRcdG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeVsnY291bnRyeSddXS5wb3B1bGF0aW9uT2ZBZ2UuZmVtYWxlcyA9IGNvdW50cnkuZmVtYWxlcztcclxuXHRcdFx0fSAvL2FkZHMgcG9wIGRhdGEgZm9yIGFnZSBncm91cCB0byBmaW5hbENvdW50cnlMaXN0XHJcblx0XHR9KTtcclxuXHRcdG15QXBwLmNyZWF0ZUdsb2JhbEFnZVBvcERhdGFBcnJheXMoKTtcclxuXHRcdG15QXBwLmNoYXJ0R2VuR2xvYmFsQWdlUG9wRGF0YSgpO1xyXG5cdH0pO1xyXG5cdGNvbnN0IHRvdGFsUG9wdWxhdGlvbkNoZWNrID0gbXlBcHAuZ2V0VG90YWxQb3B1bGF0aW9uKCk7XHJcblx0Y29uc3QgZ2xvYmFsQWdlQ291bnRDaGVjayA9IG15QXBwLmdldEdsb2JhbEFnZUNvdW50KCk7XHJcblx0JC53aGVuKHRvdGFsUG9wdWxhdGlvbkNoZWNrLCBnbG9iYWxBZ2VDb3VudENoZWNrKS5kb25lKCh0b3RhbFBvcERhdGEsIGFnZVBvcERhdGEpID0+IHtcclxuXHRcdGxldCBudW1iZXJPZmFnZVllYXJPbGRzID0gYWdlUG9wRGF0YVswXVswXS50b3RhbDtcclxuXHRcdGxldCBudW1iZXJPZkh1bWFucyA9IHRvdGFsUG9wRGF0YVswXS50b3RhbF9wb3B1bGF0aW9uLnBvcHVsYXRpb247XHJcblx0XHRsZXQgbnVtYmVyT2ZIdW1hbnNNaW51c0FnZSA9IG51bWJlck9mSHVtYW5zIC0gbnVtYmVyT2ZhZ2VZZWFyT2xkc1xyXG5cdFx0bXlBcHAuY2hhcnRHbG9iYWxBZ2VDb21wYXJlKG51bWJlck9mYWdlWWVhck9sZHMsIG51bWJlck9mSHVtYW5zTWludXNBZ2UpO1xyXG5cdH0pO1xyXG5cclxufTtcclxuXHJcbm15QXBwLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRteUFwcC5nZXRDb3VudHJpZXMoKTtcclxuXHRteUFwcC50b2RheURhdGUgPSBteUFwcC5nZXREYXRlKCk7XHJcblx0JC53aGVuKG15QXBwLnRlbGVwb3J0Q291bnRyaWVzQ2hlY2ssIG15QXBwLmdldENvdW50cmllc0NoZWNrKVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5nb29kVG9HbycpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcblx0XHRcdG15QXBwLmNyZWF0ZU1hc3RlckNvdW50cnlMaXN0KCk7XHJcblx0XHR9KTtcclxuXHRteUFwcC5ldmVudHMoKTtcclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0bXlBcHAuaW5pdCgpO1xyXG59KSJdfQ==
