import { IonContent, IonPage} from '@ionic/react';
import ImageContainer from '../components/initialImageContainer/ImageContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='page' fullscreen>
          <ImageContainer></ImageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
