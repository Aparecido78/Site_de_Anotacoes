
interface PropsInput{
    type: string
    name: string
    placeholder:string
    value:string
    onChange: (e:React.ChangeEvent<HTMLInputElement>) =>void
    className?:string
}

function Input({type,name,placeholder,value,onChange,className}:PropsInput){
    return(
        <input className={className} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export default Input