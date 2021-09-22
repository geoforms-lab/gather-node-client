
const EventEmitter = require("events");
const got = require("got");


const _extend=(obj)=>{

	var a = obj || {};
    var items = Array.prototype.slice.call(arguments, 1);

    items.forEach(function(b) {
        b = b || {};
        Object.keys(b).forEach(function(k) {
            a[k] = b[k];
        });
    });


}

class GatherClient extends EventEmitter{

	constructor(credentials, config, cb){

		super();
		this.renewAt=-1;
		this.config=config;
		this._connect(credentials, cb);

	}


	_connect(credentials, cb){



		
		this._login(credentials).then((token)=>{

			this.renewAt=(new Date()).getTime()+token.expires
			this.token=token.token;
			this.renewalToken=token.renew;

			cb();

		});

	}



	async _login(credentials){
		try {
			const response = await got.post(config.url+'login',{
				form:{json:JSON.stringify(credentials)}
			}).json()

			if(!response.success){
				throw JSON.stringify(response);
			}
			console.log(response)
			return response.access_token;

		} catch (error) {
			console.error(error);
		}

	}


	async _request(task, json){

		try {
			const response = await got.post(config.url+task+"&iam="+config.iam+"&access_token="+this.token,{form:{json:JSON.stringify(json)}}).json()

			if(!response.success){
				throw JSON.stringify(response);
			}
			console.log(response)
			return response;

		} catch (error) {
			console.error(error);
		}

	}

	_gatherRequest(task, json){

		json.plugin=this.config.plugin;

		return this._request(task, json);

	}



	listCategoriesRecursive(){
		this._gatherRequest('list_tags',{})
	}

}

const credentials=require("./credentials.json");
const config=require("./config.json")

if(config.ignoreCertError===true){
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
}

const client=(new GatherClient(credentials, config, ()=>{

	console.log('list');
	client.listCategoriesRecursive(config.rootCategory, (list)=>{

		


	});



}));