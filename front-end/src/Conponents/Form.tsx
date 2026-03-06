
interface PropsForm{
    onSubmit:(e:React.FormEvent<HTMLFormElement>) => void
    children: React.ReactNode
    className?: string
}

function Form({onSubmit,children,className}:PropsForm){
    return(
       <form className={className} onSubmit={onSubmit}>
        
        {children}

       </form>
    )
}

export default Form