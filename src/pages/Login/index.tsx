import clsx from "clsx"
import logoSVG from '../../assets/images/icon.png'
import FormLabel from "../../base-components/Form/FormLabel"
import FormInput from "../../base-components/Form/FormInput"
import Button from "../../base-components/Button"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import UserServices from "../../services/UserServices"
import { useRef, useState } from "react"
import Notification, { NotificationElement } from "../../base-components/Notification"
import { useNavigate } from "react-router-dom"
import { isTokenAdmin, setToken } from "../../stores/jwtTokenSlice"
import { useDispatch } from "react-redux"
import jwtDecode from "jwt-decode"
import AuthServices from "../../services/AuthServices"


const Login = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] =  useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authServices: AuthServices = new AuthServices();

    const basicNonStickyNotification = useRef<NotificationElement>();
    const basicNonStickyNotificationToggle = () => {
      basicNonStickyNotification.current?.showToast();
    };

    const adminSignInSchema = yup.object({
      email: yup.string().required("Invalid E-mail Address !"),
      password: yup.string().required("Invalid Password !")
    })

    const adminSignInMethods = useForm({
      mode: "onChange",
      resolver: yupResolver(adminSignInSchema),
    })

    const onAdminSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = await adminSignInMethods.trigger();

      if (!result){

      } else {
        window.scroll({top: 0})
        const values = adminSignInMethods.getValues();

          setLoading(true)
          authServices.login(values.email, values.password).then((res: any)=> {
            setLoading(false)
            if (res.data){
              setError("")
              const role = isTokenAdmin(res.data?.body.accessToken!)
              console.log(role)
              if (!role){
                location.href = "/dashboard"
                dispatch(setToken(res.data?.body))
              } else {
                setError("You don't have authorizations to access to Administration Portal.")
                basicNonStickyNotificationToggle()
              }
            } else if (res.response.status && res.response.status === 401){
                setError("Invalid Email or Password. Please try again !")
                basicNonStickyNotificationToggle()
            } else if (res.response.status && res.response.status === 500){
                setError("Internal Server Error. Please contact System Admin to solve this issue.")
                basicNonStickyNotificationToggle()
            } else {
                setError("Unable to connect to Internet. Please check your connection settings and try again.")
                basicNonStickyNotificationToggle()
            }
          })
      }

    }

    return (
        <>
          <div className={clsx([
            "h-screen",
            "flex flex-col bg-gradient-to-r from-primary/5 via-secondary/5 justify-center col-span-12"
          ])}>
            <div className="flex flex-col flex-1 items-center justify-center">
              <a href="/login" className="flex items-center -intro-y">
                <img src={logoSVG} className="flex justify-center items-center w-[30px] mr-[0.50rem]"/>
                <span className="flex items-center justify-center font-antapani text-4xl">Kwelek</span>
              </a>

              <div className="flex flex-col z-100 p-5 mt-10 intro-x bg-white max-w-[350px] rounded-3xl shadow-2xl shadow-secondary/10">
                <span className="text-lg font-semibold font-caros text-[#241F17]">Login to the Admin Portal</span>
                <span className="text-xs text-[#454647] mt-2 font-caros">Enter your email and password to login to your account</span>

                {/** Form */}
                <form className="flex flex-col" name="admin-login-form" onSubmit={onAdminSubmit}>
                    <div className="mt-6">
                      <FormInput
                      {...adminSignInMethods.register("email")}
                      id="email" 
                      type="email" 
                      name="email"
                      icon="envelope"
                      iconColor={typeof adminSignInMethods.formState?.errors?.email?.message === "string" &&
                      adminSignInMethods.formState?.errors?.email?.message ? "text-red-500":""}
                      disabled={loading}
                      placeholder="Username or Email Address"
                      className={clsx([
                        typeof adminSignInMethods.formState?.errors?.email?.message === "string" &&
                        adminSignInMethods.formState?.errors?.email?.message ? "focus:!ring-red-200 !border-red-500":"",
                      ])}
                        />
                        { adminSignInMethods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof adminSignInMethods.formState?.errors?.email?.message === "string" &&
                                adminSignInMethods.formState?.errors?.email?.message}
                            </div>
                        )}
                    </div>

                    <div className="mt-5">
                      <FormInput 
                      {...adminSignInMethods.register("password")}
                      id="password" 
                      type="password" 
                      name="password"
                      icon="lock"
                      iconColor={typeof adminSignInMethods.formState?.errors?.password?.message === "string" &&
                      adminSignInMethods.formState?.errors?.password?.message ? "text-red-500":""}
                      disabled={loading}
                      placeholder="Password"
                      className={clsx([
                        typeof adminSignInMethods.formState?.errors?.password?.message === "string" &&
                        adminSignInMethods.formState?.errors?.password?.message ? "focus:!ring-red-200 !border-red-500":"",
                      ])} />
                      { adminSignInMethods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof adminSignInMethods.formState?.errors?.password?.message === "string" &&
                                adminSignInMethods.formState?.errors?.password?.message}
                            </div>
                        )}
                    </div>

                    <div className="mt-7">
                      <Button variant={loading ? "":"primary"} disabled={loading} className="w-full mb-0.5 font-caros font-bold text-md py-3 rounded-2xl mr-1" type="submit">
                        { 
                          loading && (
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                          )
                        }
                        {
                          loading ? "Please wait...":"Log In"
                        }
                      </Button>
                    </div>
                </form>
              </div>
            </div>

            


            <Notification getRef={(el)=> {
              basicNonStickyNotification.current = el;
              }}
              options={{
                duration: 7000,
                position: "right",
                style: { position: "absolute", zIndex: "99999", top: "70px", "right": "40px" }
              }}
              className="flex intro-x"
              >
             <div className="flex items-center">
                <div className="flex">
                   <i className={clsx([
                    "flex fi text-3xl cursor-pointer mr-4",
                    error !== "" ? "fi-sr-circle-x":"fi-sr-check-circle",
                    error !== "" ? "text-red-500":"text-green-500"
                   ])}></i>
                </div>
                <div className="w-[200px] flex flex-col">
                    <div className="mt-1 text-slate-800 text-sm font-bold leading-4">
                        {
                          error !== "" ? "Error !":"Congratulations !"
                        }
                    </div>
                    <div className="mt-1 text-slate-800 text-[13px] leading-4">
                         { error }
                    </div>
                </div>
             </div>
            </Notification>

          </div>
        </>
    )


}

export default Login