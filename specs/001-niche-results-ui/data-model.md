# Модель данных интерфейса

`Post`: URL публикации, `contentType`, краткая `caption`, `username`, `publishedAt`, `likeCount`, `commentCount`, `shareCount`, `matchedTerms`, `discoveryType`, `discoveryQuery`.

`ResultsOptions`: `periodDays` ∈ {1,3,7}, `contentFilter` ∈ {all,reel,post}, `limit` ∈ [1,50], `sortBy` ∈ {likeCount, commentCount, shareCount, publishedAt}, `keywords` — массив отмеченных терминов из примера разбора. Пустой массив означает отсутствие фильтра; непустой объединяется по «ИЛИ». `post` включает `image` и `carousel`.

`FormalizationExample`: исходная фраза и список тем с поисковыми терминами. Никакой запрос к модели в этой задаче не выполняется.

`Export`: источник и время снимка, текущие параметры, массив отображаемых `Post`.
