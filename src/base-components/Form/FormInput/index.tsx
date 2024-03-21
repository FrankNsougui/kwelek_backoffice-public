import clsx from "clsx"
import { forwardRef, useContext, useState } from "react"
import { twMerge } from "tailwind-merge"
import { formInlineContext } from "../FormInline"
import { inputGroupContext } from "../InputGroup"

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
    formInputSize?: "sm" | "lg"
    rounded?: boolean
    icon?: string
    iconColor?: string
    errored?: boolean
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"]

const FormInput = forwardRef((props: FormInputProps, ref: FormInputRef) => { 
    const formInline = useContext(formInlineContext);
    const inputGroup = useContext(inputGroupContext);
    const { formInputSize, rounded, ...computedProps } = props;

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
        <input
            {...computedProps}
            ref={ref}
            autoComplete="off"
            onClick={(e)=> {
                setFocused(true)
                document.removeEventListener("click", onClickOutsideListener)
            }}
            className={twMerge([
            "ring-0 flex w-full flex-1 border-none focus:ring-0 font-caros text-[13px] bg-transparent",
            props.formInputSize == "sm" && "text-xs py-1.5 px-2",
            props.formInputSize == "lg" && "text-lg py-1.5 px-4",
            props.rounded && "rounded-full",
            formInline && "flex-1"
            ])}
        />
        </div>
    )
})

export default FormInput;