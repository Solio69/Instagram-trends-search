# Проверка: Рефакторинг активного разбора ниши

| Статус | Команда / проверка | Результат |
|---|---|---|
| Blocked | `node --experimental-strip-types --test tests/*.test.mjs` до правок | Текущий sandbox завершил запуск с `spawn EPERM` до выполнения тестов. |
| Passed | `node --experimental-strip-types --test --test-isolation=none tests/*.test.mjs` до правок | 13/13 тестов прошли; отключена только изоляция процессов тестового раннера. |
| Passed | `node --experimental-strip-types --test --test-isolation=none tests/*.test.mjs` после правок | 13/13 тестов прошли. |
| Blocked | `npm run build` в sandbox | Сборка остановилась на `spawn EPERM` до компиляции. |
| Passed | `npm run build` с разрешением на дочерние процессы | Next.js собрал страницу и Route Handler, TypeScript прошёл. |
| Passed | `GET /` на `localhost:3000` | HTTP 200; HTML содержит форму. Первая попытка `Invoke-WebRequest` без `-UseBasicParsing` завершилась локальной ошибкой PowerShell, после добавления флага проверка прошла. |
| Passed | `POST /api/niche/normalize` с пустой нишей | HTTP 400, как до рефакторинга. |
| Passed | `POST /api/niche/normalize` с `healthy` | HTTP 200; получены группы ЗОЖ, фитнеса и питания. |
| Failed | Первая проба узкой ниши через PowerShell/`node -e` | Сначала возникла ошибка кавычек; следующая проба исказила кириллицу при передаче в Node. Эти ответы не считались проверкой нужной фразы. |
| Passed | `POST /api/niche/normalize` с корректно закодированным `фитнес и тренировки` | HTTP 200; получены только группы «фитнес» и «тренировки». |
| Blocked | Визуальная проверка формы после правок | Browser access host недоступен для CUA; локальные HTML и HTTP-маршрут проверены отдельно. |
| Passed | Проверка `.next/static`, `.env.local`, diff и состава файлов | Фактический ключ, URL OpenRouter и ID модели отсутствуют в клиентском бандле; `.env.local` игнорируется Git; `git diff --check` прошёл с предупреждениями лишь о CRLF; демо-список и зависимости не менялись. |
| Passed | Повторная проверка после замечаний ревью: `npx tsc --noEmit` | Типизация прошла после локального `isLoading` в `SearchPanel` и деструктуризации `FORMALIZATION_COPY`. |
| Passed | `git diff --check -- app/components/formalization/FormalizationPanel/FormalizationPanel.tsx app/components/search/SearchPanel/SearchPanel.tsx` | Ошибок форматирования нет; Git предупредил только о преобразовании LF в CRLF. |

Изменения оставлены без коммита в ветке `003-niche-normalization`.
