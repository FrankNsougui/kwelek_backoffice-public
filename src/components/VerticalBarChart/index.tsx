import Chart from "../../base-components/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "../../utils/colors";
import { selectColorScheme } from "../../stores/colorSchemeSlice";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
}

const Main = (props: MainProps) => {
    const colorScheme = useAppSelector(selectColorScheme);
    const darkMode = useAppSelector(selectDarkMode);

    const data: ChartData = useMemo(() => {
        return {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        datasets: [
            {
            label: "",
            barPercentage: 0.5,
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 3,
            radius: 30,
            borderRadius: 30,
            data: [100, 119, 130, 180, 202, 244, 276, 310, 320, 144, 289, 384],
            backgroundColor: colorScheme ? getColor("primary") : "",
            }
        ],
        };
    }, [colorScheme, darkMode]);

    const options: ChartOptions = useMemo(() => {
        return {
        maintainAspectRatio: false,
        scales: {
            x: {
            stacked: true,
            ticks: {
                font: {
                size: 12,
                },
                color: getColor("slate.500", 0.8),
            },
            grid: {
                display: false,
            },
            },
            y: {
            min: 100,
            max: 400,
            ticks: {
                font: {
                size: 12,
                },
                stepSize: 100,
                color: getColor("slate.500", 0.8),
                callback: function (value) {
                    return "N" + value + 'k';
                },
            },
            grid: {
                color: darkMode
                ? getColor("slate.500", 0.3)
                : getColor("slate.100"),
                borderDash: [2, 2],
                drawBorder: false,
            },
            },
        },
        };
    }, [colorScheme, darkMode]);

    return (
        <Chart
            type="bar"
            width={props.width}
            height={props.height}
            data={data}
            options={options}
            className={props.className}
        />
    );
}

Main.defaultProps = {
    width: "auto",
    height: "auto",
    className: "",
  };
  
export default Main;