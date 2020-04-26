import React from "react";
import Grid from "@material-ui/core/Grid";

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

const RowLeft = (index, row, color, price, setTickets, setPrices, setCount) => {
    let rows = [];
    let seats = [];
    for(let i = 0; i < index; i++){
        seats.push(<span className="hall-2-place" key={`${row}-${i + 1}L`}
                         id={`${row}-${i + 1}L`}
                         onClick={() => {
                             setTickets(`${row}-${i + 1}L`, -1);
                             setPrices(price, 1);
                             setCount(1, 1);
                         }}
                         style={{backgroundColor: `${color === null ? "" : color}`}}>
                {i + 1}</span>)
    }
    rows.push(<p key={row + "RowLeft"} className="hall-2-row">{seats}</p>);
    return rows;
};

const RowRight = (index, row, color, price, setTickets, setPrices, setCount) => {
    let rows = [];
    let seats = [];
    for(let i = index; i > 0; i--){
        seats.push(<span className="hall-2-place" key={`${row}-${i}R`}
                         id={`${row}-${i}R`}
                         onClick={() => {
                             setTickets(`${row}-${i}R`, -1);
                             setPrices(price, 1);
                             setCount(1, 1);
                         }}
                         style={{backgroundColor: `${color === null ? "" : color}`}}>
                {i}</span>)
    }
    rows.push(<p key={row + "RowRight"} className="hall-2-row">{seats}</p>);
    return rows;
};

const RowCenter = (index, row, startIndex, color, price, setTickets, setPrices, setCount) => {
    let rows = [];
    let seats = [];
    for(let i = startIndex; i < index + startIndex; i++){
        let side = Math.round((index + (startIndex - 1) * 2) / 2);
        seats.push(<span className="hall-2-place" key={`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`}
                         id={`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`}
                         onClick={() => {
                             setTickets(`${row}-${i <= side ? i : (index + (startIndex) * 2) - i - 1}${i <= side ? "L" : "R"}`, -1);
                             setPrices(price, 1);
                             setCount(1, 1);
                         }}
                         style={{backgroundColor: `${color === null ? "" : color}`}}>
                {i <= side ? i : (index + (startIndex) * 2) - i - 1}</span>)
    }
    rows.push(<p key={row + "RowCenter"} className="hall-2-row">{seats}</p>);
    return rows;
};

const SceneLeftSideTop = ({ priceRanges }, setTickets, setPrices, setCount) => {
    let rows = [];
    let index = 3;
    let color = null;
    let price = null;
    for(let i = 0; i < 8; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(RowLeft(index, i + 1, color, price, setTickets, setPrices, setCount));
        rows.push(<div key={i + "divsceneLeftTop"} className="w-100"/>);
        index++;
    }
    rows.push(RowLeft(--index, 9, color, price, setTickets, setPrices, setCount));
    rows.push(<div key={8 + "divsceneLeftTop"} className="w-100"/>);
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SceneRightSideTop = ({ priceRanges }, setTickets, setPrices, setCount) => {
    let rows = [];
    let index = 3;
    let color = null;
    let price = null;
    for(let i = 0; i < 8; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 1, priceRanges, 1);
            price = findColorOrPrice(i + 1, priceRanges, -1);
        }
        rows.push(RowRight(index, i + 1, color, price, setTickets, setPrices, setCount));
        rows.push(<div key={i + "divsceneRightTop"} className="w-100"/>);
        index++;
    }
    rows.push(RowRight(--index, 9, color, price, setTickets, setPrices, setCount));
    rows.push(<div key={8 + "divsceneRightTop"} className="w-100"/>);
    return (
        <Grid container direction="row" justify="center">
            {rows}
        </Grid>
    );
};

const SceneLeftSideBottom = ({ priceRanges }, setTickets, setPrices, setCount) => {
    let rows = [];
    let index = 9;
    let color = null;
    let price = null;
    for(let i = 0; i < 5; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 10, priceRanges, 1);
            price = findColorOrPrice(i + 10, priceRanges, -1);
        }
        rows.push(RowLeft(index, i + 10, color, price, setTickets, setPrices, setCount));
        rows.push(<div key={i + "divsceneLeftBottom"} className="w-100"/>);
        index--;
    }
    return (
        <Grid container direction="row" justify="flex-end" className="left-bottom-side">
            {rows}
        </Grid>
    );
};

const SceneRightSideBottom = ({ priceRanges }, setTickets, setPrices, setCount) => {
    let rows = [];
    let index = 9;
    let color = null;
    let price = null;
    for(let i = 0; i < 5; i++){
        if(priceRanges !== undefined){
            color = findColorOrPrice(i + 10, priceRanges, 1);
            price = findColorOrPrice(i + 10, priceRanges, -1);
        }
        rows.push(RowRight(index, i + 10, color, price, setTickets, setPrices, setCount));
        rows.push(<div key={i + "divsceneRightBottom"} className="w-100"/>);
        index--;
    }
    return (
        <Grid container direction="row" justify="flex-start" className="right-bottom-side">
            {rows}
        </Grid>
    );
};

const SceneCenter = ({ priceRanges }, setTickets, setPrices, setCount) => {
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
            rows.push(RowCenter(index, i + 1, startIndex, color, price, setTickets, setPrices, setCount));
            startIndex++;
            index++;
            if(i === 7){
                flag = true;
                startIndex--;
            }
        }else{
            rows.push(RowCenter(index, i + 1, startIndex, color, price, setTickets, setPrices, setCount));
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

const BigScene = ({priceRanges, setTickets, setPrices, setCount}) => {
    return (
        <div className="middle hall-2-container row justify-content-between flex-nowrap ml-0 mr-0">
            <div className="hall-2-left-side">
                {SceneLeftSideTop(priceRanges, setTickets, setPrices, setCount)}
                {SceneLeftSideBottom(priceRanges, setTickets, setPrices, setCount)}
            </div>
            <div className="hall-2-center">
                {SceneCenter(priceRanges, setTickets, setPrices, setCount)}
            </div>
            <div className="hall-2-right-side">
                {SceneRightSideTop(priceRanges, setTickets, setPrices, setCount)}
                {SceneRightSideBottom(priceRanges, setTickets, setPrices, setCount)}
            </div>
        </div>
    );
};

export default BigScene;