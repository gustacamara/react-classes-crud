import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

interface SignInForm {
  email: String
  password: String
}

export function SignIn() {
  const navegate = useNavigate()
  const [searchParams] = useSearchParams()


  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? ''
    }
  })

  const submitSignInForm = (data: SignInForm) => {
    navegate("/")
  }

  return (
    <>
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8 border-1" variant="ghost">
          <Link to="../sign-up">Faça seu login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Visualize todos os seus dados aqui
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(submitSignInForm)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
              />

            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar Painel
            </Button >
          </form>
        </div>
      </div>
    </>
  )
}