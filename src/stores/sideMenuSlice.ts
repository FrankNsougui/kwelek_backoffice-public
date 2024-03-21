import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./stores";

export interface Menu {
    icon: any;
    title: string;
    pathname?: string;
    subMenu?: Menu[];
    ignore?: boolean;
}

export interface SideMenuState {
    menu: Array<Menu | "divider">;
}


export const adminMenu: Array<Menu | "divider"> =  [
    {
        icon: "table-columns",
        title: "Dashboard",
        pathname: '/dashboard'
    },
    {
        icon: "users",
        title: "Users",
        pathname: '/users'
    },
    {
        icon: "comment",
        title: "Feedbacks",
        pathname: '/feedbacks'
    },
    {
        icon: "diamond",
        title: "Subscriptions",
        pathname: '/subscriptions'
    },
    {
        icon: "credit-card",
        title: "Payments",
        pathname: '/payments'
    },
    {
        icon: "bell",
        title: "Notifications",
        pathname: '/notifications'
    },
    {
        icon: "settings",
        title: "Settings",
        pathname: '/settings'
    }
]


const initialState: SideMenuState = {
    menu: adminMenu
};

export const sideMenuSlice = createSlice({
    name: "sideMenu",
    initialState,
    reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu

export default sideMenuSlice.reducer;