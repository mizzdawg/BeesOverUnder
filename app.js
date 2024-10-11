// // http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/5 --- ESPN API Endpoint for Teams (adjust ID)

// FLOW
// 1. CALL ESPN API FOR TEAM RECORDS AND PROJECTIONS - DONE
// 2. CALCULATE HOW MANY CORRECT PICKS PERSON ALREADY HAS - DONE
// 3. COMPARE PROJ. WINS TO O/U - ARE PLAYERS PICKS RIGHT OR WRONG - DONE
// 4. CALCULATE PLAYER FINAL PROJ RECORD - DONE

const contestantsThisYear = [{ 'name': 'Zach Rosenblum', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'under' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Broncos', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }] }, { 'name': 'Benny Bridger', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'under' }, { 'team': 'Jets', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Patriots', 'pick': 'under' }, { 'team': 'Browns', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'under' }] }, { 'name': 'Jarrett Chan', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Jaguars', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'over' }] }, { 'name': 'Matt Lally', 'picks': [{ 'team': 'Lions', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'under' }, { 'team': 'Colts', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'over' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Raiders', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'under' }] }, { 'name': 'Michael Nelson', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Ravens', 'pick': 'under' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Raiders', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Bears', 'pick': 'under' }] }, { 'name': 'Ian Solomon', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'under' }], 'tiebreaker': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Patriots', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }] }, { 'name': 'Jake Borden', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Broncos', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Jaguars', 'pick': 'under' }] }, { 'name': 'George Marshalek', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'over' }] }, { 'name': 'Nicholas Centanni', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'under' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Commanders', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'under' }] }, { 'name': 'Eric Mandell', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Chargers', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }] }, { 'name': 'William Reich', 'picks': [{ 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Seahawks', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Bears', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }] }, { 'name': 'Brad Sowsy', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'under' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Panthers', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Giants', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }] }, { 'name': 'Tim Lui', 'picks': [{ 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'under' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Broncos', 'pick': 'under' }, { 'team': 'Jaguars', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }] }, { 'name': 'Mark Colvin', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'under' }, { 'team': 'Browns', 'pick': 'over' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Commanders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Jaguars', 'pick': 'over' }] }, { 'name': 'Kris Chin', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Chargers', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'over' }], 'tiebreaker': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Steelers', 'pick': 'under' }] }, { 'name': 'Mike Bisig', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Dolphins', 'pick': 'under' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Commanders', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'under' }] }, { 'name': 'Killa Cam', 'picks': [{ 'team': '49ers', 'pick': 'over' }, { 'team': 'Chiefs', 'pick': 'under' }, { 'team': 'Eagles', 'pick': 'under' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Bills', 'pick': 'over' }, { 'team': 'Bengals', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Dolphins', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }] }, { 'name': 'Callahan Carty', 'picks': [{ 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Raiders', 'pick': 'under' }, { 'team': 'Titans', 'pick': 'under' }, { 'team': 'Panthers', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Giants', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'over' }] }, { 'name': 'Danny Tay', 'picks': [{ 'team': 'Chiefs', 'pick': 'over' }, { 'team': 'Eagles', 'pick': 'over' }, { 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Lions', 'pick': 'under' }, { 'team': 'Bengals', 'pick': 'under' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Browns', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Bills', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'under' }, { 'team': 'Bears', 'pick': 'under' }] }, { 'name': 'Max Carty', 'picks': [{ 'team': 'Ravens', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Bears', 'pick': 'over' }, { 'team': 'Rams', 'pick': 'over' }, { 'team': 'Steelers', 'pick': 'under' }, { 'team': 'Cardinals', 'pick': 'under' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'over' }, { 'team': 'Vikings', 'pick': 'under' }, { 'team': 'Broncos', 'pick': 'over' }], 'tiebreaker': [{ 'team': 'Raiders', 'pick': 'over' }, { 'team': 'Packers', 'pick': 'over' }, { 'team': 'Jaguars', 'pick': 'under' }] }, { 'name': 'Eugene Montague', 'picks': [{ 'team': 'Chiefs', 'pick': 'under' }, { 'team': 'Bills', 'pick': 'under' }, { 'team': 'Cowboys', 'pick': 'under' }, { 'team': 'Jets', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Texans', 'pick': 'over' }, { 'team': 'Buccaneers', 'pick': 'over' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Raiders', 'pick': 'over' }, { 'team': 'Commanders', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Lions', 'pick': 'under' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Packers', 'pick': 'under' }] }, { 'name': 'Chris Waisnor', 'picks': [{ 'team': '49ers', 'pick': 'under' }, { 'team': 'Lions', 'pick': 'over' }, { 'team': 'Cowboys', 'pick': 'over' }, { 'team': 'Falcons', 'pick': 'over' }, { 'team': 'Saints', 'pick': 'under' }, { 'team': 'Giants', 'pick': 'under' }, { 'team': 'Commanders', 'pick': 'over' }, { 'team': 'Panthers', 'pick': 'over' }, { 'team': 'Broncos', 'pick': 'over' }, { 'team': 'Patriots', 'pick': 'under' }], 'tiebreaker': [{ 'team': 'Dolphins', 'pick': 'under' }, { 'team': 'Colts', 'pick': 'under' }, { 'team': 'Chargers', 'pick': 'over' }] }]

