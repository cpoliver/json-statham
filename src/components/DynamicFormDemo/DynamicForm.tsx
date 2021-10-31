import { Button, FormControl, FormErrorMessage, FormLabel, Input, Spacer, Stack } from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form"

type FormProps = {
  register: Function
  errors?: { [key: string]: { message: string } }
}

export const connectionTypes = ["sql", "m365", "key"] as const

export type ConnectionType = typeof connectionTypes[number]

type DynamicFormProps = {
  connectionType: ConnectionType
  onSubmit: (data: object) => void
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ connectionType, onSubmit }) => {
  const { handleSubmit, register, formState } = useForm({ mode: "all" })

  const form: { [key in ConnectionType]: React.FC<FormProps> } = {
    sql: ConnectToSql,
    m365: ConnectToM365,
    key: ConnectToKey,
  }

  const FormComponent = form[connectionType]

  return (
    <Stack as="form" flex={1} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Stack spacing={8}>
        <FormComponent errors={formState.errors} register={register} />
      </Stack>
      <Spacer />
      <Button
        bg="primary"
        boxShadow="button"
        color="white"
        isDisabled={!formState.isValid}
        size="lg"
        type="submit"
      >
        SUBMIT
      </Button>
    </Stack>
  )
}

/* Sub-components */

type FormFieldProps = FormProps & {
  name: string
  label: string
  type?: string
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type = "text", errors = {}, register }) => {
  const validationMessage = errors[name]?.message ?? ""

  return (
    <FormControl isInvalid={Boolean(validationMessage)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...register(name)} placeholder={label} type={type}  bg="white" />
      <FormErrorMessage>{validationMessage}</FormErrorMessage>
    </FormControl>
  )
}

const ConnectToSql: React.FC<FormProps> = (formProps) => (
  <>
    <FormField label="Username" name="username" {...formProps} />
    <FormField label="Password" name="password" {...formProps} type="password" />
    <Stack direction="row" spacing={8}>
      <FormField label="Database" name="database" {...formProps} />
      <FormField label="Table Name" name="tableName" {...formProps} />
    </Stack>
    <Stack direction="row" spacing={8}>
      <FormField label="Timeout" name="timeout" {...formProps} />
      <FormField label="Port" name="port" {...formProps} />
    </Stack>
  </>
)

const ConnectToKey: React.FC<FormProps> = ({ register, errors }) => (
  <>
    <FormField errors={errors} label="Title" name="title" register={register} />
    <FormField errors={errors} label="Key" name="key" register={register} type="password" />
  </>
)

const ConnectToM365: React.FC<FormProps> = () => (
  <Button colorScheme="blue" onClick={() => alert("Open new window for oAuth grant flow?")}>Authorize</Button>
)

