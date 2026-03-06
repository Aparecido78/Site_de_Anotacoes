

interface PropsButton{
    type: "button" | "submit" | "reset"
    children: React.ReactNode
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) =>void
    className?:string

}

function Button({type,children,onClick,className}:PropsButton){
    return(
        <button className={className} onClick={onClick} type={type}>{children}</button>
    )
}

export default Button