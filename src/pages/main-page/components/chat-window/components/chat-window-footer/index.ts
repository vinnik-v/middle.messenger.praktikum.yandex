import './chat-window-footer.scss';
import ChatWindowFooterTemplate from './chat-window-footer.hbs?raw';

import attachFileIcon from './assets/icons/attach-file-icon.svg?raw';
import sendMessageIcon from './assets/icons/send-message-icon.svg?raw';
import fileIcon from './components/dropdown-content/assets/icons/file-icon.svg?raw';
import locationIcon from './components/dropdown-content/assets/icons/location-icon.svg?raw';
import photoIcon from './components/dropdown-content/assets/icons/photo-icon.svg?raw';
import DropDownContentTemplate from './components/dropdown-content/dropdown-content.hbs?raw';

import Block from '../../../../../../classes/Block';
import Dropdown from '../../../../../../components/dropdown';
import DropDownContent from '../../../../../../components/dropdown/components/dropdown-content';
import InputElem from '../../../../../../components/form/components/form-input-field/components/input';
import Button from '../../../../../../components/button';
import store from '../../../../../../classes/Store';

export default class ChatWindowFooter extends Block {
  constructor(props: Record<string, string | string[] | Record<string, ((event: Event) => unknown) | boolean> | { name: string, value: string }[]>) {
    const template = ChatWindowFooterTemplate as string;
    const className = {
      className: 'chat-window__footer'
    }
    const tagName = {
      tagName: 'div'
    }
    const icons = {
        attachFileIcon,
        sendMessageIcon
    }

    const children = {
        dropdown: new Dropdown({
            settings: { withInternalID: true },
            elemProps: [{ name: 'style', value: 'bottom: 120%; left: 10px;' }, { name: 'id', value: 'choose-file-dropdown' }], 
            dropdownContent: new DropDownContent(DropDownContentTemplate, {
                settings: { withInternalID: true },
                fileIcon,
                locationIcon,
                photoIcon
            }) as Block
        }),
        input: new InputElem({
          settings: { withInternalID: true },
          classList: ['message-input'],
          elemProps: [{ name: 'type', value: 'text' }, { name: 'name', value: 'message' }, { name: 'placeholder', value: 'Сообщение' }, { name: 'id', value: 'message-input' }],
          events: {
            input: (e)=> {
              e.preventDefault();
              const target = e.target as HTMLInputElement;
              const value = target.value;
              this.setProps({
                messageText: value
              })
              target.focus();
            }
          }
        }),
        button: new Button('<span>{{{ sendMessageIcon }}}</span>',{
          settings: { withInternalID: true },
          classList: ['send-message-button', 'button'],
          sendMessageIcon,
          events: {
            click: (e)=> {
              e.preventDefault();
              const messageText = this.props.messageText;
              if (messageText) {
                const selectedChatId = store.getState('selectedChatId') as number;
                const chatSessionKey  = 'chat_session_'+selectedChatId

                const chatSession = store.getChatSession(chatSessionKey);
                if (chatSession && chatSession.socket && chatSession.socket.readyState === 1) {
                  chatSession.sendMessage(messageText);
                  const input = document.getElementById('message-input') as HTMLInputElement;
                  if (input) {
                    input.value = '';
                  }
                  this.setProps({
                    messageText: ''
                  })
                }
              }
            }
          }
        })
    } as Record<string, Block>

    super(template, { ...tagName, ...children, ...icons, ...className, ...props });

  }
}