// API Calls to Populate teamList Object

const teamList = [{ 'id': 1, 'name': 'Falcons', overUnder: 9.5 }, { 'id': 2, 'name': 'Bills', overUnder: 10.5 }, { 'id': 3, 'name': 'Bears', overUnder: 8.5 }, { 'id': 4, 'name': 'Bengals', overUnder: 10.5 }, { 'id': 5, 'name': 'Browns', overUnder: 8.5 }, { 'id': 6, 'name': 'Cowboys', overUnder: 9.5 }, { 'id': 7, 'name': 'Broncos', overUnder: 5.5 }, { 'id': 8, 'name': 'Lions', overUnder: 10.5 }, { 'id': 9, 'name': 'Packers', overUnder: 9.5 }, { 'id': 10, 'name': 'Titans', overUnder: 6.5 }, { 'id': 11, 'name': 'Colts', overUnder: 8.5 }, { 'id': 12, 'name': 'Chiefs', overUnder: 11.5 }, { 'id': 13, 'name': 'Raiders', overUnder: 6.5 }, { 'id': 14, 'name': 'Rams', overUnder: 8.5 }, { 'id': 15, 'name': 'Dolphins', overUnder: 9.5 }, { 'id': 16, 'name': 'Vikings', overUnder: 7.5 }, { 'id': 17, 'name': 'Patriots', overUnder: 4.5 }, { 'id': 18, 'name': 'Saints', overUnder: 7.5 }, { 'id': 19, 'name': 'Giants', overUnder: 6.5 }, { 'id': 20, 'name': 'Jets', overUnder: 9.5 }, { 'id': 21, 'name': 'Eagles', overUnder: 10.5 }, { 'id': 22, 'name': 'Cardinals', overUnder: 7.5 }, { 'id': 23, 'name': 'Steelers', overUnder: 8.5 }, { 'id': 24, 'name': 'Chargers', overUnder: 8.5 }, { 'id': 25, 'name': '49ers', overUnder: 11.5 }, { 'id': 26, 'name': 'Seahawks', overUnder: 7.5 }, { 'id': 27, 'name': 'Buccaneers', overUnder: 7.5 }, { 'id': 28, 'name': 'Commanders', overUnder: 6.5 }, { 'id': 29, 'name': 'Panthers', overUnder: 5.5 }, { 'id': 30, 'name': 'Jaguars', overUnder: 8.5 }, { 'id': 33, 'name': 'Ravens', overUnder: 10.5 }, { 'id': 34, 'name': 'Texans', overUnder: 9.5 }]

