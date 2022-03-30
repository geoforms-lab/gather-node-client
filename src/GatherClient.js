const GatherClientBase=require("./GatherClientBase.js");

module.exports=class GatherClient extends GatherClientBase{

	echo(data){
		return this._request('echo', data||{"hello":"world"}).then((response)=>{
			return response;
		});
	}


	getConfig(){
		
		return this._gatherRequest('get_dashboard_config',{}).then((response)=>{
			return response.parameters;
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

	createGuestProject(project, email, callback){

		if(typeof project.id!="undefined"){
			throw "Should not have a project id: use update project";
		}

		return this._gatherRequest('save_guest_proposal', project).then((response)=>{
			return this._gatherRequest('save_guest_proposal', {

				email:email,
				token:response.token

				}).then((response)=>{

			});
		})
	}

	createProject(project){

		if(typeof project.id!="undefined"){
			throw "Should not have a project id: use update project";
		}

		return this._gatherRequest('save_project', project).then((response)=>{
			return response.data;
		});
	}


	createCategory(category){


		if(typeof category.id!="undefined"){
			throw "Should not have a category id: use update updateCategory";
		}

		return this._gatherRequest('save_tag', category).then((response)=>{
			return response.tag;
		});
	}

	updateCategory(category){


		if(typeof category.id!="number"){
			throw "Invalid category id: not a number";
		}

		if(category.id<=0){
			throw "Invalid category id <= 0";
		}	



		return this._gatherRequest('save_tag', category).then((response)=>{
			return response.tag;
		});
	}

	removeCatetory(id){


		if(typeof id!="number"){
			throw "Invalid category id: not a number";
		}

		if(id<=0){
			throw "Invalid category id <= 0";
		}	


		return this._gatherRequest('remove_tag', {id:id}).then((response)=>{
			return true;
		});
	}

	updateProjectMetadata(project){


		if(typeof project.id!="number"){
			throw "Invalid project id: not a number";
		}

		if(project.id<=0){
			throw "Invalid project id <= 0";
		}

		return this._gatherRequest('save_project_metadata', project).then((response)=>{
			return response.data;
		});



	}


	updateProject(project){

		if(typeof project.id!="number"){
			throw "Invalid project id: not a number";
		}

		if(project.id<=0){
			throw "Invalid project id <= 0";
		}

		return this._gatherRequest('save_project', project).then((response)=>{
			return response.data;
		});
	}


	archiveProject(project){

		var id=typeof project.id=='number'?project.id:project;


		if(typeof id!="number"||id<=0){
			throw "Invalid project id";
		}

		return this._gatherRequest('set_proposal_status', {
			id:id,
			status:'archived'
		}).then((response)=>{
			return response;
		});
		
	}
	



	postChat(id, messageText, metadata){

		id=parseInt(id);
		if(id<=0){
			throw "Invalid chat id";
		}

		let options={
			discussion:id,
			text:messageText
		};
		if(typeof metadata!="undefined"){
			options.metadata=metadata;
		}

		return this._messageRequest('submit_post', options).then((response)=>{
			return response;
		});

	}



}
