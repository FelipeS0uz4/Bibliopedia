import * as React from 'react'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
<label
        ref={ref}
        className={`text-sm font-medium text-gray-700 ${className}`}
        {...props}
      />
    )
  }
)

Label.displayName = 'Label'
