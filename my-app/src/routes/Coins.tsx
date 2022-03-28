import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { fetchCoins } from "./api";
const Container = styled.div`
  padding:0px 20px;
  max-width:480px;
  margin:0 auto;
`;
const Header = styled.header`
  height:10vh;
  display:flex;                      
  justify-content:center;
  align-items:center;
`;
const Loader = styled.span` 
text-align:center;
display:block;
`
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color:${props => props.theme.cardBgColor};
  color:${props => props.theme.textColor};
  border-radius:15px;
  margin-bottom: 10px;
  border: 1.3px solid white;
  a{
    padding: 20px;
    transition:color .5s ease-in; 
    display:flex;
    align-items:center;
  }
  &:hover{
    a{
      color:${props=>props.theme.accentColor}
    }
  }
`;
const Img = styled.img`
  width:35px;
  height:35px;
  margin-right: 10px ;
`
const Title = styled.h1`
font-size: 48px ;
  color: ${props=>props.theme.accentColor}; 
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}


function Coins() {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins",fetchCoins)
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>COIN LIST</Title>
        <div>
          <button>Theme Change</button>
        </div>
      </Header>
      {isLoading ? (<Loader>Loading</Loader>) : <CoinsList>
        {data?.slice(0,100).map(coin => 
          <Coin key={coin.id}><Link to={{
            pathname: `/${coin.id}`,
            state: {name:coin.name},
          }}>
            <Img src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/128/color/btc.png`}/>
            {coin.name}&rarr;
          </Link>
          </Coin>
        )}</CoinsList>}

    </Container>
  );
}
export default Coins;