import { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { selectColorScheme } from "../../stores/colorSchemeSlice";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import { getColor } from "../../utils/colors";
import Chart from "../../base-components/Chart";

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
            "Dec",
          ],
          datasets: [
            {
              label: "",
              data: [100, 119, 130, 180, 202, 244, 276, 310, 320, 144, 289, 384],
              borderWidth: 4,
              borderColor: colorScheme ? getColor("primary") : "",
              backgroundColor: "transparent",
              pointBorderColor: "transparent",
              tension: 0.4,
            }
          ],
        };
      }, [colorScheme, darkMode]);

      const options: ChartOptions = useMemo(() => {
        return {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: getColor("slate.500", 0.8),
                display: false,
              },
            },
          },
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
                color: darkMode
                  ? getColor("slate.500", 0.3)
                  : getColor("slate.100"),
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
                  : getColor("slate.200"),
                  borderDash: [2,2],
              },
            },
          },
        };
      }, [colorScheme, darkMode]);

      return (
        <Chart
          type="line"
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
    lineColor: "",
    className: "",
  };
  

export default Main;