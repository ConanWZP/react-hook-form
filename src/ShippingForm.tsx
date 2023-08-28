import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IOption, IShippingFields} from "./types";
import Select from "react-select";


const options: IOption[] = [
    {
        value: 'south-korea',
        label: 'South Korea'
    },
    {
        value: 'germany',
        label: 'Germany'
    },
    {
        value: 'canada',
        label: 'Canada'
    },
    {
        value: 'usa',
        label: 'USA'
    }
]

const ShippingForm = () => {

    const {register, handleSubmit, formState: {errors}, reset, setValue, control} = useForm<IShippingFields>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IShippingFields> = (data) => {
        //alert(`Your name ${data.add}`)
        console.log(data)
        reset()
    }

    const getValue = (value: string) => {
        return value ? options.find(e => e.value === value) : ''
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Enter your shipping data</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('email', {
                            required: 'Email field is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter valid email'
                            }
                        }
                    )} placeholder={'Email'}/>

                    {
                        errors.email &&
                        <div style={{color: 'red'}}>
                            {errors.email.message}
                        </div>
                    }
                </div>
                <div>
                    <input {...register('name', {
                            required: 'Name field is required',
                            minLength: 2
                        }
                    )} type={'text'} placeholder={'Name'}/>
                    {
                        errors.name &&
                        <div style={{color: 'red'}}>
                            {errors.name.message}
                        </div>
                    }
                </div>
                <div style={{width: `52%`, margin: `15px auto`}}>
                    <Controller control={control} name={'address.country'} rules={  {required: 'Country is required'}  }
                                render={( {field: {value, onChange}, fieldState: {error}}  ) => {
                                    return (
                                        <>
                                            <Select options={options} value={getValue(value)} onChange={newValue => onChange((newValue as IOption).value)} placeholder={'Countries'}/>
                                            {
                                                error &&
                                                <div style={{color: 'red'}}>
                                                    {error.message}
                                                </div>
                                            }
                                        </>
                                    )
                                }}/>
                </div>
                <div>
                    <input {...register('address.city', {
                            required: 'City field is required'
                        }
                    )} type={'text'} placeholder={'City'}/>
                    {
                        errors.address?.city &&
                        <div style={{color: 'red'}}>
                            {errors.address.city.message}
                        </div>
                    }
                </div>
                <div>
                    <input {...register('address.street', {
                            required: 'Street field is required'
                        }
                    )} type={'text'} placeholder={'Street'}/>
                    {
                        errors.address?.street &&
                        <div style={{color: 'red'}}>
                            {errors.address.street.message}
                        </div>
                    }
                </div>
                <div>
                    <input {...register('address.house', {
                            required: 'House field is required'
                        }
                    )} type={'text'} placeholder={'House'}/>
                    {
                        errors.address?.house &&
                        <div style={{color: 'red'}}>
                            {errors.address.house.message}
                        </div>
                    }
                </div>

                <button>Send</button>
            </form>
        </div>
    );
};

export default ShippingForm;