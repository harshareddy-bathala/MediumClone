import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: ReactNode
  containerClassName?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helpText, icon, containerClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-black mb-2 font-sans">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-medium">
                {icon}
              </div>
            </div>
          )}
          <input
            ref={ref}
            className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'error' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 font-sans">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-medium font-sans">{helpText}</p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
