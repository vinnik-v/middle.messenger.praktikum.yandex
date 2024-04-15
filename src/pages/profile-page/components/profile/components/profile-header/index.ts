import './profile-header.scss';
import ProfileHeaderTemplate from './profile-header.hbs?raw';
import Block from '../../../../../../classes/Block';
import profileNoPhotoIcon from '../../assets/icons/no-photo-icon.svg?raw';
import store, { StoreEvents } from '../../../../../../classes/Store';

export default class ProfileHeader extends Block {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'header';
        const classList = ['profile__header'];

        const icons = {
            profileNoPhotoIcon
        }

        store.on('UserLogged', () => {
            const userData = store.getState('currentUser') as Record<string, string>;
            if (userData) {
                const userName = userData.first_name;
                const avatar = 'https://ya-praktikum.tech/api/v2/resources'+userData.avatar;
                this.setProps({
                    userName,
                    avatar
                })
            }
            
        })

        super(ProfileHeaderTemplate, { tagName, classList, ...icons, ...props})
    }
}
