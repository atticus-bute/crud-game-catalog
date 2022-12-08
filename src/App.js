import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import AddGame from './components/AddGame';
import GameCard from './components/GameCard';
import NavbarLogin from './components/NavbarLogin';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [gameCollection, addGameCollection] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [gameCondition, setGameCondition] = useState('');
  const [gameConsole, setGameConsole] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  // ownedGames is the initial data hard coded into the project
  // {gameTitle:'', gameConsole:'', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/'},
  // Conditions: MISB, CIB, Incomplete, Loose, Damaged

  const ownedGames = [
    // Game Boy 1989
    {
      gameTitle: 'Final Fantasy Adventure',
      gameConsole: 'Nintendo Game Boy',
      gameCondition: 'Incomplete',
      releaseYear: 1991,
      id: nanoid(),
      image: 'images/finalFantasyAdventure.jpg',
    },
    {
      gameTitle: 'Kid Icarus: Of Myths and Monsters',
      gameConsole: 'Nintendo Game Boy',
      gameCondition: 'CIB',
      releaseYear: 1991,
      id: nanoid(),
      image: 'images/kidIcarusOfMythsAndMonsters.jpg',
    },
    {
      gameTitle: 'Metroid II: Return of Samus',
      gameConsole: 'Nintendo Game Boy',
      gameCondition: 'Damaged',
      releaseYear: 1991,
      id: nanoid(),
      image: 'images/metroidIIReturnOfSamus.jpg',
    },
    {
      gameTitle: 'Trax',
      gameConsole: 'Nintendo Game Boy',
      gameCondition: 'CIB',
      releaseYear: 1991,
      id: nanoid(),
      image: 'images/trax.jpg',
    },

    // PS1 1994
    {gameTitle:'Austin Powers Pinball', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:2002, id:nanoid(), image:'images/austinPowersPinball.jpg'},
    {gameTitle:'Castlevania: Symphony of the Night', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:1997, id:nanoid(), image:'images/castlevaniaSymphonyoftheNight.jpg'},
    {gameTitle:'Crash Bandicoot', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:1997, id:nanoid(), image:'images/crashBandicoot.jpg'},
    {gameTitle:'Final Fantasy VII', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:1997, id:nanoid(), image:'images/finalFantasyVII.jpg'},
    {gameTitle:'Final Fantasy VIII', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:1999, id:nanoid(), image:'images/finalFantasyVIII.jpg'},
    {gameTitle:'Final Fantasy IX', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:2000, id:nanoid(), image:'images/finalFantasyIX.jpg'},
    {gameTitle:'Final Fantasy Origins', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/finalFantasyOrigins.jpg'},
    {gameTitle:'Mega Man X4', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:1997, id:nanoid(), image:'images/megaManX4.jpg'},
    {gameTitle:'Mega Man X5', gameConsole:'Playstation', gameCondition:'CIB', releaseYear:2000, id:nanoid(), image:'images/megaManX5.jpg'},
    // Game Boy Color 1998
    {gameTitle:'The Legend of Zelda: Oracle of Seasons', gameConsole:'Nintendo Game Boy Color', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/zeldaOracleofSeasons.jpg'},

    {
      gameTitle: 'Metal Gear Solid',
      gameConsole: 'Nintendo Game Boy Color',
      gameCondition: 'Loose',
      releaseYear: 2000,
      id: nanoid(),
      image: 'images/metalGearSolidGB.jpg',
    },

    // PS2 2000
    {gameTitle:'Devil May Cry', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/devilMayCry.jpg'},
    {gameTitle:'Devil May Cry 2', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/devilMayCry2.jpg'},
    {gameTitle:'Devil May Cry 3: Dante\'s Awakening', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/devilMayCry3.jpg'},
    {gameTitle:'Final Fantasy X', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/finalFantasyX.jpg'},
    {gameTitle:'Final Fantasy X-2', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/finalFantasyX2.jpg'},
    {gameTitle:'Final Fantasy XII', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/finalFantasyXII.jpg'},
    {gameTitle:'God Hand', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/godHand.jpg'},
    {gameTitle:'Kingdom Hearts', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2002, id:nanoid(), image:'images/kingdomHearts.jpg'},
    {gameTitle:'Mega Man X8', gameConsole:'Playstation 2', gameCondition:'Loose', releaseYear:2004, id:nanoid(), image:'images/megaManX8.jpg'},
    {gameTitle:'Okami', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/okami.jpg'},
    {gameTitle:'Xenosaga Episode I: Der Wille zur Macht', gameConsole:'Playstation 2', gameCondition:'Incomplete', releaseYear:2002, id:nanoid(), image:'images/xenosaga.jpg'},
    {gameTitle:'Xenosaga Episode II: Jenseits von Gut und Böse', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/xenosaga2.jpg'},
    {gameTitle:'Xenosaga Episode III: Also Sprach Zarathustra', gameConsole:'Playstation 2', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/xenosaga3.jpg'},

    // Nintendo Gamecube 2001
    {gameTitle:'Baten Kaitos: Eternal Wings and the Lost Ocean', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/batenKaitos.jpg'},
    {gameTitle:'Baten Kaitos: Origins', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/batenKaitosOrigins.jpg'},
    {gameTitle:'Battalion Wars', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/battalionWars.jpg'},
    {gameTitle:'F-Zero GX', gameConsole:'Nintendo Gamecube', gameCondition:'Damaged', releaseYear:2003, id:nanoid(), image:'images/fZeroGX.jpg'},
    {gameTitle:'Fire Emblem: Path of Radiance', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/fireEmblemPathofRadiance.jpg'},
    {gameTitle:'Kirby Air Ride', gameConsole:'Nintendo Gamecube', gameCondition:'Incomplete', releaseYear:2003, id:nanoid(), image:'images/kirbyAirRide.jpg'},
    {gameTitle:'Luigi\'s Mansion', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/luigisMansion.jpg'},
    {gameTitle:'Mario Kart: Double Dash', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/marioKartDoubleDash.jpg'},
    {gameTitle:'Mega Man Anniversary Collection', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/megaManAnniversary.jpg'},
    {
      gameTitle: 'Metroid Prime',
      gameConsole: 'Nintendo Gamecube',
      gameCondition: 'CIB',
      releaseYear: 2002,
      id: nanoid(),
      image: 'images/metroidPrime.jpg',
    },
    {gameTitle:'Metroid Prime 2: Echoes', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/metroidPrime2.jpg'},
    {gameTitle:'Paper Mario: The Thousand Year Door', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/paperMario1000YearDoor.jpg'},
    {gameTitle:'Pikmin', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/pikmin.jpg'},
    {gameTitle:'Pikmin2', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/pikmin2.jpg'},
    {gameTitle:'Star Fox: Assault', gameConsole:'Nintendo Gamecube', gameCondition:'Incomplete', releaseYear:2005, id:nanoid(), image:'images/starFoxAssault.jpg'},
    {gameTitle:'Super Mario Sunshine', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2002, id:nanoid(), image:'images/superMarioSunshine.jpg'},
    {gameTitle:'Super Smash Bros. Melee', gameConsole:'Nintendo Gamecube', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/smashBrosMelee.jpg'},
    {gameTitle:'The Legend of Zelda: Wind Waker', gameConsole:'Nintendo Gamecube', gameCondition:'', releaseYear:2002, id:nanoid(), image:'images/zeldaWindWaker.jpg'},
    {gameTitle:'The Legend of Zelda: Twilight Princess', gameConsole:'Nintendo Gamecube', gameCondition:'', releaseYear:2006, id:nanoid(), image:'images/zeldaTwilightPrincess.jpg'},

    // Game Boy Advance 2001
    {gameTitle:'Final Fantasy VI Advance', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/finalFantasyVIgba.jpg'},
    {gameTitle:'Golden Sun', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2001, id:nanoid(), image:'images/goldenSun.jpg'},
    {gameTitle:'Golden Sun: The Lost Age', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2002, id:nanoid(), image:'images/goldenSuntheLostAge.jpg'},
    {gameTitle:'Kirby Nightmare in Dreamland', gameConsole:'Nintendo Game Boy Advance', gameCondition:'Damaged', releaseYear:2002, id:nanoid(), image:'images/kirbyNightmareinDreamland.jpg'},
    {gameTitle:'Kirby and the Amazing Mirror', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/kirbyandtheAmazingMirror.jpg'},
    {gameTitle:'Mega Man and Bass', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/megaManandBass.jpg'},
    {gameTitle:'Pokémon LeafGreen', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/pokemonLeafGreen.jpg'},
    {gameTitle:'Sword of Mana', gameConsole:'Nintendo Game Boy Advance', gameCondition:'CIB', releaseYear:2003, id:nanoid(), image:'images/swordOfMana.jpg'},
    // {gameTitle:'', gameConsole:'Nintendo Game Boy Advance', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/.jpg'},

    // DS 2004
    {gameTitle:'Advance Wars: Dual Strike', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/advanceWarsDualStrike.jpg'},
    {gameTitle:'Advance Wars: Days of Ruin', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2008, id:nanoid(), image:'images/advanceWarsDaysofRuin.jpg'},
    {gameTitle:'Castlevania: Dawn of Sorrow', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/castlevaniaDawnofSorrow.jpg'},
    {gameTitle:'Etrian Odyssey', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2007, id:nanoid(), image:'images/etrianOdyssey.jpg'},
    {gameTitle:'Etrian Odyssey II: Heroes of Lagaard', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2008, id:nanoid(), image:'images/etrianOdyssey2.jpg'},
    {gameTitle:'Etrian Odyssey III: The Drowned City', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/etrianOdyssey3.jpg'},
    {gameTitle:'Final Fantasy III', gameConsole:'Nintendo DS', gameCondition:'', releaseYear:2006, id:nanoid(), image:'images/finalFantasyIIIds.jpg'},
    {gameTitle:'Final Fantasy IV', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2007, id:nanoid(), image:'images/finalFantasyIVds.jpg'},
    {gameTitle:'Final Fantasy Crystal Chronicles: Echoes of Time', gameConsole:'Nintendo DS', gameCondition:'MISB', releaseYear:2009, id:nanoid(), image:'images/finalFantasyCrystalChroniclesEchoesofTime.jpg'},
    {gameTitle:'Final Fantasy: The 4 Heroes of Light', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2009, id:nanoid(), image:'images/finalFantasy4HeroesofLight.jpg'},
    {gameTitle:'Fire Emblem: Shadow Dragon', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2008, id:nanoid(), image:'images/fireEmblemShadowDragon.jpg'},
    {gameTitle:'Golden Sun: Dark Dawn', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/goldenSunDarkDawn.jpg'},
    {gameTitle:'Kirby Canvas Curse', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/kirbyCanvasCurse.jpg'},
    {gameTitle:'Kirby Squeak Squad', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/kirbySqueakSquad.jpg'},
    {gameTitle:'Kirby Super Star Ultra', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2008, id:nanoid(), image:'images/kirbySuperStarUltra.jpg'},
    {gameTitle:'Kirby Mass Attack', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2011, id:nanoid(), image:'images/kirbyMassAttack.jpg'},
    {gameTitle:'Lego Battles', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2009, id:nanoid(), image:'images/legoBattles.jpg'},
    {gameTitle:'Mario Kart DS', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/marioKartDS.jpg'},
    {gameTitle:'Mario Party DS', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2007, id:nanoid(), image:'images/marioPartyDS.jpg'},
    {gameTitle:'Mega Man Zero Collection', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/megaManZeroCollection.jpg'},
    {gameTitle:'Metroid Prime: Hunters', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/metroidPrimeHunters.jpg'},
    {gameTitle:'Metroid Prime: Pinball', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/metroidPrimePinball.jpg'},
    {gameTitle:'Moon', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2009, id:nanoid(), image:'images/moon.jpg'},
    {gameTitle:'New Super Mario Bros', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/newSuperMarioBros.jpg'},
    {gameTitle:'Okami Den', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/okamiDen.jpg'},
    {gameTitle:'Pokémon Diamond', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/pokemonDiamond.jpg'},
    {gameTitle:'Pokémon Pearl', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/pokemonPearl.jpg'},
    {gameTitle:'Pokémon Platinum', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2008, id:nanoid(), image:'images/pokemonPlatinum.jpg'},
    
    {
      gameTitle: 'Pokémon HeartGold',
      gameConsole: 'Nintendo DS',
      gameCondition: 'Incomplete',
      releaseYear: 2009,
      id: nanoid(),
      image: 'images/pokemonHeartGold.jpg',
    },
    {
      gameTitle: 'Pokémon SoulSilver',
      gameConsole: 'Nintendo DS',
      gameCondition: 'CIB',
      releaseYear: 2009,
      id: nanoid(),
      image: 'images/pokemonSoulSilver.jpg',
    },
    {gameTitle:'Pokémon Black', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/pokemonBlack.jpg'},
    {gameTitle:'Pokémon White', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/pokemonWhite.jpg'},
    {gameTitle:'Pokémon Black 2', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2012, id:nanoid(), image:'images/pokemonBlack2.jpg'},
    {gameTitle:'Pokémon White 2', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2012, id:nanoid(), image:'images/pokemonWhite2.jpg'},
    {
      gameTitle: 'Radiant Historia',
      gameConsole: 'Nintendo DS',
      gameCondition: 'MISB',
      releaseYear: 2010,
      id: nanoid(),
      image: 'images/radiantHistoria.jpg',
    },
    {gameTitle:'Rhythm Heaven', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2009, id:nanoid(), image:'images/rhythmHeaven.jpg'},
    {gameTitle:'Star Fox Command', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2006, id:nanoid(), image:'images/starFoxCommand.jpg'},
    {gameTitle:'Super Mario 64 DS', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2004, id:nanoid(), image:'images/superMario64DS.jpg'},
    {gameTitle:'Super Princess Peach', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2005, id:nanoid(), image:'images/superPrincessPeach.jpg'},
    {gameTitle:'Super Scribblenauts', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/superScribblenauts.jpg'},
    {gameTitle:'The Legendary Starfy', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2008, id:nanoid(), image:'images/theLegendaryStarfy.jpg'},
    {gameTitle:'The World Ends With You', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2007, id:nanoid(), image:'images/theWorldEndsWithYou.jpg'},
    {gameTitle:'The Legend of Zelda: Phantom Hourglass', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2007, id:nanoid(), image:'images/zeldaPhantomHourglass.jpg'},
    {gameTitle:'The Legend of Zelda: Spirit Tracks', gameConsole:'Nintendo DS', gameCondition:'CIB', releaseYear:2009, id:nanoid(), image:'images/zeldaSpiritTracks.jpg'},

    // PS3 2006
    {gameTitle:'Demon\'s Souls', gameConsole:'Playstation 3', gameCondition:'CIB', releaseYear:2009, id:nanoid(), image:'images/demonsSouls.jpg'},
    {gameTitle:'Nier', gameConsole:'Playstation 3', gameCondition:'CIB', releaseYear:2010, id:nanoid(), image:'images/nier.jpg'},

    // Wii 2006
    {gameTitle:'', gameConsole:'Nintendo Wii', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/.jpg'},

    {
      gameTitle: 'Xenoblade Chronicles',
      gameConsole: 'Nintendo Wii',
      gameCondition: 'CIB',
      releaseYear: 2010,
      id: nanoid(),
      image: 'images/xenobladeChronicles.jpg',
    },

    // 3DS 2011
    {gameTitle:'', gameConsole:'Nintendo 3DS', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/.jpg'},

    // Wii U 2012
    {gameTitle:'Nintendo Land', gameConsole:'Nintendo Wii U', gameCondition:'CIB', releaseYear:2012, id:nanoid(), image:'images/nintendoLand.jpg'},
    {gameTitle:'Pikmin 3', gameConsole:'Nintendo Wii U', gameCondition:'CIB', releaseYear:2013, id:nanoid(), image:'images/pikmin3.jpg'},
    {gameTitle:'Star Fox: Zero', gameConsole:'Nintendo Wii U', gameCondition:'CIB', releaseYear:2016, id:nanoid(), image:'images/starFoxZero.jpg'},
    {gameTitle:'Star Fox: Guard', gameConsole:'Nintendo Wii U', gameCondition:'MISB', releaseYear:2016, id:nanoid(), image:'images/starFoxGuard.jpg'},
    {gameTitle:'Super Mario 3D World', gameConsole:'Nintendo Wii U', gameCondition:'CIB', releaseYear:2013, id:nanoid(), image:'images/superMario3DWorld.jpg'},
    {gameTitle:'Super Smash Bros. for Wii U', gameConsole:'Nintendo Wii U', gameCondition:'CIB', releaseYear:2014, id:nanoid(), image:'images/smashBrosforWiiU.jpg'},
    {gameTitle:'Xenoblade Chronicles X', gameConsole:'Nintendo Wii U', gameCondition:'CIB', releaseYear:2015, id:nanoid(), image:'images/xenobladeChroniclesX.jpg'},

    // Switch 2017
    {gameTitle:'Avicii Invector: Encore Edition', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2017, id:nanoid(), image:'images/aviciiInvector.jpg'},
    {gameTitle:'Bayonetta 2', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2018, id:nanoid(), image:'images/bayonetta2Switch.jpg'},
    {gameTitle:'Bravely Default II', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2021, id:nanoid(), image:'images/bravelyDefault2.jpg'},
    {gameTitle:'Cave Story +', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2017, id:nanoid(), image:'images/caveStory+.jpg'},
    {gameTitle:'Collection of Mana', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2019, id:nanoid(), image:'images/collectionOfMana.jpg'},
    {gameTitle:'Doom', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2017, id:nanoid(), image:'images/doomSwitch.jpg'},
    {gameTitle:'Fire Emblem: Three Houses', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2019, id:nanoid(), image:'images/fireEmblemThreeHouses.jpg'},
    {gameTitle:'Kirby Star Allies', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2018, id:nanoid(), image:'images/kirbyStarAllies.jpg'},
    {gameTitle:'Kirby and the Forgotten Land', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2022, id:nanoid(), image:'images/kirbyandtheForgottenLand.jpg'},
    {gameTitle:'Mega Man 11', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2018, id:nanoid(), image:'images/megaMan11.jpg'},
    {gameTitle:'metroidDread', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2021, id:nanoid(), image:'images/metroidDread.jpg'},
    {gameTitle:'Mortal Kombat 11', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2019, id:nanoid(), image:'images/mortalKombat11.jpg'},
    {gameTitle:'NEO: The World Ends With You', gameConsole:'Nintendo Switch', gameCondition:'MISB', releaseYear:2021, id:nanoid(), image:'images/neoTheWorldEndsWithYou.jpg'},
    {gameTitle:'Pikmin 3 Deluxe', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2020, id:nanoid(), image:'images/pikmin3Deluxe.jpg'},
    {gameTitle:'Pokémon Let\'s Go Pikachu!', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2018, id:nanoid(), image:'images/pokemonLetsGoPikachu.jpg'},
    {gameTitle:'Pokémon Sword', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2019, id:nanoid(), image:'images/pokemonSword.jpg'},
    {gameTitle:'Shin Megami Tensei V', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2021, id:nanoid(), image:'images/shinMegamiTenseiV.jpg'},
    {gameTitle:'Super Mario 3D All Stars', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2020, id:nanoid(), image:'images/superMario3DAllStars.jpg'},
    {gameTitle:'Super Mario Maker 2', gameConsole:'Nintendo Switch', gameCondition:'2020', releaseYear:2020, id:nanoid(), image:'images/superMarioMaker2.jpg'},
    {gameTitle:'Super Mario Odyssey', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2017, id:nanoid(), image:'images/superMarioOdyssey.jpg'},
    {gameTitle:'Xenoblade Chronicles 2', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2017, id:nanoid(), image:'images/xenobladeChronicles2.jpg'},
    {gameTitle:'Xenoblade Chronicles: Definitive Edition', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2020, id:nanoid(), image:'images/xenobladeChroniclesDefinitive.jpg'},
    {gameTitle:'Xenoblade Chronicles 3', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2022, id:nanoid(), image:'images/xenobladeChronicles3.jpg'},
    {gameTitle:'The Legend of Zelda: Breath of the Wild', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2017, id:nanoid(), image:'images/zeldaBreathoftheWild.jpg'},
    {gameTitle:'The Legend of Zelda: Link\'s Awakening', gameConsole:'Nintendo Switch', gameCondition:'CIB', releaseYear:2019, id:nanoid(), image:'images/zeldaLinksAwakeningSwitch.jpg'},

    // {gameTitle:'', gameConsole:'', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/'},
  ];

  useEffect(() => {
    if (localStorage) {
      const gameLibraryLS = JSON.parse(localStorage.getItem('gameLibrary'));
      //  if(gameLibraryLS){
      //    saveGames(gameLibraryLS);
      //  }else{
      saveGames(ownedGames);
      //  }
    }
  }, []);

  const saveGames = (ownedGames) => {
    addGameCollection(ownedGames);
    setSearchResults(ownedGames);
    if (localStorage) {
      localStorage.setItem('gameLibrary', JSON.stringify(ownedGames));
      console.log('Saved to local storage.');
    }
  };

  const addGame = (newGame) => {
    const updatedGameCollection = [...gameCollection, newGame];
    saveGames(updatedGameCollection);
  };

  const searchGamesWork = () => {
    let keywordArray = [];

    if (keywords) {
      keywordArray = keywords.toLowerCase().split(' ');
    }

    if (gameCondition) {
      keywordArray.push(gameCondition);
    }
    if (releaseYear) {
      keywordArray.push(releaseYear);
    }
    if (gameConsole) {
      keywordArray.push(gameConsole);
    }

    if (keywordArray.length > 0) {
      const searchResults = gameCollection.filter((game) => {
        for (const word of keywordArray) {
          if (
            game.gameTitle.toLowerCase().includes(word) ||
            game.gameCondition.toLowerCase() === word.toLowerCase() ||
            game.releaseYear === parseInt(word) ||
            game.gameConsole.toLowerCase() === word.toLowerCase()
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(gameCollection);
    }
  };

  const removeGame = (gameToDelete) => {
    console.table(gameToDelete);
    const postGameDelete = gameCollection.filter((game) => game.id !== gameToDelete.id);
    saveGames(postGameDelete);
  };

  const updateGame = (updatedGameData) => {
    const updatedGameCollection = gameCollection.map((game) =>
      game.id === updatedGameData.id ? { ...game, ...updatedGameData } : game
    );
    saveGames(updatedGameCollection);
  };

  return (
    <>
    <NavbarLogin/>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <label htmlFor="txtKeywords" className="form-label">
              Search Title
            </label>
            <input
              type="text"
              name="txtKeywords"
              id="txtKeywords"
              className="form-control"
              onChange={(evt) => setKeywords(evt.currentTarget.value)}
              value={keywords}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Select Console
            </label>
            <select
              value={gameCondition}
              className="form-select"
              onChange={(evt) => setGameConsole(evt.currentTarget.value)}
            >
              <option value=""> All Consoles </option>
              {_(gameCollection)
                .map((game) => game.gameConsole)
                .sort()
                .uniq()
                .map((gameConsole) => (
                  <option key={gameConsole} value={gameConsole}>
                    {gameConsole}
                  </option>
                ))
                .value()}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Select Release Year
            </label>
            <select
              value={releaseYear}
              className="form-select"
              onChange={(evt) => setReleaseYear(evt.currentTarget.value)}
            >
              <option value=""> All Years </option>
              {_(gameCollection)
                .map((game) => game.releaseYear)
                .sort()
                .uniq()
                .map((releaseYear) => (
                  <option key={releaseYear} value={releaseYear}>
                    {releaseYear}
                  </option>
                ))
                .value()}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Select Condition
            </label>
            <select
              value={gameCondition}
              className="form-select"
              onChange={(evt) => setGameCondition(evt.currentTarget.value)}
            >
              <option value=""> All Conditions </option>
              {_(gameCollection)
                .map((game) => game.gameCondition)
                .sort()
                .uniq()
                .map((gameCondition) => (
                  <option key={gameCondition} value={gameCondition}>
                    {gameCondition}
                  </option>
                ))
                .value()}
            </select>
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-lg btn-primary mt-4" onClick={searchGamesWork}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
          <AddGame addGame={addGame} />
        <div className="row">
          {searchResults &&
            searchResults.map((game) => (
              <div className="col-md-2" key={game.id}>
                <GameCard game={game} removeGame={removeGame} updateGame={updateGame} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
