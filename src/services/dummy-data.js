const data = [
  {
    id: 1,
    week: 0,
    name: 'Computer Science Basics',
    description:
      'Курс состоит из нескольких крупных модулей, каждый из которых содержит короткие видео и тесты. Задача тестов - проверить, насколько хорошо стала понятна тема. Тесты можно проходить неограниченное количество раз, более того, во многих из них есть пояснения к неправильным ответам. Этот курс максимально гибкий: нет deadlineов, нет возможности "завалить" тест, можно проходить обучение в удобное время в удобном месте.',
    descriptionUrl: 'https://learn.epam.com/detailsPage?id=4b131384-7829-4204-a27b-21c538b41f88',
    type: 'js task',
    timeZone: 'GMT+3',
    dateTime: '1598986800000',
    place: 'Minsk',
    comment:
      'Курс проходится за полчаса кликами по кнопке Next и перебором вариантов ответа в тестах.',
    organizer: [
      {
        name: 'Vitali Shulha',
        url: 'https://github.com/vitalliuss/',
      },
    ],
    deadline: '',
  },
  {
    id: 2,
    week: 0,
    name: 'HTML online course',
    description: 'Базовый курс по HTML',
    descriptionUrl: 'https://ru.code-basics.com/languages/html',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1598972400000',
    place: 'Minsk',
    comment:
      'На странице курса все темы отмечены галочками. Студент может пояснить решение некоторых заданий (на выбор ментора)/ Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения  заданий нужно посмотреть и послушать как студент решает пройденные им таски',
    organizer: [
      {
        name: 'Code basics',
        url: 'https://ru.code-basics.com/',
      },
    ],
    deadline: '1598918400000',
  },
  {
    id: 3,
    week: 0,
    name: 'CSS online course',
    description: 'Базовый курс по CSS',
    descriptionUrl: 'https://ru.code-basics.com/languages/css',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1598972400000',
    place: 'Minsk',
    comment:
      'На странице курса все темы отмечены галочками. Студент может пояснить решение некоторых заданий (на выбор ментора)/ Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения  заданий нужно посмотреть и послушать как студент решает пройденные им таски',
    organizer: [
      {
        name: 'Code basics',
        url: 'https://ru.code-basics.com/',
      },
    ],
    deadline: '1598918400000',
  },
  {
    id: 4,
    week: 0,
    name: 'JS online course',
    description:
      'Базовый курс JavaScript. Если проходить осмысленно, даст неплохое представление о языке и его возможностях.',
    descriptionUrl: 'https://ru.code-basics.com/languages/javascript',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1598972400000',
    place: 'Minsk',
    comment:
      'На странице курса все темы отмечены галочками. Студент может пояснить решение некоторых заданий (на выбор ментора)/ Решения всех заданий доступны после 20-минутной паузы. Для проверки самостоятельности решения  заданий нужно посмотреть и послушать как студент решает пройденные им таски',
    organizer: [
      {
        name: 'Code basics',
        url: 'https://ru.code-basics.com/',
      },
    ],
    deadline: '1598918400000',
  },
  {
    id: 5,
    week: 1,
    name: 'Git & GitHub. Регистрация на GitHub',
    description: 'Знакомство с Git & GitHub , регистрация на сервесе, и установка Git',
    descriptionUrl: 'https://htmlacademy.ru/blog/boost/tools/register-on-github-work-with-console',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599469200000',
    place: 'Minsk',
    comment: 'Изучение и установка займет примерно 1 час. ',
    organizer: [
      {
        name: 'HTML Academy',
        url: 'https://htmlacademy.ru/',
      },
    ],
    deadline: '',
  },
  {
    id: 6,
    week: 1,
    name: 'Git & GitHub. Изучение команд Git',
    description:
      'Создание репозитория на гитхабе, создание ветки, добавление файлов с использование команд Git',
    descriptionUrl: 'https://htmlacademy.ru/blog/boost/tools/useful-commands-for-working-with-git',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599469200000',
    place: 'Minsk',
    comment: 'Изучение займет примерно 1 час. ',
    organizer: [
      {
        name: 'HTML Academy',
        url: 'https://htmlacademy.ru/',
      },
    ],
    deadline: '',
  },
  {
    id: 7,
    week: 1,
    name: 'Git & GitHub. Требования к комитам',
    description: 'Изучение требований коммитам согласно гайдлайну и применение их на практике',
    descriptionUrl: 'https://docs.rs.school/#/git-convention',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599555600000',
    place: 'Minsk',
    comment: 'Изучение займет примерно 1 час. ',
    organizer: [
      {
        name: 'The Rolling Scopes School',
        url: 'https://docs.rs.school/#/',
      },
    ],
    deadline: '',
  },
  {
    id: 8,
    week: 1,
    name: 'Git & GitHub. GitHub Pages',
    description: 'Изучение и использование сервиса GitHub Pages и Netlify для деплоя  проектов',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/create-github-pages.md',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599555600000',
    place: 'Minsk',
    comment: 'Изучение займет примерно 1 час. ',
    organizer: [
      {
        name: 'The Rolling Scopes School',
        url: 'https://docs.rs.school/#/',
      },
    ],
    deadline: '',
  },
  {
    id: 9,
    week: 1,
    name: 'IDE. Установка VS Code',
    description: 'YouTube видео по установленовке Visual Studio Code и рекомендованных плагинов. ',
    descriptionUrl: 'https://www.youtube.com/watch?v=5M6RL3MAGJU&feature=youtu.be',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599642000000',
    place: 'Minsk',
    comment: 'Изучение займет примерно 1 час. ',
    organizer: [
      {
        name: 'HTML Academy',
        url: 'https://htmlacademy.ru/',
      },
    ],
    deadline: '',
  },
  {
    id: 10,
    week: 1,
    name: 'IDE. Взаимодействие редактора и браузера',
    description: 'Изучение плагин LiveServer для открытия HTML файлов в браузере через VS Code',
    descriptionUrl: 'https://htmlacademy.ru/blog/education/all/how-to-run-html',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599642000000',
    place: 'Minsk',
    comment: 'Изучение займет примерно 1 час. ',
    organizer: [
      {
        name: 'HTML Academy',
        url: 'https://htmlacademy.ru/',
      },
    ],
    deadline: '',
  },
  {
    id: 11,
    week: 1,
    name: 'Markdown.',
    description: 'Изучение синтаксиса Markdown его применение на практике.',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599728400000',
    place: 'Minsk',
    comment: 'Изучение займет примерно 1 час. ',
    organizer: [
      {
        name: 'Hexlet Guides',
        url: 'https://guides.hexlet.io/',
      },
    ],
    deadline: '',
  },
  {
    id: 12,
    week: 1,
    name: 'Markdown & Git',
    description: 'Создать Markdown документ с описанием резюме.',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/git-markdown.md',
    type: 'markdown',
    timeZone: 'GMT+3',
    dateTime: '1599764400000',
    place: 'Minsk',
    comment: 'Рекомендованно использовать реальную информацию о себе',
    organizer: [
      {
        name: 'Hanna Pratasevich',
        url: 'https://github.com/Anik188',
      },
      {
        name: 'Dzmitry Varabei',
        url: 'https://github.com/dzmitry-varabei',
      },
      {
        name: 'Alena Vasilchenko',
        url: 'https://github.com/amoebiusss',
      },
      {
        name: 'Paval Miatlitski',
        url: 'https://github.com/PavalEscoba',
      },
      {
        name: 'Asya Mikhailova',
        url: 'https://github.com/Asya-Mikhailova',
      },
    ],
    deadline: '1599696000000',
  },
  {
    id: 13,
    week: 1,
    name: 'CSS Basics',
    description: 'YouTube видео о базовых особенностях CSS',
    descriptionUrl:
      'https://www.youtube.com/watch?v=xdBTX4RMoBE&list=PLe--kalBDwji8WXKVjhON39X4v_Uj6T_R&index=2',
    type: 'lecture',
    timeZone: 'GMT+3',
    dateTime: '1599922800000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'The Rolling Scopes School',
        url: 'https://docs.rs.school/#/',
      },
    ],
    deadline: '',
  },
  {
    id: 14,
    week: 1,
    name: 'CSS. Selectors',
    description: '30 CSS-селекторов, которые должны знать начинающие разработчики',
    descriptionUrl: 'http://rightblog.ru/2606',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1599930000000',
    place: 'Minsk',
    comment: 'Личный блог о веб-разработке и веб-дизайне',
    organizer: [
      {
        name: 'Юрий Ключевский',
        url: 'http://rightblog.ru/',
      },
    ],
    deadline: '',
  },
  {
    id: 15,
    week: 1,
    name: 'HTML, CSS & Git Basics',
    description:
      'Создать страницу index.html и стили для нее. Основным содержанием этой страницы является документ Markdown из последней codewars Git и Markdown. Помимо текста нужно добавить свою фотографию или картинку. Страница должна быть развернута на страницах Github и доступна по URL-адресу',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codejam-cv.md',
    type: 'HTML task',
    timeZone: 'GMT+3',
    dateTime: '1600020000000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Aliaksandr Klimau',
        url: 'https://github.com/quantum-noise',
      },
      {
        name: 'Dzmitry Varabei',
        url: 'https://github.com/dzmitry-varabei',
      },
    ],
    deadline: '1599955200000',
  },
  {
    id: 16,
    week: 1,
    name: 'CSS positioning and layout (Flex)',
    description: 'Видео lecture Position. Floats. Flex. Semantic. CSS3',
    descriptionUrl:
      'https://www.youtube.com/watch?v=iSQcOjxttNg&list=PLe--kalBDwji8WXKVjhON39X4v_Uj6T_R&index=3',
    type: 'lecture',
    timeZone: 'GMT+3',
    dateTime: '1599955200000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'The Rolling Scopes School',
        url: 'https://docs.rs.school/#/',
      },
    ],
    deadline: '',
  },
  {
    id: 17,
    week: 2,
    name: 'Git CheatSheet',
    description: 'Вся информация по Гит в одном месте',
    descriptionUrl:
      'https://www.evernote.com/shard/s368/client/snv?noteGuid=b1359883-2b9e-419a-b9de-dd959fc05f05&noteKey=97c0f19486d851b3&sn=https%3A%2F%2Fwww.evernote.com%2Fshard%2Fs368%2Fsh%2Fb1359883-2b9e-419a-b9de-dd959fc05f05%2F97c0f19486d851b3&title=Git',
    type: 'materials',
    timeZone: 'GMT+3',
    dateTime: '1600041600000',
    place: 'Minsk',
    comment: 'Все самое необходимое про Гит в одном месте',
    organizer: [
      {
        name: 'Evernote',
        url:
          'https://evernote.com/intl/ru/community/referral/?ebcc=ebcc-tiagofloresdias532&gclid=CjwKCAjwtNf6BRAwEiwAkt6UQmqcnQnimeh9dKTv2a_LCDuHGe6_T90J0x5OJygL45LcRKJiSJ6BiRoC4mkQAvD_BwE&gspk=ZWJjYy10aWFnb2Zsb3Jlc2RpYXM1MzI%3D&gsxid=QjlI3sWlY2NQ',
      },
    ],
    deadline: '',
  },
  {
    id: 18,
    week: 2,
    name: 'Broswers and IDEs',
    description: 'Видео lecture о браузерах и редакторах кода. Ответы на вопросы',
    descriptionUrl: 'https://www.youtube.com/watch?v=UQavTWiTpnA',
    type: 'lecture',
    timeZone: 'GMT+3',
    dateTime: '1600110000000',
    place: 'Minsk',
    comment: 'lecture будет в виде стрима на YouTube. Продолжителдьность около 1.5 часа',
    organizer: [
      {
        name: 'Sergey Shalyapin',
        url: 'https://github.com/sergeyshalyapin',
      },
    ],
    deadline: '',
  },
  {
    id: 19,
    week: 2,
    name: 'SASS Basics',
    description: 'Изучение документации по Sass на официальном сайте',
    descriptionUrl: 'https://sass-scss.ru/guide/',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1600171200000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Sass',
        url: 'https://sass-scss.ru/guide/',
      },
    ],
    deadline: '',
  },
  {
    id: 20,
    week: 2,
    name: 'Friday Live Coding',
    description: 'Онлайн создание разметки по макету. Основы БЭМ. Figma. Работа в VS Code',
    descriptionUrl: 'https://www.youtube.com/watch?v=ZAde-IJAHzo&feature=youtu.be',
    type: 'live coding',
    timeZone: 'GMT+3',
    dateTime: '1600455600000',
    place: 'Minsk',
    comment: 'lecture будет в виде стрима на YouTube. Продолжителдьность около 2 часов',
    organizer: [
      {
        name: 'Viktoriya Vorozhun',
        url: 'https://github.com/ViktoriyaVorozhun',
      },
    ],
    deadline: '',
  },
  {
    id: 21,
    week: 2,
    name: 'HTML, CSS & Git Basics Test',
    description: 'Тест по основам HTML, CSS, Git',
    descriptionUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScHaTjoazbz8mworB6A-mP1tZf_adJLreQ_VwfYQYgOANOC-A/closedform',
    type: 'test',
    timeZone: 'GMT+3',
    dateTime: '1600506000000',
    place: 'Minsk',
    comment: 'На выполнение теста отводится 12 часов',
    organizer: [
      {
        name: 'Sergey Shalyapin',
        url: 'https://github.com/sergeyshalyapin',
      },
    ],
    deadline: '1600473600000',
  },
  {
    id: 22,
    week: 3,
    name: 'Simple-singolo',
    description:
      'Cверстать страницу согласно макету. Использовать JavaScript для создания адаптивного меню, слайдера, переключения табов в блоке Portfolio.',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/simple-singolo.md',
    type: 'HTML task',
    timeZone: 'GMT+3',
    dateTime: '1600628400000',
    place: 'Minsk',
    comment: 'Необходимо ознакомится с работой Figma',
    organizer: [
      {
        name: 'Irina Inina',
        url: 'https://github.com/irinainina',
      },
    ],
    deadline: '1600819200000',
  },
  {
    id: 23,
    week: 4,
    name: 'Simple-singolo',
    description:
      'Выполненное задание по верстке. Использован JavaScript для создания адаптивного меню, слайдера, переключения табов в блоке Portfolio.',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/simple-singolo.md',
    type: 'deadline',
    timeZone: 'GMT+3',
    dateTime: '1600819200000',
    place: 'Minsk',
    comment: 'Необходимо прикрепить работу на проверку на странице Submit в RS App',
    organizer: [
      {
        name: 'Irina Inina',
        url: 'https://github.com/irinainina',
      },
    ],
    deadline: '',
  },
  {
    id: 24,
    week: 4,
    name: 'JavaScript. Introduction',
    description: 'Изучение учебника по JavaScript. ',
    descriptionUrl: 'https://learn.javascript.ru/intro',
    type: 'self-study',
    timeZone: 'GMT+3',
    dateTime: '1600948800000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'JSR',
        url: 'https://learn.javascript.ru/',
      },
    ],
    deadline: '',
  },
  {
    id: 25,
    week: 4,
    name: 'Singolo cross-check',
    description: 'Проверка выполнения таска Simple-singolo другими студентами. ',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/markups/level-2/singolo/singolo-cross-check-1.md',
    type: 'кросс-чек',
    timeZone: 'GMT+3',
    dateTime: '1600948800000',
    place: 'Minsk',
    comment: 'На проверку отводится 5 дней',
    organizer: [
      {
        name: 'Irina Inina',
        url: 'https://github.com/irinainina',
      },
    ],
    deadline: '1601337600000',
  },
  {
    id: 26,
    week: 4,
    name: 'Friday Live Coding',
    description: 'Продолжение работы с макетом. Подключение припроцессоров.',
    descriptionUrl: 'https://www.youtube.com/watch?v=BJENQIX2e2o&feature=youtu.be',
    type: 'live coding',
    timeZone: 'GMT+3',
    dateTime: '1601060400000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Viktoriya Vorozhun',
        url: 'https://github.com/ViktoriyaVorozhun',
      },
    ],
    deadline: '',
  },
  {
    id: 27,
    week: 5,
    name: 'Codewars. Basics',
    description: 'Задания для практики решения JavaScript тасков на специальной платформе Codewars',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/codewars-basic.md',
    type: 'codewars',
    timeZone: 'GMT+3',
    dateTime: '1601251200000',
    place: 'Minsk',
    comment: 'После завершения таски ее нужно засабмитить в RS App',
    organizer: [
      {
        name: 'Codewars',
        url: 'https://www.codewars.com/dashboard',
      },
    ],
    deadline: '1601769600000',
  },
  {
    id: 28,
    week: 5,
    name: 'Friday Live Coding',
    description: 'Продолжение работы с макетом.  Стилизация страницы. Подключение normalize.css',
    descriptionUrl: 'https://www.youtube.com/watch?v=fooyYgIuZe8&feature=youtu.be',
    type: 'live coding',
    timeZone: 'GMT+3',
    dateTime: '1599073200000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Viktoriya Vorozhun',
        url: 'https://github.com/ViktoriyaVorozhun',
      },
    ],
    deadline: '',
  },
  {
    id: 29,
    week: 5,
    name: 'Codewars. Basics',
    description: 'Задания для практики решения JavaScript тасков на специальной платформе Codewars',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/codewars-basic.md',
    type: 'deadline',
    timeZone: 'GMT+3',
    dateTime: '1601769600000',
    place: 'Minsk',
    comment: 'После завершения таски ее нужно засабмитить в RS App',
    organizer: [
      {
        name: 'Codewars',
        url: 'https://www.codewars.com/dashboard',
      },
    ],
    deadline: '',
  },
  {
    id: 30,
    week: 5,
    name: 'Calculator',
    description:
      'Создание калькулятора, выполняющего математические операции. Отличное объяснение, единственное в этой подборке на русском языке. Код немного устарел: всё ещё используются объявления переменных var вместо const и let, обычные функции, вместо стрелочных. Но логика создания приложения осталась неизменной.',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/projects.md#task-1-calculator',
    type: 'js task',
    timeZone: 'GMT+3',
    dateTime: '1601838000000',
    place: 'Minsk',
    comment:
      'Постарайтесь разобраться, почему код пишется так, а не иначе, понять логику автора приложения, не просто повторить готовую работу, но улучшить её, исправить замеченные ошибки и неточности, внести в неё что-то своё.',
    organizer: [
      {
        name: 'Irina Inina',
        url: 'https://github.com/irinainina',
      },
    ],
    deadline: '',
  },
  {
    id: 31,
    week: 6,
    name: 'JS Basics Video',
    description: 'Для повторения и закрепления изученного материала',
    descriptionUrl: 'https://www.youtube.com/playlist?list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX',
    type: 'materials',
    timeZone: 'GMT+3',
    dateTime: '1601899200000',
    place: 'Minsk',
    comment: 'Отличный плейлист от loftblog 24 видео',
    organizer: [
      {
        name: 'loftblog',
        url: 'https://www.youtube.com/channel/UCIIt69f5D44s2cdb9vXQNzA',
      },
    ],
    deadline: '',
  },
  {
    id: 32,
    week: 6,
    name: 'JS. DOM',
    description:
      'Подключение первого скрипта\nОбъектная модель документа\nКлюч к пониманию языка\nСвойства, события, методы\ninnerHTML и style\nОбработка событий\nСлайдер фотографий в 20 строк',
    descriptionUrl: 'https://www.youtube.com/watch?v=-2WiaSvOj78&feature=youtu.be',
    type: 'materials',
    timeZone: 'GMT+3',
    dateTime: '1602072000000',
    place: 'Minsk',
    comment: 'Вебинары Дмитрия Лаврика, направленные на понимание JavaScript и его особенностей',
    organizer: [
      {
        name: 'Dmitrii Lavrik',
        url: 'https://github.com/dmitry-lavrik',
      },
    ],
    deadline: '',
  },
  {
    id: 33,
    week: 6,
    name: 'Webpack',
    description: 'Введение в Webpack, установка, плагины',
    descriptionUrl: 'https://www.youtube.com/watch?v=eSaF8NXeNsA&feature=youtu.be',
    type: 'materials',
    timeZone: 'GMT+3',
    dateTime: '1602158400000',
    place: 'Minsk',
    comment: 'Курс от Владилена Минина по webpack считается одним из лучших',
    organizer: [
      {
        name: 'Vladilen Minin',
        url: 'https://github.com/vladilenm',
      },
    ],
    deadline: '',
  },
  {
    id: 34,
    week: 6,
    name: 'Codewars. Basics-1',
    description: 'Задания для практики решения JavaScript тасков на специальной платформе Codewars',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/codewars-basic-1.md',
    type: 'codewars',
    timeZone: 'GMT+3',
    dateTime: '1602183600000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Codewars',
        url: 'https://www.codewars.com/dashboard',
      },
    ],
    deadline: '1602720000000',
  },
  {
    id: 35,
    week: 7,
    name: 'Advanced JS',
    description:
      'Изучение prototype, call, bind, this, замыкания, event loop, , асинхронность, промисы, классы и т д',
    descriptionUrl:
      'https://www.youtube.com/watch?v=aQkgUUmUJy4&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT',
    type: 'materials',
    timeZone: 'GMT+3',
    dateTime: '1602504000000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Vladilen Minin',
        url: 'https://github.com/vladilenm',
      },
    ],
    deadline: '',
  },
  {
    id: 36,
    week: 7,
    name: 'Codewars. Basics-1',
    description: 'Задания для практики решения JavaScript тасков на специальной платформе Codewars',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/codewars-basic-1.md',
    type: 'codewars',
    timeZone: 'GMT+3',
    dateTime: '1602720000000',
    place: 'Minsk',
    comment: 'Задание нужно засабмитить в RS App',
    organizer: [
      {
        name: 'Codewars',
        url: 'https://www.codewars.com/dashboard',
      },
    ],
    deadline: '',
  },
  {
    id: 37,
    week: 8,
    name: 'Advanced JS Test',
    description: 'Тест по продвинутым функциям JavaScript. Ссылка на тест будет в Дискорде. ',
    descriptionUrl: '',
    type: 'test',
    timeZone: 'GMT+3',
    dateTime: '1602936000000',
    place: 'Minsk',
    comment: 'На выполнение теста отводится 12 часов',
    organizer: [
      {
        name: 'Dzmitry Ramaniuk',
        url: 'https://github.com/DmitryRomaniuk',
      },
    ],
    deadline: '1602892800000',
  },
  {
    id: 38,
    week: 9,
    name: 'Rain-drops',
    description:
      'Необходимо создать приложение - тренажёр по математике, позволяющий закрепить навыки арифметических действий: сложения, вычитания, умножения и деления.',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/raindrops.md',
    type: 'js task',
    timeZone: 'GMT+3',
    dateTime: '1603134000000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Irina Inina',
        url: 'https://github.com/irinainina',
      },
    ],
    deadline: '1603584000000',
  },
  {
    id: 39,
    week: 10,
    name: 'Codewars. Basics-2',
    description: 'Задания для практики решения JavaScript тасков на специальной платформе Codewars',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/codewars-basic-2.md',
    type: 'codewars',
    timeZone: 'GMT+3',
    dateTime: '1603652400000',
    place: 'Minsk',
    comment: 'Задание нужно засабмитить в RS App',
    organizer: [
      {
        name: 'Codewars',
        url: 'https://www.codewars.com/dashboard',
      },
    ],
    deadline: '',
  },
  {
    id: 40,
    week: 10,
    name: 'Rain-drops',
    description:
      'Необходимо создать приложение - тренажёр по математике, позволяющий закрепить навыки арифметических действий: сложения, вычитания, умножения и деления.',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/raindrops.md',
    type: 'deadline',
    timeZone: 'GMT+3',
    dateTime: '1603584000000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Irina Inina',
        url: 'https://github.com/irinainina',
      },
    ],
    deadline: '',
  },
  {
    id: 41,
    week: 10,
    name: 'fancy-weather',
    description: 'Вам необходимо создать приложение - прогноз погоды',
    descriptionUrl:
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/fancy-weather.md',
    type: 'js task',
    timeZone: 'GMT+3',
    dateTime: '1603825200000',
    place: 'Minsk',
    comment:
      'В предложенный макет можно вносить свои изменения с целью его улучшения, не удаляя и не упрощая представленные на макете элементы дизайна',
    organizer: [
      {
        name: 'Pavel Razuvalau',
        url: 'https://github.com/pavelrazuvalau',
      },
    ],
    deadline: '1604966400000',
  },
  {
    id: 42,
    week: 13,
    name: 'Interview questions',
    description: 'Список вопросов для подготовки к финальному собеседованию. ',
    descriptionUrl:
      'https://github.com/lydiahallie/javascript-questions/blob/master/ru-RU/README.md',
    type: 'materials',
    timeZone: 'GMT+3',
    dateTime: '1606824000000',
    place: 'Minsk',
    comment: '',
    organizer: [
      {
        name: 'Dima Tsoy',
        url: 'https://github.com/dimktsoy',
      },
    ],
    deadline: '',
  },
  {
    id: 43,
    week: 13,
    name: 'Interview',
    description: 'Финльное собеседование по завершению курса. Основы JavaScript, HTML, CSS',
    descriptionUrl:
      'https://github.com/lydiahallie/javascript-questions/blob/master/ru-RU/README.md',
    type: 'interview',
    timeZone: 'GMT+3',
    dateTime: '1606935600000',
    place: 'Minsk',
    comment: 'Собеседование нужно пройти в течении 2 недель',
    organizer: [
      {
        name: 'The Rolling Scopes School',
        url: 'https://docs.rs.school/#/',
      },
    ],
    deadline: '1608681600000',
  },
];

export default data;
