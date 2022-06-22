sendFetch("country", showCountry) // Выполняем первый fetch на получение городов

/**
 * Выполнение запроса
 * @param name - название таблицы
 * @param callback - ф-ция колбек (выполняет отрисовку и вешает addEventListener)
 * @param id родителькая категория
 */
function sendFetch(name, callback, id = false) {
    fetch("http://24api.ru/rest-shop/" + name + (id ? "?id=" + id : ""))
        .then((resp) => resp.json())
        .then((data) => callback(data))
}

/**
 * Функция рисует option для стран
 * @param data [['id':int, "name": str]]
 */
function showCountry(data) {
    let country = draw(data, "country")
    country.addEventListener("change", (event) => {
        sendFetch('city', showCity, event.target.value)
    })
}
/**
 * Функция рисует option для городов
 * @param data [['id':int, "name": str]]
 */
function showCity(data) {
    let city = draw(data, "city")
    city.addEventListener("change", (event) => {
        sendFetch('shop', showShop, event.target.value)

    })
}
/**
 * Функция рисует option для магазинов
 * @param data [['id':int, "name": str]]
 */
function showShop(data) {
    let shop = draw(data, "shop")
}

/**
 * Функция отрисовки option
 * @param data
 * @param fieldName
 * @returns {Element}
 */
function draw(data, fieldName) {
    const field = document.querySelector("#" + fieldName);
    field.innerHTML = ""
    field.disabled = false
    let str = ""
    for (let k of data) {
        str += "<option value='" + k.id + "'>" + k.name + "</option>"
    }
    field.innerHTML = str
    return field
}
