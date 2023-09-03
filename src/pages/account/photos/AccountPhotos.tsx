import {IonAlert, IonButton, IonContent, IonFooter, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave} from '@ionic/react';

import './AccountPhotos.css';
import FooterLogo from '../../../components/shared/FooterLogo';
import { useEffect, useRef, useState } from 'react';
import UserIconImageContainer from '../../../components/account/userIcon/UserIconImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBan, faCamera, faCheck, faSpinner, } from '@fortawesome/free-solid-svg-icons';
import RightUserIconImageContainer from '../../../components/account/userIcon/RightUserIconImageContainer';
import LeftUserIconImageContainer from '../../../components/account/userIcon/LeftUserIconImageContainer';
import CardPresentation from '../../../components/account/photos/CardPresentation';
import { Camera, CameraDirection, CameraResultType } from '@capacitor/camera';

export interface AccountPhoto {
    img: string,
    name: string
}

const AccountPhotos: React.FC = () => {

    const [loading, showLoading] = useState<boolean>(false)
    const params = new URLSearchParams(location.search)

    const [imgs, setImgs] = useState<AccountPhoto[]>([])
    const [preparation, changePreparation] = useState<boolean>(true)
    const [cardPresentation, setCardPresentation] = useState<boolean>(false)
    const [photoType, setPhotoType] = useState<string | null>(null)
    const [photoBase64Data, setPhotoBase64Data] = useState<string | null>(null)
    const [alert, showAlert] = useState<boolean>(false)
    const [msg, setMsg] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    
    document.addEventListener('dataReset', event => {
        clearData()
    });

    useEffect(() => {
    }, []);

    useIonViewDidEnter(() => {
        clearData()
    })

    useIonViewWillLeave(() => {
        clearData()
    })

    const handleAlertDismiss = () => {
        showAlert(false)
    }

    const clearData = () => {
        setImgs([])
        showAlert(false)
        setCardPresentation(false)
        setUserName(params.get('nome'))
        setPhotoType('Frontal')
        setMsg('Tente imitar a posição do desenho e clique no botão tirar foto.')
        changePreparation(true)
        setPhotoBase64Data(null)
    }

    const takePhoto = async () => {
        const result = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            direction: CameraDirection.Front
          });

        const base64PictureData = result.dataUrl;
        const resultImgContainer = document.getElementById('result');
        setPhotoBase64Data(base64PictureData!.toString())
        resultImgContainer!.style.opacity = '1'
    };

    const prepareOverlap = () => {
        changePreparation(false)
        showAlert(true)
        changeOverlapOpacity(false)
    }

    const postPictureConfirmation = () => {
        showLoading(true)
        let nextPage = false
        let fileType = '-1'

        if (photoType === 'Frontal') {
            setPhotoType('Lateral Direita')
            setMsg('Agora, vire seu rosto para a direita conforme a imagem.')
        } else if (photoType === 'Lateral Direita') {
            setPhotoType('Lateral Esquerda')
            setMsg('Agora, vire seu rosto para a esquerda conforme a imagem.')
            fileType = '-2'
        } else if (photoType === 'Lateral Esquerda') {
            fileType = '-3'
            nextPage = true
        }

        imgs.push({img: photoBase64Data!, name: userName! + fileType})
        setImgs(imgs)

        if (nextPage) {
            showLoading(false)
            const imgArray = JSON.stringify(imgs)
            setCardPresentation(true)
            return
        }

        hideImageContainer()
        setPhotoBase64Data(null)
        showLoading(false)
        showAlert(true)
    }

    const changeOverlapOpacity = (hidde: boolean) => {
        let opacity = '1'
        if (hidde) {
            opacity = '0'
        }  
        const userIcon = document.getElementById('user')
        userIcon!.style.opacity = opacity
    }

    const hideImageContainer = () => {
        const resultImgContainer = document.getElementById('result');
        resultImgContainer!.style.opacity = '0'
    }

    const cancel = () => {
        setPhotoBase64Data(null)
        hideImageContainer()
    }

    const handleOnCancel = () => {
        location.reload()
    }

    return (
        <IonPage>
            <IonToolbar>
                <IonTitle>{!cardPresentation ? 'Captura ' + photoType : 'Confirmação Envio'}</IonTitle>
            </IonToolbar>
            <IonContent fullscreen>
                {
                    !cardPresentation ?
                    <>
                    <IonLoading
                        isOpen={loading}
                        message={'Aguarde...'}
                    />
                    <IonAlert
                                isOpen={alert}
                                onDidDismiss={handleAlertDismiss}
                                header="Atenção"
                                message={msg + ''}
                                buttons={['OK']}
                        />
                
                    <div id="user" className='user-photo-overlap' style={{opacity: '1'}}>
                        {   
                            preparation ? <>
                                <div className='loadingContainer'>
                                    <FontAwesomeIcon icon={faSpinner}/>
                                </div>
                            </> : 
                            
                            <>
                             {
                                photoType === 'Frontal' ?
                                    <UserIconImageContainer></UserIconImageContainer>
                                    : photoType === 'Lateral Direita' ? <RightUserIconImageContainer></RightUserIconImageContainer> : <LeftUserIconImageContainer></LeftUserIconImageContainer> 
                                }
                            </>
                            
                        }
                    </div>
                    <div className="button-container" style={{position: 'relative', zIndex: '50'}}>
                        {
                            !photoBase64Data ? 
                            <>
                                <IonButton className='accountPhotosButton' color="primary" onClick={preparation ? prepareOverlap : takePhoto}>{preparation ? 'Começar' : 'Tirar Foto'}  <FontAwesomeIcon className='icon-fw' icon={preparation ? faArrowUp : faCamera} /></IonButton>
                            </>
                            : 
                            <>
                                <IonButton className='accountPhotosButton' color="primary" onClick={postPictureConfirmation}>Prosseguir  <FontAwesomeIcon className='icon-fw' icon={faCheck} /></IonButton>
                                <IonButton className='accountPhotosButton' color="secondary" onClick={cancel}>Cancelar  <FontAwesomeIcon className='icon-fw' icon={faBan} /></IonButton>
                            </>
                        }
                        
                    </div>

                    <div id='result' className='result-container' style={{opacity: '0'}}>
                     
                        <div id="user" className='overlap-foto-pessoa' >
                            <img className='total-size-img' src={photoBase64Data!}></img>
                        </div>
                        <div id="user" className='user-photo-overlap-2' style={{opacity: '1', position: 'fixed', zIndex: '1', transform: 'scale(1.5)'}}>
                            {   
                                
                                <>
                                {
                                    photoType === 'Frontal' ?
                                        <UserIconImageContainer></UserIconImageContainer>
                                        : photoType === 'Lateral Direita' ? <RightUserIconImageContainer></RightUserIconImageContainer> : <LeftUserIconImageContainer></LeftUserIconImageContainer> 
                                    }
                                </>
                                
                            }
                        </div>
                    </div>
                    </>
                :
                <>
                    <CardPresentation onCancel={handleOnCancel}  photos={imgs}/>
                </>
                }
                
            </IonContent>
            <IonFooter>
                <IonToolbar no-border>
                    <IonTitle>
                        <FooterLogo/>
                        <span className='pos-relative copyright'>© 2022-2023 Intelicity. Todos os direitos reservados.</span>
                    </IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default AccountPhotos;
