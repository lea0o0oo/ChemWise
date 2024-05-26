import { ref } from "vue";
import { defineStore } from "pinia";

export const useLikesStore = defineStore("likes", () => {
  const likes = ref(0);
  const forks = ref(0);
  const views = ref(0);
  const liked = ref(false);
  function setLikes(newValue: number) {
    likes.value = newValue;
  }
  function like() {
    liked.value = true;
    likes.value++;
  }
  function unlike() {
    liked.value = false;
    likes.value--;
  }
  function setLiked(newValue: boolean) {
    liked.value = newValue;
  }
  function setForks(newValue: number) {
    forks.value = newValue;
  }
  function setViews(newValue: number) {
    views.value = newValue;
  }

  return { likes, liked, setLikes, setLiked, like, unlike, forks };
});
