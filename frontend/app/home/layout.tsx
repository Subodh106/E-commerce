import Navbar from "@/components/web/navbar"

export default  function homeLayout  ({children}:{children:React.ReactNode}){
    return(
        <>
        <Navbar/>
        {children}
        </>
    )
}