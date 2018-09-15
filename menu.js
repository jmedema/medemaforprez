var sections = 
[
	"Summary",
	"NoTrump",
	"NoHillary",
	"WhyMe",
	"CongressionalRebalancing",
	"VotingReform",
	"United",
	"TaxReform",
	"MailReform",
	"Healthcare",
	"IP",
	"Economy",
	"NatlSec",
	"International",
	"Nasa",
	"Science",
	"Contact",
	"Games"
];

var jokes = 
[
	"Lobotomies are a corporate benefit",
	"There are 10 types of people who understand binary - those who do and those who don't",
	"No, I will not fix your computer",
	"Keep talking, I always yawn like this when I'm interested",
	"I'd give my left hand to be ambidextrous",
	"Pizza is God's gift to nerds",
	"My code doesn't have bugs, it just has random unexpected features",
	"If a train station is a place where a train stops, what's a workstation?"
];


function getJoke() {
   return jokes[Math.floor(Math.random() * jokes.length)];
}

function clearAll() { sections.forEach(sectionClear); }

function sectionClear(mySectionName) 
{ 
	var mySection = document.getElementById(mySectionName);
	mySection.style.display = "none"; 
}

function sectionClicked (mySectionName)
{
	// Order is important! Check these use cases: refreshing (F5), clicking menu links, and both when scrolled partway down a long page.
	clearAll();
	window.location = ("" + window.location).replace(/#[A-Za-z0-9_]*$/,'') + "#" + mySectionName;
	var mySection = document.getElementById(mySectionName);
	mySection.style.display = "block";
	document.getElementById("joke").textContent=getJoke();
}

window.onload = function ()
{
	// set up IE hover (whateverhover.js)
	parseStylesheets();

	// prep chess game
	games_chess_reset();

	// final display prep
	startingSectionVerified = false;
	startingSectionName = window.location.hash.substring(1);
	for (var j=0; j< sections.length; j++) 
	{
		if( sections[j] == (startingSectionName) )
		{ 
			startingSectionVerified = true;
			break; 
		}
    	}

	if( startingSectionVerified )
	  { sectionClicked(startingSectionName); }
	else
	  { sectionClicked('Summary'); }
}
