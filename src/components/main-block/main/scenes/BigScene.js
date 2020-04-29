import React from "react";
import Grid from "@material-ui/core/Grid";
import { updateTickets, updatePriceSum, updateCount } from "../../../actions/actions";
import { findColorOrPrice } from "../../../utils/functions-for-shopping-cart";

const RowLeft = (index, row, color, price, dispatch) => {
    let rows = [];
    let seats = [];
    for(let i = 0; i < index; i++){
        seats.push(<span className="hall-2-place" key={`${row}-${i + 1}L`}
                         id={`${row}-${i + 1}L`}
                         onClick={() => {
                             dispatch(updateTickets(`${row}-${i + 1}L`, 1));
                             dispatch(updatePriceSum(price, 1));
                             dispatch(updateCount(1, 1));
                         }}
                         style={{backgroundColor: `${color === null ? "" : color}`}}>
                {i + 1}</span>)
    }
    rows.push(<p key={row + "RowLeft"} className="hall-2-row">{seats}</p>);
    return rows;
};

const RowRight = (index, row, color, price, dispatch) => {
    let rows = [];
    let seats = [];
    for(let i = index; i > 0; i--){
        seats.push(<span className="hall-2-place" key={`${row}-${i}R`}
                         id={`${row}-${i}R`}
                         onClick={() => {
                             dispatch(updateTickets(`${row}-${i}R`, 1));
                             dispatch(updatePriceSum(price, 1));
                             dispatch(updateCount(1, 1));
                         }}
                         style={{backgroundColor: `${color === null ? "" : color}`}}>
                {i}</span>)
    }
    rows.push(<p key={row + "RowRight"} className="hall-2-row">{seats}</p>);
    return rows;
};

const RowCenter = (index, row, startIndex, color, price, dispatch) => {
    let rows = [];
    let seats = [];
    for(let i = startIndex; i < index + startIndex; i++){
        let side = Math.round((index + (startIndex - 1) * 2) / 2);
        seats.push(<span className="hall-2-place" key={`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`}
                         id={`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`}
                         onClick={() => {
                             dispatch(updateTickets(`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`, 1));
                             dispatch(updatePriceSum(price, 1));
                             dispatch(updateCount(1, 1));
                         }}
                         style={{backgroundColor: `${color === null ? "" : color}`}}>
                {i <= side ? i : (index + (startIndex) * 2) - i - 1}</span>)
    }
    rows.push(<p key={row + "RowCenter"} className="hall-2-row">{seats}</p>);
    return rows;
};

const SceneLeftSideTop = ({ priceRanges }, dispatch) => {
    let rows = [];
    let index = 3;
    let color = null;
    let price = null;
    for(let i = 0; i < 8; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(RowLeft(index, i + 1, color, price, dispatch));
        rows.push(<div key={i + "divsceneLeftTop"} className="w-100"/>);
        index++;
    }
    rows.push(RowLeft(--index, 9, color, price, dispatch));
    rows.push(<div key={8 + "divsceneLeftTop"} className="w-100"/>);
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SceneRightSideTop = ({ priceRanges }, dispatch) => {
    let rows = [];
    let index = 3;
    let color = null;
    let price = null;
    for(let i = 0; i < 8; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(RowRight(index, i + 1, color, price, dispatch));
        rows.push(<div key={i + "divsceneRightTop"} className="w-100"/>);
        index++;
    }
    rows.push(RowRight(--index, 9, color, price, dispatch));
    rows.push(<div key={8 + "divsceneRightTop"} className="w-100"/>);
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SceneLeftSideBottom = ({ priceRanges }, dispatch) => {
    let rows = [];
    let index = 9;
    let color = null;
    let price = null;
    for(let i = 0; i < 5; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 10, priceRanges, 1);
            price = findColorOrPrice(i + 10, priceRanges, -1);
        }
        rows.push(RowLeft(index, i + 10, color, price, dispatch));
        rows.push(<div key={i + "divsceneLeftBottom"} className="w-100"/>);
        index--;
    }
    return (
        <Grid container direction="row" justify="flex-end" className="left-bottom-side">
            {rows}
        </Grid>
    );
};

const SceneRightSideBottom = ({ priceRanges }, dispatch) => {
    let rows = [];
    let index = 9;
    let color = null;
    let price = null;
    for(let i = 0; i < 5; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 10, priceRanges, 1);
            price = findColorOrPrice(i + 10, priceRanges, -1);
        }
        rows.push(RowRight(index, i + 10, color, price, dispatch));
        rows.push(<div key={i + "divsceneRightBottom"} className="w-100"/>);
        index--;
    }
    return (
        <Grid container direction="row" justify="flex-start" className="right-bottom-side">
            {rows}
        </Grid>
    );
};

const SceneCenter = ({ priceRanges }, dispatch) => {
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
            rows.push(RowCenter(index, i + 1, startIndex, color, price, dispatch));
            startIndex++;
            index++;
            if(i === 7){
                flag = true;
                startIndex--;
            }
        }else{
            rows.push(RowCenter(index, i + 1, startIndex, color, price, dispatch));
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

const BigScene = ({ priceRanges, dispatch }) => {
    return (
        <div className="middle hall-2-container row justify-content-between flex-nowrap ml-0 mr-0">
            <div className="hall-2-left-side">
                {SceneLeftSideTop(priceRanges, dispatch)}
                {SceneLeftSideBottom(priceRanges, dispatch)}
            </div>
            <div className="hall-2-center">
                {SceneCenter(priceRanges, dispatch)}
            </div>
            <div className="hall-2-right-side">
                {SceneRightSideTop(priceRanges, dispatch)}
                {SceneRightSideBottom(priceRanges, dispatch)}
            </div>
        </div>
    );
};

export default BigScene;