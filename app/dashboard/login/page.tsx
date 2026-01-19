"use client";
import { loginUser } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { useTokenStore } from "@/store/token-store";
import { useUserStore } from "@/store/user-store";
import { CircleCheckBig, CircleX, Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    const isEmailValid = email.trim().length > 0 && email.includes("@");
    const isPasswordValid = password.length >= 6;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled || isLoading) return;
    setIsLoading(true);

    try {
      const loginReq = await loginUser({ email, password });

      if (loginReq && loginReq.token && loginReq.user) {
        setToken(loginReq.token);
        setUser(loginReq.user);
        toast.success("Login realizado com sucesso!", {
          description: "Agora você pode acessar seus restaurantes ou criar um novo para começar.",
          icon: <CircleCheckBig className="h-4 w-4" />,
        });

        router.push("/dashboard/restaurants");
      }
    } catch (error: any) {
      toast.error("Falha ao entrar na conta", {
        description: "Verifique seu e-mail e senha e tente novamente.",
        icon: <CircleX className="h-4 w-4" />,
      });

      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary mb-2">BRASA</h1>
          <p className="text-muted-foreground text-sm">Painel Administrativo</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-display text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Acesse sua conta para gerenciar o restaurante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleButtonClick} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button type="submit" className="w-full font-display text-white font-bold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loading variant="dots" size="sm" className="mr-2" />
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground text-xs mt-6">
          © 2026 Brasa. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
