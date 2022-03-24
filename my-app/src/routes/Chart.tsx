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
    isDark: boolean;
}

function Chart({ coinId,isDark }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv",coinId],()=> fetchCoinHistory(coinId))
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
                        mode: isDark ? "dark" :"light",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        type:"datetime",
                        categories: data?.map(price => price.time_close),
                        
                        axisBorder: {
                            show:false,
                        },
                        axisTicks: {
                            show:false,
                        },
                        labels:{
                            show:false
                        },
                    },
                    grid: {
                        show: false,
                    },
                    fill: {
                        type: "gradient",
                        gradient: { gradientToColors: ["#0be881"],stops:[0,100] },
                      
                    },
                    colors:["mint"],
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    tooltip: {
                        y: {
                            formatter:(value) => `$ ${value.toFixed(2)}`
                        }
                    }
                    
                
                }}

            />)}
    </div>)
}

export default Chart;