function populateTeam() {
    const team = document.getElementById("team");

    fetch('about_us.json')
        .then(response => response.json())
        .then(data => {
            data.our_team.forEach(member => {
                const memberDiv = document.createElement("div");
                memberDiv.className = "member";
                memberDiv.style.color = "white";
                memberDiv.style.padding = "10px";
                memberDiv.style.margin = "10px";
                memberDiv.innerHTML = `<p"><strong>${member.name}</strong></p><p style="background-color:purple;border-radius: 10px;" align="center">${member.role}</p><p>${member.bio}</p>`;
                team.appendChild(memberDiv);
            });
        });
}

populateTeam();
