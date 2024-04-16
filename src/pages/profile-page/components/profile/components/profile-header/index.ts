import './profile-header.scss';
import ProfileHeaderTemplate from './profile-header.hbs?raw';
import Block from '../../../../../../classes/Block';
import profileNoPhotoIcon from '../../assets/icons/no-photo-icon.svg?raw';
import store from '../../../../../../classes/Store';

export default class ProfileHeader extends Block {
    constructor(props: typeof Block.prototype.props) {
        const tagName = 'header';
        const classList = ['profile__header'];

        const icons = {
            profileNoPhotoIcon
        }

        store.on('UserLogged', () => {
            initData();
        })

        super(ProfileHeaderTemplate, { tagName, classList, ...icons, ...props})

        const initData = () => {
            const userData = store.getState('currentUser') as Record<string, string>;
            if (userData) {
                const userName = userData.first_name;
                const avatar = userData.avatar ? 'https://ya-praktikum.tech/api/v2/resources'+userData.avatar : null;
                this.setProps({
                    userName,
                    avatar
                })
            }
        }

        initData();
    }
}
