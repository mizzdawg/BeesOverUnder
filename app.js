// // http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/5 --- ESPN API Endpoint for Teams (adjust ID)

// FLOW
// 1. CALL ESPN API FOR TEAM RECORDS AND PROJECTIONS - DONE
// 2. CALCULATE HOW MANY CORRECT PICKS PERSON ALREADY HAS - DONE
// 3. COMPARE PROJ. WINS TO O/U - ARE PLAYERS PICKS RIGHT OR WRONG - DONE
// 4. CALCULATE PLAYER FINAL PROJ RECORD - DONE

// contestant object containing all picks {team: 'Patriots' pick:'over'}
const contestantsThisYear = [{ 'name': 'Zach Rosenblum', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'under' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Broncos', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }] }, { 'name': 'Benny Bridger', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'under' }, { 'team': 'Jets', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Patriots', 'pick': 'under' }, { 'team': 'Browns', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'under' }] }, { 'name': 'Jarrett Chan', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Jaguars', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'over' }] }, { 'name': 'Matt Lally', 'picks': [{ 'team': 'Lions', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'under' }, { 'team': 'Colts', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'over' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Raiders', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'under' }] }, { 'name': 'Michael Nelson', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Ravens', 'pick': 'under' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Raiders', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Bears', 'pick': 'under' }] }, { 'name': 'Ian Solomon', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'under' }], 'tiebreaker': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Patriots', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }] }, { 'name': 'Jake Borden', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Broncos', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Jaguars', 'pick': 'under' }] }, { 'name': 'George Marshalek', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'over' }] }, { 'name': 'Nicholas Centanni', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'under' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Commanders', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'under' }] }, { 'name': 'Eric Mandell', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Chargers', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }] }, { 'name': 'William Reich', 'picks': [{ 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Bears', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }] }, { 'name': 'Brad Sowsy', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'under' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Panthers', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Giants', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }] }, { 'name': 'Tim Lui', 'picks': [{ 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'under' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Broncos', 'pick': 'under' }, { 'team': 'Jaguars', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }] }, { 'name': 'Mark Colvin', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'under' }, { 'team': 'Browns', 'pick': 'over' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Commanders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Jaguars', 'pick': 'over' }] }, { 'name': 'Kris Chin', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'over' }], 'tiebreaker': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Steelers', 'pick': 'under' }] }, { 'name': 'Mike Bisig', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Dolphins', 'pick': 'under' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Commanders', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'under' }] }, { 'name': 'Killa Cam', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'under' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }] }, { 'name': 'Callahan Carty', 'picks': [{ 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Raiders', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Giants', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'over' }] }, { 'name': 'Danny Tay', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'under' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Bills', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'under' }, { 'team': 'Bears', 'pick': 'under' }] }, { 'name': 'Max Carty', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Raiders', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Jaguars', 'pick': 'under' }] }, { 'name': 'Eugene Montague', 'picks': [{ 'team': 'Chiefs', 'pick': 'under' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'under' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Lions', 'pick': 'under' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Packers', 'pick': 'under' }] }, { 'name': 'Chris Waisnor', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Commanders', 'pick': 'over' }, { 'team': 'Panthers', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Dolphins', 'pick': 'under' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'over' }] }]

// API Calls to Populate teamList Object
// object containing O/Us for each team
const teamList = [{ 'id': 1, 'name': 'Falcons', 'logo': 'images/logos/Atlanta_Falcons.png', overUnder: 9.5 }, { 'id': 2, 'name': 'Bills', 'logo': 'images/logos/Buffalo_Bills.png', overUnder: 10.5 }, { 'id': 3, 'name': 'Bears', 'logo': 'images/logos/Chicago_Bears.png', overUnder: 8.5 }, { 'id': 4, 'name': 'Bengals', 'logo': 'images/logos/Cincinnati_Bengals.png', overUnder: 10.5 }, { 'id': 5, 'name': 'Browns', 'logo': 'images/logos/Cleveland_Browns.png', overUnder: 8.5 }, { 'id': 6, 'name': 'Cowboys', 'logo': 'images/logos/Dallas_Cowboys.png', overUnder: 9.5 }, { 'id': 7, 'name': 'Broncos', 'logo': 'images/logos/Denver_Broncos.png', overUnder: 5.5 }, { 'id': 8, 'name': 'Lions', 'logo': 'images/logos/Detroit_Lions.png', overUnder: 10.5 }, { 'id': 9, 'name': 'Packers', 'logo': 'images/logos/Green_Bay_Packers.png', overUnder: 9.5 }, { 'id': 10, 'name': 'Titans', 'logo': 'images/logos/Tennessee_Titans.png', overUnder: 6.5 }, { 'id': 11, 'name': 'Colts', 'logo': 'images/logos/Indianapolis_Colts.png', overUnder: 8.5 }, { 'id': 12, 'name': 'Chiefs', 'logo': 'images/logos/Kansas_City_Chiefs.png', overUnder: 11.5 }, { 'id': 13, 'name': 'Raiders', 'logo': 'images/logos/Oakland_Raiders.png', overUnder: 6.5 }, { 'id': 14, 'name': 'Rams', 'logo': 'images/logos/Los_Angeles_Rams.png', overUnder: 8.5 }, { 'id': 15, 'name': 'Dolphins', 'logo': 'images/logos/Miami_Dolphins.png', overUnder: 9.5 }, { 'id': 16, 'name': 'Vikings', 'logo': 'images/logos/Minnesota_Vikings.png', overUnder: 7.5 }, { 'id': 17, 'name': 'Patriots', 'logo': 'images/logos/New_England_Patriots.png', overUnder: 4.5 }, { 'id': 18, 'name': 'Saints', 'logo': 'images/logos/New_Orleans_Saints.png', overUnder: 7.5 }, { 'id': 19, 'name': 'Giants', 'logo': 'images/logos/New_York_Giants.png', overUnder: 6.5 }, { 'id': 20, 'name': 'Jets', 'logo': 'images/logos/New_York_Jets.png', overUnder: 9.5 }, { 'id': 21, 'name': 'Eagles', 'logo': 'images/logos/Philadelphia_Eagles.png', overUnder: 10.5 }, { 'id': 22, 'name': 'Cardinals', 'logo': 'images/logos/Arizona_Cardinals.png', overUnder: 7.5 }, { 'id': 23, 'name': 'Steelers', 'logo': 'images/logos/Pittsburgh_Steelers.png', overUnder: 8.5 }, { 'id': 24, 'name': 'Chargers', 'logo': 'images/logos/Los_Angeles_Chargers.png', overUnder: 8.5 }, { 'id': 25, 'name': '49ers', 'logo': 'images/logos/San_Francisco_49ers.png', overUnder: 11.5 }, { 'id': 26, 'name': 'Seahawks', 'logo': 'images/logos/Seattle_Seahawks.png', overUnder: 7.5 }, { 'id': 27, 'name': 'Buccaneers', 'logo': 'images/logos/Tampa_Bay_Buccaneers.png', overUnder: 7.5 }, { 'id': 28, 'name': 'Commanders', 'logo': 'images/logos/Washington_Commanders.png', overUnder: 6.5 }, { 'id': 29, 'name': 'Panthers', 'logo': 'images/logos/Carolina_Panthers.png', overUnder: 5.5 }, { 'id': 30, 'name': 'Jaguars', 'logo': 'images/logos/Jacksonville_Jaguars.png', overUnder: 8.5 }, { 'id': 33, 'name': 'Ravens', 'logo': 'images/logos/Baltimore_Ravens.png', overUnder: 10.5 }, { 'id': 34, 'name': 'Texans', 'logo': 'images/logos/Houston_Texans.png', overUnder: 9.5 }]

// function that calls ESPN API, adds to teamList object
const getTeamData2 = async (teams) => {
    for (const team of teams) {
        const res1 = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/types/2/teams/${team.id}/record`);
        const record = await res1.json();
        const res2 = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/${team.id}/projection`);
        const projection = await res2.json();
        addTeamRecord(team.id, record.items[0].summary, projection.projectedWins);
    }
    return teams;
}

