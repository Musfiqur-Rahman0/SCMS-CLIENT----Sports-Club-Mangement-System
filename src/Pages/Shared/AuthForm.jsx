import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

function AuthFormBase({
  fields,
  onSubmit,
  submitText,
  googleText,
  onGoogleLogin,
  linkText,
  linkHref,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const photo = watch("photo");
  // console.log(photo);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm"
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type}
            {...register(field.name, { required: true })}
          />
          {errors[field.name] && (
            <p className="text-sm text-red-500">{field.label} is required.</p>
          )}
        </div>
      ))}

      <Button type="submit" className="w-full">
        {submitText}
      </Button>

      {googleText && onGoogleLogin && (
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={onGoogleLogin}
        >
          <FcGoogle className="text-xl" />
          {googleText}
        </Button>
      )}

      {linkText && linkHref && (
        <p className="text-sm text-center mt-2">
          <Link to={linkHref} className="text-blue-600 hover:underline">
            {linkText}
          </Link>
        </p>
      )}
    </form>
  );
}

export const AuthForm = memo(AuthFormBase);
