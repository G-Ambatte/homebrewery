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
		alert(this.props.environment);
		//document.cookie = `nc_session=''; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
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
		const opts  = (global.account?.username ? {
			'href'  : `/user/${global.account.username}`,
			'color' : 'yellow',
			'icon'  : 'fas fa-user',
			'text'  : global.account?.username
		} : {
			'href'  : `https://www.naturalcrit.com/login?redirect=${this.state.url}`,
			'color' : 'teal',
			'icon'  : 'fas fa-sign-in-alt',
			'text'  : 'Log In'
		});
		return <Nav.section className='account'>
			<Nav.item
				href={opts['href']}
				color={opts['color']}
				icon={opts['icon']}
				onMouseEnter={()=>this.handleDropdown(true)}
				onMouseLeave={()=>this.handleDropdown(false)} >
				{opts['text']}
				{this.renderDropdown()}
			</Nav.item>
		</Nav.section>;
	}
});

module.exports = Account;
