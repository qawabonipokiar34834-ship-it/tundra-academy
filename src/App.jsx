import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, Code, Terminal, Play, CheckCircle, 
  Lock, Zap, Hammer, Coins, 
  ArrowLeft, User, ShoppingBag, 
  Database, Cpu, Gift, AlertTriangle, Copy, Check,
  Skull, Crown, Scroll, Shield, Ghost, Server, Wifi, Layers
} from 'lucide-react';

// --- УЧЕБНЫЙ ПЛАН (CURRICULUM) ---

const MODULES = [
  {
    id: 'm1',
    title: 'Модуль 1: C# Foundation',
    icon: Book,
    reqLevel: 1,
    desc: 'Основы языка C#. Фундамент для любой разработки.',
    chapters: [
      {
        id: 'c1_1',
        title: 'Переменные и Типы',
        lessons: [{
          id: 'l1_1', title: 'Примитивы (int, float, bool)', type: 'lesson',
          theory: 'В C# строгая типизация. Rust API требует точности.\n`int` - целые числа (ID предмета).\n`float` - дробные (Здоровье 100.0f). Обязательно `f`!\n`bool` - логика (true/false).',
          usage: '`player.health` (float), `item.amount` (int), `player.IsAdmin` (bool)',
          syntax: 'int amount = 1;\nfloat hp = 100.0f;\nbool active = true;',
          task: 'Объявите `float speed` равный 5.5f и `bool isRunning` равный true.',
          initialCode: `void Init() {\n    // Ваш код\n}`,
          check: (c) => c.includes('float speed') && c.includes('5.5f') && c.includes('bool isRunning') && c.includes('true'),
          reward: { xp: 50, scrap: 10 }
        }]
      },
      {
        id: 'c1_2',
        title: 'Логика и Условия',
        lessons: [{
          id: 'l1_2', title: 'If / Else / Switch', type: 'lesson',
          theory: 'Сервер должен принимать решения. `if` позволяет ветвить код.',
          usage: 'Проверка прав админа, проверка баланса.',
          syntax: 'if (x > 10) { ... } else { ... }',
          task: 'Создайте переменную `int ammo = 0`. Если ammo равно 0, выведите "Empty".',
          initialCode: `void Reload() {\n    int ammo = 0;\n    // Напишите условие\n}`,
          check: (c) => c.includes('if') && c.includes('ammo == 0') && c.includes('"Empty"'),
          reward: { xp: 60, scrap: 15 }
        }]
      },
      {
        id: 'c1_3',
        title: 'Циклы (Loops)',
        lessons: [{
          id: 'l1_3', title: 'Foreach Loop', type: 'lesson',
          theory: 'Циклы позволяют пройтись по списку объектов. `foreach` - самый частый цикл в Rust.',
          usage: 'Выдать всем игрокам предмет, убить всех NPC.',
          syntax: 'foreach (var player in BasePlayer.activePlayerList) { ... }',
          task: 'Пройдитесь циклом по списку `players` и выведите имя каждого.',
          initialCode: `void CheckPlayers(List<BasePlayer> players) {\n    // Напишите цикл foreach\n}`,
          check: (c) => c.includes('foreach') && c.includes('in players') && c.includes('Puts'),
          reward: { xp: 70, scrap: 20 }
        }]
      },
      {
        id: 'c1_4',
        title: 'Коллекции',
        lessons: [{
          id: 'l1_4', title: 'Dictionary (Словари)', type: 'lesson',
          theory: '`Dictionary<Key, Value>` хранит пары данных. Это база для экономики и статистики.',
          usage: 'Хранение баланса: ID игрока (ulong) -> Деньги (int).',
          syntax: 'Dictionary<ulong, int> balance = new Dictionary<ulong, int>();',
          task: 'Объявите словарь `kits` где ключ string, а значение int.',
          initialCode: `void Init() {\n    // Ваш код\n}`,
          check: (c) => c.includes('Dictionary<string, int>') || c.includes('Dictionary<string,int>'),
          reward: { xp: 80, scrap: 25 }
        }]
      },
      {
        id: 'c1_5',
        title: 'Методы',
        lessons: [{
          id: 'l1_5', title: 'Return Types', type: 'lesson',
          theory: 'Методы могут возвращать значения. `void` - пустота.',
          usage: 'Метод `GetKills(player)` возвращает число.',
          syntax: 'int GetX() { return 10; }',
          task: 'Напишите метод `GetName`, возвращающий строку "Tundra".',
          initialCode: `// Ваш метод здесь\n`,
          check: (c) => c.includes('string GetName') && c.includes('return "Tundra"'),
          reward: { xp: 90, scrap: 30 }
        }]
      },
      {
        id: 'exam1',
        title: 'ЭКЗАМЕН: Data Analyzer',
        type: 'exam',
        desc: 'Напишите калькулятор урона.',
        theory: 'ЗАДАНИЕ:\n1. Создайте метод `float CalcDamage(float baseDmg, float armor)`.\n2. Логика: верните `baseDmg - armor`.\n3. Если броня больше урона, верните 0 (используйте if).',
        usage: 'Базовая математика боевой системы.',
        syntax: '// Думайте как инженер.',
        task: 'Реализуйте метод расчета урона.',
        initialCode: `class CombatSystem : RustPlugin\n{\n    // Напишите метод CalcDamage\n}`,
        check: (c) => c.includes('float CalcDamage') && c.includes('return') && c.includes('-'),
        reward: { xp: 500, scrap: 100, trophy: 'Junior Dev' }
      }
    ]
  },
  {
    id: 'm2',
    title: 'Модуль 2: Oxide Framework',
    icon: Terminal,
    reqLevel: 2,
    desc: 'Работа с API сервера. Команды, права, логи.',
    chapters: [
      {
        id: 'c2_1',
        title: 'Плагин',
        lessons: [{
          id: 'l2_1', title: 'Атрибуты [Info]', type: 'lesson',
          theory: 'Каждый плагин должен иметь "Паспорт".',
          usage: 'Версионирование, авторство.',
          syntax: '[Info("Title", "Author", "1.0.0")]',
          task: 'Добавьте атрибут Info с названием "BestPlugin".',
          initialCode: `namespace Oxide.Plugins\n{\n    // Добавьте атрибут\n    class BestPlugin : RustPlugin {} \n}`,
          check: (c) => c.includes('[Info') && c.includes('"BestPlugin"'),
          reward: { xp: 50, scrap: 10 }
        }]
      },
      {
        id: 'c2_2',
        title: 'Логирование',
        lessons: [{
          id: 'l2_2', title: 'Puts & PrintWarning', type: 'lesson',
          theory: '`Puts` пишет в консоль сервера. `PrintWarning` пишет желтым.',
          usage: 'Отладка кода. Если код не работает - расставьте Puts.',
          syntax: 'Puts($"Player {player.displayName} connected");',
          task: 'Выведите в консоль "Server Started" через Puts.',
          initialCode: `void Init() {\n    // Ваш код\n}`,
          check: (c) => c.includes('Puts("Server Started")'),
          reward: { xp: 60, scrap: 15 }
        }]
      },
      {
        id: 'c2_3',
        title: 'Чат',
        lessons: [{
          id: 'l2_3', title: 'ChatCommand', type: 'lesson',
          theory: 'Регистрация команд чата.',
          usage: '/kit, /tp, /home.',
          syntax: '[ChatCommand("help")]\nvoid CmdHelp(BasePlayer p, string c, string[] a) {}',
          task: 'Создайте команду "rules".',
          initialCode: `// Команда rules\n`,
          check: (c) => c.includes('[ChatCommand("rules")]') && c.includes('void'),
          reward: { xp: 70, scrap: 20 }
        }]
      },
      {
        id: 'c2_4',
        title: 'Права (Perms)',
        lessons: [{
          id: 'l2_4', title: 'Register & Check', type: 'lesson',
          theory: 'Пермишены нужно регистрировать в `Init` и проверять в коде.',
          usage: 'VIP доступ, Админ меню.',
          syntax: 'permission.RegisterPermission("myplugin.use", this);\npermission.UserHasPermission(id, "myplugin.use")',
          task: 'В Init зарегистрируйте право "tundra.vip".',
          initialCode: `void Init() {\n    // Регистрация\n}`,
          check: (c) => c.includes('permission.RegisterPermission') && c.includes('"tundra.vip"'),
          reward: { xp: 80, scrap: 25 }
        }]
      },
      {
        id: 'c2_5',
        title: 'Локализация',
        lessons: [{
          id: 'l2_5', title: 'Lang API', type: 'lesson',
          theory: 'Не пишите текст хардкодом! Используйте Lang API для перевода (RU/EN).',
          usage: 'Поддержка игроков из разных стран.',
          syntax: 'lang.RegisterMessages(new Dictionary<string, string> { ["Msg"] = "Hello" }, this);',
          task: 'Зарегистрируйте сообщение "Welcome" с текстом "Привет".',
          initialCode: `void Init() {\n    // lang.RegisterMessages...\n}`,
          check: (c) => c.includes('lang.RegisterMessages') && c.includes('"Welcome"') && c.includes('"Привет"'),
          reward: { xp: 90, scrap: 30 }
        }]
      },
      {
        id: 'exam2',
        title: 'ЭКЗАМЕН: Admin Tools',
        type: 'exam',
        desc: 'Плагин админской проверки.',
        theory: 'ЗАДАНИЕ:\n1. Создайте чат-команду "check".\n2. Внутри проверьте, есть ли у игрока право "admin.check".\n3. Если нет - отправьте сообщение "No Access".',
        usage: 'Защита админских функций.',
        syntax: '// Права решают всё.',
        task: 'Напишите команду с защитой.',
        initialCode: `// Команда check\n`,
        check: (c) => c.includes('[ChatCommand("check")]') && c.includes('permission.UserHasPermission') && c.includes('"admin.check"'),
        reward: { xp: 600, scrap: 150, trophy: 'Oxide Specialist' }
      }
    ]
  },
  {
    id: 'm3',
    title: 'Модуль 3: Unity & World',
    icon: Hammer,
    reqLevel: 3,
    desc: 'Взаимодействие с миром Rust. Игроки, Сущности, Урон.',
    chapters: [
      {
        id: 'c3_1',
        title: 'BasePlayer',
        lessons: [{
          id: 'l3_1', title: 'Player Object', type: 'lesson',
          theory: '`BasePlayer` - главный класс. Содержит инвентарь, здоровье, позицию.',
          usage: 'Телепортация, лечение, выдача предметов.',
          syntax: 'player.Heal(100f);\nplayer.Teleport(newPosition);',
          task: 'Напишите строку кода, которая убивает игрока (`Kill()`).',
          initialCode: `void Punish(BasePlayer player) {\n    // Убейте игрока\n}`,
          check: (c) => c.includes('player.Kill()'),
          reward: { xp: 60, scrap: 15 }
        }]
      },
      {
        id: 'c3_2',
        title: 'Hooks: Connect',
        lessons: [{
          id: 'l3_2', title: 'OnPlayerConnected', type: 'lesson',
          theory: 'Вызывается, когда игрок зашел и проснулся.',
          usage: 'Приветственное сообщение, выдача стартового кита.',
          syntax: 'void OnPlayerConnected(BasePlayer player) { ... }',
          task: 'При входе игрока выведите его SteamID (`UserIDString`) в консоль.',
          initialCode: `void OnPlayerConnected(BasePlayer player) {\n    // Puts с ID игрока\n}`,
          check: (c) => c.includes('Puts') && c.includes('player.UserIDString'),
          reward: { xp: 70, scrap: 20 }
        }]
      },
      {
        id: 'c3_3',
        title: 'Hooks: Combat',
        lessons: [{
          id: 'l3_3', title: 'OnEntityTakeDamage', type: 'lesson',
          theory: 'Срабатывает при получении урона кем угодно (игроком, стеной, вертолетом).',
          usage: 'God Mode, PVE зоны, изменение урона оружия.',
          syntax: 'void OnEntityTakeDamage(BaseCombatEntity entity, HitInfo info)',
          task: 'Если `entity` это `BasePlayer`, обнулите урон (`info.damageTypes.ScaleAll(0f)`).',
          initialCode: `void OnEntityTakeDamage(BaseCombatEntity entity, HitInfo info) {\n    if (entity is BasePlayer) {\n        // Отмените урон\n    }\n}`,
          check: (c) => c.includes('info.damageTypes.ScaleAll(0f)'),
          reward: { xp: 80, scrap: 25 }
        }]
      },
      {
        id: 'c3_4',
        title: 'Inventory',
        lessons: [{
          id: 'l3_4', title: 'Give Item', type: 'lesson',
          theory: 'Выдача предметов через `ItemManager`.',
          usage: 'Киты, награды за ивенты.',
          syntax: 'player.inventory.GiveItem(ItemManager.CreateByName("rifle.ak", 1));',
          task: 'Выдайте игроку 1000 "wood".',
          initialCode: `void GiveWood(BasePlayer player) {\n    // Выдача дерева\n}`,
          check: (c) => c.includes('CreateByName("wood", 1000)') && c.includes('GiveItem'),
          reward: { xp: 90, scrap: 30 }
        }]
      },
      {
        id: 'c3_5',
        title: 'Raycast',
        lessons: [{
          id: 'l3_5', title: 'Looking At', type: 'lesson',
          theory: 'Определение того, куда смотрит игрок.',
          usage: 'Команда /remove, информация об объекте.',
          syntax: 'Physics.Raycast(player.eyes.HeadRay(), out hit)',
          task: 'Проверьте рейкаст и если попали - выведите "Hit".',
          initialCode: `void CheckLook(BasePlayer player) {\n    RaycastHit hit;\n    // if (Physics.Raycast...) Puts("Hit");\n}`,
          check: (c) => c.includes('Physics.Raycast') && c.includes('out hit'),
          reward: { xp: 100, scrap: 35 }
        }]
      },
      {
        id: 'exam3',
        title: 'ЭКЗАМЕН: Vampire',
        type: 'exam',
        desc: 'Лечение при убийстве.',
        theory: 'ЗАДАНИЕ:\n1. Хук `OnEntityDeath`.\n2. Проверьте, что `info.Initiator` это игрок.\n3. Полечите убийцу на 10hp.',
        usage: 'RPG механики.',
        syntax: 'var killer = info.Initiator as BasePlayer;',
        task: 'Реализуйте вампиризм.',
        initialCode: `void OnEntityDeath(BaseCombatEntity entity, HitInfo info)\n{\n    // Код вампира\n}`,
        check: (c) => c.includes('info.Initiator as BasePlayer') && c.includes('Heal'),
        reward: { xp: 800, scrap: 200, trophy: 'Unity Master' }
      }
    ]
  },
  {
    id: 'm4',
    title: 'Модуль 4: Advanced Logic',
    icon: Database,
    reqLevel: 4,
    desc: 'Таймеры, Конфиги, Данные, WebRequests.',
    chapters: [
      {
        id: 'c4_1',
        title: 'Таймеры',
        lessons: [{
          id: 'l4_1', title: 'Timer.Once & Repeat', type: 'lesson',
          theory: 'Выполнение кода с задержкой.',
          usage: 'Телепортация через 5 сек, начисление очков каждую минуту.',
          syntax: 'timer.Once(5f, () => { ... });',
          task: 'Запустите таймер на 10 секунд, который пишет "Boom".',
          initialCode: `void StartBomb() {\n    // Таймер\n}`,
          check: (c) => c.includes('timer.Once(10f') && c.includes('"Boom"'),
          reward: { xp: 80, scrap: 20 }
        }]
      },
      {
        id: 'c4_2',
        title: 'Конфигурация',
        lessons: [{
          id: 'l4_2', title: 'Config File', type: 'lesson',
          theory: 'Плагины не должны иметь "магических чисел". Всё выносим в конфиг.',
          usage: 'Настройка рейтов, префиксов чата.',
          syntax: 'Config["Rate"] = 5;',
          task: 'Получите значение "Rate" из конфига в переменную `int rate`. Не забудьте `(int)`.',
          initialCode: `void Init() {\n    // int rate = ...\n}`,
          check: (c) => c.includes('(int)Config["Rate"]'),
          reward: { xp: 90, scrap: 25 }
        }]
      },
      {
        id: 'c4_3',
        title: 'DataFiles',
        lessons: [{
          id: 'l4_3', title: 'JSON Storage', type: 'lesson',
          theory: 'Oxide позволяет сохранять данные в .json файлы в папке oxide/data.',
          usage: 'Сохранение кланов, уровней RPG, статистики.',
          syntax: 'Interface.Oxide.DataFileSystem.WriteObject("MyFile", data);',
          task: 'Сохраните объект `myStats` в файл "Stats".',
          initialCode: `void SaveData() {\n    var myStats = new List<string>();\n    // Сохранение\n}`,
          check: (c) => c.includes('WriteObject') && c.includes('"Stats"'),
          reward: { xp: 100, scrap: 30 }
        }]
      },
      {
        id: 'c4_4',
        title: 'WebRequests',
        lessons: [{
          id: 'l4_4', title: 'Discord Webhook', type: 'lesson',
          theory: 'Отправка данных на внешние сайты (Discord, PHP скрипты).',
          usage: 'Логи рейдов в дискорд, синхронизация доната.',
          syntax: 'webrequest.Enqueue(url, body, (code, response) => { ... }, this);',
          task: 'Напишите заготовку запроса на "google.com".',
          initialCode: `void SendRequest() {\n    // webrequest.Enqueue...\n}`,
          check: (c) => c.includes('webrequest.Enqueue') && c.includes('"google.com"'),
          reward: { xp: 110, scrap: 40 }
        }]
      },
      {
        id: 'c4_5',
        title: 'GUI (Cui)',
        lessons: [{
          id: 'l4_5', title: 'CuiHelper', type: 'lesson',
          theory: 'Отрисовка интерфейсов на экране игрока. Использует JSON структуру.',
          usage: 'Инфо-панели, логотип сервера, меню.',
          syntax: 'CuiHelper.AddUi(player, json);',
          task: 'Уничтожьте UI с названием "MyPanel" (`CuiHelper.DestroyUi`).',
          initialCode: `void CloseUi(BasePlayer player) {\n    // DestroyUi\n}`,
          check: (c) => c.includes('CuiHelper.DestroyUi') && c.includes('"MyPanel"'),
          reward: { xp: 120, scrap: 50 }
        }]
      },
      {
        id: 'exam4',
        title: 'ЭКЗАМЕН: Cooldowns',
        type: 'exam',
        desc: 'Система кулдаунов.',
        theory: 'ЗАДАНИЕ:\n1. Есть словарь `cooldowns<ulong, float>`.\n2. При команде проверьте: если текущее время (`Time.realtimeSinceStartup`) меньше записанного - `return`.\n3. Если больше - обновите запись (время + 60 сек).',
        usage: 'Ограничение частоты команд.',
        syntax: 'Time.realtimeSinceStartup',
        task: 'Реализуйте проверку кулдауна.',
        initialCode: `Dictionary<ulong, float> cds = new Dictionary<ulong, float>();\nvoid CmdKit(BasePlayer p)\n{\n    // Логика проверки\n}`,
        check: (c) => c.includes('Time.realtimeSinceStartup') && c.includes('return'),
        reward: { xp: 1000, scrap: 300, trophy: 'Backend Engineer' }
      }
    ]
  },
  {
    id: 'm5',
    title: 'Модуль 5: Senior Architect',
    icon: Layers,
    reqLevel: 5,
    desc: 'Оптимизация, LINQ, Harmony, Coroutines.',
    chapters: [
      {
        id: 'c5_1',
        title: 'LINQ',
        lessons: [{
          id: 'l5_1', title: 'Querying Lists', type: 'lesson',
          theory: 'LINQ позволяет фильтровать списки одной строкой.',
          usage: 'Найти всех админов, найти ближайшего игрока.',
          syntax: 'var admins = players.Where(p => p.IsAdmin).ToList();',
          task: 'Используя LINQ, найдите игроков с hp < 50 (`Where(p => p.health < 50)`).',
          initialCode: `void FindLowHp(List<BasePlayer> all) {\n    // var targets = ...\n}`,
          check: (c) => c.includes('.Where') && c.includes('p.health < 50'),
          reward: { xp: 100, scrap: 30 }
        }]
      },
      {
        id: 'c5_2',
        title: 'Optimization',
        lessons: [{
          id: 'l5_2', title: 'Caching & GC', type: 'lesson',
          theory: 'Не используйте `GetComponent` в `Update`. Это вызывает лаги. Кешируйте данные.',
          usage: 'Высоконагруженные плагины.',
          syntax: 'private Dictionary<ulong, PlayerData> cache;',
          task: 'Создайте словарь для кеша `cache`.',
          initialCode: `class OptPlugin : RustPlugin {\n    // Объявите кеш\n}`,
          check: (c) => c.includes('Dictionary<ulong, PlayerData> cache'),
          reward: { xp: 110, scrap: 35 }
        }]
      },
      {
        id: 'c5_3',
        title: 'Coroutines',
        lessons: [{
          id: 'l5_3', title: 'IEnumerator', type: 'lesson',
          theory: 'Корутины позволяют выполнять задачу частями, не замораживая сервер.',
          usage: 'Загрузка больших данных, спавн тысячи ботов.',
          syntax: 'yield return new WaitForSeconds(1f);',
          task: 'Напишите `yield return null` для пропуска кадра.',
          initialCode: `IEnumerator Job() {\n    // Пропуск кадра\n}`,
          check: (c) => c.includes('yield return null'),
          reward: { xp: 120, scrap: 40 }
        }]
      },
      {
        id: 'c5_4',
        title: 'Harmony',
        lessons: [{
          id: 'l5_4', title: 'Patching Code', type: 'lesson',
          theory: 'Oxide хуки ограничены. Harmony позволяет менять ЛЮБОЙ метод игры.',
          usage: 'Изменение отдачи, физики, приватных методов.',
          syntax: '[HarmonyPatch(typeof(BasePlayer), "OnDisconnected")]',
          task: 'Укажите патч на класс `BasePlayer`.',
          initialCode: `[HarmonyPatch(typeof(BasePlayer), "Metod")]\nclass MyPatch { }`,
          check: (c) => c.includes('typeof(BasePlayer)'),
          reward: { xp: 200, scrap: 100 }
        }]
      },
      {
        id: 'c5_5',
        title: 'Entity Management',
        lessons: [{
          id: 'l5_5', title: 'Prefab Spawning', type: 'lesson',
          theory: 'Спавн объектов через `GameManager`.',
          usage: 'Ивенты, кастомные постройки.',
          syntax: 'GameManager.server.CreateEntity(prefabPath, pos).Spawn();',
          task: 'Вызовите метод `.Spawn()` для сущности.',
          initialCode: `void SpawnBox(string prefab) {\n    var ent = GameManager.server.CreateEntity(prefab);\n    // Спавн\n}`,
          check: (c) => c.includes('.Spawn()'),
          reward: { xp: 150, scrap: 50 }
        }]
      },
      {
        id: 'exam5',
        title: 'ЭКЗАМЕН: The Architect',
        type: 'exam',
        desc: 'Финальный тест. Событийная система.',
        theory: 'ЗАДАНИЕ:\n1. Метод `StartEvent`.\n2. В нем: `foreach` по игрокам.\n3. Каждому отправить UI (`CuiHelper.AddUi`).\n4. Запустить таймер на 60сек для окончания.',
        usage: 'Автоматический ивент "Голодные Игры".',
        syntax: 'Combine everything.',
        task: 'Напишите структуру ивента.',
        initialCode: `void StartEvent()\n{\n    // 1. Loop players\n    // 2. UI\n    // 3. Timer\n}`,
        check: (c) => c.includes('foreach') && c.includes('CuiHelper.AddUi') && c.includes('timer.Once'),
        reward: { xp: 2000, scrap: 1000, trophy: 'TUNDRA SENIOR DEV' }
      }
    ]
  }
];

