/*
 * Контент сайта Dilyyas Bday.
 * Здесь можно менять тексты, главное фото и список фотографий подарков —
 * остальной код трогать не нужно. Подробности — в README.md.
 */
window.WISHLIST = {
  title: "Dilyyas Bday",
  tagline: "Birthday Wishlist",

  // Главное фото. Пока src пустой, показывается графитовая заглушка.
  // Пример: src: "assets/images/hero/dilya.jpg"
  heroPhoto: {
    src: "",
    alt: "Диля"
  },

  intro: {
    title: "My Birthday Wishlist",
    text: "Небольшая галерея идей для подарка — четыре раздела, листайте вниз."
  },

  // Фото подарков. Порядок в массиве = порядок на сайте.
  // src — основное изображение, srcSmall — уменьшенная копия для телефонов (необязательно),
  // width / height — размеры в пикселях (необязательно, помогают избежать «прыжков» при загрузке).
  categories: [
    {
      id: "handmade",
      label: "Handmade",
      title: "Подарки своими руками",
      layout: "stagger",
      items: [
        { src: "assets/images/handmade/hm-01.jpg", srcSmall: "assets/images/handmade/hm-01-sm.jpg", width: 1100, height: 1427, alt: "Фоторамка, украшенная стразами, жемчужинами и розовыми бантами, с коллажем фотографий" },
        { src: "assets/images/handmade/hm-02.jpg", srcSmall: "assets/images/handmade/hm-02-sm.jpg", width: 736,  height: 981,  alt: "Сладкий постер из шоколадок и конфет с надписью Happy Birthday" },
        { src: "assets/images/handmade/hm-03.jpg", srcSmall: "assets/images/handmade/hm-03-sm.jpg", width: 1100, height: 1467, alt: "Круглый чёрно-белый фотоколлаж с надписью Happy Birthday, звёздами и бантиками" },
        { src: "assets/images/handmade/hm-04.jpg", srcSmall: "assets/images/handmade/hm-04-sm.jpg", width: 1100, height: 1467, alt: "Подарочная коробка с гирляндой, фотографиями, наклейками и маленькими подарками внутри" }
      ]
    },
    {
      id: "flowers",
      label: "Flowers",
      title: "Цветы",
      layout: "masonry",
      items: [
        { src: "assets/images/flowers/fl-01.jpg", srcSmall: "assets/images/flowers/fl-01-sm.jpg", width: 1100, height: 1375, alt: "Букет кустовых пионовидных роз пудровых и малиновых оттенков с эвкалиптом" },
        { src: "assets/images/flowers/fl-02.jpg", srcSmall: "assets/images/flowers/fl-02-sm.jpg", width: 736,  height: 1104, alt: "Большой букет розовых и кремовых кустовых роз в светлой упаковке" },
        { src: "assets/images/flowers/fl-03.jpg", srcSmall: "assets/images/flowers/fl-03-sm.jpg", width: 676,  height: 1200, alt: "Пышные букеты красных и розовых кустовых роз в белой упаковке" },
        { src: "assets/images/flowers/fl-04.jpg", srcSmall: "assets/images/flowers/fl-04-sm.jpg", width: 1080, height: 1776, alt: "Охапка розовых кустовых роз" },
        { src: "assets/images/flowers/fl-05.jpg", srcSmall: "assets/images/flowers/fl-05-sm.jpg", width: 1080, height: 1920, alt: "Корзина с белыми и розовыми гортензиями и розами, перевязанная персиковой лентой" },
        { src: "assets/images/flowers/fl-06.jpg", srcSmall: "assets/images/flowers/fl-06-sm.jpg", width: 1100, height: 1265, alt: "Букет гипсофилы с фотокарточками-полароидами в белой упаковке" }
      ]
    },
    {
      id: "art",
      label: "Art",
      title: "Картины",
      layout: "gallery",
      items: [
        { src: "assets/images/art/art-01.jpg", srcSmall: "assets/images/art/art-01-sm.jpg", width: 1100, height: 1525, alt: "Картина с обнимающейся парой в золотых узорчатых одеждах на цветочном лугу" },
        { src: "assets/images/art/art-02.jpg", srcSmall: "assets/images/art/art-02-sm.jpg", width: 968,  height: 1296, alt: "Вечерняя парижская улица с огнями и видом на Эйфелеву башню" },
        { src: "assets/images/art/art-03.jpg", srcSmall: "assets/images/art/art-03-sm.jpg", width: 798,  height: 1015, alt: "Два белых лебедя на розовой воде" },
        { src: "assets/images/art/art-04.jpg", srcSmall: "assets/images/art/art-04-sm.jpg", width: 474,  height: 716,  alt: "Розовые лилии на тёмном фоне" },
        { src: "assets/images/art/art-05.jpg", srcSmall: "assets/images/art/art-05-sm.jpg", width: 1100, height: 1320, alt: "Картина на мольберте: увитый цветами дом у моря на закате" }
      ]
    },
    {
      id: "money",
      label: "Money",
      title: "Деньги",
      layout: "envelope",
      text: "Конверт с тёплыми словами — тоже прекрасный подарок.",
      items: []
    }
  ],

  footer: "Made with love"
};
