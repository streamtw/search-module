import type { CharityOrganization, DonationProject, CharityProduct } from './types.js';

export const MOCK_CHARITY_ORGANIZATIONS: CharityOrganization[] = [
  {
    id: 1,
    title: '公益團體名稱公益團體名稱公益團',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: 2,
    title: '公益團體名稱公益團體名稱公益團',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/2/200/300',
  },
  {
    id: 3,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/3/200/300',
  },
  {
    id: 4,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/4/200/300',
  },
  {
    id: 5,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/5/200/300',
  },
  {
    id: 6,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/6/200/300',
  },
  {
    id: 7,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/7/200/300',
  },
  {
    id: 8,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/8/200/300',
  },
  {
    id: 9,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/9/200/300',
  },
  {
    id: 10,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/10/200/300',
  },
];

export const MOCK_DONATION_PROJECTS: DonationProject[] = [
  {
    id: 1,
    organization: '社團法人台灣善耘社福協會',
    title: '助學金 | 點亮弱勢孩子的求學路',
    tags: ['兒少照護', '婦女關懷', '弱勢扶貧'],
    image: 'https://picsum.photos/id/21/600/400',
  },
  {
    id: 2,
    organization: '社團法人苗栗縣社會福利促進協會',
    title: '健康老化，從社區開始—長者延緩失能陪伴',
    tags: ['老人照護', '公共議題', '社區發展'],
    image: 'https://picsum.photos/id/22/600/400',
  },
  {
    id: 3,
    organization: 'RE-THINK 重新思考',
    title: '垃圾在哪，我們就到哪！',
    tags: ['環境保護', '生態保育'],
    image: 'https://picsum.photos/id/23/600/400',
  },
];

export const MOCK_CHARITY_PRODUCTS: CharityProduct[] = [
  {
    id: 1,
    title: '給能哥系列 | 不鏽鋼手提冰壩杯',
    organization: '白永恩神父基金會',
    price: 'TWD 579',
    image: 'https://picsum.photos/id/40/300/300',
  },
  {
    id: 2,
    title: '給能哥系列 | 松尼奇尼聯名款~涼感應援巾',
    organization: '白永恩神父基金會',
    price: 'TWD 329',
    image: 'https://picsum.photos/id/42/300/300',
  },
  {
    id: 3,
    title: '給能哥系列 | 不求人搥背棒',
    organization: '白永恩神父基金會',
    price: 'TWD 459',
    image: 'https://picsum.photos/id/43/300/300',
  },
  {
    id: 4,
    title: 'SDGs | 純手工~洋蔥染抱枕',
    organization: '白永恩神父基金會',
    price: 'TWD 120 - 550',
    image: 'https://picsum.photos/id/45/300/300',
  },
  {
    id: 5,
    title: '豐收束口袋',
    organization: '白永恩神父基金會',
    price: 'TWD 210',
    image: 'https://picsum.photos/id/48/300/300',
  },
  {
    id: 6,
    title: '排灣族琉璃珠 | 手作鑰匙圈',
    organization: '白永恩神父基金會',
    price: 'TWD 450',
    image: 'https://picsum.photos/id/49/300/300',
  },
];
