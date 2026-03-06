
interface PropsLabel{
    htmlFor:string
    children:React.ReactNode
    className?: string
}

function Label({htmlFor,children, className}:PropsLabel){
    return(
        <label className={className} htmlFor={htmlFor}>{children}</label>
    )
}

export default Label