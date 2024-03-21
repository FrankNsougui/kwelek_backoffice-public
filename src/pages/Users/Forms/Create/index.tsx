import clsx from "clsx"
import Button from "../../../../base-components/Button"
import FormInput from "../../../../base-components/Form/FormInput"
import FormSelect from "../../../../base-components/Form/FormSelect"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import countries from "../../../../assets/files/country.json"
import UserServices, { IUser } from "../../../../services/UserServices"
import { useRef, useState } from "react"
import FormLabel from "../../../../base-components/Form/FormLabel"
import Notification, { NotificationElement } from "../../../../base-components/Notification"

const Main = () => {

    const userServices: UserServices = new UserServices();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('')

    const basicNonStickyNotification = useRef<NotificationElement>();
    const basicNonStickyNotificationToggle = () => {
      basicNonStickyNotification.current?.showToast();
    };

    const schema = yup.object({
        country: yup.string().required("Please select country !"),
        firstname: yup.string().required("First Name is required !"),
        lastname: yup.string().required("Last Name is required !"),
        birthday: yup.date().required("Birth Date is required !"),
        email: yup.string().required("Email is required !"),
        profession: yup.string().required("Profession is required !"),
        phone: yup.string().required("Phone Number is required !"),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    })

    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await methods.trigger();
  
        if (!result){
  
        } else {

          const values = methods.getValues()

          const newUser: IUser = {
            username: `${values.firstname} ${values.lastname}`,
            tag: `@${values.firstname}${values.lastname}`,
            password: "12345678",
            selected: true,
            roleId: 1,
            ...values
          };

          setLoading(true)

          userServices.create(newUser).then((result: any)=> {

            setLoading(false)

            if (result.data){
                console.log(result.data)
            } else if (result.response && result.response.status === 401){
                setError('Unauthorized')
            } else if (result.response && result.response.status === 500){
                setError('Internal Server Error 500')
                basicNonStickyNotificationToggle()
            } else {
                setError('No Internet connexion. Please check your network settings and try again !')
                basicNonStickyNotificationToggle()
            }
          })
          
        }
  
    }

    return (
        <form name="create-user-form" className="flex flex-col" onSubmit={onSubmit}>
            <div className="flex items-center p-6 bg-teal-100 rounded-t-xl">
                <span className="font-caros font-regular text-xl">Add User</span>
            </div>
            <div className="overflow-y-auto overflow-x-hidden max-h-[300px] p-6">
                <div className="grid grid-cols-12 gap-4 gap-y-5">
                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="country">Select User Country</FormLabel>
                        <FormSelect
                            {...methods.register("country")}
                            id="country"
                            name="country"
                            icon="globe"
                            disabled={loading}
                            onChange={(e) => methods.setValue('country', e.target.value, { shouldValidate: true })}
                            iconColor={typeof methods.formState?.errors?.country?.message === "string" &&
                            methods.formState?.errors?.country?.message ? "text-red-500":""}
                            className={clsx([
                                typeof methods.formState?.errors?.country?.message === "string" &&
                                methods.formState?.errors?.country?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}> 
                            <option disabled selected>Select Country</option>
                            {
                                countries.map((item)=> (
                                <option key={item.Code+item.Name} value={item.Name}>{item.Name}</option>
                                ))
                            }
                        </FormSelect>
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.country?.message === "string" &&
                                methods.formState?.errors?.country?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="firstname">User First Name</FormLabel>
                        <FormInput
                            {...methods.register("firstname")}
                            id="firstname" 
                            type="text" 
                            name="firstname"
                            icon="user"
                            disabled={loading}
                            iconColor={typeof methods.formState?.errors?.firstname?.message === "string" &&
                            methods.formState?.errors?.firstname?.message ? "text-red-500":""}
                            placeholder="First Name"
                            className={clsx([
                                typeof methods.formState?.errors?.firstname?.message === "string" &&
                                methods.formState?.errors?.firstname?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}
                        />
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.firstname?.message === "string" &&
                                methods.formState?.errors?.firstname?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="lastname">User Last Name</FormLabel>
                        <FormInput
                            {...methods.register("lastname")}
                            id="lastname" 
                            type="text" 
                            name="lastname"
                            icon="user"
                            disabled={loading}
                            iconColor={typeof methods.formState?.errors?.lastname?.message === "string" &&
                            methods.formState?.errors?.lastname?.message ? "text-red-500":""}
                            placeholder="Last Name"
                            className={clsx([
                                typeof methods.formState?.errors?.lastname?.message === "string" &&
                                methods.formState?.errors?.lastname?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}
                        />
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.lastname?.message === "string" &&
                                methods.formState?.errors?.lastname?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="birthday">User Birth Date</FormLabel>
                        <FormInput
                            {...methods.register("birthday")}
                            id="birthday" 
                            type="date" 
                            name="birthday"
                            icon="calendar"
                            disabled={loading}
                            iconColor={typeof methods.formState?.errors?.birthday?.message === "string" &&
                            methods.formState?.errors?.birthday?.message ? "text-red-500":""}
                            className={clsx([
                                typeof methods.formState?.errors?.birthday?.message === "string" &&
                                methods.formState?.errors?.birthday?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}
                            placeholder="Birth Date"
                        />
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.birthday?.message === "string" &&
                                methods.formState?.errors?.birthday?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="email">User Email</FormLabel>
                        <FormInput
                            {...methods.register("email")}
                            id="email" 
                            type="email" 
                            name="email"
                            icon="envelope"
                            disabled={loading}
                            iconColor={typeof methods.formState?.errors?.email?.message === "string" &&
                            methods.formState?.errors?.email?.message ? "text-red-500":""}
                            className={clsx([
                                typeof methods.formState?.errors?.email?.message === "string" &&
                                methods.formState?.errors?.email?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}
                            placeholder="Email"
                        />
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.email?.message === "string" &&
                                methods.formState?.errors?.email?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="email">User Profession</FormLabel>
                        <FormInput
                            {...methods.register("profession")}
                            id="profession" 
                            type="text" 
                            name="profession"
                            icon="briefcase"
                            disabled={loading}
                            iconColor={typeof methods.formState?.errors?.profession?.message === "string" &&
                            methods.formState?.errors?.profession?.message ? "text-red-500":""}
                            className={clsx([
                                typeof methods.formState?.errors?.profession?.message === "string" &&
                                methods.formState?.errors?.profession?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}
                            placeholder="Profession"
                        />
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.profession?.message === "string" &&
                                methods.formState?.errors?.profession?.message}
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="phonenumber">User Phone Number</FormLabel>
                        <FormInput
                            {...methods.register("phone")}
                            id="phonenumber" 
                            type="text" 
                            name="phone"
                            icon="phone-call"
                            disabled={loading}
                            iconColor={typeof methods.formState?.errors?.phone?.message === "string" &&
                            methods.formState?.errors?.phone?.message ? "text-red-500":""}
                            className={clsx([
                                typeof methods.formState?.errors?.phone?.message === "string" &&
                                methods.formState?.errors?.phone?.message ? "focus:!ring-red-200 !border-red-500":"",
                            ])}
                            placeholder="Phone Number"
                        />
                        { methods.formState?.errors && (
                            <div className="mt-1 text-red-500 text-[13px]">
                                {typeof methods.formState?.errors?.phone?.message === "string" &&
                                methods.formState?.errors?.phone?.message}
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className="flex items-center justify-end border-t p-3">
                <Button disabled={loading} type="submit" className={clsx([
                    "rounded-lg bg-primary text-[12px] text-white px-3 py-1.5 flex items-center shadow-none ring-0 border-none font-caros font-medium",
                ])}>
                    Save user
                </Button>
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
        </form>
    )
}

export default Main