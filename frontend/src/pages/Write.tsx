import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, LoadingSpinner } from '../components'

const BACKEND_URL = "http://localhost:8787" // Update this to your backend URL

interface BlogPost {
    title: string
    content: string
    published?: boolean
}

export const Write = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isPublishing, setIsPublishing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [showPublishModal, setShowPublishModal] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState('')
    const [subtitle, setSubtitle] = useState('')
    
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // Auto-save functionality
    useEffect(() => {
        if (title || content) {
            const saveTimer = setTimeout(() => {
                handleAutoSave()
            }, 2000)
            return () => clearTimeout(saveTimer)
        }
    }, [title, content])

    // Auto-resize title textarea
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto'
            titleRef.current.style.height = titleRef.current.scrollHeight + 'px'
        }
    }, [title])

    const handleAutoSave = async () => {
        if (!title && !content) return
        
        setIsSaving(true)
        try {
            // Auto-save logic here (save as draft)
            await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
            setLastSaved(new Date())
        } catch (error) {
            console.error('Auto-save failed:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please add a title and content before publishing.')
            return
        }

        setIsPublishing(true)
        try {
            const blogPost: BlogPost = {
                title: title.trim(),
                content: content.trim(),
                published: true
            }

            const token = localStorage.getItem('token')
            await axios.post(`${BACKEND_URL}/api/v1/blog`, blogPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            navigate('/')
        } catch (error) {
            console.error('Publishing failed:', error)
            alert('Failed to publish the post. Please try again.')
        } finally {
            setIsPublishing(false)
            setShowPublishModal(false)
        }
    }

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag.trim() && tags.length < 5) {
            e.preventDefault()
            setTags([...tags, newTag.trim()])
            setNewTag('')
        }
    }

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index))
    }

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-border z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-gray-medium hover:text-black transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div className="flex items-center space-x-3">
                            {isSaving && (
                                <div className="flex items-center space-x-2 text-gray-medium">
                                    <LoadingSpinner size="sm" />
                                    <span className="text-body-small font-sans">Saving...</span>
                                </div>
                            )}
                            
                            {lastSaved && !isSaving && (
                                <span className="text-body-small text-gray-medium font-sans">
                                    Saved at {formatTime(lastSaved)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setShowPublishModal(true)}
                            disabled={!title.trim() || !content.trim()}
                        >
                            Publish
                        </Button>
                        
                        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Editor */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    {/* Title */}
                    <div>
                        <textarea
                            ref={titleRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full text-display font-serif text-black placeholder-gray-light border-none outline-none resize-none overflow-hidden bg-transparent"
                            style={{ 
                                minHeight: '60px',
                                lineHeight: '1.2'
                            }}
                            rows={1}
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <textarea
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="Write a subtitle..."
                            className="w-full text-title-large font-serif text-gray-dark placeholder-gray-light border-none outline-none resize-none bg-transparent"
                            style={{ 
                                minHeight: '40px',
                                lineHeight: '1.3'
                            }}
                            rows={1}
                        />
                    </div>

                    {/* Content Editor */}
                    <div className="relative">
                        <div
                            ref={contentRef}
                            contentEditable
                            className="article-content min-h-96 text-body font-serif text-black outline-none"
                            style={{ lineHeight: '1.58' }}
                            onInput={(e) => setContent(e.currentTarget.innerText)}
                            data-placeholder="Tell your story..."
                        />
                        
                        {content.length === 0 && (
                            <div className="absolute top-0 left-0 text-gray-light font-serif text-body pointer-events-none">
                                Tell your story...
                            </div>
                        )}
                    </div>

                    {/* Writing Tools */}
                    <div className="flex items-center space-x-4 pt-8 border-t border-gray-border">
                        <button className="flex items-center space-x-2 text-gray-medium hover:text-black transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-body-small font-sans">Add image</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-medium hover:text-black transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m4 0H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                            </svg>
                            <span className="text-body-small font-sans">Code block</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Publish Modal */}
            {showPublishModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-title-medium font-serif text-black mb-4">
                            Ready to publish?
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-body-small font-sans font-medium text-black mb-2">
                                    Add tags (up to 5)
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-body-small font-sans bg-gray-light text-gray-dark"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(index)}
                                                className="ml-2 text-gray-medium hover:text-gray-dark"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                {tags.length < 5 && (
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder="Add a tag..."
                                        className="w-full px-3 py-2 border border-gray-border rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <Button
                                variant="secondary"
                                onClick={() => setShowPublishModal(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handlePublish}
                                loading={isPublishing}
                                className="flex-1"
                            >
                                Publish now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
