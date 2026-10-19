---
# ── Kart ve başlık ───────────────────────────────
name: Claween
icon: 🐾
subtitle: keeper of forgotten stories
portrait: assets/portrait.png     # karakterler sayfasındaki kart + profildeki büyük resim
footer: 🐾 ✦ 🐾
quote: "E, Claween’in girdiği bir delikten kaçamama ihtimali olamaz zaten!"   # profilin üstündeki alıntı (istersen sil)
quoteSource: Bölüm 1, Zindandan Kaçış

# ── Karakter kartı (istediğin kadar satır ekleyebilirsin) ──
stats:
  - label: 🐾 IRK
    value: Tabaxi
  - label: 🍃 ALIGNMENT
    value: Chaotic Good
  - label: 🐟 DOĞASI
    value: Meraklı ve Munzur

# ── Hikâyeler ────────────────────────────────────
# Klasör adı: menüde görünecek başlık. Sıra da buradaki sıradır.
categories:
  bolumler: Bölümler
  siirler: Şiirler
storiesIntro: Soldaki menüyü kullanarak Claween'in maceralarına veya şiirlerine göz atabilirsin.

# ── Tema ─────────────────────────────────────────
fonts: https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,500&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap
theme:
  background: "#fbf2e8"     # kum
  paper: "#fffaf3"
  border: "#ecd2bb"
  title: "#8a3a17"          # pişmiş toprak
  text: "#5a3b31"
  light: "#9a7262"
  accent: "#d0652b"         # Claween'in kürkü
  accent-hover: "#a8481a"
  note: "#ffe6ad"
  border-note: "#eaa23a"
  jade: "#2f7d6d"           # Maztica ormanı
  deep: "#2a1913"
  night: "#1c2142"          # Anukai bölümü: gece
  moon: "#ece6d6"
  blood: "#5e1b19"          # Belthar bölümü: kanlı ay
  heading-font: "Fraunces, Georgia, serif"
  body-font: "Nunito, 'Segoe UI', sans-serif"
  hand-font: "Caveat, 'Segoe Print', cursive"
---

## Maztica ve Yaşayanları

{% panel %}
Maztica kıtasına tabaxilerin ve anukailerin (köpek adamlar) nasıl geldiği hala tartışılan bir konudur.

Tabaxilere göre binyıllar önce, eski kıtada acımasız anukai akınları sebebiyle tabaxiler rahat yüzü göremez ve sürekli katledilirler. Tanrıça Sunara onların feryadını duyar ve tüm gücünü kullanarak denizleri kurutur. Sular çekilince ortaya çıkan kara yolu sayesinde tabaxiler, anukai zulmünden kaçarak kimselerin bilmediği Maztica kıtasına ulaşırlar. Kıtada o zamanlar sadece vahşi hayvanlar ve devler yaşamaktadır. Ormanlar sık, ağaçlar yüksektir, güneş ışığı kendini hiçbir zaman esirgemez; bir tabaxinin rahat edebilmesi için en ideal yerdir. Lakin yağmurlar gecikir, denizler tekrar dolmadan tabaxileri takip eden anukailer Maztica’ya ulaşır. Yağmurlar denizi tekrar doldurunca iki ırk da kıtada mahsur kalır, tabaxiler hiçbir zaman kaderlerinden kurtulamaz.

Anukailere göre ise hikâye biraz farklıdır. Onlara göre eski kıtada anukailer aslında kendi hâllerinde yaşamak isterlerken sürekli tabaxi saldırılarına maruz kalırlar. Bir orta yol bulmak için birçok kez iletişime geçmek isterler, hatta bazı dönemlerde ateşkes anlaşmaları bile yapılır fakat bu anlaşmalar hiçbir zaman uzun sürmez, her seferinde tabaxiler tarafından bir bahane ile bozulur. Tanrı Wepkar onların hâline acır ve yeryüzüne inererek onlara liderlik eder, anukaileri gizemli bir ruh geçidinden geçirerek Maztica’ya götürür. Anukailer sonunda tabaxilerden kurtuldukları için çok sevinirler ama sevinçleri uzun sürmez çünkü açık kalan geçitten tabaxiler de içeri girmiştir. Tanrı Wepkar bunu fark edince geçidi hemen kapatır ama artık çok geçtir. Geçit kapanır, fakat iki ırk da Maztica’da mahsur kalır, anukailer hiçbir zaman kaderlerinden kurtulamaz.

