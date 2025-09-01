import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import type { UserInformation } from "./UserData"


export function UpdateUser(props: UserInformation) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UserInformation>()

  const updateUserInformation = (data: UserInformation) => {
    console.log(data)
  }

  const deleteUser = (data: UserInformation) => {
    console.log(data)
  }

  return (
    <>
      <DialogContent aria-describedby={undefined}>

        <DialogTitle className="text-3xl m-0">
          Usuário
        </DialogTitle>
        <DialogDescription>
        </DialogDescription >
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Id</Label>
            <Input
              id="id"
              type="text"
              defaultValue={props.id}
              disabled
              {...register('id')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">Cpf</Label>
            <Input
              id="cpf"
              type="text"
              defaultValue={props.cpf}
              {...register('cpf')}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              defaultValue={props.username}
              {...register('username')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={props.email}
              {...register('email')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Idade</Label>
            <Input
              id="age"
              type="number"
              defaultValue={props.age}
              {...register('age', { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              defaultValue={props.password}
              {...register('password')}
            />
          </div>

          <div className="space-y-2 gap-4 flex justify-between">
            <Button
              type="button"
              variant="destructive"
              className="py-2 rounded transition flex-1"
              disabled={isSubmitting}
              onClick={handleSubmit(deleteUser)}
            >
              Deletar
            </Button>
            <Button
              type="submit"
              className="py-2 rounded transition flex-1"
              disabled={isSubmitting}
              onClick={handleSubmit(updateUserInformation)}
            >
              Atualizar
            </Button>

          </div>
        </form>
      </DialogContent>
    </>
  )
}