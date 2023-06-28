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
