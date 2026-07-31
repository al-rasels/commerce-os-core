"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Select } from "./select"
import { Textarea } from "./textarea"

export interface FormRendererField {
  name: string
  label: string
  type: "text" | "textarea" | "select" | "email"
  required?: boolean
  options?: { value: string; label: string }[]
}

export interface FormRendererProps {
  fields: FormRendererField[]
  onSubmit: (values: Record<string, string>) => void
  submitLabel?: string
}

const FormRenderer = React.forwardRef<HTMLFormElement, FormRendererProps>(
  ({ fields, onSubmit, submitLabel = "Submit" }, ref) => {
    const { register, handleSubmit } = useForm<Record<string, string>>()

    return (
      <form ref={ref} className="space-y-4" onSubmit={handleSubmit((values) => onSubmit(values))}>
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.name}
                required={field.required}
                {...register(field.name, { required: field.required })}
              />
            ) : field.type === "select" ? (
              <Select
                id={field.name}
                options={field.options ?? []}
                required={field.required}
                {...register(field.name, { required: field.required })}
              />
            ) : (
              <Input
                id={field.name}
                type={field.type}
                required={field.required}
                {...register(field.name, { required: field.required })}
              />
            )}
          </div>
        ))}
        <Button type="submit">{submitLabel}</Button>
      </form>
    )
  }
)
FormRenderer.displayName = "FormRenderer"

export { FormRenderer }
