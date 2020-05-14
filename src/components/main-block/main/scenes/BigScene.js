import React from "react";
import Grid from "@material-ui/core/Grid";
import { updateTickets } from "../../../../actions/actions";
import {findColorOrPrice, ifPlaceIsLocked} from "../../../utils/functions-for-shopping-cart";

const RowLeft = (index, row, color, price, dispatch, lockedSeats, ticketsInCart) => {
    let rows = [];
    let seats = [];
    for(let i = 0; i < index; i++){
        let lockedFlag = false;
        let bookedColorFlag = ticketsInCart.includes(`${row}-${i + 1}L`);
        if(lockedSeats !== undefined) {
            lockedFlag = ifPlaceIsLocked(lockedSeats, `${i + 1}L`,
                row);
        }
        seats.push(<span className={lockedFlag ? "hall-2-place locked" : "hall-2-place"} key={`${row}-${i + 1}L`}
                         id={`${row}-${i + 1}L`}
                         onClick={() => {
                             if(!lockedFlag) {
                                 dispatch(updateTickets(`${row}-${i + 1}L`, price, 1, 1));
                             }
                         }}
                         style={{backgroundColor: `${color === null ? "" : lockedFlag ? "#ff1632" : bookedColorFlag ? "#84cc25" : color}`,
                             cursor: `${lockedFlag ? "auto" : "pointer"}`}}>
                {i + 1}</span>)
    }
    rows.push(<p key={row + "RowLeft"} className="hall-2-row">{seats}</p>);
    return rows;
};

const RowRight = (index, row, color, price, dispatch, lockedSeats, ticketsInCart) => {
    let rows = [];
    let seats = [];
    for(let i = index; i > 0; i--){
        let lockedFlag = false;
        let bookedColorFlag = ticketsInCart.includes(`${row}-${i}R`);
        if(lockedSeats !== undefined) {
            lockedFlag = ifPlaceIsLocked(lockedSeats, `${i}R`,
                row);
        }
        seats.push(<span className={lockedFlag ? "hall-2-place locked" : "hall-2-place"} key={`${row}-${i}R`}
                         id={`${row}-${i}R`}
                         onClick={() => {
                             if(!lockedFlag) {
                                 dispatch(updateTickets(`${row}-${i}R`, price, 1, 1));
                             }
                         }}
                         style={{backgroundColor: `${color === null ? "" : lockedFlag ? "#ff1632" : bookedColorFlag ? "#84cc25" : color}`,
                             cursor: `${lockedFlag ? "auto" : "pointer"}`}}>
                {i}</span>)
    }
    rows.push(<p key={row + "RowRight"} className="hall-2-row">{seats}</p>);
    return rows;
};

const RowCenter = (index, row, startIndex, color, price, dispatch, lockedSeats, ticketsInCart) => {
    let rows = [];
    let seats = [];
    for(let i = startIndex; i < index + startIndex; i++){
        let side = Math.round((index + (startIndex - 1) * 2) / 2);
        let lockedFlag = false;
        let bookedColorFlag = ticketsInCart.includes(`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`);
        if(lockedSeats !== undefined) {
            lockedFlag = ifPlaceIsLocked(lockedSeats, `${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`,
                row);
        }
        seats.push(<span className={lockedFlag ? "hall-2-place locked" : "hall-2-place"}
                         key={`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`}
                         id={`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`}
                         onClick={() => {
                             if(!lockedFlag) {
                                 dispatch(updateTickets(`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`,
                                     price, 1, 1));
                             }
                         }}
                         style={{backgroundColor: `${color === null ? "" : lockedFlag ? "#ff1632" : bookedColorFlag ? "#84cc25" : color}`,
                             cursor: `${lockedFlag ? "auto" : "pointer"}`}}>
                {i <= side ? i : (index + (startIndex) * 2) - i - 1}</span>)
    }
    rows.push(<p key={row + "RowCenter"} className="hall-2-row">{seats}</p>);
    return rows;
};

