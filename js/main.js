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
    var period = calculatePeriod(new Date("1999/07/07 15:0:0"), new Date());
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
  result.days = Math.floor(((dt % 365) / 30) % 30);
  result.months = Math.floor(((dt % 365) / 30));
  result.years = Math.floor(dt / 365);
    return result;
}

$(document).ready(function(){
	//$('body').css('backgroundImage', 'url(images/bg_body.jpg)');
	setTime(false);
	setInterval(function(){
		setTime(true);
	}, 1000);

});