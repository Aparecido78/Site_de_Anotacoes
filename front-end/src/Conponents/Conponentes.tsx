interface PropsChildren{

    children:React.ReactNode
}

function Conponents({children}:PropsChildren){
    return(
        <div>
        {children}

        </div>
    )
}

export default Conponents