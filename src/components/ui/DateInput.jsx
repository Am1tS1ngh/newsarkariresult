export default function DateInput({ name, value, onChange, placeholder, autocomplete }) {
  return (
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 w-full"
      autoComplete={autocomplete}
      aria-label={name}
    />
  );
}