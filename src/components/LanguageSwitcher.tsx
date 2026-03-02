import { useCallback, type ChangeEventHandler } from 'react';

type Option = {
  locale: string;
  label: string;
  href: string;
};

type Props = {
  options: Option[];
  current: string;
  label: string;
};

export default function LanguageSwitcher({ options, current, label }: Props) {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      const next = options.find((option) => option.locale === event.target.value);
      if (next) {
        window.location.href = next.href;
      }
    },
    [options]
  );

  return (
    <label className="group inline-flex items-center gap-1.5 text-xs font-medium text-warm-gray uppercase cursor-pointer transition-colors hover:text-foreground">
      <span>{label}</span>
      <select
        value={current}
        onChange={handleChange}
        className="bg-transparent text-xs font-semibold uppercase text-foreground focus:outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.locale} value={option.locale} className="text-foreground">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
