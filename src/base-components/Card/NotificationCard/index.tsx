import { twMerge } from "tailwind-merge";

interface NotificationCardProps extends React.ComponentPropsWithoutRef<"div"> {

} 

const NotificationCard = (props: NotificationCardProps) => {
  
    return (
        <div
          className={twMerge([
            "flex flex-col",
            "border-[#1E6ADC] p-4 border-solid border-[1px] rounded-[10px] bg-[#EFF8FF]",
            props.className,
          ])}
        >
            { props.children }
        </div>
    );
}

export default NotificationCard