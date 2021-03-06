const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request');

export default class RequestHelper {

    constructor()
    {

    }


    baseUrl = `http://localhost:3000`;


    async get(opts:{
        url, //either relative or exact
        headers?,
        qs?
    }):Promise<{
        body
    }>
    {

        let {url,headers,qs} = opts;


        return this.request({
            url,
            headers,
            qs,
            method: 'GET'
        });

    }


    async request(opts:{
        method,
        url,
        headers,
        qs
    }):Promise<{
        body
    }>
    {

        let {url,headers,qs,method} = opts;


        if (url.indexOf('://') === -1)
        {
            url = this.baseUrl + url;
        }

        let requestOpts = {
            method,
            url,
            headers,
            qs
        };

        //TODO log request/ response times
        let result:any = await (async function() {
            return new Promise((r) => {
                // let result:any = {};
                request(requestOpts, (err,response,body) => {
                    let result:any = {
                        status: response.status,
                        headers: response.headers,
                        err,
                        // response,
                        body
                    };
                    r(result);
                })

            });
        })();

        return result;



        // let requestOpts = {
        //     method: 'GET',
        //     url: 'https://api.openweathermap.org/data/2.5/weather',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     qs: {
        //         zip,
        //         APPID: self.OPEN_WEATHER_MAP_API_KEY
        //     }
        // };


    }

}

