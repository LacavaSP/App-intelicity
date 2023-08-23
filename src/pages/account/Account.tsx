import {IonAlert, IonButton, IonContent, IonFooter, IonInput, IonItem, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';

import './Account.css';
import UserIconImageContainer from "../../components/account/userIcon/UserIconImageContainer";
import FooterLogo from "../../components/shared/FooterLogo";
import {useState} from "react";
import { useAccountApi } from '../../hooks/account/useAccountApi';
import { useHistory } from 'react-router-dom';

const Account: React.FC = () => {
    const history = useHistory();
    const [loading, showLoading] = useState<boolean>(false)
    const [nameError, showNameError] = useState<boolean>(false)
    const [nomeDigitado, setNomeDigitado] = useState<string | null>('')

    const {searchData} = useAccountApi()

    const handleSubmit = async ()  => {
        if (nomeDigitado) {
            showLoading(true);
            const nomesExistentesNaBase: string[] = await searchData();
            const nomeJaExisteNaBase = nomesExistentesNaBase.filter(nomeExistente => nomeExistente.toUpperCase() === nomeDigitado.toUpperCase()).length > 0
            if (nomeJaExisteNaBase) {
                showNameError(true)
            } else {
                history.push('/photos?nome=' + nomeDigitado)
            }
            showLoading(false);
        }
    }

    const handleInputChange = (event: CustomEvent) => {
       setNomeDigitado(event.detail.value)
    };

    const handleAlertDismiss = () => {
        setNomeDigitado(null);
        showNameError(false)
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="form-container">
                    <UserIconImageContainer/>
                    <form>
                        <IonItem>
                            <IonInput value={nomeDigitado} onIonInput={handleInputChange} placeholder="Insira seu nome de usuário"/>
                        </IonItem>
                        <div className="div-submit-button">
                            <IonButton onClick={handleSubmit} expand="block" size="small">Prosseguir</IonButton>
                        </div>
                    </form>

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
                        <span className='pos-relative'>© 2022-2023 Intelicity. Todos os direitos reservados.</span>
                    </IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Account;
