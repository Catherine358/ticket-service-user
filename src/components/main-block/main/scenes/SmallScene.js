import React from "react";
import Grid from "@material-ui/core/Grid";
import { updateTickets, updatePriceSum, updateCount } from "../../../actions/actions";
import { findColorOrPrice } from "../../../utils/functions-for-shopping-cart";

const Row = (index, row,  color, price, dispatch) => {
    let rows = [];
    let seats = [];
    for(let j = 0; j < index; j++){
        let side = Math.round(index / 2);
        seats.push(<span className="hall-1-place"
                         key={`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`}
                         id={`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`}
                         style={{backgroundColor: `${color === null ? "" : color}`}}
        onClick={() => {
            dispatch(updateTickets(`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`, 1));
            dispatch(updatePriceSum(price, 1));
            dispatch(updateCount(1, 1));
        }}>
                    {j + 1 <= side ? j + 1 : index - j}</span>);
    }
    rows.push(<p key={row + "SmallScene"} className="hall-1-row">{seats}</p>);
    return rows;
};

const Scene = ({ priceRanges }, dispatch) => {
    let rows = [];
    let index = 17;
    let color = null;
    let price = null;
    for(let i = 0; i < 9; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(Row(index, i + 1, color, price, dispatch));
        index++;
    }
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SmallScene = ({ priceRanges, dispatch }) => {
    return (
                <div className="hall-1-container row w-100 h-auto justify-content-center flex-nowrap ml-0 mr-0">
                <div className="hall-1">
                    {Scene(priceRanges, dispatch)}
                </div>
            </div>
    );
};

export default SmallScene;