import clsx from "clsx";
import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { formInlineContext } from "../FormInline";

interface FormSelectProps extends React.ComponentPropsWithoutRef<"select"> {
  formSelectSize?: "sm" | "lg";
  icon?: string;
  iconColor?: string;
  errored?: boolean;
}  

const FormSelect = (props: FormSelectProps) => {
    const formInline = useContext(formInlineContext);
    const { formSelectSize, ...computedProps } = props;

    const [focused, setFocused] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)

    const onClickOutsideListener = () => {
        setFocused(false)
        document.removeEventListener("click", onClickOutsideListener)
    }

  return (
      <div className={clsx([
            "flex items-center rounded-xl border",
            props.disabled && "bg-slate-100 cursor-not-allowed",
            focused && props.value !== "Search" && "border-[2px] border-primary focus:ring-0",
            !focused && "border-slate-200",
            props.className
        ])} onClick={(e)=> {
            setFocused(true)
            document.removeEventListener("click", onClickOutsideListener)
        }} onMouseLeave={()=> {
          document.addEventListener("click", onClickOutsideListener)
      }}>
        {
            props.icon !== undefined && (
                <i className={clsx([
                    "flex fi",
                    props.iconColor === "" ? focused ? "text-primary":"text-slate-400":props.iconColor,
                    "ml-4 cursor-text",
                    `fi-${focused ? 'sr':'rr'}-${props.icon}`
                ])}></i>
            )
        }
        <select
          {...computedProps}
          className={twMerge([
            "ring-0 w-full border-none focus:ring-0 font-caros text-[13px] bg-transparent",
            props.formSelectSize == "sm" && "text-xs py-1.5 pl-2 pr-8",
            props.formSelectSize == "lg" && "text-lg py-1.5 pl-4 pr-8",
            formInline && "flex-1",
            props.className,
          ])}
        >
          {props.children}
        </select>
       </div>
  );
}

export default FormSelect