Devler ise topluluk hâlinde yaşamadıkları ve hikâyelerini anlatmadıkları için kimse kıtanın gerçek geçmişini bilmez. Devler bu iki ırkın varlığından hoşlanmaz, onlara karşı savaşırlar ama onları tamamen defetmeye güçleri yetmez. Böylece iki ezeli düşman, devlerle birlikte binyıllar boyunca, hiçbir dış etkene maruz kalmadan Maztica’da yaşarlar.

İnandıkları tanrılar da farklıdır, üstelik bu tanrıların gerçekten olup olmadığı ya da güç verip vermediği bile kesin değildir. Her iki ırkın da kutsal hikâyeleri vardır, fakat kimse bu tanrıların kudretine doğrudan şahit olmamıştır. Yine de başka tanrıların varlığı bilinmediği için, inanmaya devam ederler.
{% endpanel %}

{% realm "gunes", "Güneşin çocukları" %}
## Tabaxi Tanrıları

{% panel "assets/Sunara.png" %}
### 🌞Sunara🌞

Güneşin, ısının, dinlenmenin ve gece görüşünün tanrıçasıdır. Birçok tabaxi, Sunara’nın aslında güneşin ta kendisi olduğuna inanır. Duaların yalnızca güneş görünürken kabul edildiği söylenir çünkü Sunara sadece o zaman kullarını en iyi şekilde görebilir. Sunara dinlenmeye inanır, bu yüzden 12.00–15.00 arasını siesta saati olarak kullarına hediye etmiştir. Bu saatlerde tabaxiler her işi bırakır ve güneşin altında uyurlar, bunun tembellik değil, tanrıçaya ibadet olduğu kabul edilir. Aynı zamanda Sunara’nın kullarına bir armağanı daha vardır, rivayete göre, gece de görebilsinler diye kullarının gözlerine güneşinden küçük bir parça bırakmıştır, bu yüzden tabaxiler karanlıkta da görebilir.
{% endpanel %}

{% panel "assets/Bastara.png" %}
### 🌹Bastara🥀

Çocukların, anneliğin, doğumun, ölümün ve reenkarnasyonun tanrıçasıdır. Tabaxi inancına göre dişilerin memelerine kendi sütünden bir parça bahşeden odur. Bu süt sayesinde yeni doğanlar beslenir, güçlenir ve hastalıklardan korunur. Doğum sırasında da annelere yardım ettiği söylenir, görünmez eliyle çocuğu rahimden iter ve ona ilk nefesini verir; fakat bu nefes ödünçtür, bir tabaxi öldüğünde Bastara verdiği nefesi geri alır. Ruh yeniden doğacağı zaman ise o nefesi yeni bedenine üfer.
{% endpanel %}

{% panel "assets/Sekhara.png" %}
### 🗡Sekhara🗡

Savaşın ve intikamın tanrıçasıdır. Sekhara’ya göre savaşın her türlüsü kutsaldır. Bu bir düşmana karşı verilen savaş da olabilir, bir av da. Avın yalnızca karnı doyurmak için değil, ruhu doyurmak için de yapılması gerektiğini öğretir. Bu yüzden savaşın olmadığı dönemlerde tabaxiler Sekhara’ya ibadet etmek için sık sık büyük avlara çıkarlar ancak bu kontrolsüz avlar bazı bölgelerde hayvanların azalmasına ve kıtlıklara yol açar. Eskiden bu durum önemsenmezdi çünkü Sekhara’nın memnun edilmesi daha önemli görülürdü fakat artık kontrolsüz avlanmanın zararlarını fark edildiğinden aşırı av yasaklamıştır. Bunun yerine Sekhara’yı memnun etmek için büyük turnuvalar düzenlenir.
{% endpanel %}

