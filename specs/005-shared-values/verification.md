# Проверка: общие значения и тестовые данные

| Статус | Проверка | Результат |
|---|---|---|
| Passed | До расширения рефакторинга: `node --experimental-strip-types --test --test-isolation=none tests/*.test.mjs` | 13/13 тестов прошли. |
| Failed | Первый запуск тестов после импорта общего JSON-заголовка | Node не разрешил импорт TypeScript без расширения (`ERR_MODULE_NOT_FOUND`); это ошибка разрешения модуля, тестовые сценарии не выполнялись. |
| Failed | `npx tsc --noEmit` после добавления расширения `.ts` в импорт | TS5097: требовался `allowImportingTsExtensions`. Добавлен параметр при уже существующем `noEmit`; повторная проверка прошла. |
| Passed | Итоговый `npx tsc --noEmit` | Ошибок нет. |
| Passed | Итоговый `node --experimental-strip-types --test --test-isolation=none tests/*.test.mjs` | 13/13 тестов прошли; Node предупредил только о типе модуля `package.json`. |
| Passed | `npm run build` | Next.js собрал страницу и Route Handler, TypeScript прошёл. Для дочерних процессов сборка запущена с разрешением вне sandbox, как в предыдущем проходе. |
| Passed | `rg` по `as copy`, `_COPY.`, повторённым `Content-Type` и `Cache-Control` | Обращений `copy.*` в компонентах и повторённых литералов заголовков в коде нет. Динамические отображения `LOADING_COPY[stage]` и метрик сохранены. |
| Passed | Проверка `.next/static` | Ключ OpenRouter и URL провайдера не попали в клиентский бандл; значение ключа не выводилось. |
| Passed | `git diff --check` | Ошибок форматирования нет; предупреждения касаются только преобразования LF в CRLF. |
| Passed | Повторная проверка после замечаний по `FormalizationPanel`, `TopicCard`, `Hero`, `KeywordFilter`, `PostRow` | `npx tsc --noEmit` без ошибок; 13/13 тестов прошли; `npm run build` собрал страницу и маршрут; целевой `git diff --check` без ошибок, кроме предупреждений LF/CRLF. |

Логика, API-контракт и тексты не изменены. Работа оставлена без коммита в ветке `003-niche-normalization`.

## Проверка после расширения ревью

| Статус | Проверка | Результат |
|---|---|---|
| Passed | `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` | Папка `specs/005-shared-values` и `tasks.md` найдены. |
| Failed | Первый `npx tsc --noEmit` после прямого `lodash/isObjectLike` | Типы Lodash не сузили `unknown` для оператора `in`; добавлен `isObjectLikeRecord`, повторная проверка прошла. |
| Failed | Первый `npx tsc --noEmit` после прямого доступа к `NICHE_API_FIELD.ERROR` | Повторное индексирование `unknown` не сохранило сужение типа; значение ошибки сохранено локально и проверено через `isPrimitiveString`. |
| Passed | Финальный `npx tsc --noEmit` | Ошибок нет. |
| Passed | Финальный `node --experimental-strip-types --test --test-isolation=none tests/*.test.mjs` | 13/13 тестов прошли; Node предупредил о типе модуля в `package.json`. |
| Passed | Финальный `npm run build` | Next.js собрал страницу и Route Handler, TypeScript прошёл. |
| Passed | Одноразовая проверка крайних значений | `new String("фитнес")` отклоняется как `INVALID_INPUT`, `Infinity` нормализуется в лимит 50. |
| Passed | `git diff --check` | Ошибок форматирования нет; только предупреждения о LF/CRLF. |

Реальный запрос к OpenRouter не выполнялся; проверялся прежний HTTP-контракт с моковым `fetcher` в тестах. Изменения оставлены без коммита.
