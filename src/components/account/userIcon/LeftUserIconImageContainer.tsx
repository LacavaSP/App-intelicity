import './LeftUserIconImageContainer.css';
interface ContainerProps { }

const LeftUserIconImageContainer: React.FC<ContainerProps> = () => {

    return (
        <div id="container" className={'container-img-user'}>
            <img id="img" className={'img-user'} alt="userIconImage" src="/src/assets/images/left-side-head.png"/>
        </div>
    );
};

export default LeftUserIconImageContainer;
