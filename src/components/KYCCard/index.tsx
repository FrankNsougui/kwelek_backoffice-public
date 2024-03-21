import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import Button from "../../base-components/Button"
import NotificationCard from "../../base-components/Card/NotificationCard"

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
   to?: string
   completionText?: string
   cardTitle?: string
   cardText?: string
   cardButtonText?: string
   cardButtonIcon?: string
   loading?: false | boolean
   onClick?: React.EventHandler<any> | undefined
} 


const Main = (props: CardProps) => {

    const navigate = useNavigate()

    return (
        <>
        {
            props.loading ? (
                <div role="status" className="max-w-sm animate-pulse flex flex-1">
                    <span className="bg-gray-200 rounded-xl dark:bg-gray-700 flex flex-col p-6 w-full h-full">
                        <span className="bg-gray-200 rounded-xl dark:bg-gray-700 bg-gray-300 flex flex-col w-24 h-3"></span>
                        <span className="bg-gray-400 rounded-xl dark:bg-gray-700 bg-gray-300 flex flex-col w-32 h-4 mt-5"></span>
                        <span className="bg-gray-400 rounded-xl dark:bg-gray-700 bg-gray-300 flex flex-col w-34 h-2 mt-5"></span>
                    </span>
                </div>
            ):(
                <NotificationCard {...props}>
                    <span className="text-[9px] font-regular text-[#33383F] uppercase tracking-widest">{ props.completionText }</span>
                    <div className="flex justify-between items-center">
                        <span className="flex-1 text-lg font-bold text-black">{ props.cardTitle }</span>
                    </div>
                    <div className="flex flex-1 flex-col">
                    <span className="text-[12px] font-regular text-[#2C3031] mt-4 leading-4">{ props.cardText }</span>
                    </div>
                    
                    {
                        (props.to || props.onClick) && (
                            <Button onClick={props.onClick ? props.onClick:()=> navigate(props.to!)} variant="primary" className="flex items-center w-[fit-content] mt-5 px-10">
                                <span>{ props.cardButtonText }</span>
                                {
                                    props.cardButtonIcon && (<i className={clsx(["ml-2 flex text-white", props.cardButtonIcon])}></i>)
                                }
                            </Button>)
                    }
                </NotificationCard>)
        }
        </>
    )
}

export default Main