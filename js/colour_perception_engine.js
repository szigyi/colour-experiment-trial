
let colourPerceptionImages;
let index = 0
const folder = "images/colour_perception_images/";

function startColourPerception() {
	colourPerceptionImages = shuffle([
        "bar1.jpg",
        "bar10.jpg",
        "bar11.jpg",
        "bar4.jpg",
        "bar9.jpg",
        "bathroom_zoom0_1.jpg",
        "bathroom_zoom0_11.jpg",
        "bathroom_zoom0_14.jpg",
        "bathroom_zoom0_15.jpg",
        "bathroom_zoom0_3.jpg",
        "dining2.jpg",
        "dining_zoom0_11.jpg",
        "dining_zoom0_16.jpg",
        "dining_zoom0_2.jpg",
        "dining_zoom0_4.jpg",
        "kitchen_zoom0_11.jpg",
        "kitchen_zoom0_16.jpg",
        "kitchen_zoom0_17.jpg",
        "kitchen_zoom0_24.jpg",
        "kitchen_zoom0_9.jpg",
        "office_zoom0_11.jpg",
        "office_zoom0_3.jpg",
        "office_zoom0_4.jpg",
        "office_zoom0_7.jpg",
        "office_zoom0_8.jpg",
        "studio1.jpg",
        "studio11.jpg",
        "studio13.jpg",
        "studio5.jpg",
        "studio6.jpg"
	])

	loadNextStimuli()
}

function loadNextStimuli() {
	document.getElementById('red').value = 0
	document.getElementById('green').value = 0
	document.getElementById('blue').value = 0

	const imagePath = nextStimuli()
	loadStimuli(imagePath)
}

function nextStimuli() {
	const imageName = colourPerceptionImages[index]
	const imagePath = folder.concat(imageName)
	index = index + 1
	return imagePath
}

function loadStimuli(imagePath) {
	var container = document.getElementById('image_container')
	const existingImage = document.getElementById('colour_perception_image')
	if (existingImage) existingImage.remove()

	var image = document.createElement('img')
	image.src = imagePath
	image.setAttribute("id", "colour_perception_image")
	image.classList.add('image')

	container.appendChild(image)

	document.getElementById('image-number-tracker').innerHTML = `${index}/${colourPerceptionImages.length}`
}

function submitPerception() {
	const imagePath = document.getElementById('colour_perception_image').src
	const imageOrder = document.getElementById('image-number-tracker').textContent
	const red = document.getElementById('red').value
	const green = document.getElementById('green').value
	const blue = document.getElementById('blue').value

	const id = localStorage.participantId
	localStorage.setItem(`${id}::colour-perception::${imagePath}::${imageOrder}`, `${red}::${green}::${blue}`)

	if (index < colourPerceptionImages.length) {
		loadNextStimuli()
	} else {
		document.getElementById('submit-perception-button').classList.add('disabled')

		if (hasUrlParameterFirst()) {
			document.getElementById('short-term-memory').classList.remove('d-none')
		} else {
			document.getElementById('thank-you').classList.remove('d-none')
		}
	}
}

