import { useEffect, useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Edit3, X, Tag, FileText, Save, Upload } from "lucide-react"
import type { Session } from "@/lib/types"


interface CreateSessionModalProps {
  trigger?: React.ReactNode
  onSubmit?: (sessionData: Omit<Session, "_id">, action: "draft" | "publish") => Promise<void>
}

interface EditSessionModalProps {
  session: Session
  trigger?: React.ReactNode
  onSubmit?: (sessionData: Session, action: "save" | "publish") => Promise<void>
}

// Create Session Modal
export function CreateSessionModal({ trigger, onSubmit }: CreateSessionModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [jsonFileUrl, setJsonFileUrl] = useState("")
  const [tagsInput, setTagsInput] = useState("")
  const [error, setError] = useState("")

  const parseTags = (input: string): string[] => {
    return input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
  }

  const handleSubmit = async (action: "draft" | "publish") => {
    setError("")
    setIsLoading(true)

    // Validation
    if (!title.trim()) {
      setError("Please enter a session title")
      setIsLoading(false)
      return
    }

    if (!jsonFileUrl.trim()) {
      setError("Please enter a JSON file URL")
      setIsLoading(false)
      return
    }

    const tags = parseTags(tagsInput)
    if (tags.length === 0) {
      setError("Please add at least one tag")
      setIsLoading(false)
      return
    }

    try {
      const sessionData = {
        title: title.trim(),
        tags,
        jsonUrl: jsonFileUrl.trim(),
        status: action === "draft" ? ("draft" as const) : ("published" as const),
      }

      await onSubmit?.(sessionData, action)

      setTitle("")
      setJsonFileUrl("")
      setTagsInput("")
      setOpen(false)
    } catch (err: any) {
      setError(err.message || "Failed to create session")
    } finally {
      setIsLoading(false)
    }
  }

  const tags = parseTags(tagsInput)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-[#14b8a6] hover:bg-[#14b8a6]/90 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Session
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 border-neutral-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-[#14b8a6] rounded-lg flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            Create New Session
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Create a new wellness session. You can save it as a draft or publish it immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Error Alert */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              <X onClick={() => {
                setError("")
              }} className="h-4 w-4 flex-shrink-0 cursor-pointer" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-neutral-200 font-medium">
              Session Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter session title"
              disabled={isLoading}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-neutral-200 font-medium">
              JSON File URL *
            </Label>
            <Textarea
              id="jsonFileUrl"
              value={jsonFileUrl}
              onChange={(e: any) => setJsonFileUrl(e.target.value)}
              placeholder="Enter JSON file URL"
              disabled={isLoading}
              rows={4}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20 resize-none"
            />
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-neutral-200 font-medium">
              Tags *
            </Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., React, JavaScript, Frontend)"
              disabled={isLoading}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
            />

            {/* Tag Preview */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/30 text-xs"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-700">
          <Button
            onClick={() => handleSubmit("draft")}
            disabled={isLoading}
            variant="outline"
            className="flex-1 cursor-pointer border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save to Draft
          </Button>
          <Button
            onClick={() => handleSubmit("publish")}
            disabled={isLoading}
            className="flex-1 cursor-pointer bg-[#14b8a6] hover:bg-[#14b8a6]/90 text-white flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Publish Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Edit Session Modal
export function EditSessionModal({ session, trigger, onSubmit }: EditSessionModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(session.title)
  const [jsonFileUrl, setJsonFileUrl] = useState(session.jsonUrl || "")
  const [tagsInput, setTagsInput] = useState(session.tags.join(", "))
  const [error, setError] = useState("")

  const parseTags = (input: string): string[] => {
    return input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
  }

  const handleSubmit = async (
    action: "save" | "publish",
    { silent = false } = {}
  ) => {
    if (!open) return
    if (!silent) setError("")
    setIsLoading(true)

    // Validation
    if (!title.trim()) {
      if (!silent) setError("Please enter a session title")
      setIsLoading(false)
      return
    }

    const tags = parseTags(tagsInput)
    if (tags.length === 0) {
      if (!silent) setError("Please add at least one tag")
      setIsLoading(false)
      return
    }

    try {
      const sessionData = {
        ...session,
        title: title.trim(),
        tags,
        jsonUrl: jsonFileUrl.trim(),
        status: action === "publish" ? "published" : session.status,
      }

      await onSubmit?.(sessionData, action)

      if (silent) {
        // ✅ Toast for auto-save
        toast.success("Session auto-saved successfully")
      } else {
        setOpen(false) // Only close if it's manual save/publish
      }
    } catch (err: any) {
      if (!silent) setError(err.message || "Failed to update session")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!open || session.status !== "draft") return

    const timeout = setTimeout(() => {
      handleSubmit("save", { silent: true })
    }, 5000)

    return () => clearTimeout(timeout)
  }, [title, jsonFileUrl, tagsInput, open])



  const tags = parseTags(tagsInput)
  const isDraft = session.status === "draft"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 border-neutral-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Edit3 className="h-4 w-4 text-white" />
            </div>
            Edit Session
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Make changes to your session.{" "}
            {isDraft ? "You can save changes or publish it." : "Changes will be saved to the published session."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Error Alert */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              <X className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-neutral-200 font-medium">
              Session Title *
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter session title"
              disabled={isLoading}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-neutral-200 font-medium">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={jsonFileUrl}
              onChange={(e: any) => setJsonFileUrl(e.target.value)}
              placeholder="Enter JSON file URL"
              disabled={isLoading}
              rows={4}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20 resize-none"
            />
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-tags" className="text-neutral-200 font-medium">
              Tags *
            </Label>
            <Input
              id="edit-tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., React, JavaScript, Frontend)"
              disabled={isLoading}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
            />

            {/* Tag Preview */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/30 text-xs"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Current Status */}
          <div className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg border border-neutral-600">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-neutral-400" />
              <span className="text-neutral-300 text-sm">Current Status:</span>
            </div>
            <Badge
              className={
                isDraft
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : "bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/30"
              }
            >
              {isDraft ? "Draft" : "Published"}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-700">
          <Button
            onClick={() => handleSubmit("save")}
            disabled={isLoading}
            variant="outline"
            className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
          {isDraft && (
            <Button
              onClick={() => handleSubmit("publish")}
              disabled={isLoading}
              className="flex-1 bg-[#14b8a6] hover:bg-[#14b8a6]/90 text-white flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Publish Session
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
