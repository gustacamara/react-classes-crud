import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return(
    <>
      <div className="grid min-h-screen grid-cols-2 antialiased">
        <div className="border-foreground/5 text-muted-foreground bg-muted flex h-full flex-col justify-between border-r p-10">
          <div className="text-foreground flex items-center gap-3 text-lg">
            <span className="font-semibold">Crud do gusta</span>
          </div>
          <footer className="text-sm">
            Feito por Gusta - 27/08/2025
          </footer>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <Outlet/>
        </div>
      </div> 
    </>
  )
}