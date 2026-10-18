/**
 * Medipure kamu kataloğu — model, kapasite ve EUR liste fiyatı.
 * Kaynak: https://www.medipure.com.tr/ (18 Ekim 2026 çekimi).
 * Liste fiyatı Medipure vitrin fiyatıdır; Elif Kimya teslimat teklifi ayrıca verilir.
 */
import { MEDIPURE_DETAILS_BY_CODE } from './medipure-details-locale.js';

export const MEDIPURE_SOURCE = "https://www.medipure.com.tr/";
export const MEDIPURE_CATALOG_DATE = "2026-10-18";
export const MEDIPURE_PRODUCT_COUNT = 163;

export const MEDIPURE_GROUPS = [
  {
    "id": "laboratuvar",
    "title": "Laboratuvar",
    "blurb": "Tipik laboratuvar, biyokimya ve mikrobiyoloji cihazları."
  },
  {
    "id": "medikal",
    "title": "Medikal",
    "blurb": "Sterilizasyon ve klinik su sistemleri."
  },
  {
    "id": "deiyonize",
    "title": "Deiyonize",
    "blurb": "Deiyonize, distile ve elektrodeiyonizasyon cihazları."
  },
  {
    "id": "mobil",
    "title": "Mobil",
    "blurb": "Taşınabilir saf su ve ultra saf su cihazları."
  },
  {
    "id": "endustri",
    "title": "Endüstri",
    "blurb": "Üretim, kaplama, kozmetik ve ters ozmoz sistemleri."
  }
];