// function that takes API information and adds it to teamList by team index
function addTeamRecord(id, rec, proj) {
    const idx = id <= 32 ? id - 1 : id - 3;
    teamList[idx].record = rec;
    teamList[idx].projectedWins = proj;
}

function comparePicks(teamObj, ouPick) {
    // original comparePicks function
    // if (ouPick === 'over' && teamObj.projectedWins > teamObj.overUnder || ouPick === 'under' && teamObj.projectedWins < teamObj.overUnder) {
    //     return true
    // } else {
    //     return false
    // }

    // new comparePicks function
    if (ouPick === 'over' && teamObj.projectedWins > teamObj.overUnder) {
        let pickDiff = teamObj.projectedWins - teamObj.overUnder;
        return { projectedWinner: "yes", pickDiff: pickDiff };
    } else if (ouPick === 'under' && teamObj.projectedWins < teamObj.overUnder) {
        let pickDiff = teamObj.overUnder - teamObj.projectedWins;
        return { projectedWinner: "yes", pickDiff: pickDiff }
    } else if (ouPick === 'over' && teamObj.projectedWins < teamObj.overUnder) {
        let pickDiff = teamObj.projectedWins - teamObj.overUnder;
        return { projectedWinner: "no", pickDiff: pickDiff };
    } else {
        let pickDiff = teamObj.overUnder - teamObj.projectedWins;
        return { projectedWinner: "no", pickDiff: pickDiff };
    }
};