{% note %}
**Evet tabaxilerin tüm tanrıları kadın, peki neden?**

Dişiler, erkeklerin yapabilidiği her işe ek olarak bir de kutsal sayılan doğum ve reenkarnasyon sürecinin öncüleri oldukları için kutsal sayılırlar ve vücutları ideal form olarak kabul edilir. Onlara göre erkek bedeni, dişinin bedeninin kusurlu halidir, dişinin bedeni daha güzel ve kutsal olandır. Bu yüzden tanrısal gürler otomatik kadın olarak resmedilir.
{% endnote %}

{% panel %}
### ⚰️Tabaxi Cenaze Ritüelleri⚰️

Tabaxiler reenkarnasyona inanırlar. Onlara göre ölen bir kişinin ruhunun bekleyişe (ren sürecine) geçmesi için 9 gün gerekir (Kedilerin dokuz canı olduğu inancı da buradan gelir). Bu dokuz gün boyunca ölü için yas tutulmaz; onun hakkında hikâyeler anlatılır, anıları paylaşılır ve adı şarkılara konu edilir. Çünkü tabaxilere göre bir ruhun ren sürecine geçebilmesi için adının dünyada söylenmeye devam etmesi gerekir.

Ruh ren sürecine geçtikten sonra Renara’da ruh bekler, ne zaman geri döneceği kesin değildir. Fakat eğer kişi büyük günahlar işlemediyse, birkaç yıl içinde yeniden doğacağına inanılır. Bu süreçte ölünün adı Bastara’ya hatırlatılmalıdır. Bu yüzden yakınları onun adını şarkılara koyar ve gündelik hayatta sık sık söyler. Böylece Bastara bu ruhu unutmaz. Yeni bir çocuk doğduğunda tanrıça onu hatırlar ve yeni bebeğe onun nefesini üfleyerek yeniden doğuşu başlatır.

Cenaze ritüellerinin bir başka yönü de bedenle ilgilidir. Ölünün kuyruğu ve patileri mumyalanır ve küçük charmlar hâline getirilir, yakınları bu parçaları üzerlerinde taşır. Bunun, ruhun yeniden doğuş sürecine yardımcı olduğuna inanılır. Ölünün bedeninin geri kalan kısmı ise gömülmez, yaşam döngüsüne geri dönmesi için uzak yerlere bırakılır.
{% endpanel %}

{% panel "assets/sembol.png"%}
### Tabaxi Kutsal İnanışlar

- 3 ve katları kutsal kabul edilir. Tanırlarının 3 tane olması bunu etkiler.
- 3’lü inanış sembolü (**Üç Büyük**): Birbirine bağlı 3 kedigil başıdır; birinin arkasında güneş vardır, diğeri su gibi değişkendir, diğeri de saldırmaya hazırdır. Bu 3 özellik, bir tabaxide olması gereken ideal özelliklerdir.
- Büyük dini törenler sadece 3’lü yıllarda yapılır. Bu yıllara “**Düğün Yılı**” denir.
- Düğünler de aynı şekilde sadece 3’lü yıllarda yapılabilir, bu yüzden düğün yığılması yaşanır ve tüm yıl şenlik gibi geçer. Düğünün amacı, tüm diyara haberi yaymak olduğu için kutlamalar büyük çaplı olur. Ana amaç; doğacak çocukların ebeveynlerini duyurmak ve olası akraba evliliklerini azaltmaktır.
Eğer 3’lü yıllarda değilsek ama çocuk doğmuşsa, nüfus kaydı olması için evlilik yapılır ama evliliğin duyurulması uğursuz olacağı için çocuklar ve evlilik düğün yılına kadar saklanır.
- Tabaxi takviminde her 333 yılda 1 yeni bir kedi takvimine başlanır. Günümüzde Panter takviminde 55. yıldayız. Kedigillerin isimlerinin asırların iyiliği/kötülüğü ile alakası yoktur, sadece o 3 asrın kutsal hayvanı sayıldıkları için avlanmaları yasaklanır.
- Çocukların doğum sırası önemlidir, 3’ün katları sırasıyla doğan çocuklar “**Güneş Çocuk**” kabul edilir ve tanrılar tarafından kutsanıldığına inanılır. Diğer kardeşlerinden daha iyi muamele görürler ve el üstünde tutulurlar.


