var sections = 
[
	"Summary",
	"NoTrump",
	"NoHillary",
	"WhyMe",
	"HowToVote",
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
	"Joser",
	"Contact",
	"Games"
]


function sectionClear(mySectionName) 
{ 
	var mySection = document.getElementById(mySectionName);
	mySection.style.display = "none"; 
}


function clearAll() { sections.forEach(sectionClear); }


function sectionClicked (mySectionName)
{
	// Order is important! Check these use cases: refreshing (F5), clicking menu links, and both when scrolled partway down a long page.
	clearAll();
	window.location = ("" + window.location).replace(/#[A-Za-z0-9_]*$/,'') + "#" + mySectionName;
	var mySection = document.getElementById(mySectionName);
	mySection.style.display = "block";
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
