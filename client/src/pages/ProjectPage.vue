<script setup lang="ts">
import LikeBtn from "../components/ProjectPage/LikeBtn.vue";
import ForkBtn from "../components/ProjectPage/ForkBtn.vue";
import CommentBoxInput from "../components/ProjectPage/CommentBoxInput.vue";
import CommentsRenderer from "../components/ProjectPage/CommentsRenderer.vue";
import SlideshowRenderer from "../components/slideshowRenders/ProductionRenderer.vue";
import AvatarMaker from "../components/AvatarMaker.vue";

import axios from "axios";
import { AxiosRequestConfig } from "axios";
import utils from "../helpers/utils";
import { useRoute } from "vue-router";
import { useLikesStore } from "../stores/ProjectPageStore"; // It's my first time using stores lol
import { reactive, ref } from "vue";
import { eventBus } from "../event-bus";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const store = useLikesStore();
const route = useRoute();
let currentPage = 1;
let maxPages = 1;
const isLogged = localStorage.getItem("token") ? true : false;
let likesCounter = 0;
const loadedProject = ref(false);
const renderAvatar = ref(false);
const avatarElem = ref(null);

// for slideshows
let renderRenderer = ref(false);

interface ProjectInfo {
  name: string;
  description: string;
  type: string;
  engine: string;
  createdAt: string;
  lastUpdate: string;
  owner: {
    _id: string;
    username: string;
    avatarUrl: string;
  };
  forked: boolean;
  public: boolean;
  embedUrl: string;
  liked: boolean;
  likes: number;
  thumbnail: string;
  slides: Array<any>;
}
let projectInfo: ProjectInfo;

interface Comment {
  author: {
    _id: string;
    username: string;
    avatarUrl: string;
  };
  content: string;
  _id: string;
  replies: number;
  isReply: boolean;
  replyTo: string;
  projectId: string;
  createdAt: string;
  __v: number;
}

let comments: Comment[] = reactive([]);

