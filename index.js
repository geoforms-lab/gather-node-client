module.exports=require("./src/GatherClient");

if(process.argv&&process.argv[1]===__filename){

	var client;
	client=new module.exports(require('./credentials.json'), require('./config.json'),()=>{

		for(var i=0;i<1000;i++){
			client.echo({'hello':'world-'+i}).then((response)=>{
				console.log(response.hello);
			});
		}

	})

}