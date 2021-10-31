import React from "react"
import userEvent from "@testing-library/user-event"
import { screen, render } from "@testing-library/react"

import { DynamicFormDemo } from "./DynamicFormDemo"

describe("DynamicFormDemo", () => {
  it("renders the SQL form by default", () => {
    render(<DynamicFormDemo />)

    const select = screen.getByRole("combobox")

    expect(select).toHaveTextContent("SQL")

    const username = screen.getByPlaceholderText("Username")
    expect(username).toBeVisible()
    expect(username).toBeEnabled()
    expect(username).toHaveValue("")
    
    const password = screen.getByPlaceholderText("Password")
    expect(password).toBeVisible()
    expect(password).toBeEnabled()
    expect(password).toHaveValue("")

    const database = screen.getByPlaceholderText("Database")
    expect(database).toBeVisible()
    expect(database).toBeEnabled()
    expect(database).toHaveValue("")

    const tableName = screen.getByPlaceholderText("Table Name")
    expect(tableName).toBeVisible()
    expect(tableName).toBeEnabled()
    expect(tableName).toHaveValue("")

    const timeout = screen.getByPlaceholderText("Timeout")
    expect(timeout).toBeVisible()
    expect(timeout).toBeEnabled()
    expect(timeout).toHaveValue("")

    const port = screen.getByPlaceholderText("Port")
    expect(port).toBeVisible()
    expect(port).toBeEnabled()
    expect(port).toHaveValue("")
  })

  it("hides the M365 and Auth Key forms by default", () => {
    render(<DynamicFormDemo />)

    const authButton = screen.queryByText("Authorize")
    expect(authButton).not.toBeInTheDocument()

    const title = screen.queryByPlaceholderText("Title")
    expect(title).not.toBeInTheDocument()

    const key = screen.queryByText("Key")
    expect(key).not.toBeInTheDocument()
  })

  it("renders the M365 form, when the M365 option is selected", () => {
    render(<DynamicFormDemo />)

    const select = screen.getByRole("combobox")
    userEvent.selectOptions(select, "M365")

    const authButton = screen.queryByText("Authorize")
    expect(authButton).toBeVisible()
    expect(authButton).toBeEnabled()
  })

  it("renders the Auth Key form, when the Auth Key option is selected", () => {
    render(<DynamicFormDemo />)

    const select = screen.getByRole("combobox")
    userEvent.selectOptions(select, "KEY")

    const title = screen.getByPlaceholderText("Title")
    expect(title).toBeVisible()
    expect(title).toBeEnabled()
    expect(title).toHaveValue("")

    const key = screen.getByPlaceholderText("Key")
    expect(key).toBeVisible()
    expect(key).toBeEnabled()
    expect(key).toHaveValue("")
  })
})
