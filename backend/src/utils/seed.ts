import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import User from "../models/user"
import Session from "../models/session"

dotenv.config()

// ----- Main Seeder -----
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)

    console.log("📦 Connected to DB. Clearing existing data...")
    await User.deleteMany({})
    await Session.deleteMany({})

    const password = await bcrypt.hash("password123", 10)

    const user1 = await User.create({ email: "user1@example.com", password_hash: password })
    const user2 = await User.create({ email: "user2@example.com", password_hash: password })

    console.log("👤 Created test users")

    const sessions = [
      { title: "Morning Meditation", tags: ["meditation", "morning"], jsonUrl: "https://example.com/json1", status: "published", user: user1._id },
      { title: "Evening Yoga Flow", tags: ["yoga", "evening"], jsonUrl: "https://example.com/json2", status: "published", user: user2._id },
      { title: "Breathing Practice", tags: ["breathing"], jsonUrl: "https://example.com/json3", status: "published", user: user1._id },
      { title: "Mindfulness Reset", tags: ["mindfulness", "mental"], jsonUrl: "https://example.com/json4", status: "draft", user: user1._id },
      { title: "10-min Body Scan", tags: ["scan", "relax"], jsonUrl: "https://example.com/json5", status: "published", user: user2._id },
      { title: "Sun Salutation A", tags: ["yoga", "beginner"], jsonUrl: "https://example.com/json6", status: "published", user: user2._id },
      { title: "Sleep Prep Meditation", tags: ["sleep", "calm"], jsonUrl: "https://example.com/json7", status: "draft", user: user1._id },
      { title: "Lunchtime Reset", tags: ["quick", "relax"], jsonUrl: "https://example.com/json8", status: "published", user: user2._id },
      { title: "Walking Meditation", tags: ["meditation", "movement"], jsonUrl: "https://example.com/json9", status: "published", user: user1._id },
      { title: "Energy Boost Flow", tags: ["yoga", "energize"], jsonUrl: "https://example.com/json10", status: "draft", user: user2._id },
      { title: "5-Minute Calm", tags: ["quick", "calm"], jsonUrl: "https://example.com/json11", status: "published", user: user1._id },
      { title: "Stretch & Breathe", tags: ["stretching", "breathwork"], jsonUrl: "https://example.com/json12", status: "published", user: user2._id }
    ]

    await Session.insertMany(sessions)
    console.log("🧘 Seeded wellness sessions")

    console.log("✅ Seeding complete!")
    process.exit(0)
  } catch (err) {
    console.error("❌ Seeding failed:", err)
    process.exit(1)
  }
}

seed()
