import FormInputField from "../components/form-input-field";
import InputElem from "../components/form-input-field/components/input";
import Block from "../../../classes/Block";

export default function prepareFields(fieldsProps: Record<string, string>[], showValues?: boolean): Record<string, Block>[] {
    return fieldsProps.map((item, index) => {
        const fieldName: string = item.fieldName? item.fieldName : 'field_'+(index+1);
        const inputElemProps = [
            { name: 'id', value: item.fieldName }, 
            { name: 'name', value: item.fieldName },
            { name: 'type', value: item.inputType },
        ]
        if (showValues) {
            inputElemProps.push({ name: 'value', value: item.value })
        }
        const value = new FormInputField({
            fieldName: item.fieldName,
            fieldLabel: item.fieldLabel,
            settings: { withInternalID: true },
            input: new InputElem({
                settings: { withInternalID: true },
                className: 'form-input-field__input',
                elemProps: inputElemProps,
            }) as Block,
        }) as Block;
        return { [fieldName]: value };
    }) as Record<string, Block>[];
}
