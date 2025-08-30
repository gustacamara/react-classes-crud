import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";

interface SignInForm {
  username: String
  cpf: String
  email: String
  password: String
  confPassword: String
}

export function SignUp() {
  const navegate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInForm>()

  const onSubmitSignUp = (data: SignInForm) => {
    if(data.username.length < 8) {
      alert("voce precisa ter um nome maior que 8 letras!")
      return
    }
    if(data.cpf.length != 11) {
      alert("cpf invalido")
      return
    }
    if(data.confPassword != data.password) {
      alert("Senhas nao coincidem")
      return
    }
    navegate(`../sign-in?email=${data.email}`)
  }


  return (
    <>
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8 border-1" variant="ghost">
          <Link to="../sign-in">Entre aqui</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar sua conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Comece a utilizar nosso site já!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmitSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                type="text"
                {...register('username')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">cpf</Label>
              <Input
                id="cpf"
                type="text"
                {...register('cpf')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
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
              <Label htmlFor="confPassword">Confirmar senha</Label>
              <Input
                id="confPassword"
                type="password"
                {...register('confPassword')}
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              finalizar cadastro
            </Button>
            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao continuar, você concorda com nossos
              <a className="underline underline-offset-4" href="">
                {' '}
                termos de serviço{' '}
              </a>
              e
              <a className="underline underline-offset-4" href="">
                {' '}
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}