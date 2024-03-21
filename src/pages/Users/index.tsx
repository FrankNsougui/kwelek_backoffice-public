import { useEffect, useState } from "react"
import Table from "../../base-components/Table"
import UserServices, { IUser } from "../../services/UserServices"
import image from "../../assets/images/profile-circle.svg"
import clsx from "clsx"
import dateFormat from "dateformat"
import { IFilterParams } from "../../services/base/ICrudServices"
import Button from "../../base-components/Button"
import Popover from "../../base-components/Headless/Popover"
import CreateUserForm from "./Forms/Create"

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K
    header: string
    width?: number
    rowClassName?: any | undefined
    display?: boolean | undefined
}

export const userColumns: ColumnDefinitionType<any, keyof any>[] = [
    {
      key: 'id',
      header: 'Id',
      display: false,
    },
    {
      key: 'username',
      header: 'User Name',
      display: true,
    },
    {
        key: 'firstname',
        header: 'First Name',
        display: false,
    },
    {
        key: 'lastname',
        header: 'Last Name',
        display: false,
    },
    {
      key: 'email',
      header: 'Email',
      display: true,
    },
    {
      key: 'phonenumber',
      header: 'Phone number',
      display: true,
    },
    {
      key: 'country',
      header: 'Country',
      display: true,
    },
    {
      key: 'profession',
      header: 'Profession',
      display: true,
    },
    {
      key: 'created',
      header: 'Date Joined',
      display: true,
    },
    {
      key: 'action',
      header: '',
      display: true,
    },
]

const Main = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [usersCount, setUsersCount] = useState<number>(0)
    const size = 5
    const [error, setError] = useState<string>('')
    const [users, setUsers] = useState<IUser[]>([])
    const userServices: UserServices = new UserServices();

    const fetchUsers = (pageNumber:number) => {
        setError("")
        setLoading(true)
        var pageElement: IFilterParams = {
            page: pageNumber,
            size: size
        }
        userServices.getMany(pageElement).then((result: any) => {
            setLoading(false)
            if (result.data){
                setUsers(result.data.content)
                setTotalPages(result.data.totalPages)
                setUsersCount(result.data.totalElements)
            } else if (result.response && result.response.status === 401){
                setError('Unauthorized')
            } else if (result.response && result.response.status === 500){
                setError('Internal Server Error 500')
            } else {
                setError('No Internet connexion. Please check your network settings and try again !')
            }
        })
    }

    useEffect(()=> {
        fetchUsers(page)
    },[])

    return (
        <div className="flex flex-col mx-3 intro-x zoom-in !cursor-default rounded-2xl">
            <div className="flex flex-col pt-5 px-6 w-full bg-white rounded-2xl">
                <div className="flex-1 flex items-center justify-between">
                    {
                        loading ? (
                            <div role="status" className="max-w-sm animate-pulse flex w-32 my-1">
                                <span className="bg-gray-400 rounded-xl dark:bg-gray-700 w-full h-4"></span>
                            </div>
                        ):(<div className="flex items-center">
                            <span className="text-xl flex-1 font-semibold font-caros">All</span>
                            <Popover className="flex">
                                {({ close }) => (
                                <>
                                <Popover.Button as="a" className={clsx([
                                    "rounded-lg bg-gradient-to-r text-[12px] px-1.5 py-0.5 flex items-center from-teal-200 to-green-300 shadow-none ring-0 border-none font-caros font-medium ml-4",
                                ])}>
                                    <i className={clsx([
                                    "flex fi fi-rr-add mr-1",
                                    ])}></i>New User
                                </Popover.Button>

                                <Popover.Panel
                                    placement="bottom-start"
                                    className="text-sm !cursor-default border-[rgba(0,0,0,.00)] w-[450px] max-h-[500px] border-solid border-[1px] bg-white shadow-xl !rounded-[10px]"
                                >
                                    <CreateUserForm />
                                </Popover.Panel>
                                </>
                            )}
                            </Popover>
                        </div>)
                    }    
                </div>

                <Table 
                  columns={userColumns} 
                  currentPage={users.length > 0?page+1:page}
                  pages={totalPages}
                  loading={loading}
                  loadingRows={7}
                  className="mt-4"
                  onErrorOccured={error !== ""}
                  errorText={error}
                  onRefresh={(e)=> fetchUsers(page)}
                  emptyRecordText="No users found at this time."
                  onRowClick={(e)=> console.log(users.find((item)=> item.id === e.id))}
                  onPageChange={(e)=> {
                        if (e === 'previous'){
                            fetchUsers(page-1)
                            setPage(page-1)
                        } else {
                            fetchUsers(page+1)
                            setPage(page+1)
                        }
                  }}
                  data={
                    users.map((user)=> {

                        return {
                            id: user.id,
                            username:
                            <div className="flex items-center">
                                <img src={user.profilimage ?? image} alt={user.profilimage ?? "No image"} className={clsx([
                                    "rounded-full w-8 h-8 mr-3",
                                    user.profilimage === "" || user.profilimage === null && "opacity-30"
                                ])}/>
                                <span className="font-bold">{ user.username }</span>
                            </div>,
                            email: user.email,
                            phonenumber: user.phone,
                            country: user.country,
                            profession: user.profession,
                            created: dateFormat(user.created, "mmmm dS, yyyy"),
                            action: 
                            <i className={clsx([
                                "flex fi fi-sr-angle-right ml-2",
                                "text-slate-400",
                            ])}></i>
                        }
                    }) as any[]
                  }
                />
            </div>
        </div>
    )
}

export default Main