import './FooterLogo.css';
interface ContainerProps { }

const FooterLogo: React.FC<ContainerProps> = () => {

    return (
        <img className={'img-logo-footer'} src="/src/assets/images/INTLC-200x200-1920w.png"/>
    );
};

export default FooterLogo;
