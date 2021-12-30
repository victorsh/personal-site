
window.onload = function() {
  let bodyContainer = document.getElementById('body-container')
  let newEl = document.createElement('div')
  newEl.setAttribute('class', 'sample')
  newEl.innerHTML = '<h1>sample</h1>'
  // bodyContainer.appendChild(newEl)
  console.log(resumeData)

  Object.keys(resumeData).forEach((item) => {
    console.log(item, resumeData[item])
    Object.keys(resumeData[item]).forEach((_item) => {
      console.log(_item, ':', resumeData[item][_item])
      if (Array.isArray(resumeData[item][_item])) {
        for (let i = 0; i < resumeData[item][_item].length; i++) {
          console.log(resumeData[item][_item][i])
        }
      }
    })
    console.log(' ')
  })
}

function createTitle(setTitle) {
  let title = document.createElement('div')
  title.setAttribute('class', 'title')
  title.innerHTML = setTitle
  return title
}
