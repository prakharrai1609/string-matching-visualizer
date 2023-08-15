const sleep = ms => new Promise(r => setTimeout(r, ms));


function rabinKarp(text, pattern) {
  const prime = 101; // A prime number for hashing
  const textLength = text.length;
  const patternLength = pattern.length;

  let matches = [];

  for (let i = 0; i <= textLength - patternLength; i++) {
      let patternHash = 0;
      let textHash = 0;

      for (let j = 0; j < patternLength; j++) {
          patternHash = (patternHash * 256 + pattern.charCodeAt(j)) % prime;
          textHash = (textHash * 256 + text.charCodeAt(i + j)) % prime;
      }

      if (patternHash === textHash) {
          let match = true;
          for (let j = 0; j < patternLength; j++) {
              if (text.charAt(i + j) !== pattern.charAt(j)) {
                  match = false;
                  break;
              }
          }
          if (match) {
              matches.push(i); // Add the index of the match to the list
          }
      }
  }

  return matches;
}

const patternInput = document.getElementById('patternInput');
const textInput = document.getElementById('textInput');
const startButton = document.getElementById('startButton');
const visualizationDiv = document.getElementById('visualization');
const matchPrompt = document.getElementById('matchPrompt');

startButton.addEventListener('click', async () => {
  const pattern = patternInput.value;
  const text = textInput.value;

  // Clear previous visualization and prompts
  visualizationDiv.innerHTML = '';
  matchPrompt.innerText = '';

  const textLength = text.length;
  const patternLength = pattern.length;

  const matchIndices = rabinKarp(text, pattern);

  for (let i = 0; i <= textLength - patternLength; i++) {
      await sleep(500);
      const stepDiv = document.createElement('div');
      const compareText = text.substring(i, i + patternLength);
      if (matchIndices.includes(i)) {
        stepDiv.innerHTML = `
            <p style="background-color: #94ffb0;">Comparing: <span class="highlight">${compareText}</span> <br/> pattern: <span class="highlight">${pattern}</span><hr><p>
        `;
      } else {
        stepDiv.innerHTML = `
            <p>Comparing: <span class="highlight">${compareText}</span> <br/> pattern: <span class="highlight">${pattern}</span><hr><p>
        `;
      }

      visualizationDiv.appendChild(stepDiv);
      visualizationDiv.scrollTop = visualizationDiv.scrollHeight;

      if (matchIndices.includes(i)) {
          matchPrompt.innerHTML += `
          <div class="alert alert-info" role="alert">
            Match found at index ${i}
          </div>
          `;
      }
  }
});
