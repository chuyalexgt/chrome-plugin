/* global chrome */

document.addEventListener('click', (event: Event) => {
  console.log(event)
  const { target } = event
  if (target instanceof HTMLElement) {
    const classes = target!.className
    const id = target!.id
    // Enviar las clases y/o ID al archivo popup.js
    chrome.runtime.sendMessage({
      action: 'element-selected',
      classes,
      id,
    })
  }
})
