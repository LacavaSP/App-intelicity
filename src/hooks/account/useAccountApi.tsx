

export const useAccountApi = () => {
    const url = 'http://10.15.20.11:1880/face/getNames'

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