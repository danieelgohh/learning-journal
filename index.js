import posts from '/posts.js'

const mainContainer = document.getElementById("main-container")
const articleTextContainer = document.getElementById("article-text-container")
const postsSection = document.getElementById("posts")
const heroArticle = document.getElementById("hero-article")
const heroImageMore = document.getElementById("hero-img-more")
const moreDescHero = document.getElementById("hero-desc-more")
const heroDate = document.getElementById("hero-date")
const heroTitle = document.getElementById("hero-title")
const heroDesc = document.getElementById("hero-desc")
let newBgImg = false

const postsHeader = document.createElement("div")

document.addEventListener("click", (e) => {
  if (e.target.parentElement.dataset.id) {
    renderHeroArticle(e.target.parentElement.dataset.id)
  }

  if (e.target.closest("article") === heroArticle) {
    heroArticle.classList.toggle("expand")
    mainContainer.classList.toggle("expand")
    articleTextContainer.classList.toggle("expand")
    heroImageMore.classList.toggle("hide")
    heroImageMore.classList.toggle("expand")
    moreDescHero.classList.toggle("hide")
    heroDate.classList.toggle("expand")
    heroTitle.classList.toggle("expand")
    moreDescHero.classList.toggle("expand")
    // postsHeader.classList.toggle("hide")
    console.log()
    if (newBgImg) {
      changeBgImg(heroImageMore.src.split('/')[heroImageMore.src.split('/').length - 2] + "/" + heroImageMore.src.split('/')[heroImageMore.src.split('/').length - 1]) // Basically src returns the whole domain and the image file e.g. "domain.com/images/image.png" so this splits it into [domain.com, images, image.png] and i take arr[1] + "/" + arr[2] there is alot of simplification to be done though like setting a variable for heroImageMore.src.split('/') -> varX
    }
    
  }

  if (e.target.id === "view-more-btn") {
    renderPosts(Number(e.target.dataset.currentId))
    postsSection.scrollIntoView({ behavior: "smooth" })
  }

  if (e.target.id === "previous-btn") {
    renderPosts(e.target.dataset.currentId - Number(e.target.dataset.currentId) % 6 - 6)
    postsSection.scrollIntoView({ behavior: "smooth" })
  }
})

const renderHeroArticle = (postId) => {
  const selectedPost = posts.filter((post) => (post.id === Number(postId)))
  const {
    image,
    alt,
    date,
    title,
    description
  } = selectedPost[0]

  window.scrollTo(top)

  heroDate.textContent = date
  heroImageMore.src = image
  heroImageMore.alt = alt
  heroTitle.textContent = title
  heroDesc.textContent = description

  heroImageMore.classList.remove("hide")
  moreDescHero.classList.remove("hide")
  postsHeader.classList.remove("hide")

  heroArticle.classList.add("expand")
  mainContainer.classList.add("expand")
  articleTextContainer.classList.add("expand")
  heroImageMore.classList.add("expand")
  heroDate.classList.add("expand")
  heroTitle.classList.add("expand")
  moreDescHero.classList.add("expand")
  heroArticle.style.backgroundImage = ""

  newBgImg = true
  renderPosts(0, postId)
}

const getPosts = (index = 0, chosenId = 0) => {
  const limit = index + 6 > posts.length + 1
    ? index + (index + 6 - posts.length + 1)
    : index + 6
  return posts
  .filter((post) => (post.id != chosenId)).slice(index, limit)
  .map((post) => {
    const {
      id,
      image,
      alt,
      date,
      title,
      description
    } = post

    return `
    <article data-id=${id} class="post">
      <img src="${image}" alt="${alt}" class="post-image">
      <p class="post-date">${date}</p>
      <h2 class="post-title">
        ${title}
      </h2>
      <h3 class="post-desc">
        ${description}
      </h3>
    </article>
    `
  }).join('')
}

const renderPosts = (index = 0, chosenId = 0) => {
  postsSection.innerHTML = getPosts(index, chosenId)
  postsSection.prepend(postsHeader)
  
  if (index + 6 < posts.filter((post) => (post.id != chosenId)).length) {
    const viewMoreBtn = document.createElement("button")
    viewMoreBtn.textContent = "View More"
    viewMoreBtn.classList.add("posts-view-btn")
    viewMoreBtn.setAttribute("id", "view-more-btn")
    viewMoreBtn.dataset.currentId = index + 6
    postsSection.append(viewMoreBtn)
  } else if (index > 2) {
    const previousPostsBtn = document.createElement("button")
    previousPostsBtn.textContent = "Previous"
    previousPostsBtn.classList.add("posts-view-btn")
    previousPostsBtn.setAttribute("id", "previous-btn")
    postsHeader.innerHTML = `
      <button class="posts-view-btn" id="previous-btn" data-current-id="${index}">Previous</button>
    `
    postsHeader.classList.remove("hide")
    postsHeader.classList.remove("more-posts-header")
  }

  if (index === 0) {
    postsHeader.textContent = "Recent posts"
    postsHeader.classList.add("more-posts-header")
    postsHeader.classList.add("hide")
  }
}

const changeBgImg = (image) => {
if (!heroArticle.classList.contains("expand"))
  heroArticle.style.backgroundImage = `url(${image})`
  newBgImg = false
}

renderPosts()