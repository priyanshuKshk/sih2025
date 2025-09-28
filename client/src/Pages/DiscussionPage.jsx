import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

export default function DiscussionPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await api.get("/discussion")
      setPosts(res.data || [])
    } catch (err) {
      console.error("Failed to fetch posts:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text && !image) return
    setPosting(true)
    try {
      const formData = new FormData()
      formData.append("text", text)
      if (image) formData.append("image", image)
      await api.post("/discussion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setText("")
      setImage(null)
      fetchPosts()
    } catch (err) {
      console.error("Failed to post:", err)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Discussion Forum</h1>

      {/* Post Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 space-y-3"
      >
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          disabled={posting}
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </form>

      {/* Discussion Feed */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{post.user?.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="max-h-60 w-full object-cover rounded"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
