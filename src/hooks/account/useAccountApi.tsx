

export const useAccountApi = () => {
    const url = 'https://api.geovista.com.br/ionic/getNames/'

    const searchData = async (): Promise<any> => {
       let result = null
       
       try {
        result = await fetch(url)
       } catch(error) {
        console.log(error)
       }

       return result?.json()
    }

    return {
        searchData
    }
}