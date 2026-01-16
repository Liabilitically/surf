interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Input(props: InputProps) {
    return (
        <div>
            <h4 className="text-md font-normal mb-2">{props.label + (props.required ? " *" : "")}</h4>
            { props.type === "textarea" ? (
                <textarea placeholder={props.placeholder} value={props.value} onChange={props.onChangeTextArea} required={props.required || false}
                className="w-full px-4 h-30 py-2 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                <input type={props.type || "text"} placeholder={props.placeholder} value={props.value} onChange={props.onChange} required={props.required || false}
                className="w-full px-4 py-2 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) }
        </div>
    )
}