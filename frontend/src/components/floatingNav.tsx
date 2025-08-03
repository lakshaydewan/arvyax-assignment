import { FileText, Home, User } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const FloatingNavbar = () => {

    const navigate = useNavigate()

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-neutral-800/80 backdrop-blur-md border border-neutral-700/50 rounded-full px-6 py-3 shadow-2xl">
                <div className="flex items-center justify-between gap-8">
                    <Button
                        onClick={() => {
                            navigate("/")
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 cursor-pointer rounded-full text-neutral-300 hover:text-white hover:bg-[#14b8a6]/20 transition-all duration-200"
                    >
                        <User className="h-5 w-5" />
                    </Button>

                    <Button
                        onClick={() => {
                            navigate("/")
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 cursor-pointer rounded-full text-neutral-300 hover:text-white hover:bg-[#14b8a6]/20 transition-all duration-200"
                    >
                        <Home className="h-5 w-5" />
                    </Button>

                    <Button
                        onClick={() => {
                            navigate("/sessions")
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 cursor-pointer rounded-full text-neutral-300 hover:text-white hover:bg-[#14b8a6]/20 transition-all duration-200"
                    >
                        <FileText className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FloatingNavbar