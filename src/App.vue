<template>
  <main>
    <div class="quiz__wrapper">
      <Quiz
        title="Er du klar for sesjon?"
        sub-title="Sesjon består ikke bare av fysisk testing"
        :media="media"
        startText="<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>"
        endText="<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>"
        :questions="questions"
      />
    </div>
  </main>
</template>

<script>
import Quiz from "./components/quiz/Quiz.vue";

export default {
  name: "App",
  components: {
    Quiz
  },
  data: () => ({
    media: {
      selected: "video",
      image: {
        src: null
      },
      video: {
        _id: "55ab855c-e640-4125-8871-c85fe1cc0f1a",
        _name: "qbm",
        _path: "/no/qbm",
        creator: "user:system:ole.saggau",
        modifier: "user:system:anonymous",
        createdTime: "2020-06-30T10:23:25.567888Z",
        modifiedTime: "2020-06-30T10:42:03.993048Z",
        owner: "user:system:ole.saggau",
        type: "no.bouvet.forsvaret:video-qbrick",
        displayName: "qbm",
        hasChildren: true,
        language: "no",
        valid: true,
        childOrder: "modifiedtime DESC",
        data: {
          mediaId: "94ccc6f0-00090342-f4f60650",
          image: "4c14a3d7-895f-43e1-a6f8-e35694ddc4d9",
          qbrick: {
            id: "94ccc6f0-00090342-f4f60650",
            created: "2020-06-24T09:43:17+00:00",
            updated: "2020-06-29T08:02:36+00:00",
            asset: {
              id: "94ccc6f0-00090342",
              created: "2020-06-24T09:44:53+00:00",
              updated: "2020-06-29T08:02:36+00:00",
              createdBy: {
                id: "UseowkQ67oCKkSSO3DXztWgdw"
              },
              updatedBy: {
                id: "sagauser"
              },
              name: "94ccc6f0-00090342",
              resources: [
                {
                  type: "image",
                  id: "1592991893407",
                  language: "en",
                  renditions: [
                    {
                      type: "image",
                      width: 640,
                      height: 360,
                      id: "9f2ea5072cf8bc0e0b52e4fa2273acaf",
                      size: 39609,
                      links: {
                        href: "https://b04c4cdda535481481752ac48c29793d-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_01.jpg",
                        mimeType: "image/jpg"
                      }
                    },
                    {
                      type: "image",
                      width: 256,
                      height: 144,
                      id: "9caf75db36edc92393a5552df84bdf74",
                      size: 8336,
                      links: {
                        href: "https://8515106773e40f0c2cb00e6491e743c4-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_01.jpg",
                        mimeType: "image/jpg"
                      }
                    },
                    {
                      type: "image",
                      width: 1280,
                      height: 720,
                      id: "c50288a815e0f654e10aed7d5ba859cf",
                      size: 103249,
                      links: {
                        href: "https://672899b72e6fda98e3ba58934ddc213f-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_01.jpg",
                        mimeType: "image/jpg"
                      }
                    },
                    {
                      type: "image",
                      width: 1024,
                      height: 576,
                      id: "26fc4f4f13ef17d9e01388b327f2879a",
                      size: 76054,
                      links: {
                        href: "https://297d3e219ff12fc0bc7bdb4d692c55f9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_01.jpg",
                        mimeType: "image/jpg"
                      }
                    }
                  ]
                },
                {
                  type: "image",
                  id: "1592991893442",
                  language: "en",
                  rel: "thumbnail",
                  renditions: [
                    {
                      type: "image",
                      width: 1280,
                      height: 720,
                      id: "a77b6dcaaeb0ae85d8203d92dac838cb",
                      size: 89410,
                      links: {
                        href: "https://3ebb95722148869f5e2c6c3cb399eddb-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_02.jpg",
                        mimeType: "image/jpg"
                      }
                    },
                    {
                      type: "image",
                      width: 1024,
                      height: 576,
                      id: "e576592aaca8587de1b324441ea30192",
                      size: 65574,
                      links: {
                        href: "https://ef2cea1e068e39a4fc4e45895ae1bcf9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_02.jpg",
                        mimeType: "image/jpg"
                      }
                    },
                    {
                      type: "image",
                      width: 640,
                      height: 360,
                      id: "73533fbe01541bb0d068aea2e2efd1c9",
                      size: 33516,
                      links: {
                        href: "https://1964b9b72be3b1b1f48046455888052c-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_02.jpg",
                        mimeType: "image/jpg"
                      }
                    },
                    {
                      type: "image",
                      width: 256,
                      height: 144,
                      id: "f5207f1fa3c230f7314f160ca3b48dac",
                      size: 9285,
                      links: {
                        href: "https://62e0d94a08179c2a51c0c9ecb6c39d48-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_02.jpg",
                        mimeType: "image/jpg"
                      }
                    }
                  ]
                },
                {
                  type: "index",
                  id: "1592991893331",
                  language: "en",
                  renditions: {
                    type: "index",
                    references: [
                      {
                        order: 1,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "1"
                          }
                        }
                      },
                      {
                        order: 2,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "5"
                          }
                        }
                      },
                      {
                        order: 3,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "3"
                          }
                        }
                      },
                      {
                        order: 4,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "7"
                          }
                        }
                      },
                      {
                        order: 5,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "0"
                          }
                        }
                      },
                      {
                        order: 6,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "6"
                          }
                        }
                      },
                      {
                        order: 7,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "4"
                          }
                        }
                      },
                      {
                        order: 8,
                        item: {
                          resource: {
                            id: "1592991893148"
                          },
                          rendition: {
                            id: "2"
                          }
                        }
                      }
                    ],
                    id: "94ccc6f0-00090342-043cc4e3",
                    size: 755,
                    links: [
                      {
                        href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge.smil",
                        mimeType: "application/smil+xml"
                      },
                      {
                        href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/playlist.m3u8",
                        mimeType: "application/x-mpegURL"
                      },
                      {
                        href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.f4m",
                        mimeType: "application/hds+xml"
                      },
                      {
                        href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.mpd",
                        mimeType: "application/dash+xml"
                      },
                      {
                        href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/Manifest",
                        mimeType: "application/vnd.ms-sstr+xml"
                      }
                    ]
                  }
                },
                {
                  type: "video",
                  id: "1592991893148",
                  language: "en",
                  renditions: [
                    {
                      type: "video",
                      videos: {
                        bitrate: 2496000,
                        codec: "H.264",
                        width: 1024,
                        height: 576,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "1",
                      size: 18843333,
                      links: {
                        href: "https://f5c01fb01605c6c977cc4b8c7765ea6b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 3628000,
                        codec: "H.264",
                        width: 1280,
                        height: 720,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "3",
                      size: 27377587,
                      links: {
                        href: "https://7ea2d69edfa817f3a36ac3ac448c5d3b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 5128000,
                        codec: "H.264",
                        width: 1920,
                        height: 1080,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "5",
                      size: 38838573,
                      links: {
                        href: "https://20d55f1807c011af1b67ab5f88526f62-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_1080p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 496000,
                        codec: "H.264",
                        width: 512,
                        height: 288,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "6",
                      size: 3842124,
                      links: {
                        href: "https://405dc56d6f87b9fdd5bd96e8906a8e21-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_288p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 1696000,
                        codec: "H.264",
                        width: 768,
                        height: 432,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "7",
                      size: 12813075,
                      links: {
                        href: "https://a3b7f2687a1093e3ea3860310a3b2656-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_432p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 164000,
                        codec: "H.264",
                        width: 256,
                        height: 144,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "2",
                      size: 1289046,
                      links: {
                        href: "https://095bca5a911dbf260c6e61e8059b3baf-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 1096000,
                        codec: "H.264",
                        width: 640,
                        height: 360,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "0",
                      size: 8305885,
                      links: {
                        href: "https://13e23b3900c7234063bde2eb8128f8b7-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p.mp4",
                        mimeType: "video/mp4"
                      }
                    },
                    {
                      type: "video",
                      videos: {
                        bitrate: 260000,
                        codec: "H.264",
                        width: 384,
                        height: 216,
                        duration: 64.017,
                        audios: {
                          codec: "HE-AAC",
                          sampleRate: 48000,
                          bitDepth: 16,
                          channels: 2
                        }
                      },
                      id: "4",
                      size: 2035536,
                      links: {
                        href: "https://7f7419a499e8cc04a10629feed1236a0-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_216p.mp4",
                        mimeType: "video/mp4"
                      }
                    }
                  ]
                }
              ]
            },
            metadata: {
              title: "KNM Maud overtatt av Norge.mp4",
              description: "asdfasda.  sdasd sdsdasd sd"
            },
            catalog: {
              id: "2bf0a76a-f4db-46e3-a765-849f55be8cd5"
            },
            html: {
              "data-gobrain-widgetId": "55ab855c-e640-4125-8871-c85fe1cc0f1a-1593513723904-player",
              "data-gobrain-autoplay": "false",
              "data-gobrain-repeat": "false",
              "data-gobrain-moduleSettings": "{&quot;Controls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}",
              "data-gobrain-config": "//video.qbrick.com/play2/api/v1/accounts/AcctIaRI6GYGUWLBk6zITyt2A/configurations/default",
              "data-gobrain-data": "//api.qbrick.com/api/v1/public/accounts/AcctIaRI6GYGUWLBk6zITyt2A/medias/94ccc6f0-00090342-f4f60650"
            },
            script: "<script src=\"//play2.qbrick.com/framework/GoBrain.min.js\"/>"
          },
          description: "asdfasda.  sdasd sdsdasd sd"
        },
        x: {
          "com-enonic-app-metafields": {
            "meta-data": {
              blockRobots: false
            }
          }
        },
        page: {},
        attachments: {},
        publish: {}
      }
    },
    questions: [
      {
        isImageLeft: false,
        text: "I hvilken kategori vil militære styrker spille en stor rolle?",
        desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
        media: {
          selected: "image",
          image: {
            src: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png"
          },
          video: {
            _id: "55ab855c-e640-4125-8871-c85fe1cc0f1a",
            _name: "qbm",
            _path: "/no/qbm",
            creator: "user:system:ole.saggau",
            modifier: "user:system:anonymous",
            createdTime: "2020-06-30T10:23:25.567888Z",
            modifiedTime: "2020-06-30T10:42:03.993048Z",
            owner: "user:system:ole.saggau",
            type: "no.bouvet.forsvaret:video-qbrick",
            displayName: "qbm",
            hasChildren: true,
            language: "no",
            valid: true,
            childOrder: "modifiedtime DESC",
            data: {
              mediaId: "94ccc6f0-00090342-f4f60650",
              image: "4c14a3d7-895f-43e1-a6f8-e35694ddc4d9",
              qbrick: {
                id: "94ccc6f0-00090342-f4f60650",
                created: "2020-06-24T09:43:17+00:00",
                updated: "2020-06-29T08:02:36+00:00",
                asset: {
                  id: "94ccc6f0-00090342",
                  created: "2020-06-24T09:44:53+00:00",
                  updated: "2020-06-29T08:02:36+00:00",
                  createdBy: {
                    id: "UseowkQ67oCKkSSO3DXztWgdw"
                  },
                  updatedBy: {
                    id: "sagauser"
                  },
                  name: "94ccc6f0-00090342",
                  resources: [
                    {
                      type: "image",
                      id: "1592991893407",
                      language: "en",
                      renditions: [
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "9f2ea5072cf8bc0e0b52e4fa2273acaf",
                          size: 39609,
                          links: {
                            href: "https://b04c4cdda535481481752ac48c29793d-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "9caf75db36edc92393a5552df84bdf74",
                          size: 8336,
                          links: {
                            href: "https://8515106773e40f0c2cb00e6491e743c4-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "c50288a815e0f654e10aed7d5ba859cf",
                          size: 103249,
                          links: {
                            href: "https://672899b72e6fda98e3ba58934ddc213f-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "26fc4f4f13ef17d9e01388b327f2879a",
                          size: 76054,
                          links: {
                            href: "https://297d3e219ff12fc0bc7bdb4d692c55f9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "image",
                      id: "1592991893442",
                      language: "en",
                      rel: "thumbnail",
                      renditions: [
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "a77b6dcaaeb0ae85d8203d92dac838cb",
                          size: 89410,
                          links: {
                            href: "https://3ebb95722148869f5e2c6c3cb399eddb-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "e576592aaca8587de1b324441ea30192",
                          size: 65574,
                          links: {
                            href: "https://ef2cea1e068e39a4fc4e45895ae1bcf9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "73533fbe01541bb0d068aea2e2efd1c9",
                          size: 33516,
                          links: {
                            href: "https://1964b9b72be3b1b1f48046455888052c-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "f5207f1fa3c230f7314f160ca3b48dac",
                          size: 9285,
                          links: {
                            href: "https://62e0d94a08179c2a51c0c9ecb6c39d48-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "index",
                      id: "1592991893331",
                      language: "en",
                      renditions: {
                        type: "index",
                        references: [
                          {
                            order: 1,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "1"
                              }
                            }
                          },
                          {
                            order: 2,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "5"
                              }
                            }
                          },
                          {
                            order: 3,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "3"
                              }
                            }
                          },
                          {
                            order: 4,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "7"
                              }
                            }
                          },
                          {
                            order: 5,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "0"
                              }
                            }
                          },
                          {
                            order: 6,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "6"
                              }
                            }
                          },
                          {
                            order: 7,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "4"
                              }
                            }
                          },
                          {
                            order: 8,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "2"
                              }
                            }
                          }
                        ],
                        id: "94ccc6f0-00090342-043cc4e3",
                        size: 755,
                        links: [
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge.smil",
                            mimeType: "application/smil+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/playlist.m3u8",
                            mimeType: "application/x-mpegURL"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.f4m",
                            mimeType: "application/hds+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.mpd",
                            mimeType: "application/dash+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/Manifest",
                            mimeType: "application/vnd.ms-sstr+xml"
                          }
                        ]
                      }
                    },
                    {
                      type: "video",
                      id: "1592991893148",
                      language: "en",
                      renditions: [
                        {
                          type: "video",
                          videos: {
                            bitrate: 2496000,
                            codec: "H.264",
                            width: 1024,
                            height: 576,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "1",
                          size: 18843333,
                          links: {
                            href: "https://f5c01fb01605c6c977cc4b8c7765ea6b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 3628000,
                            codec: "H.264",
                            width: 1280,
                            height: 720,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "3",
                          size: 27377587,
                          links: {
                            href: "https://7ea2d69edfa817f3a36ac3ac448c5d3b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 5128000,
                            codec: "H.264",
                            width: 1920,
                            height: 1080,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "5",
                          size: 38838573,
                          links: {
                            href: "https://20d55f1807c011af1b67ab5f88526f62-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_1080p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 496000,
                            codec: "H.264",
                            width: 512,
                            height: 288,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "6",
                          size: 3842124,
                          links: {
                            href: "https://405dc56d6f87b9fdd5bd96e8906a8e21-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_288p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1696000,
                            codec: "H.264",
                            width: 768,
                            height: 432,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "7",
                          size: 12813075,
                          links: {
                            href: "https://a3b7f2687a1093e3ea3860310a3b2656-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_432p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 164000,
                            codec: "H.264",
                            width: 256,
                            height: 144,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "2",
                          size: 1289046,
                          links: {
                            href: "https://095bca5a911dbf260c6e61e8059b3baf-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1096000,
                            codec: "H.264",
                            width: 640,
                            height: 360,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "0",
                          size: 8305885,
                          links: {
                            href: "https://13e23b3900c7234063bde2eb8128f8b7-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 260000,
                            codec: "H.264",
                            width: 384,
                            height: 216,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "4",
                          size: 2035536,
                          links: {
                            href: "https://7f7419a499e8cc04a10629feed1236a0-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_216p.mp4",
                            mimeType: "video/mp4"
                          }
                        }
                      ]
                    }
                  ]
                },
                metadata: {
                  title: "KNM Maud overtatt av Norge.mp4",
                  description: "asdfasda.  sdasd sdsdasd sd"
                },
                catalog: {
                  id: "2bf0a76a-f4db-46e3-a765-849f55be8cd5"
                },
                html: {
                  "data-gobrain-widgetId": "55ab855c-e640-4125-8871-c85fe1cc0f1a-1593513723904-player",
                  "data-gobrain-autoplay": "false",
                  "data-gobrain-repeat": "false",
                  "data-gobrain-moduleSettings": "{&quot;Controls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}",
                  "data-gobrain-config": "//video.qbrick.com/play2/api/v1/accounts/AcctIaRI6GYGUWLBk6zITyt2A/configurations/default",
                  "data-gobrain-data": "//api.qbrick.com/api/v1/public/accounts/AcctIaRI6GYGUWLBk6zITyt2A/medias/94ccc6f0-00090342-f4f60650"
                },
                script: "<script src=\"//play2.qbrick.com/framework/GoBrain.min.js\"/>"
              },
              description: "asdfasda.  sdasd sdsdasd sd"
            },
            x: {
              "com-enonic-app-metafields": {
                "meta-data": {
                  blockRobots: false
                }
              }
            },
            page: {},
            attachments: {},
            publish: {}
          }
        },
        options: [
          {
            text: "Økonomisk sikkerhet",
            isCorrect: true
          },
          {
            text: "Sikkerhet for mat",
            isCorrect: false
          },
          {
            text: "Sikkerhet for helse",
            isCorrect: false
          },
          {
            text: "Omgivelsessikkerhet",
            isCorrect: true
          },
          {
            text: "Samfunnssikerhet",
            isCorrect: true
          },
          {
            text: "Politisk sikkerhet",
            isCorrect: true
          },
          {
            text: "Personlig og fysisk sikkerhet",
            isCorrect: false
          },
          {
            text: "Lokal sikkerhet",
            isCorrect: false
          }
        ]
      },
      {
        isImageLeft: true,
        text: "I hvilken kategori vil militære styrker spille en stor rolle?",
        desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
        media: {
          selected: "video",
          image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
          video: {
            _id: "55ab855c-e640-4125-8871-c85fe1cc0f1a",
            _name: "qbm",
            _path: "/no/qbm",
            creator: "user:system:ole.saggau",
            modifier: "user:system:anonymous",
            createdTime: "2020-06-30T10:23:25.567888Z",
            modifiedTime: "2020-06-30T10:42:03.993048Z",
            owner: "user:system:ole.saggau",
            type: "no.bouvet.forsvaret:video-qbrick",
            displayName: "qbm",
            hasChildren: true,
            language: "no",
            valid: true,
            childOrder: "modifiedtime DESC",
            data: {
              mediaId: "94ccc6f0-00090342-f4f60650",
              image: "4c14a3d7-895f-43e1-a6f8-e35694ddc4d9",
              qbrick: {
                id: "94ccc6f0-00090342-f4f60650",
                created: "2020-06-24T09:43:17+00:00",
                updated: "2020-06-29T08:02:36+00:00",
                asset: {
                  id: "94ccc6f0-00090342",
                  created: "2020-06-24T09:44:53+00:00",
                  updated: "2020-06-29T08:02:36+00:00",
                  createdBy: {
                    id: "UseowkQ67oCKkSSO3DXztWgdw"
                  },
                  updatedBy: {
                    id: "sagauser"
                  },
                  name: "94ccc6f0-00090342",
                  resources: [
                    {
                      type: "image",
                      id: "1592991893407",
                      language: "en",
                      renditions: [
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "9f2ea5072cf8bc0e0b52e4fa2273acaf",
                          size: 39609,
                          links: {
                            href: "https://b04c4cdda535481481752ac48c29793d-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "9caf75db36edc92393a5552df84bdf74",
                          size: 8336,
                          links: {
                            href: "https://8515106773e40f0c2cb00e6491e743c4-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "c50288a815e0f654e10aed7d5ba859cf",
                          size: 103249,
                          links: {
                            href: "https://672899b72e6fda98e3ba58934ddc213f-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "26fc4f4f13ef17d9e01388b327f2879a",
                          size: 76054,
                          links: {
                            href: "https://297d3e219ff12fc0bc7bdb4d692c55f9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "image",
                      id: "1592991893442",
                      language: "en",
                      rel: "thumbnail",
                      renditions: [
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "a77b6dcaaeb0ae85d8203d92dac838cb",
                          size: 89410,
                          links: {
                            href: "https://3ebb95722148869f5e2c6c3cb399eddb-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "e576592aaca8587de1b324441ea30192",
                          size: 65574,
                          links: {
                            href: "https://ef2cea1e068e39a4fc4e45895ae1bcf9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "73533fbe01541bb0d068aea2e2efd1c9",
                          size: 33516,
                          links: {
                            href: "https://1964b9b72be3b1b1f48046455888052c-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "f5207f1fa3c230f7314f160ca3b48dac",
                          size: 9285,
                          links: {
                            href: "https://62e0d94a08179c2a51c0c9ecb6c39d48-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "index",
                      id: "1592991893331",
                      language: "en",
                      renditions: {
                        type: "index",
                        references: [
                          {
                            order: 1,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "1"
                              }
                            }
                          },
                          {
                            order: 2,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "5"
                              }
                            }
                          },
                          {
                            order: 3,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "3"
                              }
                            }
                          },
                          {
                            order: 4,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "7"
                              }
                            }
                          },
                          {
                            order: 5,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "0"
                              }
                            }
                          },
                          {
                            order: 6,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "6"
                              }
                            }
                          },
                          {
                            order: 7,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "4"
                              }
                            }
                          },
                          {
                            order: 8,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "2"
                              }
                            }
                          }
                        ],
                        id: "94ccc6f0-00090342-043cc4e3",
                        size: 755,
                        links: [
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge.smil",
                            mimeType: "application/smil+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/playlist.m3u8",
                            mimeType: "application/x-mpegURL"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.f4m",
                            mimeType: "application/hds+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.mpd",
                            mimeType: "application/dash+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/Manifest",
                            mimeType: "application/vnd.ms-sstr+xml"
                          }
                        ]
                      }
                    },
                    {
                      type: "video",
                      id: "1592991893148",
                      language: "en",
                      renditions: [
                        {
                          type: "video",
                          videos: {
                            bitrate: 2496000,
                            codec: "H.264",
                            width: 1024,
                            height: 576,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "1",
                          size: 18843333,
                          links: {
                            href: "https://f5c01fb01605c6c977cc4b8c7765ea6b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 3628000,
                            codec: "H.264",
                            width: 1280,
                            height: 720,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "3",
                          size: 27377587,
                          links: {
                            href: "https://7ea2d69edfa817f3a36ac3ac448c5d3b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 5128000,
                            codec: "H.264",
                            width: 1920,
                            height: 1080,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "5",
                          size: 38838573,
                          links: {
                            href: "https://20d55f1807c011af1b67ab5f88526f62-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_1080p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 496000,
                            codec: "H.264",
                            width: 512,
                            height: 288,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "6",
                          size: 3842124,
                          links: {
                            href: "https://405dc56d6f87b9fdd5bd96e8906a8e21-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_288p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1696000,
                            codec: "H.264",
                            width: 768,
                            height: 432,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "7",
                          size: 12813075,
                          links: {
                            href: "https://a3b7f2687a1093e3ea3860310a3b2656-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_432p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 164000,
                            codec: "H.264",
                            width: 256,
                            height: 144,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "2",
                          size: 1289046,
                          links: {
                            href: "https://095bca5a911dbf260c6e61e8059b3baf-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1096000,
                            codec: "H.264",
                            width: 640,
                            height: 360,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "0",
                          size: 8305885,
                          links: {
                            href: "https://13e23b3900c7234063bde2eb8128f8b7-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 260000,
                            codec: "H.264",
                            width: 384,
                            height: 216,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "4",
                          size: 2035536,
                          links: {
                            href: "https://7f7419a499e8cc04a10629feed1236a0-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_216p.mp4",
                            mimeType: "video/mp4"
                          }
                        }
                      ]
                    }
                  ]
                },
                metadata: {
                  title: "KNM Maud overtatt av Norge.mp4",
                  description: "asdfasda.  sdasd sdsdasd sd"
                },
                catalog: {
                  id: "2bf0a76a-f4db-46e3-a765-849f55be8cd5"
                },
                html: {
                  "data-gobrain-widgetId": "55ab855c-e640-4125-8871-c85fe1cc0f1a-1593513723904-player",
                  "data-gobrain-autoplay": "false",
                  "data-gobrain-repeat": "false",
                  "data-gobrain-moduleSettings": "{&quot;Controls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}",
                  "data-gobrain-config": "//video.qbrick.com/play2/api/v1/accounts/AcctIaRI6GYGUWLBk6zITyt2A/configurations/default",
                  "data-gobrain-data": "//api.qbrick.com/api/v1/public/accounts/AcctIaRI6GYGUWLBk6zITyt2A/medias/94ccc6f0-00090342-f4f60650"
                },
                script: "<script src=\"//play2.qbrick.com/framework/GoBrain.min.js\"/>"
              },
              description: "asdfasda.  sdasd sdsdasd sd"
            },
            x: {
              "com-enonic-app-metafields": {
                "meta-data": {
                  blockRobots: false
                }
              }
            },
            page: {},
            attachments: {},
            publish: {}
          }
        },
        options: [
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: true
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: true
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          }
        ]
      },
      {
        isImageLeft: false,
        text: "I hvilken kategori vil militære styrker spille en stor rolle?",
        desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
        media: {
          selected: "image",
          image: {
            src: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png"
          },
          video: {
            _id: "55ab855c-e640-4125-8871-c85fe1cc0f1a",
            _name: "qbm",
            _path: "/no/qbm",
            creator: "user:system:ole.saggau",
            modifier: "user:system:anonymous",
            createdTime: "2020-06-30T10:23:25.567888Z",
            modifiedTime: "2020-06-30T10:42:03.993048Z",
            owner: "user:system:ole.saggau",
            type: "no.bouvet.forsvaret:video-qbrick",
            displayName: "qbm",
            hasChildren: true,
            language: "no",
            valid: true,
            childOrder: "modifiedtime DESC",
            data: {
              mediaId: "94ccc6f0-00090342-f4f60650",
              image: "4c14a3d7-895f-43e1-a6f8-e35694ddc4d9",
              qbrick: {
                id: "94ccc6f0-00090342-f4f60650",
                created: "2020-06-24T09:43:17+00:00",
                updated: "2020-06-29T08:02:36+00:00",
                asset: {
                  id: "94ccc6f0-00090342",
                  created: "2020-06-24T09:44:53+00:00",
                  updated: "2020-06-29T08:02:36+00:00",
                  createdBy: {
                    id: "UseowkQ67oCKkSSO3DXztWgdw"
                  },
                  updatedBy: {
                    id: "sagauser"
                  },
                  name: "94ccc6f0-00090342",
                  resources: [
                    {
                      type: "image",
                      id: "1592991893407",
                      language: "en",
                      renditions: [
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "9f2ea5072cf8bc0e0b52e4fa2273acaf",
                          size: 39609,
                          links: {
                            href: "https://b04c4cdda535481481752ac48c29793d-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "9caf75db36edc92393a5552df84bdf74",
                          size: 8336,
                          links: {
                            href: "https://8515106773e40f0c2cb00e6491e743c4-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "c50288a815e0f654e10aed7d5ba859cf",
                          size: 103249,
                          links: {
                            href: "https://672899b72e6fda98e3ba58934ddc213f-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "26fc4f4f13ef17d9e01388b327f2879a",
                          size: 76054,
                          links: {
                            href: "https://297d3e219ff12fc0bc7bdb4d692c55f9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "image",
                      id: "1592991893442",
                      language: "en",
                      rel: "thumbnail",
                      renditions: [
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "a77b6dcaaeb0ae85d8203d92dac838cb",
                          size: 89410,
                          links: {
                            href: "https://3ebb95722148869f5e2c6c3cb399eddb-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "e576592aaca8587de1b324441ea30192",
                          size: 65574,
                          links: {
                            href: "https://ef2cea1e068e39a4fc4e45895ae1bcf9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "73533fbe01541bb0d068aea2e2efd1c9",
                          size: 33516,
                          links: {
                            href: "https://1964b9b72be3b1b1f48046455888052c-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "f5207f1fa3c230f7314f160ca3b48dac",
                          size: 9285,
                          links: {
                            href: "https://62e0d94a08179c2a51c0c9ecb6c39d48-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "index",
                      id: "1592991893331",
                      language: "en",
                      renditions: {
                        type: "index",
                        references: [
                          {
                            order: 1,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "1"
                              }
                            }
                          },
                          {
                            order: 2,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "5"
                              }
                            }
                          },
                          {
                            order: 3,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "3"
                              }
                            }
                          },
                          {
                            order: 4,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "7"
                              }
                            }
                          },
                          {
                            order: 5,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "0"
                              }
                            }
                          },
                          {
                            order: 6,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "6"
                              }
                            }
                          },
                          {
                            order: 7,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "4"
                              }
                            }
                          },
                          {
                            order: 8,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "2"
                              }
                            }
                          }
                        ],
                        id: "94ccc6f0-00090342-043cc4e3",
                        size: 755,
                        links: [
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge.smil",
                            mimeType: "application/smil+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/playlist.m3u8",
                            mimeType: "application/x-mpegURL"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.f4m",
                            mimeType: "application/hds+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.mpd",
                            mimeType: "application/dash+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/Manifest",
                            mimeType: "application/vnd.ms-sstr+xml"
                          }
                        ]
                      }
                    },
                    {
                      type: "video",
                      id: "1592991893148",
                      language: "en",
                      renditions: [
                        {
                          type: "video",
                          videos: {
                            bitrate: 2496000,
                            codec: "H.264",
                            width: 1024,
                            height: 576,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "1",
                          size: 18843333,
                          links: {
                            href: "https://f5c01fb01605c6c977cc4b8c7765ea6b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 3628000,
                            codec: "H.264",
                            width: 1280,
                            height: 720,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "3",
                          size: 27377587,
                          links: {
                            href: "https://7ea2d69edfa817f3a36ac3ac448c5d3b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 5128000,
                            codec: "H.264",
                            width: 1920,
                            height: 1080,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "5",
                          size: 38838573,
                          links: {
                            href: "https://20d55f1807c011af1b67ab5f88526f62-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_1080p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 496000,
                            codec: "H.264",
                            width: 512,
                            height: 288,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "6",
                          size: 3842124,
                          links: {
                            href: "https://405dc56d6f87b9fdd5bd96e8906a8e21-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_288p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1696000,
                            codec: "H.264",
                            width: 768,
                            height: 432,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "7",
                          size: 12813075,
                          links: {
                            href: "https://a3b7f2687a1093e3ea3860310a3b2656-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_432p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 164000,
                            codec: "H.264",
                            width: 256,
                            height: 144,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "2",
                          size: 1289046,
                          links: {
                            href: "https://095bca5a911dbf260c6e61e8059b3baf-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1096000,
                            codec: "H.264",
                            width: 640,
                            height: 360,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "0",
                          size: 8305885,
                          links: {
                            href: "https://13e23b3900c7234063bde2eb8128f8b7-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 260000,
                            codec: "H.264",
                            width: 384,
                            height: 216,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "4",
                          size: 2035536,
                          links: {
                            href: "https://7f7419a499e8cc04a10629feed1236a0-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_216p.mp4",
                            mimeType: "video/mp4"
                          }
                        }
                      ]
                    }
                  ]
                },
                metadata: {
                  title: "KNM Maud overtatt av Norge.mp4",
                  description: "asdfasda.  sdasd sdsdasd sd"
                },
                catalog: {
                  id: "2bf0a76a-f4db-46e3-a765-849f55be8cd5"
                },
                html: {
                  "data-gobrain-widgetId": "55ab855c-e640-4125-8871-c85fe1cc0f1a-1593513723904-player",
                  "data-gobrain-autoplay": "false",
                  "data-gobrain-repeat": "false",
                  "data-gobrain-moduleSettings": "{&quot;Controls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}",
                  "data-gobrain-config": "//video.qbrick.com/play2/api/v1/accounts/AcctIaRI6GYGUWLBk6zITyt2A/configurations/default",
                  "data-gobrain-data": "//api.qbrick.com/api/v1/public/accounts/AcctIaRI6GYGUWLBk6zITyt2A/medias/94ccc6f0-00090342-f4f60650"
                },
                script: "<script src=\"//play2.qbrick.com/framework/GoBrain.min.js\"/>"
              },
              description: "asdfasda.  sdasd sdsdasd sd"
            },
            x: {
              "com-enonic-app-metafields": {
                "meta-data": {
                  blockRobots: false
                }
              }
            },
            page: {},
            attachments: {},
            publish: {}
          }
        },
        options: [
          {
            text: "Økonomisk sikkerhet",
            isCorrect: true
          },
          {
            text: "Sikkerhet for mat",
            isCorrect: false
          },
          {
            text: "Sikkerhet for helse",
            isCorrect: false
          },
          {
            text: "Omgivelsessikkerhet",
            isCorrect: true
          },
          {
            text: "Samfunnssikerhet",
            isCorrect: true
          },
          {
            text: "Politisk sikkerhet",
            isCorrect: true
          },
          {
            text: "Personlig og fysisk sikkerhet",
            isCorrect: false
          },
          {
            text: "Lokal sikkerhet",
            isCorrect: false
          }
        ]
      },
      {
        isImageLeft: true,
        text: "I hvilken kategori vil militære styrker spille en stor rolle?",
        desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
        media: {
          selected: "video",
          image: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png",
          video: {
            _id: "55ab855c-e640-4125-8871-c85fe1cc0f1a",
            _name: "qbm",
            _path: "/no/qbm",
            creator: "user:system:ole.saggau",
            modifier: "user:system:anonymous",
            createdTime: "2020-06-30T10:23:25.567888Z",
            modifiedTime: "2020-06-30T10:42:03.993048Z",
            owner: "user:system:ole.saggau",
            type: "no.bouvet.forsvaret:video-qbrick",
            displayName: "qbm",
            hasChildren: true,
            language: "no",
            valid: true,
            childOrder: "modifiedtime DESC",
            data: {
              mediaId: "94ccc6f0-00090342-f4f60650",
              image: "4c14a3d7-895f-43e1-a6f8-e35694ddc4d9",
              qbrick: {
                id: "94ccc6f0-00090342-f4f60650",
                created: "2020-06-24T09:43:17+00:00",
                updated: "2020-06-29T08:02:36+00:00",
                asset: {
                  id: "94ccc6f0-00090342",
                  created: "2020-06-24T09:44:53+00:00",
                  updated: "2020-06-29T08:02:36+00:00",
                  createdBy: {
                    id: "UseowkQ67oCKkSSO3DXztWgdw"
                  },
                  updatedBy: {
                    id: "sagauser"
                  },
                  name: "94ccc6f0-00090342",
                  resources: [
                    {
                      type: "image",
                      id: "1592991893407",
                      language: "en",
                      renditions: [
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "9f2ea5072cf8bc0e0b52e4fa2273acaf",
                          size: 39609,
                          links: {
                            href: "https://b04c4cdda535481481752ac48c29793d-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "9caf75db36edc92393a5552df84bdf74",
                          size: 8336,
                          links: {
                            href: "https://8515106773e40f0c2cb00e6491e743c4-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "c50288a815e0f654e10aed7d5ba859cf",
                          size: 103249,
                          links: {
                            href: "https://672899b72e6fda98e3ba58934ddc213f-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "26fc4f4f13ef17d9e01388b327f2879a",
                          size: 76054,
                          links: {
                            href: "https://297d3e219ff12fc0bc7bdb4d692c55f9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "image",
                      id: "1592991893442",
                      language: "en",
                      rel: "thumbnail",
                      renditions: [
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "a77b6dcaaeb0ae85d8203d92dac838cb",
                          size: 89410,
                          links: {
                            href: "https://3ebb95722148869f5e2c6c3cb399eddb-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "e576592aaca8587de1b324441ea30192",
                          size: 65574,
                          links: {
                            href: "https://ef2cea1e068e39a4fc4e45895ae1bcf9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "73533fbe01541bb0d068aea2e2efd1c9",
                          size: 33516,
                          links: {
                            href: "https://1964b9b72be3b1b1f48046455888052c-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "f5207f1fa3c230f7314f160ca3b48dac",
                          size: 9285,
                          links: {
                            href: "https://62e0d94a08179c2a51c0c9ecb6c39d48-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "index",
                      id: "1592991893331",
                      language: "en",
                      renditions: {
                        type: "index",
                        references: [
                          {
                            order: 1,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "1"
                              }
                            }
                          },
                          {
                            order: 2,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "5"
                              }
                            }
                          },
                          {
                            order: 3,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "3"
                              }
                            }
                          },
                          {
                            order: 4,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "7"
                              }
                            }
                          },
                          {
                            order: 5,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "0"
                              }
                            }
                          },
                          {
                            order: 6,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "6"
                              }
                            }
                          },
                          {
                            order: 7,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "4"
                              }
                            }
                          },
                          {
                            order: 8,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "2"
                              }
                            }
                          }
                        ],
                        id: "94ccc6f0-00090342-043cc4e3",
                        size: 755,
                        links: [
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge.smil",
                            mimeType: "application/smil+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/playlist.m3u8",
                            mimeType: "application/x-mpegURL"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.f4m",
                            mimeType: "application/hds+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.mpd",
                            mimeType: "application/dash+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/Manifest",
                            mimeType: "application/vnd.ms-sstr+xml"
                          }
                        ]
                      }
                    },
                    {
                      type: "video",
                      id: "1592991893148",
                      language: "en",
                      renditions: [
                        {
                          type: "video",
                          videos: {
                            bitrate: 2496000,
                            codec: "H.264",
                            width: 1024,
                            height: 576,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "1",
                          size: 18843333,
                          links: {
                            href: "https://f5c01fb01605c6c977cc4b8c7765ea6b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 3628000,
                            codec: "H.264",
                            width: 1280,
                            height: 720,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "3",
                          size: 27377587,
                          links: {
                            href: "https://7ea2d69edfa817f3a36ac3ac448c5d3b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 5128000,
                            codec: "H.264",
                            width: 1920,
                            height: 1080,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "5",
                          size: 38838573,
                          links: {
                            href: "https://20d55f1807c011af1b67ab5f88526f62-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_1080p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 496000,
                            codec: "H.264",
                            width: 512,
                            height: 288,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "6",
                          size: 3842124,
                          links: {
                            href: "https://405dc56d6f87b9fdd5bd96e8906a8e21-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_288p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1696000,
                            codec: "H.264",
                            width: 768,
                            height: 432,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "7",
                          size: 12813075,
                          links: {
                            href: "https://a3b7f2687a1093e3ea3860310a3b2656-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_432p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 164000,
                            codec: "H.264",
                            width: 256,
                            height: 144,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "2",
                          size: 1289046,
                          links: {
                            href: "https://095bca5a911dbf260c6e61e8059b3baf-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1096000,
                            codec: "H.264",
                            width: 640,
                            height: 360,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "0",
                          size: 8305885,
                          links: {
                            href: "https://13e23b3900c7234063bde2eb8128f8b7-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 260000,
                            codec: "H.264",
                            width: 384,
                            height: 216,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "4",
                          size: 2035536,
                          links: {
                            href: "https://7f7419a499e8cc04a10629feed1236a0-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_216p.mp4",
                            mimeType: "video/mp4"
                          }
                        }
                      ]
                    }
                  ]
                },
                metadata: {
                  title: "KNM Maud overtatt av Norge.mp4",
                  description: "asdfasda.  sdasd sdsdasd sd"
                },
                catalog: {
                  id: "2bf0a76a-f4db-46e3-a765-849f55be8cd5"
                },
                html: {
                  "data-gobrain-widgetId": "55ab855c-e640-4125-8871-c85fe1cc0f1a-1593513723904-player",
                  "data-gobrain-autoplay": "false",
                  "data-gobrain-repeat": "false",
                  "data-gobrain-moduleSettings": "{&quot;Controls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}",
                  "data-gobrain-config": "//video.qbrick.com/play2/api/v1/accounts/AcctIaRI6GYGUWLBk6zITyt2A/configurations/default",
                  "data-gobrain-data": "//api.qbrick.com/api/v1/public/accounts/AcctIaRI6GYGUWLBk6zITyt2A/medias/94ccc6f0-00090342-f4f60650"
                },
                script: "<script src=\"//play2.qbrick.com/framework/GoBrain.min.js\"/>"
              },
              description: "asdfasda.  sdasd sdsdasd sd"
            },
            x: {
              "com-enonic-app-metafields": {
                "meta-data": {
                  blockRobots: false
                }
              }
            },
            page: {},
            attachments: {},
            publish: {}
          }
        },
        options: [
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: true
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: true
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          },
          {
            text: "Lorem ipsum",
            isCorrect: false
          }
        ]
      },
      {
        isImageLeft: false,
        text: "I hvilken kategori vil militære styrker spille en stor rolle?",
        desc: "<p>En helt vanlig tekst, hvor man kan legge inn hvilken som helst informasjon eller fakta rundt spørsmålet.</p>",
        media: {
          selected: "image",
          image: {
            src: "https://mk0smarthusetmpuks6w.kinstacdn.com/wp-content/uploads/2020/05/placeholder-1.png"
          },
          video: {
            _id: "55ab855c-e640-4125-8871-c85fe1cc0f1a",
            _name: "qbm",
            _path: "/no/qbm",
            creator: "user:system:ole.saggau",
            modifier: "user:system:anonymous",
            createdTime: "2020-06-30T10:23:25.567888Z",
            modifiedTime: "2020-06-30T10:42:03.993048Z",
            owner: "user:system:ole.saggau",
            type: "no.bouvet.forsvaret:video-qbrick",
            displayName: "qbm",
            hasChildren: true,
            language: "no",
            valid: true,
            childOrder: "modifiedtime DESC",
            data: {
              mediaId: "94ccc6f0-00090342-f4f60650",
              image: "4c14a3d7-895f-43e1-a6f8-e35694ddc4d9",
              qbrick: {
                id: "94ccc6f0-00090342-f4f60650",
                created: "2020-06-24T09:43:17+00:00",
                updated: "2020-06-29T08:02:36+00:00",
                asset: {
                  id: "94ccc6f0-00090342",
                  created: "2020-06-24T09:44:53+00:00",
                  updated: "2020-06-29T08:02:36+00:00",
                  createdBy: {
                    id: "UseowkQ67oCKkSSO3DXztWgdw"
                  },
                  updatedBy: {
                    id: "sagauser"
                  },
                  name: "94ccc6f0-00090342",
                  resources: [
                    {
                      type: "image",
                      id: "1592991893407",
                      language: "en",
                      renditions: [
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "9f2ea5072cf8bc0e0b52e4fa2273acaf",
                          size: 39609,
                          links: {
                            href: "https://b04c4cdda535481481752ac48c29793d-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "9caf75db36edc92393a5552df84bdf74",
                          size: 8336,
                          links: {
                            href: "https://8515106773e40f0c2cb00e6491e743c4-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "c50288a815e0f654e10aed7d5ba859cf",
                          size: 103249,
                          links: {
                            href: "https://672899b72e6fda98e3ba58934ddc213f-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "26fc4f4f13ef17d9e01388b327f2879a",
                          size: 76054,
                          links: {
                            href: "https://297d3e219ff12fc0bc7bdb4d692c55f9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_01.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "image",
                      id: "1592991893442",
                      language: "en",
                      rel: "thumbnail",
                      renditions: [
                        {
                          type: "image",
                          width: 1280,
                          height: 720,
                          id: "a77b6dcaaeb0ae85d8203d92dac838cb",
                          size: 89410,
                          links: {
                            href: "https://3ebb95722148869f5e2c6c3cb399eddb-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 1024,
                          height: 576,
                          id: "e576592aaca8587de1b324441ea30192",
                          size: 65574,
                          links: {
                            href: "https://ef2cea1e068e39a4fc4e45895ae1bcf9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 640,
                          height: 360,
                          id: "73533fbe01541bb0d068aea2e2efd1c9",
                          size: 33516,
                          links: {
                            href: "https://1964b9b72be3b1b1f48046455888052c-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        },
                        {
                          type: "image",
                          width: 256,
                          height: 144,
                          id: "f5207f1fa3c230f7314f160ca3b48dac",
                          size: 9285,
                          links: {
                            href: "https://62e0d94a08179c2a51c0c9ecb6c39d48-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p_02.jpg",
                            mimeType: "image/jpg"
                          }
                        }
                      ]
                    },
                    {
                      type: "index",
                      id: "1592991893331",
                      language: "en",
                      renditions: {
                        type: "index",
                        references: [
                          {
                            order: 1,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "1"
                              }
                            }
                          },
                          {
                            order: 2,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "5"
                              }
                            }
                          },
                          {
                            order: 3,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "3"
                              }
                            }
                          },
                          {
                            order: 4,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "7"
                              }
                            }
                          },
                          {
                            order: 5,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "0"
                              }
                            }
                          },
                          {
                            order: 6,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "6"
                              }
                            }
                          },
                          {
                            order: 7,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "4"
                              }
                            }
                          },
                          {
                            order: 8,
                            item: {
                              resource: {
                                id: "1592991893148"
                              },
                              rendition: {
                                id: "2"
                              }
                            }
                          }
                        ],
                        id: "94ccc6f0-00090342-043cc4e3",
                        size: 755,
                        links: [
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge.smil",
                            mimeType: "application/smil+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/playlist.m3u8",
                            mimeType: "application/x-mpegURL"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.f4m",
                            mimeType: "application/hds+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/manifest.mpd",
                            mimeType: "application/dash+xml"
                          },
                          {
                            href: "https://3cefe0d8473a961bb6eec47069440da9-httpcache0-90342-cacheod0.dna.ip-only.net/90342-cacheod0/_definst_/smil:assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge/Manifest",
                            mimeType: "application/vnd.ms-sstr+xml"
                          }
                        ]
                      }
                    },
                    {
                      type: "video",
                      id: "1592991893148",
                      language: "en",
                      renditions: [
                        {
                          type: "video",
                          videos: {
                            bitrate: 2496000,
                            codec: "H.264",
                            width: 1024,
                            height: 576,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "1",
                          size: 18843333,
                          links: {
                            href: "https://f5c01fb01605c6c977cc4b8c7765ea6b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_576p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 3628000,
                            codec: "H.264",
                            width: 1280,
                            height: 720,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "3",
                          size: 27377587,
                          links: {
                            href: "https://7ea2d69edfa817f3a36ac3ac448c5d3b-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_720p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 5128000,
                            codec: "H.264",
                            width: 1920,
                            height: 1080,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "5",
                          size: 38838573,
                          links: {
                            href: "https://20d55f1807c011af1b67ab5f88526f62-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_1080p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 496000,
                            codec: "H.264",
                            width: 512,
                            height: 288,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "6",
                          size: 3842124,
                          links: {
                            href: "https://405dc56d6f87b9fdd5bd96e8906a8e21-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_288p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1696000,
                            codec: "H.264",
                            width: 768,
                            height: 432,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "7",
                          size: 12813075,
                          links: {
                            href: "https://a3b7f2687a1093e3ea3860310a3b2656-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_432p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 164000,
                            codec: "H.264",
                            width: 256,
                            height: 144,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "2",
                          size: 1289046,
                          links: {
                            href: "https://095bca5a911dbf260c6e61e8059b3baf-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_144p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 1096000,
                            codec: "H.264",
                            width: 640,
                            height: 360,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "0",
                          size: 8305885,
                          links: {
                            href: "https://13e23b3900c7234063bde2eb8128f8b7-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_360p.mp4",
                            mimeType: "video/mp4"
                          }
                        },
                        {
                          type: "video",
                          videos: {
                            bitrate: 260000,
                            codec: "H.264",
                            width: 384,
                            height: 216,
                            duration: 64.017,
                            audios: {
                              codec: "HE-AAC",
                              sampleRate: 48000,
                              bitDepth: 16,
                              channels: 2
                            }
                          },
                          id: "4",
                          size: 2035536,
                          links: {
                            href: "https://7f7419a499e8cc04a10629feed1236a0-httpcache0-90342-cachedown0.dna.ip-only.net/90342-cachedown0/assets/94/94ccc6f0-00090342/KNM%20Maud%20overtatt%20av%20Norge_216p.mp4",
                            mimeType: "video/mp4"
                          }
                        }
                      ]
                    }
                  ]
                },
                metadata: {
                  title: "KNM Maud overtatt av Norge.mp4",
                  description: "asdfasda.  sdasd sdsdasd sd"
                },
                catalog: {
                  id: "2bf0a76a-f4db-46e3-a765-849f55be8cd5"
                },
                html: {
                  "data-gobrain-widgetId": "55ab855c-e640-4125-8871-c85fe1cc0f1a-1593513723904-player",
                  "data-gobrain-autoplay": "false",
                  "data-gobrain-repeat": "false",
                  "data-gobrain-moduleSettings": "{&quot;Controls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}",
                  "data-gobrain-config": "//video.qbrick.com/play2/api/v1/accounts/AcctIaRI6GYGUWLBk6zITyt2A/configurations/default",
                  "data-gobrain-data": "//api.qbrick.com/api/v1/public/accounts/AcctIaRI6GYGUWLBk6zITyt2A/medias/94ccc6f0-00090342-f4f60650"
                },
                script: "<script src=\"//play2.qbrick.com/framework/GoBrain.min.js\"/>"
              },
              description: "asdfasda.  sdasd sdsdasd sd"
            },
            x: {
              "com-enonic-app-metafields": {
                "meta-data": {
                  blockRobots: false
                }
              }
            },
            page: {},
            attachments: {},
            publish: {}
          }
        },
        options: [
          {
            text: "Økonomisk sikkerhet",
            isCorrect: true
          },
          {
            text: "Sikkerhet for mat",
            isCorrect: false
          },
          {
            text: "Sikkerhet for helse",
            isCorrect: false
          },
          {
            text: "Omgivelsessikkerhet",
            isCorrect: true
          },
          {
            text: "Samfunnssikerhet",
            isCorrect: true
          },
          {
            text: "Politisk sikkerhet",
            isCorrect: true
          },
          {
            text: "Personlig og fysisk sikkerhet",
            isCorrect: false
          },
          {
            text: "Lokal sikkerhet",
            isCorrect: false
          }
        ]
      }
    ]
  })
};
</script>
