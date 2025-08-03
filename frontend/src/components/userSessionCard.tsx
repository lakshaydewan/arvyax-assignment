import { Calendar, Clock, Edit3, ExternalLink, Eye, Tag } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { formatDate } from "@/lib/utils"
import { EditSessionModal } from "./sessionModals"
import type { Session } from "@/lib/types"
import axios from "axios"

const UserSessionCard = ({ session, refresh }: { session: Session, refresh: () => void }) => {

    const isDraft = session?.status.valueOf() === "draft"

    const token = localStorage.getItem("authToken")

    return (
        <Card
            className={`bg-neutral-800/50 border-neutral-700  transition-all duration-300 hover:shadow-lg hover:shadow-[#14b8a6]/10 group ${isDraft ? "border-l-4 border-l-yellow-500/50 hover:border-yellow-500/50" : "border-l-4 border-l-[#14b8a6]/50 hover:border-[#14b8a6]/50"}`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className={`text-white text-lg ${ isDraft ? "group-hover:text-yellow-300" : "group-hover:text-[#14b8a6]" } font-semibold transition-colors duration-200 flex-1 pr-2`}>
                        {session.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        {isDraft && (
                            <EditSessionModal
                                onSubmit={async (formData) => {
                                    console.log("Form Data:", formData);
                                    const res = await axios.put(`http://localhost:3000/api/session/${session._id}`, formData, {
                                        headers: {
                                            authorization: `Bearer ${token}`,
                                        }
                                    })
                                    console.log("Response:", res.data)
                                    refresh()
                                }}
                                session={session}
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 cursor-pointer text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-all duration-200"
                                        title="Edit Session"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer text-neutral-400 hover:text-[#14b8a6] hover:bg-[#14b8a6]/10 transition-all duration-200"
                            title={isDraft ? "Preview Session" : "View Session"}
                        >
                            {isDraft ? <Eye className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {session.tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-neutral-700/50 text-neutral-300 hover:bg-[#14b8a6]/20 hover:text-[#14b8a6] transition-colors duration-200 text-xs"
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
                        <span>Updated: {formatDate(session.updatedAt as string)}</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-end">
                    {isDraft ? (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30 transition-colors duration-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Draft
                        </Badge>
                    ) : (
                        <Badge className="bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/30 hover:bg-[#14b8a6]/30 transition-colors duration-200">
                            Published
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default UserSessionCard