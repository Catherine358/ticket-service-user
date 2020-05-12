import React from "react";
import Grid from "@material-ui/core/Grid";
import { updateTickets } from "../../../actions/actions";
import { findColorOrPrice, ifPlaceIsLocked } from "../../../utils/functions-for-shopping-cart";

const Row = (index, row,  color, price, dispatch, lockedSeats, ticketsInCart) => {
    let rows = [];
    let seats = [];
    for(let j = 0; j < index; j++){
        let side = Math.round(index / 2);
        let lockedFlag = false;
        let bookedColorFlag = ticketsInCart.includes(`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`);
        if(lockedSeats !== undefined) {
            lockedFlag = ifPlaceIsLocked(lockedSeats, `${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`,
                row);
        }
        seats.push(<span className={lockedFlag ? "hall-1-place locked" : "hall-1-place"}
                         key={`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`}
                         id={`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`}
                         style={{backgroundColor: `${color === null ? "" : lockedFlag ? "#ff1632" : bookedColorFlag ? "#84cc25" : color}`,
                             cursor: `${lockedFlag ? "auto" : "pointer"}`}}
        onClick={() => {
            if(!lockedFlag) {
                dispatch(updateTickets(`${row}-${j + 1 <= side ? j + 1 : index - j}${j + 1 <= side ? "L" : "R"}`, price, 1, 1));
            }
        }}>
                    {j + 1 <= side ? j + 1 : index - j}</span>);
    }
    rows.push(<p key={row + "SmallScene"} className="hall-1-row">{seats}</p>);
    return rows;
};

const Scene = ({ priceRanges, lockedSeats }, dispatch, ticketsInCart) => {
    let rows = [];
    let index = 17;
    let color = null;
    let price = null;
    for(let i = 0; i < 9; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(Row(index, i + 1, color, price, dispatch, lockedSeats, ticketsInCart));
        index++;
    }
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SmallScene = ({ priceRanges, dispatch, ticketsInCart }) => {
    return (
                <div className="hall-1-container row w-100 h-auto justify-content-center flex-nowrap ml-0 mr-0">
                <div className="hall-1">
                    {Scene(priceRanges, dispatch, ticketsInCart)}
                </div>
            </div>
    );
};

export default SmallScene;