{% endpanel %}

{% endrealm %}

{% realm "ay", "Ayın sürüsü" %}
## Anukai Tanrıları

{% panel "assets/Anpura.png" %}
### 🌕Anpura🌕

Ayın, aile bağlarının, yasın, korumanın ve ruhani rehberliğin tanrısıdır. Anukai inanışına göre ayın üzerinde Büyük Sürü yaşar ve Anpura onları korur. Aynı zamanda yeryüzündeki canlıları da gözetir, ona dua edenlerin ruhlarına dinginlik verir ve onlara yol gösterir. Bir anukai içsel bir sıkıntı yaşıyorsa ya da zor bir karar vermesi gerekiyorsa Anpura’ya danışır. Anukailer ayrıca atalarının ruhlarının da Anpura’nın korumasında olduğuna inanırlar, bu yüzden şamanlar bazen rüyalarda ataların ruhlarıyla görüşebilir ve onların bilgeliğini yaşayanlara aktarabilirler.
{% endpanel %}

{% panel "assets/Dumaresh.png" %}
### 🦴Dumaresh🦵

Bedenin, vücut kutsallığının ve dayanıklılığın tanrısıdır. Anukai inanışına göre bedenin tamamı kutsaldır ve Dumaresh’e aittir, bu yüzden kişi hayattayken bedenini korumakla yükümlüdür, zararlı maddeler kullanarak bedene zarar vermek büyük bir saygısızlık sayılır. Sağlıklı kalmak için doğru beslenmeye, güçlü kalmaya ve düzenli olarak bedenini çalıştırmaya özen gösterilir.
{% endpanel %}

{% panel "assets/Wepkar.png" %}
### 👑Wepkar🕯

Öcülüğün, iz sürmenin, sadakatin, keşfin, cesaretin ve avın tanrısıdır. Av hayvanlarını yaratıcı ruhudur. Anukailerin en çok saygı duyduğu tanrılardan biridir. Özellikle liderlerin, avcıların ve savaşçıların tanrısı olarak bilinir. Anukai liderlerinin karar verirken Wepkar’ın rehberliğini alır, büyük liderler bazen bir şamana bile ihtiyaç duymadan Wepkar’dan işaretler alabilirler. Wepkar’ın verdiği kararlar sorgulanmaz çünkü onun en kutsal değeri sadakattir. Bu yüzden anukai toplumunda kabile üyelerinin liderlerine bağlı olması çok önemlidir. Liderin sözünü dinlemek, sürünün birliğini korumak anlamına gelir; baş kaldıranlar, hainler ve kabileyi tehlikeye atanlar en büyük tehdit ve günahkârlar olarak görülür. Böyle kişiler merhamet görmez, sürünün düzenini bozdukları için avlanırlar ve ibret olması için sert şekilde cezalandırılırlar.
{% endpanel %}

{% note %}
**Evet anukailerin tüm tanrıları erkek, peki neden?**

