import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Button, InputField, Modal } from "../components"

const BACKEND_URL = "http://localhost:8787" // Update this to your backend URL

interface SigninInput {
    email: string;
    password: string;
}

interface SigninResponse {
    jwt: string;
}

export const Signin = () => {
    const [formData, setFormData] = useState<SigninInput>({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<Partial<SigninInput>>({})
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: Partial<SigninInput> = {}

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) return

        setLoading(true)
        try {
            const response = await axios.post<SigninResponse>(`${BACKEND_URL}/api/v1/user/signin`, formData)
            const jwt = response.data.jwt
            localStorage.setItem("token", jwt)
            navigate("/")
        } catch(error) {
            console.error('Signin error:', error)
            setErrors({ email: "Invalid email or password. Please try again." })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field: keyof SigninInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-white">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f2f2f2' fill-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Modal */}
            <Modal isOpen={showModal} onClose={handleCloseModal} className="max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-title-medium font-serif text-black mb-2">
                        Welcome back.
                    </h1>
                    <p className="text-body text-gray-medium font-sans">
                        Sign in to access your personalized homepage, follow authors and topics you love, and interact with stories.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        required
                    />

                    <InputField
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        error={errors.password}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        className="w-full"
                    >
                        Sign in
                    </Button>

                    {/* Google Sign In */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-medium font-sans">Or</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="w-full"
                        icon={
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        }
                    >
                        Sign in with Google
                    </Button>

                    {/* Footer */}
                    <div className="text-center space-y-4">
                        <p className="text-body-small text-gray-medium font-sans">
                            No account?{' '}
                            <Link to="/signup" className="text-green hover:text-green-dark font-medium">
                                Create one
                            </Link>
                        </p>
                        
                        <div className="text-caption text-gray-medium font-sans space-x-4">
                            <button className="hover:text-black transition-colors">
                                Forgot email or trouble signing in?
                            </button>
                        </div>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="mt-8 pt-6 border-t border-gray-border text-center">
                    <p className="text-caption text-gray-medium font-sans">
                        Click "Sign in" to agree to Medium's{' '}
                        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>{' '}
                        and acknowledge that Medium's{' '}
                        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>{' '}
                        applies to you.
                    </p>
                </div>
            </Modal>
        </div>
    )
}
