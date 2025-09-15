import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { deleteUser, updateUser, type UserBody } from "@/api/user"

type EditUserDetails = {
  id: number
  username: string
  cpf: string
  email: string
  age: number
  password: string
  newPassword: string
}

export function UpdateUser(props: UserBody) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<EditUserDetails>()

  const updateUserInformation = async (data: EditUserDetails) => {
    if (!data.password) {
      alert("Coloque a senha para atualizar as informações!")
      return;
    }
    const updatedData = {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      newPassword: data.newPassword ?? null,
      age: data.age
    }
    await updateUser(updatedData)
    window.location.reload()
  }

  const removeUserAccount = async (data: EditUserDetails) => {
    await deleteUser(data.id)
    window.location.reload()
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
              {...register('password')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Nova senha</Label>
            <Input
              id="newPassword"
              type="password"
              {...register('newPassword')}
            />
          </div>

          <div className="space-y-2 gap-4 flex justify-between">
            <Button
              type="button"
              variant="destructive"
              className="py-2 rounded transition flex-1"
              disabled={isSubmitting}
              onClick={handleSubmit(removeUserAccount)}
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