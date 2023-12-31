import {IonAlert, IonButton, IonContent, IonFooter, IonInput, IonItem, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';

import './Account.css';
import UserIconImageContainer from "../../components/account/userIcon/UserIconImageContainer";
import FooterLogo from "../../components/shared/FooterLogo";
import {useState, useEffect} from "react";
import { useAccountApi } from '../../hooks/account/useAccountApi';
import { useHistory } from 'react-router-dom';
import { Keyboard } from '@capacitor/keyboard';

const Account: React.FC = () => {
    const history = useHistory();
    const [loading, showLoading] = useState<boolean>(false)
    const [nameError, showNameError] = useState<boolean>(false)
    const [nomeDigitado, setNomeDigitado] = useState<string | null>('')
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

    const {searchData} = useAccountApi()

    useEffect(() => {
         setNomeDigitado(null)
         setIsSubmiting(false)
         showLoading(false)
      }, []); 

    const handleSubmit = async ()  => {
        if (nomeDigitado) {
            showLoading(true)
            setIsSubmiting(true)
            window.alert('debugando..')
            let nomesExistentesNaBase: string[] = []

            try{
                nomesExistentesNaBase = await searchData();
            } catch(error) {
                window.alert(error)
                showLoading(false)
                setIsSubmiting(false)
            }

            window.alert(nomesExistentesNaBase)
            window.alert('http://10.15.20.11:1880/face/getNames')
            const nomeJaExisteNaBase = nomesExistentesNaBase.filter(nomeExistente => nomeExistente.toUpperCase() === nomeDigitado.toUpperCase()).length > 0
            if (nomeJaExisteNaBase) {
                setIsSubmiting(false)
                showNameError(true)
            } else {
                setIsSubmiting(false)
                const queryParam = nomeDigitado + ''
                setNomeDigitado(null)
                history.push('/photos?nome=' + nomeDigitado)
            }

            showLoading(false);   
        }
    }

    const handleInputChange = (event: CustomEvent) => {
       setNomeDigitado(event.detail.value)
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            Keyboard.hide()
        }
    }

    const handleAlertDismiss = () => {
        setNomeDigitado(null);
        showNameError(false)
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="form-container">
                <div id="container" className={'container-img-user'}>
                    <img id="img" className={'frontal-img-user img-user-query img-prosseguir-user'} alt="userIconImage" src="data:image/png;base64,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"/>
                </div>
                    
                        <IonItem>
                            <IonInput className='user-input' onKeyDown={handleKeyPress} type="text" value={nomeDigitado} onIonInput={handleInputChange} placeholder="Insira seu nome de usuário"/>
                        </IonItem>
                        <div className="div-submit-button">
                            <IonButton className='prosseguir-button' disabled={isSubmiting} onClick={handleSubmit} expand="block" size="small">Prosseguir</IonButton>
                        </div>
               

                </div>
                <IonAlert
                        isOpen={nameError}
                        onDidDismiss={handleAlertDismiss}
                        header="Erro"
                        message="Esse nome já está sendo utilizado."
                        buttons={['OK']}
                />
                <IonLoading
                    isOpen={loading}
                    message={'Aguarde...'}
                />
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
 
export default Account;
 

