// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// 0399666b11500ae5d01fb97f80950791

var cityName = "";
cityName = "Atlanta";



fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=0399666b11500ae5d01fb97f80950791&units=imperial')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data['coord']['lat'] + '&lon=' + data['coord']['lon'] + '&exclude=hourly,minutely&appid=0399666b11500ae5d01fb97f80950791&units=imperial')
            .then(function (response) {
                return response.json();
            })
            .then(function (newData) {
                console.log(newData);
                $('#city-name').append(data['name']);
                $('#temp').append(data['main']['temp'] + '&#176;F');
                $('#wind').append(data['wind']['speed'] + ' MPH');
                $('#humidity').append(data['main']['humidity'] + " %");
                $('#index-value').append(newData['current']['uvi']);
                $('#icon-img').attr('src', 'http://openweathermap.org/img/wn/' + newData['current']['weather'][0]['icon'] + '@2x.png');

                for (var i = 0; i < 5; i++) {
                    $('#icon-img-day' + String(i+1)).attr('src', 'http://openweathermap.org/img/wn/' + newData['daily'][i]['weather'][0]['icon'] + '@2x.png');
                    $('#temp-day' + String(i+1)).append(newData['daily'][i]['temp']['day'] + '&#176;F');
                    $('#wind-day' + String(i+1)).append(newData['daily'][i]['wind_speed'] + ' MPH');
                    $('#humidity-day' + String(i+1)).append(newData['daily'][i]['humidity'] + " %");
                }
        });
    });