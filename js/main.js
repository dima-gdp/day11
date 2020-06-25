const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');
const popupProduct = document.querySelector('.popup-product');
const productLink = document.querySelectorAll('.product-link');
const toBasket = document.querySelector('.popup-product__to-basket');
const productAmountElement = document.querySelector('.lock__value');
const basket = document.querySelector('.basket');
const basketIcon = document.querySelector('.lock');
const formFind = document.querySelector('.form-find');
let productAmount = 0;

// Появление меню
burger.addEventListener('click', function () {
	menu.classList.toggle('active');
	header.classList.toggle('_menu');
	burger.classList.toggle('active');
	document.body.classList.toggle('no-scroll');
});

// Функция для появления попапа с товаром
const showPopupProduct = () => {

	if (!popupProduct.classList.contains('active')) {
		//Прячем список товаров, так как после удаления всех товаров, стиль корзины не сбросится
		basket.style.top = '-150vh'
		basket.style.opacity = '0';

		popupProduct.classList.add('active');
		productAmount++;
		productAmountElement.innerHTML = productAmount;
		setTimeout(() => { popupProduct.classList.remove('active') }, 5000);
	}
};

// Функция наполнения попапа с товаром
const buildPopupProduct = (img, title, subtitle, price) => {
	if (!popupProduct.classList.contains('active')) {
		document.querySelector('.popup-product__image').innerHTML = img;
		document.querySelector('.popup-product__title').innerHTML = title;
		document.querySelector('.popup-product__subtitle').innerHTML = subtitle;
		document.querySelector('.popup-product__price').innerHTML = price;
	}
};

// Функция добавления товара в корзину
const addProductToBasket = (img, title, price) => {
	if (!popupProduct.classList.contains('active')) {
		let basketItem = document.createElement('li');
		basketItem.classList.add('basket__item');
		basketItem.innerHTML = `<article class="basket__product product-basket">
		<div class="product-basket__image">
			${img}
		</div>
		<h3 class="product-basket__title">${title}</h3>
		<span class="product-basket__price">${price}</span>
		<button class="product-basket__btn"></button>
	</article>`;
		basket.append(basketItem);
	}
};

// Функция для скрытия товаров в корзине
const hideProductsInBasket = () => {
	basket.style.top = '-150vh'
	basket.style.opacity = '0';
};
// Обратобчик клика по товару
productLink.forEach((el) => {
	el.addEventListener('click', function (ev) {
		ev.preventDefault();
		let img = this.parentNode.querySelector('.image-container').innerHTML,
			title = this.parentNode.querySelector('.jewelry__link').innerHTML,
			subtitle = this.parentNode.querySelector('.jewelry__subtitle').innerHTML,
			price = this.parentNode.querySelector('.jewelry__price').innerHTML;
		buildPopupProduct(img, title, subtitle, price);
		addProductToBasket(img, title, price);
		showPopupProduct();
	})
});

// Обработчик кнопки "К корзине"
toBasket.addEventListener('click', function () {
	window.scrollTo({
		behavior: 'smooth',
		left: 0,
		top: 0
	});
	popupProduct.classList.remove('active');
});

// Обработчик кнопки удаления товара из корзины
basket.addEventListener('click', function (ev) {
	if (ev.target.classList.contains('product-basket__btn')) {
		ev.target.closest('.basket__item').remove();
		productAmount--;
		productAmountElement.innerHTML = productAmount;
	}
});

// Обработчик появления списка товаров в корзине
basketIcon.addEventListener('mouseover', function () {
	if (basket.firstElementChild) {
		let topCoord = this.offsetTop + this.offsetHeight - 2;
		basket.style.top = `${topCoord}px`;
		basket.style.opacity = '1';
	}
});

// Обработчик скрытия корзины
basketIcon.addEventListener('mouseout', function (ev) {
	if (!ev.relatedTarget.closest('.basket')) {
		hideProductsInBasket();
	}
});

// Обработчик скрытия корзины
basket.addEventListener('mouseout', function (ev) {
	if (!ev.relatedTarget.closest('.basket')) {
		hideProductsInBasket();
	}
});

// Поключаем карту