Anukai kültüründe sadakat ve disiplin en önemli değerler arasındadır. Dişilerin ise çocuklarına ya da sevdiklerine duydukları bağ nedeniyle, kritik anlarda sadakati ikinci plana atabileceklerine inanılır. Bu yüzden dişilerin değil erkeğin karar alıcı olması gerektiğine inanılır. Aynı zamanda anukai toplumunda güç büyük önem taşır. Erkek anukailer bedensel olarak dişilerden daha iri ve güçlü kabul edildiği için bu durum toplumsal bir üstünlük göstergesi olarak görülür. Erkekler, tanrısal gürlerin dünyadaki en yakın yansıması olarak kabul edilir.
{% endnote %}

{% panel %}
### ⚰️Anukai Cenaze Ritüelleri⚰️

Anukai inanışına göre bir kişinin ölümüyle birlikte ruhu iki parçaya ayrılır. Ruhun bir parçası Kha, diğer parçası ise Tal olarak adlandırılır. Kha, dünyada kalır ve koku aracılığıyla varlığını sürdürür. Tal ise aya doğru yolculuğa çıkar ve aydaki Büyük Sürü’ye katılmaya çalışır.

Tal’ın aya ulaşabilmesi için 40 gün süren bir yolculuk yapması gerekir. Bu yolculuk sırasında ruhun çeşitli sınavlardan geçtiğine inanılır. Bu yüzden ölen kişinin kabilesi ve ailesi kırk gün boyunca yas tutar, dualar eder ve ruhunun yolculuğunun kolay olması için ritüeller gerçekleştirir. Kırk günün sonunda, Tal sınavlarını başarıyla geçmişse aya ulaştığına ve Büyük Sürü’ye katılır.

Anukailere göre her dolunay gecesinde Büyük Sürü kısa bir süreliğine dünyaya döner. O anlarda ataların ruhlarının kendi soylarını gözettiği ve onlara güç verdiği düşünülür.

Kha için ise kokunun korunması büyük önem taşır. Anukailer bir varlığın kokusunun asıl kaynağının kemikleri olduğuna inanır, bu yüzden cenaze sırasında ölünün eti ve kemikleri birbirinden ayrılır. Et kısmı Dumaresh tarafından geri alınsın diye kutsal tepelere bırakılır, kuşların ve diğer hayvanların eti yiyerek Dumaresh’e onları götürdüğüne inanılır.

Kemikler ise kabile içinde saklanır ve çoğu zaman materyal olarak kullanılır, böylece ölen kişinin varlığının bir parçasının her zaman soyunun yanında kaldığı kabul edilir. Ayrıca şamanlar atalarla iletişime geçmek istediklerinde bu kemikleri kullanırlar çünkü kemiklerin hâlâ Kha’nın kokusunu taşıdığına ve bu sayede ataların ruhlarıyla bağlantı kurulabildiğine inanılır.
{% endpanel %}
{% endrealm %}

{% realm "kan", "Yeni çağ"%}
## Maztica'nın Güncel Durumu

{% panel "assets/Belthar.png" %}
Maztica’nın bilinen tarihi aslında insanların kıtayı keşfetmesiyle başlar. Binyıllarca süren tabaxi-anukai-dev kavgası, gemilerle gelen tarikatçılarla birlikte değişim sürecine girer. Bu insanlar, eski kıtalarından kaçmış, güç uğruna suç işlemiş kişilerdir. İnandıkları Belthar, onlara güç verir, ama karşılığında kan ve vahşet talep eder.
{% endpanel %}

{% panel %}
İnsanlar kıtaya ilk geldiklerinde tabaxilerle konuşmayı denerler, ancak dillerini bilmedikleri için iletişim kuramazlar, tabaxilerin doğası gereği sağı solu belli olmayan canlılar olması da işin cabasıdır; bu yüzden onlardan uzak durmayı tercih ederler. Devlerle zaten iletişime geçemezler. Geriye sadece anukailer kalır. Beklenmedik bir şekilde anukailer, yeni gelenlere kucak açar. İnsanlar ise sinsidir; onları kullanmayı amaçlar, kendi dillerini öğretir ve Belthar’ı tanıtırlar.

