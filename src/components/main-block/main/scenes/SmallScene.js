import React from "react";
import Grid from "@material-ui/core/Grid";

const Row = (index, row,  color, price, setTickets, setPrices, setCount) => {
    let rows = [];
    let seats = [];
    for(let j = 0; j < index; j++){
        let side = Math.round(index / 2);
        seats.push(<span className="hall-1-place"
                         key={`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`}
                         id={`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`}
                         style={{backgroundColor: `${color === null ? "" : color}`}}
        onClick={() => {
            setTickets(`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`, -1);
            setPrices(price, 1);
            setCount(1, 1);
        }}>
                    {j + 1 <= side ? j + 1 : index - j}</span>);
    }
    rows.push(<p key={row + "SmallScene"} className="hall-1-row">{seats}</p>);
    return rows;
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

const Scene = ({ priceRanges }, setTickets, setPrices, setCount) => {
    let rows = [];
    let index = 17;
    let color = null;
    let price = null;
    for(let i = 0; i < 9; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(Row(index, i + 1, color, price, setTickets, setPrices, setCount));
        index++;
    }
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SmallScene = ({priceRanges, setTickets, setPrices, setCount}) => {
    return (
                <div className="hall-1-container row w-100 h-auto justify-content-center flex-nowrap ml-0 mr-0">
                <div className="hall-1">
                    {Scene(priceRanges, setTickets, setPrices, setCount)}
                </div>
            </div>
    );
};

export default SmallScene;