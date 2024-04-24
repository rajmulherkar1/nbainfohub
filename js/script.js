document.getElementById('searchButton').addEventListener('click', async () => {
    const teamName = document.getElementById('teamName').value;
    const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${teamName}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8741d243b2msh2e16bd2b06e92e3p130911jsn096dab0742e8',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.response && data.response.length > 0) {
            displayResults(data.response[0]);
            fetchTeamStats(data.response[0].id, '2023'); 
        } else {
            document.getElementById('results').textContent = 'No teams found.';
            document.getElementById('results').classList.add('hidden');
            alert("No teams found.");
        }
    } catch (error) {
        console.error('Error fetching NBA teams:', error);
        document.getElementById('results').textContent = 'Failed to load data';
    }
});

async function fetchTeamStats(teamId, season) {
    const statsUrl = `https://api-nba-v1.p.rapidapi.com/teams/statistics?id=${teamId}&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8741d243b2msh2e16bd2b06e92e3p130911jsn096dab0742e8',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(statsUrl, options);
        const statsData = await response.json();
        if (statsData.response && statsData.response.length > 0) {
            displayStats(statsData.response[0]);
        } else {
            console.log('No stats found for this team');
        }
    } catch (error) {
        console.error('Error fetching NBA team statistics:', error);
    }
}

function displayResults(team) {
    const resultsContainer = document.getElementById('results');
    document.getElementById('teamNameDisplay').textContent = team.name + " (" + team.nickname + ")";
    document.getElementById('teamCity').textContent += team.city;
    document.getElementById('teamCode').textContent += team.code;
    document.getElementById('teamLogo').src = team.logo;
    document.getElementById('teamLogo').alt = `${team.name} Logo`;
    resultsContainer.classList.remove('hidden');
}

function displayStats(stats) {
    document.getElementById('fieldGoals').innerHTML = "Field Goals: " + stats.fgm + '/' + stats.fga +  " = <span>" + stats.fgp + "%</span>";
    document.getElementById('threePointers').innerHTML = "Three Pointers: " + stats.tpm + '/' + stats.tpa + " = <span>" + stats.tpp + "%</span>";
    document.getElementById('freeThrows').innerHTML = "Free Throws: " + stats.ftm + '/' + stats.fta + " = <span>" + stats.ftp + "%</span>";
    document.getElementById('rebounds').innerHTML = "Rebounds: <span>" + stats.totReb + "</span>";
    document.getElementById('assists').innerHTML = "Assists: <span>" + stats.assists + "</span>";
}

