import { calculateDewPoint, convertPressure, getCurrentDateTime, getWeatherForecastData } from './utils.js';
import { startWidget } from './widgetService.js';

export const renderWidgetToday = (widget, data) => {
	const {
		weather,
		name,
		main: { temp, feels_like: feelsLike },
	} = data;
	const { formatDate, formatTime, formatWeekday } = getCurrentDateTime();
	widget.insertAdjacentHTML(
		'beforeend',
		`<div class="byAPI">by OpenWeather</div>
      <div class="widget__today">
         <div class="widget__date-block">
            <p class="widget__date">${formatDate}</p>
            <p class="widget__time">${formatTime}</p>
            <p class="widget__day">${formatWeekday}</p>
         </div>
         <div class="widget__icon">
            <img class="widget__img" src="./icon/${weather[0].icon}.svg" alt="Погода" />
         </div>
         <div class="widget__wheather">
            <div class="widget__city">
               <p>${name}</p>
               <button class="widget__change-city" aria-label="Изменить город"></button>
            </div>
            <p class="widget__temp-big">${temp.toFixed(1)}°C</p>
            <p class="widget__felt">ощущается</p>
            <p class="widget__temp-small">${feelsLike.toFixed(1)}°C</p>
         </div>
      </div>
      `
	);
};

export const renderWidgetOther = (widget, data) => {
	const {
		wind,
		main: { humidity, temp, pressure },
	} = data;
	widget.insertAdjacentHTML(
		'beforeend',
		`<div class="widget__other">
         <div class="widget__wind">
            <p class="widget__wind-title">Ветер</p>
            <p class="widget__wind-speed">${wind.speed.toFixed(1)} м/с</p>
            <p class="widget__wind-gust">до ${wind.gust.toFixed(1)} м/с</p>
            <p class="widget__wind-text" style="transform: rotate(${wind.deg}deg)">&#8595;</p>
         </div>
         <div class="widget__humidity">
            <p class="widget__humidity-title">Влажность</p>
            <p class="widget__humidity-value">${humidity}%</p>
            <p class="widget__humidity-text">Т.Р.: ${calculateDewPoint(temp, humidity)}°C</p>
         </div>
         <div class="widget__pressure">
            <p class="widget__pressure-title">Давление</p>
            <p class="widget__pressure-value">${convertPressure(pressure)}</p>
            <p class="widget__pressure-text">мм рт.ст.</p>
         </div>
      </div>
      `
	);
};

export const renderWidgetForecast = (widget, data) => {
	const widgetForecast = document.createElement('ul');
	widgetForecast.className = 'widget__forecast';
	widget.append(widgetForecast);

	const forecastData = getWeatherForecastData(data);

	const items = forecastData.map((item) => {
		const widgetDayItem = document.createElement('li');
		widgetDayItem.className = 'widget__day-item';

		widgetDayItem.insertAdjacentHTML(
			'beforeend',
			`<p class="widget__day-text">${item.dayOfWeek}</p>
         <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода" />
         <p class="widget__day-temp">${item.minTemp.toFixed(1)}°/${item.maxTemp.toFixed(1)}°</p>
         <p class="widget__day-speed">${item.speedWind.toFixed(1)} м/с</p>
         <p class="widget__day-windtext" style="transform: rotate(${item.directionWind}deg)">&#8595;</p>
         `
		);

		return widgetDayItem;
	});

	widgetForecast.append(...items);
};

export const showError = (widget, error) => {
	widget.textContent = error.toString();
	widget.classList.add('widget_error');

	setTimeout(() => {
		startWidget(null, widget);
	}, 2000);
};

export const preload = () => {
	const preload = document.createElement('div');
	preload.classList.add('widget__preload');

	return preload;
};
