import './App.css';
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

const App = () => {

    // register - стандартный параметр для инпутов, чтобы брать данные не из инпутов, а например из селектов нужно
    // использовать control
    const {register, handleSubmit, formState: {errors}, reset, setValue, control} = useForm<IShippingFields>({
        mode: 'onChange'
    })


    const onSubmit: SubmitHandler<IShippingFields> = (data) => {
        alert(`Your name ${data.address.country}`)
        console.log(data)
        reset()
    }

    const getValue = (value: string) => {
        return value ? options.find(e => e.value === value) : ''
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button>Send</button>
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

                <Controller control={control} name={'address.country'} rules={  {required: 'Country is required'}  }
                            render={( {field: {value, onChange}, fieldState: {error}}  ) => {
                    return (
                        <>
                            <Select options={options} value={getValue(value)} onChange={(newValue) => onChange(  (newValue as IOption).value ) } placeholder={'Countries'}/>
                            {
                                error &&
                                <div style={{color: 'red'}}>
                                    {error.message}
                                </div>
                            }
                        </>
                    )
                }}/>


            </form>
            <div>
                <button type={'button'} onClick={() => {
                    setValue('name', 'Jarix')
                    setValue('email', 'jarix@gmail.com')
                }}>Fill data
                </button>
            </div>
        </>
    )
};

export default App;
