import { useState,useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components"
const Title = styled.h1`
font-size:48px;
color:${props => props.theme.accentColor};
`
const Loader = styled.span`
  text-align:center;
  display:block;
`
const Container = styled.div`
  padding:0px 20px;
  max-width:480px;
  margin:0 auto;
`
const Header = styled.header`
  height:15vh;
  display:flex;
  justify-content:center;
  align-items: center;
`
interface RouteState{
  name: string;
}
interface RouteParams {
  coinId: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const PriceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(PriceData)
    })();
  },[])
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> :null}
    </Container>
  );
}
export default Coin;