const addLockedSeats = (ticketsInCart, ticketsCount, pricesSum, priceRanges) => {
    let lockedSeats = [];
    let map = new Map();
    ticketsInCart.forEach(data => {
        let arr = data.split("-");
        if(map.get(arr[0]) === undefined){
            let seats = [];
            seats.push(arr[1]);
            map.set(arr[0], seats);
        }else{
            let tmp = map.get(arr[0]);
            tmp.push(arr[1]);
            map.set(arr[0], tmp);
        }
    });
    map.forEach((value, key) => {
        lockedSeats.push({
            row: key.toString(),
            seats: value
        });
    });
    localStorage.setItem("lockedSeats", JSON.stringify({
        lockedSeats: lockedSeats,
        ticketsInCart: ticketsInCart,
        ticketsCount: ticketsCount,
        pricesSum: pricesSum,
        priceRanges: priceRanges
    }));
};

const findPrice = (row, priceRanges) => {
    for(let i = 0; i < priceRanges.priceRanges.length; i++){
        if(priceRanges.priceRanges[i].rows.includes(row.toString())){
            return priceRanges.priceRanges[i].price;
        }
    }
    return null;
};

const findColorOrPrice = (row, priceRanges, idx) => {
    for(let i = 0; i < priceRanges.length; i++){
        if(priceRanges[i].rows.includes(row.toString())){
            if(idx > 0) {
                return priceRanges[i].color;
            }else{
                return priceRanges[i].price;
            }
        }
    }
    return null;
};

export {
    addLockedSeats,
    findPrice,
    findColorOrPrice
};