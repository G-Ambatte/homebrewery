const React = require('react');
const createClass = require('create-react-class');
const _     = require('lodash');
const cx    = require('classnames');

const ListPage = require('../basePages/listPage/listPage.jsx');

const Nav = require('naturalcrit/nav/nav.jsx');
const Navbar = require('../../navbar/navbar.jsx');

const RecentNavItem = require('../../navbar/recent.navitem.jsx').both;
const Account = require('../../navbar/account.navitem.jsx');
const NewBrew = require('../../navbar/newbrew.navitem.jsx');
const HelpNavItem = require('../../navbar/help.navitem.jsx');

const RevisionsPage = createClass({
	displayName     : 'RevisionsPage',
	getDefaultProps : function() {
		return {
			username : '',
			brews    : [],
			query    : ''
		};
	},
	getInitialState : function() {
		const brews = _.orderBy(this.props.brews, (brew)=>{
			return brew.modifiedTime;
		}, 'desc');

		const brewCollection = [
			{
				title : `Revisions`,
				class : 'revisions',
				brews : brews
			}
		];

		return {
			brewCollection : brewCollection
		};
	},

	navItems : function() {
		return <Navbar>
			<Nav.section>
				<NewBrew />
				<HelpNavItem />
				<RecentNavItem />
				<Account />
			</Nav.section>
		</Navbar>;
	},

	render : function(){
		return <ListPage
			brewCollection={this.state.brewCollection}
			navItems={this.navItems()}
			query={this.props.query}
			sort={true}
			USERPAGE_KEY_PREFIX='HOMEBREWERY-REVISIONSPAGE'
		></ListPage>;
	}
});

module.exports = RevisionsPage;
