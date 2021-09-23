const GatherClientBase=require("./GatherClientBase.js");

module.exports=class GatherClient extends GatherClientBase{

	echo(data){
		return this._request('echo', data||{"hello":"world"}).then((response)=>{
			return response;
		});
	}



	listCategories(){
		return this._gatherRequest('list_tags',{}).then((response)=>{
			return response.tags;
		});
	}


	listProjects(){
		return this._gatherRequest('list_projects',{}).then((response)=>{
			return response.results;
		});
	}


	listArchivedProjects(){
		return this._gatherRequest('list_archived_projects',{}).then((response)=>{
			return response.results;
		});
	}



	createProject(project){

		if(typeof project.id!="undefined"){
			throw "Should not have a project id: use update project";
		}

		return this._gatherRequest('save_project', project).then((response)=>{
			return response.data;
		});
	}


	updateProject(project){

		if(typeof project.id!="number"||project.id<=0){
			throw "Invalid project id";
		}

		return this._gatherRequest('save_project', project).then((response)=>{
			return response.data;
		});
	}



	







}
