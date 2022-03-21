import { useState } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components"
const Title = styled.h1`
font-size:48px;
color:${props => props.theme.accentColor};
`
const Loader = styled.span`
  text-align:center;
  display:block;
`

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;