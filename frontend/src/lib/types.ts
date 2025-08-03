export interface Session {
    _id?: string
    title: string
    tags: string[]
    jsonUrl: string
    status: "draft" | "published"
    updatedAt?: Date | string
}

export interface User {
    _id: string
    email: string
    password_hash: string
    created_at: string
}