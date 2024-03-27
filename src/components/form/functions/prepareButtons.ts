import Block from "../../../classes/Block";
import FormButton from "../../form-button";

export default function prepareButtons(buttonsProps: Record<string, string>[]): Record<string, Block>[] {
    return buttonsProps.map((item, index) => {
        const buttonName: string = 'form-button_'+(index+1);
        const tagName = item.buttonType === 'submit' ? 'input' : 'button';
        const elemProps = [{ name: 'id', value: buttonName }];
        const redirectPage = item.redirectPage;
        const buttonText = item.buttonType === 'submit' ? '' : item.buttonText;
        item.buttonType === 'submit' ? elemProps.push({ name: 'type', value: 'submit' }, { name: 'value', value: item.buttonText }) : '';
        const value = new FormButton({
            className: item.buttonClassName, 
            buttonText,
            buttonType: item.buttonType,
            tagName,
            elemProps, 
            redirectPage,
            settings: { withInternalID: true },
        }) as Block;
        return { [buttonName]: value };
    }) as Record<string, Block>[];
}
