
let shortTermMemoryImages;
let index = 0
let pageLoadedTimestamp;
let loadImageTimestamp;
const folder = "images/short_term_memory_images/";

function startShortTermMemory() {
	pageLoadedTimestamp = Date.now()
	loadImageTimestamp = pageLoadedTimestamp + 30000

	shortTermMemoryImages = shuffle([
		"bar10.jpg",
		"bar11.jpg"
	])

	loadNextStimuli()
}

function loadNextStimuli() {
	document.getElementById('short-term-memory-form').classList.add('d-none')
	document.getElementById('red').value = 0
	document.getElementById('green').value = 0
	document.getElementById('blue').value = 0

	const imagePath = nextStimuli()
	loadStimuli(imagePath)

	setTimeout(function () {
		blurStimuli()
		setTimeout(showSlidersOnly, 2000)
	}, 3000)
}

function nextStimuli() {
	const imageName = shortTermMemoryImages[index]
	const imagePath = folder.concat(imageName)
	index = index + 1
	return imagePath
}

function loadStimuli(imagePath) {
	var container = document.getElementById('image_container')
	const existingImage = document.getElementById('short_term_memory_image')
	if (existingImage) existingImage.remove()

	var image = document.createElement('img')
	image.src = imagePath
	image.setAttribute("id", "short_term_memory_image")
	image.classList.add('image')

	container.appendChild(image)

	document.getElementById('image-number-tracker').innerHTML = `${index}/${shortTermMemoryImages.length}`
}

function submitShortTermMemory() {
	const red = document.getElementById('red').value
	const green = document.getElementById('green').value
	const blue = document.getElementById('blue').value

	if (index < shortTermMemoryImages.length) {
		loadNextStimuli()
	} else {
		document.getElementById('submit-short-term-button').remove()

		if (hasUrlParameterFirst()) {
			document.getElementById('colour-perception').classList.remove('d-none')
		} else {
			document.getElementById('thank-you').classList.remove('d-none')
		}

	}
	
}

function blurStimuli() {
	document.getElementById('short_term_memory_image').classList.add('blur')
}

function showSlidersOnly() {
	document.getElementById('short_term_memory_image').classList.add('d-none')
	document.getElementById('short-term-memory-form').classList.remove('d-none')
}