const fetch = require('node-fetch');

async function updateCounter(id) {
  try {
    const request = await fetch(`http://${process.env.ADDRESS || 'localhost'}:3001/counter/${id}/incr`, {
      method: 'post',
    });
    const response = await request.json();
    if (response) {
      return response;
    }
    return 0;
  } catch {
    return 0;
  }
}

async function readCounter(id) {
  try {
    const request = await fetch(`http://${process.env.ADDRESS || 'localhost'}:3001/counter/${id}`, {
      method: 'get',
    });
    const response = await request.json();
    if (response) {
      return response;
    }
    return 0;
  } catch {
    return 0;
  }
}

module.exports = {
  updateCounter,
  readCounter,
};
