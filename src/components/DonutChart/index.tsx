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

    const chartData = [32, 68];
    const chartColors = () => [
        "#6CA7FF",
        getColor("primary", 0.9)
    ];

    const data: ChartData = useMemo(() => {
        return {
          labels: ["Inactive", "Active"],
          datasets: [
            {
              data: chartData,
              backgroundColor: colorScheme ? chartColors() : "",
              hoverBackgroundColor: colorScheme ? chartColors() : "",
              borderWidth: 0,
              borderColor: darkMode ? getColor("darkmode.700") : getColor("white"),
            },
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
                boxWidth: 9,
                boxHeight: 9,
                borderRadius: 10,
                useBorderRadius: true,
                padding: 50
                
              },
              position: 'right'
            },
          },
          cutout: "70%",
        };
      }, [colorScheme, darkMode]);

      return (
        <Chart
          type="doughnut"
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