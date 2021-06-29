#!/usr/bin/env node

const shell = require("shelljs")
const colors = require("colors")
const simplebig = require("simplebig")
const argv = require('yargs').argv;
const stdio = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const charmap_str = '虛虚,藏蔵,繪絵,聰聡,淺浅,亞亜,實実,稻稲,國国,櫻桜,德徳,畫画,貓猫,條条,富冨,麥麦,鹽塩,內内,寶宝,藥薬,邊辺,滿満,惠恵,遙遥,戰戦,鬥闘,驗験,澤沢,壽寿,螢蛍,寫写,德徳,總総,步歩,春春,數数,萬万,轉転,廣広,歲歳,遲遅,驅駆,擴拡,樂楽,裝装,縣県,與与,廳庁,繩縄,霸覇,聲声,釋釈,顏顔,彌弥,兒児,彈弾,學学,圖図,會会,區区,總総,獨独,龜亀,樣様,讓譲,圓円,劍剣,價価,殘残,醫医,發発,檢検,勞労,臟臓,查査,彥彦,關関,惡悪,綠緑,焰焔,樓楼,黃黄,獸獣,濟済,惱悩,讀読,亂乱,龍竜,靈霊,姬姫,將将,從従,鐵鉄,曉暁,來来,覺覚,禪禅,戶戸,賣売,濱浜,當当,氣気,斷断,聽聴,榮栄,勸勧,勳勲,增増,彪尨,圍囲,單単,處処,傳伝,舖舗,溫温,巖巌,寬寛'
const charmap = {}

function readLine() {
  return new Promise(resolve => {
    stdio.on('line', resolve)
  })
}

function close() {
  stdio.close()
}

+async function(){
  // init map
  charmap_str.split(',').forEach(cm => {
    const [from, to] = cm.split('').map(e => e.trim())
    if (from.length && to.length){
      charmap[from] = to
    }
  })
  argv._.forEach(s => {
    convert(s)
    close()
  })

  if (argv._.length){
    return ;
  }
  let counter = 0;
  while(true){
    const t = await readLine()
    if (t.trim() == ''){
      counter ++;
    } else {
      convert(t)
    }
    if (counter == 2){
      close()
    }
  }
}()

function convert(sentence){
  sentence = sentence.split('').map(c => charmap[c] || c).join('')
  sentence = simplebig.s2t(sentence)
  sentence = sentence.split('').map(c => charmap[c] || c).join('')
  const jh = shell.exec(`echo "${sentence}" | kakasi -iutf8 -outf8 -JH`, {
    silent: true
  }).stdout.trim()
  const ja = shell.exec(`echo "${sentence}" | kakasi -iutf8 -outf8 -Ja`, {
    silent: true
  }).stdout.trim()
  console.log(`${sentence}: ${colors.green(jh)} ${colors.green(ja)}\n`);
}