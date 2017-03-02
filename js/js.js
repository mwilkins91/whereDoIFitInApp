var myApp = {}; //initialize my app object
myApp.countries = {}; //initialize for array and object created via function;

myApp.events = function() {
	$('.userInfoInput__Form').on('submit', function(event) {
		event.preventDefault();
		myApp.getDateOfDeath('user');
		$('.userInfoInput').fadeOut('slow', () => $('main').fadeIn('slow'));
		$.when(myApp.userInfo.dateOfDeathCheck)
			.done(function() {
				myApp.startCountdown(myApp.userInfo.dateOfDeath, 'user');
			})
	});
	$('.otherPerson__Form').on('submit', function(event) {
		event.preventDefault();
		myApp.otherPersonInfo.country = $('.otherPerson__Form .country').val();
		$('.otherPersonTitle').text(`If you lived in ${myApp.otherPersonInfo.country}`)
		myApp.getDateOfDeath('otherPerson');
	});
	$('button.loadMore').on('click', function(event) {
		event.preventDefault();
		myApp.loadPhaseTwo();
	});
	$('.jobInfo__form').on('submit', function(event) {
		event.preventDefault();
		let selectedJob = $('.jobInfo__select').val().replace(/_/gi, ' ');
		// console.log(selectedJob)
		myApp.chartJobs(myApp.jobSalariesList[selectedJob]);

	});
};

