var myApp = {}; //initialize my app object
myApp.countries = {}; //initialize for array and object created via function;
myApp.test = {
	daysRemaining: 1,
	hoursRemaining: 1,
	milisecondLength: 31540000000,
	minutesRemaining: 1,
	secondsRemaining: 1,
	yearsRemaining: 1
}

myApp.events = function() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		myApp.getLifeExpect();
	});
}

myApp.getDate = function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}
	myApp.dateObject = today;
	return `${yyyy}-${mm}-${dd}`;
}

myApp.getCountries = function() {
	var countriesArray = $.ajax({
			url: 'http://api.population.io:80/1.0/countries',
			type: 'GET',
			dataType: 'json',

		})
		.then(function(countriesArray) {
			myApp.parseCountries(countriesArray['countries']);
			// console.log(countriesArray['countries'])
		});
}

myApp.parseCountries = function(arrayOfCountries) {
	var countries = {};
	for (var i = 0; i < arrayOfCountries.length; i++) {
		$('.country').append('<option val="' + arrayOfCountries[i].replace(/\s/gi, '_') + '">' + arrayOfCountries[i] + '</option>')
		countries[arrayOfCountries[i]] = arrayOfCountries[i];
	}
	$('.loading').remove();
	myApp.countries.objectFormat = countries;
	myApp.countries.arrayFormat = arrayOfCountries;
	return 'countries updated';
}

myApp.getUserInfo = function() {
	var userInfo = {};
	var userYears = $('.years').val();
	var userMonths = $('.months').val();
	var userGender = $('.gender:checked').val();

	userInfo.userAge = `${userYears}y${userMonths}m`;
	userInfo.currentDate = myApp.todayDate;
	userInfo.country = $('.country').val().replace(/_/gi, ' ');
	userInfo.gender = userGender;



	return userInfo;
};

myApp.getLifeExpect = function() {
	var userInfo = myApp.getUserInfo();
	$.ajax({
			url: `http://api.population.io:80/1.0/life-expectancy/remaining/${userInfo.gender}/${userInfo.country}/${userInfo.currentDate}/${userInfo.userAge}/`,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			var milisecondsLeftInLife = data.remaining_life_expectancy * 3.154e+10;
			myApp.getTimeRemaining(milisecondsLeftInLife);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
}

myApp.getTimeRemaining = function(timeToAdd) {
	var t = (Date.parse(myApp.todayDate) + timeToAdd) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24)) % 365;
	var years = Math.floor(t / (1000 * 60 * 60 * 24 * 365));
	console.log({
		'total': t,
		'years': years,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	})
	return {
		'total': t,
		'years': years,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}



myApp.init = function() {
	myApp.getCountries();
	myApp.todayDate = myApp.getDate();
	myApp.events();
}

$(function() {
	myApp.init();
})