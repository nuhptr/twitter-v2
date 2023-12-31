interface InputProps {
   placeholder?: string
   value?: string
   type?: string
   disabled?: boolean
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   label?: string
}

export default function Input({ placeholder, value, type = "text", onChange, disabled, label }: InputProps) {
   return (
      <div className="w-full">
         {label && <p className="mb-2 text-xl font-semibold text-white">{label}</p>}
         <input
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            type={type}
            className="w-full p-4 text-lg text-white transition bg-black border-2 rounded-md outline-none border-neutral-800 focus:border-sky-500 focus:border-2 disabled:bg-neutral-900 
            disabled:opacity-70 disabled:cursor-not-allowed"
         />
      </div>
   )
}
