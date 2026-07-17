"use client";

import { type ReactNode } from "react";
import { cn } from "./utils";
import { Input } from "./input";
import { Select, type SelectOption } from "./select";
import { Textarea } from "./textarea";
import { Button } from "./button";

export type FieldType = "text" | "email" | "textarea" | "select" | "number" | "password";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  defaultValue?: string;
}

export interface FormRendererProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
  submitLabel?: string;
  className?: string;
}

export function FormRenderer({
  fields,
  onSubmit,
  submitLabel = "Submit",
  className,
}: FormRendererProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    fields.forEach((f) => {
      values[f.name] = (formData.get(f.name) as string) ?? "";
    });
    onSubmit(values);
  };

  function renderField(field: FormField): ReactNode {
    const common = {
      name: field.name,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      defaultValue: field.defaultValue,
      key: field.name,
    };

    switch (field.type) {
      case "textarea":
        return <Textarea {...common} />;
      case "select":
        return <Select {...common} options={field.options ?? []} />;
      default:
        return <Input {...common} type={field.type} />;
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)} noValidate>
      {fields.map(renderField)}
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
