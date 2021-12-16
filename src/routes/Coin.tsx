import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";


interface RouteParams {
    coinId: string;
}

interface RouteState{
    name : string;
}

const Container = styled.div`
    max-width: 480px;
    margin : 0 auto;
    padding: 0 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    font-size: 30px;
    display: block;
`;

function Coin(){
    const [loading, setLoading] = useState(true);
    const { coinId }= useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    useEffect(()=>{
        (async()=>{
            const infoData = await(await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await(await fetch (`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

    return(
        <Container>
            <Header>
                <Title>{state?.name || "Loading.."}</Title> 
            </Header>
            {loading ? <Loader>Loading Coins...</Loader> : null}
        </Container>
    )
}
export default Coin;