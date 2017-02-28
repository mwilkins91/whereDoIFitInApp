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
			var timeObject = {};
			var remainingTime = data.remaining_life_expectancy;
			timeObject.yearsRemaining = Math.floor(remainingTime);
			timeObject.daysRemaining = (remainingTime - timeObject.yearsRemaining) * 365;
			timeObject.hoursRemaining = ((timeObject.daysRemaining - Math.floor(timeObject.daysRemaining)) * 24);
			timeObject.minutesRemaining = (timeObject.hoursRemaining - Math.floor(timeObject.hoursRemaining)) * 60;
			timeObject.secondsRemaining = Math.floor((timeObject.minutesRemaining - Math.floor(timeObject.minutesRemaining)) * 60);
			timeObject.daysRemaining = Math.floor(timeObject.daysRemaining);
			timeObject.hoursRemaining = Math.floor(timeObject.hoursRemaining);
			timeObject.minutesRemaining = Math.floor(timeObject.minutesRemaining);
			myApp.timeObject = timeObject;
			myApp.parseTime(timeObject);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
}

myApp.parseTime = function(timeObject) {
	$('.lifeExpectResults').append('<div class="timeLeft"</div>');
	$('div.timeLeft').append(
		`
		<div class="timeSegment">
			<p class="years">${timeObject.yearsRemaining}</p>
			<p class="timeSegmentTitle">Years</p>
		</div>
		<div class="timeSegment">
			<p class="days">${timeObject.daysRemaining}</p>
			<p class="timeSegmentTitle">Days</p>
		</div>
		<div class="timeSegment">
			<p class="hours">${timeObject.hoursRemaining}</p>
			<p class="timeSegmentTitle">Hours</p>
		</div>
		<div class="timeSegment">
			<p class="minutes">${timeObject.minutesRemaining}</p>
			<p class="timeSegmentTitle">Minutes</p>
		</div>
		<div class="timeSegment">
			<p class="seconds">${timeObject.secondsRemaining}</p>
			<p class="timeSegmentTitle">Seconds</p>
		</div>
		`)

	myApp.timer = setInterval(function() { //TODO: REFACTOR this monstrosity
		if (myApp.timeObject.secondsRemaining < 1) { //if out of seconds, go take from minutes...
			if (myApp.timeObject.minutesRemaining < 1) { //if you came for minutes, but there are none, go to hours
				if (myApp.timeObject.hoursRemaining < 1) { //if you came for hours, but there are none, go to dayss
					if (myApp.timeObject.daysRemaining < 1) { //if you came for days, but there are none, go to years
						if (myApp.timeObject.yearsRemaining < 1) { //if you came for years, but there are none, stop the countdown.
							clearInterval(myApp.timer); //stops the countdown
						}
						myApp.timeObject.yearsRemaining--; //lower year
						$('.years').text(myApp.timeObject.yearsRemaining); //update html to reflect year
						myApp.timeObject.daysRemaining = 365; //adds a years worth of days to days.
					}
					myApp.timeObject.daysRemaining--;
					$('.days').text(myApp.timeObject.daysRemaining);
					myApp.timeObject.hoursRemaining = 24;
				}
				myApp.timeObject.hoursRemaining--;
				$('.hours').text(myApp.timeObject.hoursRemaining);
				myApp.timeObject.minutesRemaining = 60;
			}
			myApp.timeObject.minutesRemaining--;
			$('.minutes').text(myApp.timeObject.minutesRemaining);
			myApp.timeObject.secondsRemaining = 59;
		}
		$('.seconds').text(myApp.timeObject.secondsRemaining);
		myApp.timeObject.secondsRemaining--;
	}, 1000);
}


myApp.init = function() {
	myApp.getCountries();
	myApp.todayDate = myApp.getDate();
	myApp.events();
}

$(function() {
	myApp.init();
})