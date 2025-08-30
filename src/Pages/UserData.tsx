import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

var IsPageActive = false
export function UserData() {
  if (!IsPageActive) {
    return <Navigate to="/sign-in" replace />
  }
  return (
    <>
      <p>
        Estou aqui dentro
      </p>
      <Button >
        <a href="/sign-in"> vamo</a>
      </Button>
    </>
  )
}