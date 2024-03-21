import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/profile-circle.svg"
import Button from "../../base-components/Button";
import SimpleCard from "../../base-components/Card/SimpleCard";
import FormInput from "../../base-components/Form/FormInput";
import Menu from "../../base-components/Headless/Menu";
import Popover from "../../base-components/Headless/Popover";
import { useAppSelector } from "../../stores/hooks";
import { setToken, selectToken } from "../../stores/jwtTokenSlice";
import { camelCase } from "../../utils/helper";
import { IUser } from "../../services/UserServices"
import { userColumns } from "../../pages/Users";

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K
    header: string
    rowClassName?: any | undefined
    width?: number
    display?: boolean
}


const Main = (props: {
    className?: string;
}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const tokenStore = useAppSelector(selectToken);
    const [colms, setColms] = useState<(ColumnDefinitionType<any,any>)[]>([])

    useEffect(()=> {
        if (location.pathname.includes('users')){
            setColms(userColumns)
        } else {
            setColms([])
        }
    },[location.pathname])

    return (
        <>
         <div className={clsx([
            "flex py-5 h-[61px] px-6 items-center justify-between sticky top-0 z-[9999] w-full backdrop-blur flex-none transition-colors duration-500 supports-backdrop-blur:bg-white/95 bg-white my-3 shadow-xl shadow-slate-50 rounded-2xl",
            props.className ?? ""
         ])}>
            <div className="flex items-center w-full">
                <span className="flex-1 text-xl font-semibold intro-x">{camelCase(location.pathname.replaceAll('/', ''))}</span>
                <div className="flex flex-0 items-center">
                    {
                        location.pathname !== "/dashboard" && location.pathname !== "/settings" && (
                            <div className="flex mx-5 items-center justify-end">
                                <FormInput
                                    id="search" 
                                    type="text" 
                                    name="search"
                                    icon="search"
                                    placeholder="Search"
                                    className="border-transparent w-[400px] bg-slate-100"
                                />
                                <Popover className="flex absolute mr-4">
                                {({ close }) => (
                                    <>
                                    <Popover.Button as="a" className={clsx([
                                        "flex-0",
                                    ])}>
                                        <i className={clsx([
                                            "flex fi fi-rr-settings-sliders text-[13px]",
                                            "text-dark"
                                        ])}></i>
                                    </Popover.Button>

                                    <Popover.Panel
                                        placement="bottom-end"
                                        className="text-sm border-[rgba(0,0,0,.00)] w-[200px] border-solid border-[1px] bg-white shadow-xl !rounded-[10px]"
                                    >
                                        <span className="flex text-md font-semibold text-dark px-3 pt-3">Filter by</span>
                                        <span className="flex text-[11px] font-medium text-slate-500 pb-3 px-3 mt-1 leading-4">Only one column must be default selected</span>
                                        <hr />
                                        <div className="flex flex-col p-3 max-h-[300px] overflow-y-auto overflow-x-hidden">
                                        {
                                            colms.map((item, index)=> item.key !== 'action' && (
                                                <div onClick={(e)=> {
                                                
                                                }} key={item.header+index} className="flex select-none items-center cursor-pointer text-[12px] text-slate-600 hover:bg-slate-100 hover:text-black rounded-md font-medium text-[#241F17] p-2">
                                                    <i className={clsx([
                                                    "flex mr-2",
                                                    "text-slate-300 fi-br-check-circle"
                                                    ])}></i>
                                                    <span className="text-ellipsis whitespace-normal">{ item.header }</span>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </Popover.Panel>
                                    </>
                                )}
                                </Popover>
                                </div>
                        )
                    }
                    <Menu>
                        <Menu.Button>
                            <div className="flex items-center border border-solid border-[2px] border-primary p-0.5 rounded-full">     
                              <img src={image} alt="cover" width="28" className="opacity-30"/>
                            </div>
                        </Menu.Button>
                        <Menu.Items className="w-56 mt-px relative bg-white before:block before:absolute before:bg-white before:inset-0 before:rounded-md before:z-[-1]">
                            <Menu.Header className="font-normal">
                                <div className="font-medium">{ tokenStore?.username }</div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                { tokenStore?.email }
                                </div>
                                <span className="flex items-center w-[fit-content] text-[12px] text-primary leading-2 mt-2">
                                    <i className={clsx([
                                        "flex fi fi-sr-user mr-2",
                                    ])}></i>
                                    Admin Account
                                </span>
                            </Menu.Header>
                            <Menu.Divider className="bg-slate-200" />
                            <Menu.Item className="hover:bg-slate-100" onClick={()=> {
                                navigate("/settings")
                            }}>
                            <i className={clsx([
                                "flex fi fi-rr-settings mr-2",
                                "text-[#241F17]"
                            ])}></i> Settings
                            </Menu.Item>
                            <Menu.Item className="hover:bg-slate-100">
                            <i className={clsx([
                                "flex fi fi-rr-lock mr-2",
                                "text-[#241F17]"
                            ])}></i> Reset Password
                            </Menu.Item>
                            <Menu.Divider className="bg-slate-200" />
                            <Menu.Item className="hover:bg-slate-100 text-red-500" onClick={()=> {
                                dispatch(setToken(null as any));
                                navigate("/login")
                            }}>
                            <i className={clsx([
                                "flex fi fi-rr-sign-out-alt mr-2"
                            ])}></i> Log Out
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
         </div>
        </>
    )
}

export default Main;