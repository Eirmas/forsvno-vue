<template>
  <main>
    <div class="slang-words__wrapper">
      <Words
        :paginationIndex="30"
        :paginationLimit="15"
        :items="words"
        header="Militære forkortelser"
        subheader="Søk på en forkortelse<br>eller en beskrivelse."
        inputPlaceholder="For eksempel HV, KV eller patruljefører"
        table1Header="Forkortelse"
        table2Header="Beskrivelse"
      />
    </div>
    <div class="promocard-horizontal__wrapper">
      <Promocard
        title="Promocard Horizontal"
        :items="promocards"
      />
    </div>
    <div
      class="stories__wrapper"
    >
      <Story
        title="Instagram Story"
        :stories="stories"
        :sound-icons="soundIcons"
      />
    </div>
  </main>
</template>

<script>
import Story from "./components/story/Story.vue";
import Words from "./components/slang-words/Words.vue";
import Promocard from "./components/promocard-horizontal/Promocard.vue";

export default {
  name: "App",
  components: {
    Story,
    Words,
    Promocard
  },
  data: () => ({
    words: [
      { word: "1. linje", description: "Angir hva slags bekledning og utstyr man skal ha. Kun uniform" },
      { word: "2. linje", description: "Angir hva slags bekledning og utstyr man skal ha. 1. linje + stridsvest og våpen" },
      { word: "3. linje", description: "Angir hva slags bekledning og utstyr man skal ha. 2. linje + stridssekk med relevant utstyr for 24 timer (mat, teltduk, ekstra bekledning etc.)" },
      { word: "4. linje", description: "Angir hva slags bekledning og utstyr man skal ha. 3. linje + utstyr relevant for lengre oppdrag (én uke). Mer mat, utstyr og bekledning. Pakkes i storsekk" },
      { word: "5. linje", description: "Angir hva slags bekledning og utstyr man skal ha. Alt utstyr som hver enkelt soldat har fått utdelt" },
      { word: "1. MR", description: "1. Minerydderskvadron" },
      { word: "2. Bn", description: "2. Bataljon" },
      { word: "5.0", description: "Godkjent patruljehund og/eller hundefører" },
      { word: "9-8", description: "Melding til alle på gitte sambandsfrekvens" },
      { word: "A/C", description: "Aircraft" },
      { word: "AAW", description: "Anti-Air Warfare" },
      { word: "ABC", description: "Atomic, Biological, Chemical" },
      { word: "ABCDE", description: "Airways, Breathing, Circulation, Disability, Expose/Exam/Environmental Control. Huskeregel for livreddende førstehjelp" },
      { word: "ABM", description: "Anti-ballistic missile" },
      { word: "ABP ", description: "Afghan Border Police" },
      { word: "ACCS", description: "Air Command & Control System" },
      { word: "ACE", description: "Allied Command Europe" },
      { word: "ACLANT", description: "Allied Command Atlantic" },
      { word: "ACO", description: "Air Coordination Order" },
      { word: "ACO", description: "Allied Command Operations" },
      { word: "ACT", description: "Allied Command Transformation" },
      { word: "ACU", description: "Air Control Unit" },
      { word: "ADJ", description: "Adjutant" },
      { word: "ADM", description: "Admiral" },
      { word: "AdmAss", description: "Administrasjonsassistent" },
      { word: "ADMOFF", description: "Administrasjonsoffiser" },
      { word: "ADR", description: "Air Defence Radar" },
      { word: "ADSAM", description: "Adskillelse og Sammensetting av våpen" },
      { word: "AE", description: "Armed elements" },
      { word: "AET", description: "Agency Establishment Team" },
      { word: "AEW", description: "Airborne Early Warning" },
      { word: "AF", description: "Avløsningsfører" },
      { word: "AFA", description: "Administrerende forvaltende avdeling" },
      { word: "AFCENT", description: "Allied Forces Central Europe" },
      { word: "AFNORTH", description: "Allied Forces North Europe" },
      { word: "AFNORTH-WEST", description: "Allied Forces Northwestern Europe" },
      { word: "AFSOUTH", description: "Allied Forces Southern Europe" },
      { word: "AFG", description: "Afghan(s)" },
      { word: "AFS", description: "Aktiv feltsikkerhet" },
      { word: "AG", description: "Automatgevær" },
      { word: "AG-3", description: "Automatgevær 3" },
      { word: "AGS", description: "Alliance Ground Surveillance" },
      { word: "Al", description: "Air interdiction" },
      { word: "Air MEDEVAC", description: "Air Medical evacuation" },
      { word: "AKOV", description: "Alliert Kompetansesenter for Operasjoner under vinterforhold" },
      { word: "AKP", description: "Adgangskontrollpost" },
      { word: "AKS", description: "Analyse og kommandosentral" },
      { word: "AK-47", description: "Automat Kalasjnikova 1947" },
      { word: "ALCM", description: "Air-launched cruise missile" },
      { word: "ALF", description: "Avløsningsfører" },
      { word: "ALF", description: "Avdeling for luftoperativ fagutdanning" },
      { word: "ALIS", description: "Avdeling for ledelse og internasjonalt samarbeid" },
      { word: "ALMT", description: "Avdeling for luftmakt og teknologi" },
      { word: "ALO", description: "Air Liaison Officer" },
      { word: "ALT", description: "Avdeling for teknolgibasert læring" },
      { word: "AMB", description: "Ambulanse" },
      { word: "AMF", description: "Allied Command Europe Mobile Force" },
      { word: "AMIB", description: "Allied Military Intelligence Battaliona" },
      { word: "AMM", description: "Ammunisjon" },
      { word: "Ammo", description: "Ammunisjon" },
      { word: "Amo", description: "Aeromedical officer" },
      { word: "Amr", description: "Amerikansk" },
      { word: "AMRAAM", description: "Advanced Medium Range Air-to-Air Missile. Avansert luft-til-luft-missil med middels rekkevidde. Siden 1995 har Norge brukt dette som et bakke-til-luft-missil i det norskproduserte luftvernsystemet NASAMS." },
      { word: "AMU", description: "Ammunisjon, målangivelse, utførelse" },
      { word: "AMU", description: "Arbeidsmiljøutvalg" },
      { word: "AN/PRC", description: "Army/Navy, Portable, Radio, Communication" },
      { word: "Anf", description: "Anført" },
      { word: "AO", description: "Administrativt område" },
      { word: "AO", description: "Area of operations" },
      { word: "AO", description: "Artilleriobservatør" },
      { word: "AO", description: "Ansvarsområde" },
      { word: "AOB", description: "Any Other Business. Blir sagt på slutten av ordremøter" },
      { word: "AOB", description: "Air Order of Battle" },
      { word: "AOO", description: "Area of operations" },
      { word: "APC", description: "Armoured personnel carrier" },
      { word: "ARBC", description: "Atom-/kjernefysiske, radiologiske, biologiske og kjemiske stridsmidler" },
      { word: "ARS", description: "Air Control Centre. Recognized air picture production centre and sensor fusion post" },
      { word: "Art", description: "Artilleri. Artilleri er opprinnelig maskineri for å kaste prosjektiler, slik som beleiringsmaskiner og kanoner. I moderne militær sammenheng betyr det også våpenarten som består av soldater som er utrustet med slike våpen" },
      { word: "Art-Off", description: "Artillerioffiser" },
      { word: "ARTBN", description: "Artilleribataljonen" },
      { word: "Artjeg", description: "Artillerijeger. Jegere som har som mål å ta seg dypt inn bak fiendens linjer og bedriver etterretning og ildledelse" },
      { word: "ArtOp", description: "Artilleri observasjonspost" },
      { word: "ARTOT", description: "Avstand, Retning, Terreng, Oppfang, Tid" },
      { word: "ASAP", description: "As soon as possible / Så raskt som mulig" },
      { word: "ASBM", description: "Air-to-surface-ballistic-missile" },
      { word: "ASIC", description: "All Source Intelligence Cell" },
      { word: "ASM", description: "Air-to-surface-missile" },
      { word: "ASO", description: "Avdelingssikkerhetsoffiser" },
      { word: "ASOC", description: "Air Support Operation Center" },
      { word: "ASP", description: "Aspirant" },
      { word: "ASRAAM", description: "Advanced short-range air-to-air missile / Avansert luft-til-luft missil med kort rekkeviddea" },
      { word: "Ass", description: "Assistent" },
      { word: "ASUW", description: "Anti-Surface Warfare" },
      { word: "ASW", description: "Anti-submarine warfare / Anti-ubåt krigføring" },
      { word: "ASWC", description: "Anti-Submarine Warfare Commander" },
      { word: "AT", description: "Arrestasjonsteknikk" },
      { word: "AT", description: "Anti-tank" },
      { word: "ATF", description: "Arbeidstidsbestemmelser for Forsvaret" },
      { word: "ATJ", description: "Arkivtjenesten. Ansvarlig for Forsvarets rutiner innen arkivering, saksbehandling og dokumentasjon" },
      { word: "ATO", description: "Air Task Order " },
      { word: "ATS/N", description: "Alliert treningssenter nord" },
      { word: "ATS/S", description: "Alliert treningssenter sør" },
      { word: "ATTK", description: "Attack / Angrep" },
      { word: "ATV", description: "Avdelingstillitsvalgt" },
      { word: "ATV", description: "All Terrain Vehicle" },
      { word: "Aut", description: "Autorisert" },
      { word: "AUV", description: "Autonom undervannsfarkost" },
      { word: "AWACS", description: "Airborne Warning and Control System / Luftbårent varslings - og kontrollsystem" },
      { word: "AWOL", description: "Absent Without Official Leave. Desertering (eller faneflukt) betyr å trekke seg fra en tjeneste eller oppgave, som oftest i forbindelse med militære konflikter der en soldat nekter å kjempe eller rømmer fra militærtjenesten" },
      { word: "AWWC", description: "Anti-Air Warfare Commander" },
      { word: "AXP", description: "Ambulance Exchange Point" },
      { word: "BAJO", description: "Bajonett" },
      { word: "Ball", description: "Ballistikk" },
      { word: "BAS", description: "Bataljonssjef" },
      { word: "BAS", description: "Brigadens Artillerisjef" },
      { word: "BASS", description: "Bataljonsstabssersjant" },
      { word: "BattOff", description: "Batterioffiser" },
      { word: "Bb", description: "Babord" },
      { word: "BB", description: "Basis båndenhet" },
      { word: "BC", description: "Bæsj & Carry / Mobilt toalett" },
      { word: "BDA", description: "Bomb Damage Assessment / Oppsummering av skadeomfang fra felten" },
      { word: "BDA", description: "Battle Damage Assessment / Oppsummering av skadeomfang fra felten" },
      { word: "BDA", description: "Battle Damage Report" },
      { word: "BDR", description: "Battle Damage Repair" },
      { word: "BF", description: "Baseforsvar" },
      { word: "BFF", description: "Beredskapssystemet for Forsvaret" },
      { word: "BFO", description: "Befalets Fellesorganisasjon" },
      { word: "BFSG", description: "Baseforsvar Stridsgruppe" },
      { word: "BFTS", description: "Baseforsvarstaktisk Skole" },
      { word: "BHT", description: "Bedriftshelsetjeneste" },
      { word: "BIP", description: "Blow in place / Ofte brukt i sammenheng med å sprenge IED-er der de ligger for å unngå risikoen av å flytte dem" },
      { word: "BK", description: "Bombekaster / En bombekaster er et lett krumbaneskyts som skyter granater i høy bane mot fienden" },
      { word: "BKI", description: "Avdeling for beskyttelse av kritisk infrastruktur / Avdelingen bidrar til å beskytte Forsvarets infrastruktur gjennom støtte til analyse av sårbarheter, ondsinnet kode og angrep mot Forsvarets systemer. Avdelingen har deployerbare elementer og mulighet til å bistå med rådgivning og liaisonering ved håndtering av trusler og angrep mot norsk infrastruktur ute og hjemme" },
      { word: "BKM", description: "Bærbar kommunikasjonsmodul" },
      { word: "BKP", description: "Bombekaster pansret" },
      { word: "BLUFOR", description: "Blue Forces" },
      { word: "BM", description: "Balansert målstyring / Balansert målstyring er det norske begrepet for strategi og ytelsesmålingsverktøyet Balanced scorecard" },
      { word: "BMF", description: "Bestemmelser for materiellforvaltning i Forsvaret" },
      { word: "BMP", description: "Bamsemumspatrulje / Kjøpe godteri på øvelse" },
      { word: "BMS", description: "Battle management system" },
      { word: "BN", description: "Bataljon / Bataljon (av fransk: batalje) er en taktisk militær enhet. I Norge er den normalt delt opp i tre til fem kompanier. En norsk infanteribataljon består av ca. 500-800 personer. Bataljonssjefen er normalt en offiser med oberstløytnants grad" },
      { word: "BnAss", description: "Bataljonsassistent" },
      { word: "BO", description: "Batterioffiser" },
      { word: "BOS", description: "Bakkeoperativ skvadron" },
      { word: "BRIG", description: "Brigade" },
      { word: "Brig N", description: "Brigaden i Nord-Norge / Brig N var en norsk hæravdeling dannet da Tysklandsbrigaden ble trukket hjem i 1953. Brigaden var i mange år en hovedkomponent i landforsvaret, spesielt invasjonsforsvaret mønstret mot Sovjetunionen. Avdelingen ble lagt ned i 1995. Ikke til å forveksle med dagens Brigade Nord" },
      { word: "BRP", description: "Brann-, rednings- og plasstjeneste" },
      { word: "BS", description: "Beredskapsstilling" },
      { word: "BSA", description: "Brigade Support Area" },
      { word: "Btt", description: "Artilleribatteri / Et batteri er en militær enhet innen artilleri, på nivå med kompani og eskadron i andre våpenarter. Et batteri består typisk av to til tre tropper samt et lite hovedkvarter for ledelse og logistikk. Flere batterier dannet et regiment eller en bataljon" },
      { word: "BttO", description: "Batteri Olga / Ett av tre kanonbatterier i Artilleribataljonen" },
      { word: "BTV", description: "Bataljontillitsvalgt" },
      { word: "BUFS", description: "Befal uten fast stilling" },
      { word: "BUS", description: "Befal Uten Stilling" },
      { word: "BV", description: "Beltevogn / Lett terrenggående beltekjøretøy" },
      { word: "BVR", description: "Beyond Visual Range" }
    ],
    promocards: [
      {
        title: "2011",
        decoration: {
          icon: {
            src: require("@/assets/images/medalje.svg")
          },
          caption: "Post Mortem"
        },
        text: "Trond André Bolle"
      },
      {
        title: "02",
        text: "De fleste konflikter krever territoriell kontroll ved nærvær av soldater på bakken og her har Hæren den viktigste rollen."
      },
      {
        title: "03",
        text: "De fleste konflikter krever territoriell kontroll ved nærvær av soldater på bakken og her har Hæren den viktigste rollen."
      }
    ],
    soundIcons: {
      off: require("@/assets/images/sound-off.svg"),
      on: require("@/assets/images/sound-on.svg")
    },
    stories: [
      {
        title: "Hæren",
        profilePic: "https://s3.amazonaws.com/idme-wordpress-military/wp-content/uploads/2016/03/30093822/9e59fb402b777f6ba30668ad38ef9640_original.png",
        storyItems: [
          {
            type: "image",
            image: "https://lovdata.no/static/image/637/forsvaret_slitensoldat.jpg"
          }
        ]
      },
      {
        title: "Sjøforsvaret",
        profilePic: "https://images.dn.no/image/cDVHKytINUZRNmtoTnUrYWpJNXF1WGRYSFVqVG9NeGNxZFIwTk9IWGxBaz0=/nhst/binary/7288c27075eb527a34b284bb2569f689?image_version=800",
        storyItems: [
          {
            type: "video",
            qbrick: {
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
                }
              }
            }
          }
        ]
      }
    ]
  })
};
</script>