// --- МАГАЗИН ---

const STORE_ITEMS = [
  { id: 'bp_kit', category: 'blueprint', rarity: 'common', title: 'BP: Starter', desc: 'Выдача камня и факела.', cost: 100, value: 'player.inventory.GiveItem(ItemManager.CreateByName("rock", 1));' },
  { id: 'bp_kill', category: 'blueprint', rarity: 'rare', title: 'BP: Kill Self', desc: 'Команда суицида.', cost: 200, value: 'player.Kill();' },
  { id: 'bp_heal', category: 'blueprint', rarity: 'rare', title: 'BP: Heal Command', desc: '/heal implementation', cost: 300, value: 'player.Heal(100f);' },
  { id: 'bp_tp', category: 'blueprint', rarity: 'epic', title: 'BP: Teleport', desc: 'Телепортация к координатам.', cost: 500, value: 'player.Teleport(new Vector3(0,0,0));' },
  { id: 'skin_tundra', category: 'skin', rarity: 'epic', title: 'Skin: Tundra', desc: 'Темно-зеленая тема.', cost: 500, type: 'theme', value: 'tundra' },
  { id: 'skin_matrix', category: 'skin', rarity: 'legendary', title: 'Skin: Matrix', desc: 'Код течет в тебе.', cost: 1000, type: 'theme', value: 'matrix' },
  { id: 'cheat_skip', category: 'special', rarity: 'legendary', title: 'Skip Level', desc: 'Мгновенное повышение уровня.', cost: 2000, type: 'cheat_level', value: '1' }
];

