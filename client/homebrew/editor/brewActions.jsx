/* eslint-disable max-lines */
const React = require('react');
const createClass = require('create-react-class');
const _ = require('lodash');
const request = require('superagent');

const BrewActions = createClass({
	render : function(){
	}
});

module.exports = {
	saveBrew : async function(brewToSave) {
		const res = await request
							.post('/api')
							.send(brewToSave)
							.catch((err)=>{
								alert('Error while saving!');
								return;
							});
		return res;
	},

	saveGoogleBrew : async function(brewToSave) {
		const res = await request
					.post('/api/newGoogle/')
					.send(brewToSave)
					.catch((err)=>{
						alert(err.status === 401
							? 'Not signed in!'
							: 'Error Saving to Google Brew!');
						return;
					});
		return res;
	},

	deleteBrew : async function(brewToDelete) {
		const res = await request.delete(`/api/${brewToDelete.editId}`)
					.send()
					.catch((err)=>{
						console.log('Error deleting Local Copy');
						// TODO: setState errors: err, as per saveBrew/saveGoogleBrew???
						return;
					});
		return res;
	},

	deleteGoogleBrew : async function(brewToDelete) {
		const res = await request.get(`/api/removeGoogle/${brewToDelete.googleId}${brewToDelete.editId}`)
					.send()
					.catch((err)=>{
						console.log('Error Deleting Google Brew');
						// TODO: setState errors: err, as per saveBrew/saveGoogleBrew???
						return;
					});
		return res;
	},

	updateBrew : async function(brewToUpdate) {
		const res = await request
					.put(`/api/update/${brewToUpdate.editId}`)
					.send(brewToUpdate)
					.catch((err)=>{
						console.log(`Error Updating Local Brew: ${err}`);
						return;
					});
		return res;
	},

	updateGoogleBrew : async function(brewToUpdate) {
		const res = await request
					.put(`/api/updateGoogle/${brewToUpdate.editId}`)
					.send(brewToUpdate)
					.catch((err)=>{
						console.log(err.status === 401
							? 'Not signed in!'
							: 'Error Saving to Google!');
						return;
					});
		return res;
	}
};