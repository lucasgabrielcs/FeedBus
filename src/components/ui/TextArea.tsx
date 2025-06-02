import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  charCount?: boolean;
  maxLength?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, charCount = false, maxLength, className = '', ...props }, ref) => {
    const [charLength, setCharLength] = React.useState(0);
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharLength(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };
    
    return (
      <div className={`${widthClass}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            appearance-none block ${widthClass} px-3 py-2 border rounded-md shadow-sm 
            placeholder-gray-400 
            focus:outline-none focus:ring-2 
            ${errorClass}
            ${className}
          `}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {(charCount && maxLength) && (
          <div className="mt-1 text-xs text-gray-500 text-right">
            {charLength}/{maxLength}
          </div>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;