function like() {
  if (!localStorage.getItem("token")) return;
  if (!store.liked) {
    store.like();
    axios
      .post(
        `/like/${route.params.projectId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .catch((err) => {
        store.unlike;
      });
  } else {
    store.unlike();
    axios
      .post(
        `/unlike/${route.params.projectId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .catch((err) => {
        store.like();
      });
  }
}

let isProjectOwner = false;

async function renderComments(fetchAgain: boolean) {
  comments.splice(0, comments.length);
  document.getElementById("commentsContainer").classList.add("hidden");
  document.getElementById("commentsLoader").classList.remove("hidden");
  let includeToken =
    JSON.parse(localStorage.getItem("userData"))?.id == projectInfo.owner._id
      ? true
      : false;
  if (fetchAgain) {
    const response = await axios.get(
      `/comments/${route.params.projectId}`,
      includeToken
        ? {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        : {}
    );
    response.data.docs.forEach((doc: Comment) => {
      comments.push(doc);
    });
    isProjectOwner = response.data.isProjectOwner;
    maxPages = response.data.totalPages;
    if (maxPages === 1)
      document.getElementById("loadmoreBtn").classList.add("hidden");
  } else {
  }
  if (comments.length > 0)
    document.getElementById("emptyComments").classList.add("hidden");
  document.getElementById("commentsContainer").classList.remove("hidden");
  document.getElementById("commentsLoader").classList.add("hidden");
}

async function loadMore() {
  document.getElementById("loadmoreBtn").classList.add("is-loading");
  currentPage++;
  const response = await axios.get(
    `/comments/${route.params.projectId}/?page=${currentPage}`
  );
  response.data.docs.forEach((doc: Comment) => {
    comments.push(doc);
  });
  if (currentPage === maxPages) {
    document.getElementById("loadmoreBtn").classList.add("hidden");
  }
  document.getElementById("loadmoreBtn").classList.remove("is-loading");
}

utils.onLoad(async () => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  projectInfo = (
    await axios.get(
      `/view/${route.params.projectId}`,
      localStorage.getItem("token") ? options : {}
    )
  ).data.data;
  document.getElementById("projectName").innerText = projectInfo.name;
  document.getElementById("projectAuthor").innerText =
    projectInfo.owner.username;
  if (projectInfo.owner.avatarUrl)
    avatarElem.value.src = projectInfo.owner.avatarUrl;
  renderAvatar.value = true;
  loadedProject.value = true;
  if (projectInfo.type == "slideshow")
    document.getElementById("proj-reload").classList.add("hidden");

  if (projectInfo.description != "" && DOMPurify.isSupported) {
    const parsedDescription = await marked.parse(projectInfo.description);
    console.log(parsedDescription);

    document.getElementById("projectDesc").innerHTML = DOMPurify.sanitize(
      parsedDescription,
      { USE_PROFILES: { html: true }, FORBID_TAGS: ["style", "img"] }
    );
  }

  if (localStorage.getItem("token") && !projectInfo.public)
    projectInfo.embedUrl += `/${localStorage.getItem("token")}`;

  if (
    !projectInfo.public &&
    projectInfo.owner._id === JSON.parse(localStorage.getItem("userData"))?.id
  ) {
    document.getElementById("publishBTN").classList.remove("hidden");
  } else if (
    projectInfo.owner._id === JSON.parse(localStorage.getItem("userData"))?.id
  ) {
    document.getElementById("updateBTN").classList.remove("hidden");
    document.getElementById("retireBTN").classList.remove("hidden");
    document.getElementById("set-thumbnail-btn").classList.remove("hidden");
  }
  if (projectInfo.thumbnail != null && projectInfo.thumbnail != "")
    (document.getElementById("thumbnailIMG") as HTMLImageElement).src =
      projectInfo.thumbnail;
  store.setLikes(projectInfo.likes);
  store.setLiked(projectInfo.liked);

  document.getElementById("mainDiv").classList.remove("hidden");
  document.getElementById("mainDiv").classList.add("flex");
  document.getElementById("loader").classList.add("hidden");
  console.log(projectInfo);

  await renderComments(true);
});

function loadProject() {
  if (projectInfo.type == "code") {
    (document.getElementById("project-player") as HTMLIFrameElement).src =
      projectInfo.embedUrl;
    document.getElementById("cover").classList.add("hidden");
    document.getElementById("project-player").classList.remove("hidden");
  } else if (projectInfo.type == "slideshow") {
    renderRenderer.value = true;
    document.getElementById("cover").classList.add("hidden");

    document.addEventListener("keydown", (event) => {
      if (event.key == "ArrowRight") document.getElementById("nextBTN").click();
      else if (event.key == "ArrowLeft")
        document.getElementById("prevBTN").click();
    });
  }
}

eventBus.addEventListener("rerenderComments", async () => {
  renderComments(true);
});

function reloadIframe() {
  const iframeView = document.getElementById(
    "project-player"
  ) as HTMLIFrameElement;
  iframeView.src = "/loading.html";
  iframeView.src = projectInfo.embedUrl;
}

function openFullscreen() {
  document.getElementById("playerDIV").requestFullscreen();
  //reloadIframe();
}

async function publish(action: string) {
  document.getElementById("publishBTN").classList.add("is-loading");
  if (action != "publish")
    document.getElementById("retireBTN").classList.add("is-loading");
  if (action != "unpublish")
    document.getElementById("updateBTN").classList.add("is-loading");
  try {
    await axios.post(
      `/${action}/${route.params.projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    utils.notyf("Successo", "success");
    window.location.reload();
  } catch (err) {
    utils.notyf(err.response.data.error || "Errore", "error");
    document.getElementById("publishBTN").classList.remove("is-loading");
    document.getElementById("retireBTN").classList.remove("is-loading");
    document.getElementById("updateBTN").classList.remove("is-loading");
  }
}

function triggerModify() {
  if (projectInfo.owner._id != JSON.parse(localStorage.getItem("userData"))?.id)
    return;
  document.getElementById("projectDesc").classList.add("hidden");
  (document.getElementById("textareaModify") as HTMLInputElement).value =
    projectInfo.description;
  document.getElementById("textareaModify").classList.remove("hidden");
  (document.getElementById("textareaModify") as HTMLInputElement).focus();
}

async function modifyDesc() {
  document.getElementById("projectDesc").classList.remove("hidden");
  document.getElementById("textareaModify").classList.add("hidden");
  if (
    (document.getElementById("textareaModify") as HTMLInputElement).value ==
    projectInfo.description
  )
    return;
  projectInfo.description = (
    document.getElementById("textareaModify") as HTMLInputElement
  ).value;

  const parsedDescription = await marked.parse(projectInfo.description);
  document.getElementById("projectDesc").innerHTML = DOMPurify.sanitize(
    parsedDescription,
    { USE_PROFILES: { html: true }, FORBID_TAGS: ["style", "img"] }
  );
  axios
    .post(
      `/projectInfo/${route.params.projectId}`,
      { description: projectInfo.description },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then(() => {
      utils.notyf("Descrizione cambiata", "success");
    })
    .catch((err: object) => {
      console.error(err);
      //@ts-ignore
      utils.notyf(err?.response?.data?.error || "Errore", "error");
    });
}

function setThumbnail() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/jpeg, image/png, image/webp"; // Accept non-animated image files

  input.onchange = () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;
      if (
        !input.value.endsWith("jpeg") &&
        !input.value.endsWith("png") &&
        !input.value.endsWith("webp") &&
        !input.value.endsWith("jpg")
      ) {
        return utils.notyf("Formato non supportato", "error");
      }
      input.remove();
      document.getElementById("set-thumbnail-btn").classList.add("is-loading");
      let extension;
      if (input.value.split(".")[input.value.split(".").length - 1] == "jpg")
        extension = "jpeg";
      else
        extension = input.value.split(".")[input.value.split(".").length - 1];
      axios
        .post(
          `/thumbnail/${route.params.projectId}`,
          {
            image:
              typeof base64Image === "string"
                ? base64Image.replace(`data:image/${extension};base64,`, "")
                : base64Image,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          utils.notyf("Thumbnail cambiata", "success");
        })
        .catch((err) => {
          console.error(err);
          if (String(err) == "AxiosError: Network Error") {
            utils.notyf("Immagine troppo grande", "error");
          } else {
            utils.notyf(err.response?.data?.error || "Errore", "error");
          }
        })
        .finally(() => {
          document
            .getElementById("set-thumbnail-btn")
            .classList.remove("is-loading");
        });
    };

    reader.readAsDataURL(file);
  };

  input.click();
}
</script>

<template>
  <div
    id="loader"
    class="w-full h-[calc(100vh-70px)] flex justify-center items-center dark:bg-neutral-800"
  >
    <div class="loader bw">
      <div class="bar-bounce" />
    </div>
  </div>
  <div
    id="mainDiv"
    class="w-full min-h-[calc(100vh-70px)] justify-center mt-3 hidden dark:bg-neutral-800 p-2"
  >
    <div>
      <div
        class="dark:bg-neutral-900 bg-neutral-200 min-h-[60px] w-full rounded-xl flex items-center lg:flex-nowrap flex-wrap"
      >
        <div class="flex items-center lg:w-full">
          <img
            class="ml-3"
            ref="avatarElem"
            style="object-fit: cover; height: 42px; width: 42px"
          />

          <div class="ml-2 lg:w-full">
            <h2 class="font-bold text-xl lg:w-full" id="projectName">
              Project name
            </h2>
            <p id="projectAuthor">Author</p>
          </div>
        </div>

        <div
          style="display: flex; align-items: center; justify-content: right"
          class="lg:flex-nowrap md:flex-nowrap flex-wrap gap-1 lg:w-full lg:ml-0 ml-10"
        >
          <button
            class="btn solid info mr-3 hidden"
            id="publishBTN"
            @click="publish('publish')"
          >
            Pubblica
          </button>
          <button
            class="btn solid info mr-3 hidden"
            @click="setThumbnail()"
            id="set-thumbnail-btn"
          >
            Imposta thumbnail
          </button>
          <button
            class="btn solid danger mr-3 hidden"
            id="retireBTN"
            @click="publish('unpublish')"
          >
            Ritira
          </button>
          <button
            class="btn solid warn mr-3 hidden"
            id="updateBTN"
            @click="publish('publish')"
          >
            Aggiorna
          </button>
        </div>
      </div>
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-3">
        <div class="w-full">
          <div
            class="relative rounded-xl lg:w-full max-w-[551.22px] h-[calc((100vh_-_70px)_/_2)] w-[calc(100%)] min-h-[433px]"
            id="playerDIV"
          >
            <div class="relative w-full h-full" id="cover">
              <button class="w-full h-full" @click="loadProject()">
                <img
                  src="/no_thumbnail.png"
                  class="w-full h-full opacity-40 object-cover"
                  id="thumbnailIMG"
                />
                <div
                  class="absolute top-0 left-0 rounded-full w-full h-full flex justify-center items-center"
                >
                  <div
                    class="dark:bg-black bg-white rounded-full opacity-75 flex justify-center items-center"
                    style="height: 100px; width: 100px"
                  >
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="ml-1"
                    >
                      <path
                        d="M18.54 9 8.88 3.46a3.42 3.42 0 0 0-5.13 3v11.12A3.42 3.42 0 0 0 7.17 21a3.43 3.43 0 0 0 1.71-.46L18.54 15a3.42 3.42 0 0 0 0-5.92Zm-1 4.19-9.66 5.62a1.44 1.44 0 0 1-1.42 0 1.42 1.42 0 0 1-.71-1.23V6.42a1.42 1.42 0 0 1 .71-1.23A1.5 1.5 0 0 1 7.17 5a1.54 1.54 0 0 1 .71.19l9.66 5.58a1.42 1.42 0 0 1 0 2.46Z"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            <iframe
              class="w-full h-full rounded-xl hidden"
              src="/loading.html"
              id="project-player"
              sandbox="allow-scripts"
            />
            <SlideshowRenderer
              class="rounded-xl w-full h-full"
              v-if="renderRenderer"
              :slides="projectInfo.slides"
            />
          </div>

          <div
            class="dark:bg-neutral-900 bg-neutral-200 rounded-xl min-h-[60px] mt-3 flex items-center p-2"
          >
            <div
              class="w-full flex items-center lg:flex-nowrap flex-wrap gap-1"
            >
              <LikeBtn
                :count="likesCounter"
                :liked="store.liked"
                @click="like()"
              />
              <!-- <ForkBtn /> -->
              <div class="flex items-center hidden">
                <svg
                  height="35"
                  width="35"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  xml:space="preserve"
                  fill="currentColor"
                  class="opacity-65 ml-2"
                >
                  <path
                    d="M12 21C7 21 3.2 18.2.2 12.5L0 12l.2-.5C3.2 5.8 7 3 12 3s8.8 2.8 11.8 8.5l.2.5-.2.5C20.8 18.2 17 21 12 21m-9.7-9c2.5 4.7 5.7 7 9.7 7s7.2-2.3 9.7-7C19.2 7.3 16 5 12 5s-7.2 2.3-9.7 7"
                  />
                  <path
                    d="M12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5m0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3"
                  />
                </svg>
                <p class="ml-2 font-bold text-lg opacity-65" id="viewsCounter">
                  0
                </p>
              </div>
            </div>
            <div class="mr-1 flex items-center">
              <button
                class="hover:opacity-30"
                @click="reloadIframe()"
                id="proj-reload"
              >
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  class="opacity-65 ml-2 mr-2"
                >
                  <path
                    fill="currentColor"
                    d="M7.248 1.307A.75.75 0 1 1 8.252.193l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 0 1-1.004-1.114l1.29-1.161a4.5 4.5 0 1 0 3.655 2.832.75.75 0 1 1 1.398-.546A6 6 0 1 1 8.018 2z"
                  />
                </svg>
              </button>
              <button class="ml-2 hover:opacity-30" @click="openFullscreen()">
                <svg
                  fill="currentColor"
                  class="opacity-65"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m3 15 .117.007a1 1 0 0 1 .876.876L4 16v4h4l.117.007a1 1 0 0 1 0 1.986L8 22H3l-.117-.007a1 1 0 0 1-.876-.876L2 21v-5l.007-.117a1 1 0 0 1 .876-.876zm18 0a1 1 0 0 1 .993.883L22 16v5a1 1 0 0 1-.883.993L21 22h-5a1 1 0 0 1-.117-1.993L16 20h4v-4a1 1 0 0 1 .883-.993zM8 2a1 1 0 0 1 .117 1.993L8 4H4v4a1 1 0 0 1-.883.993L3 9a1 1 0 0 1-.993-.883L2 8V3a1 1 0 0 1 .883-.993L3 2zm13 0 .117.007a1 1 0 0 1 .876.876L22 3v5l-.007.117a1 1 0 0 1-.876.876L21 9l-.117-.007a1 1 0 0 1-.876-.876L20 8V4h-4l-.117-.007a1 1 0 0 1 0-1.986L16 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          class="dark:bg-neutral-900 bg-neutral-200 rounded-xl lg:w-full min-h-[433px] hover:cursor-text w-full"
          style="height: 100%"
          id="projDescDIV"
        >
          <article
            class="m-3 h-full w-full prose dark:prose-invert"
            @click="triggerModify()"
            id="projectDesc"
            style="
              word-wrap: break-word;
              overflow-wrap: break-word;
              white-space: pre-wrap;
              overflow-y: auto;
              max-height: calc((100vh + 20px) / 2);
            "
          >
            [Clicca per cambiare la descrizione]
          </article>
          <textarea
            style="
              height: calc(100% - 0.75rem * 2);
              background: transparent;
              border: none;
              outline: none;
            "
            class="w-full resize-none rounded-xl m-3 hidden w-full"
            id="textareaModify"
            @blur="modifyDesc()"
          >
[Clicca per cambiare la descrizione]</textarea
          >
        </div>
        <div
          class="lg:col-span-2 rounded-xl dark:bg-neutral-900 bg-neutral-200 mb-5"
        >
          <h3 class="text-3xl text-center font-bold mt-5">Commenti</h3>
          <div id="commentsLoader" class="m-5 mt-10 flex w-full justify-center">
            <div class="loader bw">
              <div class="bar-bounce" />
            </div>
          </div>
          <div class="m-3 hidden" id="commentsContainer">
            <CommentBoxInput
              v-if="isLogged && loadedProject"
              :avatar="projectInfo.owner.avatarUrl"
            />
            <div
              style="height: 2px"
              class="dark:bg-neutral-700 bg-neutral-400 m-3"
            />
            <p class="text-center m-2" id="emptyComments">
              Wow, così vuoto qui 😯 *suono di grilli*
            </p>
            <CommentsRenderer
              v-for="i in comments"
              :username="i.author.username"
              :avatar="i.author.avatarUrl"
              :userId="i.author._id"
              :comment="i.content"
              :totalReplies="i.replies"
              :id="i._id"
              :isProjectOwner="isProjectOwner"
            />
            <div class="flex w-full items-center justify-center mt-3">
              <button
                class="btn solid info outline"
                id="loadmoreBtn"
                @click="loadMore()"
              >
                Carica altri
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
