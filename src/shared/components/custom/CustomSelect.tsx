import { Controller, type Control } from "react-hook-form";
import Select, { type StylesConfig, type Theme } from "react-select";

export interface OptionType {
    value: string;
    label: string;
}

interface CustomSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    options: OptionType[];
    placeholder?: string;
    isClearable?: boolean;
    isDisabled?: boolean;
    defaultValue?: string | OptionType;
    required?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (selectedValue: any) => void;
}export const CustomSelect = ({
    control,
    name,
    options,
    placeholder = "Seleccionar",
    isClearable = true,
    isDisabled = false,
    defaultValue,
    required = true,
    onChange: externalOnChange,
}: CustomSelectProps) => {
    if (!name || typeof name !== "string") {
        throw new Error("El valor de 'name' debe ser una cadena de texto válida.");
    }

    if (!control) {
        throw new Error("El objeto 'control' debe ser proporcionado por react-hook-form.");
    }

    if (!options || !Array.isArray(options)) {
        throw new Error("El valor de 'options' debe ser un array válido.");
    }

    const customStyles: StylesConfig<OptionType> = {
        control: (base, state) => ({
            ...base,
            minHeight: '44px',
            height: '44px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: (state.isFocused || state.menuIsOpen)
                ? 'var(--primary)'
                : 'rgba(229, 231, 235, 0.7)',
            borderRadius: '0.5rem',
            paddingLeft: '1rem',
            paddingRight: '0.75rem',
            paddingTop: '0',
            paddingBottom: '0',
            backgroundColor: 'var(--bg-form-input)',
            fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            fontSize: '0.875rem',
            fontWeight: 300,
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            transition: 'border-color 0.2s ease-in-out',
            '&:hover': {
                borderColor: (state.isFocused || state.menuIsOpen)
                    ? 'var(--primary)'
                    : 'rgba(229, 231, 235, 0.7)',
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(229, 231, 235, 0.7)',
            zIndex: 9999,
            fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            marginTop: '4px',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            height: '44px',
        }),
        input: (base) => ({
            ...base,
            color: 'var(--text-black)',
            padding: '0',
            margin: '0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
        }),
        placeholder: (base) => ({
            ...base,
            color: 'rgba(156, 163, 175, 1)',
            margin: '0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "var(--primary)"
                : state.isFocused
                    ? "rgba(var(--primary-rgb), 0.2)"
                    : "transparent",
            color: state.isSelected ? "white" : (state.isFocused ? "var(--primary)" : "var(--text-black)"),
            cursor: "pointer",
            textAlign: "left",
            padding: '0.5rem 1rem',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            '&:hover': {
                backgroundColor: state.isSelected ? "var(--primary)" : "rgba(var(--primary-rgb), 0.2)",
                color: state.isSelected ? "white" : "var(--primary)",
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: 'var(--text-black)',
            margin: '0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            color: 'rgba(156, 163, 175, 1)',
        }),
        clearIndicator: (base) => ({
            ...base,
            color: 'rgba(156, 163, 175, 1)',
            '&:hover': {
                color: 'rgba(107, 114, 128, 1)',
            }
        }),
        indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: 'transparent'
        }),
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
                required: required ? 'Este campo es requerido' : false,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => {
                const formattedValue = options.find(option => option.value === (value?.value || value)) || null;

                return (
                    <Select<OptionType>
                        isDisabled={isDisabled}
                        ref={ref}
                        options={options}
                        value={formattedValue}
                        onChange={(selectedOption) => {
                            onChange(selectedOption || { value: '', label: '' });
                            if (externalOnChange) {
                                externalOnChange(selectedOption);
                            }
                        }}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        isClearable={isClearable}
                        styles={customStyles}
                        theme={(theme: Theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'var(--primary)',
                                primary25: 'rgba(var(--primary-rgb), 0.1)',
                                neutral0: 'var(--bg-form-input)',
                                neutral20: 'var(--border-input-border)',
                                neutral30: 'var(--border-input-border)',
                                neutral80: 'var(--text-black)',
                            },
                        })}
                        classNames={{
                            control: () => "dark:border-form-strokedark dark:bg-form-input dark:text-white",
                            menu: () => "dark:bg-form-input",
                            option: () => "dark:text-white",
                        }}
                    />
                );
            }}
        />
    );
};

export default CustomSelect;
