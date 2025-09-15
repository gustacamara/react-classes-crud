import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { UpdateUser } from "./UserDetatails";
import { useEffect, useState } from "react";
import { getUsers, type UserBody } from "@/api/user";

export function UserData() {

  const navigate = useNavigate();
  const [loadedUser, setLoadedUser] = useState< null | UserBody>()
  const [users, setUsers] = useState<UserBody | UserBody[]>()

  async function loadUsers() {
    const token = localStorage.getItem('token')
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) as UserBody : null
    setLoadedUser(user)

    
    if (!token) {
      navigate("/sign-in")
      return
    }

    const result = await getUsers()
    if (!result) {
      navigate("/sign-in")
      return
    }
    setUsers(result)
  }
  useEffect(() => {
    loadUsers()
  }, []);
  return (
    <>
      <div className="flex m-10 gap-2 flex-col">
        <div className="flex justify-between">
          {loadedUser?.isManager ? (
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
              {loadedUser?.isManager && Array.isArray(users)
                ? users.map((user: UserBody) => (
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
                    <TableCell>{loadedUser?.id}</TableCell>
                    <TableCell>{loadedUser?.username}</TableCell>
                    <TableCell>{loadedUser?.email}</TableCell>
                    <TableCell>{loadedUser?.age}</TableCell>
                    <TableCell>{loadedUser?.cpf}</TableCell>
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