import './ImageContainer.css';
import {useIonViewDidEnter} from "@ionic/react";
import { useHistory } from 'react-router-dom';
interface ContainerProps { }

const ImageContainer: React.FC<ContainerProps> = () => {
    const history = useHistory();

    const changeElementsOpacity = () => {
        const img = document.getElementById('img')
        const msg = document.getElementById('msg')
        setTimeout(() => {
            img!.style.opacity = '1'
            msg!.style.opacity = '0.54'
            setTimeout(() => {
               history.push('/account')
            }, 1250)
        }, 350)
    }

    useIonViewDidEnter( () => {
        changeElementsOpacity()
    })

    return (
    <div id="image-container">
        <img style={{opacity: '0.15'}} id="img" alt="intelicityLogo" src="/src/assets/images/INTLC-200x200-1920w.png"/>
        <span className='pos-relative greeting' style={{opacity: '0'}} id="msg">Boas-vindas!</span>
    </div>
    );
};

export default ImageContainer;