const SceneLeftSideTop = ({ priceRanges, lockedSeats }, dispatch, ticketsInCart) => {
    let rows = [];
    let index = 3;
    let color = null;
    let price = null;
    for(let i = 0; i < 8; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(RowLeft(index, i + 1, color, price, dispatch, lockedSeats, ticketsInCart));
        rows.push(<div key={i + "divsceneLeftTop"} className="w-100"/>);
        index++;
    }
    rows.push(RowLeft(--index, 9, color, price, dispatch, lockedSeats, ticketsInCart));
    rows.push(<div key={8 + "divsceneLeftTop"} className="w-100"/>);
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SceneRightSideTop = ({ priceRanges, lockedSeats }, dispatch, ticketsInCart) => {
    let rows = [];
    let index = 3;
    let color = null;
    let price = null;
    for(let i = 0; i < 8; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(RowRight(index, i + 1, color, price, dispatch, lockedSeats, ticketsInCart));
        rows.push(<div key={i + "divsceneRightTop"} className="w-100"/>);
        index++;
    }
    rows.push(RowRight(--index, 9, color, price, dispatch, lockedSeats, ticketsInCart));
    rows.push(<div key={8 + "divsceneRightTop"} className="w-100"/>);
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SceneLeftSideBottom = ({ priceRanges, lockedSeats }, dispatch, ticketsInCart) => {
    let rows = [];
    let index = 9;
    let color = null;
    let price = null;
    for(let i = 0; i < 5; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 10, priceRanges, 1);
            price = findColorOrPrice(i + 10, priceRanges, -1);
        }
        rows.push(RowLeft(index, i + 10, color, price, dispatch, lockedSeats, ticketsInCart));
        rows.push(<div key={i + "divsceneLeftBottom"} className="w-100"/>);
        index--;
    }
    return (
        <Grid container direction="row" justify="flex-end" className="left-bottom-side">
            {rows}
        </Grid>
    );
};

const SceneRightSideBottom = ({ priceRanges, lockedSeats }, dispatch, ticketsInCart) => {
    let rows = [];
    let index = 9;
    let color = null;
    let price = null;
    for(let i = 0; i < 5; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 10, priceRanges, 1);
            price = findColorOrPrice(i + 10, priceRanges, -1);
        }
        rows.push(RowRight(index, i + 10, color, price, dispatch, lockedSeats, ticketsInCart));
        rows.push(<div key={i + "divsceneRightBottom"} className="w-100"/>);
        index--;
    }
    return (
        <Grid container direction="row" justify="flex-start" className="right-bottom-side">
            {rows}
        </Grid>
    );
};

const SceneCenter = ({ priceRanges, lockedSeats }, dispatch, ticketsInCart) => {
    let rows = [];
    let index = 15;
    let startIndex = 4;
    let flag = false;
    let color = null;
    let price = null;
    for(let i = 0; i < 15; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        if(!flag) {
            rows.push(RowCenter(index, i + 1, startIndex, color, price, dispatch, lockedSeats, ticketsInCart));
            startIndex++;
            index++;
            if(i === 7){
                flag = true;
                startIndex--;
            }
        }else{
            rows.push(RowCenter(index, i + 1, startIndex, color, price, dispatch, lockedSeats, ticketsInCart));
            startIndex--;
            if(i === 13){
                startIndex = 1;
            }
            if(i === 11 || i === 12 || i === 13){
                index++;
            }else {
                index--;
            }
        }
    }
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const BigScene = ({ priceRanges, dispatch, ticketsInCart }) => {
    return (
        <div className="middle hall-2-container row justify-content-between flex-nowrap ml-0 mr-0">
            <div className="hall-2-left-side">
                {SceneLeftSideTop(priceRanges, dispatch, ticketsInCart)}
                {SceneLeftSideBottom(priceRanges, dispatch, ticketsInCart)}
            </div>
            <div className="hall-2-center">
                {SceneCenter(priceRanges, dispatch, ticketsInCart)}
            </div>
            <div className="hall-2-right-side">
                {SceneRightSideTop(priceRanges, dispatch, ticketsInCart)}
                {SceneRightSideBottom(priceRanges, dispatch, ticketsInCart)}
            </div>
        </div>
    );
};

export default BigScene;