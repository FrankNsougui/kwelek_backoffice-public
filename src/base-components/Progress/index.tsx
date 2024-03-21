import { createContext } from "react";
import { twMerge } from "tailwind-merge";

type ProgressProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

const ProgressBarContext = createContext<{
  value?: number | undefined
}>({
  value: 0
});

const Progress = (props: ProgressProps) => {
    return (
        <div
          {...props}
          className={twMerge([
            "w-full h-[0.4rem] bg-slate-200 rounded dark:bg-black/20",
            props.className,
          ])}
        >
          {props.children}
        </div>
      );
}

type BarProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"div">;

Progress.Bar = (props: BarProps) => {
    return (
     <ProgressBarContext.Provider value={{
      value: props["aria-valuenow"]
     }}>
        <div
          {...props}
          className={twMerge([
            "bg-primary h-full rounded text-xs text-white flex justify-center items-center",
            props.className,
          ])}

          style={{ width: props["aria-valuenow"]! > props["aria-valuemax"]! ? '112px': props["aria-valuenow"]! < props["aria-valuemin"]! ? '0px':((props["aria-valuenow"]! * 112 )/100) + 'px'}}
        >
          {props.children}
        </div>
     </ProgressBarContext.Provider>
    );
  };

export default Progress;