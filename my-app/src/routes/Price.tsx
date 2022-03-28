import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import styled from "styled-components"
interface IHistorical {
time_open: string;
time_close: string;
high: number;
open: number;
low: number;
close: number;
volume: number;
market_cap: number;
}
interface ChartProps{
    coinId: string;
}
const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(2,1fr);
    margin: 25px 0px;
    gap:10px;
`
const PriceItem = styled.div` 
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.5);
    padding:20px 20px;
    border-radius: 10px;
`
function Price({ coinId }: ChartProps) {
    const{isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId))
    return (
        <Container>
            <PriceItem>low{data?.map(d => <p>{d.low?.toFixed(3)}</p>)}</PriceItem>
            <PriceItem >high{data?.map(d => <p>{d?.high?.toFixed(3)}</p>)}</PriceItem>
        </Container>
        )
}

export default Price;