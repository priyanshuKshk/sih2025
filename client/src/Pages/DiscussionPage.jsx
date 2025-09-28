import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { useTranslation } from "react-i18next"

export default function DiscussionPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation() // ✅ i18n hook
  const [posts, setPosts] = useState([])
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
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

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImage(null)
      setImagePreview(null)
    }
  }

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && !image) return
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
      setImagePreview(null)
      fetchPosts()
    } catch (err) {
      console.error("Failed to post:", err)
      alert(t("post_failed")) // translated alert
    } finally {
      setPosting(false)
    }
  }

  // Clear image
  const handleClearImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/farmer-dashboard")}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← {t("back_to_dashboard")}
      </button>

      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-2 rounded-full">
            <svg
              className="w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t("community_discussion")}
          </h1>
        </div>

        {/* Post Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="discussion-text"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("share_thoughts")}
              </label>
              <textarea
                id="discussion-text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder={t("discussion_placeholder")}
                rows="3"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Image Preview or Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {imagePreview ? t("image_preview") : t("attach_image")}
              </label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-40 rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={posting || (!text.trim() && !image)}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition ${
                  posting || (!text.trim() && !image)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {posting ? t("posting") : t("share_post")}
              </button>
            </div>
          </div>
        </form>

        {/* Discussion Feed */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {t("recent_discussions")}
            </h2>
            {!loading && posts.length > 0 && (
              <span className="text-sm text-gray-500">
                {t("posts", { count: posts.length })}
              </span>
            )}
          </div>

          {loading ? (
            // Skeleton loader
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {t("no_discussions")}
              </h3>
              <p className="text-gray-600">{t("start_conversation")}</p>
            </div>
          ) : (
            // Posts list
            posts
              .slice()
              .reverse()
              .map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div>
                      <div className="font-medium text-gray-800">
                        {post.user?.name || t("anonymous")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{post.text}</p>
                  {post.image && (
                    <div className="mt-3">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="max-h-60 w-full object-cover rounded-lg border border-gray-100"
                      />
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
