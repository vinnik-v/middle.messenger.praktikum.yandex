import './profile-header.scss';
import ProfileHeaderTemplate from './profile-header.hbs?raw';
import Block from '../../../../../../classes/Block';

export default class ProfileHeader extends Block {
    constructor(props: typeof Block.prototype.props) {
        super(ProfileHeaderTemplate, props)
    }
}
