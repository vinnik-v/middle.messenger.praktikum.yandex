import FormInputField from "../components/form-input-field";
import InputElem from "../components/form-input-field/components/input";

export default function prepareFields(fieldsProps: Record<string, string>[], showValues?: boolean): Record<string, unknown>[] {
    return fieldsProps.map((item, index) => {
        const fieldName: string = item.fieldName? item.fieldName : 'field_'+(index+1);
        const inputElemProps = [
            { name: 'id', value: item.fieldName }, 
            { name: 'name', value: item.fieldName },
            { name: 'type', value: item.inputType },
        ]
        if (showValues) {
            item.value ? inputElemProps.push({ name: 'value', value: item.value }) : undefined;
        }
        const value = new FormInputField({
            fieldName: item.fieldName,
            fieldLabel: item.fieldLabel,
            settings: { withInternalID: true },
            input: new InputElem({
                settings: { withInternalID: true },
                className: 'form-input-field__input',
                elemProps: inputElemProps,
            }),
        });
        return { [fieldName]: value };
    });
}
