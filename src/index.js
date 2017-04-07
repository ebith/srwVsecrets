/* eslint-disable no-console */
import './normalize.css';
import './skeleton.css';
import './index.css';

import vue from 'vue';
import secrets from './secrets.js';

const storage = localStorage.getItem('srwVsecrets');
let state = {};
if (storage) {
  state = JSON.parse(storage);
} else {
  for (const secret of secrets) {
    state[secret.secret] = {};
    for (const requirement of secret.requirements) {
      if (Array.isArray(requirement)) {
        for (const v of requirement) {
          state[secret.secret][v] = false;
        }
      } else {
        state[secret.secret][requirement] = false;
      }
      if (secret.points) {
        state[secret.secret].points = 0;
        for (const vv of secret.points) {
          state[secret.secret][vv] = false;
        }
      }
    }
  }
}

window.addEventListener('load', () => {
  new vue({
    el: '#srwVsecrets',
    data: {
      secrets: secrets,
      state: state
    },
    watch: {
      state: {
        handler: () => {
          localStorage.setItem('srwVsecrets', JSON.stringify(state));
        },
        deep: true
      }
    },
    methods: {
      hideOther: () => {
        const searchSection = (element) => {
          if (element.parentNode.tagName == 'SECTION') {
            return element.parentNode;
          } else {
            return searchSection(element.parentNode);
          }
        };
        const checked = document.querySelector('#hideEpisode').checked;
        for (const section of document.querySelectorAll('section')) {
          checked ? section.classList.add('hidden') : section.classList.remove('hidden');
        }
        const episodeNumber = document.querySelector('#episodeNumber').value || '0';
        for (const piece of document.querySelectorAll('.piece')) {
          if (piece.textContent.includes(`${episodeNumber.length < 2 ? '0' + episodeNumber : episodeNumber}話`)) {
            searchSection(piece.parentNode).classList.remove('hidden');
          }
        }
      },
      toggleHidden: (target, event) => {
        for (const element of document.querySelectorAll(target)) {
          event.target.checked ? element.classList.add('hidden') : element.classList.remove('hidden');
        }
      },
      uncheck: (event) => {
        event.target.checked = false;
      },
      checkPoints: (name, event) => {
        const points = /\d/.exec(event.target.name.split(' ').pop())[0] - 0;
        state[name].points += event.target.checked ? points : -points;
      }
    }
  });
});
