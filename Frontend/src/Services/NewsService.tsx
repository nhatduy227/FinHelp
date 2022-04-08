const axios = require('axios');

export async function getNews(newsSymbol: String) {
    try{
        const response = await axios.get('/news/list', {
            params: {
                symbol: newsSymbol,
            }
        });
        console.log('response  ', response)
        return response.data;
    }catch(error) {
        return [];
    }
    
}