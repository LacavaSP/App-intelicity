import { AccountPhoto } from "../../../pages/account/photos/AccountPhotos";


export const useAccountPhotosApi = () => {
    const url = 'http://10.15.20.11:1880/face/SendImages'

    const submitImg = async (data: AccountPhoto): Promise<any> => {
        let result = null
  
            const requestBody = JSON.stringify(data);
      
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: requestBody
            });
      
            const responseData = await response.json();
            result = responseData 
          
          return result
    }

    return {
      submitImg
    }
}