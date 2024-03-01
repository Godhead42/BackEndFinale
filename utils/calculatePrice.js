const getWeather = require('./weather')

const calculatePrice = async (cityName, hotelRating, adults, children,temp,condition) => {
    try {
        let price = 0

        switch (cityName) {
            case 'Kyoto':
                price = 1000
                break
            case 'Rome':
                price = 1500
                break
            case 'Sydney':
                price = 1700
                break
            case 'Rio de Janeiro':
                price = 800
                break
            case 'Bangkok':
                price = 1100
                break
            case 'Antalia':
                price = 700
                break
            default:
                price = 500
                break
        }
        // Adjust price based on temperature
        if (temp < 10) {
            price += 200
        }
        switch (condition) {
            case 'showers':
                price -= 100
                break
            case 'thunderstorm':
                price = 0
                break
            default:
                break
        }

        switch(hotelRating) {
            case '5':
                price += 500
                break
            case '4':
                price += 400
                break
            case '3':
                price += 300
                break
            case '2':
                price += 200
                break
            case '1':
                price += 100
                break
            default:
                price += 100
                break
        }
        price *= adults

        if (children > 0) {
            for (let i = 0; i < children; i++) {
                price += 200
            }
        }
        return price
    } catch (error) {
        console.error('Error calculating price:', error.message)
        throw new Error('Error calculating price')
    }

}

module.exports =  calculatePrice
