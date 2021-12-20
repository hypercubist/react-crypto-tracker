import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import  ApexChart from "react-apexcharts"

interface ChartProps{
    coinId : string;
}

interface IHistorical{
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close:  number,
    volume:  number,
    market_cap:  number,
}

function Chart ({coinId}:ChartProps){
    const{isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return <div>
        {isLoading ? "Loading chart...": <ApexChart type="line"
        series={[
            {
                name: "price",
                data: data?.map(price =>price.close),
            }
        ]}
        options={{
            theme:{
                mode: "dark",
            },
            chart: {
                toolbar: {
                    show:false
                    },
                height: 500,
                width: 500,
                background: "transparent",
            },
            grid:{
                show: false,
            },
            stroke:{
                curve: "smooth",
                width: 3,
            },
            fill:{
                type: "gradient",
                gradient:{
                    gradientToColors:["orange"], stops:[0,100]
                },
            },
            colors:["yellow"],
            tooltip:{
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`,
                }
            },
            yaxis:{
                show:false,
            },
            xaxis:{
                labels:{
                    show:false,
                },
                axisTicks: {
                    show: false,
                },
                axisBorder:{
                    show: false,
                },
                categories: data?.map(price =>price.time_close),
                type:"datetime",
            },

        }}
        
        />}
    </div>
}

export default Chart;