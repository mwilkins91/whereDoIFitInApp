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
		$('.goButton').val('Loading...');
		$('.goButton').attr('disabled', 'true');
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
	$('.landingSplash').fadeOut('slow');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcanMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsRUFBWixDLENBQWdCO0FBQ2hCLE1BQU0sU0FBTixHQUFrQixFQUFsQixDLENBQXNCOztBQUV0QixNQUFNLE1BQU4sR0FBZSxZQUFXO0FBQ3pCLEdBQUUsc0JBQUYsRUFBMEIsRUFBMUIsQ0FBNkIsUUFBN0IsRUFBdUMsVUFBUyxLQUFULEVBQWdCO0FBQ3RELFFBQU0sY0FBTjtBQUNBLFFBQU0sY0FBTixDQUFxQixNQUFyQjtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsT0FBcEIsQ0FBNEIsTUFBNUIsRUFBb0M7QUFBQSxVQUFNLEVBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsTUFBakIsQ0FBTjtBQUFBLEdBQXBDO0FBQ0EsSUFBRSxJQUFGLENBQU8sTUFBTSxRQUFOLENBQWUsZ0JBQXRCLEVBQ0UsSUFERixDQUNPLFlBQVc7QUFDaEIsU0FBTSxjQUFOLENBQXFCLE1BQU0sUUFBTixDQUFlLFdBQXBDLEVBQWlELE1BQWpEO0FBQ0EsR0FIRjtBQUlBLEVBUkQ7QUFTQSxHQUFFLG9CQUFGLEVBQXdCLEVBQXhCLENBQTJCLFFBQTNCLEVBQXFDLFVBQVMsS0FBVCxFQUFnQjtBQUNwRCxRQUFNLGNBQU47QUFDQSxJQUFFLFdBQUYsRUFBZSxHQUFmLENBQW1CLFlBQW5CO0FBQ0EsSUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixVQUFwQixFQUFnQyxNQUFoQztBQUNBLFFBQU0sZUFBTixDQUFzQixPQUF0QixHQUFnQyxFQUFFLDZCQUFGLEVBQWlDLEdBQWpDLEVBQWhDO0FBQ0EsSUFBRSxtQkFBRixFQUF1QixJQUF2QixzQkFBK0MsTUFBTSxlQUFOLENBQXNCLE9BQXJFO0FBQ0EsUUFBTSxjQUFOLENBQXFCLGFBQXJCO0FBQ0EsSUFBRSx5QkFBRixFQUE2QixJQUE3QixDQUFrQyxNQUFNLGVB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QUFpQixhQUFhLENBQWIsRUFBZ0IsZ0JBQWhCLENBQWlDLFVBQXREO0FBQ0EsTUFBSSx5QkFBeUIsaUJBQWlCLG1CQUE5QztBQUNBLFFBQU0scUJBQU4sQ0FBNEIsbUJBQTVCLEVBQWlELHNCQUFqRDtBQUNBLEVBTEQ7QUFPQSxDQWpERDs7QUFtREEsTUFBTSxJQUFOLEdBQWEsWUFBVztBQUN2QixPQUFNLFlBQU47QUFDQSxPQUFNLFNBQU4sR0FBa0IsTUFBTSxPQUFOLEVBQWxCO0FBQ0EsR0FBRSxJQUFGLENBQU8sTUFBTSxzQkFBYixFQUFxQyxNQUFNLGlCQUEzQyxFQUNFLElBREYsQ0FDTyxZQUFXO0FBQ2hCLElBQUUsV0FBRixFQUFlLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsR0FBOUI7QUFDQSxRQUFNLHVCQUFOO0FBQ0EsRUFKRjtBQUtBLE9BQU0sTUFBTjtBQUNBLENBVEQ7O0FBV0EsRUFBRSxZQUFXO0FBQ1osT0FBTSxJQUFOO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbXlBcHAgPSB7fTsgLy9pbml0aWFsaXplIG15IGFwcCBvYmplY3RcclxubXlBcHAuY291bnRyaWVzID0ge307IC8vaW5pdGlhbGl6ZSBmb3IgYXJyYXkgYW5kIG9iamVjdCBjcmVhdGVkIHZpYSBmdW5jdGlvbjtcclxuXHJcbm15QXBwLmV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdCQoJy51c2VySW5mb0lucHV0X19Gb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bXlBcHAuZ2V0RGF0ZU9mRGVhdGgoJ3VzZXInKTtcclxuXHRcdCQoJy51c2VySW5mb0lucHV0JykuZmFkZU91dCgnc2xvdycsICgpID0+ICQoJ21haW4nKS5mYWRlSW4oJ3Nsb3cnKSk7XHJcblx0XHQkLndoZW4obXlBcHAudXNlckluZm8uZGF0ZU9mRGVhdGhDaGVjaylcclxuXHRcdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bXlBcHAuc3RhcnRDb3VudGRvd24obXlBcHAudXNlckluZm8uZGF0ZU9mRGVhdGgsICd1c2VyJyk7XHJcblx0XHRcdH0pXHJcblx0fSk7XHJcblx0JCgnLm90aGVyUGVyc29uX19Gb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0JCgnLmdvQnV0dG9uJykudmFsKCdMb2FkaW5nLi4uJyk7XHJcblx0XHQkKCcuZ29CdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcblx0XHRteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeSA9ICQoJy5vdGhlclBlcnNvbl9fRm9ybSAuY291bnRyeScpLnZhbCgpO1xyXG5cdFx0JCgnLm90aGVyUGVyc29uVGl0bGUnKS50ZXh0KGBJZiB5b3UgbGl2ZWQgaW4gJHtteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeX1gKVxyXG5cdFx0bXlBcHAuZ2V0RGF0ZU9mRGVhdGgoJ290aGVyUGVyc29uJyk7XHJcblx0XHQkKCcub3RoZXJQZXJzb25Db3VudHJ5VGV4dCcpLnRleHQobXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnkpO1xyXG5cdFx0JC53aGVuKG15QXBwLnVzZXJJbmZvLmRhdGVPZkRlYXRoQ2hlY2spLmRvbmUoKCkgPT4ge1xyXG5cdFx0XHRteUFwcC5hZ2VEaWZmID0gbXlBcHAuZ2V0QWdlRGlmZigpO1xyXG5cdFx0XHRteUFwcC51cGRhdGVBZ2VQYXJhZ3JhcGgoKTtcclxuXHRcdFx0bXlBcHAubG9hZFBoYXNlVHdvKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHQkKCcuam9iSW5mb19fZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGxldCBzZWxlY3RlZEpvYiA9ICQoJy5qb2JJbmZvX19zZWxlY3QnKS52YWwoKS5yZXBsYWNlKC9fL2dpLCAnICcpO1xyXG5cdFx0bXlBcHAuY2hhcnRKb2JzKG15QXBwLmpvYlNhbGFyaWVzTGlzdFtzZWxlY3RlZEpvYl0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxubXlBcHAudXBkYXRlQWdlUGFyYWdyYXBoID0gZnVuY3Rpb24oKSB7XHJcblx0JCgnLmdhaW5Mb3NzJykudGV4dChteUFwcC5hZ2VEaWZmLmdhaW5Mb3NzKTtcclxuXHQkKCcueWVhcnNUZXh0JykudGV4dChteUFwcC5hZ2VEaWZmLnllYXJzKTtcclxuXHQkKCcuZGF5c1RleHQnKS50ZXh0KG15QXBwLmFnZURpZmYuZGF5cyk7XHJcblx0JCgnLmhvdXJzVGV4dCcpLnRleHQobXlBcHAuYWdlRGlmZi5ob3Vycyk7XHJcblx0JCgnLm1pbnV0ZXNUZXh0JykudGV4dChteUFwcC5hZ2VEaWZmLm1pbnV0ZXMpO1xyXG5cdGlmIChteUFwcC5hZ2VEaWZmLnllYXJzID4gMSB8fCBteUFwcC5hZ2VEaWZmLnllYXJzID09PSAwKSB7XHJcblx0XHQkKCcucGx1cmFsU3llYXInKS50ZXh0KCdzJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5wbHVyYWxTeWVhcicpLnRleHQoJycpO1xyXG5cdH1cclxuXHRpZiAobXlBcHAuYWdlRGlmZi5kYXlzID4gMSB8fCBteUFwcC5hZ2VEaWZmLnllYXJzID09PSAwKSB7XHJcblx0XHQkKCcucGx1cmFsU2RheScpLnRleHQoJ3MnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLnBsdXJhbFNkYXknKS50ZXh0KCcnKTtcclxuXHR9XHJcblx0aWYgKG15QXBwLmFnZURpZmYuaG91cnMgPiAxIHx8IG15QXBwLmFnZURpZmYueWVhcnMgPT09IDApIHtcclxuXHRcdCQoJy5wbHVyYWxTaG91cicpLnRleHQoJ3MnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLnBsdXJhbFNob3VyJykudGV4dCgnJyk7XHJcblx0fVxyXG5cdGlmIChteUFwcC5hZ2VEaWZmLm1pbnV0ZXMgPiAxIHx8IG15QXBwLmFnZURpZmYueWVhcnMgPT09IDApIHtcclxuXHRcdCQoJy5wbHVyYWxTbWludXRlJykudGV4dCgncycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcucGx1cmFsU21pbnV0ZScpLnRleHQoJycpO1xyXG5cdH1cclxuXHQkKCcub2ZGb3InKS50ZXh0KG15QXBwLmFnZURpZmYub2ZGb3IpO1xyXG59XHJcblxyXG5teUFwcC5nZXRBZ2VEaWZmID0gZnVuY3Rpb24oKSB7XHJcblx0bGV0IHVzZXJEZWF0aCA9IG15QXBwLnVzZXJJbmZvLmRhdGVPZkRlYXRoO1xyXG5cdGxldCBvdGhlckRlYXRoID0gbXlBcHAub3RoZXJQZXJzb25JbmZvLmRhdGVPZkRlYXRoO1xyXG5cdGxldCBnYWluTG9zcztcclxuXHRsZXQgZGlmZmVyZW5jZTtcclxuXHRsZXQgb2ZGb3I7XHJcblx0aWYgKHVzZXJEZWF0aCA+IG90aGVyRGVhdGgpIHtcclxuXHRcdGdhaW5Mb3NzID0gJ2xvc2UnO1xyXG5cdFx0ZGlmZmVyZW5jZSA9IHVzZXJEZWF0aCAtIG90aGVyRGVhdGg7XHJcblx0XHRvZkZvciA9ICdvZic7XHJcblx0fSBlbHNlIGlmICh1c2VyRGVhdGggPCBvdGhlckRlYXRoKSB7XHJcblx0XHRnYWluTG9zcyA9ICdhZGQnO1xyXG5cdFx0ZGlmZmVyZW5jZSA9IG90aGVyRGVhdGggLSB1c2VyRGVhdGg7XHJcblx0XHRvZkZvciA9ICd0byc7XHJcblx0fVxyXG5cdHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoZGlmZmVyZW5jZSAvIDEwMDApICUgNjApO1xyXG5cdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlmZmVyZW5jZSAvIDEwMDAgLyA2MCkgJSA2MCk7XHJcblx0dmFyIGhvdXJzID0gTWF0aC5mbG9vcigoZGlmZmVyZW5jZSAvICgxMDAwICogNjAgKiA2MCkpICUgMjQpO1xyXG5cdHZhciBkYXlzID0gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKSAlIDM2NTtcclxuXHR2YXIgeWVhcnMgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyAoMTAwMCAqIDYwICogNjAgKiAyNCAqIDM2NSkpO1xyXG5cdHJldHVybiB7XHJcblx0XHRzZWNvbmRzOiBzZWNvbmRzLFxyXG5cdFx0bWludXRlczogbWludXRlcyxcclxuXHRcdGhvdXJzOiBob3VycyxcclxuXHRcdGRheXM6IGRheXMsXHJcblx0XHR5ZWFyczogeWVhcnMsXHJcblx0XHRnYWluTG9zczogZ2Fpbkxvc3MsXHJcblx0XHRvZkZvcjogb2ZGb3JcclxuXHR9XHJcbn1cclxuXHJcbm15QXBwLnN0YXJ0Q291bnRkb3duID0gZnVuY3Rpb24oZGF0ZU9mRGVhdGgsIHdobykge1xyXG5cdGlmICh3aG8gPT09IFwidXNlclwiKSB7XHJcblx0XHRteUFwcC5jb3VudERvd25zID0ge307XHJcblx0XHRteUFwcC5jb3VudERvd25zLnVzZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0bXlBcHAudXNlckluZm8uY291bnRkb3duID0gbXlBcHAuZ2V0VGltZVJlbWFpbmluZyhkYXRlT2ZEZWF0aCk7XHJcblx0XHRcdCQoJ3AudXNlclNlY29uZHMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPlNlY29uZHM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLnVzZXJJbmZvLmNvdW50ZG93bi5zZWNvbmRzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0JCgncC51c2VyTWludXRlcycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+TWludXRlczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAudXNlckluZm8uY291bnRkb3duLm1pbnV0ZXMgKyAnPC9zcGFuPicpO1xyXG5cdFx0XHQkKCdwLnVzZXJIb3VycycpLmh0bWwoJzxzcGFuIGNsYXNzPVwidGltZVRpdGxlXCI+SG91cnM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLnVzZXJJbmZvLmNvdW50ZG93bi5ob3VycyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdCQoJ3AudXNlckRheXMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPkRheXM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLnVzZXJJbmZvLmNvdW50ZG93bi5kYXlzICsgJzwvc3Bhbj4nKTtcclxuXHRcdFx0JCgncC51c2VyWWVhcnMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPlllYXJzOiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW1lQ291bnRlclwiPicgKyBteUFwcC51c2VySW5mby5jb3VudGRvd24ueWVhcnMgKyAnPC9zcGFuPicpO1xyXG5cdFx0XHRpZiAobXlBcHAub3RoZXJQZXJzb25JbmZvLnRpbWVyRW5nYWdlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudGRvd24gPSBteUFwcC5nZXRUaW1lUmVtYWluaW5nKG15QXBwLm90aGVyUGVyc29uSW5mby5kYXRlT2ZEZWF0aCk7XHJcblx0XHRcdFx0JCgncC5vdGhlclBlcnNvblNlY29uZHMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPlNlY29uZHM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudGRvd24uc2Vjb25kcyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdFx0JCgncC5vdGhlclBlcnNvbk1pbnV0ZXMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPk1pbnV0ZXM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudGRvd24ubWludXRlcyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdFx0JCgncC5vdGhlclBlcnNvbkhvdXJzJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJ0aW1lVGl0bGVcIj5Ib3VyczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50ZG93bi5ob3VycyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdFx0JCgncC5vdGhlclBlcnNvbkRheXMnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRpbWVUaXRsZVwiPkRheXM6IDwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVDb3VudGVyXCI+JyArIG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudGRvd24uZGF5cyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdFx0JCgncC5vdGhlclBlcnNvblllYXJzJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJ0aW1lVGl0bGVcIj5ZZWFyczogPC9zcGFuPjxzcGFuIGNsYXNzPVwidGltZUNvdW50ZXJcIj4nICsgbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50ZG93bi55ZWFycyArICc8L3NwYW4+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDEwMDApO1xyXG5cclxuXHR9XHJcbn07XHJcblxyXG5teUFwcC5nZXREYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuXHR2YXIgZGQgPSB0b2RheS5nZXREYXRlKCk7XHJcblx0dmFyIG1tID0gdG9kYXkuZ2V0TW9udGgoKSArIDE7IC8vSmFudWFyeSBpcyAwIVxyXG5cdHZhciB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcblx0aWYgKGRkIDwgMTApIHtcclxuXHRcdGRkID0gJzAnICsgZGRcclxuXHR9XHJcblxyXG5cdGlmIChtbSA8IDEwKSB7XHJcblx0XHRtbSA9ICcwJyArIG1tXHJcblx0fVxyXG5cdG15QXBwLmRhdGVPYmplY3QgPSB0b2RheTtcclxuXHRyZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG59O1xyXG5cclxubXlBcHAuZ2V0Q291bnRyaWVzID0gZnVuY3Rpb24oKSB7XHJcblx0bXlBcHAuZ2V0Q291bnRyaWVzQ2hlY2sgPSAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICdodHRwOi8vYXBpLnBvcHVsYXRpb24uaW86ODAvMS4wL2NvdW50cmllcycsXHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cclxuXHRcdH0pXHJcblx0XHQuZG9uZShmdW5jdGlvbihjb3VudHJpZXNBcnJheSkge1xyXG5cdFx0XHRteUFwcC5wYXJzZUNvdW50cmllcyhjb3VudHJpZXNBcnJheVsnY291bnRyaWVzJ10pO1xyXG5cdFx0XHQkKCcud29ybGRBUElzdGF0dXNJY29uJykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXInKTtcclxuXHRcdFx0JCgnLndvcmxkQVBJc3RhdHVzSWNvbicpLnJlbW92ZUNsYXNzKCdmYS1wdWxzZScpO1xyXG5cdFx0XHQkKCcud29ybGRBUElzdGF0dXNJY29uJykucmVtb3ZlQ2xhc3MoJ2ZhLTN4Jyk7XHJcblx0XHRcdCQoJy53b3JsZEFQSXN0YXR1c0ljb24nKS5yZW1vdmVDbGFzcygnZmEtZncnKTtcclxuXHRcdFx0JCgnLndvcmxkQVBJc3RhdHVzSWNvbicpLmFkZENsYXNzKCdmYS1jaGVjay1jaXJjbGUnKVxyXG5cclxuXHRcdH0pXHJcblx0XHQuZmFpbChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLmVycm9yTWVzc2FnZU92ZXJsYXknKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblxyXG5cdG15QXBwLnRlbGVwb3J0Q291bnRyaWVzQ2hlY2sgPSAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICdodHRwczovL2FwaS50ZWxlcG9ydC5vcmcvYXBpL2NvdW50cmllcy8nLFxyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHJcblx0XHR9KVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24odGVsZXBvcnRDb3VudHJpZXMpIHtcclxuXHRcdFx0bXlBcHAucGFyc2VUZWxlcG9ydENvdW50cmllcyh0ZWxlcG9ydENvdW50cmllcy5fbGlua3NbXCJjb3VudHJ5Oml0ZW1zXCJdKTtcclxuXHRcdFx0JCgnLnRlbGVwb3J0QVBJc3RhdHVzSWNvbicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyJyk7XHJcblx0XHRcdCQoJy50ZWxlcG9ydEFQSXN0YXR1c0ljb24nKS5yZW1vdmVDbGFzcygnZmEtcHVsc2UnKTtcclxuXHRcdFx0JCgnLnRlbGVwb3J0QVBJc3RhdHVzSWNvbicpLnJlbW92ZUNsYXNzKCdmYS0zeCcpO1xyXG5cdFx0XHQkKCcudGVsZXBvcnRBUElzdGF0dXNJY29uJykucmVtb3ZlQ2xhc3MoJ2ZhLWZ3Jyk7XHJcblx0XHRcdCQoJy50ZWxlcG9ydEFQSXN0YXR1c0ljb24nKS5hZGRDbGFzcygnZmEtY2hlY2stY2lyY2xlJylcclxuXHRcdH0pXHJcblx0XHQuZmFpbChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuXHRcdFx0JCgnLmVycm9yTWVzc2FnZU92ZXJsYXknKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHRcdH0pXHJcblx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xyXG5cdFx0fSk7XHJcbn07XHJcblxyXG5teUFwcC5wYXJzZUNvdW50cmllcyA9IGZ1bmN0aW9uKGFycmF5T2ZDb3VudHJpZXMpIHtcclxuXHR2YXIgY291bnRyaWVzID0ge307XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mQ291bnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb3VudHJpZXNbYXJyYXlPZkNvdW50cmllc1tpXV0gPSBhcnJheU9mQ291bnRyaWVzW2ldO1xyXG5cdH1cclxuXHQkKCcubG9hZGluZycpLnJlbW92ZSgpO1xyXG5cdG15QXBwLmNvdW50cmllcy5vYmplY3RGb3JtYXQgPSBjb3VudHJpZXM7XHJcblx0bXlBcHAuY291bnRyaWVzLmFycmF5Rm9ybWF0ID0gYXJyYXlPZkNvdW50cmllcztcclxuXHQvLyBteUFwcC5jb3VudHJpZXMuY2hlY2tPbmUgPSB0cnVlO1xyXG5cdHJldHVybiAnY291bnRyaWVzIHVwZGF0ZWQnO1xyXG59O1xyXG5cclxubXlBcHAucGFyc2VUZWxlcG9ydENvdW50cmllcyA9IGZ1bmN0aW9uKHRlbGVwb3J0Q291bnRyaWVzKSB7XHJcblx0dmFyIHRlbGVwb3J0Q291bnRyaWVzT2JqZWN0ID0ge307XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0ZWxlcG9ydENvdW50cmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dGVsZXBvcnRDb3VudHJpZXNPYmplY3RbdGVsZXBvcnRDb3VudHJpZXNbaV0ubmFtZV0gPSB0ZWxlcG9ydENvdW50cmllc1tpXVxyXG5cdH1cclxuXHRteUFwcC5jb3VudHJpZXMudGVsZXBvcnRDb3VudHJpZXNPYmplY3QgPSB0ZWxlcG9ydENvdW50cmllc09iamVjdDtcclxuXHRteUFwcC5jb3VudHJpZXMudGVsZXBvcnRDb3VudHJpZXNBcnJheSA9IHRlbGVwb3J0Q291bnRyaWVzO1xyXG5cdC8vIG15QXBwLmNvdW50cmllcy50ZWxlcG9ydENoZWNrID0gdHJ1ZTtcclxufTtcclxuXHJcbm15QXBwLmNyZWF0ZU1hc3RlckNvdW50cnlMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvbWJpbmVkQXJyYXkgPSBteUFwcC5jb3VudHJpZXMuYXJyYXlGb3JtYXQubWFwKGZ1bmN0aW9uKGNvdW50cnkpIHtcclxuXHRcdGlmIChteUFwcC5jb3VudHJpZXMudGVsZXBvcnRDb3VudHJpZXNPYmplY3RbY291bnRyeV0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gbXlBcHAuY291bnRyaWVzLnRlbGVwb3J0Q291bnRyaWVzT2JqZWN0W2NvdW50cnldXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gJyc7XHJcblx0XHR9XHJcblx0fSlcclxuXHR2YXIgZmluYWxpemVkQ291bnRyaWVzID0gY29tYmluZWRBcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0cmV0dXJuICEodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKTtcclxuXHR9KVxyXG5cdGNvbnN0IGZpbmFsQ291bnRyeU9iamVjdCA9IHt9O1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZmluYWxpemVkQ291bnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRmaW5hbENvdW50cnlPYmplY3RbZmluYWxpemVkQ291bnRyaWVzW2ldLm5hbWVdID0gZmluYWxpemVkQ291bnRyaWVzW2ldO1xyXG5cdH1cclxuXHRteUFwcC5maW5hbENvdW50cnlMaXN0ID0gZmluYWxDb3VudHJ5T2JqZWN0O1xyXG5cdGZvciAobGV0IGNvdW50cnkgaW4gbXlBcHAuZmluYWxDb3VudHJ5TGlzdCkge1xyXG5cdFx0JCgnLmNvdW50cnknKS5hcHBlbmQoJzxvcHRpb24gdmFsPVwiJyArIG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeV0ubmFtZS5yZXBsYWNlKC9cXHMvZ2ksICdfJykgKyAnXCI+JyArIG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeV0ubmFtZSArICc8L29wdGlvbj4nKTtcclxuXHR9XHJcbn07XHJcblxyXG5teUFwcC5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciB1c2VySW5mbyA9IHt9O1xyXG5cdHZhciB1c2VyWWVhcnMgPSAkKCcueWVhcnMnKS52YWwoKTtcclxuXHR2YXIgdXNlck1vbnRocyA9ICQoJy5tb250aHMnKS52YWwoKTtcclxuXHR2YXIgdXNlckdlbmRlciA9ICQoJy5nZW5kZXI6Y2hlY2tlZCcpLnZhbCgpO1xyXG5cclxuXHR1c2VySW5mby51c2VyQWdlID0gYCR7dXNlclllYXJzfXkke3VzZXJNb250aHN9bWA7XHJcblx0dXNlckluZm8uYWdlWWVhcnMgPSB1c2VyWWVhcnM7XHJcblx0dXNlckluZm8uY3VycmVudERhdGUgPSBteUFwcC50b2RheURhdGU7XHJcblx0dXNlckluZm8uY291bnRyeSA9ICQoJy51c2VySW5mb0lucHV0X19Gb3JtIC5jb3VudHJ5JykudmFsKCkucmVwbGFjZSgvXy9naSwgJyAnKTtcclxuXHR1c2VySW5mby5nZW5kZXIgPSB1c2VyR2VuZGVyO1xyXG5cclxuXHJcblx0bXlBcHAudXNlckluZm8gPSB1c2VySW5mbztcclxuXHRteUFwcC5vdGhlclBlcnNvbkluZm8gPSB7fTtcclxuXHRteUFwcC5vdGhlclBlcnNvbkluZm8udGltZXJFbmdhZ2VkID0gZmFsc2U7XHJcblxyXG5cdCQoJy5nZW5kZXJUZXh0JykudGV4dCh1c2VySW5mby5nZW5kZXIpO1xyXG5cdCQoJy5jb3VudHJ5VGV4dCcpLnRleHQodXNlckluZm8uY291bnRyeSk7XHJcblx0JCgnLmFnZVRleHQnKS50ZXh0KHVzZXJJbmZvLmFnZVllYXJzKTtcclxuXHJcblxyXG5cclxuXHRyZXR1cm4gdXNlckluZm87XHJcbn07XHJcblxyXG5teUFwcC5nZXREYXRlT2ZEZWF0aCA9IGZ1bmN0aW9uKHdobykgeyAvL25lZWQgdG8gZ2V0IGV2ZW4gd2hlbiBmb3Igb3RoZXIgcGVyc29uIHRvIGZpcmUgb25seSB3aGVuIHRoaXMgaXMgZG9uZS4uLiBjdXJyZW50bHkgZmlyaW5nIGluIHdyb25nIG9yZGVyIVxyXG5cdGlmICh3aG8gPT09ICd1c2VyJykge1xyXG5cdFx0dmFyIHBlcnNvbkluZm8gPSBteUFwcC5nZXRVc2VySW5mbygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgcGVyc29uSW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIG15QXBwLnVzZXJJbmZvKTtcclxuXHRcdHBlcnNvbkluZm8uY291bnRyeSA9ICQoJy5vdGhlclBlcnNvbl9fRm9ybSAuY291bnRyeScpLnZhbCgpO1xyXG5cdH1cclxuXHRteUFwcC51c2VySW5mby5kYXRlT2ZEZWF0aENoZWNrID0gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBgaHR0cDovL2FwaS5wb3B1bGF0aW9uLmlvOjgwLzEuMC9saWZlLWV4cGVjdGFuY3kvcmVtYWluaW5nLyR7cGVyc29uSW5mby5nZW5kZXJ9LyR7cGVyc29uSW5mby5jb3VudHJ5fS8ke3BlcnNvbkluZm8uY3VycmVudERhdGV9LyR7cGVyc29uSW5mby51c2VyQWdlfS9gLFxyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdH0pXHJcblx0XHQuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdHZhciBkYXRlT2ZEZWF0aCA9IChEYXRlLnBhcnNlKG15QXBwLnRvZGF5RGF0ZSkgKyAoZGF0YS5yZW1haW5pbmdfbGlmZV9leHBlY3RhbmN5ICogMy4xNTRlKzEwKSk7IC8vbnVtYmVyIGlzIGFwcHJveCBtaWxpc2VjIGluIHllYXJcclxuXHRcdFx0aWYgKHdobyA9PT0gJ3VzZXInKSB7XHJcblx0XHRcdFx0bXlBcHAudXNlckluZm8uZGF0ZU9mRGVhdGggPSBkYXRlT2ZEZWF0aDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRteUFwcC5vdGhlclBlcnNvbkluZm8uZGF0ZU9mRGVhdGggPSBkYXRlT2ZEZWF0aDtcclxuXHRcdFx0XHRteUFwcC5vdGhlclBlcnNvbkluZm8udGltZXJFbmdhZ2VkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG5cdFx0XHQkKCcuZXJyb3JNZXNzYWdlT3ZlcmxheScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0fSlcclxuXHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbm15QXBwLmdldFRpbWVSZW1haW5pbmcgPSBmdW5jdGlvbihkYXRlT2ZEZWF0aCkgeyAvL3Rha2VzIGRhdGUgb2YgZGVhdGggaW4gRXBvY2ggdGltZVxyXG5cdHZhciB0ID0gZGF0ZU9mRGVhdGggLSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpO1xyXG5cdHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigodCAvIDEwMDApICUgNjApO1xyXG5cdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigodCAvIDEwMDAgLyA2MCkgJSA2MCk7XHJcblx0dmFyIGhvdXJzID0gTWF0aC5mbG9vcigodCAvICgxMDAwICogNjAgKiA2MCkpICUgMjQpO1xyXG5cdHZhciBkYXlzID0gTWF0aC5mbG9vcih0IC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKSAlIDM2NTtcclxuXHR2YXIgeWVhcnMgPSBNYXRoLmZsb29yKHQgLyAoMTAwMCAqIDYwICogNjAgKiAyNCAqIDM2NSkpO1xyXG5cdHJldHVybiB7XHJcblx0XHQndG90YWwnOiB0LFxyXG5cdFx0J3llYXJzJzogeWVhcnMsXHJcblx0XHQnZGF5cyc6IGRheXMsXHJcblx0XHQnaG91cnMnOiBob3VycyxcclxuXHRcdCdtaW51dGVzJzogbWludXRlcyxcclxuXHRcdCdzZWNvbmRzJzogc2Vjb25kc1xyXG5cdH07XHJcbn07XHJcblxyXG5teUFwcC5nZXRTYWxhcnlJbmZvID0gZnVuY3Rpb24oY291bnRyeUhSRUYpIHtcclxuXHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBjb3VudHJ5SFJFRixcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHRcdC8vIGRhdGE6IHtwYXJhbTE6ICd2YWx1ZTEnfSxcclxuXHRcdH0pXHJcblx0XHQuZG9uZShmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG5cdFx0XHQkKCcuZXJyb3JNZXNzYWdlT3ZlcmxheScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0fSlcclxuXHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XHJcblx0XHR9KTtcclxuXHJcbn1cclxuXHJcbm15QXBwLmNyZWF0ZU1hc3RlclNhbGFyaWVzTGlzdCA9IGZ1bmN0aW9uKGxlZnREYXRhLCByaWdodERhdGEpIHtcclxuXHRjb25zdCBsZWZ0Q291bnRyeSA9IG15QXBwLnVzZXJJbmZvLmNvdW50cnk7XHJcblx0Y29uc3QgcmlnaHRDb3VudHJ5ID0gbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnk7XHJcblx0Y29uc3QgbGVmdFNhbGFyaWVzID0gbGVmdERhdGFbMF0uc2FsYXJpZXM7XHJcblx0Y29uc3QgcmlnaHRTYWxhcmllcyA9IHJpZ2h0RGF0YVswXS5zYWxhcmllcztcclxuXHRjb25zdCBzYWxhcmllc0xpc3QgPSB7fTtcclxuXHRmb3IgKGxldCBqb2IgaW4gbGVmdFNhbGFyaWVzKSB7XHJcblx0XHRsZXQgam9iVGl0bGUgPSBsZWZ0U2FsYXJpZXNbam9iXVsnam9iJ11bJ3RpdGxlJ107XHJcblx0XHRsZXQgam9iU2FsYXJpZXMgPSBsZWZ0U2FsYXJpZXNbam9iXVsnc2FsYXJ5X3BlcmNlbnRpbGVzJ107XHJcblx0XHRzYWxhcmllc0xpc3Rbam9iVGl0bGVdID0ge307XHJcblx0XHRzYWxhcmllc0xpc3Rbam9iVGl0bGVdWyd0aXRsZSddID0gam9iVGl0bGU7XHJcblx0XHRzYWxhcmllc0xpc3Rbam9iVGl0bGVdW2xlZnRDb3VudHJ5XSA9IHt9O1xyXG5cdFx0c2FsYXJpZXNMaXN0W2pvYlRpdGxlXVtyaWdodENvdW50cnldID0ge307XHJcblx0XHRzYWxhcmllc0xpc3Rbam9iVGl0bGVdW2xlZnRDb3VudHJ5XSA9IGpvYlNhbGFyaWVzO1xyXG5cdFx0bGV0IGpvYlNhbGFyaWVzUmlnaHQ7XHJcblx0XHRpZiAocmlnaHRTYWxhcmllc1tqb2JdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0am9iU2FsYXJpZXNSaWdodCA9IE9iamVjdC5hc3NpZ24oe30sbGVmdFNhbGFyaWVzW2pvYl1bJ3NhbGFyeV9wZXJjZW50aWxlcyddKTtcclxuXHRcdFx0am9iU2FsYXJpZXNSaWdodC5wZXJjZW50aWxlXzUwID0gMDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGpvYlNhbGFyaWVzUmlnaHQgPSByaWdodFNhbGFyaWVzW2pvYl1bJ3NhbGFyeV9wZXJjZW50aWxlcyddO1xyXG5cdFx0fVxyXG5cdFx0c2FsYXJpZXNMaXN0W2pvYlRpdGxlXVtyaWdodENvdW50cnldID0gam9iU2FsYXJpZXNSaWdodDtcclxuXHR9XHJcblx0bXlBcHAuam9iU2FsYXJpZXNMaXN0ID0gc2FsYXJpZXNMaXN0O1xyXG5cdG15QXBwLmdldEF2ZXJhZ2VTYWxhcnkoKTtcclxuXHRteUFwcC5wb3B1bGF0ZUpvYkxpc3QoKTtcclxufTtcclxuXHJcbm15QXBwLmdldEF2ZXJhZ2VTYWxhcnkgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBsZWZ0Q291bnRyeSA9IG15QXBwLnVzZXJJbmZvLmNvdW50cnk7XHJcblx0Y29uc3QgcmlnaHRDb3VudHJ5ID0gbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnk7XHJcblx0bGV0IHJ1bm5pbmdUb3RhbExlZnQgPSAwO1xyXG5cdGxldCBydW5uaW5nVG90YWxSaWdodCA9IDA7XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdGZvciAobGV0IGpvYiBpbiBteUFwcC5qb2JTYWxhcmllc0xpc3QpIHtcclxuXHRcdHJ1bm5pbmdUb3RhbExlZnQgPSBydW5uaW5nVG90YWxMZWZ0ICsgbXlBcHAuam9iU2FsYXJpZXNMaXN0W2pvYl1bbGVmdENvdW50cnldWydwZXJjZW50aWxlXzUwJ107XHJcblx0XHRydW5uaW5nVG90YWxSaWdodCA9IHJ1bm5pbmdUb3RhbFJpZ2h0ICsgbXlBcHAuam9iU2FsYXJpZXNMaXN0W2pvYl1bcmlnaHRDb3VudHJ5XVsncGVyY2VudGlsZV81MCddO1xyXG5cdFx0Y291bnRlcisrO1xyXG5cdH1cclxuXHRsZXQgYXZlcmFnZUxlZnQgPSBydW5uaW5nVG90YWxMZWZ0IC8gY291bnRlcjtcclxuXHRsZXQgYXZlcmFnZVJpZ2h0ID0gcnVubmluZ1RvdGFsUmlnaHQgLyBjb3VudGVyO1xyXG5cdG15QXBwLmpvYlNhbGFyaWVzTGlzdFsnT3ZlcmFsbCBBdmVyYWdlJ10gPSB7fTtcclxuXHRteUFwcC5qb2JTYWxhcmllc0xpc3RbJ092ZXJhbGwgQXZlcmFnZSddW2xlZnRDb3VudHJ5XSA9IGF2ZXJhZ2VMZWZ0O1xyXG5cdG15QXBwLmpvYlNhbGFyaWVzTGlzdFsnT3ZlcmFsbCBBdmVyYWdlJ11bcmlnaHRDb3VudHJ5XSA9IGF2ZXJhZ2VSaWdodDtcclxuXHRteUFwcC5qb2JTYWxhcmllc0xpc3RbJ092ZXJhbGwgQXZlcmFnZSddLnRpdGxlID0gJ092ZXJhbGwgQXZlcmFnZSc7XHJcbn1cclxuXHJcbm15QXBwLnBvcHVsYXRlSm9iTGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cdGZvciAobGV0IGpvYiBpbiBteUFwcC5qb2JTYWxhcmllc0xpc3QpIHtcclxuXHRcdCQoJy5qb2JJbmZvX19zZWxlY3QnKS5hcHBlbmQoJzxvcHRpb24gdmFsPVwiJyArIG15QXBwLmpvYlNhbGFyaWVzTGlzdFtqb2JdLnRpdGxlLnJlcGxhY2UoL1xccy9naSwgJ18nKSArICdcIj4nICsgbXlBcHAuam9iU2FsYXJpZXNMaXN0W2pvYl0udGl0bGUgKyAnPC9vcHRpb24+JylcclxuXHR9XHJcblx0JCgnLmpvYkxvYWRpbmcnKS5yZW1vdmUoKTtcclxufVxyXG5cclxubXlBcHAuY2hhcnRKb2JzID0gZnVuY3Rpb24oam9iKSB7XHJcblx0JCgnLmpvYkNoYXJ0X19jb250YWluZXInKS5odG1sKCc8Y2FudmFzIGlkPVwiam9iQ2hhcnRcIiBjbGFzcz1cImpvYkNoYXJ0XCI+PC9jYW52YXM+Jyk7XHJcblx0bGV0IHdoZXJlVG9QdXRDaGFydCA9ICQoJyNqb2JDaGFydCcpO1xyXG5cdGxldCBsZWZ0Q291bnRyeSA9IG15QXBwLnVzZXJJbmZvLmNvdW50cnk7XHJcblx0bGV0IHJpZ2h0Q291bnRyeSA9IG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5O1xyXG5cdGxldCBqb2JUaXRsZTtcclxuXHRsZXQgZGF0YUFycmF5O1xyXG5cdGlmIChqb2IgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0am9iVGl0bGUgPSAnT3ZlcmFsbCBBdmVyYWdlJ1xyXG5cdH0gZWxzZSB7XHJcblx0XHRqb2JUaXRsZSA9IGpvYi50aXRsZTtcclxuXHR9XHJcblx0aWYgKGpvYlRpdGxlID09PSAnT3ZlcmFsbCBBdmVyYWdlJykge1xyXG5cdFx0ZGF0YUFycmF5ID0gW01hdGguZmxvb3IobXlBcHAuam9iU2FsYXJpZXNMaXN0W2pvYlRpdGxlXVtsZWZ0Q291bnRyeV0pLCBNYXRoLmZsb29yKG15QXBwLmpvYlNhbGFyaWVzTGlzdFtqb2JUaXRsZV1bcmlnaHRDb3VudHJ5XSldO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRkYXRhQXJyYXkgPSBbTWF0aC5mbG9vcihteUFwcC5qb2JTYWxhcmllc0xpc3Rbam9iVGl0bGVdW2xlZnRDb3VudHJ5XVsncGVyY2VudGlsZV81MCddKSwgTWF0aC5mbG9vcihteUFwcC5qb2JTYWxhcmllc0xpc3Rbam9iVGl0bGVdW3JpZ2h0Q291bnRyeV1bJ3BlcmNlbnRpbGVfNTAnXSldO1xyXG5cdH1cclxuXHR2YXIgam9iQ2hhcnQgPSBuZXcgQ2hhcnQod2hlcmVUb1B1dENoYXJ0LCB7XHJcblx0XHR0eXBlOiAnYmFyJyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0bGFiZWxzOiBbbGVmdENvdW50cnksIHJpZ2h0Q291bnRyeV0sXHJcblx0XHRcdGRhdGFzZXRzOiBbe1xyXG5cdFx0XHRcdGxhYmVsOiAnQXZlcmFnZSBTYWxhcnknLFxyXG5cdFx0XHRcdGRhdGE6IGRhdGFBcnJheSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFtcclxuXHRcdFx0XHRcdCcjRkZCQjAwJyxcclxuXHRcdFx0XHRcdCcjQTRBNEEzJ1xyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IFtcclxuXHRcdFx0XHRcdCcjRkZCQjAwJyxcclxuXHRcdFx0XHRcdCcjQTRBNEEzJyxcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAyXHJcblx0XHRcdH1dXHJcblx0XHR9LFxyXG5cdFx0b3B0aW9uczoge1xyXG5cdFx0XHRsYXlvdXQ6IHtcclxuXHRcdFx0XHRwYWRkaW5nOiB7XHJcblx0XHRcdFx0XHRsZWZ0OiAxMCxcclxuXHRcdFx0XHRcdHRvcDogMjAsXHJcblx0XHRcdFx0XHRib3R0b206IDIwXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY2FsZXM6IHtcclxuXHRcdFx0XHR5QXhlczogW3tcclxuXHRcdFx0XHRcdGdyaWRMaW5lczoge1xyXG5cdFx0XHRcdFx0XHRjb2xvcjogXCIjNTI1MjUzXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aWNrczoge1xyXG5cdFx0XHRcdFx0XHRiZWdpbkF0WmVybzogdHJ1ZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdHhBeGVzOiBbe1xyXG5cdFx0XHRcdFx0Z3JpZExpbmVzOiB7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6IGZhbHNlLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpY2tzOiB7XHJcblx0XHRcdFx0XHRcdGZvbnRDb2xvcjogXCIjZmZmXCIsIC8vIHRoaXMgaGVyZVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0fSxcclxuXHRcdFx0dGl0bGU6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHRleHQ6IGpvYlRpdGxlICsgXCIgU2FsYXJ5XCIsXHJcblx0XHRcdFx0Zm9udFNpemU6IDI0LFxyXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiJ09zd2FsZCcsIHNhbnMtc2VyaWZcIixcclxuXHRcdFx0XHRmb250Q29sb3I6ICd3aGl0ZSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IHRydWVcclxuXHRcdH0sXHJcblx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmdldFlvdXJBZ2VQb3AgPSBmdW5jdGlvbihjb3VudHJ5LCBhZ2UpIHtcclxuXHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBgaHR0cDovL2FwaS5wb3B1bGF0aW9uLmlvOjgwLzEuMC9wb3B1bGF0aW9uLyR7bXlBcHAuZGF0ZU9iamVjdC5nZXRGdWxsWWVhcigpfS8ke2NvdW50cnl9LyR7YWdlfS9gLFxyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHRcdH0pXHJcblx0XHQuZG9uZShmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xyXG5cdFx0fSlcclxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG5cdFx0XHQkKCcuZXJyb3JNZXNzYWdlT3ZlcmxheScpLmZhZGVJbignZmFzdCcpO1xyXG5cdFx0fSlcclxuXHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XHJcblx0XHR9KTtcclxufVxyXG5cclxubXlBcHAuY2hhcnRBZ2VHZW5kZXJQb3AgPSBmdW5jdGlvbihsZWZ0R2VuZGVyUG9wLCByaWdodEdlbmRlclBvcCkge1xyXG5cdCQoJy5hZ2VHZW5kZXJQb3BDaGFydF9fY29udGFpbmVyJykuaHRtbCgnPGNhbnZhcyBpZD1cImFnZUdlbmRlclBvcENoYXJ0XCIgY2xhc3M9XCJhZ2VHZW5kZXJQb3BDaGFydFwiPjwvY2FudmFzPicpO1xyXG5cdGxldCB3aGVyZVRvUHV0Q2hhcnQgPSAkKCcjYWdlR2VuZGVyUG9wQ2hhcnQnKTtcclxuXHRsZXQgbGVmdENvdW50cnkgPSBteUFwcC51c2VySW5mby5jb3VudHJ5O1xyXG5cdGxldCByaWdodENvdW50cnkgPSBteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeTtcclxuXHRsZXQgY2FwaXRhbGl6ZWRHZW5kZXIgPSBteUFwcC51c2VySW5mby5nZW5kZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBteUFwcC51c2VySW5mby5nZW5kZXIuc2xpY2UoMSk7XHJcblxyXG5cclxuXHR2YXIgYWdlR2VuZGVyUG9wQ2hhcnQgPSBuZXcgQ2hhcnQod2hlcmVUb1B1dENoYXJ0LCB7XHJcblx0XHR0eXBlOiAnYmFyJyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0bGFiZWxzOiBbbGVmdENvdW50cnksIHJpZ2h0Q291bnRyeV0sXHJcblx0XHRcdGRhdGFzZXRzOiBbe1xyXG5cdFx0XHRcdGxhYmVsOiAnUG9wdWxhdGlvbiBvZiAnICsgbXlBcHAudXNlckluZm8uYWdlWWVhcnMgKyAneWVhciBvbGQgJyArIG15QXBwLnVzZXJJbmZvLmdlbmRlciArICdzJyxcclxuXHRcdFx0XHRkYXRhOiBbbGVmdEdlbmRlclBvcCwgcmlnaHRHZW5kZXJQb3BdLFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRib3JkZXJDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnLFxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDJcclxuXHRcdFx0fV1cclxuXHRcdH0sXHJcblx0XHRvcHRpb25zOiB7XHJcblx0XHRcdGxheW91dDoge1xyXG5cdFx0XHRcdHBhZGRpbmc6IHtcclxuXHRcdFx0XHRcdGxlZnQ6IDEwLFxyXG5cdFx0XHRcdFx0dG9wOiAyMCxcclxuXHRcdFx0XHRcdGJvdHRvbTogMjBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNjYWxlczoge1xyXG5cdFx0XHRcdHlBeGVzOiBbe1xyXG5cdFx0XHRcdFx0Z3JpZExpbmVzOiB7XHJcblx0XHRcdFx0XHRcdGNvbG9yOiBcIiM1MjUyNTNcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpY2tzOiB7XHJcblx0XHRcdFx0XHRcdGJlZ2luQXRaZXJvOiB0cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0eEF4ZXM6IFt7XHJcblx0XHRcdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogZmFsc2UsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dGlja3M6IHtcclxuXHRcdFx0XHRcdFx0Zm9udENvbG9yOiBcIiNmZmZcIiwgLy8gdGhpcyBoZXJlXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogJ1BvcHVsYXRpb24gb2YgJyArIG15QXBwLnVzZXJJbmZvLmFnZVllYXJzICsgJyBZZWFyIE9sZCAnICsgY2FwaXRhbGl6ZWRHZW5kZXIgKyAncycsXHJcblx0XHRcdFx0Zm9udFNpemU6IDI0LFxyXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiJ09zd2FsZCcsIHNhbnMtc2VyaWZcIixcclxuXHRcdFx0XHRmb250Q29sb3I6ICd3aGl0ZSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IHRydWVcclxuXHRcdH0sXHJcblx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmNoYXJ0R2VuQnJlYWtkb3duID0gZnVuY3Rpb24oYWxsTGVmdEdlbkRhdGEsIGxlZnRPclJpZ2h0KSB7XHJcblx0bGV0IHdoZXJlVG9QdXRDaGFydDtcclxuXHRsZXQgbWFsZUNvbG9yID0gJyNBNEE0QTMnO1xyXG5cdGxldCBmZW1hbGVDb2xvciA9ICcjQTRBNEEzJztcclxuXHRpZiAobXlBcHAudXNlckluZm8uZ2VuZGVyID09ICdtYWxlJykge1xyXG5cdFx0bWFsZUNvbG9yID0gJyNGRkJCMDAnO1xyXG5cdH1cclxuXHRpZiAobXlBcHAudXNlckluZm8uZ2VuZGVyID09ICdmZW1hbGUnKSB7XHJcblx0XHRmZW1hbGVDb2xvciA9ICcjRkZCQjAwJztcclxuXHR9XHJcblx0aWYgKGxlZnRPclJpZ2h0ID09ICdsZWZ0Jykge1xyXG5cdFx0d2hlcmVUb1B1dENoYXJ0ID0gJCgnI21hbGVWc0ZlbWFsZXJQb3BDaGFydExlZnQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hlcmVUb1B1dENoYXJ0ID0gJCgnI21hbGVWc0ZlbWFsZXJQb3BDaGFydFJpZ2h0Jyk7XHJcblx0fVxyXG5cdGxldCBsZWZ0Q291bnRyeSA9IG15QXBwLnVzZXJJbmZvLmNvdW50cnk7XHJcblx0bGV0IHJpZ2h0Q291bnRyeSA9IG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5O1xyXG5cdHZhciBtYWxlVnNGZW1hbGVyUG9wQ2hhcnQgPSBuZXcgQ2hhcnQod2hlcmVUb1B1dENoYXJ0LCB7XHJcblx0XHR0eXBlOiAncGllJyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0bGFiZWxzOiBbbXlBcHAudXNlckluZm8uYWdlWWVhcnMgKyAnWWVhciBPbGQgTWFsZXMnLCBteUFwcC51c2VySW5mby5hZ2VZZWFycyArICdZZWFyIE9sZCBGZW1hbGVzJ10sXHJcblx0XHRcdGRhdGFzZXRzOiBbe1xyXG5cdFx0XHRcdGxhYmVsOiAnUG9wdWxhdGlvbiBvZiAnICsgbXlBcHAudXNlckluZm8uYWdlWWVhcnMgKyAneWVhciBvbGQgJyArIG15QXBwLnVzZXJJbmZvLmdlbmRlciArICdzJyxcclxuXHRcdFx0XHRkYXRhOiBbYWxsTGVmdEdlbkRhdGFbJ21hbGVzJ10sIGFsbExlZnRHZW5EYXRhWydmZW1hbGVzJ11dLFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogW1xyXG5cdFx0XHRcdFx0bWFsZUNvbG9yLFxyXG5cdFx0XHRcdFx0ZmVtYWxlQ29sb3JcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBbXHJcblx0XHRcdFx0XHRtYWxlQ29sb3IsXHJcblx0XHRcdFx0XHRmZW1hbGVDb2xvcixcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAyXHJcblx0XHRcdH1dXHJcblx0XHR9LFxyXG5cdFx0b3B0aW9uczoge1xyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogJ01hbGUgYW5kIEZlbWFsZSBQb3B1bGF0aW9uIEJyZWFrZG93bicsXHJcblx0XHRcdFx0Zm9udFNpemU6IDI0LFxyXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiJ09zd2FsZCcsIHNhbnMtc2VyaWZcIixcclxuXHRcdFx0XHRmb250Q29sb3I6ICd3aGl0ZSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IHRydWVcclxuXHRcdH0sXHJcblx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmdldEdsb2JhbEFnZVBvcCA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGBodHRwOi8vYXBpLnBvcHVsYXRpb24uaW86ODAvMS4wL3BvcHVsYXRpb24vJHtteUFwcC5kYXRlT2JqZWN0LmdldEZ1bGxZZWFyKCl9L2FnZWQvJHtteUFwcC51c2VySW5mby5hZ2VZZWFyc30vYCxcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHR9KVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcclxuXHRcdH0pXHJcblx0XHQuZmFpbChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuXHRcdFx0JCgnLmVycm9yTWVzc2FnZU92ZXJsYXknKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHRcdH0pXHJcblx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmNyZWF0ZUdsb2JhbEFnZVBvcERhdGFBcnJheXMgPSBmdW5jdGlvbigpIHtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMgPSB7fTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMgPSB7fVxyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5sYWJlbHMgPSBbXTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMubnVtYmVycyA9IFtdO1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzID0ge31cclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5sYWJlbHMgPSBbXTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5udW1iZXJzID0gW107XHJcblx0Zm9yIChsZXQgY291bnRyeSBpbiBteUFwcC5maW5hbENvdW50cnlMaXN0KSB7XHJcblx0XHRsZXQgY291bnRyeUxhYmVsID0gbXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5XS5uYW1lO1xyXG5cdFx0bGV0IGNvdW50cnlNYWxlUG9wID0gbXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5XS5wb3B1bGF0aW9uT2ZBZ2UubWFsZXM7XHJcblx0XHRsZXQgY291bnRyeUZlbWFsZVBvcCA9IG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeV0ucG9wdWxhdGlvbk9mQWdlLmZlbWFsZXM7XHJcblx0XHRsZXQgbWFsZURhdGFBcnJheSA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5udW1iZXJzO1xyXG5cdFx0bGV0IGZlbWFsZURhdGFBcnJheSA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLm51bWJlcnM7XHJcblx0XHRsZXQgbWFsZUxhYmVsQXJyYXkgPSBteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMubGFiZWxzO1xyXG5cdFx0bGV0IGZlbWFsZUxhYmVsQXJyYXkgPSBteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5sYWJlbHM7XHJcblx0XHRpZiAoIShjb3VudHJ5TGFiZWwgPT09IG15QXBwLnVzZXJJbmZvLmNvdW50cnkgfHwgY291bnRyeUxhYmVsID09PSBteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeSkpIHtcclxuXHRcdFx0ZmVtYWxlTGFiZWxBcnJheS5wdXNoKGNvdW50cnlMYWJlbCk7XHJcblx0XHRcdG1hbGVMYWJlbEFycmF5LnB1c2goY291bnRyeUxhYmVsKTtcclxuXHRcdFx0bWFsZURhdGFBcnJheS5wdXNoKGNvdW50cnlNYWxlUG9wKTtcclxuXHRcdFx0ZmVtYWxlRGF0YUFycmF5LnB1c2goY291bnRyeUZlbWFsZVBvcClcclxuXHRcdH07XHJcblx0fVxyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5sYWJlbHMudW5zaGlmdChteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeSk7XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLmZlbWFsZXMubGFiZWxzLnVuc2hpZnQobXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnkpO1xyXG5cdG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5tYWxlcy5udW1iZXJzLnVuc2hpZnQobXlBcHAuZmluYWxDb3VudHJ5TGlzdFtteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeV0ucG9wdWxhdGlvbk9mQWdlLm1hbGVzKTtcclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5udW1iZXJzLnVuc2hpZnQobXlBcHAuZmluYWxDb3VudHJ5TGlzdFtteUFwcC5vdGhlclBlcnNvbkluZm8uY291bnRyeV0ucG9wdWxhdGlvbk9mQWdlLmZlbWFsZXMpO1xyXG5cclxuXHRteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMubGFiZWxzLnVuc2hpZnQobXlBcHAudXNlckluZm8uY291bnRyeSk7XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLmZlbWFsZXMubGFiZWxzLnVuc2hpZnQobXlBcHAudXNlckluZm8uY291bnRyeSk7XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLm1hbGVzLm51bWJlcnMudW5zaGlmdChteUFwcC5maW5hbENvdW50cnlMaXN0W215QXBwLnVzZXJJbmZvLmNvdW50cnldLnBvcHVsYXRpb25PZkFnZS5tYWxlcyk7XHJcblx0bXlBcHAuZ2xvYmFsQWdlUG9wQXJyYXlzLmZlbWFsZXMubnVtYmVycy51bnNoaWZ0KG15QXBwLmZpbmFsQ291bnRyeUxpc3RbbXlBcHAudXNlckluZm8uY291bnRyeV0ucG9wdWxhdGlvbk9mQWdlLmZlbWFsZXMpO1xyXG59XHJcblxyXG5teUFwcC5tYWtlQ29sb3VyQXJyYXkgPSBmdW5jdGlvbihkYXRhQXJyYXksIGNvbG91cikge1xyXG5cdGxldCByZXR1cm5BcnJheSA9IFtdO1xyXG5cdGRhdGFBcnJheS5mb3JFYWNoKChpdGVtKSA9PiByZXR1cm5BcnJheS5wdXNoKGNvbG91cikpOyAvL21ha2UgYSBncmV5IGVudHJ5IGZvciBlYWNoIGNvdW50cnkgdGhhdCB3aWxsIGJlIG9uIHRoZSBncmFwaFxyXG5cdHJldHVybkFycmF5LnBvcCgpOyAvL2Ryb3Agb2ZmIDIgZ3JleXMgZm9yIHRoZSAyIGNvbG91cmVkIGNvdW50cmllcy5cclxuXHRyZXR1cm5BcnJheS5wb3AoKTtcclxuXHRyZXR1cm4gcmV0dXJuQXJyYXk7XHJcbn1cclxuXHJcbm15QXBwLmNoYXJ0R2VuR2xvYmFsQWdlUG9wRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cdGxldCB3aGVyZVRvUHV0Q2hhcnQgPSAkKCcjZ2xvYmFsQWdlR2VuUG9wQ2hhcnQnKTtcclxuXHRsZXQgZ2VuZGVyTGFiZWxzO1xyXG5cdGxldCBnZW5kZXJEYXRhO1xyXG5cdGlmIChteUFwcC51c2VySW5mby5nZW5kZXIgPT0gJ21hbGUnKSB7XHJcblx0XHRnZW5kZXJMYWJlbHMgPSBteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMubGFiZWxzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRnZW5kZXJMYWJlbHMgPSBteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMuZmVtYWxlcy5sYWJlbHNcclxuXHR9XHJcblx0aWYgKG15QXBwLnVzZXJJbmZvLmdlbmRlciA9PSAnbWFsZScpIHtcclxuXHRcdGdlbmRlckRhdGEgPSBteUFwcC5nbG9iYWxBZ2VQb3BBcnJheXMubWFsZXMubnVtYmVycztcclxuXHR9IGVsc2Uge1xyXG5cdFx0Z2VuZGVyRGF0YSA9IG15QXBwLmdsb2JhbEFnZVBvcEFycmF5cy5mZW1hbGVzLm51bWJlcnNcclxuXHR9XHJcblx0bGV0IGNvbG91ckFycmF5ID0gbXlBcHAubWFrZUNvbG91ckFycmF5KGdlbmRlckRhdGEsICdyZ2IoMTA5LDEwOSwxMDkpJyk7XHJcblx0bGV0IGJvcmRlckNvbG91ckFycmF5ID0gbXlBcHAubWFrZUNvbG91ckFycmF5KGdlbmRlckRhdGEsICdibGFjaycpO1xyXG5cdHZhciBnbG9iYWxHZW5BZ2VDaGFydCA9IG5ldyBDaGFydCh3aGVyZVRvUHV0Q2hhcnQsIHtcclxuXHRcdHR5cGU6ICdwaWUnLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRsYWJlbHM6IGdlbmRlckxhYmVscyxcclxuXHRcdFx0ZGF0YXNldHM6IFt7XHJcblx0XHRcdFx0bGFiZWw6ICdQb3B1bGF0aW9uIG9mICcgKyBteUFwcC51c2VySW5mby5hZ2VZZWFycyArICcgWWVhciBPbGQgJyArIG15QXBwLnVzZXJJbmZvLmdlbmRlciArICdzLicsXHJcblx0XHRcdFx0ZGF0YTogZ2VuZGVyRGF0YSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFtcclxuXHRcdFx0XHRcdCcjRkZCQjAwJyxcclxuXHRcdFx0XHRcdCcjQTRBNEEzJyxcclxuXHRcdFx0XHRcdC4uLmNvbG91ckFycmF5XHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRib3JkZXJDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnLFxyXG5cdFx0XHRcdFx0Li4uY29sb3VyQXJyYXlcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAxXHJcblx0XHRcdH1dXHJcblx0XHR9LFxyXG5cdFx0b3B0aW9uczoge1xyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogJ0dsb2JhbCBwb3B1bGF0aW9uIG9mICcgKyBteUFwcC51c2VySW5mby5hZ2VZZWFycyArICcgWWVhciBPbGQgJyArIG15QXBwLnVzZXJJbmZvLmdlbmRlciArICdzLicsXHJcblx0XHRcdFx0Zm9udFNpemU6IDI0LFxyXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiJ09zd2FsZCcsIHNhbnMtc2VyaWZcIixcclxuXHRcdFx0XHRmb250Q29sb3I6ICd3aGl0ZSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IHRydWVcclxuXHRcdH0sXHJcblx0fSk7XHJcbn1cclxuXHJcbm15QXBwLmdldFRvdGFsUG9wdWxhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGBodHRwOi8vYXBpLnBvcHVsYXRpb24uaW86ODAvMS4wL3BvcHVsYXRpb24vV29ybGQvJHtteUFwcC50b2RheURhdGV9L2AsXHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ0pTT04nLFxyXG5cdFx0fSlcclxuXHRcdC5kb25lKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcblx0XHRcdCQoJy5lcnJvck1lc3NhZ2VPdmVybGF5JykuZmFkZUluKCdmYXN0Jyk7XHJcblx0XHR9KVxyXG5cdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG5teUFwcC5nZXRHbG9iYWxBZ2VDb3VudCA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGBodHRwOi8vYXBpLnBvcHVsYXRpb24uaW86ODAvMS4wL3BvcHVsYXRpb24vJHtteUFwcC5kYXRlT2JqZWN0LmdldEZ1bGxZZWFyKCl9L1dvcmxkLyR7bXlBcHAudXNlckluZm8uYWdlWWVhcnN9L2AsXHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ0pTT04nLFxyXG5cdFx0fSlcclxuXHRcdC5kb25lKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcblx0XHRcdCQoJy5lcnJvck1lc3NhZ2VPdmVybGF5JykuZmFkZUluKCdmYXN0Jyk7XHJcblx0XHR9KVxyXG5cdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG5teUFwcC5jaGFydEdsb2JhbEFnZUNvbXBhcmUgPSBmdW5jdGlvbihudW1iZXJPZmFnZVllYXJPbGRzLCBudW1iZXJPZkh1bWFuc01pbnVzQWdlKSB7XHJcblx0bGV0IHdoZXJlVG9QdXRDaGFydCA9ICQoJyNnbG9iYWxQb3BWc0FnZUNoYXJ0JylcclxuXHR2YXIgZ2xvYmFsQWdlQ29tcGFyZWVDaGFydCA9IG5ldyBDaGFydCh3aGVyZVRvUHV0Q2hhcnQsIHtcclxuXHRcdHR5cGU6ICdwaWUnLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRsYWJlbHM6IFtgTnVtYmVyIG9mICR7bXlBcHAudXNlckluZm8uYWdlWWVhcnN9IFllYXIgT2xkc2AsICdSZW1haW5pbmcgR2xvYmFsIFBvcHVsYXRpb24nXSxcclxuXHRcdFx0ZGF0YXNldHM6IFt7XHJcblx0XHRcdFx0bGFiZWw6ICdQb3B1bGF0aW9uJyxcclxuXHRcdFx0XHRkYXRhOiBbbnVtYmVyT2ZhZ2VZZWFyT2xkcywgbnVtYmVyT2ZIdW1hbnNNaW51c0FnZV0sXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBbXHJcblx0XHRcdFx0XHQnI0ZGQkIwMCcsXHJcblx0XHRcdFx0XHQnI0E0QTRBMycsXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRib3JkZXJDb2xvcjogW1xyXG5cdFx0XHRcdFx0JyNGRkJCMDAnLFxyXG5cdFx0XHRcdFx0JyNBNEE0QTMnLFxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDFcclxuXHRcdFx0fV1cclxuXHRcdH0sXHJcblx0XHRvcHRpb25zOiB7XHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiAnTnVtYmVyIG9mICcgKyBteUFwcC51c2VySW5mby5hZ2VZZWFycyArICcgWWVhciBPbGRzIG91dCBvZiBHbG9iYWwgUG9wdWxhdGlvbiAnLFxyXG5cdFx0XHRcdGZvbnRTaXplOiAyNCxcclxuXHRcdFx0XHRmb250RmFtaWx5OiBcIidPc3dhbGQnLCBzYW5zLXNlcmlmXCIsXHJcblx0XHRcdFx0Zm9udENvbG9yOiAnd2hpdGUnXHJcblx0XHRcdH0sXHJcblx0XHRcdGxlZ2VuZDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxyXG5cdFx0XHRyZXNwb25zaXZlOiB0cnVlXHJcblx0XHR9LFxyXG5cdH0pO1xyXG59O1xyXG5cclxubXlBcHAubG9hZFBoYXNlVHdvID0gZnVuY3Rpb24oKSB7XHJcblx0JCgnLmxhbmRpbmdTcGxhc2gnKS5mYWRlT3V0KCdzbG93Jyk7XHJcblx0Y29uc3QgY291bnRyeUxlZnRDaGVjayA9IG15QXBwLmdldFNhbGFyeUluZm8obXlBcHAuZmluYWxDb3VudHJ5TGlzdFtteUFwcC51c2VySW5mby5jb3VudHJ5XS5ocmVmICsgJ3NhbGFyaWVzJyk7XHJcblx0Y29uc3QgY291bnRyeVJpZ2h0Q2hlY2sgPSBteUFwcC5nZXRTYWxhcnlJbmZvKG15QXBwLmZpbmFsQ291bnRyeUxpc3RbbXlBcHAub3RoZXJQZXJzb25JbmZvLmNvdW50cnldLmhyZWYgKyAnc2FsYXJpZXMnKTtcclxuXHQkLndoZW4oY291bnRyeUxlZnRDaGVjaywgY291bnRyeVJpZ2h0Q2hlY2spLmRvbmUoKGxlZnREYXRhLCByaWdodERhdGEpID0+IHtcclxuXHRcdG15QXBwLmNyZWF0ZU1hc3RlclNhbGFyaWVzTGlzdChsZWZ0RGF0YSwgcmlnaHREYXRhKTtcclxuXHRcdG15QXBwLmNoYXJ0Sm9icygpOyAvL3N0YXJ0cyBjaGFydCB3aXRoIG92ZXJhbGxcclxuXHRcdCQoJ3NlY3Rpb24uY29udGVudCcpLmZhZGVJbignc2xvdycpO1xyXG5cdH0pO1xyXG5cdGNvbnN0IGxlZnRDb3VudHJ5WW91ckFnZVBvcENoZWNrID0gbXlBcHAuZ2V0WW91ckFnZVBvcChteUFwcC51c2VySW5mby5jb3VudHJ5LCBteUFwcC51c2VySW5mby5hZ2VZZWFycylcclxuXHRjb25zdCByaWdodENvdW50cnlZb3VyQWdlUG9wQ2hlY2sgPSBteUFwcC5nZXRZb3VyQWdlUG9wKG15QXBwLm90aGVyUGVyc29uSW5mby5jb3VudHJ5LCBteUFwcC51c2VySW5mby5hZ2VZZWFycylcclxuXHQkLndoZW4obGVmdENvdW50cnlZb3VyQWdlUG9wQ2hlY2ssIHJpZ2h0Q291bnRyeVlvdXJBZ2VQb3BDaGVjaykuZG9uZSgobGVmdERhdGEsIHJpZ2h0RGF0YSkgPT4ge1xyXG5cdFx0bGV0IGxlZnRHZW5kZXJQb3A7XHJcblx0XHRsZXQgcmlnaHRHZW5kZXJQb3A7XHJcblx0XHRpZiAobXlBcHAudXNlckluZm8uZ2VuZGVyID09ICdtYWxlJykge1xyXG5cdFx0XHRsZWZ0R2VuZGVyUG9wID0gbGVmdERhdGFbMF1bMF1bJ21hbGVzJ107XHJcblx0XHRcdHJpZ2h0R2VuZGVyUG9wID0gcmlnaHREYXRhWzBdWzBdWydtYWxlcyddO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGVmdEdlbmRlclBvcCA9IGxlZnREYXRhWzBdWzBdWydmZW1hbGVzJ107XHJcblx0XHRcdHJpZ2h0R2VuZGVyUG9wID0gcmlnaHREYXRhWzBdWzBdWydmZW1hbGVzJ107XHJcblx0XHR9XHJcblx0XHRteUFwcC5jaGFydEFnZUdlbmRlclBvcChsZWZ0R2VuZGVyUG9wLCByaWdodEdlbmRlclBvcClcclxuXHRcdGxldCBhbGxMZWZ0R2VuRGF0YSA9IGxlZnREYXRhWzBdWzBdO1xyXG5cdFx0bGV0IGFsbFJpZ2h0R2VuRGF0YSA9IHJpZ2h0RGF0YVswXVswXTtcclxuXHRcdG15QXBwLmNoYXJ0R2VuQnJlYWtkb3duKGFsbExlZnRHZW5EYXRhLCAnbGVmdCcpO1xyXG5cdFx0bXlBcHAuY2hhcnRHZW5CcmVha2Rvd24oYWxsUmlnaHRHZW5EYXRhLCAncmlnaHQnKTtcclxuXHRcdCQoJ2Zvb3RlcicpLmZhZGVJbignc2xvdycpO1xyXG5cdH0pXHJcblx0Y29uc3QgZ2xvYmFsQ29tcGFyZUNoZWNrID0gbXlBcHAuZ2V0R2xvYmFsQWdlUG9wKCk7XHJcblx0JC53aGVuKGdsb2JhbENvbXBhcmVDaGVjaykuZG9uZSgoZGF0YSkgPT4ge1xyXG5cdFx0ZGF0YS5mb3JFYWNoKChjb3VudHJ5KSA9PiB7XHJcblx0XHRcdGlmIChteUFwcC5maW5hbENvdW50cnlMaXN0W2NvdW50cnlbJ2NvdW50cnknXV0gPT09IHVuZGVmaW5lZCkge30gZWxzZSB7XHJcblx0XHRcdFx0bXlBcHAuZmluYWxDb3VudHJ5TGlzdFtjb3VudHJ5Wydjb3VudHJ5J11dLnBvcHVsYXRpb25PZkFnZSA9IHt9O1xyXG5cdFx0XHRcdG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeVsnY291bnRyeSddXS5wb3B1bGF0aW9uT2ZBZ2UubWFsZXMgPSBjb3VudHJ5Lm1hbGVzO1xyXG5cdFx0XHRcdG15QXBwLmZpbmFsQ291bnRyeUxpc3RbY291bnRyeVsnY291bnRyeSddXS5wb3B1bGF0aW9uT2ZBZ2UuZmVtYWxlcyA9IGNvdW50cnkuZmVtYWxlcztcclxuXHRcdFx0fSAvL2FkZHMgcG9wIGRhdGEgZm9yIGFnZSBncm91cCB0byBmaW5hbENvdW50cnlMaXN0XHJcblx0XHR9KTtcclxuXHRcdG15QXBwLmNyZWF0ZUdsb2JhbEFnZVBvcERhdGFBcnJheXMoKTtcclxuXHRcdG15QXBwLmNoYXJ0R2VuR2xvYmFsQWdlUG9wRGF0YSgpO1xyXG5cdH0pO1xyXG5cdGNvbnN0IHRvdGFsUG9wdWxhdGlvbkNoZWNrID0gbXlBcHAuZ2V0VG90YWxQb3B1bGF0aW9uKCk7XHJcblx0Y29uc3QgZ2xvYmFsQWdlQ291bnRDaGVjayA9IG15QXBwLmdldEdsb2JhbEFnZUNvdW50KCk7XHJcblx0JC53aGVuKHRvdGFsUG9wdWxhdGlvbkNoZWNrLCBnbG9iYWxBZ2VDb3VudENoZWNrKS5kb25lKCh0b3RhbFBvcERhdGEsIGFnZVBvcERhdGEpID0+IHtcclxuXHRcdGxldCBudW1iZXJPZmFnZVllYXJPbGRzID0gYWdlUG9wRGF0YVswXVswXS50b3RhbDtcclxuXHRcdGxldCBudW1iZXJPZkh1bWFucyA9IHRvdGFsUG9wRGF0YVswXS50b3RhbF9wb3B1bGF0aW9uLnBvcHVsYXRpb247XHJcblx0XHRsZXQgbnVtYmVyT2ZIdW1hbnNNaW51c0FnZSA9IG51bWJlck9mSHVtYW5zIC0gbnVtYmVyT2ZhZ2VZZWFyT2xkc1xyXG5cdFx0bXlBcHAuY2hhcnRHbG9iYWxBZ2VDb21wYXJlKG51bWJlck9mYWdlWWVhck9sZHMsIG51bWJlck9mSHVtYW5zTWludXNBZ2UpO1xyXG5cdH0pO1xyXG5cclxufTtcclxuXHJcbm15QXBwLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRteUFwcC5nZXRDb3VudHJpZXMoKTtcclxuXHRteUFwcC50b2RheURhdGUgPSBteUFwcC5nZXREYXRlKCk7XHJcblx0JC53aGVuKG15QXBwLnRlbGVwb3J0Q291bnRyaWVzQ2hlY2ssIG15QXBwLmdldENvdW50cmllc0NoZWNrKVxyXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5nb29kVG9HbycpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcblx0XHRcdG15QXBwLmNyZWF0ZU1hc3RlckNvdW50cnlMaXN0KCk7XHJcblx0XHR9KTtcclxuXHRteUFwcC5ldmVudHMoKTtcclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0bXlBcHAuaW5pdCgpO1xyXG59KSJdfQ==
