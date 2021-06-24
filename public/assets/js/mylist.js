// mylist.js logic

// needs to render the list from user's List.
// the actual thing we are rendering is the List's "ComicList" array.

// get the comic with a Comic.findOne using the comic id in ComicList.
// COVER || TITLE || ISSUE NUMBER || ISSUE NAME (if exists)

// get the last 2 pieces of data from ComicList
// SCORE(rating) || PROGRESS(read_status?)

// UPDATE button should only work with the ComicList object.
// put a data-id attriute on the button when rendering
// renders a user's list of comics
const renderItems = () => {
  axios.get('/api/users/getID', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({data: userID}) => {
      axios.get(`/api/users/${userID}`)
        .then(({data: userInfo}) => {
          userInfo.list.forEach(comic => {
            let listItem = document.createElement('tr')
            listItem.innerHTML = `
            <td><img class="list-cover" src="${comic.cover_image}" alt="cover"</td>
            <td>${comic.name}</td>
            <td>${comic.issue_number}</td>
            <td>${comic.issue_name}</td>
            <td>${userInfo.comicList.rating} / 10</td>
            <td>${userInfo.comicList.completion_status}</td>
            <td><button class="btn waves-effect edit waves-light blue-grey darken-2 rounded-corners"><i class="far fa-edit"></i></button></td>
          `
            document.getElementById('comicList').append(listItem)
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

renderItems()

// Listeners for edit button
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-trigger')) {
    console.log('hitting this code')
    document.getElementById('modalTitle').innerHTML = event.target.parentElement.parentElement.children[1].innerHTML
    document.getElementById('modalIssueName').innerHTML = event.target.parentElement.parentElement.children[3].innerHTML
    document.getElementById('modalIssueNumber').innerHTML = event.target.parentElement.parentElement.children[2].innerHTML
    document.getElementById('updateFromModal').dataset.id = event.target.dataset.id
  } else if (event.target.classList.contains('my-trigger')) {
    console.log('smacking this code')
    console.log(event.target.parentElement.classList)
    document.getElementById('modalTitle').innerHTML = event.target.parentElement.parentElement.parentElement.children[1].innerHTML
    document.getElementById('modalIssueName').innerHTML = event.target.parentElement.parentElement.parentElement.children[3].innerHTML
    document.getElementById('modalIssueNumber').innerHTML = event.target.parentElement.parentElement.parentElement.children[2].innerHTML
    document.getElementById('updateFromModal').dataset.id = event.target.parentElement.dataset.id
  }
})

// Listener to commit edit to ComicList
document.getElementById('addModalListener').addEventListener('click', event => {
  // basically get the data and make an object
  const comicListId = event.target.dataset.id

  const updatedComicList = {
    rating: document.getElementById('rating').value,
    completion_status: document.getElementById('completion').value
  }

  axios.put(`/comicList/${comicListId}`, )
})
