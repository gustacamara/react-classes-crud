import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { UpdateUser } from "./UpdateUser";

export interface UserInformation {
  id?: number
  username?: string
  cpf?: string
  email?: string
  age?: number
  password?: string
  isManager?: boolean
}
export function UserData(prop: UserInformation) {


  return (
    <>
      <div className="flex m-10 gap-2 flex-col">
        <div className="flex justify-between">
          {prop.isManager? (
            <h1 className="text-3xl mb-1.5">Lista de usuários</h1>
          ) : (
              <h1 className="text-3xl mb-1.5">Suas informações</h1>
          )}
          <Button className="w-fit" asChild>
            <Link to={"/sign-up"}>
              Login
            </Link>
          </Button>
        </div>
        <div className="bg-card rounded-[5px] border">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[12px]"></TableHead>
                <TableHead className="w-[16px]">Id</TableHead>
                <TableHead className="w-[280px]">Nome</TableHead>
                <TableHead className="w-[120px]">Idade</TableHead>
                <TableHead className="w-[120px]">Cpf</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {prop.isManager
                ? [...Array(10)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"destructive"} className="rounded-[5px] size-fit">
                              <Pencil className="text-muted" />
                            </Button>
                          </DialogTrigger>
                          <UpdateUser
                            id={index + 1}
                            username={`Usuário ${25 + index}`}
                            cpf={`000.000.000-0${25 + index}`}
                            email={`usuario${25 + index}@example.com`}
                            age={20 + index}
                            password={`password${25 + index}`}
                            isManager={false}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>Usuário {index + 1}</TableCell>
                      <TableCell>{20 + index}</TableCell>
                      <TableCell>000.000.000-0{index}</TableCell>
                    </TableRow>
                  ))
                : (
                    <TableRow>
                      <TableCell>
                      </TableCell>
                      <TableCell>{prop.id}</TableCell>
                      <TableCell>{prop.username}</TableCell>
                      <TableCell>{prop.age}</TableCell>
                      <TableCell>{prop.cpf}</TableCell>
                    </TableRow>
                  )
              }
            </TableBody>
          </Table>
        </div>

      </div>
    </>
  )
}