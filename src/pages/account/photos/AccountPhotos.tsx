import {IonAlert, IonButton, IonContent, IonFooter, IonLoading, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave} from '@ionic/react';

import './AccountPhotos.css';
import FooterLogo from '../../../components/shared/FooterLogo';
import { useEffect, useRef, useState } from 'react';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import '@capacitor-community/camera-preview'
import UserIconImageContainer from '../../../components/account/userIcon/UserIconImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBan, faCamera, faCheck, } from '@fortawesome/free-solid-svg-icons';
import RightUserIconImageContainer from '../../../components/account/userIcon/RightUserIconImageContainer';
import LeftUserIconImageContainer from '../../../components/account/userIcon/LeftUserIconImageContainer';
import CardPresentation from '../../../components/account/photos/CardPresentation';

export interface AccountPhoto {
    img: string,
    name: string
}

const AccountPhotos: React.FC = () => {

    const overlapContainer = useRef(null);
    const cameraContainer = useRef(null);
    const [loading, showLoading] = useState<boolean>(false)
    const params = new URLSearchParams(location.search)

    let cameraActive = false

    const [imgs, setImgs] = useState<AccountPhoto[]>([])
    const [preparation, changePreparation] = useState<boolean>(true)
    const [cardPresentation, setCardPresentation] = useState<boolean>(false)
    const [photoType, setPhotoType] = useState<string | null>(null)
    const [photoBase64Data, setPhotoBase64Data] = useState<string | null>(null)
    const [alert, showAlert] = useState<boolean>(false)
    const [msg, setMsg] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    const reset = () => {
        setCardPresentation(false)
        setPhotoType(null)
        showAlert(false)
        setMsg(null)
        setPhotoBase64Data(null)
        setImgs([])
        setUserName(null)
        cameraActive = false
        setCardPresentation(true)
    }

    useEffect(() => {
        if (!cameraActive) {
            openCamera()
        }
      }, []);

    useIonViewDidEnter(() => {
        setUserName(params.get('nome'))
        setPhotoType('Frontal')
        setMsg('Tente centralizar seu rosto conforme a imagem')
    })

    useIonViewWillLeave(() => {
        reset()
    })

    const handleAlertDismiss = () => {
        showAlert(false)
    }

    const openCamera = () => {
        const cameraPreviewOptions: CameraPreviewOptions = {
            position: 'rear',
            parent: 'cameraPreview',
            className: 'frontalCameraPreview',
        }
        CameraPreview.start(cameraPreviewOptions)
        cameraActive = true
    }

    const takePhoto = async () => {
        const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
            quality: 25
          };
        const result = await CameraPreview.capture(cameraPreviewPictureOptions);
        const base64PictureData = result.value;
        const resultImgContainer = document.getElementById('result');
        setPhotoBase64Data(base64PictureData)
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
        const overlap = document.getElementById('overlap')
        const userIcon = document.getElementById('user')
        overlap!.style.height = document.getElementById('cameraPreview')!.children[0]!.clientHeight + 'px'
        overlap!.style.opacity = opacity
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
                <IonTitle>{!cardPresentation ? 'Captura ' + photoType : 'Confirmação de Envio'}</IonTitle>
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

                    <div id="cameraPreview" className="cameraPreview" ref={cameraContainer}></div>
                    <div id="overlap" className='frontal-overlap' ref={overlapContainer} style={{opacity: '0'}}>
                        <div></div>
                        <div></div>
                    </div>
                    <div id="user" className='user-photo-overlap' style={{opacity: '0'}}>
                        {
                            photoType === 'Frontal' ?
                                <UserIconImageContainer></UserIconImageContainer>
                                : photoType === 'Lateral Direita' ? <RightUserIconImageContainer></RightUserIconImageContainer> : <LeftUserIconImageContainer></LeftUserIconImageContainer> 
                        }
                    </div>
                    <div className="button-container">
                        {
                            !photoBase64Data ? 
                            <>
                                <IonButton color="primary" onClick={preparation ? prepareOverlap : takePhoto}>{preparation ? 'Começar' : 'Tirar Foto'}  <FontAwesomeIcon className='icon-fw' icon={preparation ? faArrowUp : faCamera} /></IonButton>
                            </>
                            : 
                            <>
                                <IonButton color="primary" onClick={postPictureConfirmation}>Prosseguir  <FontAwesomeIcon className='icon-fw' icon={faCheck} /></IonButton>
                                <IonButton color="secondary" onClick={cancel}>Cancelar  <FontAwesomeIcon className='icon-fw' icon={faBan} /></IonButton>
                            </>
                        }
                        
                    </div>

                    <div id='result' className='result-container' style={{opacity: '0'}}>
                        <img src={'data:image/png;base64,' + photoBase64Data!}></img>
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
                        <span className='pos-relative'>© 2022-2023 Intelicity. Todos os direitos reservados.</span>
                    </IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default AccountPhotos;
