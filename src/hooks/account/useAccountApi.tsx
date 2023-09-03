

export const useAccountApi = () => {
    const url = 'http://10.15.20.11:1880/face/getNames'

    const searchData = async (): Promise<any> => {
       let result = await fetch(url)
       return result?.json()
    }

    return {
        searchData
    }
}