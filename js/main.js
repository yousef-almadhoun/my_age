function flipTo(digit, n){
	var current = digit.attr('data-num');
	digit.attr('data-num', n);
	digit.find('.front').attr('data-content', current);
	digit.find('.back, .under').attr('data-content', n);
	digit.find('.flap').css('display', 'block');
	setTimeout(function(){
		digit.find('.base').text(n);
		digit.find('.flap').css('display', 'none');
	}, 350);
}

function jumpTo(digit, n){
	digit.attr('data-num', n);
	digit.find('.base').text(n);
}

function updateGroup(group, n, flip){
	var digit1 = $('.ten'+group);
	var digit2 = $('.'+group);
	n = String(n);
	if(n.length == 1) n = '0'+n;
	var num1 = n.substr(0, 1);
	var num2 = n.substr(1, 1);
	if(digit1.attr('data-num') != num1){
		if(flip) flipTo(digit1, num1);
		else jumpTo(digit1, num1);
	}
	if(digit2.attr('data-num') != num2){
		if(flip) flipTo(digit2, num2);
		else jumpTo(digit2, num2);
	}
}

function setTime(flip){
    var period = calculatePeriod(new Date("1999/07/07 16:0:0"), new Date());
    updateGroup('year', period.years, flip);
	updateGroup('month', period.months, flip);
	updateGroup('day', period.days, flip);
	updateGroup('hour', period.hours, flip);
	updateGroup('min', period.minutes, flip);
	updateGroup('sec', period.seconds, flip);
}

var units = [
    {name: 'milliseconds', scale: 1000},
    {name: 'seconds', scale: 60},
    {name: 'minutes', scale: 60},
    {name: 'hours', scale: 24}
];

// calculates difference between dates
function calculatePeriod(t1, t2) {
  var dt = t2 - t1;
  var result = { };
  for(var i = 0; i < units.length; ++i) {
      var unit = units[i];
      var total = Math.floor(dt / unit.scale);
      var rest = dt - total * unit.scale;
      result[unit.name] = rest;
      dt = total;
  }

  var yearNow = t2.getYear();
  var monthNow = t2.getMonth();
  var dateNow = t2.getDate();

  var yearDob = t1.getYear();
  var monthDob = t1.getMonth();
  var dateDob = t1.getDate();
  
  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) {
	var monthAge = monthNow - monthDob;
	result.months = monthAge;
  } else {
	yearAge--;
	var monthAge = 12 + monthNow - monthDob;
	result.months = monthAge;
  }

  if (dateNow >= dateDob) {
	var dateAge = dateNow - dateDob;
	result.days = dateAge;
  } else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;
	result.days = dateAge;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  result.years = Math.floor(dt / 365.25);
    return result;
}

$(document).ready(function(){
	setTime(false);
	setInterval(function(){
		setTime(true);
	}, 1000);

});