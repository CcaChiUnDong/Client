import { ref, onMounted, reactive } from "vue";
import config from "@/apiKey";

export const useYoutubeStore = () => {
  const apiKey = config.apiKey;

  const state = reactive({
    top3Videos: [],
  });

  // YouTube Video ID인지 확인하는 함수
  const isYouTubeVideoId = (input) => /^[a-zA-Z0-9_-]{11}$/.test(input);

  const fetchTop3Videos = async (videoIds) => {
    const promises = videoIds.map(async (videoIdOrUrl) => {
      try {
        const videoId = isYouTubeVideoId(videoIdOrUrl)
          ? videoIdOrUrl
          : extractYouTubeVideoId(videoIdOrUrl);

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0 && data.items[0].snippet) {
          const videoInfo = data.items[0].snippet;
          return {
            id: videoId,
            title: videoInfo.title,
            description: videoInfo.description,
            thumbnail: videoInfo.thumbnails.default.url,
          };
        } else {
          console.error(`Invalid response data for video ID: ${videoId}`);
          return null;
        }
      } catch (error) {
        console.error(
          `Error fetching video data for video ID: ${videoIdOrUrl}`,
          error
        );
        return null;
      }
    });

    state.top3Videos = (await Promise.all(promises)).filter(
      (video) => video !== null
    );
  };

  // YouTube Video URL에서 Video ID를 추출하는 함수
  const extractYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const fetchVideoById = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0 && data.items[0].snippet) {
        const videoInfo = data.items[0].snippet;
        state.currentVideo = {
          id: videoId,
          title: videoInfo.title,
          description: videoInfo.description,
          thumbnail: videoInfo.thumbnails.default.url,
        };
      } else {
        console.error(`Invalid response data for video ID: ${videoId}`);
      }
    } catch (error) {
      console.error(
        `Error fetching video data for video ID: ${videoId}`,
        error
      );
    }
  };

  const getTop3Videos = async (videoIds) => {
    await fetchTop3Videos(videoIds);
  };
  return {
    state,
    getTop3Videos,
    fetchVideoById,
  };
};
