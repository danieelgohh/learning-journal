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
  morePostsHeader.classList.remove("hide")

  heroArticle.classList.add("expand")
  mainContainer.classList.add("expand")
  articleTextContainer.classList.add("expand")
  heroImageMore.classList.add("expand")
  heroDate.classList.add("expand")
  heroTitle.classList.add("expand")
  moreDescHero.classList.add("expand")
}


const morePostsHeader = document.createElement("p")
morePostsHeader.textContent = "Recent posts"
morePostsHeader.classList.add("more-posts-header")
morePostsHeader.classList.add("hide")

document.addEventListener("click", (e) => {
  if (e.target.parentElement.dataset.id) {
    console.log(e.target.parentElement)
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
    morePostsHeader.classList.toggle("hide")
  }
})

const renderPosts = () => {
  return posts.map((post) => {
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
postsSection.innerHTML = renderPosts()
postsSection.prepend(morePostsHeader)