const React = require('react');
const createClass = require('create-react-class');
const Nav = require('naturalcrit/nav/nav.jsx');

const Account = createClass({

	getInitialState : function() {
		return {
			url          : '',
			showDropdown : false
		};
	},

	componentDidMount : function(){
		if(typeof window !== 'undefined'){
			this.setState({
				url : window.location.href
			});
		}
	},

	handleDropdown : function(show){
		this.setState({
			showDropdown : show
		});
	},

	clearCookie : function(){
		document.cookie = `nc_session=''; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; domain=${window.domain}`;
	},

	renderDropdown : function(){
		if(!this.state.showDropdown || !global.account?.username) return null;

		return <div className='dropdown'>
			<button
				className='item'
				onClick={this.clearCookie}>
				Logout
			</button>
		</div>;
	},

	render : function(){
		const href  = (global.account?.username ? `/user/${global.account.username}` : `https://www.naturalcrit.com/login?redirect=${this.state.url}`);
		const color = (global.account?.username ? 'yellow' : 'teal');
		const icon  = (global.account?.username ? 'fas fa-user' : 'fas fa-sign-in-alt');
		const text  = (global.account?.username || 'Log In');
		return <Nav.section className='account'>
			<Nav.item
				href={href}
				color={color}
				icon={icon}
				onMouseEnter={()=>this.handleDropdown(true)}
				onMouseLeave={()=>this.handleDropdown(false)} >
				{text}
				{this.renderDropdown()}
			</Nav.item>
		</Nav.section>;
	}
});

module.exports = Account;
