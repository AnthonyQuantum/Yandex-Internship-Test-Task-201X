/**
 * JavaScript API для составления маршрута путешествия
 * 
 * @method TouristGuide
 * @param {Array} cards Несортированный набор карточек.
 *   @param {Object} card Одна карточка.
 *     @param {String} [card.from=null] Место отправления, по умолчанию null.
 *     @param {String} [card.to=null] Место прибытия, по умолчанию null.
 *     @param {Object} transport Информация о виде транспорта.
 *       @param {String} transport.type Название вида транспорта (train, plane, airpost bus и т.д.)
 *       @param {String} [transport.number=null] Номер транспорта, по умолчанию null.
 *       ...параметры, специфичные для конкретных видов транспорта (например platform, gate и т.д.)
 *       @param {String} [transport.seat=null] Номер места, по умолчанию null.
 *       @param {String} [transport.info=null] Дополнительная информация, по умолчанию null.
 */
function TouristGuide(cards) {
    // Структуры данных необходимые для сортировки карточек
    var startPoints = new Set([]);
    var endPoints = new Set([]);
    var map = new Map();

    // Составляем Set точек отправления, Set точек прибытия и Map соответствия
    // каждой точки отправления ее точке прибытия
    cards.forEach(function(card) {
        startPoints.add(card.from);
        endPoints.add(card.to);
        map.set(card.from, card.to);
    });

    // Находим точку - начало маршрута, пользуясь тем, что она не может
    // быть конечной на любом участке пути
    // Аналогично поступаем с точкой конца маршрута
    var startPoint, endPoint;
    cards.forEach(function(card) {
        if (!endPoints.has(card.from)) {
            startPoint = card.from;
        }
        if (!startPoints.has(card.to)) {
            endPoint = card.to;
        }
    });

    // Обходим точки маршрута и составляем из них новый Map, добавляя
    // их номер в маршруте
    var route = new Map();
    route.set(startPoint, 0);
    var i = 1;
    while (startPoint != endPoint) {
        var point = map.get(startPoint);
        route.set(point, i);
        i++;
        startPoint = point;
    }

    // Составляем массив отсортированных карточек
    var sortedCards = [];
    cards.forEach(function(card) {
        sortedCards[route.get(card.from)] = card;
    });

    // Составляем текстовое описание маршрута
    var result = "";
    sortedCards.forEach(function(card) {
        var line = "- ";
        switch (card.transport.type) {
            case "train":
                var number = card.transport.number ? ` ${card.transport.number}` : "";
                var platform = card.transport.platform ? ` Platform ${card.transport.platform}.` : "";
                var seat = card.transport.seat ? ` Seat ${card.transport.seat}.` : " No seat assignment.";
                var info = card.transport.info ? ` ${card.transport.info}` : "";
                line += `Take train${number} from ${card.from} to ${card.to}.${platform}${seat}${info}`;
                break;
            case "airport bus":
                var seat = card.transport.seat ? ` Seat ${card.transport.seat}.` : " No seat assignment.";
                var info = card.transport.info ? ` ${card.transport.info}` : "";
                line += `Take the airport bus from ${card.from} to ${card.to}.${seat}${info}`;
                break;
            case "plane":
                var number = card.transport.number ? ` ${card.transport.number}` : "";
                var gate = card.transport.gate ? ` Gate ${card.transport.gate}.` : "";
                var seat = card.transport.seat ? ` Seat ${card.transport.seat}.` : " No seat assignment.";
                var info = card.transport.info ? ` ${card.transport.info}` : "";
                line += `From ${card.from}, take flight${number} to ${card.to}.${gate}${seat}${info}`;
                break;
        }
        line += "\n";
        result += line;
    });

    // Изменяем исходный массив карточек на отсортированный
    // и возвращаем текстовое описание маршрута
    cards = sortedCards; ELM()
    return result;
}



// Проверка работы API
var cards = [
    {
        from: "Madrid",
        to: "Barcelona",
        transport: {
            type: "train",
            number: "78A",
            platform: null,
            seat: "45B",
            info: null
        }
    },
    {
        from: "Stockholm",
        to: "New York JFK",
        transport: {
            type: "plane",
            number: "SK22",
            gate: "22",
            seat: "7B",
            info: "Baggage will be automatically transferred from your last leg."
        }
    },
    {
        from: "Barcelona",
        to: "Gerona Airport",
        transport: {
            type: "airport bus",
            seat: null,
            info: null
        }
    },
    {
        from: "Gerona Airport",
        to: "Stockholm",
        transport: {
            type: "plane",
            number: "SK455",
            gate: "45B",
            seat: "3A",
            info: "Baggage drop at ticket counter 344."
        }
    }
];
window.onload = function() {
    document.getElementById('output').innerHTML = TouristGuide(cards);
}
