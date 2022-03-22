import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
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
interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=> fetchCoinHistory(coinId))
    return (
        <div>
            {isLoading ? "loading chart..." : (<ApexChart
                series={[
                    {
                        name: "price",
                        data: data?.map(price => price.close) ?? [],
                    },
                ]
                }
                options={{
                    theme: {
                        mode: "dark"
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        axisBorder: {
                            show:false,
                        },
                        axisTicks: {
                            show:false,
                        },
                        labels:{
                            show:false
                        }
                    },
                    grid: {
                        show: false,
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    }
                    
                
                }}

            />)}
    </div>)
}

export default Chart;