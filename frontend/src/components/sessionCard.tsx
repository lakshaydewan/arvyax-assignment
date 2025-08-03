import { Calendar, ExternalLink, Tag } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import type { Session } from "@/lib/types"

const SessionCard = ({ session }: { session: Session }) => {
    
    return (
        <Card className="bg-neutral-800/50 border-neutral-700 hover:border-[#14b8a6]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#14b8a6]/10 group">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-lg font-semibold group-hover:text-[#14b8a6] transition-colors duration-200">
                        {session.title}
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer text-neutral-400 hover:text-[#14b8a6] hover:bg-[#14b8a6]/10 transition-all duration-200"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {session.tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-neutral-700/50 cursor-pointer text-neutral-300 hover:bg-[#14b8a6]/20 hover:text-[#14b8a6] transition-colors duration-200 text-xs"
                        >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-sm text-neutral-400">
                    <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Updated: {new Date(session.updatedAt as string).toLocaleString()}</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-end">
                    <Badge className="bg-[#14b8a6]/20 cursor-pointer text-[#14b8a6] border-[#14b8a6]/30 hover:bg-[#14b8a6]/30 transition-colors duration-200">
                        Published
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export default SessionCard