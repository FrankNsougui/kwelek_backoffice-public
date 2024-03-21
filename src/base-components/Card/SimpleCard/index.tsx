import { twMerge } from "tailwind-merge";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
} 

const Main = (props: CardProps) => {

    const { ...computedProps } = props;

    return (
        <div className={twMerge([
            "border border-slate-100 rounded-lg dark:border-none items-center justify-between backdrop-blur flex-none transition-colors duration-500 supports-backdrop-blur:bg-white/85 bg-white/40 dark:bg-slate-500/10 dark:shadow-none shadow-sm",
            computedProps.className
        ])}>
            { props.children }
        </div>
    )
}

export default Main