import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Button, InputField, Modal } from "../components"

const BACKEND_URL = "http://localhost:8787" // Update this to your backend URL

interface SignupInput {
    name: string;
    email: string;
    password: string;
}

interface SignupResponse {
    jwt: string;
}

export const Signup = () => {
    const [formData, setFormData] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<Partial<SignupInput>>({})
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const navigate = useNavigate();

    const getPasswordStrength = (password: string): { score: number; text: string; color: string } => {
        if (password.length === 0) return { score: 0, text: '', color: '' }
        
        let score = 0
        if (password.length >= 8) score++
        if (/[a-z]/.test(password)) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        const strength = {
            1: { text: 'Very weak', color: 'text-red-600' },
            2: { text: 'Weak', color: 'text-red-500' },
            3: { text: 'Fair', color: 'text-yellow-500' },
            4: { text: 'Good', color: 'text-green-500' },
            5: { text: 'Strong', color: 'text-green-600' }
        }

        return { score, ...strength[score as keyof typeof strength] || { text: 'Very weak', color: 'text-red-600' } }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<SignupInput> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters long"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) return
        if (!agreedToTerms) {
            alert('Please agree to the Terms of Service and Privacy Policy')
            return
        }

        setLoading(true)
        try {
            const response = await axios.post<SignupResponse>(`${BACKEND_URL}/api/v1/user/signup`, formData)
            const jwt = response.data.jwt
            localStorage.setItem("token", jwt)
            navigate("/")
        } catch(error) {
            console.error('Signup error:', error)
            setErrors({ email: "An account with this email already exists or there was an error creating your account." })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field: keyof SignupInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const passwordStrength = getPasswordStrength(formData.password)

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
                        Join Medium.
                    </h1>
                    <p className="text-body text-gray-medium font-sans">
                        Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Google Sign Up */}
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
                        Sign up with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-medium font-sans">Or sign up with email</span>
                        </div>
                    </div>

                    <InputField
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange('name')}
                        error={errors.name}
                        required
                    />

                    <InputField
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        required
                    />

                    <div>
                        <InputField
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange('password')}
                            error={errors.password}
                            required
                        />
                        
                        {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex space-x-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded-full ${
                                                level <= passwordStrength.score
                                                    ? passwordStrength.score <= 2
                                                        ? 'bg-red-500'
                                                        : passwordStrength.score <= 3
                                                        ? 'bg-yellow-500'
                                                        : 'bg-green-500'
                                                    : 'bg-gray-light'
                                            }`}
                                        />
                                    ))}
                                </div>
                                {passwordStrength.text && (
                                    <p className={`text-caption font-sans ${passwordStrength.color}`}>
                                        Password strength: {passwordStrength.text}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-3">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-1 h-4 w-4 text-green border-gray-border rounded focus:ring-green focus:ring-2"
                        />
                        <label htmlFor="terms" className="text-body-small text-gray-medium font-sans">
                            I agree to Medium's{' '}
                            <a href="#" className="text-black hover:text-gray-dark transition-colors">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-black hover:text-gray-dark transition-colors">
                                Privacy Policy
                            </a>
                            , and to receive emails and updates.
                        </label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        className="w-full"
                        disabled={!agreedToTerms}
                    >
                        Create account
                    </Button>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-body-small text-gray-medium font-sans">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-green hover:text-green-dark font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
