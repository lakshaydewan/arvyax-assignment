import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {

  return (
    <Sonner
      className="group toaster"
      {...props}
    />
  )
}

export { Toaster }
