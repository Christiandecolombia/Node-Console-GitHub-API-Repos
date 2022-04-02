import fetch from 'node-fetch';
import prompt from 'prompt';


// get repos
const fetchRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/orgs/ramda/repos')
      .then(response => response.json())
    response.forEach(repo => {
      repos.push(repo.name)
    })
  } catch (error) {
    console.log(error)
  }
}

// get pulls from repos
const fetchPulls = (name) => {
  try {
    const response = fetch(`https://api.github.com/repos/ramda/${name}/pulls`)
      .then(response => response.json())
      .then(data => console.log(data));
  } catch (error) {
    console.log(error)
  }
}

const repos = []
await fetchRepos()

console.log("Input the number of the repo to see it's pull requests")
for (let i = 0; i < repos.length; i++) {
  console.log(i + ". " + repos[i])
}

prompt.start();
prompt.get(['repo'], function (err, result) {
  console.log('Command-line input received:');
  console.log('  repo: ' + result.repo);
  fetchPulls(repos[result.repo])
});
