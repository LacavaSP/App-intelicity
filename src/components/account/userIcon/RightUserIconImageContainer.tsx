import './RightUserIconImageContainer.css';
interface ContainerProps { }

const RightUserIconImageContainer: React.FC<ContainerProps> = () => {

    return (
        <div id="container" className={'container-img-user'}>
            <img id="img" className={'img-user'} alt="userIconImage" src="/src/assets/images/right-side-head.png"/>
        </div>
    );
};

export default RightUserIconImageContainer;
