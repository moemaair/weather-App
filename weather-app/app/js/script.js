const ui = document.querySelector('.ui');
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input');
// api key
const key = '357dc6bc6eef2894e1e0977f88f5082f';

const updateUI = (data) => {
	const { weather, main, name } = data;

	ui.innerHTML = `
			<div class="ui">
				<h1 class="lead">
					<span class="city">${name},</span>
					<span class="country">${data.sys.country}</span>
				</h1>
				<div class="temp-info">
					<img src="http://openweathermap.org/img/w/${
						weather[0].icon
					}.png" alt="icon" class="icon" />
					<h2 class="temp">${Math.round(main.temp - 273.15)} <span>&deg;</span></h2>
					<p class="unit">C</p>
				</div>

				<p class="condition">${weather[0].description}</p>

				<div class="add-info">
					<p class="feels">Feels Like ${Math.round(main.feels_like - 273.15)} &deg; C</p>
					<p class="humidity">Humidity ${main.humidity + '&#37'}</p>
				</div>
			</div>
`;
};

const getWeather = async (city) => {
	const base = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

	const response = await fetch(base);
	const data = await response.json();

	return data;
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let city = input.value.trim();
	getWeather(city)
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));

	input.value = '';
	if (ui.classList.contains('d-none')) {
		ui.classList.remove('d-none');
	}

	// localStorage.setItem('city', city);
});

// if (localStorage.getItem('city')) {
// 	getWeather(localStorage.getItem('city'))
// 		.then((data) => updateUI(data))
// 		.catch((err) => console.log(err));
// }