// REPLACEMEENT FIND LOCKS FUNCTION
function findLocks(teamObj, ouPick) {
    const recordArray = teamObj.record.split('-');
    const currentWins = parseInt(recordArray[0]);
    const currentLosses = parseInt(recordArray[1]);
    const gamesLeft = 17 - currentWins - currentLosses;
    if (ouPick === 'over' && currentWins > teamObj.overUnder || ouPick === 'under' && gamesLeft + currentWins < teamObj.overUnder) {
        return { lockWin: "yes", win: "yes", loss: "no" }
    } else if (ouPick === 'over' && teamObj.overUnder > gamesLeft + currentWins || ouPick === 'under' && currentWins > teamObj.overUnder) {
        return { lockLoss: "yes", win: "no", loss: "yes" }
    } else {
        return { win: "no", loss: "no" }
    }
}

function calcRecord2(user, teams, standings) {
    const userPicks = user.picks;
    let wins = 0;
    let losses = 0;
    let lockWins = 0;


    userPicks.forEach(obj => {
        const teamName = obj.team;
        const ou = obj.pick;
        const teamInfo = teams.find(team => team.name === teamName);

        //new test locks find 
        const res1 = findLocks(teamInfo, ou);
        if (res1.lockWin === "yes") {
            obj.lockWin = "yes";
            lockWins++;
        } else if (res1.lockLoss === "yes") {
            obj.lockLoss = "yes";
        }

        // new compare picks function
        const res2 = comparePicks(teamInfo, ou);
        if (res2.projectedWinner === "yes") {
            wins++;
            obj.pickDiff = res2.pickDiff;
        } else {
            losses++;
            obj.pickDiff = res2.pickDiff;
        }

    })

    const userTieBreaks = user.tiebreaker;
    let tiebreakWins = 0;
    let tiebreakLosses = 0;

    userTieBreaks.forEach(obj => {
        const teamName = obj.team;
        const ou = obj.pick;
        const teamInfo = teamList.find(team => team.name === teamName);

        const result1 = findLocks(teamInfo, ou);
        if (result1.lockWin === "yes") {
            obj.lockWin = "yes";
        } else if (result1.lockLoss === "yes") {
            obj.lockLoss = "yes";
        }

        const result2 = comparePicks(teamInfo, ou);
        if (result2.projectedWinner === "yes") {
            tiebreakWins++;
            obj.pickDiff = result2.pickDiff;
        }
        else {
            tiebreakLosses++;
            obj.pickDiff = result2.pickDiff;
        }
    })

    userPicks.sort((a, b) => {
        if (a.pickDiff !== b.pickDiff) {
            return b.pickDiff - a.pickDiff;
        }
    })

    userTieBreaks.sort((a, b) => {
        if (a.pickDiff !== b.pickDiff) {
            return b.pickDiff - a.pickDiff;
        }
    })

    const userRecord = { entryName: user.name, lockWins: lockWins, wins: wins, losses: losses, tbreakWins: tiebreakWins, tbreakLosses: tiebreakLosses, userPicks: userPicks, userTieBreaks: userTieBreaks };
    standings.push(userRecord);
}

