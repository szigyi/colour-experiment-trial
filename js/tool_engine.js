

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function submitParticipantId() {
	localStorage.clear()
	const participantId = document.getElementById('participant-id').value
	localStorage.setItem('participantId', participantId)
	localStorage.setItem(participantId, new Date(Date.now()).toUTCString())

	if (participantId && participantId !== "") {
		document.getElementById('submit-participant-id-button').classList.add('disabled')
		document.getElementById('form-error').classList.add('d-none')
		selectLinkForWelcomePage()
	} else {
		document.getElementById('form-error').classList.remove('d-none')
	}
}

function selectLinkForWelcomePage() {
	const r = Math.random()
	if (r <= 0.5) {
		document.getElementById('colour-perception').classList.remove('d-none')
	} else {
		document.getElementById('short-term-memory').classList.remove('d-none')
	}
}

function hasUrlParameterFirst() {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const firstParam = urlParams.has('first')
	return firstParam
}

function passThroughUrlParameterFirst() {
	const firstParam = hasUrlParameterFirst()
	if (firstParam) {
		document.getElementById('url-parameter-first').classList.remove('d-none')
	} else {
		document.getElementById('url-parameter-second').classList.remove('d-none')
	}
}

function findTheSourceOfThePage() {
	const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sourceParam = urlParams.get('source')
	if (sourceParam === 'short-term-memory') {
		document.getElementById('colour-perception').classList.remove('d-none')
	} else {
		document.getElementById('short-term-memory').classList.remove('d-none')
	}
}

function saveResultsToFile() {
	const id = localStorage.participantId
	const timestamp = localStorage.getItem(id)
	let csvContent = "data:text/csv;charset=utf-8\r\n,participant-id,experiment-type,image,image-order,red,green,blue\r\n";

	let keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        if (key !== "participantId" && key !== id) {
            const value = localStorage.getItem(key)
            const subInfo = key.split("::")
            const pId = subInfo[0]
            const experimentType = subInfo[1]
            const image = subInfo[2]
            const imageOrder = subInfo[3]
            const rgb = value.split("::")
            const row = `${pId},${experimentType},${image},${imageOrder},${rgb[0]},${rgb[1]},${rgb[2]}`
            csvContent += row + "\r\n";
        }
    }

    const encodedUri = encodeURI(csvContent)
	let link = document.createElement("a")
	link.setAttribute("href", encodedUri)
	link.setAttribute("download", `colour_experiment_${id}_${timestamp}.csv`)
	document.body.appendChild(link)

	link.click()
}
