const allPosts = document.getElementById("all-posts");
const searchPosts = document.getElementById("searchPosts");
const history = document.getElementById("history");
let count = document.getElementById("count").innerText;

// all posts
let posts = async () => {
  const posts = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await posts.json();
  displayPosts(data?.posts);
};
const displayPosts = (data) => {
  data.forEach((item) => {
    const post = `
      <div class="flex gap-6 bg-[#797DFC1A] rounded-3xl p-10  relative">
        <div class="">
            <div class=" relative w-[72px] h-[72px] bg-white flex justify-end">
            <img class=" rounded-xl" src=${item?.image} alt="image">
            <div class=" absolute top-[-5px] right-[-5px] w-[18px] h-[18px] ${
              item?.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"
            }  rounded-full">
            </div>
            </div>
        </div>
        <div class="">
            <div class="flex gap-5 mb-3 font-medium">
            <span># ${item?.category}</span>
            <span>Author : ${item?.author?.name}</span>
            </div>
            <h2 class="font-bold text-xl mb-4">
            ${item?.title}
            </h2>
            <p class="pb-5 text-[#12132D99] border-b-2 border-dashed">
             ${item?.description}
            </p>
            <div class="mt-6">
            <div class="flex justify-between">
                <div class="flex gap-7">
                <div class="flex gap-3">
                    <span>
                    <i class="fa-solid fa-message"></i>
                    </span>
                    <span> ${item?.comment_count} </span>
                </div>
                <div class="flex gap-3">
                    <span>
                    <i class="fa-solid fa-eye"></i>
                    </span>
                    <span> ${item?.view_count} </span>
                </div>
                <div class="flex gap-3">
                    <span>
                    <i class="fa-solid fa-clock"></i>
                    </span>
                    <span> ${item?.posted_time} </span>
                </div>
                </div>
                </div>
            </div>
        </div>
        <button  onclick="addHistory('${item?.title}', '${
      item?.view_count
    }')" class="absolute right-10 bottom-10 btn btn-circle bg-green-600 text-white "><i class="fa-solid fa-envelope-open "></i></button>
        </div>
        `;
    allPosts.innerHTML += post;
  });
};
posts();

// search
const search = async (query) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${query}`
  );
  const data = await res.json();

  if (query) {
    allPosts.innerHTML = "";
    displayPosts(data?.posts);
  }
};
const handleSearchByCategory = () => {
  search(searchPosts.value);
};

let newCount = 1;
// history
const addHistory = (title, viewCount) => {
  document.getElementById("count").innerText = newCount;
  newCount++;

  const text = `
            <div class="p-4 mb-4 flex gap-2.5 bg-white rounded-2xl">
                <div class="flex items-center gap-2">
                    <h2 class="font-semibold text-">
                     ${title}
                    </h2>
                    <div class="flex items-center gap-2">
                    <i class="fa-solid fa-eye"></i>
                    <span> ${viewCount} </span>
                    </div>
                </div>
            </div>`;
  history.innerHTML += text;
};

// Latest Posts
const latestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayLatestPosts(data);
};
const displayLatestPosts = (data) => {
  const card = document.getElementById("card");

  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="p-6 border rounded-3xl h-full">
            <div class="mb-6 ">
              <img class="rounded-3xl" src=${item?.cover_image} alt="image" />
            </div>
            <div class="flex gap-3 text-[#12132D99]">
              <div>
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <p>${
                item?.author?.posted_date
                  ? item?.author?.posted_date
                  : "No publish date"
              }</p>
            </div>
            <h2 class="font-extrabold text-lg mt-4 mb-3">
              ${item?.title}!!!
            </h2>
            <p class="mb-4 text-[#12132D99]">
             ${item?.description}.
            </p>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11">
                <img class="rounded-full" src="${
                  item?.profile_image
                }" alt="profile_image" />
              </div>
              <div>
                <h3 class="font-bold mb-1">${item?.author?.name}</h3>
                <p class="text-[#12132D99]">${
                  item?.author?.designation
                    ? item?.author?.designation
                    : "Unknown"
                }</p>
              </div>
            </div>
          </div>
     `;
    card.appendChild(div);
  });
};
latestPosts();
