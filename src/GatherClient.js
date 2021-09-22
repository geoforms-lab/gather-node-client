const GatherClientBase=require("./GatherClientBase.js");

module.exports=class GatherClient extends GatherClientBase{





	listCategories(){
		return this._gatherRequest('list_tags',{}).then((response)=>{
			return response.tags;
		});
	}


	listProjects(){
		return this._gatherRequest('list_projects',{}).then((response)=>{
			return response.tags;
		});
	}



}