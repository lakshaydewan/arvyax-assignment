import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, Tag, Loader2 } from "lucide-react"
import SessionCard from "@/components/sessionCard"
import FloatingNavbar from "@/components/floatingNav"
import { useEffect, useState } from "react"
import type { Session } from "@/lib/types"
import axios from "axios"

export default function Dashboard() {

    const [sessions, setSessions] = useState<Session[] | null>(null)

    useEffect(() => {

        const fetchSessions = async () => {
            const res = await axios.get("http://localhost:3000/api/session")
            console.log("Fetched sessions:", res.data)
            setSessions(res.data)
        }

        fetchSessions()
    }, [])

    if (!sessions) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#052f2e] to-neutral-900">
                <FloatingNavbar />
                <div className="text-neutral-300">
                    <Loader2 className="animate-spin h-5 w-5" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen overscroll-none overflow-hidden bg-gradient-to-br from-[#052f2e] to-neutral-900">
            <FloatingNavbar />

            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Published Sessions</h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            Explore and manage your published well-ness sessions. Each session contains valuable content and resources
                            for your.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">Total Sessions</p>
                                        <p className="text-3xl font-bold text-white">{sessions.length}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-[#14b8a6]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">Total Tags</p>
                                        <p className="text-3xl font-bold text-white">{new Set(sessions.flatMap((s) => s.tags)).size}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                                        <Tag className="h-6 w-6 text-[#14b8a6]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">This Month</p>
                                        <p className="text-3xl font-bold text-white">
                                            {sessions.filter((s) => new Date(s.updatedAt as string).getMonth() === new Date().getMonth()).length}
                                        </p>
                                    </div>
                                    <div className="h-12 w-12 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                                        <Calendar className="h-6 w-6 text-[#14b8a6]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sessions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions.map((session) => (
                            <SessionCard key={session._id} session={session} />
                        ))}
                    </div>

                    {/* Empty State (if no sessions) */}
                    {sessions.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="h-12 w-12 text-neutral-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No published sessions yet</h3>
                            <p className="text-neutral-400 mb-6">Create your first session to get started.</p>
                            <Button className="bg-[#14b8a6] hover:bg-[#14b8a6]/90 text-white">Create Session</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
