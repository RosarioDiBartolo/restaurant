"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { login } from "@/lib/auth/client-login";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // ... rest of your component logic

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      const result = await login(email, password);

      if (result?.uid) {
        // Successful login, redirect
        router.push("/management");
      } else {
        // Handle login error (optional)
        alert("Login failed");
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message || "Login error");
      } else {
        alert("Login error");
      }
    }
  };

  return (
    <Card className=" container mx-3 text-center">
      <CardHeader>
        <CardTitle className=" text-xl font-semibold ">Bentornato</CardTitle>
        <CardDescription>
          Accedi con le credenziali fornite dall&apos;azienda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            suppressHydrationWarning={true}

          onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input 
          {...field} 
          value={field.value ?? ""}  // ✅ ensures value is never undefined
          placeholder="you@example.com" 
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input 
          {...field} 
          type="password" 
          value={field.value ?? ""}  // ✅ same here
          placeholder="********" 
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            <Button className=" w-full" type="submit">
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
