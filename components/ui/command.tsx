"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Implementación personalizada para reemplazar cmdk
// Esta es una versión simplificada que usa componentes propios en lugar de cmdk

interface CommandContextValue {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  itemCount: number
  setItemCount: React.Dispatch<React.SetStateAction<number>>
}

const CommandContext = React.createContext<CommandContextValue | undefined>(undefined)

function useCommandContext() {
  const context = React.useContext(CommandContext)
  if (!context) {
    throw new Error("Command components must be used within a Command provider")
  }
  return context
}

const Command = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [search, setSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [itemCount, setItemCount] = React.useState(0)

  return (
    <CommandContext.Provider
      value={{
        search,
        setSearch,
        selectedIndex,
        setSelectedIndex,
        itemCount,
        setItemCount,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
})
Command.displayName = "Command"

const CommandDialog = ({ 
  children, 
  ...props 
}: DialogProps & { children: React.ReactNode }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[data-group-heading]]:px-2 [&_[data-group-heading]]:font-medium [&_[data-group-heading]]:text-muted-foreground [&_[data-group]:not([hidden])_~[data-group]]:pt-0 [&_[data-group]]:px-2 [&_[data-input-wrapper]_svg]:h-5 [&_[data-input-wrapper]_svg]:w-5 [&_[data-input]]:h-12 [&_[data-item]]:px-2 [&_[data-item]]:py-3 [&_[data-item]_svg]:h-5 [&_[data-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { setSearch } = useCommandContext()

  return (
    <div className="flex items-center border-b px-3" data-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={(e) => setSearch(e.target.value)}
        {...props}
      />
    </div>
  )
})

CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-group=""
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[data-group-heading]]:px-2 [&_[data-group-heading]]:py-1.5 [&_[data-group-heading]]:text-xs [&_[data-group-heading]]:font-medium [&_[data-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = "CommandGroup"

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = "CommandSeparator"

const CommandItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean, disabled?: boolean }
>(({ className, selected, disabled, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-item=""
      data-selected={selected ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
})

CommandItem.displayName = "CommandItem"

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