myApp.startCountdown = function(dateOfDeath, who) {
	if (who === "user") {
		myApp.countDowns = {};
		myApp.countDowns.user = setInterval(function() {
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
};

myApp.getCountries = function() {
	myApp.getCountriesCheck = $.ajax({
			url: 'http://api.population.io:80/1.0/countries',
			type: 'GET',
			dataType: 'json',

		})
		.done(function(countriesArray) {
			myApp.parseCountries(countriesArray['countries']);
			// console.log(countriesArray['countries'])
		});



	myApp.teleportCountriesCheck = $.ajax({
			url: 'https://api.teleport.org/api/countries/',
			type: 'GET',
			dataType: 'JSON',

		})
		.done(function(teleportCountries) {
			myApp.parseTeleportCountries(teleportCountries._links["country:items"]);

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
};

myApp.parseCountries = function(arrayOfCountries) {
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

myApp.parseTeleportCountries = function(teleportCountries) {
	var teleportCountriesObject = {};
	for (var i = 0; i < teleportCountries.length; i++) {
		teleportCountriesObject[teleportCountries[i].name] = teleportCountries[i]
	}
	myApp.countries.teleportCountriesObject = teleportCountriesObject;
	myApp.countries.teleportCountriesArray = teleportCountries;
	// myApp.countries.teleportCheck = true;
};

myApp.createMasterCountryList = function() {
	var combinedArray = myApp.countries.arrayFormat.map(function(country) {
		if (myApp.countries.teleportCountriesObject[country] !== undefined) {
			return myApp.countries.teleportCountriesObject[country]
		} else {
			return '';
		}
	})
	var finalizedCountries = combinedArray.filter(function(item) {
		return !(typeof item === 'string');
	})
	const finalCountryObject = {};
	for (var i = 0; i < finalizedCountries.length; i++) {
		finalCountryObject[finalizedCountries[i].name] = finalizedCountries[i];
	}
	myApp.finalCountryList = finalCountryObject;
	for (country in myApp.finalCountryList) {
		$('.country').append('<option val="' + myApp.finalCountryList[country].name.replace(/\s/gi, '_') + '">' + myApp.finalCountryList[country].name + '</option>');
	}
};

myApp.getUserInfo = function() {
	var userInfo = {};
	var userYears = $('.years').val();
	var userMonths = $('.months').val();
	var userGender = $('.gender:checked').val();

	userInfo.userAge = `${userYears}y${userMonths}m`;
	userInfo.ageYears = userYears;
	userInfo.currentDate = myApp.todayDate;
	userInfo.country = $('.userInfoInput__Form .country').val().replace(/_/gi, ' ');
	userInfo.gender = userGender;


	myApp.userInfo = userInfo;
	myApp.otherPersonInfo = {};
	myApp.otherPersonInfo.timerEngaged = false;

	return userInfo;
};

myApp.getDateOfDeath = function(who) { //need to get even when for other person to fire only when this is done... currently firing in wrong order!
	if (who === 'user') {
		var personInfo = myApp.getUserInfo();
	} else {
		var personInfo = Object.assign({}, myApp.userInfo);
		personInfo.country = $('.otherPerson__Form .country').val();
	}
	myApp.userInfo.dateOfDeathCheck = $.ajax({
			url: `http://api.population.io:80/1.0/life-expectancy/remaining/${personInfo.gender}/${personInfo.country}/${personInfo.currentDate}/${personInfo.userAge}/`,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			var dateOfDeath = (Date.parse(myApp.todayDate) + (data.remaining_life_expectancy * 3.154e+10)); //number is approx milisec in year
			if (who === 'user') {
				myApp.userInfo.dateOfDeath = dateOfDeath;
			} else {
				myApp.otherPersonInfo.dateOfDeath = dateOfDeath;
				myApp.otherPersonInfo.timerEngaged = true;
				// myApp.startCountdown(myApp.otherPersonInfo.dateOfDeath, 'otherPerson');
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
};

myApp.getTimeRemaining = function(dateOfDeath) { //takes date of death in Epoch time
	var t = dateOfDeath - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
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

myApp.getSalaryInfo = function(countryHREF) {
	return $.ajax({
			url: countryHREF,
			type: 'GET',
			dataType: 'JSON',
			// data: {param1: 'value1'},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

}

myApp.createMasterSalariesList = function(leftData, rightData) {
	const leftCountry = myApp.userInfo.country;
	const rightCountry = myApp.otherPersonInfo.country;
	const leftSalaries = leftData[0].salaries;
	const rightSalaries = rightData[0].salaries;
	const salariesList = {};
	for (job in leftSalaries) {
		let jobTitle = leftSalaries[job]['job']['title'];
		let jobSalaries = leftSalaries[job]['salary_percentiles'];
		salariesList[jobTitle] = {};
		salariesList[jobTitle]['title'] = jobTitle;
		salariesList[jobTitle][leftCountry] = {};
		salariesList[jobTitle][rightCountry] = {};
		salariesList[jobTitle][leftCountry] = jobSalaries;
		let jobSalariesRight = rightSalaries[job]['salary_percentiles'];
		salariesList[jobTitle][rightCountry] = jobSalariesRight;
	}
	myApp.jobSalariesList = salariesList;
	myApp.getAverageSalary();
	myApp.populateJobList();
};

myApp.getAverageSalary = function() {
	const leftCountry = myApp.userInfo.country;
	const rightCountry = myApp.otherPersonInfo.country;
	let runningTotalLeft = 0;
	let runningTotalRight = 0;
	let counter = 0;
	for (job in myApp.jobSalariesList) {
		runningTotalLeft = runningTotalLeft + myApp.jobSalariesList[job][leftCountry]['percentile_50'];
		runningTotalRight = runningTotalRight + myApp.jobSalariesList[job][rightCountry]['percentile_50'];
		counter++;
	}
	let averageLeft = runningTotalLeft / counter;
	let averageRight = runningTotalRight / counter;
	myApp.jobSalariesList['Overall Average'] = {};
	myApp.jobSalariesList['Overall Average'][leftCountry] = averageLeft;
	myApp.jobSalariesList['Overall Average'][rightCountry] = averageRight;
	myApp.jobSalariesList['Overall Average'].title = 'Overall Average';
}

myApp.populateJobList = function() {
	for (job in myApp.jobSalariesList) {
		$('.jobInfo__select').append('<option val="' + myApp.jobSalariesList[job].title.replace(/\s/gi, '_') + '">' + myApp.jobSalariesList[job].title + '</option>')
	}
	$('.jobLoading').remove();
}

myApp.chartJobs = function(job) {
	$('.jobChart__container').html('<canvas id="jobChart" class="jobChart"></canvas>');
	let whereToPutChart = $('#jobChart');
	let leftCountry = myApp.userInfo.country;
	let rightCountry = myApp.otherPersonInfo.country;
	let jobTitle;
	if (job === undefined) {
		jobTitle = 'Overall Average'
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
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
				],
				borderWidth: 2
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			title: {
				display: true,
				text: jobTitle + " Salary",
				fontSize: 24
			},
			legend: {
				display: false
			},
			maintainAspectRatio: false,
			responsive: true
		},
	});
}

myApp.getYourAgePop = function(country, age) {
	return $.ajax({
		url: `http://api.population.io:80/1.0/population/${myApp.dateObject.getFullYear()}/${country}/${age}/`,
		type: 'GET',
		dataType: 'JSON',
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

myApp.loadPhaseTwo = function() {
	$('.otherPerson__Form').fadeOut('slow');
	const countryLeftCheck = myApp.getSalaryInfo(myApp.finalCountryList[myApp.userInfo.country].href + 'salaries');
	const countryRightCheck = myApp.getSalaryInfo(myApp.finalCountryList[myApp.otherPersonInfo.country].href + 'salaries');
	$.when(countryLeftCheck, countryRightCheck).done((leftData, rightData) => {
		myApp.createMasterSalariesList(leftData, rightData);
		myApp.chartJobs(); //starts chart with overall
		$('.jobInfo').fadeIn('slow');
	});
	const leftCountryYourAgePopCheck = myApp.getYourAgePop(myApp.userInfo.country, myApp.userInfo.ageYears)
	const rightCountryYourAgePopCheck = myApp.getYourAgePop(myApp.otherPersonInfo.country, myApp.userInfo.ageYears)
	$.when(leftCountryYourAgePopCheck, rightCountryYourAgePopCheck).done((leftData, rightData) => {
		//make chart
	})
	)
};

myApp.init = function() {
	myApp.getCountries();
	myApp.todayDate = myApp.getDate();
	$.when(myApp.teleportCountriesCheck, myApp.getCountriesCheck)
		.done(function() {
			myApp.createMasterCountryList();
		});
	myApp.events();
};

$(function() {
	myApp.init();
})