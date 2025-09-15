import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { UpdateUser } from "./UserDetatails";
import { useEffect, useState } from "react";
import { getUsers } from "@/api/user";

export interface UserInformation {
  id: number
  username: string
  cpf: string
  email: string
  age: number
  password: string
  isManager: boolean
}
export function UserData(prop: UserInformation) {

  const [users, setUsers] = useState<UserInformation>()
  async function loadUsers() {
    const result = await getUsers()
    if (!result) return
    setUsers(result)
  }
  useEffect(() => {
    loadUsers()
  }, []);
  return (
    <>
      <div className="flex m-10 gap-2 flex-col">
        <div className="flex justify-between">
          {prop.isManager ? (
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
                <TableHead className="w-[280px]">Username</TableHead>
                <TableHead className="w-[160px]">Email</TableHead>
                <TableHead className="w-[120px]">Idade</TableHead>
                <TableHead className="w-[120px]">Cpf</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {prop.isManager && Array.isArray(users)
                ? users.map((user: UserInformation) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={"destructive"} className="rounded-[5px] size-fit">
                            <Pencil className="text-muted" />
                          </Button>
                        </DialogTrigger>
                        <UpdateUser
                          id={user.id}
                          username={user.username}
                          cpf={user.cpf}
                          email={user.email}
                          age={user.age}
                          password={user.password}
                          isManager={user.isManager}
                        />
                      </Dialog>
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.cpf}</TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{prop.id}</TableCell>
                    <TableCell>{prop.username}</TableCell>
                    <TableCell>{prop.email}</TableCell>
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