ymaps.ready(init);
function init() {
	// Создание карты.
	var myMap = new ymaps.Map("map", {
		center: [55.755797269899254, 37.61457581349182],
		zoom: 15,
	});

	let HintLayout = ymaps.templateLayoutFactory.createClass("<div class='my-hint'>" +
		"{{ properties.hintContent }}" +
		"</div>", {
		getShape: function () {
			var el = this.getElement(),
				result = null;
			if (el) {
				var firstChild = el.firstChild;
				result = new ymaps.shape.Rectangle(
					new ymaps.geometry.pixel.Rectangle([
						[0, 0],
						[firstChild.offsetWidth, firstChild.offsetHeight]
					])
				);
			}
			return result;
		}
	}
	);
	// Метка адреса в Москве
	var Moscow = new ymaps.GeoObject({
		geometry: {
			type: "Point", // тип геометрии - точка
			coordinates: [55.755773068976765, 37.614608000000004] // координаты точки
		},
		properties: {
			hintContent: "Манежная площадь, 1 к2"
		},
	},
		{
			iconLayout: 'default#image',
			iconImageHref: '../day11/icons/icons.svg#map',
			iconImageSize: [45, 45],
			hintLayout: HintLayout

		});

	// Метка адреса в Питере
	var Peterburg = new ymaps.GeoObject({
		geometry: {
			type: "Point", // тип геометрии - точка
			coordinates: [59.93603406416598, 30.3147275] // координаты точки
		},
		properties: {
			hintContent: "​Малая Морская, 4"
		},
	},
		{
			iconLayout: 'default#image',
			iconImageHref: '../day11/icons/icons.svg#map',
			iconImageSize: [45, 45],
			hintLayout: HintLayout

		});

	// Метка адреса в Самаре
	var Samara = new ymaps.GeoObject({
		geometry: {
			type: "Point", // тип геометрии - точка
			coordinates: [53.207388571205435, 50.19790299999996] // координаты точки
		},
		properties: {
			hintContent: "​Дыбенко, 30"
		},
	},
		{
			iconLayout: 'default#image',
			iconImageHref: '../day11/icons/icons.svg#map',
			iconImageSize: [45, 45],
			hintLayout: HintLayout

		});

	// Метка адреса в Казани
	var Kazan = new ymaps.GeoObject({
		geometry: {
			type: "Point", // тип геометрии - точка
			coordinates: [55.82957756889806, 49.11858599999993] // координаты точки
		},
		properties: {
			hintContent: "Ямашева проспект, 46"
		},
	},
		{
			iconLayout: 'default#image',
			iconImageHref: '../day11/icons/icons.svg#map',
			iconImageSize: [45, 45],
			hintLayout: HintLayout

		});

	// Метка адреса в Калининграде
	var Kaliningrad = new ymaps.GeoObject({
		geometry: {
			type: "Point", // тип геометрии - точка
			coordinates: [54.71805156995343, 20.5000935] // координаты точки
		},
		properties: {
			hintContent: "Театральная, 30"
		},
	},
		{
			iconLayout: 'default#image',
			iconImageHref: '../day11/icons/icons.svg#map',
			iconImageSize: [45, 45],
			hintLayout: HintLayout

		});

	myMap.geoObjects.add(Moscow);
	myMap.geoObjects.add(Peterburg);
	myMap.geoObjects.add(Samara);
	myMap.geoObjects.add(Kazan);
	myMap.geoObjects.add(Kaliningrad);


	// Объект для поиска адресов
	const adressList = {
		moscow: ['москва', Moscow.geometry._coordinates],
		samara: ['самара', Samara.geometry._coordinates],
		peterburg: ['санкт-петербург', Peterburg.geometry._coordinates],
		kazan: ['казань', Kazan.geometry._coordinates],
		kaliningrad: ['калининград', Kaliningrad.geometry._coordinates],
	}

	// Функция определения адреса на карте
	const getAdress = () => {
		let inputAdress = document.querySelector('.form-find__input').value;
		const adress = inputAdress.toLowerCase();

		for (let city in adressList) {
			if (adress.includes(adressList[city][0])) {
				myMap.setCenter(adressList[city][1], 15, {
					checkZoomRange: true
				});
				// Cнимаем ошибку(если была) и проверяем города
				document.querySelector('.form-find__message').classList.remove('active');
				break;
			}
			// Если ничего не ввели выводим ошибку
			else {
				document.querySelector('.form-find__message').classList.add('active')
			}
		}

	}

	formFind.addEventListener('submit', function (ev) {
		ev.preventDefault();
		getAdress();
	})
}

// Slider

const mySwiper = new Swiper('.slider-social', {
	speed: 400,
	spaceBetween: 25,
	slidesPerView: 3,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	navigation: {
		nextEl: '.btn-right',
		prevEl: '.btn-left',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		401: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		769: {
			slidesPerView: 3,
			spaceBetween: 25
		}
	}
});

// //Валидация

const validateForm = (selector, rules) => {
	new window.JustValidate(selector, {
		rules: rules
	});
}

validateForm('.subscribe__form', {
	email: { required: true, email: true },
});


validateForm('.form-footer', {
	email: { required: true, email: true },
});

validateForm('.form-footer_1', {
	email: { required: true, email: true },
});