Belthar diğer tanrılar gibi değildir. Gerçekten ibadet edenlerine ve onun bir parçasını taşıyanlara büyük güçler bahşeder ancak bu güçlerin sonuçları da fazlasıyla geri döner. Bu bonkör tanrı, anukailerin dikkatini çeker ve onlar da ona tapınmayı dener fakat Belthar’ın gücünü almak için onun kanından bir parça gerekir.

Bu görev için Tanrı Tohumuna sahip Belthar rahipler öne çıkar. İnsana benzeyen bu rahipler, anukailerden çocuklar yaparlar. Bu çocuklar, anukailerle insanların kırması gibi görünürler ve asıl köpek formuna yalnızca dolunayda kavuşurlar fakat bu formda o kadar güçlü olurlar ki beş devi tek başlarına devirebilirler.

Anukailer, gözleriyle gördükleri bu gücün etkisiyle eski tanrılarını terk eder ve Belthar’ın hizmetine geçerler. Eski tanrılar, güç verip vermedikleri meçhul olanlar, bu ihanetin ardından kendilerini gösterirler, anukailerin af dileyip tekrar kendilerine inanmalarını isterler ancak anukailer onları dinlemez. Bunun üzerine eski tanrılar lanetler saçar: Anpura, ayın gücünü tersine çevirmekle; Dumaresh, bedenin kontrolünü kaybetmekle; Wepkar, liderliği kaybetmekle.

Anukailer laneti umursamaz, eski tanrıların güçleri olmadığına ve olsa bile Belthar’ın onları koruyacağına inanırlar. İlk başta sadece Wepkar’ın laneti tutar: Yeni düzende anukailerin lideri insanlar olur, onlardan emir alırlar, tıpkı birer köpek gibi.

İnsanlar, keşfedilmemiş toprakları ve madenleri sömürmenin peşine düşerler. Açılan madenlerde anukai nüfusu yetersiz kalınca tabaxi ve devlerle tekrar anlaşmaya çalışırlar. Ancak bu varlıklar, kimseye biyat etmeyen, özgürlüğüne ve keyfine düşkün oldukları için insanları küçümseyerek teklifleri reddeder. Bunun üzerine insanlar, anukaileri ve Belthar’ın kutsadığı yarıları, dolunayda tabaxilerin ve devlerin üzerine gönderir. Yarı anukailerin dolunaydaki gücünü bilmeyen tabaxiler ve devler gafil avlanır ve köle olarak madenlerde çalışmaya zorlanırlar. Bu süreç onyıllarca sürer. Madenlerde birlikte çalışan devler ve tabaxiler, zamanla birbirlerinin dillerini öğrenir, birlik olur ve kaçacak doğru zamanı kollamaya başlar.

Onlar daha kaçma planı yapamadan, Anpura ve Dumaresh’in laneti anukailerin üzerine düşer. Anpura’nın laneti yüzünden aydaki atalarının Tal’ları ölür ve ay kana bulanır. Anukailerin güçleri kaybolur, hepsi hastalanarak yataklara düşer. Dumaresh’in laneti ise yarı anukailere vurur. Bu lanetle birlikte, yarı anukailerin tamamı bedenlerinin kontrolünü kaybeder ve önlerine çıkan her şeye saldırırlar. Bu korkunç güce sahip canavarlar neredeyse tüm anukailerin soyunu kırar. Kanlı ay battıktan sonra, kendilerine gelen yarı anukailer yaptıkları hatayı fark ederler ve eski tanrılarından af dilerler ama hiçbiri onları duymaz. Hayatta kalan anukailer ise kefaretlerini ödemek için yarı anukailer ile insanları öldürürler ve tekrar eski tanrılarından af dilerler ama hiçbiri onları duymaz. Tanrılar çoktan bir daha geri gelmemek üzere onları terk etmiştir.
{% endpanel %}