// --- УТИЛИТЫ ---

function useClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return [copied, copy];
}

const RarityBadge = ({ rarity }) => {
  const colors = {
    common: 'bg-slate-600 text-slate-200',
    rare: 'bg-blue-900 text-blue-300 border-blue-500',
    epic: 'bg-purple-900 text-purple-300 border-purple-500',
    legendary: 'bg-orange-900 text-orange-300 border-orange-500'
  };
  return (
    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${colors[rarity]} border-opacity-50`}>
      {rarity}
    </span>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---

export default function TundraAcademyV5() {
  // STATE
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tundra_v5_final');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.trophies && parsed.trophies.length > 0 && typeof parsed.trophies[0] === 'object') {
          parsed.trophies = parsed.trophies.map(t => t.id || t.name || 'Legacy Trophy');
        }
        return parsed;
      }
    } catch (e) { console.error(e); }
    return { level: 1, xp: 0, scrap: 0, completedLessons: [], purchasedItems: [], activeTheme: 'default', trophies: [] };
  });

  const [view, setView] = useState('MAP');
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle');
  const [tab, setTab] = useState('theory');
  const [storeFilter, setStoreFilter] = useState('all');
  const [copied, copy] = useClipboard();

  const maxXp = user.level * 1000;

  useEffect(() => {
    localStorage.setItem('tundra_v5_final', JSON.stringify(user));
  }, [user]);

  const enterLesson = (mod, lesson) => {
    setCurrentModule(mod);
    setCurrentLesson(lesson);
    setCode(lesson.initialCode);
    setOutput('');
    setStatus('idle');
    setTab('theory');
    setView('LESSON');
  };

  const handleRunCode = () => {
    if (status === 'running') return;
    setStatus('running');
    setOutput('Compiling...');
    
    setTimeout(() => {
      if (!currentLesson) return;
      // Упрощенная проверка (удаляем пробелы)
      const cleanCode = code.replace(/\s/g, '');
      // Но проверки внутри лессонов используют includes по сырому коду или частичному
      // Оставим проверку как есть, полагаясь на логику лессона
      const isCorrect = currentLesson.check(code);
      
      if (isCorrect) {
        setStatus('success');
        setOutput(currentLesson.type === 'exam' ? 'EXAM PASSED! SYSTEM UPDATED.' : 'BUILD SUCCESSFUL');
        
        if (!user.completedLessons.includes(currentLesson.id)) {
          const { xp: rXp, scrap: rScrap, trophy } = currentLesson.reward;
          let newXp = user.xp + rXp;
          let newLevel = user.level;
          let addedScrap = rScrap;
          
          if (newXp >= maxXp) { newXp -= maxXp; newLevel++; }
          
          const newTrophies = trophy ? [...user.trophies, String(trophy)] : user.trophies;

          setUser(prev => ({
            ...prev,
            scrap: prev.scrap + addedScrap,
            xp: newXp,
            level: newLevel,
            completedLessons: [...prev.completedLessons, currentLesson.id],
            trophies: newTrophies
          }));
        }
      } else {
        setStatus('error');
        setOutput('COMPILATION FAILED. Syntax or Logic error.');
      }
    }, 600);
  };

  const buyItem = (item) => {
    if (user.purchasedItems.includes(item.id) && item.type !== 'cheat_level') return;
    if (user.scrap < item.cost) { alert("Need more Scrap!"); return; }
    
    let newState = { ...user, scrap: user.scrap - item.cost };
    
    if (item.type === 'cheat_level') {
      newState.level += 1;
    } else {
      newState.purchasedItems = [...user.purchasedItems, item.id];
      if (item.type === 'theme') newState.activeTheme = item.value;
    }
    
    setUser(newState);
  };

  // --- UI RENDER ---

  const MapView = () => (
    <div className="flex-1 overflow-y-auto bg-theme-map p-4 pb-32 custom-scrollbar h-full">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center mt-6 mb-10">
          <h1 className="text-4xl font-black text-theme-text tracking-tighter mb-2">TUNDRA <span className="text-orange-500">ACADEMY</span></h1>
          <div className="flex items-center justify-center gap-2 text-theme-text-dim text-xs font-mono uppercase tracking-widest">
            <Wifi size={12}/> SYSTEM ONLINE
          </div>
        </div>

        {MODULES.map((mod) => {
          const isLocked = user.level < mod.reqLevel;
          const Icon = mod.icon;
          const chapters = mod.chapters || [];
          const totalLessons = chapters.reduce((acc, chap) => acc + (chap.lessons ? chap.lessons.length : 0), 0);
          const completedCount = chapters.reduce((acc, chap) => acc + (chap.lessons ? chap.lessons.filter(l => user.completedLessons.includes(l.id)).length : 0), 0);
          const progress = totalLessons === 0 ? 0 : (completedCount / totalLessons) * 100;

          return (
            <div key={mod.id} className={`relative border rounded-xl overflow-hidden transition-all ${isLocked ? 'border-slate-800 opacity-60' : 'border-slate-700 bg-theme-card shadow-2xl'}`}>
              {isLocked && (
                <div className="absolute inset-0 bg-black/80 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                  <Lock className="text-slate-500 mb-2" size={32}/>
                  <span className="font-mono text-slate-400 text-xs uppercase border border-slate-600 px-2 py-1 rounded">Level {mod.reqLevel} Required</span>
                </div>
              )}
              
              <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-theme-card to-slate-900/50">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${isLocked ? 'bg-slate-800' : 'bg-orange-500/20 text-orange-500'}`}>
                    <Icon size={32} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-theme-text">{Math.round(progress)}%</div>
                    <div className="text-[10px] text-theme-text-dim uppercase">Compiled</div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-theme-text mb-1">{mod.title}</h2>
                <p className="text-sm text-theme-text-dim">{mod.desc}</p>
              </div>

              <div className="p-2 bg-theme-bg-darker space-y-4">
                {chapters.map(chap => (
                  <div key={chap.id} className="bg-theme-card/50 rounded-lg p-2">
                    <div className="px-2 py-1 text-[10px] font-bold text-theme-text-dim uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle size={10} className="opacity-50"/> {chap.title}
                    </div>
                    <div className="space-y-1">
                      {(chap.lessons || []).map(lesson => {
                        const isDone = user.completedLessons.includes(lesson.id);
                        const isExam = lesson.type === 'exam';
                        return (
                          <button 
                            key={lesson.id}
                            onClick={() => !isLocked && enterLesson(mod, lesson)}
                            disabled={isLocked}
                            className={`w-full flex items-center justify-between p-3 rounded-md transition-all border group
                              ${isExam 
                                ? (isDone ? 'bg-red-900/20 border-red-500/30' : 'bg-red-900/10 border-red-500/20 hover:bg-red-900/30') 
                                : (isDone ? 'bg-green-900/10 border-green-500/20' : 'bg-slate-800 border-slate-700 hover:bg-slate-700')}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              {isExam ? <Skull size={16} className={isDone ? 'text-red-500' : 'text-red-400'} /> : 
                               (isDone ? <CheckCircle size={16} className="text-green-500"/> : <div className="w-4 h-4 rounded-full border-2 border-slate-600 group-hover:border-slate-400 transition-colors"/>)}
                              <span className={`text-sm font-medium text-left ${isExam ? 'text-red-200' : (isDone ? 'text-green-100' : 'text-slate-300')}`}>
                                {lesson.title}
                              </span>
                            </div>
                            {!isDone && !isLocked && (
                              <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded text-[10px] text-yellow-500 font-mono">
                                +{lesson.reward.scrap} <Coins size={10}/>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const StoreView = () => (
    <div className="flex-1 overflow-y-auto bg-[#0c0c0c] p-4 pb-32 custom-scrollbar h-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0c0c0c] z-10 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2"><ShoppingBag className="text-orange-500"/> OUTPOST</h2>
            <p className="text-xs text-slate-500 font-mono">SCRAP EXCHANGE</p>
          </div>
          <div className="flex gap-2">
            {['all', 'blueprint', 'skin'].map(f => (
              <button key={f} onClick={() => setStoreFilter(f)} 
                className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${storeFilter === f ? 'bg-orange-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STORE_ITEMS.filter(i => storeFilter === 'all' || i.category === storeFilter).map(item => {
            const owned = user.purchasedItems.includes(item.id);
            return (
              <div key={item.id} className={`group relative bg-slate-900 border-2 rounded-lg p-4 transition-all hover:-translate-y-1 hover:shadow-xl
                ${item.rarity === 'common' ? 'border-slate-700 hover:border-slate-500' : ''}
                ${item.rarity === 'rare' ? 'border-blue-900 hover:border-blue-500' : ''}
                ${item.rarity === 'epic' ? 'border-purple-900 hover:border-purple-500' : ''}
                ${item.rarity === 'legendary' ? 'border-orange-900 hover:border-orange-500' : ''}
              `}>
                <div className="flex justify-between items-start mb-2">
                  <RarityBadge rarity={item.rarity} />
                  {owned && item.type !== 'cheat_level' && <span className="text-[10px] bg-green-900 text-green-400 px-2 py-0.5 rounded flex items-center gap-1"><Check size={10}/> OWNED</span>}
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 mb-4 h-8 line-clamp-2">{item.desc}</p>

                {owned && item.category === 'blueprint' ? (
                  <button onClick={() => copy(item.value)} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded flex items-center justify-center gap-2">
                    {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'COPIED' : 'COPY CODE'}
                  </button>
                ) : (
                  <button 
                    onClick={() => buyItem(item)} 
                    disabled={(owned && item.type !== 'cheat_level') || user.scrap < item.cost}
                    className={`w-full py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all
                      ${(owned && item.type !== 'cheat_level') ? 'bg-slate-800 text-slate-500 cursor-default' : 
                        (user.scrap >= item.cost ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20' : 'bg-slate-800 text-red-400 opacity-50')}
                    `}
                  >
                    {owned && item.type !== 'cheat_level' ? 'PURCHASED' : <>{item.cost} <Coins size={12}/> BUY</>}
                  </button>
                )}
              </div>
            )
          })}
        </div>
        
        {user.trophies.length > 0 && (
          <div className="mt-12 border-t border-slate-800 pt-6">
             <h3 className="text-white font-bold flex items-center gap-2 mb-4"><Crown size={18} className="text-yellow-500"/> CERTIFICATES</h3>
             <div className="flex flex-wrap gap-2">
               {user.trophies.map((t, i) => (
                 <div key={i} className="bg-yellow-900/10 border border-yellow-500/30 px-3 py-2 rounded flex items-center gap-2 text-yellow-200 text-xs">
                   <Scroll size={14}/> {typeof t === 'string' ? t : 'Award'}
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const LessonView = () => {
    if (!currentLesson) return <div>Error</div>;
    return (
    <div className="flex flex-col h-full bg-theme-bg absolute inset-0 z-30">
      <div className={`h-14 flex items-center justify-between px-4 border-b shrink-0 ${currentLesson.type === 'exam' ? 'bg-red-950/30 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
        <button onClick={() => setView('MAP')} className="flex items-center gap-2 text-slate-400 hover:text-white py-2">
          <ArrowLeft size={18} /> <span className="text-xs font-bold hidden md:inline">EXIT</span>
        </button>
        <div className={`text-sm font-bold flex items-center gap-2 ${currentLesson.type === 'exam' ? 'text-red-400' : 'text-slate-200'}`}>
          {currentLesson.type === 'exam' && <Skull size={16}/>}
          {currentLesson.title}
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col md:w-1/2 md:border-r border-slate-800 bg-theme-card relative">
          <div className="flex border-b border-slate-700 bg-slate-900/50 shrink-0">
            {['theory', 'usage', 'syntax'].map(t => (
               <button key={t} onClick={() => setTab(t)} 
                 className={`flex-1 py-3 text-[10px] md:text-xs font-bold uppercase tracking-wider border-b-2 transition-colors
                   ${tab === t ? 'border-orange-500 text-white bg-slate-800' : 'border-transparent text-slate-500 hover:text-slate-300'}
                 `}>
                 {t}
               </button>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-32 md:pb-6">
             <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               {tab === 'theory' && <p className="whitespace-pre-line leading-relaxed text-theme-text text-sm md:text-base">{currentLesson.theory}</p>}
               {tab === 'usage' && (
                 <div>
                   <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded mb-4">
                     <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Tundra Context</h4>
                     <p className="text-blue-200 text-sm">Как это применяется на сервере Rust.</p>
                   </div>
                   <p className="whitespace-pre-line text-theme-text text-sm">{currentLesson.usage}</p>
                 </div>
               )}
               {tab === 'syntax' && (
                 <div className="bg-[#1e1e1e] rounded border border-slate-700 overflow-hidden">
                   <div className="bg-[#252526] px-3 py-1 text-[10px] text-slate-400 border-b border-slate-700">CODE SNIPPET</div>
                   <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto">{currentLesson.syntax}</pre>
                 </div>
               )}
             </div>
          </div>
          
          <div className={`p-4 border-t shrink-0 md:relative absolute bottom-0 left-0 right-0 z-10 shadow-lg ${currentLesson.type === 'exam' ? 'bg-red-900/10 border-red-900/30' : 'bg-theme-card border-slate-800'}`}>
             <h4 className={`font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2 ${currentLesson.type === 'exam' ? 'text-red-500' : 'text-orange-500'}`}>
               <Terminal size={14}/> {currentLesson.type === 'exam' ? 'MISSION OBJECTIVE' : 'TASK'}
             </h4>
             <p className="text-sm text-theme-text-light leading-snug">{currentLesson.task}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:w-1/2 bg-[#1e1e1e] h-[45vh] md:h-auto border-t md:border-t-0 border-slate-800">
           <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 bg-[#1e1e1e] p-4 text-slate-300 font-mono text-sm resize-none outline-none leading-relaxed" spellCheck="false"/>
           <div className="h-auto min-h-[100px] bg-black border-t border-[#333] flex flex-col shrink-0 pb-safe">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#333] bg-[#252526]">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Console Output</span>
                <button onClick={handleRunCode} disabled={status === 'running'}
                  className={`flex items-center gap-2 px-4 py-1 rounded text-[10px] font-bold text-white transition-all uppercase tracking-wider
                    ${status === 'running' ? 'bg-slate-700' : (currentLesson.type === 'exam' ? 'bg-red-600 hover:bg-red-500' : 'bg-green-700 hover:bg-green-600')}
                  `}>
                  {status === 'running' ? 'Compiling...' : (currentLesson.type === 'exam' ? 'DEPLOY' : 'RUN')} <Play size={10} fill="currentColor"/>
                </button>
              </div>
              <div className="p-3 font-mono text-xs overflow-y-auto flex-1 max-h-32">
                {output ? <pre className={status === 'success' ? 'text-green-400' : 'text-red-400'}>{output}</pre> : <span className="text-slate-600 italic">{'>'} Awaiting input...</span>}
              </div>
           </div>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-950 text-white font-sans overflow-hidden" data-theme={user.activeTheme}>
      <style>{`
        [data-theme='tundra'] { --c-bg: #052e16; --c-card: #064e3b; --c-text: #ecfccb; --c-dim: #65a30d; }
        [data-theme='matrix'] { --c-bg: #000000; --c-card: #022c22; --c-text: #22c55e; --c-dim: #15803d; }
        :root, [data-theme='default'] { --c-bg: #0f172a; --c-card: #1e293b; --c-text: #e2e8f0; --c-dim: #64748b; }
        
        .bg-theme-map { background-color: var(--c-bg); }
        .bg-theme-card { background-color: var(--c-card); }
        .text-theme-text { color: var(--c-text); }
        .text-theme-text-dim { color: var(--c-dim); }
      `}</style>

      {/* TOP BAR */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between shrink-0 z-50 shadow-lg h-16">
         <div className="flex items-center gap-3" onClick={() => setView('MAP')}>
            <div className="relative cursor-pointer group">
              <div className="w-10 h-10 rounded bg-slate-800 border border-orange-500/50 flex items-center justify-center text-orange-500 font-bold shadow-[0_0_10px_rgba(249,115,22,0.2)] group-hover:bg-slate-700 transition-colors">
                 {user.level}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-black text-[8px] px-1 rounded border border-slate-700 text-slate-400">LVL</div>
            </div>
            <div className="flex flex-col">
               <div className="text-[10px] text-slate-400 font-mono">XP PROGRESS</div>
               <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-600 to-yellow-500 transition-all" style={{ width: `${Math.min((user.xp / maxXp) * 100, 100)}%` }}></div></div>
            </div>
         </div>
         <div className="flex gap-2">
            <button onClick={() => setView('STORE')} className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded border border-slate-800 hover:border-orange-500/50 transition-all group">
               <ShoppingBag size={16} className={view === 'STORE' ? 'text-orange-400' : 'text-slate-400 group-hover:text-orange-400'} />
               <span className="text-yellow-500 font-mono font-bold text-sm">{user.scrap}</span>
            </button>
         </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="flex-1 overflow-hidden relative bg-theme-map h-full">
        {view === 'MAP' && <MapView />}
        {view === 'STORE' && <StoreView />}
        {view === 'LESSON' && <LessonView />}
      </div>
    </div>
  );
}