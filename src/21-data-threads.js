/* ================= THREADS — twelve routes through the whole Bible ================= */
const THREADS = [
  {
    id: 'lamb', name: 'The Lamb & the Blood', icon: 'lamb', cvar: '--t-lamb',
    tag: 'From the first covering to the throne — the scarlet thread itself.',
    way: [
      { ref: 'Gen 3:21', note: 'Sin’s first cost: God clothes Adam and Eve with skins. Something died so the guilty could be covered.' },
      { ref: 'Gen 22:7-14', note: 'Isaac asks, “Where is the lamb?” Abraham: “God himself will provide the lamb.” The question hangs in the air for two thousand years.' },
      { ref: 'Ex 12:13', note: 'Passover: “When I see the blood, I will pass over you.” Not when I see your résumé — the blood.' },
      { ref: 'Lev 16', note: 'Day of Atonement: one goat dies, one carries sin far away. Two halves of one picture.' },
      { ref: 'Isa 53:7', note: '“Like a lamb led to the slaughter” — a Servant who bears our griefs and carries our sorrows.' },
      { ref: 'John 1:29', j: true, note: '“Behold, the Lamb of God, who takes away the sin of the world!” Genesis 22’s question, finally answered out loud.' },
      { ref: '1 Cor 5:7', note: '“Christ, our Passover lamb, has been sacrificed” — crucified at Passover, right on schedule.' },
      { ref: 'Rev 5:6-13', note: 'A Lamb, looking slain, standing on the throne — and heaven’s forever-anthem: “Worthy is the Lamb.”' }
    ],
    landsOn: 'The Bible’s oldest question — “where is the lamb?” — is answered at the Jordan: “Behold the Lamb.” Every altar, every Passover, every morning sacrifice was a rehearsal for one Friday.',
    forYou: 'You never cover yourself again. No fig leaves, no image management — <b>you are covered once, for good</b> (Heb 10:14).'
  },
  {
    id: 'bread', name: 'Bread', icon: 'bread', cvar: '--t-bread',
    tag: 'Manna, showbread, Bethlehem — the God who is the meal.',
    way: [
      { ref: 'Ex 16:4', note: 'Manna: bread from heaven, enough for today, every day, for forty years.' },
      { ref: 'Ex 25:30', note: 'The Bread of the Presence — always on the table, always before His face.' },
      { ref: 'Micah 5:2', note: 'The Messiah’s promised birthplace: Bethlehem — Hebrew for “house of bread.”' },
      { ref: '2 Kings 4:42-44', note: 'Elisha feeds a hundred men with twenty loaves — with leftovers. A trailer for a bigger scene.' },
      { ref: 'Matt 14:19-20', note: 'Jesus feeds thousands with five loaves. Twelve baskets left over.' },
      { ref: 'John 6:35', j: true, note: '“I am the bread of life.” Manna was the shadow; He is the meal.' },
      { ref: 'Luke 22:19', note: '“This is my body, given for you.” The table becomes the covenant.' },
      { ref: 'Luke 24:30-31', note: 'Emmaus: they recognize the risen Jesus “in the breaking of the bread.”' }
    ],
    landsOn: '“Your fathers ate the manna and died… I am the living bread — whoever eats this bread will live forever” (John 6:49-51). Born in the house of bread, laid in a feeding trough. Not subtle, once you see it.',
    forYou: 'Manna didn’t keep overnight (Ex 16:19-20). Neither does yesterday’s grace — <b>He’s daily bread, not a pantry item</b>.'
  },
  {
    id: 'water', name: 'Living Water', icon: 'water', cvar: '--t-water',
    tag: 'Rivers, wells, and rain — the Spirit flowing under the whole story.',
    way: [
      { ref: 'Gen 1:2', note: 'Before anything else: the Spirit of God hovering over the waters.' },
      { ref: 'Gen 2:10', note: 'A river runs out of Eden to water the whole earth.' },
      { ref: 'Ex 17:6', note: 'Israel drinks from the struck rock — and Paul names it: “the Rock was Christ” (1 Cor 10:4).' },
      { ref: 'Jer 2:13', note: 'God’s grief: “They abandoned me, the spring of living water, and dug their own leaky cisterns.”' },
      { ref: 'Ezek 47:1-9', note: 'A river flows from the temple — ankle-deep, knee-deep, then water to swim in. Everything it touches lives.' },
      { ref: 'John 4:13-14', note: 'At the well: “The water I give will become a spring inside you, welling up to eternal life.”' },
      { ref: 'John 7:37-39', j: true, note: '“If anyone thirsts, let him come to me and drink.” John adds: He said this about the Spirit.' },
      { ref: 'John 19:34', note: 'At the cross, blood and water flow from His pierced side. The temple’s river has a source.' },
      { ref: 'Rev 22:1', note: 'The river of the water of life, flowing from the throne of God and of the Lamb. Eden, finished.' }
    ],
    landsOn: 'Ezekiel saw water pouring from the temple. Jesus said the true temple was His body (John 2:21). At the cross, water poured from His side. The maps line up.',
    forYou: 'You’re not hauling buckets from meeting to meeting — <b>the well moved inside you</b> (John 4:14). Ask, drink, repeat.'
  },
  {
    id: 'light', name: 'Light', icon: 'light', cvar: '--t-light',
    tag: 'The light that existed before the sun and outlasts it.',
    way: [
      { ref: 'Gen 1:3', note: '“Let there be light” — three days before the sun exists. Light is older than lamps.' },
      { ref: 'Ex 13:21', note: 'A pillar of fire: light that leads, stays, and stands between you and Egypt.' },
      { ref: 'Ex 27:20-21', note: 'The lampstand — the only light in the Holy Place. No windows. Just the lamp.' },
      { ref: 'Isa 9:2', note: '“The people walking in darkness have seen a great light” — addressed, oddly, to Galilee.' },
      { ref: 'Isa 49:6', note: 'The Servant’s job description: “a light for the nations, that my salvation may reach the ends of the earth.”' },
      { ref: 'John 8:12', j: true, note: '“I am the light of the world” — announced in the temple courts during the festival of lamps.' },
      { ref: 'Matt 5:14', note: 'Then the handoff: “YOU are the light of the world.” Present tense. Not “try to be.”' },
      { ref: 'Rev 21:23', note: 'The city needs no sun — “the glory of God gives it light, and its lamp is the Lamb.”' }
    ],
    landsOn: 'Genesis opens with light before the sun; Revelation closes with light after it. Same light. “In him was life, and the life was the light of men” (John 1:4).',
    forYou: 'You don’t generate brightness; you’re plugged in. “Now you ARE light in the Lord” (Eph 5:8) — <b>hiding is the only way to fail at this</b>.'
  },
  {
    id: 'shepherd', name: 'The Shepherd', icon: 'shepherd', cvar: '--t-shepherd',
    tag: 'God keeps hiring shepherds — then takes the job Himself.',
    way: [
      { ref: 'Gen 48:15', note: 'Jacob, dying, names Him: “the God who has been my shepherd all my life long.”' },
      { ref: 'Ex 3:1', note: 'Moses keeps sheep for forty years before he leads people. The desert is a shepherd school.' },
      { ref: '1 Sam 17:34-36', note: 'David learns king-craft on lions and bears, guarding sheep nobody bothered to count.' },
      { ref: 'Ps 23', note: '“The LORD is my shepherd” — a shepherd-king writes the ultimate job description.' },
      { ref: 'Ezek 34:11-16', note: 'God fires the hireling shepherds: “I MYSELF will search for my sheep… I myself will be their shepherd.”' },
      { ref: 'Zech 13:7', note: '“Strike the shepherd and the sheep scatter” — quoted by Jesus on the night of His arrest.' },
      { ref: 'John 10:11', j: true, note: '“I am the good shepherd. The good shepherd lays down his life for the sheep.” Ezekiel’s promise, standing in sandals.' },
      { ref: 'Heb 13:20', note: 'Risen: “the great Shepherd of the sheep.” Returning: “the chief Shepherd” (1 Pet 5:4).' },
      { ref: 'Rev 7:17', note: 'The plot twist: “the Lamb… will be their shepherd.” Two threads tie off in one knot.' }
    ],
    landsOn: 'Ezekiel 34 is God promising to shepherd His people personally. John 10 is Him doing it. “I myself will” became “I am.”',
    forYou: 'Sheep aren’t driven; they’re led — by voice (John 10:27). <b>If it drives you with fear and shame, it isn’t the Shepherd.</b>'
  },
  {
    id: 'king', name: 'The King & the Seed', icon: 'king', cvar: '--t-king',
    tag: 'A crown promised in Eden, tracked through one family tree.',
    way: [
      { ref: 'Gen 3:15', note: 'The first promise in the Bible: her Seed will crush the serpent’s head. One Offspring. Game on.' },
      { ref: 'Gen 49:10', note: 'Jacob’s deathbed GPS: the scepter belongs to Judah — “until he comes to whom it belongs.”' },
      { ref: '2 Sam 7:12-16', note: 'God to David: your offspring’s throne will stand forever. (Solomon dies. So it’s Someone else.)' },
      { ref: 'Ps 2; Ps 110', note: '“You are my Son”… “Sit at my right hand.” Coronation psalms waiting a thousand years for a head to fit the crown.' },
      { ref: 'Isa 9:6-7', note: '“Unto us a child is born… the government upon his shoulder… on the throne of David, forever.”' },
      { ref: 'Luke 1:32-33', j: true, note: 'Gabriel to Mary: “The Lord God will give him the throne of his father David… and of his kingdom there will be no end.”' },
      { ref: 'Matt 27:37', note: 'The charge nailed above His head: THE KING OF THE JEWS. Rome wrote the sign; heaven meant it.' },
      { ref: 'Matt 28:18', note: '“All authority in heaven and on earth has been given to me.” Not “will be.” Has been.' },
      { ref: 'Rev 19:16', note: 'On His robe: KING OF KINGS AND LORD OF LORDS.' }
    ],
    landsOn: 'The Bible tracks one royal line for four thousand years — Eve’s Seed, Judah’s scepter, David’s Son — and hands the crown to a carpenter from Bethlehem.',
    forYou: 'Prayer isn’t shouting at the sky. <b>You’re seated with the King</b> (Eph 2:6) — speak from the throne room, not the waiting room.'
  },
  {
    id: 'temple', name: 'Temple & Presence', icon: 'temple', cvar: '--t-temple',
    tag: 'God keeps moving closer: garden, tent, temple, flesh — you.',
    way: [
      { ref: 'Gen 3:8', note: 'Eden, the first temple: God walking with humans in the cool of the day.' },
      { ref: 'Ex 25:8', note: '“Make me a sanctuary, that I may dwell AMONG them.” A tent — so He can camp with His people.' },
      { ref: '1 Kings 8:10-11', note: 'Glory fills Solomon’s temple so thick the priests can’t stand up to serve.' },
      { ref: 'Ezek 10:18', note: 'The heartbreak scene: the glory lifts off the temple and leaves.' },
      { ref: 'Hag 2:9', note: 'A strange promise over a lesser building: “The latter glory of this house shall be greater than the former.”' },
      { ref: 'John 1:14', j: true, note: '“The Word became flesh and dwelt” — literally, TABERNACLED — “among us, and we beheld his glory.”' },
      { ref: 'John 2:19-21', note: '“Destroy this temple, and in three days I will raise it up.” He was talking about His body.' },
      { ref: 'Matt 27:51', note: 'The veil tears, top to bottom. God’s own handwriting: the room is open.' },
      { ref: '1 Cor 6:19', note: '“Your body is a temple of the Holy Spirit.” The address changed. It’s you now.' },
      { ref: 'Rev 21:3,22', note: '“I saw no temple in the city… its temple is the Lord God the Almighty and the Lamb.” Dwelling restored, for good.' }
    ],
    landsOn: 'Haggai promised a lesser building greater glory than Solomon’s gold. Then a Galilean walked into it. The glory was never the gold — it was the Guest.',
    forYou: 'You don’t go to the presence; <b>you carry it</b> (1 Cor 3:16). Stop commuting to where you already live.'
  },
  {
    id: 'rest', name: 'Rest & Sabbath', icon: 'rest', cvar: '--t-rest',
    tag: 'The finish line of Genesis 1 — and of the gospel.',
    way: [
      { ref: 'Gen 2:2-3', note: 'Day seven: God rests. Not tired — finished. The only day with no “evening and morning.”' },
      { ref: 'Ex 20:8-11', note: 'Sabbath: a weekly national rehearsal of “it is finished” — stop, because God completed it.' },
      { ref: 'Ex 33:14', note: '“My presence will go with you, and I will give you rest.” Presence and rest travel together.' },
      { ref: 'Ps 95:11', note: 'A generation misses the promised land — “they shall not enter my rest.” Hebrews 3:19 gives the autopsy: unbelief.' },
      { ref: 'Isa 30:15', note: '“In returning and rest you shall be saved… but you were unwilling.”' },
      { ref: 'Matt 11:28-30', j: true, note: '“Come to ME, all who labor and are heavy laden, and I will give you rest.” A Person offering what the day only pictured.' },
      { ref: 'John 19:30', note: '“It is finished.” The sixth day’s work ends; the true Sabbath begins.' },
      { ref: 'Col 2:16-17', note: 'Sabbath was “a shadow of the things to come — but the substance belongs to Christ.”' },
      { ref: 'Heb 4:9-11', note: '“A Sabbath rest remains for the people of God… strive to enter that rest.” The only striving left is the refusal to strive.' }
    ],
    landsOn: 'God’s seventh-day rest wasn’t recovery — it was completion. The cross speaks the same word over your standing with God: finished.',
    forYou: 'Hurry and striving are not fruits of the Spirit. <b>Work FROM rest, not FOR it</b> (Heb 4:10) — that’s the whole trick of the Christian life.'
  },
  {
    id: 'covenant', name: 'Covenant', icon: 'covenant', cvar: '--t-covenant',
    tag: 'God keeps making promises — then signs both lines Himself.',
    way: [
      { ref: 'Gen 9:13', note: 'After the flood: a war-bow hung in the clouds — pointed away from the earth.' },
      { ref: 'Gen 15:12-17', note: 'The strangest scene in Genesis: Abraham asleep while God alone walks between the covenant pieces. One signature.' },
      { ref: 'Ex 24:7-8', note: 'Sinai: “All this we will do!” A two-signature covenant. It lasts about six weeks (see: golden calf).' },
      { ref: 'Jer 31:31-34', note: '“Behold, the days are coming… a NEW covenant… I will remember their sins no more.”' },
      { ref: 'Ezek 36:26-27', note: 'The spec sheet: a new heart, a new spirit, “I will CAUSE you to walk in my statutes.” He does the causing.' },
      { ref: 'Luke 22:20', j: true, note: '“This cup is the new covenant in my blood.” Jeremiah’s promise, poured out at a table.' },
      { ref: 'Heb 6:13-18', note: 'God swears by Himself — two unchangeable things, “a sure and steadfast anchor of the soul.”' },
      { ref: 'Heb 8:6', note: '“A better covenant, enacted on better promises” — better because every promise is God’s to keep.' }
    ],
    landsOn: 'Genesis 15 is the key that unlocks the gospel: God put Abraham to sleep and walked the covenant path alone. At the cross He did it again — the new covenant is cut between the Father and the Son. You’re not a signatory. You’re the beneficiary.',
    forYou: 'An inheritance doesn’t depend on the heir’s mood swings (Heb 9:16-17). <b>Your standing rests on His performance, not yours.</b>'
  },
  {
    id: 'bride', name: 'The Bride', icon: 'bride', cvar: '--t-bride',
    tag: 'The Bible opens with a wedding and closes with one.',
    way: [
      { ref: 'Gen 2:21-23', note: 'The first bride comes from a wound in the side of a sleeping man. Remember that detail.' },
      { ref: 'Gen 24', note: 'A father sends his servant to bring back a bride for the promised son. The pattern hides in plain sight.' },
      { ref: 'Ruth 4', note: 'Boaz the kinsman-redeemer: related, able, willing — he redeems the field to marry the foreigner.' },
      { ref: 'Hos 3:1-2', note: 'Hosea buys back his own unfaithful wife from the auction block. God says: that’s me and my people.' },
      { ref: 'Isa 54:5', note: '“Your Maker is your husband” — spoken to a people at their lowest.' },
      { ref: 'John 2:1-11', note: 'Jesus’s first sign: rescuing a wedding that ran dry. Of course it was a wedding.' },
      { ref: 'Eph 5:25-32', j: true, note: '“Christ loved the church and GAVE HIMSELF UP for her… This mystery is profound — I am saying it refers to Christ and the church.”' },
      { ref: 'Rev 19:7', note: 'The marriage supper of the Lamb — “his Bride has made herself ready.”' },
      { ref: 'Rev 22:17', note: 'The Bible’s last invitation: “The Spirit and the Bride say, Come.”' }
    ],
    landsOn: 'Adam slept, his side was opened, and a bride was formed. Christ slept in death, His side was opened, and the church was born. Paul says the first was always about the second (Eph 5:32).',
    forYou: 'You are not God’s employee on probation. <b>You’re the Bride He crossed everything to get</b> — loved, wanted, pursued.'
  },
  {
    id: 'exile', name: 'Exile & Homecoming', icon: 'exile', cvar: '--t-exile',
    tag: 'East of Eden, and the long road home.',
    way: [
      { ref: 'Gen 3:24', note: 'The first exile: humanity walks out of Eden eastward; cherubim guard the way back in.' },
      { ref: 'Gen 4:16', note: 'Cain settles further “east of Eden.” Sin’s compass always points away.' },
      { ref: 'Ps 137:1', note: 'Babylon: “By the rivers of Babylon, there we sat down and wept.” The garden feels very far away.' },
      { ref: 'Isa 40:3', note: 'Hope files a flight plan: “In the wilderness prepare the way of the LORD” — a highway home.' },
      { ref: 'Ezra 6; Neh 6', note: 'A partial return: the house gets rebuilt — but no glory-cloud is ever said to fill it. Something is still missing.' },
      { ref: 'Matt 3:1-3', note: 'John the Baptist appears IN THE WILDERNESS with Isaiah 40 on his lips. The real return is starting.' },
      { ref: 'Luke 15:11-24', j: true, note: 'The prodigal son: the whole exile story in one parable — far country, famine, “he came to himself,” and a father who RUNS.' },
      { ref: 'Heb 13:12', note: 'Jesus suffers “outside the gate” — exiled in our place, so exiles can come home.' },
      { ref: 'Rev 21:3', note: '“Behold, the dwelling place of God is with man.” Eden’s door reopened. Nobody lives east anymore.' }
    ],
    landsOn: 'Every exile in the Bible replays Eden, and every homecoming preaches the gospel. He was cast out so the cast-out could come home.',
    forYou: 'Shame says “keep your distance and rehearse your speech.” The Father says “bring the robe” — <b>He runs before you finish the apology</b> (Luke 15:20-22).'
  },
  {
    id: 'name', name: 'The Name', icon: 'name', cvar: '--t-name',
    tag: 'I AM — carried, guarded, and finally given away.',
    way: [
      { ref: 'Ex 3:14', note: 'The burning bush: “I AM WHO I AM. Say this: I AM has sent me to you.” A name that’s a claim — self-existent, present tense.' },
      { ref: 'Ex 20:7', note: 'Don’t “take” (literally: CARRY) the Name in vain — less about swear words, more about wearing it emptily.' },
      { ref: 'Num 6:24-27', note: 'The priestly blessing: “So shall they PUT MY NAME on the people.” The Name is placed on people like a garment.' },
      { ref: 'Prov 18:10', note: '“The name of the LORD is a strong tower; the righteous man runs into it and is safe.”' },
      { ref: 'John 8:58', j: true, note: '“Before Abraham was, I AM.” They pick up stones — they know exactly which Name He just used.' },
      { ref: 'John 17:6,26', note: 'Jesus’s own mission summary: “I have manifested your NAME to the people you gave me.”' },
      { ref: 'Phil 2:9-11', note: '“God has highly exalted him and given him the name above every name — at the name of Jesus every knee will bow.”' },
      { ref: 'Rev 22:4', note: 'The story’s last page: “His name will be on their foreheads.” Numbers 6, made permanent.' }
    ],
    landsOn: 'The unspeakable Name of the burning bush shows up in Galilee saying “I AM” — bread, light, door, shepherd, resurrection, way, truth, life, vine. Eight predicates, one claim.',
    forYou: 'You were baptized INTO the Name (Matt 28:19). <b>You don’t drop it to fit in — you carry it, and it carries you.</b>'
  },
  {
    id: 'garment', name: 'The Garment', icon: 'garment', cvar: '--t-garment',
    tag: 'What you wear before God — from fig leaves to fine linen.',
    way: [
      { ref: 'Gen 3:7', note: 'The first fashion line: fig leaves. Shame’s instinct is to sew your own covering and hope nobody looks too closely.' },
      { ref: 'Gen 3:21', note: 'God overrules the fig leaves and makes “garments of skin” — the first death, to clothe the guilty. Someone bleeds so shame gets covered properly.' },
      { ref: 'Gen 27:15-23', note: 'Rebekah dresses Jacob in his older brother Esau’s finest garments so their blind father blesses him as the firstborn. Hold this one gently — the deceit was real — but the shape preaches: the blessing comes to the younger while he’s wearing the firstborn’s clothes.' },
      { ref: 'Gen 37:3,23', note: 'Jacob’s son gets the coat this time — the father’s love made visible — and the brothers strip it off him before the pit. Robes given by a father keep getting torn off.' },
      { ref: 'Ex 28:2', note: 'The high priest’s garments are made “for glory and for beauty.” You don’t approach God in street clothes; the mediator is dressed for the room.' },
      { ref: 'Zech 3:3-5', note: 'Joshua the high priest stands before God in filth while Satan accuses. God’s verdict: “Take off his filthy clothes… I have clothed you with pure vestments.” Grace as a wardrobe change, in open court.' },
      { ref: 'Isa 61:10', note: '“He has clothed me with the garments of salvation… the robe of righteousness” — a righteousness you wear, not one you manufacture. (And Isa 64:6: our own best is “filthy rags.”)' },
      { ref: 'Luke 15:22', note: 'The son rehearses a servant speech; the father interrupts: “Bring the best robe.” You don’t get worked back up to son — you get dressed as one before you can finish apologizing.' },
      { ref: 'John 19:23-24', j: true, note: 'At the cross they strip Him and gamble for His seamless robe (Ps 22:18). The Priest is left naked so the naked can be robed — the exchange the whole thread was climbing toward.' },
      { ref: 'Gal 3:27', note: '“As many of you as were baptized into Christ have PUT ON Christ.” The Jacob picture, made real: you’re received in the Firstborn’s clothes (Col 1:15).' },
      { ref: 'Rom 13:14', note: '“Put on the Lord Jesus Christ” — daily, deliberately. The robe is given once; wearing it is a morning habit.' },
      { ref: 'Rev 19:8; 7:14', note: 'The Bride wears “fine linen, bright and pure”… robes “made white in the blood of the Lamb.” Washed in blood, somehow whiter — the last word on the wardrobe.' }
    ],
    landsOn: 'Naked Adam hid; the last Adam hung stripped and exposed so the hiding could end. Every covering in between — skins, coats, priestly robes, the best robe, white linen — was pointing at the great exchange: “he was made sin… so that in him we might become the righteousness of God” (2 Cor 5:21). He wore your shame; you wear His righteousness.',
    forYou: 'Stop sewing fig leaves. <b>You don’t sew a righteousness to wear — you receive one and put it on</b> (Isa 61:10). Get dressed in the morning: you’re wearing the Firstborn’s clothes.'
  }
];
