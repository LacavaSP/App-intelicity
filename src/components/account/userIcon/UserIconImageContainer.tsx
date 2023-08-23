import './UserIconImageContainer.css';
interface ContainerProps { }

const UserIconImageContainer: React.FC<ContainerProps> = () => {

    return (
        <div id="container" className={'container-img-user'}>
            <img id="img" className={'img-user'} alt="userIconImage" src="/src/assets/images/flat-avatar-2.png"/>
        </div>
    );
};

export default UserIconImageContainer;
