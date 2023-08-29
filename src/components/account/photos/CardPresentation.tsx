import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonList, IonLoading, useIonViewDidEnter } from '@ionic/react';
import { AccountPhoto } from '../../../pages/account/photos/AccountPhotos';
import './CardPresentation.css';
import { useEffect, useState } from 'react';
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccountPhotosApi } from '../../../hooks/account/photos/useAccountPhotosApi';
import { useHistory } from 'react-router';

const CardPresentation: React.FC<any> = ({photos, onCancel}) => {
    const [imgs, setImgs] = useState<AccountPhoto[]>([])
    const {submitImg} = useAccountPhotosApi()
    const [loading, showLoading] = useState<boolean>(false)
    const [alert, showAlert] = useState<boolean>(false)
    const [alertSubmit, showAlertSubmit] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const history = useHistory()

    useEffect(() => {

        if (imgs && imgs.length < 1) {
            setImgs(photos)
        }
        
    }, [photos, imgs])

    const handleOnCancel = () => {
        onCancel()
    }

    const handleImagesSubmit = async () => {
        if (confirmation) {
            showLoading(true)
            const imgsCopy = Object.assign(imgs)
            imgsCopy.forEach((img: any) => {
                console.log(img.img.split(',')[1])
                img.img = img.img.split(',')[1];
            });
            
            try {
                await submitImg(imgsCopy[0])
            } catch(error) {
                console.log(error)
            }
            
            try {
                await submitImg(imgsCopy[1])
            } catch(error) {
                console.log(error)
            }

            try {
                await submitImg(imgsCopy[2])
            } catch(error) {
                console.log(error)
            }
             
            showLoading(false)
            history.push('/home')
        } else {
            showAlertSubmit(true)
        }
        
    }

    const handleAlertDismiss = () => {
        showAlert(false)
        history.push('/home')
    }

    const handleAlertSubmitDismiss = () => {
        showAlertSubmit(false)
        setConfirmation(true)
    }

    return (
        
        imgs && imgs.length > 0 ? 
        <>
        <IonAlert
                                isOpen={alertSubmit}
                                onDidDismiss={handleAlertSubmitDismiss}
                                header="Atenção"
                                message={'Clique novamente para confirmar o envio.'}
                                buttons={['OK']}
                        />
         <IonAlert
                                isOpen={alert}
                                onDidDismiss={handleAlertDismiss}
                                header="Aviso"
                                message={'Imagens enviadas com sucesso!'}
                                buttons={['OK']}
                        />
            <IonLoading
                isOpen={loading}
                message={'Aguarde...'}
            />
            <div id="choice-container">
                <IonButton onClick={handleImagesSubmit} color="primary">Salvar  <FontAwesomeIcon className='icon-fw' icon={faSave} /></IonButton>
                <IonButton onClick={handleOnCancel} color="secondary">Cancelar  <FontAwesomeIcon className='icon-fw' icon={faBan} /></IonButton>
            </div>
            
            <IonList>
        {imgs.map((item, index) => (

                <IonCard>

                    <IonCardHeader>
                        <IonCardSubtitle>{index === 0 ? 'Frontal' : index === 1 ? 'Lateral Direita' : 'Lateral Esquerda'}</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <div className='img-card-container'>
                            <img alt={item.name} src={item.img} className='img-foto' />
                        </div>
                    </IonCardContent>
                </IonCard>
          
        ))}
      </IonList>
        </> : <><div onClick={() => console.log(imgs)}></div></>
    );
};

export default CardPresentation;
