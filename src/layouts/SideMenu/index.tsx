import { SetStateAction, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import sideMenuSlice, { selectSideMenu } from "../../stores/sideMenuSlice";
import { FormattedMenu, linkTo, nestedMenu } from "./side-menu";
import logoSVG from '../../assets/images/icon.png'
import clsx from "clsx";
import { Dispatch } from "@reduxjs/toolkit";
import SideMenuTooltip from "../../components/SideMenuTooltip";
import TopBar from "../../components/TopBar";

const Main = () => {
    const location = useLocation();
    const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu | "divider">>([]);
    const sideMenuStore = useAppSelector(selectSideMenu);
    const sideMenu = () => nestedMenu(sideMenuStore as any, location);

    useEffect(() => {
        setFormattedMenu(sideMenu());
    }, [sideMenuStore, location.pathname]);

    return (
        <div className="py-5 md:py-0">
            <div className="flex overflow-hidden">
                 {/* BEGIN: Side Menu */}
                <nav className="w-[105px] xl:w-[250px] bg-slate-50 p-5 overflow-x-hidden overflow-y-auto h-screen z-50 hidden md:block">
                   <div className="pt-3 px-3">
                        <a href="/dashboard" className="flex items-center intro-x">
                          <img src={logoSVG} className="flex justify-center items-center w-[25px] mr-[0.50rem]"/>
                          <span className="flex items-center justify-center font-antapani text-2xl">Kwelek</span>
                        </a>
                   </div>
                   <ul className="mt-7">
                     {/* BEGIN: First Child */}
                     {
                        formattedMenu.map((menu, menuKey) => (
                          menu == "divider" ? (
                            <Divider
                              type="li"
                              className={clsx([
                                "my-6",
            
                                // Animation
                                `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${
                                  (menuKey + 1) * 10
                                }`,
                              ])}
                              key={menuKey}
                            ></Divider>
                          ) : (
                                <li key={menuKey}>
                                <Menu
                                    className={clsx({
                                    // Animation
                                    [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                        (menuKey + 1) * 10
                                    }`]: !menu.active,
                                    })}
                                    menu={menu}
                                    formattedMenuState={[formattedMenu, setFormattedMenu as any]}
                                    level="first"
                                ></Menu>
                            </li>
                          )
                        ))
                        
                     }
                   </ul>
                </nav>
                 {/* END: Side Menu */}
                 {/* BEGIN: Content */}
                 <div
                    className={clsx([
                        "max-w-full md:max-w-none min-w-0 bg-slate-50 flex-1 !overflow-y-auto h-screen pb-5 mt-5 md:mt-1 relative dark:bg-darkmode-700",
                        "before:content-[''] before:w-full before:h-px before:block",
                    ])}
                    >
                    <div className="mx-3">
                    <TopBar />
                    </div>
                    <Outlet />
                 </div>
                 {/* END: Content */}
            </div>
        </div>
    )
}

function Menu(props: {
    className?: string;
    menu: FormattedMenu;
    formattedMenuState: [
      (FormattedMenu | "divider")[], 
      Dispatch<SetStateAction<any>>
    ];
    level: "first" | "second" | "third";
  }) {
    const navigate = useNavigate();
    const [formattedMenu, setFormattedMenu] = props.formattedMenuState;
  
    return (
      <SideMenuTooltip
        as="a"
        content={props.menu.title}
        href={props.menu.pathname}
        className={clsx([
          "py-2 flex items-center pl-3 text-dark mb-3 relative dark:text-slate-300 font-caros text-[13px] rounded-xl",
          {
            "text-slate-600 dark:text-slate-400":
              !props.menu.active && props.level != "first",
            "bg-dark dark:bg-transparent shadow-md shadow-slate-100":
              props.menu.active && props.level == "first",
            "hover:bg-white hover:dark:bg-transparent hover:before:content-[''] hover:before:block hover:before:inset-0 hover:before:rounded-xl hover:before:absolute hover:before:z-[-1] hover:before:border-b-[0px] hover:before:border-solid hover:before:dark:bg-darkmode-700":
              !props.menu.active &&
              !props.menu.activeDropdown &&
              props.level == "first",
            // Animation
            "after:-mr-[47px] after:opacity-0 after:animate-[0.4s_ease-in-out_0.1s_active-side-menu-chevron] after:animate-fill-mode-forwards":
              props.menu.active && props.level == "first",
          },
          props.className,
        ])}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          linkTo(props.menu, navigate);
          setFormattedMenu([...formattedMenu]);
        }}
      >
        <i
          className={clsx({
            "bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text z-10 dark:text-slate-300":
              props.menu.active && props.level == "first",
            "text-slate-700 dark:text-slate-300":
              props.menu.active && props.level != "first",
            "bell": props.menu.title === "Notifications" && props.menu.active && props.level == "first",
            "rot": props.menu.title === "Settings" && props.menu.active && props.level == "first",
            "rot3d": props.menu.title === "Subscriptions" && props.menu.active && props.level == "first",
            "pay3d": props.menu.title === "Payments" && props.menu.active && props.level == "first",
            "dark:text-slate-400": !props.menu.active,
          },[`flex fi fi-${props.menu.active ? 'sr':'rr'}-${props.menu.icon}`])}
        >
        </i>
        
        <div
          className={clsx([
            "w-full ml-3 hidden xl:flex items-center",
            {
              "text-white font-bold z-10 dark:text-slate-300":
                props.menu.active && props.level == "first",
              "text-slate-700 font-medium dark:text-slate-300":
                props.menu.active && props.level != "first",
              "dark:text-slate-400": !props.menu.active,
            },
          ])}
        >
          {props.menu.title}
        </div>
      </SideMenuTooltip>
    );
  }

  function Divider<C extends React.ElementType>(
    props: { as?: C } & React.ComponentPropsWithoutRef<C>
  ) {
    const { className, ...computedProps } = props;
    const Component = props.as || "div";
  
    return (
      <Component
        {...computedProps}
        className={clsx([
          props.className,
          "w-full h-px z-10 relative bg-white/[0.07]",
        ])}
      ></Component>
    );
  }


export default Main;