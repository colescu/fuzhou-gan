<script setup>
  import Pronunciation from '/src/components/Pronunciation.vue'
</script>

# 撫州與撫州話

本站記錄「[phrase [撫]{fu3}[州]{tju1}[話]{fa6}]」，即流通於[phrase [江]{koŋ1}[西]{ɕi1}]省撫州市市區（位於[phrase [臨]{tin2}[川]{tʰon1}]區）的[贛]{kon5}語方言。文獻中撫州話也稱「臨川話」，但後者現在通常指[phrase [上]{soŋ6}[頓]{tun0}[渡]{tʰu6}]鎮的方言，與市區方言有細微差別。撫州話與[phrase [南]{lan2}[昌]{tʰoŋ1}]話可大體互通。

<figure>
  <img src="/assets/撫州位置.svg" width="200" alt="撫州位置" class="border" />
  <figcaption>撫州在地圖上的位置</figcaption>
</figure>

撫州自古人傑地靈，素有「才子之鄉」美譽。唐宋文壇八大家，撫州獨佔其二——[phrase [王]{woŋ2}[安]{ŋon1}[石]{saʔ8}]、[phrase [曾]{tsɛn1}[鞏]{kuŋ3}]。此外，[phrase [晏]{ŋan5}[殊]{su2}]、[phrase [晏]{ŋan5}[幾]{tɕi1}[道]{tʰau6}]、[phrase [陸]{tjuʔ8}[九]{tɕju3}[淵]{ɥon1}]、[phrase [湯]{tʰoŋ1}[顯]{ɕjɛn3}[祖]{tsu3}]……歷史上的撫州才子各領風騷。值得一提的是，《廣韻》主編陳彭年亦是撫州人。

然而今時不同往日。作爲撫州的重要文化遺產，今日之撫州話雖未絕於耳，然頹勢已顯。一方面，[城]{saŋ2}裏年輕人使用撫州話的場合極少，「[phrase [會]{woi6}[聽]{tʰjaŋ1}[不]{put7}[會]{woi6}[講]{koŋ3}]」的不在少數。另一方面，中老年人即使慣用撫州話交談，其音韻也已受普通話侵蝕，不少字正音散佚。

# 記錄撫州話

筆者製作本站，其意有三：

一、爲撫州話正音、正字<br />
二、爲撫州人瞭解音韻學提供便利<br />
三、爲其他人瞭解撫州話提供渠道

筆者是千禧年后出生的撫州人，以普通話爲母語，撫州話則是自幼耳濡目染而習得的。筆者的記音原則是，盡可能去除普通話影響，但不保留中青年已經消失的對立。一言以蔽之，可以說是「盡力存古的新派發音」。

本站記音使用國際音標（簡稱「音標」）與本人基於普通話拼音擬定的撫州話拼音（簡稱「拼音」）。爲避免混淆，拼音以斜體顯示。偏好可點擊右下角設置。以下爲示例：

<div class="center" style="font-size: 1.5em">
  巧&nbsp;&nbsp;
  <ruby class="under">
    <Pronunciation :pronunciation="'tɕʰjau3'" :phoneticAlphabet="'pinyin'" />
    <rt>拼音</rt>
  </ruby>&nbsp;&nbsp;
  <ruby class="under">
    <Pronunciation :pronunciation="'tɕʰjau3'" :phoneticAlphabet="'ipa'" />
    <rt>音標</rt>
  </ruby>
</div>

歡迎探索本站内容！

# 關於本站

本站爲靜態網站，基於 Vue 3 & TypeScript 構建，使用了 [Naive UI](https://www.naiveui.com/zh-CN/os-theme) 的組件，部署於 [GitHub Pages](https://pages.github.com) ，[代碼開源](https://github.com/colescu/fuzhou-gan)。

關於本站使用的數據庫，詳見[後端倉庫](https://github.com/colescu/fuzhou-gan-backend)。

若有意見或建議，請直接聯係[作者](https://colescu.github.io)。

<style scoped>
  .under {
    ruby-position: under;
  }

  .under rt {
    font-size: 0.6em;
    text-align: center;
    margin-top: 0.4em;
  }
</style>