{% panel "assets/Calvior.png" %}
Wepkar’ın yokluğunda kıtadaki av sayısı çok azalır ve kıtlık başlar. Toplumun çok acil yeni, gelişime açık ve köklerine bağlı bir lidere ihtiyacı vardır, yoksa açtıktan sadece Anukai’ler değil tüm kıta yok olacaktır. Anukailer kendilerine yeni bir lider seçer, bu kurt, insanlar gelmeden önceki liderin soyundan gelen Calvior’dur. Calvior’un önderliğinde köklerine dönmeyi hedeferler, Tanrılar olmadan da eski öğretileri uygularlar ve bir gün affedileceklerine inanırlar. Yeni lider, tabaxileri ve devleri serbest bırakır, onlardan af diler ve kuracakları yeni şehirde her zaman kapıların onlara açık olduğunu belirtir.

Hedef, küllerden yeni bir şehir kurmaktır ve insanların öğrettiği tarım ile hayvancılığı kullanarak kıtlığı minimum düzeye indirmektir fakat adadaki tüm türler etebur olduğu için hızları yeterli gelmeyecektir. Bu yüzden, binyıllardır yapılmamışı yapmak zorunda kalırlar, başka adaları keşfetmek. Calvior’un ilk işi limanlar ve uzun yola dayanıklı gemiler inşa ettirmek olur. Keşif ve balıkçılık çalışmalarına öncelik verir. Belthar Tarikatı onları buluysa insanlar çok uzakta olmamalıdır diye düşünür, adada keşif dönemi başlar.
{% endpanel %}

{% panel %}
Yeni kurulan anukai medeniyeti, eskisi gibi kabile düzeninde değildir. İnsanlardan kalma mimari düzen korunur, bu farklı yaşam tarzı tabaxilerin ilgisini çeker. Tabaxilerden bir kısmı, eski düşmanlarına şans vererek şehirde yaşamaya başlar. Günahlarının farkında olan anukailer, tabaxilere el üstünde tutar, hatta meclise bile sokarlar. Bu pozitif ayrımcılık, tabaxilerin göklerdeki egosunu okşadığı için zamanla anukai nüfusunu aşacak kadar şehir tabaxi dolar.

Tabaxiler daha bireysel varlıklardır; anukai liderini her zaman dinlemezler ve çoğunlukla kafalarına göre hareket ederler. Anukailer ise bunu günahlarının bedeli olarak görür ve büyük bir felaket olmadığı sürece göz yumarlar. Devler ise bu teklifi kabul etmez ve dağlarına geri dönerler. Dar şehirlerde yaşayıp bina inşa etmekle uğraşacak kadar kendilerine olan saygılarını kaybetmemişlerdir.

Fakat bu üç tarafın da bilmediği bir şey vardır. Devlerin ve tabaxilerin köle olduğu dönemde, Tanrı Tohumuna sahip insanlardan ve anukailerden çocukları olan birçok dev ve tabaxi vardır. Bu çocukların bir kısmı tiplerindeki değişiklikler yüzünden fark edilip öldürülse de, bazıları gözden kaçmayı başarmıştır.

Gözden kaçanlar, anukai olmadıkları için eski tanrıların lanetinden etkilenmemişlerdir. Hayatta kalıp fark edilmedikleri için içlerinde hala Belthar’ın bir parçasını taşırlar. Belthar varlığını hissettirmez, yalnızca arzularıyla ilgili küçük bir oynama yapar; tohuma sahip olanlar sürekli çocuk yapmak ve tohumlarını yaymak isterler. Davranışlarında bir tuhaflık sezilmez, çünkü çevredekiler onların yalnızca yüksek libidolu olduklarını düşünüp geçer. Bu şekilde, tohumlar nesiller boyunca fark edilmeden aktarılmaya devam eder.
{% endpanel %}
{% endrealm %}

