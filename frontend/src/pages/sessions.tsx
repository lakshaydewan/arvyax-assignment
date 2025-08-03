"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserSessionCard from "@/components/userSessionCard"
import { FileText, ExternalLink, Tag, Plus, Clock, Loader2 } from "lucide-react"
import FloatingNavbar from "@/components/floatingNav"
import { CreateSessionModal } from "@/components/sessionModals"
import { useEffect, useState } from "react"
import axios from "axios"
import type { Session } from "@/lib/types"


export default function MySessions() {

    const [sessions, setSessions] = useState<Session[] | null>(null)
    const [refetch, setRefetch] = useState(false)

    const token = localStorage.getItem("authToken")

    useEffect(() => {

        console.log("Fetching sessions...")

        const fetchSessions = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/session/my-sessions", {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                console.log("Fetched sessions:", res.data)
                setSessions(res.data)
            } catch (error) {
                console.error("Error fetching sessions:", error)
            }
        }

        fetchSessions()

    }, [refetch])

    if (!sessions) return <div className="min-h-screen bg-gradient-to-br from-[#052f2e] to-neutral-900 flex items-center justify-center text-white">
        <Loader2 className="h-4 w-4 animate-spin" />
    </div>

    const publishedSessions = sessions.filter((session) => session.status === "published")
    const draftSessions = sessions.filter((session) => session.status === "draft")
    const allSessions = sessions

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#052f2e] to-neutral-900">
            <FloatingNavbar />

            <div className="pt-42 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header with Add Session Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
                        <div className="mb-6 sm:mb-0">
                            <h1 className="text-4xl font-bold text-white mb-4">My Sessions</h1>
                            <p className="text-neutral-400 text-lg max-w-2xl">
                                Manage your learning sessions. Create, edit, and publish your content.
                            </p>
                        </div>
                        {/* Create Session Modal with button as the trigger*/}
                        <CreateSessionModal onSubmit={async (formData) => {
                            console.log("Form Data:", formData);
                            const res = await axios.post("http://localhost:3000/api/session", formData, {
                                headers: {
                                    authorization: `Bearer ${token}`,
                                }
                            })
                            console.log("Response:", res.data)
                            setRefetch(!refetch)
                        }} trigger={
                            <Button
                                onClick={() => {

                                }}
                                className="bg-[#14b8a6] hover:bg-[#14b8a6]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                <Plus className="h-5 w-5" />
                                Add New Session
                            </Button>
                        } />
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">Total Sessions</p>
                                        <p className="text-2xl font-bold text-white">{allSessions.length}</p>
                                    </div>
                                    <div className="h-10 w-10 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-[#14b8a6]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">Published</p>
                                        <p className="text-2xl font-bold text-[#14b8a6]">{publishedSessions.length}</p>
                                    </div>
                                    <div className="h-10 w-10 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                                        <ExternalLink className="h-5 w-5 text-[#14b8a6]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">Drafts</p>
                                        <p className="text-2xl font-bold text-yellow-400">{draftSessions.length}</p>
                                    </div>
                                    <div className="h-10 w-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-yellow-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-800/50 border-neutral-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral-400 text-sm font-medium">Total Tags</p>
                                        <p className="text-2xl font-bold text-white">{new Set(allSessions.flatMap((s) => s.tags)).size}</p>
                                    </div>
                                    <div className="h-10 w-10 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                                        <Tag className="h-5 w-5 text-[#14b8a6]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs for filtering sessions */}
                    {
                        (allSessions.length > 0) && (
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="bg-neutral-800/50 border border-neutral-700 p-1 mb-8">
                                    <TabsTrigger
                                        value="all"
                                        className="data-[state=active]:bg-[#14b8a6] data-[state=active]:text-white text-neutral-400 hover:text-white transition-colors"
                                    >
                                        All Sessions ({allSessions.length})
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="published"
                                        className="data-[state=active]:bg-[#14b8a6] data-[state=active]:text-white text-neutral-400 hover:text-white transition-colors"
                                    >
                                        Published ({publishedSessions.length})
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="drafts"
                                        className="data-[state=active]:bg-[#14b8a6] data-[state=active]:text-white text-neutral-400 hover:text-white transition-colors"
                                    >
                                        Drafts ({draftSessions.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {allSessions.map((session) => (
                                            <UserSessionCard refresh={() => {
                                                setRefetch(!refetch)
                                            }} key={session._id} session={session} />
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="published" className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {publishedSessions.map((session) => (
                                            <UserSessionCard refresh={() => {
                                                setRefetch(!refetch)
                                            }} key={session._id} session={session} />
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="drafts" className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {draftSessions.map((session) => (
                                            <UserSessionCard refresh={() => {
                                                setRefetch(!refetch)
                                            }} key={session._id} session={session} />
                                        ))}
                                    </div>
                                    {draftSessions.length === 0 && (
                                        <div className="text-center py-16">
                                            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Clock className="h-12 w-12 text-neutral-600" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2">No draft sessions</h3>
                                            <p className="text-neutral-400 mb-6">All your sessions are published!</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
