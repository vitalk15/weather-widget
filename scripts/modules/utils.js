// const addZero = (n) => n < 10 ? `0${n}` : n;

export const getCurrentDateTime = () => {
	// 1 ВАРИАНТ ПОЛУЧЕНИЯ ДАТЫ И ТЕКУЩЕГО ВРЕМЕНИ (более примитивно)
	// const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
	// const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

	const date = new Date();
	// 1 ВАРИАНТ ПОЛУЧЕНИЯ ДАТЫ И ТЕКУЩЕГО ВРЕМЕНИ (более примитивно)
	// const dayOfMonth = date.getDate();
	// const month = months[date.getMonth()];
	// const year = date.getFullYear();
	// const dayOfWeek = weekdays[date.getDay()];

	// const hours = addZero(date.getHours());
	// const minutes = addZero(date.getMinutes());

	const optionsDate = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	const optionsTime = {
		hour: '2-digit',
		minute: '2-digit',
	};

	const optionsWeekday = {
		weekday: 'long',
	};

	const formatDate = date.toLocaleDateString('ru-RU', optionsDate).replaceAll('.', '').replace(' г', '');
	const formatTime = date.toLocaleTimeString('ru-RU', optionsTime);
	const formatWeekday = date.toLocaleString('ru-RU', optionsWeekday);

	// 1 ВАРИАНТ ПОЛУЧЕНИЯ ДАТЫ И ТЕКУЩЕГО ВРЕМЕНИ
	// return { dayOfMonth, month, year, dayOfWeek, hours, minutes };
	return { formatDate, formatTime, formatWeekday };
};

export const getWindDirection = (deg) => {
	const directions = [
		'&#8593;',
		'&#8598;',
		'&#8592;',
		'&#8601;',
		'&#8595;',
		'&#8600;',
		'&#8594;',
		'&#8599;',
	];
	const i = Math.round(deg / 45) % 8;

	return directions[i];
};

export const calculateDewPoint = (temp, humidity) => {
	const a = 17.27;
	const b = 237.7;

	const ft = (a * temp) / (b + temp) + Math.log(humidity / 100);
	const dewPoint = (b * ft) / (a - ft);

	return dewPoint.toFixed(1);
};

export const convertPressure = (pressure) => {
	const mmHg = pressure * 0.750063755419211;

	return mmHg.toFixed(2);
};

export const getWeatherForecastData = (data) => {
	const forecast = data.list.filter(
		(item) =>
			new Date(item.dt_txt).getHours() === 12 && new Date(item.dt_txt).getDate() > new Date().getDate()
	);

	const forecastData = forecast.map((item) => {
		const date = new Date(item.dt_txt);
		const dayOfWeek = date.toLocaleString('ru-RU', { weekday: 'short' });
		const weatherIcon = item.weather[0].icon;
		const speedWind = item.wind.speed;
		const directionWind = item.wind.deg;

		let minTemp = Infinity;
		let maxTemp = -Infinity;

		for (let i = 0; i < data.list.length; i++) {
			const temp = data.list[i].main.temp;
			const tempDate = new Date(data.list[i].dt_txt);

			if (tempDate.getDate() === date.getDate()) {
				if (temp < minTemp) {
					minTemp = temp;
				}
				if (temp > maxTemp) {
					maxTemp = temp;
				}
			}
		}

		return {
			dayOfWeek,
			weatherIcon,
			minTemp,
			maxTemp,
			speedWind,
			directionWind,
		};
	});

	return forecastData;
};
