import { IonContent, IonPage, useIonViewDidEnter} from '@ionic/react';
import ImageContainer from '../components/initialImageContainer/ImageContainer';
import './Home.css';

const Home: React.FC = () => {

  const params = new URLSearchParams(location.search)

  useIonViewDidEnter(() => {
    const customEvent = new CustomEvent('dataReset', {
      detail: { message: 'data clear!' }
    });
    
    document.dispatchEvent(customEvent);
  })

  return (
    <IonPage>
      <IonContent className='page' fullscreen>
          <ImageContainer></ImageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