function addTeamRecord(id, rec, proj) {
    const idx = id <= 32 ? id - 1 : id - 3;
    teamList[idx].record = rec;
    teamList[idx].projectedWins = proj;
}

function comparePicks(teamObj, ouPick) {
    if (ouPick === 'over' && teamObj.projectedWins > teamObj.overUnder || ouPick === 'under' && teamObj.projectedWins < teamObj.overUnder) {
        return true
    } else {
        return false
    }
};

function findLocks(teamObj, ouPick) {
    const recordArray = teamObj.record.split('-');
    const currentWins = parseInt(recordArray[0]);
    const currentLosses = parseInt(recordArray[1]);
    const gamesLeft = 17 - currentWins - currentLosses;
    if (ouPick === 'over' && currentWins > teamObj.overUnder || ouPick === 'under' && gamesLeft + currentWins < teamObj.overUnder) {
        return true;
    } else {
        return false;
    }
}

function buildTable(data) {
    data.sort((a, b) => {
        //sort by proj wins first
        if (a.wins !== b.wins) {
            return b.wins - a.wins;
        }
        // if wins are eqaul do this
        return b.tbreakWins - a.tbreakWins;
    })
    const tableContainer = document.getElementById('data-table-container');
    const tableHeaders = ['Entry Name', 'Locks', 'Proj. W/L', 'Proj. Tiebreak W/L'];
    let table = document.createElement('table');
    let tHeaderContainer = document.createElement('thead');
    let tHeaderRow = document.createElement('tr');
    tHeaderContainer.append(tHeaderRow);
    table.append(tHeaderContainer);
    tableHeaders.forEach(header => {
        let th = document.createElement('th');
        th.innerText = header;
        tHeaderRow.append(th);
    });
    let tBodyContainer = document.createElement('tbody');
    table.append(tBodyContainer);
    data.forEach(entry => {
        let entryRow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        td1.classList.add('text-left')
        td1.innerText = entry.entryName;
        td2.innerText = entry.locks;
        td3.innerText = `${entry.wins}-${entry.losses}`;
        td4.innerText = `${entry.tbreakWins}-${entry.tbreakLosses}`;
        entryRow.append(td1, td2, td3, td4);
        tBodyContainer.append(entryRow);
    })
    tableContainer.append(table);
}

const getTeamData2 = async (teams) => {
    for (const team of teams) {
        const res1 = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/types/2/teams/${team.id}/record`);
        const record = await res1.json();
        const res2 = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/${team.id}/projection`);
        const projection = await res2.json();
        addTeamRecord(team.id, record.items[0].summary, projection.projectedWins);
    }
    console.log(teams)
    return teams;
}

function calcRecord2(user, teams, standings) {
    const userPicks = user.picks;
    let wins = 0;
    let losses = 0;
    let locks = 0;


    userPicks.forEach(obj => {
        const teamName = obj.team;
        const ou = obj.pick;
        const teamInfo = teams.find(team => team.name === teamName);
        const res1 = findLocks(teamInfo, ou);
        if (res1) { locks++ };
        const res2 = comparePicks(teamInfo, ou);
        res2 ? wins++ : losses++;
    })

    const userTieBreaks = user.tiebreaker;
    let tiebreakWins = 0;
    let tiebreakLosses = 0;

    userTieBreaks.forEach(obj => {
        const teamName = obj.team;
        const ou = obj.pick;
        const teamInfo = teamList.find(team => team.name === teamName);
        const result = comparePicks(teamInfo, ou);
        result ? tiebreakWins++ : tiebreakLosses++;
    })

    const userRecord = { entryName: user.name, locks: locks, wins: wins, losses: losses, tbreakWins: tiebreakWins, tbreakLosses: tiebreakLosses };
    standings.push(userRecord);
}

getTeamData2(teamList)
    .then(teams => {
        const standings = []
        contestantsThisYear.forEach(contestant => calcRecord2(contestant, teams, standings));
        console.log(standings)
        return standings
    })
    .then((standings) => {
        buildTable(standings);
    });