// this function sorts the user data then builds the HTML table
function buildTable(data) {
    data.sort((a, b) => {
        //sort by proj wins first
        if (a.wins !== b.wins) {
            return b.wins - a.wins;
        }
        // if wins are eqaul do this
        return b.tbreakWins - a.tbreakWins;
    })

    const tBodyContainer = document.getElementById('tbody');
    const tBodyFixed = document.getElementById('tbody-fixed');
    const tBodyScroll = document.getElementById('tbody-scroll');
    data.forEach(entry => {
        let entryRow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        td1.classList.add('text-left')
        td1.innerText = entry.entryName;
        td2.innerText = entry.lockWins;
        td3.innerText = `${entry.wins}-${entry.losses}`;
        td4.innerText = `${entry.tbreakWins}-${entry.tbreakLosses}`;
        entryRow.append(td1, td2, td3, td4);
        tBodyContainer.append(entryRow);

        let entryRowFixed = document.createElement('tr');
        let tdFixed = document.createElement('td');
        entryRowFixed.classList.add('table-left-tr', 'table-left-entry');
        tdFixed.classList.add('table-left-td');
        let names = entry.entryName.split(' ');
        tdFixed.innerHTML = `${names[0]} <br> ${names[1]} <br> Proj: ${entry.wins}-${entry.losses}`;
        entryRowFixed.append(tdFixed);
        tBodyFixed.append(entryRowFixed);


        let entryRowScroll = document.createElement('tr');
        entryRowScroll.classList.add('table-scroll-tr');
        entry.userPicks.forEach(pick => {
            let team = teamList.find(team => team.name === pick.team)
            let tdScroll = document.createElement('td');
            let tdScrollDiv = document.createElement('div');
            let pickStatus;
            if (pick.lockWin) {
                pickStatus = `<svg xmlns="http://www.w3.org/2000/svg" width="16"        height="16" fill="#000" class="bi bi-check-lg"
                    viewBox="0 0 16 16">
                <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                </svg>`
            } else if (pick.lockLoss) {
                pickStatus = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>`
            } else {
                pickStatus = `<span>Proj: ${Math.round(team.projectedWins * 10) / 10}</span>`
            }

            if (pick.lockWin) {
                tdScroll.classList.add('cell', 'win');
            } else if (pick.lockLoss) {
                tdScroll.classList.add('cell', 'loss');
            } else if (pick.pickDiff > 2.5) {
                tdScroll.classList.add('cell', 'lg-win');
            } else if (pick.pickDiff > 1) {
                tdScroll.classList.add('cell', 'md-win');
            } else if (pick.pickDiff > 0) {
                tdScroll.classList.add('cell', 'sm-win');
            } else if (pick.pickDiff < -2.5) {
                tdScroll.classList.add('cell', 'lg-loss');
            } else if (pick.pickDiff < -1) {
                tdScroll.classList.add('cell', 'md-loss');
            } else if (pick.pickDiff < 0) {
                tdScroll.classList.add('cell', 'sm-loss');
            }

            tdScrollDiv.innerHTML = `<img src='${team.logo}' alt='${team.name} Logo'/> <span>${pick.pick}<br>${team.overUnder}</span> <br> ${pickStatus}`;
            tdScroll.append(tdScrollDiv);
            entryRowScroll.append(tdScroll);
        })

        entry.userTieBreaks.forEach(pick => {
            let team = teamList.find(team => team.name === pick.team)
            let tdScroll = document.createElement('td');
            let tdScrollDiv = document.createElement('div');
            let pickStatus;
            if (pick.lockWin) {
                pickStatus = `<svg xmlns="http://www.w3.org/2000/svg" width="16"        height="16" fill="#000" class="bi bi-check-lg"
                viewBox="0 0 16 16">
            <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>`
            } else if (pick.lockLoss) {
                pickStatus = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-x-lg"
            viewBox="0 0 16 16">
            <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>`
            } else {
                pickStatus = `<span>Proj: ${Math.round(team.projectedWins * 10) / 10}</span>`
            }

            if (pick.lockWin) {
                tdScroll.classList.add('cell', 'win');
            } else if (pick.lockLoss) {
                tdScroll.classList.add('cell', 'loss');
            } else if (pick.pickDiff > 2.5) {
                tdScroll.classList.add('cell', 'lg-win');
            } else if (pick.pickDiff > 1) {
                tdScroll.classList.add('cell', 'md-win');
            } else if (pick.pickDiff > 0) {
                tdScroll.classList.add('cell', 'sm-win');
            } else if (pick.pickDiff < -2.5) {
                tdScroll.classList.add('cell', 'lg-loss');
            } else if (pick.pickDiff < -1) {
                tdScroll.classList.add('cell', 'md-loss');
            } else if (pick.pickDiff < 0) {
                tdScroll.classList.add('cell', 'sm-loss');
            }

            tdScrollDiv.innerHTML = `<img src='${team.logo}' alt='${team.name} Logo'/> <span>${pick.pick}<br>${team.overUnder}</span> <br> ${pickStatus}`;
            tdScroll.append(tdScrollDiv);
            entryRowScroll.append(tdScroll);
        })

        tBodyScroll.append(entryRowScroll);
    })
}

// Function that

// Loading Panel CSS Class MGMT
const loadPanel = document.querySelector(".load-panel");
function animatePanel(el) {
    el.classList.add('animate-panel');
}

// this code triggers the API call and table build
getTeamData2(teamList)
    .then(teams => {
        const standings = []
        contestantsThisYear.forEach(contestant => calcRecord2(contestant, teams, standings));
        return standings
    })
    .then((standings) => {
        buildTable(standings);
    })
    .then(() => {
        animatePanel(loadPanel);
    });


const tabs = document.querySelectorAll('.tab');
const contentPanels = document.querySelectorAll('.main-content');

tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        manageContent();
        manageTabs();
    })
})

function manageContent() {
    contentPanels.forEach(panel => {
        panel.classList.toggle('content-hide');
    })
}

function manageTabs() {
    tabs.forEach(tab => {
        tab.classList.toggle('tab-active');
    })
}