export const MEDIPURE_CATEGORIES = [
  {
    "id": "laboratuvar-saf-su-cihazlari",
    "group": "laboratuvar",
    "title": "Laboratuvar Saf Su Cihazları",
    "summary": "Akredite laboratuvar çalışmaları için tezgah ve kabin tipi saf su cihazları.",
    "products": [
      {
        "code": "DT-5012",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "2.170,74",
        "listPriceValue": 2170.74,
        "image": "https://www.medipure.com.tr/img/products/small/dt-5010-04568d4.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5012-laboratuvar-saf-su-cihazi-10-lt-saat-dt5012"
      },
      {
        "code": "DT-5017",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "2.387,33",
        "listPriceValue": 2387.33,
        "image": "https://www.medipure.com.tr/img/products/small/dt-5010-6-7ad91c2.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5017-laboratuvar-saf-su-cihazi-15-lt-saat-dt5017"
      },
      {
        "code": "DT-5010",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "2.063,10",
        "listPriceValue": 2063.1,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--5--06d50a6.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5010-laboratuvar-saf-su-cihazi-10-lt-saat-dt5010"
      },
      {
        "code": "DT-5015",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "2.269,41",
        "listPriceValue": 2269.41,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-saf-su-cihazlari--3--5cec0b3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5015-laboratuvar-saf-su-cihazi-15-lt-saat-dt5015"
      },
      {
        "code": "DT-5020",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "20 lt/saat",
        "listPriceEur": "2.578,88",
        "listPriceValue": 2578.88,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--2--70f4c6d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5020-laboratuvar-saf-su-cihazi-20-lt-saat-dt5020"
      },
      {
        "code": "DT-5030",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "30 lt/saat",
        "listPriceEur": "2.785,19",
        "listPriceValue": 2785.19,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-saf-su-cihazlari--5--a828ac9.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5030-laboratuvar-saf-su-cihazi-30-lt-saat-dt5030"
      },
      {
        "code": "DT-5040",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "40 lt/saat",
        "listPriceEur": "3.053,65",
        "listPriceValue": 3053.65,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--10--a62b9be.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5040-laboratuvar-saf-su-cihazi-40-lt-saat-dt5040"
      },
      {
        "code": "DT-5060",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "8.185,13",
        "listPriceValue": 8185.13,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--12--0594273.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5060-laboratuvar-saf-su-cihazi-60-lt-saat-dt5060"
      },
      {
        "code": "DT-5080",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "80 lt/saat",
        "listPriceEur": "9.003,06",
        "listPriceValue": 9003.06,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--12--086b6d7.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5080-laboratuvar-saf-su-cihazi-80-lt-saat-dt5080"
      },
      {
        "code": "DT-5100",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "9.904,38",
        "listPriceValue": 9904.38,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--11--16c4bdc.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5100-laboratuvar-saf-su-cihazi-100-lt-saat-dt5100"
      },
      {
        "code": "DT-5150",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "10.894,81",
        "listPriceValue": 10894.81,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-pure-water-systems--12--21bfd44.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5150-laboratuvar-saf-su-cihazi-150-lt-saat-dt5150"
      },
      {
        "code": "DT-5300",
        "name": "Laboratuvar Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "14.162,25",
        "listPriceValue": 14162.25,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-saf-su-cihazlari--7--7a9d691.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5300-laboratuvar-saf-su-cihazi-300-lt-saat-dt5300"
      }
    ]
  },
  {
    "id": "laboratuvar-ultra-saf-su-cihazlari",
    "group": "laboratuvar",
    "title": "Laboratuvar Ultra Saf Su Cihazları",
    "summary": "Analitik uygulamalar için laboratuvar ultra saf su cihazları.",
    "products": [
      {
        "code": "DT-6110",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "5.830,50",
        "listPriceValue": 5830.5,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--5--4d50720.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6110-laboratuvar-ultra-saf-su-cihazi-10-lt-saat-dt6110"
      },
      {
        "code": "DT-6115",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "6.189,30",
        "listPriceValue": 6189.3,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-ultra-saf-su-cihazi-ad7145b.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6115-laboratuvar-ultra-saf-su-cihazi-15-lt-saat-dt6115"
      },
      {
        "code": "DT-6120",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "20 lt/saat",
        "listPriceEur": "6.548,10",
        "listPriceValue": 6548.1,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-ultra-saf-su-cihazi-71ab783.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6120-laboratuvar-ultra-saf-su-cihazi-20-lt-saat-dt6120"
      },
      {
        "code": "DT-6130",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "30 lt/saat",
        "listPriceEur": "6.933,35",
        "listPriceValue": 6933.35,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--5--03f68e4.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6130-laboratuvar-ultra-saf-su-cihazi-30-lt-saat-dt6130"
      },
      {
        "code": "DT-6140",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "40 lt/saat",
        "listPriceEur": "8.584,29",
        "listPriceValue": 8584.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--5--ebb78ee.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6140-laboratuvar-ultra-saf-su-cihazi-40-lt-saat-dt6140"
      },
      {
        "code": "DT-6160",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "13.276,05",
        "listPriceValue": 13276.05,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-ultra-saf-su-cihazi---4--a876319.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6160-laboratuvar-ultra-saf-su-cihazi-60-lt-saat-dt6160"
      },
      {
        "code": "DT-6180",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "80 lt/saat",
        "listPriceEur": "14.410,75",
        "listPriceValue": 14410.75,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratuvar-ultra-saf-su-cihazi---4--3eb2a43.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6180-laboratuvar-ultra-saf-su-cihazi-80-lt-saat-dt6180"
      },
      {
        "code": "DT-6200",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "16.226,28",
        "listPriceValue": 16226.28,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--2--4cb58a3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6200-laboratuvar-ultra-saf-su-cihazi-100-lt-saat-dt6200"
      },
      {
        "code": "DT-6230",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "21.218,98",
        "listPriceValue": 21218.98,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--2--13336b5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6230-laboratuvar-ultra-saf-su-cihazi-150-lt-saat-dt6230"
      },
      {
        "code": "DT-6250",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "250 lt/saat",
        "listPriceEur": "29.161,92",
        "listPriceValue": 29161.92,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--2--b471f55.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6250-laboratuvar-ultra-saf-su-cihazi-250-lt-saat-dt6250"
      },
      {
        "code": "DT-6270",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "34.608,50",
        "listPriceValue": 34608.5,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--3--a0ce14e.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6270-laboratuvar-ultra-saf-su-cihazi-400-lt-saat-dt6270"
      },
      {
        "code": "DT-6300",
        "name": "Laboratuvar Ultra Saf Su Cihazı",
        "capacity": "600 lt/saat",
        "listPriceEur": "42.551,44",
        "listPriceValue": 42551.44,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-laboratory-ultrapure-water-system--4--9a9a6eb.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-6300-laboratuvar-ultra-saf-su-cihazi-600-lt-saat-dt6300"
      }
    ]
  },
  {
    "id": "biyokimya-saf-su-cihazlari",
    "group": "laboratuvar",
    "title": "Biyokimya Saf Su Cihazları",
    "summary": "Biyokimya, klinik analizör ve kimyasal sentez hatları için saf su cihazları.",
    "products": [
      {
        "code": "DT-5510",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "2.475,72",
        "listPriceValue": 2475.72,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biyokimya-saf-su-cihazlari--7--c9a4928.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5510-biyokimya-saf-su-cihazi-10-lt-saat-dt5510"
      },
      {
        "code": "DT-5515",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "2.723,29",
        "listPriceValue": 2723.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--5--b53b5bb.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5515-biyokimya-saf-su-cihazi-15-lt-saat-dt5515"
      },
      {
        "code": "DT-5520",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "20 lt/saat",
        "listPriceEur": "3.094,66",
        "listPriceValue": 3094.66,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--2--e44a978.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5520-biyokimya-saf-su-cihazi-20-lt-saat-dt5520"
      },
      {
        "code": "DT-5530",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "30 lt/saat",
        "listPriceEur": "3.342,23",
        "listPriceValue": 3342.23,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biyokimya-saf-su-cihazlari--6--82a9f8f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5530-biyokimya-saf-su-cihazi-30-lt-saat-dt5530"
      },
      {
        "code": "DT-5540",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "40 lt/saat",
        "listPriceEur": "3.664,38",
        "listPriceValue": 3664.38,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--9--69cae87.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5540-biyokimya-saf-su-cihazi-40-lt-saat-dt5540"
      },
      {
        "code": "DT-5560",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "7.857,72",
        "listPriceValue": 7857.72,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--10--44b73bc.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5560-biyokimya-saf-su-cihazi-60-lt-saat-dt5560"
      },
      {
        "code": "DT-5580",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "80 lt/saat",
        "listPriceEur": "8.642,94",
        "listPriceValue": 8642.94,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--11--c7853d3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5580-biyokimya-saf-su-cihazi-80-lt-saat-dt5580"
      },
      {
        "code": "DT-5600",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "9.508,20",
        "listPriceValue": 9508.2,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--11--17ddb47.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5600-biyokimya-saf-su-cihazi-100-lt-saat-dt5600"
      },
      {
        "code": "DT-5650",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "10.459,02",
        "listPriceValue": 10459.02,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--11--e7c8b10.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5650-biyokimya-saf-su-cihazi-150-lt-saat-dt5650"
      },
      {
        "code": "DT-5700",
        "name": "Biyokimya Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "13.595,76",
        "listPriceValue": 13595.76,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-biochemistry-pure-water-systems--13--e75ef71.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5700-biyokimya-saf-su-cihazi-300-lt-saat-dt5700"
      }
    ]
  },
  {
    "id": "mikrobiyoloji-saf-su-cihazlari",
    "group": "laboratuvar",
    "title": "Mikrobiyoloji Saf Su Cihazları",
    "summary": "Mikrobiyoloji laboratuvarları için saf su cihazları.",
    "products": [
      {
        "code": "DT-5810",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "2.475,72",
        "listPriceValue": 2475.72,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-microbiology-pure-water-systems--9--0bfee00.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5810-mikrobiyoloji-saf-su-cihazi-10-lt-saat-dt5810"
      },
      {
        "code": "DT-5815",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "2.723,29",
        "listPriceValue": 2723.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mikrobiyoloji-saf-su-cihazlari--7--d876979.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5815-mikrobiyoloji-saf-su-cihazi-15-lt-saat-dt5815"
      },
      {
        "code": "DT-5820",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "20 lt/saat",
        "listPriceEur": "3.094,66",
        "listPriceValue": 3094.66,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-microbiology-pure-water-systems--2--efd0e36.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5820-mikrobiyoloji-saf-su-cihazi-20-lt-saat-dt5820"
      },
      {
        "code": "DT-5830",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "30 lt/saat",
        "listPriceEur": "3.342,23",
        "listPriceValue": 3342.23,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mikrobiyoloji-saf-su-cihazlari--12--ee33690.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5830-mikrobiyoloji-saf-su-cihazi-30-lt-saat-dt5830"
      },
      {
        "code": "DT-5840",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "40 lt/saat",
        "listPriceEur": "3.664,38",
        "listPriceValue": 3664.38,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mikrobiyoloji-saf-su-cihazlari--10--ff8121c.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5840-mikrobiyoloji-saf-su-cihazi-40-lt-saat-dt5840"
      },
      {
        "code": "DT-5860",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "7.857,72",
        "listPriceValue": 7857.72,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-microbiology-pure-water-systems--5--913ea94.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5860-mikrobiyoloji-saf-su-cihazi-60-lt-saat-dt5860"
      },
      {
        "code": "DT-5880",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "80 lt/saat",
        "listPriceEur": "8.642,94",
        "listPriceValue": 8642.94,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-microbiology-pure-water-systems--5--cce6f2e.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5880-mikrobiyoloji-saf-su-cihazi-80-lt-saat-dt5880"
      },
      {
        "code": "DT-5900",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "9.508,20",
        "listPriceValue": 9508.2,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mikrobiyoloji-saf-su-cihazlari--1--84869d5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5900-mikrobiyoloji-saf-su-cihazi-100-lt-saat-dt5900"
      },
      {
        "code": "DT-5950",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "10.459,02",
        "listPriceValue": 10459.02,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-microbiology-pure-water-systems--5--ada20a4.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5950-mikrobiyoloji-saf-su-cihazi-150-lt-saat-dt5950"
      },
      {
        "code": "DT-5990",
        "name": "Mikrobiyoloji Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "13.595,76",
        "listPriceValue": 13595.76,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-microbiology-pure-water-systems--7--eee90af.jpg",
        "sourceUrl": "https://www.medipure.com.tr/dt-5990-mikrobiyoloji-saf-su-cihazi-300-lt-saat-dt5990"
      }
    ]
  },
  {
    "id": "sterilizasyon-su-aritma-sistemleri",
    "group": "medikal",
    "title": "Sterilizasyon Su Arıtma Sistemleri",
    "summary": "Sterilizasyon ünitelerinin saf su ihtiyacı için sistemler.",
    "products": [
      {
        "code": "XH-8000",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "8.966,10",
        "listPriceValue": 8966.1,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilizasyon-su-sistemi--7--087e618.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8000-sterilizasyon-saf-su-cihazi-60-lt-saat-xh8000"
      },
      {
        "code": "XH-8005",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "9.862,71",
        "listPriceValue": 9862.71,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--7--74087b5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8005-sterilizasyon-saf-su-cihazi-100-lt-saat-xh8005"
      },
      {
        "code": "XH-8010",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "10.848,86",
        "listPriceValue": 10848.86,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilizasyon-su-sistemi--7--46de3ab.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8010-sterilizasyon-saf-su-cihazi-150-lt-saat-xh8010"
      },
      {
        "code": "XH-8020",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "11.934,23",
        "listPriceValue": 11934.23,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilizasyon-su-sistemi--7--721450d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8020-sterilizasyon-saf-su-cihazi-200-lt-saat-xh8020"
      },
      {
        "code": "XH-8030",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "13.127,29",
        "listPriceValue": 13127.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilizasyon-su-sistemi--1--24f1cb5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8030-sterilizasyon-saf-su-cihazi-300-lt-saat-xh8030"
      },
      {
        "code": "XH-8040",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "14.440,14",
        "listPriceValue": 14440.14,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--1--0259320.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8040-sterilizasyon-saf-su-cihazi-400-lt-saat-xh8040"
      },
      {
        "code": "XH-8050",
        "name": "Sterilizasyon Saf Su Cihazı",
        "capacity": "600 lt/saat",
        "listPriceEur": "15.883,67",
        "listPriceValue": 15883.67,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--3--c1d1eca.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8050-sterilizasyon-saf-su-cihazi-600-lt-saat-xh8050"
      },
      {
        "code": "XH-8060",
        "name": "Sterilizasyon Su Sistemi",
        "capacity": "800 lt/saat",
        "listPriceEur": "17.472,40",
        "listPriceValue": 17472.4,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilizasyon-su-sistemi--2--5a0187c.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8060-sterilizasyon-su-sistemi-800-lt-saat-xh8060"
      },
      {
        "code": "XH-8070",
        "name": "Sterilizasyon Su Sistemi",
        "capacity": "1000 lt/saat",
        "listPriceEur": "19.219,64",
        "listPriceValue": 19219.64,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--3--fddb8bb.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8070-sterilizasyon-su-sistemi-1000-lt-saat-xh8070"
      },
      {
        "code": "XH-8100",
        "name": "Sterilizasyon Su Arıtma Sistemi",
        "capacity": "2 ton/saat",
        "listPriceEur": "28.829,46",
        "listPriceValue": 28829.46,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--2--a0afddf.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8100-sterilizasyon-su-aritma-sistemi-2-ton-saat-xh8100"
      },
      {
        "code": "XH-8150",
        "name": "Sterilizasyon Su Arıtma Sistemi",
        "capacity": "5 ton/saat",
        "listPriceEur": "37.478,54",
        "listPriceValue": 37478.54,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--2--671b48a.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8150-sterilizasyon-su-aritma-sistemi-5-ton-saat-xh8150"
      },
      {
        "code": "XH-8190",
        "name": "Sterilizasyon Su Arıtma Sistemi",
        "capacity": "10 ton/saat",
        "listPriceEur": "48.721,86",
        "listPriceValue": 48721.86,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-sterilization-water-treatment-system--2--f82e8ca.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8190-sterilizasyon-su-aritma-sistemi-10-ton-saat-xh8190"
      }
    ]
  },
  {
    "id": "medikal-su-sistemleri",
    "group": "medikal",
    "title": "Medikal Su Sistemleri",
    "summary": "Klinik ve medikal uygulamalar için saf su sistemleri.",
    "products": [
      {
        "code": "XH-8700",
        "name": "Medikal Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "8.966,10",
        "listPriceValue": 8966.1,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medikal-su-aritma-sistemi--9--125297e.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8700-medikal-saf-su-cihazi-60-lt-saat-xh8700"
      },
      {
        "code": "XH-8705",
        "name": "Medikal Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "9.862,71",
        "listPriceValue": 9862.71,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--22--4d5a349.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8705-medikal-saf-su-cihazi-100-lt-saat-xh8705"
      },
      {
        "code": "XH-8710",
        "name": "Medikal Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "10.848,86",
        "listPriceValue": 10848.86,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--14--9ad64f3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8710-medikal-saf-su-cihazi-150-lt-saat-xh8710"
      },
      {
        "code": "XH-8720",
        "name": "Medikal Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "11.934,23",
        "listPriceValue": 11934.23,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medikal-su-aritma-sistemi--5--e4ede48.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8720-medikal-saf-su-cihazi-200-lt-saat-xh8720"
      },
      {
        "code": "XH-8730",
        "name": "Medikal Su Sistemi",
        "capacity": "300 lt/saat",
        "listPriceEur": "13.127,29",
        "listPriceValue": 13127.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--10--c4e30bb.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8730-medikal-su-sistemi-300-lt-saat-xh8730"
      },
      {
        "code": "XH-8750",
        "name": "Medikal Su Sistemi",
        "capacity": "600 lt/saat",
        "listPriceEur": "18.115,94",
        "listPriceValue": 18115.94,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medikal-su-aritma-sistemi--4--1db623f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8750-medikal-su-sistemi-600-lt-saat-xh8750"
      },
      {
        "code": "XH-8760",
        "name": "Medikal Su Sistemi",
        "capacity": "800 lt/saat",
        "listPriceEur": "23.549,75",
        "listPriceValue": 23549.75,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--16--d9b920f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8760-medikal-su-sistemi-800-lt-saat-xh8760"
      },
      {
        "code": "XH-8770",
        "name": "Medikal Su Arıtma Sistemi",
        "capacity": "1000 lt/saat",
        "listPriceEur": "30.615,78",
        "listPriceValue": 30615.78,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--9--7cff218.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8770-medikal-su-aritma-sistemi-1000-lt-saat-xh8770"
      },
      {
        "code": "XH-8800",
        "name": "Medikal Su Arıtma Sistemi",
        "capacity": "2000 lt/saat",
        "listPriceEur": "39.799,68",
        "listPriceValue": 39799.68,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--18--aae5499.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8800-medikal-su-aritma-sistemi-2000-lt-saat-xh8800"
      },
      {
        "code": "XH-8850",
        "name": "Medikal Su Arıtma Sistemi",
        "capacity": "5000 lt/saat",
        "listPriceEur": "55.719,84",
        "listPriceValue": 55719.84,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-medical-water-treatment--11--a85c367.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8850-medikal-su-aritma-sistemi-5000-lt-saat-xh8850"
      }
    ]
  },
  {
    "id": "deiyonize-saf-su-cihazlari",
    "group": "deiyonize",
    "title": "Deiyonize Saf Su Cihazları",
    "summary": "Organik, inorganik ve iyon yükünü ayıran deiyonize saf su cihazları.",
    "products": [
      {
        "code": "SM-3500",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "1.713,84",
        "listPriceValue": 1713.84,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deionized-pure-water-system--6--4e28f17.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3500-deiyonize-saf-su-cihazi-10-lt-saat-sm3500"
      },
      {
        "code": "SM-3510",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "1.884,93",
        "listPriceValue": 1884.93,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deionized-pure-water-system--9--b59d774.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3510-deiyonize-saf-su-cihazi-15-lt-saat-sm3510"
      },
      {
        "code": "SM-3520",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "20 lt/saat",
        "listPriceEur": "2.262,91",
        "listPriceValue": 2262.91,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deiyonize-saf-su-cihazi--3--057bea4.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3520-deiyonize-saf-su-cihazi-20-lt-saat-sm3520"
      },
      {
        "code": "SM-3530",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "30 lt/saat",
        "listPriceEur": "2.487,86",
        "listPriceValue": 2487.86,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deiyonize-saf-su-cihazi--6--622650a.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3530-deiyonize-saf-su-cihazi-30-lt-saat-sm3530"
      },
      {
        "code": "SM-3550",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "50 lt/saat",
        "listPriceEur": "6.310,40",
        "listPriceValue": 6310.4,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deiyonize-saf-su-cihazi--8--455115a.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3550-deiyonize-saf-su-cihazi-50-lt-saat-sm3550"
      },
      {
        "code": "SM-3580",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "80 lt/saat",
        "listPriceEur": "6.941,92",
        "listPriceValue": 6941.92,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deionized-pure-water-system--3--0b29cfa.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3580-deiyonize-saf-su-cihazi-80-lt-saat-sm3580"
      },
      {
        "code": "SM-3600",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "7.635,02",
        "listPriceValue": 7635.02,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deiyonize-saf-su-cihazi--8--e976078.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3600-deiyonize-saf-su-cihazi-100-lt-saat-sm3600"
      },
      {
        "code": "SM-3650",
        "name": "Deiyonize Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "8.399,37",
        "listPriceValue": 8399.37,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-deionized-pure-water-system--3--41cb8ee.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3650-deiyonize-saf-su-cihazi-150-lt-saat-sm3650"
      }
    ]
  },
  {
    "id": "elektrodeiyonizasyon-cihazlari",
    "group": "deiyonize",
    "title": "Elektrodeiyonizasyon Cihazları",
    "summary": "Elektrodeiyonizasyon (EDI) ile sürekli saf su üreten cihazlar.",
    "products": [
      {
        "code": "ED-9810",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "13.010,53",
        "listPriceValue": 13010.53,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-2-e071100.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9810-elektrodeiyonizasyon-cihazi-60-lt-saat-ed9810"
      },
      {
        "code": "ED-9820",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "15.162,62",
        "listPriceValue": 15162.62,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-2-0b223f1.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9820-elektrodeiyonizasyon-cihazi-100-lt-saat-ed9820"
      },
      {
        "code": "ED-9830",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "18.028,00",
        "listPriceValue": 18028,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-electrodeionization-system-2-1f7a353.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9830-elektrodeiyonizasyon-cihazi-150-lt-saat-ed9830"
      },
      {
        "code": "ED-9850",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "19.699,47",
        "listPriceValue": 19699.47,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-electrodeionization-system-a76758d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9850-elektrodeiyonizasyon-cihazi-300-lt-saat-ed9850"
      },
      {
        "code": "ED-9860",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "500 lt/saat",
        "listPriceEur": "23.281,19",
        "listPriceValue": 23281.19,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-3-1072aa5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9860-elektrodeiyonizasyon-cihazi-500-lt-saat-ed9860"
      },
      {
        "code": "ED-9870",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "800 lt/saat",
        "listPriceEur": "24.420,83",
        "listPriceValue": 24420.83,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-3-7b8fdf3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9870-elektrodeiyonizasyon-cihazi-800-lt-saat-ed9870"
      },
      {
        "code": "ED-9910",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "1 ton/saat",
        "listPriceEur": "27.134,25",
        "listPriceValue": 27134.25,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-3-ebfc715.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9910-elektrodeiyonizasyon-cihazi-1-ton-saat-ed9910"
      },
      {
        "code": "ED-9920",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "2 ton/saat",
        "listPriceEur": "34.623,30",
        "listPriceValue": 34623.3,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-electrodeionization-system-4-a734eca.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9920-elektrodeiyonizasyon-cihazi-2-ton-saat-ed9920"
      },
      {
        "code": "ED-9930",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "3 ton/saat",
        "listPriceEur": "46.779,45",
        "listPriceValue": 46779.45,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-4-c8e4c39.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9930-elektrodeiyonizasyon-cihazi-3-ton-saat-ed9930"
      },
      {
        "code": "ED-9940",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "6 m³/saat",
        "listPriceEur": "58.121,57",
        "listPriceValue": 58121.57,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-4-5e8358d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9940-elektrodeiyonizasyon-cihazi-6-m3-saat-ed9940"
      },
      {
        "code": "ED-9950",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "8 ton/saat",
        "listPriceEur": "72.882,60",
        "listPriceValue": 72882.6,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-electrodeionization-system-5-2dacb4d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9950-elektrodeiyonizasyon-cihazi-8-ton-saat-ed9950"
      },
      {
        "code": "ED-9960",
        "name": "Elektrodeiyonizasyon Cihazı",
        "capacity": "10 ton/saat",
        "listPriceEur": "87.319,41",
        "listPriceValue": 87319.41,
        "image": "https://www.medipure.com.tr/img/products/small/elektrodeiyonizasyon-cihazi-5-5eff839.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ed-9960-elektrodeiyonizasyon-cihazi-10-ton-saat-ed9960"
      }
    ]
  },
  {
    "id": "distile-su-cihazlari",
    "group": "deiyonize",
    "title": "Distile Su Cihazları",
    "summary": "Distilasyon ile saf su üreten cihazlar.",
    "products": [
      {
        "code": "SM-3012",
        "name": "Distile Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "1.285,00",
        "listPriceValue": 1285,
        "image": "https://www.medipure.com.tr/img/products/small/distile-su-cihazi-1--8--8f4db3c.webp",
        "sourceUrl": "https://www.medipure.com.tr/sm-3012-distile-su-cihazi-10-lt-saat-sm3012"
      },
      {
        "code": "SM-3010",
        "name": "Distile Su Cihazı",
        "capacity": "10 lt/saat",
        "listPriceEur": "614,10",
        "listPriceValue": 614.1,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-distilled-water-system--4--a96626f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3010-distile-su-cihazi-10-lt-saat-sm3010"
      },
      {
        "code": "SM-3015",
        "name": "Distile Su Cihazı",
        "capacity": "15 lt/saat",
        "listPriceEur": "713,00",
        "listPriceValue": 713,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-distile-su-cihazi--4--199cf27.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3015-distile-su-cihazi-15-lt-saat-sm3015"
      },
      {
        "code": "SM-3020",
        "name": "Distile Su Cihazı",
        "capacity": "20 lt/saat",
        "listPriceEur": "810,75",
        "listPriceValue": 810.75,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-distile-su-cihazi--1--1355d9c.jpg",
        "sourceUrl": "https://www.medipure.com.tr/sm-3020-distile-su-cihazi-20-lt-saat-sm3020"
      }
    ]
  },
  {
    "id": "mobil-saf-su-cihazlari",
    "group": "mobil",
    "title": "Mobil Saf Su Cihazları",
    "summary": "Sahada ve geçici hatlarda kullanılan taşınabilir saf su cihazları.",
    "products": [
      {
        "code": "XC-9100",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "7.578,71",
        "listPriceValue": 7578.71,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-pure-water-system--6--0aa5b4f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9100-mobil-saf-su-cihazi-60-lt-saat-xc9100"
      },
      {
        "code": "XC-9105",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "8.336,05",
        "listPriceValue": 8336.05,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-pure-water-system--6--9560291.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9105-mobil-saf-su-cihazi-100-lt-saat-xc9105"
      },
      {
        "code": "XC-9110",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "9.170,59",
        "listPriceValue": 9170.59,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-pure-water-system--6--ce422ae.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9110-mobil-saf-su-cihazi-150-lt-saat-xc9110"
      },
      {
        "code": "XC-9120",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "11.921,77",
        "listPriceValue": 11921.77,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-saf-su-cihazi--5--7f854f6.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9120-mobil-saf-su-cihazi-200-lt-saat-xc9120"
      },
      {
        "code": "XC-9130",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "13.113,01",
        "listPriceValue": 13113.01,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-pure-water-system--5--f24430f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9130-mobil-saf-su-cihazi-300-lt-saat-xc9130"
      },
      {
        "code": "XC-9140",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "14.425,38",
        "listPriceValue": 14425.38,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-saf-su-cihazi--5--f7a0c79.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9140-mobil-saf-su-cihazi-400-lt-saat-xc9140"
      },
      {
        "code": "XC-9150",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "600 lt/saat",
        "listPriceEur": "15.866,85",
        "listPriceValue": 15866.85,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-pure-water-system--5--3ea671e.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9150-mobil-saf-su-cihazi-600-lt-saat-xc9150"
      },
      {
        "code": "XC-9170",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "800 lt/saat",
        "listPriceEur": "17.453,40",
        "listPriceValue": 17453.4,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-saf-su-cihazi--2--3b8df01.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9170-mobil-saf-su-cihazi-800-lt-saat-xc9170"
      },
      {
        "code": "XC-9190",
        "name": "Mobil Saf Su Cihazı",
        "capacity": "1000 lt/saat",
        "listPriceEur": "19.199,68",
        "listPriceValue": 19199.68,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-saf-su-cihazi--2--5492cb6.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9190-mobil-saf-su-cihazi-1000-lt-saat-xc9190"
      }
    ]
  },
  {
    "id": "mobil-ultra-saf-su-cihazlari",
    "group": "mobil",
    "title": "Mobil Ultra Saf Su Cihazları",
    "summary": "Taşınabilir ultra saf su cihazları.",
    "products": [
      {
        "code": "XC-9700",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "12.561,98",
        "listPriceValue": 12561.98,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--4--4cd6ef0.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9700-mobil-ultra-saf-su-cihazi-60-lt-saat-xc9700"
      },
      {
        "code": "XC-9705",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "15.200,00",
        "listPriceValue": 15200,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--4--af453d5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9705-mobil-ultra-saf-su-cihazi-100-lt-saat-xc9705"
      },
      {
        "code": "XC-9710",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "16.720,31",
        "listPriceValue": 16720.31,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--3--7469602.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9710-mobil-ultra-saf-su-cihazi-150-lt-saat-xc9710"
      },
      {
        "code": "XC-9720",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "18.392,02",
        "listPriceValue": 18392.02,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--3--9fcfbf1.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9720-mobil-ultra-saf-su-cihazi-200-lt-saat-xc9720"
      },
      {
        "code": "XC-9730",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "20.231,22",
        "listPriceValue": 20231.22,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--2--a2373cc.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9730-mobil-ultra-saf-su-cihazi-300-lt-saat-xc9730"
      },
      {
        "code": "XC-9740",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "22.254,03",
        "listPriceValue": 22254.03,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--1--2ef3af6.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9740-mobil-ultra-saf-su-cihazi-400-lt-saat-xc9740"
      },
      {
        "code": "XC-9750",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "600 lt/saat",
        "listPriceEur": "24.479,75",
        "listPriceValue": 24479.75,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-ultrapure-water-system--2--b579c71.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9750-mobil-ultra-saf-su-cihazi-600-lt-saat-xc9750"
      },
      {
        "code": "XC-9770",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "800 lt/saat",
        "listPriceEur": "26.927,73",
        "listPriceValue": 26927.73,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobil-ultra-saf-su-cihazi--1--7be2a49.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9770-mobil-ultra-saf-su-cihazi-800-lt-saat-xc9770"
      },
      {
        "code": "XC-9790",
        "name": "Mobil Ultra Saf Su Cihazı",
        "capacity": "1000 lt/saat",
        "listPriceEur": "29.620,50",
        "listPriceValue": 29620.5,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-mobile-ultrapure-water-system--2--0dc9ed1.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xc-9790-mobil-ultra-saf-su-cihazi-1000-lt-saat-xc9790"
      }
    ]
  },
  {
    "id": "endustriyel-su-sistemleri",
    "group": "endustri",
    "title": "Endüstriyel Su Sistemleri",
    "summary": "Üretim tesisleri için endüstriyel saf ve ultra saf su sistemleri.",
    "products": [
      {
        "code": "XL-7000",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "6.956,29",
        "listPriceValue": 6956.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industry-pure-water-system--7--aaadcca.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7000-endustri-saf-su-cihazi-60-lt-saat-xl7000"
      },
      {
        "code": "XL-7005",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "7.650,83",
        "listPriceValue": 7650.83,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustriyel-saf-su-cihazi--4--e330d48.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7005-endustri-saf-su-cihazi-100-lt-saat-xl7005"
      },
      {
        "code": "XL-7020",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "8.416,76",
        "listPriceValue": 8416.76,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustriyel-saf-su-cihazi--5--2cc599d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7020-endustri-saf-su-cihazi-200-lt-saat-xl7020"
      },
      {
        "code": "XL-7040",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "11.231,22",
        "listPriceValue": 11231.22,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industry-pure-water-system--1--8ded610.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7040-endustri-saf-su-cihazi-400-lt-saat-xl7040"
      },
      {
        "code": "XL-7050",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "10 ton/gün",
        "listPriceEur": "14.245,33",
        "listPriceValue": 14245.33,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industry-pure-water-system--4--96a24df.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7050-endustri-saf-su-cihazi-10-ton-gun-xl7050"
      },
      {
        "code": "XL-7060",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "20 ton/gün",
        "listPriceEur": "17.806,36",
        "listPriceValue": 17806.36,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustriyel-saf-su-cihazi--1--ac3d517.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7060-endustri-saf-su-cihazi-20-ton-gun-xl7060"
      },
      {
        "code": "XL-7080",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "30 ton/gün",
        "listPriceEur": "22.259,16",
        "listPriceValue": 22259.16,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industry-pure-water-system--3--1a163e3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7080-endustri-saf-su-cihazi-30-ton-gun-xl7080"
      },
      {
        "code": "XL-7090",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "50 ton/gün",
        "listPriceEur": "27.822,74",
        "listPriceValue": 27822.74,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustriyel-saf-su-cihazi--7--700ff86.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7090-endustri-saf-su-cihazi-50-ton-gun-xl7090"
      },
      {
        "code": "XL-7130",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "100 ton/gün",
        "listPriceEur": "41.735,32",
        "listPriceValue": 41735.32,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustriyel-saf-su-cihazi--3--e55b203.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7130-endustri-saf-su-cihazi-100-ton-gun-xl7130"
      },
      {
        "code": "XL-7180",
        "name": "Endüstri Saf Su Cihazı",
        "capacity": "200 ton/gün",
        "listPriceEur": "62.601,77",
        "listPriceValue": 62601.77,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustriyel-saf-su-cihazi--3--5673709.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7180-endustri-saf-su-cihazi-200-ton-gun-xl7180"
      },
      {
        "code": "XL-9305",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "10.853,70",
        "listPriceValue": 10853.7,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustri-ultra-safsu-cihazi--2--334253f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9305-endustri-ultra-saf-su-cihazi-100-lt-saat-xl9305"
      },
      {
        "code": "XL-9310",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "13.685,10",
        "listPriceValue": 13685.1,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industryultrapurewatersystem--3--4d3155d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9310-endustri-ultra-saf-su-cihazi-150-lt-saat-xl9310"
      },
      {
        "code": "XL-9320",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "16.422,12",
        "listPriceValue": 16422.12,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustri-ultra-safsu-cihazi--4--0de6cb7.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9320-endustri-ultra-saf-su-cihazi-200-lt-saat-xl9320"
      },
      {
        "code": "XL-9330",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "19.706,06",
        "listPriceValue": 19706.06,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industryultrapurewatersystem--1--d8f7618.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9330-endustri-ultra-saf-su-cihazi-300-lt-saat-xl9330"
      },
      {
        "code": "XL-9340",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "23.648,24",
        "listPriceValue": 23648.24,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industryultrapurewatersystem--1--837504d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9340-endustri-ultra-saf-su-cihazi-400-lt-saat-xl9340"
      },
      {
        "code": "XL-9370",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "1 ton/saat",
        "listPriceEur": "31.924,64",
        "listPriceValue": 31924.64,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustri-ultra-safsu-cihazi--4--1d629e5.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9370-endustri-ultra-saf-su-cihazi-1-ton-saat-xl9370"
      },
      {
        "code": "XL-9450",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "5 ton/saat",
        "listPriceEur": "79.811,60",
        "listPriceValue": 79811.6,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-industryultrapurewatersystem--4--1ef6629.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9450-endustri-ultra-saf-su-cihazi-5-ton-saat-xl9450"
      },
      {
        "code": "XL-9490",
        "name": "Endüstri Ultra Saf Su Cihazı",
        "capacity": "10 ton/saat",
        "listPriceEur": "107.745,66",
        "listPriceValue": 107745.66,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-endustri-ultra-safsu-cihazi--3--a710e46.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-9490-endustri-ultra-saf-su-cihazi-10-ton-saat-xl9490"
      }
    ]
  },
  {
    "id": "metal-kaplama-saf-su-cihazlari",
    "group": "endustri",
    "title": "Metal Kaplama Saf Su Cihazları",
    "summary": "Metal kaplama hatları için saf su cihazları.",
    "products": [
      {
        "code": "XL-7500",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "6.956,29",
        "listPriceValue": 6956.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-kaplama-saf-su-sistemi--2--4d28977.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7500-metal-kaplama-saf-su-cihazi-60-lt-saat-xl7500"
      },
      {
        "code": "XL-7505",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "7.650,83",
        "listPriceValue": 7650.83,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-coating-water-system--5--00fc4db.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7505-metal-kaplama-saf-su-cihazi-100-lt-saat-xl7505"
      },
      {
        "code": "XL-7520",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "8.416,76",
        "listPriceValue": 8416.76,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-coating-water-system--2--40be65f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7520-metal-kaplama-saf-su-cihazi-200-lt-saat-xl7520"
      },
      {
        "code": "XL-7530",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "6 ton/gün",
        "listPriceEur": "11.395,78",
        "listPriceValue": 11395.78,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-kaplama-saf-su-sistemi--5--0b1c7e1.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7530-metal-kaplama-saf-su-cihazi-6-ton-gun-xl7530"
      },
      {
        "code": "XL-7550",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "10 ton/gün",
        "listPriceEur": "14.245,33",
        "listPriceValue": 14245.33,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-coating-water-system--1--39097b8.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7550-metal-kaplama-saf-su-cihazi-10-ton-gun-xl7550"
      },
      {
        "code": "XL-7560",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "20 ton/gün",
        "listPriceEur": "17.806,36",
        "listPriceValue": 17806.36,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-kaplama-saf-su-sistemi--3--d3ac7db.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7560-metal-kaplama-saf-su-cihazi-20-ton-gun-xl7560"
      },
      {
        "code": "XL-7580",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "30 ton/gün",
        "listPriceEur": "22.259,16",
        "listPriceValue": 22259.16,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-coating-water-system--4--411249f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7580-metal-kaplama-saf-su-cihazi-30-ton-gun-xl7580"
      },
      {
        "code": "XL-7590",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "50 ton/gün",
        "listPriceEur": "27.822,74",
        "listPriceValue": 27822.74,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-kaplama-saf-su-sistemi--1--3f561b7.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7590-metal-kaplama-saf-su-cihazi-50-ton-gun-xl7590"
      },
      {
        "code": "XL-7610",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "100 ton/gün",
        "listPriceEur": "41.735,32",
        "listPriceValue": 41735.32,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-coating-water-system--4--3d37d27.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7610-metal-kaplama-saf-su-cihazi-100-ton-gun-xl7610"
      },
      {
        "code": "XL-7650",
        "name": "Metal Kaplama Saf Su Cihazı",
        "capacity": "200 ton/gün",
        "listPriceEur": "62.601,77",
        "listPriceValue": 62601.77,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-metal-kaplama-saf-su-sistemi--1--cccc648.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xl-7650-metal-kaplama-saf-su-cihazi-200-ton-gun-xl7650"
      }
    ]
  },
  {
    "id": "kozmetik-su-aritma-sistemleri",
    "group": "endustri",
    "title": "Kozmetik Su Arıtma Sistemleri",
    "summary": "Kozmetik üretim tesisleri için saf su sistemleri.",
    "products": [
      {
        "code": "XH-8400",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "60 lt/saat",
        "listPriceEur": "6.323,46",
        "listPriceValue": 6323.46,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--2--c8dd813.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8400-kozmetik-saf-su-cihazi-60-lt-saat-xh8400"
      },
      {
        "code": "XH-8410",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "100 lt/saat",
        "listPriceEur": "6.956,29",
        "listPriceValue": 6956.29,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--2--80c0df7.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8410-kozmetik-saf-su-cihazi-100-lt-saat-xh8410"
      },
      {
        "code": "XH-8415",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "150 lt/saat",
        "listPriceEur": "7.650,83",
        "listPriceValue": 7650.83,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--4--f8d3028.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8415-kozmetik-saf-su-cihazi-150-lt-saat-xh8415"
      },
      {
        "code": "XH-8420",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "200 lt/saat",
        "listPriceEur": "9.946,20",
        "listPriceValue": 9946.2,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--2--73e225e.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8420-kozmetik-saf-su-cihazi-200-lt-saat-xh8420"
      },
      {
        "code": "XH-8430",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "300 lt/saat",
        "listPriceEur": "10.942,03",
        "listPriceValue": 10942.03,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--1--41708e3.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8430-kozmetik-saf-su-cihazi-300-lt-saat-xh8430"
      },
      {
        "code": "XH-8440",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "400 lt/saat",
        "listPriceEur": "12.035,87",
        "listPriceValue": 12035.87,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--1--dd5d28d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8440-kozmetik-saf-su-cihazi-400-lt-saat-xh8440"
      },
      {
        "code": "XH-8450",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "600 lt/saat",
        "listPriceEur": "13.238,61",
        "listPriceValue": 13238.61,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--3--8f31e0c.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8450-kozmetik-saf-su-cihazi-600-lt-saat-xh8450"
      },
      {
        "code": "XH-8460",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "800 lt/saat",
        "listPriceEur": "14.563,56",
        "listPriceValue": 14563.56,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--7--1e6673b.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8460-kozmetik-saf-su-cihazi-800-lt-saat-xh8460"
      },
      {
        "code": "XH-8470",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "10 ton/gün",
        "listPriceEur": "12.035,87",
        "listPriceValue": 12035.87,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--1--ab2516a.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8470-kozmetik-saf-su-cihazi-10-ton-gun-xh8470"
      },
      {
        "code": "XH-8480",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "15 ton/gün",
        "listPriceEur": "13.238,61",
        "listPriceValue": 13238.61,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--6--60ca50b.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8480-kozmetik-saf-su-cihazi-15-ton-gun-xh8480"
      },
      {
        "code": "XH-8500",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "20 ton/gün",
        "listPriceEur": "14.563,56",
        "listPriceValue": 14563.56,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--2--7e9782a.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8500-kozmetik-saf-su-cihazi-20-ton-gun-xh8500"
      },
      {
        "code": "XH-8530",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "30 ton/gün",
        "listPriceEur": "17.476,03",
        "listPriceValue": 17476.03,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--6--94051dd.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8530-kozmetik-saf-su-cihazi-30-ton-gun-xh8530"
      },
      {
        "code": "XH-8550",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "50 ton/gün",
        "listPriceEur": "20.970,51",
        "listPriceValue": 20970.51,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--1--f7c221b.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8550-kozmetik-saf-su-cihazi-50-ton-gun-xh8550"
      },
      {
        "code": "XH-8570",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "70 ton/gün",
        "listPriceEur": "25.165,58",
        "listPriceValue": 25165.58,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-kozmetik-saf-su-cihazi--3--d98ae93.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8570-kozmetik-saf-su-cihazi-70-ton-gun-xh8570"
      },
      {
        "code": "XH-8600",
        "name": "Kozmetik Saf Su Cihazı",
        "capacity": "100 ton/gün",
        "listPriceEur": "30.197,97",
        "listPriceValue": 30197.97,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-cosmetics-water-system--1--bbb253d.jpg",
        "sourceUrl": "https://www.medipure.com.tr/xh-8600-kozmetik-saf-su-cihazi-100-ton-gun-xh8600"
      }
    ]
  },
  {
    "id": "ters-ozmos-cihazlari",
    "group": "endustri",
    "title": "Ters Ozmos Cihazları",
    "summary": "Ters ozmoz (RO) prensibiyle çalışan saf su cihazları.",
    "products": [
      {
        "code": "UT-4000",
        "name": "Ters Ozmos Cihazı",
        "capacity": "2 ton/gün",
        "listPriceEur": "4.641,98",
        "listPriceValue": 4641.98,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-reverse-osmosis-system--2--54b3c90.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4000-ters-ozmos-cihazi-2-ton-gun-ut4000"
      },
      {
        "code": "UT-4005",
        "name": "Ters Ozmos Cihazı",
        "capacity": "3 ton/gün",
        "listPriceEur": "5.673,53",
        "listPriceValue": 5673.53,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-ters-ozmos-cihazi--1--f8e8320.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4005-ters-ozmos-cihazi-3-ton-gun-ut4005"
      },
      {
        "code": "UT-4010",
        "name": "Ters Ozmos Cihazı",
        "capacity": "5 ton/gün",
        "listPriceEur": "6.705,08",
        "listPriceValue": 6705.08,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-ters-ozmos-cihazi--2--11d56e7.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4010-ters-ozmos-cihazi-5-ton-gun-ut4010"
      },
      {
        "code": "UT-4020",
        "name": "Ters Ozmos Cihazı",
        "capacity": "10 ton/gün",
        "listPriceEur": "8.149,25",
        "listPriceValue": 8149.25,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-ters-ozmos-cihazi--2--b2f12ee.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4020-ters-ozmos-cihazi-10-ton-gun-ut4020"
      },
      {
        "code": "UT-4030",
        "name": "Ters Ozmos Cihazı",
        "capacity": "15 ton/gün",
        "listPriceEur": "10.831,28",
        "listPriceValue": 10831.28,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-reverse-osmosis-system--4--a814b3f.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4030-ters-ozmos-cihazi-15-ton-gun-ut4030"
      },
      {
        "code": "UT-4040",
        "name": "Ters Ozmos Cihazı",
        "capacity": "20 ton/gün",
        "listPriceEur": "12.455,31",
        "listPriceValue": 12455.31,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-ters-ozmos-cihazi--3--e8a5519.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4040-ters-ozmos-cihazi-20-ton-gun-ut4040"
      },
      {
        "code": "UT-4050",
        "name": "Ters Ozmos Cihazı",
        "capacity": "30 ton/gün",
        "listPriceEur": "15.569,79",
        "listPriceValue": 15569.79,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-reverse-osmosis-system--5--43fee20.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4050-ters-ozmos-cihazi-30-ton-gun-ut4050"
      },
      {
        "code": "UT-4060",
        "name": "Ters Ozmos Cihazı",
        "capacity": "50 ton/gün",
        "listPriceEur": "19.461,91",
        "listPriceValue": 19461.91,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-ters-ozmos-cihazi--4--203fada.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4060-ters-ozmos-cihazi-50-ton-gun-ut4060"
      },
      {
        "code": "UT-4080",
        "name": "Ters Ozmos Cihazı",
        "capacity": "70 ton/gün",
        "listPriceEur": "24.328,71",
        "listPriceValue": 24328.71,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-reverse-osmosis-system--5--d6a28b0.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4080-ters-ozmos-cihazi-70-ton-gun-ut4080"
      },
      {
        "code": "UT-4100",
        "name": "Ters Ozmos Cihazı",
        "capacity": "100 ton/gün",
        "listPriceEur": "31.996,15",
        "listPriceValue": 31996.15,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-reverse-osmosis-system--5--1888db6.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4100-ters-ozmos-cihazi-100-ton-gun-ut4100"
      },
      {
        "code": "UT-4200",
        "name": "Ters Ozmos Cihazı",
        "capacity": "200 ton/gün",
        "listPriceEur": "47.995,62",
        "listPriceValue": 47995.62,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-ters-ozmos-cihazi--4--f4d3b30.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4200-ters-ozmos-cihazi-200-ton-gun-ut4200"
      },
      {
        "code": "UT-4300",
        "name": "Ters Ozmos Cihazı",
        "capacity": "500 ton/gün",
        "listPriceEur": "71.992,04",
        "listPriceValue": 71992.04,
        "image": "https://www.medipure.com.tr/img/products/small/medipure-reverse-osmosis-system--5--09b3846.jpg",
        "sourceUrl": "https://www.medipure.com.tr/ut-4300-ters-ozmos-cihazi-500-ton-gun-ut4300"
      }
    ]
  }
];

export function allMedipureProducts() {
  return MEDIPURE_CATEGORIES.flatMap((category) =>
    category.products.map((product) => {
      const details = MEDIPURE_DETAILS_BY_CODE[product.code] || {};
      return {
        ...product,
        ...details,
        categoryId: category.id,
        categoryTitle: category.title,
        group: category.group
      };
    })
  );
}
