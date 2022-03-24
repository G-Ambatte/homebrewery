const _ = require('lodash');

// These are "strong" verbs - they are definite, explicit, goal-setting verbs
// The players will know what they need to do and when they have achieved it
// Some verbs apply to people, others to objects
// So two lists.

const verbsPerson = [
	'Kill',
	'Save',
	'Stop',
	'Rescue',
	'Arrest',
	'Talk to',
	'Escape from'
];

const verbsObject = [
	'Steal',
	'Destroy',
	'Get',
	'Learn from/about',
	'Deliver',
];

// Objects and people that the verbs might apply to

const peopleNames = [
	'Princess',
	'King',
	'Witch',
	'Dragon',
	'Mayor',
	'Town Drunk',
	'Shopkeeper',
	'Innkeeper',
	'Daughter',
	'Son',
	'Grandchild',
	'Orphan',
];

const objectNames = [
	'Ring',
	'Book',
	'Sword',
	'Necklace',
	'Wand',
	'Potion',
];

module.exports = {

	questList : function(){

		const quests = 5;

		const objectQuest=['### Item Quests'];
		const personQuest=['### People Quests'];

		let i = 0;
		while (i<quests){
			objectQuest.push(`${i+1}. ${verbsObject[_.random(1, verbsObject.length-1)]} ${objectNames[_.random(1, objectNames.length-1)]}`);
			personQuest.push(`${i+1}. ${verbsPerson[_.random(1, verbsPerson.length-1)]} ${peopleNames[_.random(1, peopleNames.length-1)]}`);
			i++;
		};

		const content = [objectQuest.join('\n'), personQuest.join('\n')].join('\n\n\n');

		return `{{questList,wide\n${content}\n}}`;
	}
};
