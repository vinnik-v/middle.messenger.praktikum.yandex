import { expect } from 'chai';
import 'mocha';
import jsDomGlobal from 'jsdom-global';

import Block from '../Block.ts';

class BlockChild extends Block<Record<string, unknown>> {
  constructor(template: string, props: typeof Block.prototype.props) {
    super(template, props);
  }
}

function createEntity(template: string, {...options}) {
  return new BlockChild(template, {...options});
}

const initHooks = () => {
  beforeEach(() => {
      jsDomGlobal('',{
          url: "http://app.com",
      });
  });
  
  afterEach(() => {
      jsDomGlobal()();
  });
} 

describe('Check component properties', () => {
  initHooks();
  const template = '{{{button}}}';
  const options = {
    classList: ['block-element'],
    elemProps: [{ name: 'data-type', value: 'block-id' }],
    tagName: 'div',
    settings: { withInternalID: true } 
  }

  it('Component tagName should be "div"', () => {
    const element = createEntity(template, options);
    expect(element.props.tagName).to.equal('div');
  });
  it('Component template should be {{{button}}}', () => {
    const element = createEntity(template, options);
    expect(element._template).to.equal('{{{button}}}');
  });
  it('Component classList should include "block-element"', () => {
    const element = createEntity(template, options);
    const classList = element.props.classList ? element.props.classList as string[] : null;
    expect(classList && classList.includes('block-element')).to.equal(true);
  });
  it('Component should have id', () => {
    const element = createEntity(template, options);
    expect('_id'in element && typeof element._id === 'string').to.equal(true);
  });
  it('Component html element should have data attribute "block-id"', () => {
    const element = createEntity(template, options);
    expect(element._element.dataset.type).to.equal('block-id');
  });
});

describe('Check component setProps', () => {
  initHooks();
  const elementTemplate = '{{{button}}}';
  const elementOptions = { 
    settings: { withInternalID: true } 
  }

  const buttonTemplate = '{{buttonText}}';
  const buttonOptions = {
    tagName: 'button',
    buttonText: 'Нажми меня',
    settings: { withInternalID: true }
  }

  const init = () => {
    const element = createEntity(elementTemplate,elementOptions);
    const button = createEntity(buttonTemplate,buttonOptions)
    element.setProps({button,className: 'some-element',active: false});
    return element;
  }

  it('Component children should have Button', () => {
    const element = init();
    expect('button' in element.children).to.equal(true);
  });
  it('Component className should be "some-element"', () => {
    const element = init();
    expect(element.props.className).to.equal('some-element');
  });
  it('Component active should be "false"', () => {
    const element = init();
    expect(element.props.active).to.equal(false);
  });
});

describe('Check component render', () => {
  initHooks();
  const elementTemplate = '{{{button}}}';
  const elementOptions = { 
    classList: ['block-element'],
    elemProps: [{ name: 'id', value: 'block-id' }],
    settings: { withInternalID: true } 
  }

  const buttonTemplate = '{{buttonText}}';
  const buttonOptions = {
    tagName: 'button',
    buttonText: 'Нажми меня',
    elemProps: [{ name: 'id', value: 'button' }],
    settings: { withInternalID: true }
  }

  const init = () => {
    const element = createEntity(elementTemplate,elementOptions);
    const button = createEntity(buttonTemplate,buttonOptions)
    element.setProps({button});
    document.body.appendChild(element.getContent());
    const elem = document.getElementById('block-id');
    return { element, htmlElem: elem };
  }
  it('Component injected to DOM', () => {
    const { htmlElem } = init();
    expect(htmlElem && htmlElem.id === 'block-id').to.equal(true);
  });
  it('Component have child button element', () => {
    const { htmlElem } = init();
    const button = htmlElem?.querySelector('#button');
    expect(!!button).to.equal(true);
  });
  it('Component rerendered after set props', () => {
    const { element } = init();
    const otherButton = createEntity('{{buttonText}}',{
      elemProps: [{ name: 'id', value: 'button-2' }],
      tagName: 'button',
      settings: { withInternalID: true }
    })
    element.setProps({
      button: otherButton
    });
    const elem = document.getElementById('block-id');
    const btn = elem?.querySelector('#button-2');
    expect(btn?.id).to.equal('button-2');
  });
});
