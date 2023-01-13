
let shortTermMemoryImages;
let index = 0
const folder = "images/short_term_memory_images/";

function startShortTermMemory() {

	shortTermMemoryImages = shuffle([
        "bar12.jpg",
        "bar2.jpg",
        "bar3.jpg",
        "bar6.jpg",
        "bar8.jpg",
        "bathroom_zoom0_10.jpg",
        "bathroom_zoom0_13.jpg",
        "bathroom_zoom0_2.jpg",
        "bathroom_zoom0_6.jpg",
        "bathroom_zoom0_7.jpg",
        "dining1.jpg",
        "dining_zoom0_1.jpg",
        "dining_zoom0_18.jpg",
        "dining_zoom0_3.jpg",
        "dining_zoom0_9.jpg",
        "kitchen_zoom0_15.jpg",
        "kitchen_zoom0_19.jpg",
        "kitchen_zoom0_20.jpg",
        "kitchen_zoom0_22.jpg",
        "kitchen_zoom0_26.jpg",
        "office_zoom0_1.jpg",
        "office_zoom0_10.jpg",
        "office_zoom0_2.jpg",
        "office_zoom0_5.jpg",
        "office_zoom0_9.jpg",
        "studio12.jpg",
        "studio3.jpg",
        "studio4.jpg",
        "studio7.jpg",
        "studio8.jpg"
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
	const imagePath = document.getElementById('short_term_memory_image').src
	const imageOrder = document.getElementById('image-number-tracker').textContent
	const red = document.getElementById('red').value
	const green = document.getElementById('green').value
	const blue = document.getElementById('blue').value

	const id = localStorage.participantId
	localStorage.setItem(`${id}::short-term-memory::${imagePath}::${imageOrder}`, `${red}::${green}::${blue}`)

	if (index < shortTermMemoryImages.length) {
		loadNextStimuli()
	} else {
		document.getElementById('submit-short-term-button').classList.add('disabled')

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

