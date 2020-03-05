class API {
    
    //baseURL = 'https://q04efj2xk7.execute-api.ap-southeast-1.amazonaws.com/uat';
    
    //Test URL
    //baseURL = 'https://q04efj2xk7.execute-api.ap-southeast-1.amazonaws.com/octaltest';
    
    //Dev URL
    baseURL = 'https://q04efj2xk7.execute-api.ap-southeast-1.amazonaws.com/octaldev';
    
    policyURL = '/policytrs';
    
    apiCall(url) {
        return {
            get: (fetch(url, { 
                headers:{
                'x-api-key': 'VpmVx0ZILalxyDTThsJU92RaQbDWWO95ehp92bKe'
            }}).then((res)=>res.json()))
        }
    }

    generateURL(name) {
        return this.baseURL + this[name]
    }
    
    generateParam(obj) {
        let url = '?';
        for(let key in obj) {
            url = url+key+'='+obj[key]+'&';
        }
        return url.substring(0, url.length - 1);
    }
    getBaseURL(){
        return this.baseURL;
    }
}
export default API;