{% panel "assets/Claween.png" %}
## Claween’in Hikayesi

Bu tohumlardan biri de ana karakterimiz Claween’in içindedir. Claween ergenliğe girdiğinden beri kendini tutamayan, hınzır bir erkek çocuk olarak görülmüştür ve azgınlığı üzerinde durulmamıştır. Aynı şekilde, tohuma sahip babasının annelerini (ve komşu kadınları) sürekli hamile bırakması ya da kız kardeşlerinin sürekli hamile kalmaya çalışması tabaxilerde normal bir davranış olarak karşılanmıştır. Sonuçta tabaxiler böyledir: yer, içer, yatar ve çocuk yaparlar.

Claween ergenliğinde kendini tutamayınca, çocukluk aklıyla, komşu kızını hamile bırakır. Hamilelik durumu ortaya çıkınca ailesi, geleneğe uygun olarak kızla evlenmesini ve çocuklara babalık yapmasını ister (tabaxilerde evlilikler polydir, eşler birbirleri için değil çocuklar için evlenir) ancak Claween babalığa hazır hissetmediği için kaçar. Bir süre evinden ayrı kalan Claween’in ailesi, geri döneceğine emin oldukları için peşine düşmez. Kalacak yer bulmakta zorlanan Claween’in aklında tek bir şey vardır, gidebildiği kadar uzağa kaçmak. Bu yüzden keşif için yola çıkacak bir gemiye katılır ve Maztica’ya bir daha dönmemek üzere uzaklaşır. (İstese de dönemeyecektir, çünkü Maztica haritalarda olmayan, bilinmeyen bir yerdedir. Tek bilenler adadan gelenlerdir, onlara da denk gelmek imkansızdır.)

Bindiği gemide hiç kadın olmadığı için erkeklerle birliktelikler yaşar ancak hamilelik yaşanmadığı için içindeki tohumun gücünü keşfedemez. Yıllarca gemide tayfa ile birlikte haritalar oluşturarak oradan oraya giderler. Bir gün denk geldikleri korsan gemisi tarafından gemileri ele geçirilir ve Claween köle düşer. Ana kıtaya satılmak üzere götürülür.
{% endpanel %}

{% panel %}
- Kendisi annesinin 21 çocuğunun 17.’si. Annesi 3’ün katı olan sayıyı tutturunca çocuk yapmayı kesiyor. Baba tarafından sayısını bile bilmediği çok fazla kardeşi var. Doğum sırası 17 olduğu için umursanmayan çocuklardan biri, bu yüzden çocukluğu daha çok sokaklarda takılarak geçiyor.
- Küçükken, yaşça büyük diğer sokak çocukları tarafından çok zorbalanıyor. O zamanlar “karşı koymam anlamsız, koyarsam daha çok döverler” diyerek hep susuyor, sonucunda da işler daha iyiye gitmiyor. Yaşının büyümesi ile birlikte yaptığı hatayı anlıyor ve tehlike tespiti ile kaçma konusunda uzmanlaşıyor. → Hala bazı geceler o “pasif” halini kabuslarında görüyor ve çocukluğundan nefret ediyor. Kendi çocukluğuna duyduğu nefret sebebiyle yetişkinlik hayatında bile çocuklardan haz etmiyor. Hiçbir zaman kendisi adına bir çocuk sahibi olmak istemedi. → Yanlışıkla bir kadını hamile bırakınca kaçmak istemesi de bu yüzden.
- İnsan yaşına göre 16, Tabaxi yaşına göre 32 yaşında. Yaşına göre hiç olgun biri değil; bu yüzden de ya genç yaşta, daha aklı başına gelmemiş tabaxi kadınlar ondan hoşlanıyor ya da çok daha olgun yaştaki tabaxi erkekler.
{% endpanel %}
