const React = require('react');
const createClass = require('create-react-class');
const Nav = require('naturalcrit/nav/nav.jsx');

const Account = createClass({

	getInitialState : function() {
		return {
			url     : '',
			newMail : false
		};
	},

	componentDidMount : function(){
		if(typeof window !== 'undefined'){
			this.setState({
				url : window.location.href
			});
		}
	},

	render : function(){
		if(global.account){
			let mailIconColor = 'blue';
			let mailIcon = 'far fa-envelope-open';
			if(this.state.newMail) {
				mailIconColor = 'red';
				mailIcon = 'fas fa-envelope';
			}
			return <Nav.section>
				<Nav.item href={`/message/inbox/${global.account.username}`} color={`${mailIconColor}`} icon={`${mailIcon}`} />
				<Nav.item href={`/user/${global.account.username}`} color='yellow' icon='fas fa-user'>
					{global.account.username}
				</Nav.item>
				 </Nav.section>;
		}

		return <Nav.item href={`http://naturalcrit.com/login?redirect=${this.state.url}`} color='teal' icon='fas fa-sign-in-alt'>
			login
		</Nav.item>;
	}
});

module.exports = Account;
