if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    // Will be replaced by make-service-worker.js to include the proper version.
    const VersionMetadata = {"version":"5.0.145","gitHash":"a29e7aae449306e1c13556f31b311aaecc5f3a71","versionWithHash":"5.0.145-a29e7aae449306e1c13556f31b311aaecc5f3a71"};

    // Contrary to other static assets (JS, CSS, HTML), libGD.js/wasm are not
    // versioned in their filenames. Instead, we version using a query string
    // (see src/index.js where it's loaded with the same query string).
    workbox.precaching.precacheAndRoute([
      {
        url: `libGD.js?cache-buster=${VersionMetadata.versionWithHash}`,
        revision: null, // Revision is null because versioning included in the URL.
      },
      {
        url: `libGD.wasm?cache-buster=${VersionMetadata.versionWithHash}`,
        revision: null, // Revision is null because versioning included in the URL.
      },
    ]);

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "apple-touch-icon.png",
    "revision": "8a8dcc0aca05bef2849a9e499226b765"
  },
  {
    "url": "favicon-256.png",
    "revision": "3d00d2c8283ab3370eeb1c37b1a15621"
  },
  {
    "url": "favicon-512.png",
    "revision": "506a9e30e422d361f72b9476aa328530"
  },
  {
    "url": "GDevelop-editor-thumbnail.png",
    "revision": "107fd8e2e976c931c7e3911d080849a4"
  },
  {
    "url": "index.html",
    "revision": "9df7762f5bb24e334a883aa2df15d89e"
  },
  {
    "url": "static/css/0.bd8e90f9.chunk.css",
    "revision": "bffaf5995eb16aae233a7ace5a898a55"
  },
  {
    "url": "static/css/1.46549bfb.chunk.css",
    "revision": "d5bec409da8ccaceaa22fc53f446b29f"
  },
  {
    "url": "static/css/64.d4710e4c.chunk.css",
    "revision": "f71518790baad0ccaa56b3aacd689450"
  },
  {
    "url": "static/css/65.c0539ad5.chunk.css",
    "revision": "a43806b3d1ae1ccf28ce072ef4c384ef"
  },
  {
    "url": "static/css/main.4ef9537c.chunk.css",
    "revision": "9624352e34d4545010b339c2f14770ba"
  },
  {
    "url": "static/media/FiraSans-Bold.b2c1d356.ttf",
    "revision": "382e230417d252a0cb16c7d491b030c7"
  },
  {
    "url": "static/media/FiraSans-Regular.f4eb295e.ttf",
    "revision": "50e780b45678ae34cef52d3e5112bd0d"
  },
  {
    "url": "static/media/FiraSans-SemiBold.9b442464.ttf",
    "revision": "eb5e811f2fe0408c9d0a552fcf1fb390"
  },
  {
    "url": "static/media/icomoon.4b08d766.svg",
    "revision": "108516dde5a07f50e794a618b577b3c9"
  },
  {
    "url": "static/media/icomoon.f7dc2a47.woff",
    "revision": "42c30b9199097d730008d5bac110bc73"
  },
  {
    "url": "static/media/icomoon.f8595fc6.eot",
    "revision": "30813e429d5eab7befdf6fa795cd67de"
  },
  {
    "url": "static/media/icomoon.ff25c985.ttf",
    "revision": "22fb373af7e049ec9d0009c28d3b94dc"
  },
  {
    "url": "static/js/0.842cf992.chunk.js",
    "revision": "c76c77edebe39b4a362a5804910453bb"
  },
  {
    "url": "static/js/1.c43a768c.chunk.js",
    "revision": "c009156d3e72da651a2dc6445072cebb"
  },
  {
    "url": "static/js/100.c6fd15c5.chunk.js",
    "revision": "5c21f3b7df6d7e8b1419103e8244e91b"
  },
  {
    "url": "static/js/101.c7f81ee8.chunk.js",
    "revision": "401b2e907d25964a2b904b15a4d8465d"
  },
  {
    "url": "static/js/102.a338e267.chunk.js",
    "revision": "98ed22c87dd0659c6fa369c00709ae40"
  },
  {
    "url": "static/js/103.e4839f7b.chunk.js",
    "revision": "db503cc5e8e77d3da3eb108bfceb91f2"
  },
  {
    "url": "static/js/104.a99b1a3a.chunk.js",
    "revision": "56e31329e5da162b10bdeff87af2004c"
  },
  {
    "url": "static/js/105.cc4847d8.chunk.js",
    "revision": "70d8a607601f4dfed2d4dfe9b240d307"
  },
  {
    "url": "static/js/106.25427c79.chunk.js",
    "revision": "9e8dee10e897a55b051537980bccd4d8"
  },
  {
    "url": "static/js/107.8eddd356.chunk.js",
    "revision": "60122007a6ed84853659a2c9cbe55d78"
  },
  {
    "url": "static/js/108.75ca5e1d.chunk.js",
    "revision": "8d06135ab3b1fab26395aeca844d72c8"
  },
  {
    "url": "static/js/109.71804e3b.chunk.js",
    "revision": "4ca1c6fa99326d1505b6fd6a57511d74"
  },
  {
    "url": "static/js/110.08ba1c83.chunk.js",
    "revision": "ed6b7170cfe271a0a9f6edf015308dac"
  },
  {
    "url": "static/js/111.f48edee6.chunk.js",
    "revision": "a2a8ab9844c112f8e23cf6556a55b638"
  },
  {
    "url": "static/js/112.c0d88eb7.chunk.js",
    "revision": "ad56cd80c9c6ee87219b6184c79bf950"
  },
  {
    "url": "static/js/113.0434343c.chunk.js",
    "revision": "0609a48ea62eeb684a249666bf79e0a2"
  },
  {
    "url": "static/js/114.84cfc8b9.chunk.js",
    "revision": "8cf21d540b4d329567c506d0ce855fe8"
  },
  {
    "url": "static/js/115.816fa2ba.chunk.js",
    "revision": "32a8668e1916e4a3d1907776c17f1e9e"
  },
  {
    "url": "static/js/116.b971e7e0.chunk.js",
    "revision": "6c2b1e4787aea490b8e79478fdfbd545"
  },
  {
    "url": "static/js/117.1ff1b634.chunk.js",
    "revision": "026c9d6d4cddd05c207a35d8098ae715"
  },
  {
    "url": "static/js/118.769b8671.chunk.js",
    "revision": "3b1dbbcf85a13e1ac38db038313ab345"
  },
  {
    "url": "static/js/2.2778ca70.chunk.js",
    "revision": "64fae14cd17f36ae5318aedf707f9e69"
  },
  {
    "url": "static/js/64.2d4d8b30.chunk.js",
    "revision": "6b74946620d55774ddaece5487876135"
  },
  {
    "url": "static/js/65.c0acbe36.chunk.js",
    "revision": "12199dc15237c663349cffa24d7fb737"
  },
  {
    "url": "static/js/66.7fe391af.chunk.js",
    "revision": "3815c86914cf953fa7cc16154a37cd53"
  },
  {
    "url": "static/js/67.7ac9c386.chunk.js",
    "revision": "09607406d69b15496ee91ee7a20657e1"
  },
  {
    "url": "static/js/68.d2e3baba.chunk.js",
    "revision": "d200d2b613825bc4b1161582fc349216"
  },
  {
    "url": "static/js/69.8a5c6657.chunk.js",
    "revision": "320da52c977848ee462f6bcbf6978bf1"
  },
  {
    "url": "static/js/70.e3ace334.chunk.js",
    "revision": "316b7f6040431949d648aa8e0f015ba5"
  },
  {
    "url": "static/js/71.9611c06d.chunk.js",
    "revision": "c44e78352aa6ed8a0bca3306736e0af9"
  },
  {
    "url": "static/js/72.4aa986ba.chunk.js",
    "revision": "384c81dcd8bdc7612aa87e8a16d47d25"
  },
  {
    "url": "static/js/73.caf9af5c.chunk.js",
    "revision": "6b0239b9e24a42fbe2afbf3bea547451"
  },
  {
    "url": "static/js/74.765fcbf4.chunk.js",
    "revision": "a116d239b73a20c5164661ff791fad21"
  },
  {
    "url": "static/js/75.fcce162b.chunk.js",
    "revision": "5d6b47266a0c5bcf05909b7f278b43b1"
  },
  {
    "url": "static/js/76.66269429.chunk.js",
    "revision": "2765a8e5b5f1aca95cb1d1c60e3fa932"
  },
  {
    "url": "static/js/77.045398f9.chunk.js",
    "revision": "a421c325631b2b432321c9c9674ec8f2"
  },
  {
    "url": "static/js/78.4fea12b1.chunk.js",
    "revision": "fff32772bc642a9fccee077eece71152"
  },
  {
    "url": "static/js/79.3377e3f5.chunk.js",
    "revision": "47a718a3f4ee060ae0a2dc71c33bb529"
  },
  {
    "url": "static/js/80.259aefda.chunk.js",
    "revision": "88c0dd87b86878aec2ccf1c4dd14d3df"
  },
  {
    "url": "static/js/81.d20c710e.chunk.js",
    "revision": "867700b930f67c7c46fcc7812580b582"
  },
  {
    "url": "static/js/82.6f795dbb.chunk.js",
    "revision": "2fa7b7c9860f7bf307b6003e63bd3b9b"
  },
  {
    "url": "static/js/83.7af56967.chunk.js",
    "revision": "6572c1e3e01899e043f117b6c4031579"
  },
  {
    "url": "static/js/84.161ca26a.chunk.js",
    "revision": "0466b3d941da1fd650507115daeb229c"
  },
  {
    "url": "static/js/85.5217489f.chunk.js",
    "revision": "b36ef766b1368b72d57876ec437b27bf"
  },
  {
    "url": "static/js/86.64bc046b.chunk.js",
    "revision": "9c2d8ab883f4591528597a159d277d1e"
  },
  {
    "url": "static/js/87.a4f2b7ac.chunk.js",
    "revision": "4c9f23c8e9222739ad9698017e153d6c"
  },
  {
    "url": "static/js/88.80b7edd1.chunk.js",
    "revision": "8549be41a776a1c66807913453fc05f7"
  },
  {
    "url": "static/js/89.64cb563f.chunk.js",
    "revision": "517097020581e6434aab3aa561a91aaa"
  },
  {
    "url": "static/js/90.bfc05c7b.chunk.js",
    "revision": "6738d3dc3bc6393ce3fdbf2bf9f01c32"
  },
  {
    "url": "static/js/91.c26b568d.chunk.js",
    "revision": "8c4d52a379086418a0bf84330a09a43e"
  },
  {
    "url": "static/js/92.0ace8cc5.chunk.js",
    "revision": "e30bf46a7154100f886bbb0d16e813b7"
  },
  {
    "url": "static/js/93.f10a1d3f.chunk.js",
    "revision": "d8facbf6899ad7973cbb39e76afc87c8"
  },
  {
    "url": "static/js/94.3809acd8.chunk.js",
    "revision": "255134c4dcb08504548cd63e2676ff5c"
  },
  {
    "url": "static/js/95.d38a5b45.chunk.js",
    "revision": "f101b77e7e3a61af0939a786a623d961"
  },
  {
    "url": "static/js/96.f3bbea40.chunk.js",
    "revision": "1f11f0147561d1b1fd1b5687dc7c412c"
  },
  {
    "url": "static/js/97.83e2b7da.chunk.js",
    "revision": "f51d820a6baaf6c5bfad03b8fef6edbc"
  },
  {
    "url": "static/js/98.2754a49a.chunk.js",
    "revision": "6a8ec1cc76131cbb57dce6316065cb22"
  },
  {
    "url": "static/js/99.ef9fa538.chunk.js",
    "revision": "ce057f68559cc971a62ba9c6293f92ce"
  },
  {
    "url": "static/js/browser-app.8c1bbf89.chunk.js",
    "revision": "e500e3ca368cc50a04e95c2fe4881228"
  },
  {
    "url": "static/js/main.5d10b6b9.chunk.js",
    "revision": "c2e261802006292178938d7b0f89fe31"
  },
  {
    "url": "static/js/runtime-main.2c8092b6.js",
    "revision": "a4b94085cede5ee8395a7e67e6fec2f6"
  },
  {
    "url": "CppPlatform/Extensions/AESicon16.png",
    "revision": "e960ca45f3eb6a7da138fca41b32be10"
  },
  {
    "url": "CppPlatform/Extensions/AESicon24.png",
    "revision": "f27a779ee0758211648c11d10d463a2f"
  },
  {
    "url": "CppPlatform/Extensions/AnchorIcon.png",
    "revision": "dc62fd2ae51acbe7be8c64d6d7c3d00a"
  },
  {
    "url": "CppPlatform/Extensions/AnchorIcon16.png",
    "revision": "42e1b373443b718e51b60dd123f19e89"
  },
  {
    "url": "CppPlatform/Extensions/AnchorIcon24.png",
    "revision": "85084b55cee4781a0d2cfc911f03d49f"
  },
  {
    "url": "CppPlatform/Extensions/AStaricon.png",
    "revision": "c77104aca9b040ce80315a25fe1d6e0c"
  },
  {
    "url": "CppPlatform/Extensions/AStaricon16.png",
    "revision": "bddb4e6397fc0bda28489e6ac0c9b588"
  },
  {
    "url": "CppPlatform/Extensions/AStaricon24.png",
    "revision": "93f4c44dba96a26c3fffe634adacf747"
  },
  {
    "url": "CppPlatform/Extensions/badvideo.png",
    "revision": "ac8996c9b30e28627b7dfb70ba21e4d9"
  },
  {
    "url": "CppPlatform/Extensions/Box3Dicon.png",
    "revision": "7472ccbbffcd80ea34a091c08d7535e3"
  },
  {
    "url": "CppPlatform/Extensions/Box3Dicon24.png",
    "revision": "b9d415ef1e96384873ad6cda15bf2525"
  },
  {
    "url": "CppPlatform/Extensions/destroyoutsideicon.png",
    "revision": "e9378e84087b5aca88ddfc27f876a9b4"
  },
  {
    "url": "CppPlatform/Extensions/destroyoutsideicon16.png",
    "revision": "347598fbfd72f197a6622e7c4297628f"
  },
  {
    "url": "CppPlatform/Extensions/destroyoutsideicon24.png",
    "revision": "9bfb967b3cd1892f4298ad58477a812e"
  },
  {
    "url": "CppPlatform/Extensions/draggableicon.png",
    "revision": "35f102527e7105762915a7df1fcb3242"
  },
  {
    "url": "CppPlatform/Extensions/draggableicon16.png",
    "revision": "814475d84fff18108739c4bb13bcfd73"
  },
  {
    "url": "CppPlatform/Extensions/draggableicon24.png",
    "revision": "486a9f4704c576477fd97867fd2beb47"
  },
  {
    "url": "CppPlatform/Extensions/Inventoryicon.png",
    "revision": "3459e72c476620da99790b7bb37090e3"
  },
  {
    "url": "CppPlatform/Extensions/Inventoryicon16.png",
    "revision": "972671125eb92129cb55953ef84d59a1"
  },
  {
    "url": "CppPlatform/Extensions/Inventoryicon24.png",
    "revision": "1f04ffc09ca439286d18e00b5e0a4cf0"
  },
  {
    "url": "CppPlatform/Extensions/lightIcon16.png",
    "revision": "fb25429f8f9a86f941e0e6c3261246ac"
  },
  {
    "url": "CppPlatform/Extensions/lightIcon24.png",
    "revision": "c628bccb4ecbb4df923421eb6a6ffde9"
  },
  {
    "url": "CppPlatform/Extensions/lightIcon32.png",
    "revision": "1f12ce6e3fef79efd57e11f48693acc7"
  },
  {
    "url": "CppPlatform/Extensions/lightObstacleIcon24.png",
    "revision": "3dda28be1178f2b14ca7bcc288bc3c5b"
  },
  {
    "url": "CppPlatform/Extensions/lightObstacleIcon32.png",
    "revision": "ca88ed4cd628b3d4ffa7837f29830d87"
  },
  {
    "url": "CppPlatform/Extensions/LinkedObjectsicon16.png",
    "revision": "3a796392292f76e09864f7c1f6fdd4e6"
  },
  {
    "url": "CppPlatform/Extensions/LinkedObjectsicon24.png",
    "revision": "2f68881bb060a91528d608f8b1a0d4a9"
  },
  {
    "url": "CppPlatform/Extensions/networkicon.png",
    "revision": "179dfdc09cfbc427d804dd6d6402b2e7"
  },
  {
    "url": "CppPlatform/Extensions/networkicon24.png",
    "revision": "54fdc9b7cbc5c82edbb6c83042d44384"
  },
  {
    "url": "CppPlatform/Extensions/networkicon32.png",
    "revision": "9cd92fdf1ccbf05493c51b21e6b2d2d2"
  },
  {
    "url": "CppPlatform/Extensions/PanelSpriteIcon.png",
    "revision": "0afc4708044894236715d99ebf13d35b"
  },
  {
    "url": "CppPlatform/Extensions/PanelSpriteIcon16.png",
    "revision": "b38e31a9014fe6ffd5929cdff358f229"
  },
  {
    "url": "CppPlatform/Extensions/PanelSpriteIcon24.png",
    "revision": "b8390821828f38e1d14613383abb13f6"
  },
  {
    "url": "CppPlatform/Extensions/particleSystemicon.png",
    "revision": "ac882ee14f40cd7059078cfbf3e33732"
  },
  {
    "url": "CppPlatform/Extensions/particleSystemicon16.png",
    "revision": "15866ee534eb05d5fb69de01279d5d1b"
  },
  {
    "url": "CppPlatform/Extensions/particleSystemicon24.png",
    "revision": "57aa8c0f01992e4ebd8e0ed7eaf7667e"
  },
  {
    "url": "CppPlatform/Extensions/particleSystemSceneIcon.png",
    "revision": "ac882ee14f40cd7059078cfbf3e33732"
  },
  {
    "url": "CppPlatform/Extensions/pathfindingobstacleicon.png",
    "revision": "f7ed5e2e063cbec97daa3240346c0c9f"
  },
  {
    "url": "CppPlatform/Extensions/pathfindingobstacleicon16.png",
    "revision": "967068b1e1fbbb3b0ce7e74bfa6e2754"
  },
  {
    "url": "CppPlatform/Extensions/pathfindingobstacleicon24.png",
    "revision": "c75a4ccdd91f0659d4d27da1d2335f28"
  },
  {
    "url": "CppPlatform/Extensions/pathicon.png",
    "revision": "ae15de3794678a85cb32e2d512b48ec4"
  },
  {
    "url": "CppPlatform/Extensions/pathicon16.png",
    "revision": "584f16d858e787b45d713f886dd9e6f6"
  },
  {
    "url": "CppPlatform/Extensions/pathicon24.png",
    "revision": "b56f4fa711e1d96bd033182751676760"
  },
  {
    "url": "CppPlatform/Extensions/platformerobjecticon.png",
    "revision": "0e295d8739190f4558cfeb32cab69420"
  },
  {
    "url": "CppPlatform/Extensions/platformerobjecticon16.png",
    "revision": "3be9f1382c9d42e92a64a1451c2ec17a"
  },
  {
    "url": "CppPlatform/Extensions/platformerobjecticon24.png",
    "revision": "50ec3b9da084f4f1d0500145d214a57e"
  },
  {
    "url": "CppPlatform/Extensions/platformicon.png",
    "revision": "e5e43b9891c1208483bbca030276d408"
  },
  {
    "url": "CppPlatform/Extensions/platformicon16.png",
    "revision": "6f5269722c5d3a0729ff0c95c01bea20"
  },
  {
    "url": "CppPlatform/Extensions/platformicon24.png",
    "revision": "ade3af4f64e16c479390df6386367943"
  },
  {
    "url": "CppPlatform/Extensions/primitivedrawingicon.png",
    "revision": "93283067df57336ae70945958a6c9d4f"
  },
  {
    "url": "CppPlatform/Extensions/primitivedrawingicon24.png",
    "revision": "3fad57479b87b4f5d53ec3eb640cbd7c"
  },
  {
    "url": "CppPlatform/Extensions/soundicon24.png",
    "revision": "b58b87336e0b8a84bb09afa902073ed3"
  },
  {
    "url": "CppPlatform/Extensions/soundicon32.png",
    "revision": "c68c00078be6c15e1368741e1007cc8f"
  },
  {
    "url": "CppPlatform/Extensions/spriteicon.png",
    "revision": "928444cb54f876d098e1afdc85d4edb2"
  },
  {
    "url": "CppPlatform/Extensions/systeminfoicon.png",
    "revision": "6b20b097add25e312cba5c2712e0b6cc"
  },
  {
    "url": "CppPlatform/Extensions/systeminfoicon16.png",
    "revision": "b056ef687af9762d8c0050c75e131f6f"
  },
  {
    "url": "CppPlatform/Extensions/systeminfoicon24.png",
    "revision": "85bc497a7580a6a6505ef745786d12be"
  },
  {
    "url": "CppPlatform/Extensions/textentry.png",
    "revision": "a3794dea8b9cfbcba0ff0da2048b10cb"
  },
  {
    "url": "CppPlatform/Extensions/textentry24.png",
    "revision": "7218878c38af5bee66c7c5156ee450f4"
  },
  {
    "url": "CppPlatform/Extensions/textentryicon.png",
    "revision": "b0fcc2477bd99e4e2cdf6010c7f8d38e"
  },
  {
    "url": "CppPlatform/Extensions/texticon.png",
    "revision": "c76718bf60d1d630376c03c18382ceba"
  },
  {
    "url": "CppPlatform/Extensions/texticon24.png",
    "revision": "21ccca347dc440afc94cc5a8b7712b16"
  },
  {
    "url": "CppPlatform/Extensions/TiledSpriteIcon.png",
    "revision": "97bd2e4fcd35eaa78c97936b78e71de3"
  },
  {
    "url": "CppPlatform/Extensions/TiledSpriteIcon24.png",
    "revision": "6e47e74a113ac22472dfefce5e2f79c4"
  },
  {
    "url": "CppPlatform/Extensions/TileMapIcon.png",
    "revision": "c5698f5f506597ccdd7305713f57e828"
  },
  {
    "url": "CppPlatform/Extensions/TileMapIcon24.png",
    "revision": "b517b303dae7e0c78e90de187c2a8498"
  },
  {
    "url": "CppPlatform/Extensions/timedevent16.png",
    "revision": "b5d3829927415f32e403d9ca7da721bc"
  },
  {
    "url": "CppPlatform/Extensions/timedevent24.png",
    "revision": "530082be48c39e81d38fa9deb121d69f"
  },
  {
    "url": "CppPlatform/Extensions/timedevent64.png",
    "revision": "1322d3ae7835fbedfa496966bf922f94"
  },
  {
    "url": "CppPlatform/Extensions/topdownmovementicon.png",
    "revision": "a16ca363e20cafff201b4a3ccc64f17c"
  },
  {
    "url": "CppPlatform/Extensions/topdownmovementicon16.png",
    "revision": "1fd06e0157a8ffce40d09e70aac52894"
  },
  {
    "url": "CppPlatform/Extensions/topdownmovementicon24.png",
    "revision": "8fbce755f0b09e8fdc25a38f16a7d54b"
  },
  {
    "url": "CppPlatform/Extensions/videoicon.png",
    "revision": "644d34c2d55da38ade75bc626de96e3a"
  },
  {
    "url": "CppPlatform/Extensions/videoicon24.png",
    "revision": "2d40553796ca786174b4d72adc0ad426"
  },
  {
    "url": "CppPlatform/icon32.png",
    "revision": "e911c58067c5a21920d5470dec74a696"
  },
  {
    "url": "JsPlatform/Extensions/admobicon.png",
    "revision": "aec2fb621b3723b5025b25cbb7dccc3a"
  },
  {
    "url": "JsPlatform/Extensions/admobicon16.png",
    "revision": "9382c4e8184671674fa1804317439a59"
  },
  {
    "url": "JsPlatform/Extensions/admobicon24.png",
    "revision": "f703e3f20663059d450573f72a4fbd74"
  },
  {
    "url": "JsPlatform/Extensions/bbcode16.png",
    "revision": "6ee8040383d725c839eb2a334a7e65df"
  },
  {
    "url": "JsPlatform/Extensions/bbcode24.png",
    "revision": "aa5b9ef7dbab08cdd7fd2f1cc0c4ac2b"
  },
  {
    "url": "JsPlatform/Extensions/bbcode32.png",
    "revision": "0d3bbc28586bcedc6a3a23ad5f9796d7"
  },
  {
    "url": "JsPlatform/Extensions/bitmapfont16.png",
    "revision": "22640f0943932feca5caf2298faa2a9d"
  },
  {
    "url": "JsPlatform/Extensions/bitmapfont24.png",
    "revision": "beada2b2c1a5fd2a7219421c89725e9e"
  },
  {
    "url": "JsPlatform/Extensions/bitmapfont32.png",
    "revision": "455c26f57dfde2d8f671b97de3150831"
  },
  {
    "url": "JsPlatform/Extensions/distance_joint16.png",
    "revision": "ad6d6d0c840d695b694816986eed26f9"
  },
  {
    "url": "JsPlatform/Extensions/distance_joint24.png",
    "revision": "f010800317da6d29a36d7d895162a439"
  },
  {
    "url": "JsPlatform/Extensions/distance_joint32.png",
    "revision": "2398a799506900faad48b3dd38aa3120"
  },
  {
    "url": "JsPlatform/Extensions/facebookicon16.png",
    "revision": "53c6f1ae56fe68d57c7f4d288137133c"
  },
  {
    "url": "JsPlatform/Extensions/facebookicon24.png",
    "revision": "d7144aa225e654250433cb501da29bfc"
  },
  {
    "url": "JsPlatform/Extensions/facebookicon32.png",
    "revision": "9058e3f0acaf1ecde32d7782d17eb225"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_create_folder16.png",
    "revision": "5c86862ef2065959f9d8c3d97f1e5b70"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_create_folder24.png",
    "revision": "5f2847dcea7a33312a998d008970cdd5"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_create_folder32.png",
    "revision": "39190ddea3d47e57b4d6de58d278f286"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_delete_file16.png",
    "revision": "576da92627f2767649aca6a57c4f8533"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_delete_file24.png",
    "revision": "2189994a526ac87dc8fb91e64327890d"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_delete_file32.png",
    "revision": "72fc15fe834db3105f88e80fcd09d144"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_file16.png",
    "revision": "fb69a0037e4d07df7c5eec3e80c1cab9"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_file24.png",
    "revision": "243e7857e3957ff0871aecf2040197c2"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_file32.png",
    "revision": "5532cbb2869e37e22f60c2582b7b83dc"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_folder16.png",
    "revision": "5879f04dfb32bba3ad910387869098f8"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_folder24.png",
    "revision": "feea63bbd4d4e5698d62c2280f513b35"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_folder32.png",
    "revision": "18e5a21a511321776c5365f781c0ba85"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_load_file16.png",
    "revision": "610c2d861f4a006509f350a0aea39e74"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_load_file24.png",
    "revision": "bc75a12516ce5c7e53cebcaf2edec412"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_load_file32.png",
    "revision": "abff3d27fc6dd826cf3ee7a5223a2a36"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_path_exists16.png",
    "revision": "c5abeb9f7f6a273bdcfd825ac08c9d6b"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_path_exists24.png",
    "revision": "389bade1c88a1a63c47c919ff05955c9"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_path_exists32.png",
    "revision": "31516eec68bf87802bffc9e6036b4d06"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_save_file16.png",
    "revision": "c5f1a63e7ea7ed289f8f3642427adb46"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_save_file24.png",
    "revision": "2de4ef6118fc68f9d8853046ff05f58d"
  },
  {
    "url": "JsPlatform/Extensions/filesystem_save_file32.png",
    "revision": "6fe98bc48adc1d6eaf00db5f6302b7cf"
  },
  {
    "url": "JsPlatform/Extensions/firebase.png",
    "revision": "bb5d30fec65686babae2e8caa53666c3"
  },
  {
    "url": "JsPlatform/Extensions/friction_joint16.png",
    "revision": "24f963a5d848dbfcf46107b5ed5d6227"
  },
  {
    "url": "JsPlatform/Extensions/friction_joint24.png",
    "revision": "7d6266752e046e26923f1dc976d96edf"
  },
  {
    "url": "JsPlatform/Extensions/friction_joint32.png",
    "revision": "5264afcaf3cf93368e990447943e7c56"
  },
  {
    "url": "JsPlatform/Extensions/gear_joint16.png",
    "revision": "0b9ca1a660ce2b6903329c5f0a9e667b"
  },
  {
    "url": "JsPlatform/Extensions/gear_joint24.png",
    "revision": "afcc815166d0f90829b4329ebcb1961c"
  },
  {
    "url": "JsPlatform/Extensions/gear_joint32.png",
    "revision": "cd180d7dee60201ed1edf2ef447155d6"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_x16.png",
    "revision": "04e05504c8a00e44048902fdf9831adb"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_x24.png",
    "revision": "390bbfcfe726410307e446f851cf1693"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_x32.png",
    "revision": "d7ca7b437bab185729894165d5229c43"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_y16.png",
    "revision": "5297fb33dbfb07ac27f5b6f2632fa2ea"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_y24.png",
    "revision": "a33be90657a8caa3d422f6a98efd0821"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_y32.png",
    "revision": "a3b9005a9e3099d487b35549f0401acd"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_z16.png",
    "revision": "de4884d0e3020f940b46b741e68a03d6"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_z24.png",
    "revision": "45859c8df236b1c69a31e7c7fd4507f9"
  },
  {
    "url": "JsPlatform/Extensions/motion_acceleration_z32.png",
    "revision": "33f405a8638c00d0166b677a32be6d28"
  },
  {
    "url": "JsPlatform/Extensions/motion_active16.png",
    "revision": "248f694dc57666a49c040713096d5dee"
  },
  {
    "url": "JsPlatform/Extensions/motion_active24.png",
    "revision": "0ac5b0239fb955a72e9a7ce001564b7d"
  },
  {
    "url": "JsPlatform/Extensions/motion_active32.png",
    "revision": "44d71705104e4eb750227059378e0161"
  },
  {
    "url": "JsPlatform/Extensions/motion_inactive16.png",
    "revision": "83e5cfb36250d27b02ea2d30f194c858"
  },
  {
    "url": "JsPlatform/Extensions/motion_inactive24.png",
    "revision": "132013c8e831c41f9b7cb7c41ce61c17"
  },
  {
    "url": "JsPlatform/Extensions/motion_inactive32.png",
    "revision": "ccb5c123fa9c241bfacb12a7a3eaee1a"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_alpha16.png",
    "revision": "e27e2d3482541f1deae412d3eaf67d49"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_alpha24.png",
    "revision": "de4f267711b66e67b4c731acb4da9dae"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_alpha32.png",
    "revision": "e98cbc42bd206cdab7f112fbca2f0dcf"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_beta16.png",
    "revision": "bc0d7b3841688182767c8cc58e7ef7f9"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_beta24.png",
    "revision": "5b4286795cdc143b6686bca83fe50b32"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_beta32.png",
    "revision": "461b58a2564e77f8abf16e5551f01bf1"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_gamma16.png",
    "revision": "ec498d0e567a064a808710de7d8797eb"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_gamma24.png",
    "revision": "fc3a686ccb2026317be19ca4d5b0d843"
  },
  {
    "url": "JsPlatform/Extensions/motion_rotation_gamma32.png",
    "revision": "3ecbbeb79574efe0b92a46e0ab6a7483"
  },
  {
    "url": "JsPlatform/Extensions/motor_joint16.png",
    "revision": "00598f7f44d3e9ed43e6f4c68c8a5298"
  },
  {
    "url": "JsPlatform/Extensions/motor_joint24.png",
    "revision": "076f8557017941ddce54bedbe3b6be7c"
  },
  {
    "url": "JsPlatform/Extensions/motor_joint32.png",
    "revision": "d59198013e287a40012bd084534765e5"
  },
  {
    "url": "JsPlatform/Extensions/mouse_joint16.png",
    "revision": "db5b205b876470bd68deb9fb3e6ba697"
  },
  {
    "url": "JsPlatform/Extensions/mouse_joint24.png",
    "revision": "e1116ffdca6763fc121cf0b62e695e15"
  },
  {
    "url": "JsPlatform/Extensions/mouse_joint32.png",
    "revision": "ed518f4dd967e633f394734ac6f59246"
  },
  {
    "url": "JsPlatform/Extensions/orientation_absolute16.png",
    "revision": "63d4e9bb169ddb229723228daaa62a48"
  },
  {
    "url": "JsPlatform/Extensions/orientation_absolute24.png",
    "revision": "646f4a3933afa4ad115208abd9fece48"
  },
  {
    "url": "JsPlatform/Extensions/orientation_absolute32.png",
    "revision": "20d167186341f3ce2f81db911375056a"
  },
  {
    "url": "JsPlatform/Extensions/orientation_active16.png",
    "revision": "c23374b28b95aef0f5b9aac2ba55e656"
  },
  {
    "url": "JsPlatform/Extensions/orientation_active24.png",
    "revision": "3224ea30173f23f12b37c99c8be55b97"
  },
  {
    "url": "JsPlatform/Extensions/orientation_active32.png",
    "revision": "fd942fb081b9d310efdb9f507e78cc08"
  },
  {
    "url": "JsPlatform/Extensions/orientation_alpha16.png",
    "revision": "9f0a90f5de0787c6e45c6a02675e3837"
  },
  {
    "url": "JsPlatform/Extensions/orientation_alpha24.png",
    "revision": "6be8fff593923636cf3a57213ee0b04d"
  },
  {
    "url": "JsPlatform/Extensions/orientation_alpha32.png",
    "revision": "bc086315303298e0567f7a4b156f540b"
  },
  {
    "url": "JsPlatform/Extensions/orientation_beta16.png",
    "revision": "5fe821c3bc7211f3afb02ecf67425cbb"
  },
  {
    "url": "JsPlatform/Extensions/orientation_beta24.png",
    "revision": "b241eaf761d2dede9253eccda60dbaa2"
  },
  {
    "url": "JsPlatform/Extensions/orientation_beta32.png",
    "revision": "65a7ea5be9f53dc987c0abcd32349b4f"
  },
  {
    "url": "JsPlatform/Extensions/orientation_gamma16.png",
    "revision": "e1e21a69768847d82f056cc5511cdbc3"
  },
  {
    "url": "JsPlatform/Extensions/orientation_gamma24.png",
    "revision": "b97bf2db246f459f8505d04792e8e637"
  },
  {
    "url": "JsPlatform/Extensions/orientation_gamma32.png",
    "revision": "18e2b2e7b53cd92ddfc662e2329ff040"
  },
  {
    "url": "JsPlatform/Extensions/orientation_inactive16.png",
    "revision": "78ad18d6360377c7e1df446e789517cd"
  },
  {
    "url": "JsPlatform/Extensions/orientation_inactive24.png",
    "revision": "df90fa000035a8b820afd0624e0c94a3"
  },
  {
    "url": "JsPlatform/Extensions/orientation_inactive32.png",
    "revision": "0e724e2c760a273812a9889a65db1f22"
  },
  {
    "url": "JsPlatform/Extensions/prismatic_joint16.png",
    "revision": "f02843ef8b766174f33403d0bb58a9dd"
  },
  {
    "url": "JsPlatform/Extensions/prismatic_joint24.png",
    "revision": "47a85948a25d8f9e2378fcff5acce543"
  },
  {
    "url": "JsPlatform/Extensions/prismatic_joint32.png",
    "revision": "be5ea9a32526a490767594f5e96b67c9"
  },
  {
    "url": "JsPlatform/Extensions/pulley_joint16.png",
    "revision": "04723a5558345a830c79b638992a831b"
  },
  {
    "url": "JsPlatform/Extensions/pulley_joint24.png",
    "revision": "a12a9bf13ed58edeef8a676c9aa0f015"
  },
  {
    "url": "JsPlatform/Extensions/pulley_joint32.png",
    "revision": "c6bcccb2c66ca93941bdca3841e7d20d"
  },
  {
    "url": "JsPlatform/Extensions/revolute_joint16.png",
    "revision": "21493bec76e6e8f01693ef8c7c6c63d1"
  },
  {
    "url": "JsPlatform/Extensions/revolute_joint24.png",
    "revision": "c17a76bb0073748d094fabb7d7617673"
  },
  {
    "url": "JsPlatform/Extensions/revolute_joint32.png",
    "revision": "6ae808372af6f5ed9c3fb2ee14370da8"
  },
  {
    "url": "JsPlatform/Extensions/rope_joint16.png",
    "revision": "0eff8858a97110bf8572a6c1e3ea05ca"
  },
  {
    "url": "JsPlatform/Extensions/rope_joint24.png",
    "revision": "50713d52002bfb532024ffa5216684b9"
  },
  {
    "url": "JsPlatform/Extensions/rope_joint32.png",
    "revision": "7852aefd1a0d8374643c46515ed275a1"
  },
  {
    "url": "JsPlatform/Extensions/shopifyicon.png",
    "revision": "6aa53abf9215a5465098fe217b68f619"
  },
  {
    "url": "JsPlatform/Extensions/shopifyicon16.png",
    "revision": "56b30bcebbbbaf022be05e8da8573a7d"
  },
  {
    "url": "JsPlatform/Extensions/shopifyicon24.png",
    "revision": "506851149c66c1a592ccb95369870458"
  },
  {
    "url": "JsPlatform/Extensions/skeletonanimationicon16.png",
    "revision": "b3e0d2751cf8f9552dd38efc21c58c5c"
  },
  {
    "url": "JsPlatform/Extensions/skeletonanimationicon24.png",
    "revision": "199fea19a90eef2563ffab6735781b79"
  },
  {
    "url": "JsPlatform/Extensions/skeletonboneicon16.png",
    "revision": "56abd8722cf9ad2630437e9818cb0b48"
  },
  {
    "url": "JsPlatform/Extensions/skeletonboneicon24.png",
    "revision": "7f38262dde2c905e9ab40784613597b8"
  },
  {
    "url": "JsPlatform/Extensions/skeletonicon.png",
    "revision": "efa67f25d33aa92c71f65f981de2b731"
  },
  {
    "url": "JsPlatform/Extensions/skeletonicon16.png",
    "revision": "2c0e2dc3937be29ebdbd3b61fc65adbb"
  },
  {
    "url": "JsPlatform/Extensions/skeletonicon24.png",
    "revision": "912badcc8deb9696556901da03599b7c"
  },
  {
    "url": "JsPlatform/Extensions/skeletonsloticon16.png",
    "revision": "1242cae53ae4ec098adffd96d3cd5366"
  },
  {
    "url": "JsPlatform/Extensions/skeletonsloticon24.png",
    "revision": "9ab3a700db363d2ed8f5161fce8bbd12"
  },
  {
    "url": "JsPlatform/Extensions/take_screenshot16.png",
    "revision": "c15e94fe6ec4fd17333e2a08ee178d8a"
  },
  {
    "url": "JsPlatform/Extensions/take_screenshot24.png",
    "revision": "c572975adb32b67cde87d0c2700ef0b1"
  },
  {
    "url": "JsPlatform/Extensions/take_screenshot32.png",
    "revision": "f26ef7d8e895897a44e79a21ea2c55b5"
  },
  {
    "url": "JsPlatform/Extensions/tile_map16.png",
    "revision": "3e1bec09136dd7fd96dc5eda1baa25c2"
  },
  {
    "url": "JsPlatform/Extensions/tile_map24.png",
    "revision": "dd02bd7ed2eafd94211c0a6331335e45"
  },
  {
    "url": "JsPlatform/Extensions/tile_map32.png",
    "revision": "b9301d4a4fd4b36e3186a54522bd4543"
  },
  {
    "url": "JsPlatform/Extensions/tween_behavior16.png",
    "revision": "f34bea7329dce322c253c7b0a7c77a9d"
  },
  {
    "url": "JsPlatform/Extensions/tween_behavior24.png",
    "revision": "54b7e7f2f4905e20ce8d527d531ff0b8"
  },
  {
    "url": "JsPlatform/Extensions/tween_behavior32.png",
    "revision": "b5735f784999561808e579c0183104f4"
  },
  {
    "url": "JsPlatform/Extensions/vibration_pattern_start16.png",
    "revision": "1afa1dc863fb3d7d21cbc78966ce19ab"
  },
  {
    "url": "JsPlatform/Extensions/vibration_pattern_start24.png",
    "revision": "8343e00e8ed063475cba2bbb63cbd24b"
  },
  {
    "url": "JsPlatform/Extensions/vibration_pattern_start32.png",
    "revision": "b3820d4e193be776c1b3707390ff31fa"
  },
  {
    "url": "JsPlatform/Extensions/vibration_start16.png",
    "revision": "2d9b331c5bdcb5da2cfc26abf61d4215"
  },
  {
    "url": "JsPlatform/Extensions/vibration_start24.png",
    "revision": "69912e622d0fe3570d34d28bd6f1cb41"
  },
  {
    "url": "JsPlatform/Extensions/vibration_start32.png",
    "revision": "ba185994abf87534caa80e4d9f3441d8"
  },
  {
    "url": "JsPlatform/Extensions/vibration_stop16.png",
    "revision": "501eb6a4e7feea70bc7f2c6d327a7e76"
  },
  {
    "url": "JsPlatform/Extensions/vibration_stop24.png",
    "revision": "47ac88288dec77714b36de8be739596c"
  },
  {
    "url": "JsPlatform/Extensions/vibration_stop32.png",
    "revision": "fe339f6ba9389aabaa482db9817d5a2f"
  },
  {
    "url": "JsPlatform/Extensions/videoicon16.png",
    "revision": "59b1bb798789bb1a7e0543db99be0fbf"
  },
  {
    "url": "JsPlatform/Extensions/videoicon24.png",
    "revision": "8ed7665f78c8d421300e87d3b67b7e2f"
  },
  {
    "url": "JsPlatform/Extensions/videoicon32.png",
    "revision": "61cbc8aaa8f6a47ad82ce90e5a5cafa9"
  },
  {
    "url": "JsPlatform/Extensions/weld_joint16.png",
    "revision": "672ad3e304a7dbad876b63938128d774"
  },
  {
    "url": "JsPlatform/Extensions/weld_joint24.png",
    "revision": "71b30792db181e1ed5b439677a1063f6"
  },
  {
    "url": "JsPlatform/Extensions/weld_joint32.png",
    "revision": "351fc6391c2e917d1cb8075edf9ec4b8"
  },
  {
    "url": "JsPlatform/Extensions/wheel_joint16.png",
    "revision": "2dd81300288af9900a326ce8ba45019a"
  },
  {
    "url": "JsPlatform/Extensions/wheel_joint24.png",
    "revision": "dcd2eedab61ffd0b817a6bc74859a32f"
  },
  {
    "url": "JsPlatform/Extensions/wheel_joint32.png",
    "revision": "9ebe38542336f547019cc923a5b62eb4"
  },
  {
    "url": "JsPlatform/Extensions/yarn16.png",
    "revision": "8c911f07c94beb39138e1c82014db5bd"
  },
  {
    "url": "JsPlatform/Extensions/yarn24.png",
    "revision": "cfd0b450ea2af1fedeb6b1c18d4ba363"
  },
  {
    "url": "JsPlatform/Extensions/yarn32.png",
    "revision": "a76189a7f10b4a85b1b42a7b2d04f4ea"
  },
  {
    "url": "JsPlatform/icon32.png",
    "revision": "e8f76b7d5f549b50b939477ad962cc7a"
  },
  {
    "url": "res/1downarrow.png",
    "revision": "71bfb62c48461a7403cf2b208545efeb"
  },
  {
    "url": "res/1downarrow1.png",
    "revision": "4771fa1519643cbae93e772d04da8f29"
  },
  {
    "url": "res/1leftarrow.png",
    "revision": "09f70bb4d67633654491ce9bf2376aad"
  },
  {
    "url": "res/1rightarrow.png",
    "revision": "bdba2ef50f3f0b48b8313da72eb45cb6"
  },
  {
    "url": "res/2leftarrow.png",
    "revision": "31981af3e8d57accb7a45b496e94863c"
  },
  {
    "url": "res/2rightarrow.png",
    "revision": "7095550c42d083dcd47b20d3b394ac92"
  },
  {
    "url": "res/2uparrow.png",
    "revision": "d70b2f40b01ec449eceb72c2cb940233"
  },
  {
    "url": "res/3downarrow.png",
    "revision": "ee9163a1b10ea54bb2819b32a6118691"
  },
  {
    "url": "res/action24.png",
    "revision": "9baf68757847f208e6785d52156daf5a"
  },
  {
    "url": "res/actionicon.png",
    "revision": "9e633576637d4eb0d3fd7e41b0d01ef7"
  },
  {
    "url": "res/actions/add.png",
    "revision": "975f2ad05604d9b6d6058116e0d92d60"
  },
  {
    "url": "res/actions/add24.png",
    "revision": "625265cdb597861ec67f97613b5be6dd"
  },
  {
    "url": "res/actions/ajouthasard.png",
    "revision": "c52db0a19328d003216fc9a198106c13"
  },
  {
    "url": "res/actions/ajouthasard24.png",
    "revision": "7970a7c762377a6d2bbdcaf9e7f277e0"
  },
  {
    "url": "res/actions/animation.png",
    "revision": "5e8f0e112ce0fbf4fce35db3752a869d"
  },
  {
    "url": "res/actions/animation24.png",
    "revision": "7ff5a668196c5980e508aaa7f38ced1a"
  },
  {
    "url": "res/actions/arc.png",
    "revision": "cba553356aa2d9f37897e7ffaa9add9f"
  },
  {
    "url": "res/actions/arc24.png",
    "revision": "85c916e5dde32884bddb300c7a80583c"
  },
  {
    "url": "res/actions/arreter.png",
    "revision": "5e50712be2abc6293f287e83d35cafbb"
  },
  {
    "url": "res/actions/arreter24.png",
    "revision": "e4408147f8e69a602dfa9dc8b0f6a339"
  },
  {
    "url": "res/actions/background.png",
    "revision": "dfbe838d348fbaaef1e4cb73cdaf7e46"
  },
  {
    "url": "res/actions/background24.png",
    "revision": "2f7d587119fb1e51b6ea66f9f9c1307f"
  },
  {
    "url": "res/actions/beginFillPath.png",
    "revision": "5833d5faf60eb001767a6ce9a6edc360"
  },
  {
    "url": "res/actions/beginFillPath24.png",
    "revision": "e2624edaa02a3648acb7708abe049705"
  },
  {
    "url": "res/actions/bezierCurve.png",
    "revision": "c6f7e42061e21ab23f5462d0427f8433"
  },
  {
    "url": "res/actions/bezierCurve24.png",
    "revision": "c1b01421be1bf0abf5c29fd4c1796914"
  },
  {
    "url": "res/actions/bold.png",
    "revision": "dbb999cc0f483a1562f9c7029cea0852"
  },
  {
    "url": "res/actions/bold16.png",
    "revision": "bcf6a76a70db732d12122e3ba89da5b3"
  },
  {
    "url": "res/actions/bug32.png",
    "revision": "499d5845fcb75cb9dc0aa97998491f04"
  },
  {
    "url": "res/actions/camera.png",
    "revision": "8f04f1099cad9295695b31a893b88212"
  },
  {
    "url": "res/actions/camera24.png",
    "revision": "b7b4d2518b26f3e48936d1a37d2a85c3"
  },
  {
    "url": "res/actions/characterSize.png",
    "revision": "c0411c2f523fbc3f8459acdaa96500b7"
  },
  {
    "url": "res/actions/characterSize24.png",
    "revision": "185f66686a470ca4de32fa9796349b83"
  },
  {
    "url": "res/actions/circle.png",
    "revision": "64450b8d0370d71a4c17aeae2768d64b"
  },
  {
    "url": "res/actions/circle24.png",
    "revision": "c1730fd5d1dd81fe0eafd9b8be0f998e"
  },
  {
    "url": "res/actions/closePath.png",
    "revision": "517e60761324ccc747abf55c4dc28866"
  },
  {
    "url": "res/actions/closePath24.png",
    "revision": "8c1bff14540ea8e4e70f3e6e2f8f075a"
  },
  {
    "url": "res/actions/color.png",
    "revision": "dfbe838d348fbaaef1e4cb73cdaf7e46"
  },
  {
    "url": "res/actions/color24.png",
    "revision": "2f7d587119fb1e51b6ea66f9f9c1307f"
  },
  {
    "url": "res/actions/controle.png",
    "revision": "12065d1dcaf144136887845a3c1803a3"
  },
  {
    "url": "res/actions/copy24.png",
    "revision": "20412b80526c176d941e9212b03656e7"
  },
  {
    "url": "res/actions/copyicon.png",
    "revision": "b2d6efb0526c07420a9a5f0a797152a0"
  },
  {
    "url": "res/actions/create.png",
    "revision": "0fa524c38d1026ed2fc2463a40c4b08c"
  },
  {
    "url": "res/actions/create24.png",
    "revision": "3d1e1b35a61d1d21ae46fa987b6575ea"
  },
  {
    "url": "res/actions/delete.png",
    "revision": "3bfe54d421deb1b60d98b1915a2247cc"
  },
  {
    "url": "res/actions/delete24.png",
    "revision": "c2693e944c749a485c3e99958bb040ea"
  },
  {
    "url": "res/actions/depth.png",
    "revision": "3050a2e2c5bb9f5b01510de6608775c2"
  },
  {
    "url": "res/actions/depth24.png",
    "revision": "0ebb098a91ede30730c128e47b41aa2d"
  },
  {
    "url": "res/actions/direction_black.png",
    "revision": "ca480443bcafc715aa541df80049bbf0"
  },
  {
    "url": "res/actions/direction24_black.png",
    "revision": "7c00400ab9165471745103500086a80c"
  },
  {
    "url": "res/actions/doMove.png",
    "revision": "462a98268dd67e1fa372538fb53ed653"
  },
  {
    "url": "res/actions/doMove24.png",
    "revision": "4fd9f8c84aa958a2daae80e4874243c8"
  },
  {
    "url": "res/actions/duplicate.png",
    "revision": "16c5b2776aa26173c66e566f5ef1c43c"
  },
  {
    "url": "res/actions/duplicate24.png",
    "revision": "e19681474d9c31ed7d0337f67f293f4a"
  },
  {
    "url": "res/actions/ecarter.png",
    "revision": "1852edf3137ad5d04b51bbf75bf5a072"
  },
  {
    "url": "res/actions/ecarter24.png",
    "revision": "e29bd4e593e4d97ab33d92f153ed16ea"
  },
  {
    "url": "res/actions/effect.png",
    "revision": "00695e34ca8681dfb336b708e1127269"
  },
  {
    "url": "res/actions/effect24.png",
    "revision": "dd622b34c34d0ab9be0033aa1b56b0c9"
  },
  {
    "url": "res/actions/ellipse.png",
    "revision": "0fc90e29c9bac20ba5d81850247920f0"
  },
  {
    "url": "res/actions/ellipse24.png",
    "revision": "e06045e4e91c32cd7ff1a7fbee3b3dda"
  },
  {
    "url": "res/actions/endFillPath.png",
    "revision": "429a65799e6d4eaaa4c8284655370d82"
  },
  {
    "url": "res/actions/endFillPath24.png",
    "revision": "33135e0dae73d0577770ad69448fe435"
  },
  {
    "url": "res/actions/fichier.png",
    "revision": "b7680366d1c5eb20b434c9984bac264d"
  },
  {
    "url": "res/actions/fichier24.png",
    "revision": "77df2b0c965ca6110379bd03b36388a9"
  },
  {
    "url": "res/actions/flipX.png",
    "revision": "324b33facbb5c6e9602797614c8cee66"
  },
  {
    "url": "res/actions/flipX24.png",
    "revision": "37f623e31d57da4bd149548f062536c8"
  },
  {
    "url": "res/actions/flipY.png",
    "revision": "e52b332a1cbc5e421f9632aef17207ad"
  },
  {
    "url": "res/actions/flipY24.png",
    "revision": "f15a4a7d538ec9a2742aea8fc21e28c8"
  },
  {
    "url": "res/actions/font.png",
    "revision": "12c44d71ddb651d0265731dab95d5da5"
  },
  {
    "url": "res/actions/font24.png",
    "revision": "4e2b9ea29d0c91370c9292b810a58a9c"
  },
  {
    "url": "res/actions/force.png",
    "revision": "96c496c330e6f97ec4ddc8b896c347f6"
  },
  {
    "url": "res/actions/force24.png",
    "revision": "747961219afeb1e583bdcd720dd77070"
  },
  {
    "url": "res/actions/forceTourne.png",
    "revision": "9eed74b77e58d99924923f762c67c427"
  },
  {
    "url": "res/actions/forceTourne24.png",
    "revision": "7745686f93f4195d2d8c6084df78b439"
  },
  {
    "url": "res/actions/forceVers.png",
    "revision": "80195e61c052b0ab84c5644a77189955"
  },
  {
    "url": "res/actions/forceVers24.png",
    "revision": "0d1292a46e695e99fbddafdacb509a0f"
  },
  {
    "url": "res/actions/foreach.png",
    "revision": "7c2b2f981c44a0b1479ee8546d5e1fbb"
  },
  {
    "url": "res/actions/foreach24.png",
    "revision": "b7a3b8071751fedbe0f62dda80b5f3d1"
  },
  {
    "url": "res/actions/fullscreen.png",
    "revision": "387251d47aafb65113494167f3e678fc"
  },
  {
    "url": "res/actions/fullscreen24.png",
    "revision": "2f8a62682b605f0cc33c06b0ff900688"
  },
  {
    "url": "res/actions/function.png",
    "revision": "6fe36f253117810e2e8bd4fe27c98b80"
  },
  {
    "url": "res/actions/function24.png",
    "revision": "aa73549f926c3f66d51383cc80eb5092"
  },
  {
    "url": "res/actions/goscene.png",
    "revision": "3cb26d60b35e13313ee7893e1af04f89"
  },
  {
    "url": "res/actions/goscene24.png",
    "revision": "9b9e9a3f2040e5e62871987c526e3d6b"
  },
  {
    "url": "res/actions/gui.png",
    "revision": "baa389425def6992c0d760c961ca6438"
  },
  {
    "url": "res/actions/italic.png",
    "revision": "df84bd78c2f920dcd3379e5ca68b64b6"
  },
  {
    "url": "res/actions/italic16.png",
    "revision": "e5bc0a5b49e773c14076b65a1c74adfa"
  },
  {
    "url": "res/actions/joystick.png",
    "revision": "c605773045539d36acc7423ec8aed4d5"
  },
  {
    "url": "res/actions/joystick24.png",
    "revision": "b592226c74f084de27dda2bff28bdeda"
  },
  {
    "url": "res/actions/launchFile.png",
    "revision": "11ebf32f8a4260a37c9eb73f8c415ecf"
  },
  {
    "url": "res/actions/launchFile24.png",
    "revision": "0a880e334c4fe89a5a079d4cce49bd10"
  },
  {
    "url": "res/actions/layer.png",
    "revision": "d9c167f270ae0563d31de9ddf14b9f73"
  },
  {
    "url": "res/actions/layer24.png",
    "revision": "5391088fcef4b0530468f7f2fc31c0e0"
  },
  {
    "url": "res/actions/line.png",
    "revision": "059035fef0ee46ba01771a95a9c15fa0"
  },
  {
    "url": "res/actions/line24.png",
    "revision": "df5100e2ed12ef5751e2d8baef7be98c"
  },
  {
    "url": "res/actions/mouse.png",
    "revision": "ede2269bfd352f099ad967c452f07ab4"
  },
  {
    "url": "res/actions/mouse24.png",
    "revision": "6f30399757ca4cf4c5744e33139138f3"
  },
  {
    "url": "res/actions/msgbox.png",
    "revision": "e109e19d30248b2296c0227bb8c7ff6c"
  },
  {
    "url": "res/actions/msgbox24.png",
    "revision": "96c650f7d4bf54d257374be619af2b00"
  },
  {
    "url": "res/actions/music.png",
    "revision": "78478f6687ce29bbfccf97cd4299bc73"
  },
  {
    "url": "res/actions/music24.png",
    "revision": "86a76b255dc94a6fca3888de1823cb8b"
  },
  {
    "url": "res/actions/musicpaused.png",
    "revision": "98a4be49636a7ed98d0d6d2fcb748af8"
  },
  {
    "url": "res/actions/musicpaused24.png",
    "revision": "25532553379802404a32c2e0b6baa684"
  },
  {
    "url": "res/actions/musicplaying.png",
    "revision": "710f9e20ac9593fd4da1eb3f7183c3e6"
  },
  {
    "url": "res/actions/musicplaying24.png",
    "revision": "dc3488ea88c204e21b3bf6319cc3b391"
  },
  {
    "url": "res/actions/musicstopped.png",
    "revision": "0ee418d793fc40304cfe7255e30ebbf0"
  },
  {
    "url": "res/actions/musicstopped24.png",
    "revision": "d7af44504ae4feb1022a0169a5d8bdcb"
  },
  {
    "url": "res/actions/musicVolume.png",
    "revision": "e7c56621003f7e17bc13dde8fb911c67"
  },
  {
    "url": "res/actions/musicVolume24.png",
    "revision": "061b23b24a9f067fbd2e4518519d0e5c"
  },
  {
    "url": "res/actions/net.png",
    "revision": "b1ad174a06167c0860f23196dda298ba"
  },
  {
    "url": "res/actions/net24.png",
    "revision": "a0fd5e4f3e17accf04a08374ea655743"
  },
  {
    "url": "res/actions/opacity.png",
    "revision": "9b722cff94c44b2edb972ed1b0e5a093"
  },
  {
    "url": "res/actions/opacity24.png",
    "revision": "95a6f4d91d2df659939df4e9892123cf"
  },
  {
    "url": "res/actions/openfile.png",
    "revision": "13752394189b24216d82268376e4ef76"
  },
  {
    "url": "res/actions/openfile24.png",
    "revision": "d3cc693ad37f14c83f2f54b942beea80"
  },
  {
    "url": "res/actions/outlineSize_black.png",
    "revision": "e08ea76606a2ccb4e50b74ceefcf1095"
  },
  {
    "url": "res/actions/outlineSize24_black.png",
    "revision": "16f76086f2f91d3a8138d5f27493100a"
  },
  {
    "url": "res/actions/pauseTimer.png",
    "revision": "c1338af233a03749960517ceb80f177f"
  },
  {
    "url": "res/actions/pauseTimer24.png",
    "revision": "967011e49b3848ab2d423d3b30a49c34"
  },
  {
    "url": "res/actions/planicon.png",
    "revision": "7f091f0a891a1348dd3b77e24f89da9f"
  },
  {
    "url": "res/actions/planicon24.png",
    "revision": "41e1897a369e9307b75def1b908020e1"
  },
  {
    "url": "res/actions/popScene.png",
    "revision": "b4f99a8a523bb893083cbbafc6bef9fe"
  },
  {
    "url": "res/actions/popScene24.png",
    "revision": "2a95464e4f263725843d6031bf337dee"
  },
  {
    "url": "res/actions/position_black.png",
    "revision": "1e17f2e404d219aa2d5ba2366f54b143"
  },
  {
    "url": "res/actions/position24_black.png",
    "revision": "db2805b2a6a5700dd3cc6f9b309de7f4"
  },
  {
    "url": "res/actions/positionAutour.png",
    "revision": "b93eb635fc967de492e06c0709b98b86"
  },
  {
    "url": "res/actions/positionAutour24.png",
    "revision": "9d3b9706b57d99e5bbab0af98e7bf9b1"
  },
  {
    "url": "res/actions/pushScene.png",
    "revision": "d8963663704e77e0a043060551bc59b9"
  },
  {
    "url": "res/actions/pushScene24.png",
    "revision": "73d7e9f9a52663be9854d502926f7361"
  },
  {
    "url": "res/actions/quadraticCurve.png",
    "revision": "6360576769919df6788a0c7763d24180"
  },
  {
    "url": "res/actions/quadraticCurve24.png",
    "revision": "2f54c5329c4f9473990cbbcbe68b505c"
  },
  {
    "url": "res/actions/quit.png",
    "revision": "b013cd5271095812d29b0bb88cdc1233"
  },
  {
    "url": "res/actions/quit24.png",
    "revision": "84809845261f138f81d5e124fda06437"
  },
  {
    "url": "res/actions/rectangle.png",
    "revision": "289a483dd4924f462455d5b8536fcfd2"
  },
  {
    "url": "res/actions/rectangle24.png",
    "revision": "fdfb6c29ec7a3f6f5bb6075ffc6dcc8d"
  },
  {
    "url": "res/actions/repeat.png",
    "revision": "f07e31540d0021b778e0f91e010f8b82"
  },
  {
    "url": "res/actions/repeat24.png",
    "revision": "4d84789ab30a8097de1045807cb9ad11"
  },
  {
    "url": "res/actions/replaceScene.png",
    "revision": "33d7a76000637e112468d0304ea962d7"
  },
  {
    "url": "res/actions/replaceScene24.png",
    "revision": "f5710709f71e967eda272eb3de1a6b2f"
  },
  {
    "url": "res/actions/rotate_black.png",
    "revision": "20697a072636967a7a1d0603b60494ef"
  },
  {
    "url": "res/actions/rotate24_black.png",
    "revision": "6b4a746107bbe868913389f79c7019fc"
  },
  {
    "url": "res/actions/rotateCamera.png",
    "revision": "842f5953eced84a0a758d00524dc5353"
  },
  {
    "url": "res/actions/rotateCamera24.png",
    "revision": "fdea861d59fae466b33fc43110e532b1"
  },
  {
    "url": "res/actions/roundedRectangle.png",
    "revision": "728a35cc18d213f424e15130feba78ce"
  },
  {
    "url": "res/actions/roundedRectangle24.png",
    "revision": "09187bbe1ff8bfef06ac5cc384ec41f1"
  },
  {
    "url": "res/actions/scale_black.png",
    "revision": "035bc6a50e1013ebea4c3bd8b6501c98"
  },
  {
    "url": "res/actions/scale24_black.png",
    "revision": "2ea038b0566203f872cc0ed5f30c8505"
  },
  {
    "url": "res/actions/scaleHeight_black.png",
    "revision": "f6c86bb16f749307c1d480fb1da25733"
  },
  {
    "url": "res/actions/scaleHeight24_black.png",
    "revision": "02aefcfb2043d371e8cd38b3aabdc418"
  },
  {
    "url": "res/actions/scaleWidth_black.png",
    "revision": "dcc1d2fd6875e6698953817bed000898"
  },
  {
    "url": "res/actions/scaleWidth24_black.png",
    "revision": "d04586f947b028531ded2ad2e9b37ee3"
  },
  {
    "url": "res/actions/scene.png",
    "revision": "f60816b8a44dc9d622d2248f98ae6b06"
  },
  {
    "url": "res/actions/son.png",
    "revision": "671fb2d7f17816662308314fb1f1e73f"
  },
  {
    "url": "res/actions/son24.png",
    "revision": "6c98dbf0b4186e584b265a456f316fba"
  },
  {
    "url": "res/actions/sonpaused.png",
    "revision": "792acb8f09e2ebc00b54dc5a0128b7f7"
  },
  {
    "url": "res/actions/sonpaused24.png",
    "revision": "82880cdaf3727dfdc74d71b6e18f917d"
  },
  {
    "url": "res/actions/sonplaying.png",
    "revision": "f1ba464333f7ea39d44fe3d24f9de5c1"
  },
  {
    "url": "res/actions/sonplaying24.png",
    "revision": "e59db84cb9d24adc126141b0c40b8b55"
  },
  {
    "url": "res/actions/sonstopped.png",
    "revision": "536312ab04f77ae39402607aa31fcdaf"
  },
  {
    "url": "res/actions/sonstopped24.png",
    "revision": "c5bc4e53a9d0616c7663f3c5a3912939"
  },
  {
    "url": "res/actions/sonVolume.png",
    "revision": "dc13bad68d95b6db6332120c9d97cb14"
  },
  {
    "url": "res/actions/sonVolume24.png",
    "revision": "cfe85f2004ef82e3cd3a0718299b5f3d"
  },
  {
    "url": "res/actions/sprite.png",
    "revision": "fe9517294fb54602ea27ed0ac111d4cf"
  },
  {
    "url": "res/actions/sprite24.png",
    "revision": "92285b082605bd5ae24d34e6518d93a4"
  },
  {
    "url": "res/actions/star.png",
    "revision": "984c12f0d341540beac11b29b2a51b02"
  },
  {
    "url": "res/actions/star24.png",
    "revision": "1ee723d0626dfb0e70dcae5dd379629e"
  },
  {
    "url": "res/actions/text_black.png",
    "revision": "94d24f9638f19daabf091fba9f89736a"
  },
  {
    "url": "res/actions/text24_black.png",
    "revision": "e96112f969369c7c7639d619b7eccb7a"
  },
  {
    "url": "res/actions/textAlign.png",
    "revision": "7946a9c0da19a05fd9a5b7f7a221d57d"
  },
  {
    "url": "res/actions/textAlign24.png",
    "revision": "024cd50205fbde18ee5507ac1afdedb8"
  },
  {
    "url": "res/actions/texte.png",
    "revision": "2e57e5b8751712c9687fe10491cce3c6"
  },
  {
    "url": "res/actions/texte24.png",
    "revision": "112796705a7a7ce8442eef044fd8196a"
  },
  {
    "url": "res/actions/textenter.png",
    "revision": "7e5c85db5dbb10746cc5f4cfaa407a07"
  },
  {
    "url": "res/actions/textenter24.png",
    "revision": "c64192eb3b86b691655e7ed745e0f53d"
  },
  {
    "url": "res/actions/textGradient.png",
    "revision": "28e85b1aaefcdf5121526cf55af12f30"
  },
  {
    "url": "res/actions/textGradient24.png",
    "revision": "16e22864f4a9eadacfcc43268f699b42"
  },
  {
    "url": "res/actions/textOutline.png",
    "revision": "6bc0c1e5ce217f3a7e820cf12c071960"
  },
  {
    "url": "res/actions/textOutline24.png",
    "revision": "c4ada260c9dd163cc59d5bd5d2c9ef2e"
  },
  {
    "url": "res/actions/textPadding_black.png",
    "revision": "d2e0810eb609480093dbf1f239963a87"
  },
  {
    "url": "res/actions/textPadding24_black.png",
    "revision": "bf43777583b4e59d989b305dd09c63e1"
  },
  {
    "url": "res/actions/textShadow.png",
    "revision": "c24c6017e904fa931cef9bd238effe2b"
  },
  {
    "url": "res/actions/textShadow24.png",
    "revision": "927e1d56c3d7ba6bc22ace78c155de3f"
  },
  {
    "url": "res/actions/time.png",
    "revision": "d2edd6fb1e97693cb755cff73b7385ce"
  },
  {
    "url": "res/actions/time24.png",
    "revision": "2992f07f5fcc8dc6fb7e380bf13decc4"
  },
  {
    "url": "res/actions/timer.png",
    "revision": "b5d3829927415f32e403d9ca7da721bc"
  },
  {
    "url": "res/actions/timer24.png",
    "revision": "530082be48c39e81d38fa9deb121d69f"
  },
  {
    "url": "res/actions/underline.png",
    "revision": "ec99c0ea495a79b7db32251c72b1aa4b"
  },
  {
    "url": "res/actions/underline16.png",
    "revision": "2fbc6bd38ba62d67004c918d3c3ea6c9"
  },
  {
    "url": "res/actions/uneaction.png",
    "revision": "384710ab068fa1b73d5e429213302d54"
  },
  {
    "url": "res/actions/unPauseTimer.png",
    "revision": "8aef7819e6d682818405e968f08b24ec"
  },
  {
    "url": "res/actions/unPauseTimer24.png",
    "revision": "ad0d60fb1199f3a41d9ef9eb6d623d66"
  },
  {
    "url": "res/actions/var.png",
    "revision": "c3fb610d1a02d06d3ebb82a2a34738e9"
  },
  {
    "url": "res/actions/var24.png",
    "revision": "332fca28a09a59792ba528c1df178446"
  },
  {
    "url": "res/actions/visibilite.png",
    "revision": "0f280da863b84ed9f3ddefa06e71ddf6"
  },
  {
    "url": "res/actions/visibilite24.png",
    "revision": "2fba4b123f316722ef77b4468e32b753"
  },
  {
    "url": "res/actions/volume.png",
    "revision": "13da7b7798a8297ba8f9004d8b3d7fc2"
  },
  {
    "url": "res/actions/volume24.png",
    "revision": "e531e2fe7110bfc21ff8b8e017d0e9a5"
  },
  {
    "url": "res/actions/window.png",
    "revision": "4b19b8fdcc75af551e49526a228e22a9"
  },
  {
    "url": "res/actions/window24.png",
    "revision": "955921893d66a1e52b0ef5c7e5d11ad2"
  },
  {
    "url": "res/actions/wordWrap_black.png",
    "revision": "f58edf27a1147781f8631fc7ec4b83bf"
  },
  {
    "url": "res/actions/wordWrap24_black.png",
    "revision": "8a5ae224588a1624c9d8d164e1dc88bb"
  },
  {
    "url": "res/add24.png",
    "revision": "1acd7f0cf59da10308c73f89068bd649"
  },
  {
    "url": "res/addfromimagebanque.png",
    "revision": "b7df1621b95624726f3d6587be4dccb1"
  },
  {
    "url": "res/addFromLibrary24.png",
    "revision": "42d5dc539ca84ec7d48a944f71372207"
  },
  {
    "url": "res/addicon.png",
    "revision": "9fc3c4b63d025f98aed10af25fcbb94d"
  },
  {
    "url": "res/addmore.png",
    "revision": "6fb36bcbd4a9e0d73cf482f45da8e9d6"
  },
  {
    "url": "res/addmore64.png",
    "revision": "3a6b73fd40fbc51b12f58333f6f1fb52"
  },
  {
    "url": "res/addobjet.png",
    "revision": "1f8eed72f5ed164358fdeab96a376734"
  },
  {
    "url": "res/addobjet24.png",
    "revision": "501a878ab99990edb39e6670908ac946"
  },
  {
    "url": "res/addobjetdbg.png",
    "revision": "7eea75e745efe036fd47a6c5e52524e9"
  },
  {
    "url": "res/addpolygon.png",
    "revision": "b8a7d7adc99d73a7647354afeba22c9b"
  },
  {
    "url": "res/addquad.png",
    "revision": "17a699c54343ec11cd36f615b6d1b326"
  },
  {
    "url": "res/addtemplate.png",
    "revision": "361ff2cd124983bff1d53d3e60202672"
  },
  {
    "url": "res/addtemplate24.png",
    "revision": "59b07cd793a48fb289f793f91a2577c6"
  },
  {
    "url": "res/addtemplateicon.png",
    "revision": "67bac73290745cad0c1ad98d2876e798"
  },
  {
    "url": "res/addvargicon.png",
    "revision": "68cfd73d19b4863bfe6d27db1f021406"
  },
  {
    "url": "res/addvaricon.png",
    "revision": "a9c3897644b30b37a856b6a0854701f1"
  },
  {
    "url": "res/addvertice.png",
    "revision": "381e89c28b30d9d135b95ea3bf54a5b5"
  },
  {
    "url": "res/AdvancedXML/AdvancedXML.png",
    "revision": "5077c99717982fc2a6b4759ff718a78d"
  },
  {
    "url": "res/AdvancedXML/AdvancedXML16.png",
    "revision": "1747df3fcab9a497611d6eb6bd3ead18"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLAdd.png",
    "revision": "bb67e9afd2f7e46a1a4910b5feb4dc6a"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLAdd16.png",
    "revision": "52625af2ef169bf89b59db3265b27599"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLOpen.png",
    "revision": "92212d6dd65655c0062ab1bd1be7dc92"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLOpen16.png",
    "revision": "c89b89170a6c2157165bb691aecf8757"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLRef.png",
    "revision": "608dee078cb47e6586ad3d8747c1e129"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLRef16.png",
    "revision": "82f2599b86021f64fef8b2c1bc56d2b4"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLRemove.png",
    "revision": "d1d83f9c58a0ef9a2fde3e38d6a1f6fe"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLRemove16.png",
    "revision": "c1e38ff589760d02033f4e10cbe8a84b"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLSave.png",
    "revision": "e028350d8eb62bd6a219734d1e071a6e"
  },
  {
    "url": "res/AdvancedXML/AdvancedXMLSave16.png",
    "revision": "ad075ec25193d737d8b0c7cd54c8d432"
  },
  {
    "url": "res/animation16.png",
    "revision": "5e8f0e112ce0fbf4fce35db3752a869d"
  },
  {
    "url": "res/back.png",
    "revision": "1554a96258f1dbc57866dbce16907b8f"
  },
  {
    "url": "res/backh.png",
    "revision": "0b410035e363100f7ab8005fc308a12b"
  },
  {
    "url": "res/bas24.png",
    "revision": "897662201ad93e58bf331b00830d3350"
  },
  {
    "url": "res/behavior16.png",
    "revision": "317cf84c7238b23670403c964e1673b4"
  },
  {
    "url": "res/behavior24.png",
    "revision": "11af7e978f73a05fc79d49f83957a7c5"
  },
  {
    "url": "res/behavior64.png",
    "revision": "fb731fdd34f53b344d68834e3fb5c4c7"
  },
  {
    "url": "res/bigbug.png",
    "revision": "ac5029688da75bcff2357b6a7c1cc47c"
  },
  {
    "url": "res/bigextensionbug.png",
    "revision": "d72debc95d538914ec4b7dbfcce256fb"
  },
  {
    "url": "res/blankicon.png",
    "revision": "b42217f3132de385fdac2f9e202c9203"
  },
  {
    "url": "res/bug.png",
    "revision": "abd83a8bd27ad598dc5d1ae8e7ce8aba"
  },
  {
    "url": "res/bug24.png",
    "revision": "c40321c58f6940f2996e25a8ac068236"
  },
  {
    "url": "res/button_cancel.png",
    "revision": "f442de7772093659129d6d74a71305a1"
  },
  {
    "url": "res/button_ok.png",
    "revision": "ca42fd3d9926ce2ea5c8826c8af96098"
  },
  {
    "url": "res/center.png",
    "revision": "63cb4d50452f1f5038164e8355d101db"
  },
  {
    "url": "res/center24.png",
    "revision": "13d973fcce243ed9243b5d79d7fecb3b"
  },
  {
    "url": "res/centerPoint.png",
    "revision": "6e0c2fcb4be291be7970bc1132255a7a"
  },
  {
    "url": "res/close24.png",
    "revision": "d7ccd78ab46827a0259766691df7de85"
  },
  {
    "url": "res/cocoonjslogo.png",
    "revision": "31fda05b53bc67e84ae5141bd5c4dc1b"
  },
  {
    "url": "res/coloricon.png",
    "revision": "dfbe838d348fbaaef1e4cb73cdaf7e46"
  },
  {
    "url": "res/comment.png",
    "revision": "90156bbe6c2a94249ff183366bf5383d"
  },
  {
    "url": "res/commentaire.png",
    "revision": "90156bbe6c2a94249ff183366bf5383d"
  },
  {
    "url": "res/commentaireadd24.png",
    "revision": "be1cba180283c5363415c29e5518435e"
  },
  {
    "url": "res/commentaireaddicon.png",
    "revision": "4333d1125d0ed07af799965ee37b9b42"
  },
  {
    "url": "res/community.png",
    "revision": "bf84c3100b12fd5c5267fb50c59cae3a"
  },
  {
    "url": "res/compilationicon.png",
    "revision": "12065d1dcaf144136887845a3c1803a3"
  },
  {
    "url": "res/compile128.png",
    "revision": "3163c0070e2d3bf4b0005a75289d5372"
  },
  {
    "url": "res/compilicon24.png",
    "revision": "acaad744d4706e341ea1c0b82d2e94bb"
  },
  {
    "url": "res/condition24.png",
    "revision": "ca694c14f3824215e0b01ab831b49349"
  },
  {
    "url": "res/conditionicon.png",
    "revision": "3b51aa1d32cdcd6baedc2d6f20e23b09"
  },
  {
    "url": "res/conditions/add.png",
    "revision": "975f2ad05604d9b6d6058116e0d92d60"
  },
  {
    "url": "res/conditions/add24.png",
    "revision": "625265cdb597861ec67f97613b5be6dd"
  },
  {
    "url": "res/conditions/ajouthasard.png",
    "revision": "c52db0a19328d003216fc9a198106c13"
  },
  {
    "url": "res/conditions/ajouthasard24.png",
    "revision": "7970a7c762377a6d2bbdcaf9e7f277e0"
  },
  {
    "url": "res/conditions/and_black.png",
    "revision": "ed351834652bfae9a57b83231eafc676"
  },
  {
    "url": "res/conditions/and24_black.png",
    "revision": "bd0c283370303597bf0255e6dc84b5a0"
  },
  {
    "url": "res/conditions/angleCamera.png",
    "revision": "842f5953eced84a0a758d00524dc5353"
  },
  {
    "url": "res/conditions/angleCamera24.png",
    "revision": "fdea861d59fae466b33fc43110e532b1"
  },
  {
    "url": "res/conditions/animation.png",
    "revision": "5e8f0e112ce0fbf4fce35db3752a869d"
  },
  {
    "url": "res/conditions/animation24.png",
    "revision": "7ff5a668196c5980e508aaa7f38ced1a"
  },
  {
    "url": "res/conditions/arret.png",
    "revision": "1ee386d8228d996daaa19a9c3f536c6d"
  },
  {
    "url": "res/conditions/arret24.png",
    "revision": "f99fe231d60224bec9c26a7dccb2c4a0"
  },
  {
    "url": "res/conditions/bold.png",
    "revision": "dbb999cc0f483a1562f9c7029cea0852"
  },
  {
    "url": "res/conditions/bold16.png",
    "revision": "bcf6a76a70db732d12122e3ba89da5b3"
  },
  {
    "url": "res/conditions/camera.png",
    "revision": "8f04f1099cad9295695b31a893b88212"
  },
  {
    "url": "res/conditions/camera24.png",
    "revision": "b7b4d2518b26f3e48936d1a37d2a85c3"
  },
  {
    "url": "res/conditions/characterSize.png",
    "revision": "c0411c2f523fbc3f8459acdaa96500b7"
  },
  {
    "url": "res/conditions/characterSize24.png",
    "revision": "185f66686a470ca4de32fa9796349b83"
  },
  {
    "url": "res/conditions/circle.png",
    "revision": "64450b8d0370d71a4c17aeae2768d64b"
  },
  {
    "url": "res/conditions/circle24.png",
    "revision": "c1730fd5d1dd81fe0eafd9b8be0f998e"
  },
  {
    "url": "res/conditions/collision.png",
    "revision": "f7ed3316d68b2a96ff3298f7bdab6032"
  },
  {
    "url": "res/conditions/collision24.png",
    "revision": "66ae74b85894915eac5de9c0e648386a"
  },
  {
    "url": "res/conditions/collisionPoint.png",
    "revision": "7f94c4a1026351b1547adf8bb3437ed0"
  },
  {
    "url": "res/conditions/collisionPoint24.png",
    "revision": "4cc0c154ec0518271dccb18fca4da4d4"
  },
  {
    "url": "res/conditions/controle.png",
    "revision": "12065d1dcaf144136887845a3c1803a3"
  },
  {
    "url": "res/conditions/delete.png",
    "revision": "3bfe54d421deb1b60d98b1915a2247cc"
  },
  {
    "url": "res/conditions/delete24.png",
    "revision": "c2693e944c749a485c3e99958bb040ea"
  },
  {
    "url": "res/conditions/depart.png",
    "revision": "9737715dc2238e2e2f06dd69a442c006"
  },
  {
    "url": "res/conditions/depart24.png",
    "revision": "392cda2fd3680cef70d834a93844479c"
  },
  {
    "url": "res/conditions/depth.png",
    "revision": "3050a2e2c5bb9f5b01510de6608775c2"
  },
  {
    "url": "res/conditions/depth24.png",
    "revision": "0ebb098a91ede30730c128e47b41aa2d"
  },
  {
    "url": "res/conditions/direction_black.png",
    "revision": "ca480443bcafc715aa541df80049bbf0"
  },
  {
    "url": "res/conditions/direction24_black.png",
    "revision": "7c00400ab9165471745103500086a80c"
  },
  {
    "url": "res/conditions/distance.png",
    "revision": "153a318463b4adc9b39c62bc5138885e"
  },
  {
    "url": "res/conditions/distance24.png",
    "revision": "92162ee3bea4a4083578e64c6a0340be"
  },
  {
    "url": "res/conditions/duplicate.png",
    "revision": "16c5b2776aa26173c66e566f5ef1c43c"
  },
  {
    "url": "res/conditions/duplicate24.png",
    "revision": "e19681474d9c31ed7d0337f67f293f4a"
  },
  {
    "url": "res/conditions/ecarter.png",
    "revision": "1852edf3137ad5d04b51bbf75bf5a072"
  },
  {
    "url": "res/conditions/ecarter24.png",
    "revision": "e29bd4e593e4d97ab33d92f153ed16ea"
  },
  {
    "url": "res/conditions/egal_black.png",
    "revision": "0f99d0115b12dba646dc00b026683073"
  },
  {
    "url": "res/conditions/egal24_black.png",
    "revision": "12540e77cb96687819f88996f963c7db"
  },
  {
    "url": "res/conditions/estTourne.png",
    "revision": "2bfdc8eb7a78dae69b543f46d96f592a"
  },
  {
    "url": "res/conditions/estTourne24.png",
    "revision": "7c5e4f2b7f896070dc6d29b51d65a984"
  },
  {
    "url": "res/conditions/fichier.png",
    "revision": "b7680366d1c5eb20b434c9984bac264d"
  },
  {
    "url": "res/conditions/fichier24.png",
    "revision": "77df2b0c965ca6110379bd03b36388a9"
  },
  {
    "url": "res/conditions/font.png",
    "revision": "12c44d71ddb651d0265731dab95d5da5"
  },
  {
    "url": "res/conditions/font24.png",
    "revision": "4e2b9ea29d0c91370c9292b810a58a9c"
  },
  {
    "url": "res/conditions/force.png",
    "revision": "d4aa9c0da3fd8cf3b303faf487f35bc0"
  },
  {
    "url": "res/conditions/force24.png",
    "revision": "87ae745cab6b931a73f1cdcf6a2066cd"
  },
  {
    "url": "res/conditions/foreach.png",
    "revision": "7c2b2f981c44a0b1479ee8546d5e1fbb"
  },
  {
    "url": "res/conditions/foreach24.png",
    "revision": "b7a3b8071751fedbe0f62dda80b5f3d1"
  },
  {
    "url": "res/conditions/italic.png",
    "revision": "df84bd78c2f920dcd3379e5ca68b64b6"
  },
  {
    "url": "res/conditions/italic16.png",
    "revision": "e5bc0a5b49e773c14076b65a1c74adfa"
  },
  {
    "url": "res/conditions/joystick.png",
    "revision": "c605773045539d36acc7423ec8aed4d5"
  },
  {
    "url": "res/conditions/joystick24.png",
    "revision": "b592226c74f084de27dda2bff28bdeda"
  },
  {
    "url": "res/conditions/keyboard.png",
    "revision": "98215340def8ef5e7b00747db8d16919"
  },
  {
    "url": "res/conditions/keyboard24.png",
    "revision": "9e3217a1dde6efddacc13c354ce94ea3"
  },
  {
    "url": "res/conditions/layer.png",
    "revision": "d9c167f270ae0563d31de9ddf14b9f73"
  },
  {
    "url": "res/conditions/layer24.png",
    "revision": "5391088fcef4b0530468f7f2fc31c0e0"
  },
  {
    "url": "res/conditions/line.png",
    "revision": "059035fef0ee46ba01771a95a9c15fa0"
  },
  {
    "url": "res/conditions/line24.png",
    "revision": "df5100e2ed12ef5751e2d8baef7be98c"
  },
  {
    "url": "res/conditions/mouse.png",
    "revision": "ede2269bfd352f099ad967c452f07ab4"
  },
  {
    "url": "res/conditions/mouse24.png",
    "revision": "6f30399757ca4cf4c5744e33139138f3"
  },
  {
    "url": "res/conditions/music.png",
    "revision": "78478f6687ce29bbfccf97cd4299bc73"
  },
  {
    "url": "res/conditions/music24.png",
    "revision": "86a76b255dc94a6fca3888de1823cb8b"
  },
  {
    "url": "res/conditions/musicpaused.png",
    "revision": "98a4be49636a7ed98d0d6d2fcb748af8"
  },
  {
    "url": "res/conditions/musicpaused24.png",
    "revision": "25532553379802404a32c2e0b6baa684"
  },
  {
    "url": "res/conditions/musicplaying.png",
    "revision": "710f9e20ac9593fd4da1eb3f7183c3e6"
  },
  {
    "url": "res/conditions/musicplaying24.png",
    "revision": "dc3488ea88c204e21b3bf6319cc3b391"
  },
  {
    "url": "res/conditions/musicstopped.png",
    "revision": "0ee418d793fc40304cfe7255e30ebbf0"
  },
  {
    "url": "res/conditions/musicstopped24.png",
    "revision": "d7af44504ae4feb1022a0169a5d8bdcb"
  },
  {
    "url": "res/conditions/musicVolume.png",
    "revision": "e7c56621003f7e17bc13dde8fb911c67"
  },
  {
    "url": "res/conditions/musicVolume24.png",
    "revision": "061b23b24a9f067fbd2e4518519d0e5c"
  },
  {
    "url": "res/conditions/nbObjet.png",
    "revision": "5f25e2e14e370a95574b7ad97dd4d9ba"
  },
  {
    "url": "res/conditions/nbObjet24.png",
    "revision": "cb0f57907d0b74e96020f33e4f229751"
  },
  {
    "url": "res/conditions/not_black.png",
    "revision": "d196b7bd4bb44af380e37ab8b1931724"
  },
  {
    "url": "res/conditions/not24_black.png",
    "revision": "1b41a334c92d4c4c84b5e02788f2523b"
  },
  {
    "url": "res/conditions/objet.png",
    "revision": "0fa524c38d1026ed2fc2463a40c4b08c"
  },
  {
    "url": "res/conditions/objet24.png",
    "revision": "3d1e1b35a61d1d21ae46fa987b6575ea"
  },
  {
    "url": "res/conditions/once.png",
    "revision": "34b9d69d5c35398b91b90e5536aa3e51"
  },
  {
    "url": "res/conditions/once24.png",
    "revision": "671b869f52bae330ff97709a074c7d77"
  },
  {
    "url": "res/conditions/opacity.png",
    "revision": "9b722cff94c44b2edb972ed1b0e5a093"
  },
  {
    "url": "res/conditions/opacity24.png",
    "revision": "95a6f4d91d2df659939df4e9892123cf"
  },
  {
    "url": "res/conditions/or_black.png",
    "revision": "6dbe0d4f0d49f9b1f21827191c2f56aa"
  },
  {
    "url": "res/conditions/or24_black.png",
    "revision": "6bc21083061ae9cfeb61a44a61fb9128"
  },
  {
    "url": "res/conditions/outlineSize_black.png",
    "revision": "e08ea76606a2ccb4e50b74ceefcf1095"
  },
  {
    "url": "res/conditions/outlineSize24_black.png",
    "revision": "16f76086f2f91d3a8138d5f27493100a"
  },
  {
    "url": "res/conditions/planicon.png",
    "revision": "7f091f0a891a1348dd3b77e24f89da9f"
  },
  {
    "url": "res/conditions/planicon24.png",
    "revision": "41e1897a369e9307b75def1b908020e1"
  },
  {
    "url": "res/conditions/position_black.png",
    "revision": "1e17f2e404d219aa2d5ba2366f54b143"
  },
  {
    "url": "res/conditions/position24_black.png",
    "revision": "db2805b2a6a5700dd3cc6f9b309de7f4"
  },
  {
    "url": "res/conditions/raycast.png",
    "revision": "3d85a9e94839c479ffd8d0810cf89899"
  },
  {
    "url": "res/conditions/raycast24.png",
    "revision": "d70ee32aab15d0ba6e646cc0dc6d0a49"
  },
  {
    "url": "res/conditions/rectangle.png",
    "revision": "289a483dd4924f462455d5b8536fcfd2"
  },
  {
    "url": "res/conditions/rectangle24.png",
    "revision": "fdfb6c29ec7a3f6f5bb6075ffc6dcc8d"
  },
  {
    "url": "res/conditions/repeat.png",
    "revision": "f07e31540d0021b778e0f91e010f8b82"
  },
  {
    "url": "res/conditions/repeat24.png",
    "revision": "4d84789ab30a8097de1045807cb9ad11"
  },
  {
    "url": "res/conditions/rotate_black.png",
    "revision": "20697a072636967a7a1d0603b60494ef"
  },
  {
    "url": "res/conditions/rotate24_black.png",
    "revision": "6b4a746107bbe868913389f79c7019fc"
  },
  {
    "url": "res/conditions/scale_black.png",
    "revision": "035bc6a50e1013ebea4c3bd8b6501c98"
  },
  {
    "url": "res/conditions/scaleHeight_black.png",
    "revision": "f6c86bb16f749307c1d480fb1da25733"
  },
  {
    "url": "res/conditions/scaleHeight24_black.png",
    "revision": "02aefcfb2043d371e8cd38b3aabdc418"
  },
  {
    "url": "res/conditions/scaleWidth_black.png",
    "revision": "dcc1d2fd6875e6698953817bed000898"
  },
  {
    "url": "res/conditions/scaleWidth24_black.png",
    "revision": "d04586f947b028531ded2ad2e9b37ee3"
  },
  {
    "url": "res/conditions/scene.png",
    "revision": "f60816b8a44dc9d622d2248f98ae6b06"
  },
  {
    "url": "res/conditions/sedirige.png",
    "revision": "55e006022b02c57322405f227d9ce514"
  },
  {
    "url": "res/conditions/sedirige24.png",
    "revision": "f0c40e138fc1e2e0952e8f79927b64d5"
  },
  {
    "url": "res/conditions/son.png",
    "revision": "671fb2d7f17816662308314fb1f1e73f"
  },
  {
    "url": "res/conditions/son24.png",
    "revision": "6c98dbf0b4186e584b265a456f316fba"
  },
  {
    "url": "res/conditions/sonpaused.png",
    "revision": "792acb8f09e2ebc00b54dc5a0128b7f7"
  },
  {
    "url": "res/conditions/sonpaused24.png",
    "revision": "82880cdaf3727dfdc74d71b6e18f917d"
  },
  {
    "url": "res/conditions/sonplaying.png",
    "revision": "f1ba464333f7ea39d44fe3d24f9de5c1"
  },
  {
    "url": "res/conditions/sonplaying24.png",
    "revision": "e59db84cb9d24adc126141b0c40b8b55"
  },
  {
    "url": "res/conditions/sonstopped.png",
    "revision": "536312ab04f77ae39402607aa31fcdaf"
  },
  {
    "url": "res/conditions/sonstopped24.png",
    "revision": "c5bc4e53a9d0616c7663f3c5a3912939"
  },
  {
    "url": "res/conditions/sonVolume.png",
    "revision": "dc13bad68d95b6db6332120c9d97cb14"
  },
  {
    "url": "res/conditions/sonVolume24.png",
    "revision": "cfe85f2004ef82e3cd3a0718299b5f3d"
  },
  {
    "url": "res/conditions/sprite.png",
    "revision": "fe9517294fb54602ea27ed0ac111d4cf"
  },
  {
    "url": "res/conditions/sprite24.png",
    "revision": "92285b082605bd5ae24d34e6518d93a4"
  },
  {
    "url": "res/conditions/surObjet.png",
    "revision": "178023af7992d4e53deeb296056141e0"
  },
  {
    "url": "res/conditions/surObjet24.png",
    "revision": "6a55c1754c03251e8f1e1607d96706ce"
  },
  {
    "url": "res/conditions/text_black.png",
    "revision": "94d24f9638f19daabf091fba9f89736a"
  },
  {
    "url": "res/conditions/text24_black.png",
    "revision": "e96112f969369c7c7639d619b7eccb7a"
  },
  {
    "url": "res/conditions/textAlign.png",
    "revision": "7946a9c0da19a05fd9a5b7f7a221d57d"
  },
  {
    "url": "res/conditions/textAlign24.png",
    "revision": "024cd50205fbde18ee5507ac1afdedb8"
  },
  {
    "url": "res/conditions/textPadding_black.png",
    "revision": "d2e0810eb609480093dbf1f239963a87"
  },
  {
    "url": "res/conditions/textPadding24_black.png",
    "revision": "bf43777583b4e59d989b305dd09c63e1"
  },
  {
    "url": "res/conditions/textShadow.png",
    "revision": "4db97a841cda219122023183098717a6"
  },
  {
    "url": "res/conditions/textShadow24.png",
    "revision": "94583bd418f28980056c6e9a7f961e10"
  },
  {
    "url": "res/conditions/time.png",
    "revision": "d2edd6fb1e97693cb755cff73b7385ce"
  },
  {
    "url": "res/conditions/time24.png",
    "revision": "2992f07f5fcc8dc6fb7e380bf13decc4"
  },
  {
    "url": "res/conditions/timer.png",
    "revision": "b5d3829927415f32e403d9ca7da721bc"
  },
  {
    "url": "res/conditions/timer24.png",
    "revision": "530082be48c39e81d38fa9deb121d69f"
  },
  {
    "url": "res/conditions/timerPaused.png",
    "revision": "c1338af233a03749960517ceb80f177f"
  },
  {
    "url": "res/conditions/timerPaused24.png",
    "revision": "967011e49b3848ab2d423d3b30a49c34"
  },
  {
    "url": "res/conditions/touch.png",
    "revision": "3b6ba133dd438ae7df11f466f3e427a6"
  },
  {
    "url": "res/conditions/touch24.png",
    "revision": "d84e10c02e0175fc682db2dd167af58d"
  },
  {
    "url": "res/conditions/toujours_black.png",
    "revision": "6fa832aeae69b6116a8eb7924d554bf8"
  },
  {
    "url": "res/conditions/toujours24_black.png",
    "revision": "4c20c61c13da576db849b85ea945d675"
  },
  {
    "url": "res/conditions/underline.png",
    "revision": "ec99c0ea495a79b7db32251c72b1aa4b"
  },
  {
    "url": "res/conditions/underline16.png",
    "revision": "2fbc6bd38ba62d67004c918d3c3ea6c9"
  },
  {
    "url": "res/conditions/unecond.png",
    "revision": "54979c217b2a3db51c8a1d7a9d2f58ef"
  },
  {
    "url": "res/conditions/var.png",
    "revision": "c3fb610d1a02d06d3ebb82a2a34738e9"
  },
  {
    "url": "res/conditions/var24.png",
    "revision": "332fca28a09a59792ba528c1df178446"
  },
  {
    "url": "res/conditions/visibilite.png",
    "revision": "0f280da863b84ed9f3ddefa06e71ddf6"
  },
  {
    "url": "res/conditions/visibilite24.png",
    "revision": "2fba4b123f316722ef77b4468e32b753"
  },
  {
    "url": "res/conditions/vitesse.png",
    "revision": "2c1c0dc4cc5c4e03e154a77dd41f810e"
  },
  {
    "url": "res/conditions/vitesse24.png",
    "revision": "c2c83c5784c2c34a4826671a95b12846"
  },
  {
    "url": "res/conditions/volume.png",
    "revision": "13da7b7798a8297ba8f9004d8b3d7fc2"
  },
  {
    "url": "res/conditions/volume24.png",
    "revision": "e531e2fe7110bfc21ff8b8e017d0e9a5"
  },
  {
    "url": "res/conditions/while.png",
    "revision": "62135f97f45044d8cff866735b400c30"
  },
  {
    "url": "res/conditions/while24.png",
    "revision": "2334be1571b99d82609c17a199943e85"
  },
  {
    "url": "res/conditions/wordWrap_black.png",
    "revision": "f58edf27a1147781f8631fc7ec4b83bf"
  },
  {
    "url": "res/conditions/wordWrap24_black.png",
    "revision": "8a5ae224588a1624c9d8d164e1dc88bb"
  },
  {
    "url": "res/console.png",
    "revision": "0ff2715695328f81d8271cbfee4d8b7b"
  },
  {
    "url": "res/contraire.png",
    "revision": "1fb9ead1ad868516fed524cd6a38ca95"
  },
  {
    "url": "res/copy24.png",
    "revision": "20412b80526c176d941e9212b03656e7"
  },
  {
    "url": "res/copyicon.png",
    "revision": "b2d6efb0526c07420a9a5f0a797152a0"
  },
  {
    "url": "res/cppevent48.png",
    "revision": "4086f940d6ea6b1fba596296bb7d27d5"
  },
  {
    "url": "res/cut24.png",
    "revision": "2381a4a92f6d25bdd11be8028bb21e70"
  },
  {
    "url": "res/cuticon.png",
    "revision": "7df0b2dd0ff10f2b500bf76ec1bfd7d7"
  },
  {
    "url": "res/debuggericon.png",
    "revision": "b5cb452f6ba17d02b19edf52a43d4f57"
  },
  {
    "url": "res/defaultMask16.png",
    "revision": "f8b805226daa1faea929777bd52f69e8"
  },
  {
    "url": "res/delete.png",
    "revision": "f45966357508386b33ca4a25697ee1b5"
  },
  {
    "url": "res/delete24.png",
    "revision": "f45966357508386b33ca4a25697ee1b5"
  },
  {
    "url": "res/deleteaction.png",
    "revision": "29bcb43fd2e39535a491b888ce663b93"
  },
  {
    "url": "res/deletecondition.png",
    "revision": "6ead125acf92cfd62d4ff217fc5dae5d"
  },
  {
    "url": "res/deleteicon.png",
    "revision": "bdeda96fe3296e54760af61eb0cb05ff"
  },
  {
    "url": "res/deleteunknown24.png",
    "revision": "9550e5ebf6bc30ef447b19f55c63849f"
  },
  {
    "url": "res/direction.png",
    "revision": "4eb5f149e01fe927dfcd3bcbd01bbd22"
  },
  {
    "url": "res/display16.png",
    "revision": "660a934ebd24f217441cf26d39384eff"
  },
  {
    "url": "res/donateicon.png",
    "revision": "f8a38cfc1d864009b150352c7258f44b"
  },
  {
    "url": "res/down.png",
    "revision": "7549b5fd22cd4c9be7f5833f60336ca3"
  },
  {
    "url": "res/down24.png",
    "revision": "10e21c2bc0b5ca35036b37876b4edc3f"
  },
  {
    "url": "res/downdir.png",
    "revision": "89d10cf9c089a391b339fb492e96f5d5"
  },
  {
    "url": "res/edit24.png",
    "revision": "7d93d96bf80cba4393cf69633071c16f"
  },
  {
    "url": "res/editicon.png",
    "revision": "2abf2431698f60fd75a2cb97636635a1"
  },
  {
    "url": "res/editMask32.png",
    "revision": "fec6d3cd087d3b57981e3e34621c1563"
  },
  {
    "url": "res/editname24.png",
    "revision": "54125ceff70fd8e997eac70e266ab2d7"
  },
  {
    "url": "res/editnom.png",
    "revision": "7977dc7e3529f0f2e9ed94c75c8b6f56"
  },
  {
    "url": "res/editprop24.png",
    "revision": "798f6b10a29adf146536e7d74efe13b7"
  },
  {
    "url": "res/editpropicon.png",
    "revision": "baf37dc8c56e3d98e7d3e5e35d31a7a6"
  },
  {
    "url": "res/error.png",
    "revision": "8642c896d606fd7ab886cd6334657a7e"
  },
  {
    "url": "res/error24.png",
    "revision": "b84be1ea447de9dee0f257632643a8e9"
  },
  {
    "url": "res/error48.png",
    "revision": "b84be1ea447de9dee0f257632643a8e9"
  },
  {
    "url": "res/errorimage.png",
    "revision": "6d2db8d95c84d95f66420b70030f5315"
  },
  {
    "url": "res/eventadd24.png",
    "revision": "05de794bded058e8ecd8f67b555b2d33"
  },
  {
    "url": "res/eventaddicon.png",
    "revision": "941275f5f0ea394bb597ff9021d8adf5"
  },
  {
    "url": "res/eventicon.png",
    "revision": "5b629a3fa15de7afd3ada7801241df4c"
  },
  {
    "url": "res/eventicon24.png",
    "revision": "0ae0ece87da5bba8062beb5d26d2ecab"
  },
  {
    "url": "res/events16.png",
    "revision": "3ccdf3deabda8645e05163fe8515b2b5"
  },
  {
    "url": "res/events24.png",
    "revision": "a6d98352320cd9baeab56d3c0737cc00"
  },
  {
    "url": "res/eventsadd16.png",
    "revision": "5b5c6384aa2fc290193ddbdb872fdd31"
  },
  {
    "url": "res/eventsadd24.png",
    "revision": "e6a639e7eb23ddf427e6484461cbb2a2"
  },
  {
    "url": "res/eventsedit16.png",
    "revision": "04e40e8f627a3269b03c3845872a4acb"
  },
  {
    "url": "res/eventsedit24.png",
    "revision": "6523412bd2c39bc6bf5f69e0c396ac84"
  },
  {
    "url": "res/expressionicon.png",
    "revision": "33f6f31724c316871703dde5197e4384"
  },
  {
    "url": "res/extension24.png",
    "revision": "48376070c687b8a0f311d8c7627ae81e"
  },
  {
    "url": "res/extensiononly16.png",
    "revision": "8121b883ce1316017586a8ea1d07c5f4"
  },
  {
    "url": "res/eye.png",
    "revision": "461daaa84812e5c292330bbc7fc2a508"
  },
  {
    "url": "res/eyeGrey.png",
    "revision": "7f89233daccb386f7a980df343fedfc7"
  },
  {
    "url": "res/fb16.png",
    "revision": "44d3637a0513aef73d99ff486039e6cf"
  },
  {
    "url": "res/fileicon.png",
    "revision": "b7680366d1c5eb20b434c9984bac264d"
  },
  {
    "url": "res/fill16.png",
    "revision": "6eb5d20d438e59e8f7a8ad5d90cce32a"
  },
  {
    "url": "res/find16.png",
    "revision": "2b8ac012257e7033112c332cdd271b4b"
  },
  {
    "url": "res/fold.png",
    "revision": "246832eff20717a1f29c8dad29cf0d5a"
  },
  {
    "url": "res/foldAll24.png",
    "revision": "a55bee2d392ef0bcbe63ee34ccfa6db8"
  },
  {
    "url": "res/folder.png",
    "revision": "3622942da125ed1121ede5569b00c6c7"
  },
  {
    "url": "res/folder40.png",
    "revision": "213e122d810f588c918517f2190090a6"
  },
  {
    "url": "res/foldericon.png",
    "revision": "871fbdf612daace0c3de48de3d4f61e0"
  },
  {
    "url": "res/foreach.png",
    "revision": "7c2b2f981c44a0b1479ee8546d5e1fbb"
  },
  {
    "url": "res/foreach48.png",
    "revision": "046c0fe247daef4dd56d3eed9bae5b6e"
  },
  {
    "url": "res/forumicon.png",
    "revision": "ddd8a049fb59a3bbf39b839fee89eb52"
  },
  {
    "url": "res/forumicon24.png",
    "revision": "dd4f68f61310c1e140790e65cd47dcde"
  },
  {
    "url": "res/fullscreen24.png",
    "revision": "0d12996a30fbe79141a63a59b3740a8a"
  },
  {
    "url": "res/function.png",
    "revision": "6fe36f253117810e2e8bd4fe27c98b80"
  },
  {
    "url": "res/function16.png",
    "revision": "0d3699d8c86fca886bbe10a0945316ad"
  },
  {
    "url": "res/function24.png",
    "revision": "e6bbefe6f90cb632a33ca5b5e5690bd7"
  },
  {
    "url": "res/function32.png",
    "revision": "7cf931469c557e05200a76c8e7fa5438"
  },
  {
    "url": "res/GD-logo-big.png",
    "revision": "480351a5e4cab2b679d144aae50a95af"
  },
  {
    "url": "res/GD-logo-simple.png",
    "revision": "f55f522d039af0340b3a833ad111915f"
  },
  {
    "url": "res/GD-logo.png",
    "revision": "bbc67f04eb3469c427f5afb2098387c6"
  },
  {
    "url": "res/GD-Splashscreen.png",
    "revision": "f1468d857b1554bf84fb9efe180b4238"
  },
  {
    "url": "res/gdfile16.png",
    "revision": "3b756adbb2f4c3416746cd0dd1f8f41a"
  },
  {
    "url": "res/gdFile32.png",
    "revision": "783728cbec8bb64001ed4391fa06ba51"
  },
  {
    "url": "res/github16.png",
    "revision": "0527cc1f227f1ca3b97564fbeb132e18"
  },
  {
    "url": "res/gotoline24.png",
    "revision": "6d845ff7d8e7d3f27f251aabd6bc4481"
  },
  {
    "url": "res/gp16.png",
    "revision": "a2193758d7d76fe2c1896c27ae65247d"
  },
  {
    "url": "res/group24.png",
    "revision": "3622942da125ed1121ede5569b00c6c7"
  },
  {
    "url": "res/groupeobjeticon.png",
    "revision": "8cb4c1cd7c0e9b769b8a39c6bde860be"
  },
  {
    "url": "res/haut24.png",
    "revision": "1de1a243a9689f62f23babda5a77f34a"
  },
  {
    "url": "res/hearticon.png",
    "revision": "9ad4d14826dc173982e046d9fe951aa1"
  },
  {
    "url": "res/helpicon.png",
    "revision": "a6d1f52e98e18eaf3ff2cef1d01328a6"
  },
  {
    "url": "res/helpicon24.png",
    "revision": "264a0855ce0dcc5876a57a8fc1862bf5"
  },
  {
    "url": "res/hero.png",
    "revision": "1f0da262eae7c06a44b3136c29d8f500"
  },
  {
    "url": "res/history_clear16.png",
    "revision": "60b25b1b5dcde26f2fbecdf88c9f6ad5"
  },
  {
    "url": "res/history16.png",
    "revision": "6ef98f3def349391e6f4b77442af9cf8"
  },
  {
    "url": "res/homepage/explore-games.png",
    "revision": "a89aa33fff80f3653604ba5b9cbd0537"
  },
  {
    "url": "res/homepage/get-started.png",
    "revision": "d8e5bb77be0f724116288c7fe38345e8"
  },
  {
    "url": "res/homepage/start-building.png",
    "revision": "a082edb98d56501342c391e595117fa6"
  },
  {
    "url": "res/icon128.png",
    "revision": "ff60f4c1635eae018660e95e6b56264e"
  },
  {
    "url": "res/icon128linux.png",
    "revision": "1a74fcfb084aa6bc673e7c920989867f"
  },
  {
    "url": "res/icon16.png",
    "revision": "32fcbf239342e4e9eaa3eaed4aab5870"
  },
  {
    "url": "res/icon24.png",
    "revision": "ce57f679b18f0cdcf7660c6af5ee8271"
  },
  {
    "url": "res/icon32.png",
    "revision": "8a2b0abf0dcda0a50d1c7de0e610e731"
  },
  {
    "url": "res/icon32linux.png",
    "revision": "d5e0c276689f07cd51a5bd5d3b497d68"
  },
  {
    "url": "res/icon48.png",
    "revision": "1fab3e8729130da001399863340fe26c"
  },
  {
    "url": "res/icon48linux.png",
    "revision": "c3d90fe0ce53054063e70c46ad6efbd9"
  },
  {
    "url": "res/icon64linux.png",
    "revision": "c9012c81f6e61bc10dee07bc7ce95e62"
  },
  {
    "url": "res/icons_crystal/add16.png",
    "revision": "9fc3c4b63d025f98aed10af25fcbb94d"
  },
  {
    "url": "res/icons_crystal/down16.png",
    "revision": "7549b5fd22cd4c9be7f5833f60336ca3"
  },
  {
    "url": "res/icons_crystal/events24.png",
    "revision": "a6d98352320cd9baeab56d3c0737cc00"
  },
  {
    "url": "res/icons_crystal/group24.png",
    "revision": "ba4fde731d39768e51b9ce640b25f6c7"
  },
  {
    "url": "res/icons_crystal/home16.png",
    "revision": "5b09d4acf904a5f4f419fef4ee4ace86"
  },
  {
    "url": "res/icons_crystal/layer16.png",
    "revision": "d9c167f270ae0563d31de9ddf14b9f73"
  },
  {
    "url": "res/icons_crystal/left16.png",
    "revision": "9515ec0da53a8ccd07e404a67e8fcce8"
  },
  {
    "url": "res/icons_crystal/object16.png",
    "revision": "0fa524c38d1026ed2fc2463a40c4b08c"
  },
  {
    "url": "res/icons_crystal/object24.png",
    "revision": "3d1e1b35a61d1d21ae46fa987b6575ea"
  },
  {
    "url": "res/icons_crystal/project16.png",
    "revision": "89d134a958e46277208cc01d93ff91e8"
  },
  {
    "url": "res/icons_crystal/right16.png",
    "revision": "80162c310d3471069a87e710421ecb14"
  },
  {
    "url": "res/icons_crystal/save_all16.png",
    "revision": "3d31d2cf31cd70a014283943cf01b109"
  },
  {
    "url": "res/icons_crystal/save16.png",
    "revision": "fd16be9c425c6dabef206ba53666f30c"
  },
  {
    "url": "res/icons_crystal/saveas16.png",
    "revision": "07c60f859a0e0187bdec112d8c12e79e"
  },
  {
    "url": "res/icons_crystal/site16.png",
    "revision": "0083f72e2d4995b4f61f9cee5fa44213"
  },
  {
    "url": "res/icons_crystal/up16.png",
    "revision": "0b410035e363100f7ab8005fc308a12b"
  },
  {
    "url": "res/icons_crystal/var16.png",
    "revision": "c3fb610d1a02d06d3ebb82a2a34738e9"
  },
  {
    "url": "res/icons_default/add_event16.png",
    "revision": "e315c9d1a920ba0840c614c3ec57488b"
  },
  {
    "url": "res/icons_default/add_subevent16.png",
    "revision": "95f966980d4ae5f3db972d2db46e32c4"
  },
  {
    "url": "res/icons_default/add16.png",
    "revision": "e6a64300ecf74df68d1fbbb9a6f9adfa"
  },
  {
    "url": "res/icons_default/add24.png",
    "revision": "3f9ecd3eb18262b920a2808bdc99fc7f"
  },
  {
    "url": "res/icons_default/close16.png",
    "revision": "df01faeac2d0ab18fb1497da64fee88e"
  },
  {
    "url": "res/icons_default/community24.png",
    "revision": "56f5b5992af59516e763d5b111cdb6e6"
  },
  {
    "url": "res/icons_default/copy16.png",
    "revision": "eefa0a2af667237fc7e9ed528c121586"
  },
  {
    "url": "res/icons_default/cut16.png",
    "revision": "01e7f9675704d73c0638fc16bcf96073"
  },
  {
    "url": "res/icons_default/delete16.png",
    "revision": "1666d8ccc50595679f099f38e9009fe4"
  },
  {
    "url": "res/icons_default/down16.png",
    "revision": "b4f99a8a523bb893083cbbafc6bef9fe"
  },
  {
    "url": "res/icons_default/edit16.png",
    "revision": "24f86e8cc48317d3ff5a4aedaf037d3a"
  },
  {
    "url": "res/icons_default/editname16.png",
    "revision": "ae303dc3cd4a8179f62cd49895ddbec9"
  },
  {
    "url": "res/icons_default/events16.png",
    "revision": "a84580b63d54821d48135e6c6c85dd6d"
  },
  {
    "url": "res/icons_default/events24.png",
    "revision": "b635ea26c9ec242584646f814426917b"
  },
  {
    "url": "res/icons_default/extensions16.png",
    "revision": "46cc33ec08be712482bc3962a3364bdb"
  },
  {
    "url": "res/icons_default/external_layout16.png",
    "revision": "111ca53a1448dd4e0f95069969dfc063"
  },
  {
    "url": "res/icons_default/find16.png",
    "revision": "5d05a2587dc1f892647ccb8f07dd5fac"
  },
  {
    "url": "res/icons_default/gettingStarted24.png",
    "revision": "b00b64f1e70b9bbfd12411336633a1a7"
  },
  {
    "url": "res/icons_default/group24.png",
    "revision": "f5cd0dac8a874ac64629464770c578fe"
  },
  {
    "url": "res/icons_default/help16.png",
    "revision": "6274001999b1efd1418a22f1490c3bcf"
  },
  {
    "url": "res/icons_default/home16.png",
    "revision": "39190454204d47d4f1952eeeaeadb601"
  },
  {
    "url": "res/icons_default/image16.png",
    "revision": "dbe65b4db5935b3525b048a949136e39"
  },
  {
    "url": "res/icons_default/layer16.png",
    "revision": "2973edd5178e1405040f4f1856c66740"
  },
  {
    "url": "res/icons_default/left16.png",
    "revision": "51d04986b03f5a8edeab40c23e9c72e3"
  },
  {
    "url": "res/icons_default/news24.png",
    "revision": "54fdc9b7cbc5c82edbb6c83042d44384"
  },
  {
    "url": "res/icons_default/object16.png",
    "revision": "fc9dd697a9f5add075f7d5200fbf1b5b"
  },
  {
    "url": "res/icons_default/object24.png",
    "revision": "2424d4910c8dc102b35a694f788e17f7"
  },
  {
    "url": "res/icons_default/open16.png",
    "revision": "20733c114599b75d22c333f0d2e1c499"
  },
  {
    "url": "res/icons_default/open24.png",
    "revision": "1f5e8f877d555a9d3e6ff720894090e2"
  },
  {
    "url": "res/icons_default/options16.png",
    "revision": "aec2efdd7cf31ac97a72a47fc91a9892"
  },
  {
    "url": "res/icons_default/paste16.png",
    "revision": "c9eb1fca784d0086926acdf084945e9d"
  },
  {
    "url": "res/icons_default/preview16.png",
    "revision": "def399f4dd24e159911a22032b8980ab"
  },
  {
    "url": "res/icons_default/project16.png",
    "revision": "61641ae9cf50368453ec8d0f3a239b72"
  },
  {
    "url": "res/icons_default/properties16.png",
    "revision": "0e6a069ca4b2511d9b79cbb115767237"
  },
  {
    "url": "res/icons_default/redo16.png",
    "revision": "7eae9bfb7ef994d15b9c12007d870863"
  },
  {
    "url": "res/icons_default/remove16.png",
    "revision": "1666d8ccc50595679f099f38e9009fe4"
  },
  {
    "url": "res/icons_default/right16.png",
    "revision": "33d7a76000637e112468d0304ea962d7"
  },
  {
    "url": "res/icons_default/save_all16.png",
    "revision": "c843402f7b74416e143226b88d530317"
  },
  {
    "url": "res/icons_default/saveas16.png",
    "revision": "c24c1566fad8c8b85b206a249cac93ed"
  },
  {
    "url": "res/icons_default/scene16.png",
    "revision": "717e7fe6a6beaecfcff86d4cf855839c"
  },
  {
    "url": "res/icons_default/search16.png",
    "revision": "5d05a2587dc1f892647ccb8f07dd5fac"
  },
  {
    "url": "res/icons_default/site16.png",
    "revision": "179dfdc09cfbc427d804dd6d6402b2e7"
  },
  {
    "url": "res/icons_default/source_cpp16.png",
    "revision": "52ac1cdc0dbd83353316daf19f1f5498"
  },
  {
    "url": "res/icons_default/undo16.png",
    "revision": "df04d616efbcbb1f45d884db969185a6"
  },
  {
    "url": "res/icons_default/up16.png",
    "revision": "d8963663704e77e0a043060551bc59b9"
  },
  {
    "url": "res/icons_default/var16.png",
    "revision": "c3fb610d1a02d06d3ebb82a2a34738e9"
  },
  {
    "url": "res/imageicon.png",
    "revision": "f60816b8a44dc9d622d2248f98ae6b06"
  },
  {
    "url": "res/imageicon24.png",
    "revision": "c6db8bca556d298784afae0920d9eb3a"
  },
  {
    "url": "res/imagewizard.png",
    "revision": "a3db9b7e563931879b5f67dedccae471"
  },
  {
    "url": "res/importgif.png",
    "revision": "20f835c3470f3ecf4d085d25fe62b144"
  },
  {
    "url": "res/importrpgmaker.png",
    "revision": "7ef9d6b3dfada6da69fa82f06179ce3f"
  },
  {
    "url": "res/info.png",
    "revision": "15d5d59db598b82d300156fdf1efab68"
  },
  {
    "url": "res/intelxdklogo.png",
    "revision": "54041d36db7c10051a1f5bc35e8871f1"
  },
  {
    "url": "res/internet32.png",
    "revision": "4624c9312dd5f36095f42b9503e51f94"
  },
  {
    "url": "res/jeueditor.png",
    "revision": "6af9e571ed9fbe385f1e0d192eb963f0"
  },
  {
    "url": "res/joystick16.png",
    "revision": "c605773045539d36acc7423ec8aed4d5"
  },
  {
    "url": "res/kded.png",
    "revision": "42def197a754392a024157b13be1ee21"
  },
  {
    "url": "res/keyicon.png",
    "revision": "98215340def8ef5e7b00747db8d16919"
  },
  {
    "url": "res/layers16.png",
    "revision": "d9c167f270ae0563d31de9ddf14b9f73"
  },
  {
    "url": "res/layers24.png",
    "revision": "5391088fcef4b0530468f7f2fc31c0e0"
  },
  {
    "url": "res/layers64.png",
    "revision": "4195953f8c6cc96c9b24f4e822d0f0f8"
  },
  {
    "url": "res/layout.png",
    "revision": "4460b8e0b8be567a1c278ae2715f5dc9"
  },
  {
    "url": "res/leftdir.png",
    "revision": "324fe84986ead9e63d440476b1351ee8"
  },
  {
    "url": "res/leftdowndir.png",
    "revision": "7485eba12b54b2fcdfda5cb5261bdfe3"
  },
  {
    "url": "res/leftupdir.png",
    "revision": "7f2b437265f967f632967ea695b840ab"
  },
  {
    "url": "res/lienadd24.png",
    "revision": "c306f59d843ec9e46624818f1e94d59c"
  },
  {
    "url": "res/lienaddicon.png",
    "revision": "6853015a3f738939a2af50c8d6c9321a"
  },
  {
    "url": "res/link48.png",
    "revision": "c64d4b291a1e3531c7f1968142235089"
  },
  {
    "url": "res/linux-compatible.png",
    "revision": "17ff6fbed88b6a3e76d302369045d93b"
  },
  {
    "url": "res/linux-logo.png",
    "revision": "b8556bf56d667fbdee59d22bf8412cc5"
  },
  {
    "url": "res/linux-notcompatible.png",
    "revision": "5ddb482ceae3897dc66770ee5aebb3be"
  },
  {
    "url": "res/list24.png",
    "revision": "0ce88f8b4b922a159351db1e0ab8d5b5"
  },
  {
    "url": "res/locale.png",
    "revision": "1066e89c6f1d2b77859aa9b0694f8833"
  },
  {
    "url": "res/lockicon.png",
    "revision": "d9089ba1613ae09ad93e0b353dfe8a0d"
  },
  {
    "url": "res/looknfeel.png",
    "revision": "d9314154d5f924b732d7bcc9d091ff73"
  },
  {
    "url": "res/mac-compatible.png",
    "revision": "3ade2023b67606d56410899c449cb3f5"
  },
  {
    "url": "res/mac-logo.png",
    "revision": "e2587fa1c2dbb911241c3ce19099cf75"
  },
  {
    "url": "res/mac-notcompatible.png",
    "revision": "1a35ac7d0489f7c4725d428209666815"
  },
  {
    "url": "res/maj.png",
    "revision": "c1c073b1e8ff1b345a2de0c65ea6753a"
  },
  {
    "url": "res/maj24.png",
    "revision": "5c81a9b41a803dec2077155beafb2cf0"
  },
  {
    "url": "res/mask16.png",
    "revision": "faa0875591c012a1449bee8b34658a0a"
  },
  {
    "url": "res/maskAdd16.png",
    "revision": "012e835f70ba876c51b04b95e6f994fd"
  },
  {
    "url": "res/maskEdit16.png",
    "revision": "9937173b38d47e0bae17e96e191573d7"
  },
  {
    "url": "res/maskRemove16.png",
    "revision": "c7a0219dc43a8f58d7cc6d81ed3686e9"
  },
  {
    "url": "res/mathfunction.png",
    "revision": "0f99d0115b12dba646dc00b026683073"
  },
  {
    "url": "res/message.png",
    "revision": "15d5d59db598b82d300156fdf1efab68"
  },
  {
    "url": "res/moreicon.png",
    "revision": "c318e97135112fa03b370a5eeeb2a524"
  },
  {
    "url": "res/mouseicon.png",
    "revision": "ede2269bfd352f099ad967c452f07ab4"
  },
  {
    "url": "res/mp3ogg.png",
    "revision": "eccfc7962c6079ca462c76765d048589"
  },
  {
    "url": "res/musicicon.png",
    "revision": "78478f6687ce29bbfccf97cd4299bc73"
  },
  {
    "url": "res/musicicon24.png",
    "revision": "7854906fd455e16b28b79f431bb2484a"
  },
  {
    "url": "res/newicon.png",
    "revision": "88d23638f174c80cc073e9676bd39332"
  },
  {
    "url": "res/newicon24.png",
    "revision": "d3aca45f957f9d22cd135105a4507ea8"
  },
  {
    "url": "res/noProtection.png",
    "revision": "b1e928ac2ff7bd66aacb11c3e9355dea"
  },
  {
    "url": "res/nth root.png",
    "revision": "ee8306fa71ee20fe491e89a4fbba0402"
  },
  {
    "url": "res/objectgroup24.png",
    "revision": "ba4fde731d39768e51b9ce640b25f6c7"
  },
  {
    "url": "res/ObjectsPositionsList24.png",
    "revision": "3900c9297ae10bdb7dde8e713da377cb"
  },
  {
    "url": "res/objeticon.png",
    "revision": "0fa524c38d1026ed2fc2463a40c4b08c"
  },
  {
    "url": "res/objeticon24.png",
    "revision": "3d1e1b35a61d1d21ae46fa987b6575ea"
  },
  {
    "url": "res/objeticon64.png",
    "revision": "2f09e5ac0b37ac06acff2bc1a7c4cc01"
  },
  {
    "url": "res/ok.png",
    "revision": "abbc563f0f516a37cffa678e3f982f3b"
  },
  {
    "url": "res/openicon.png",
    "revision": "46467a9ad197d955ae3ae183741d59eb"
  },
  {
    "url": "res/openicon24.png",
    "revision": "587eb74af3506c1b8de0f0639a1ab347"
  },
  {
    "url": "res/originPoint.png",
    "revision": "105ee1db6e1438e4ad6cb2f15bc0a19f"
  },
  {
    "url": "res/package.png",
    "revision": "a9b24326435113828732c6838ffd2843"
  },
  {
    "url": "res/package16.png",
    "revision": "a3ed8d8a01f0d5ba7fd619e6fbf63852"
  },
  {
    "url": "res/paint.png",
    "revision": "12e1979645a6485badbd7c2125edebbf"
  },
  {
    "url": "res/paint24.png",
    "revision": "e549915b3efc8d9149ebe122036d3fa3"
  },
  {
    "url": "res/paraJeu16.png",
    "revision": "d5b9dabfd0dfd24d64d3c837dce1dd23"
  },
  {
    "url": "res/paraJeu24.png",
    "revision": "566603eda974f531fcc9b095d2632185"
  },
  {
    "url": "res/parentFolder40.png",
    "revision": "e85abd0a05321b5df2b27512049277cb"
  },
  {
    "url": "res/password.png",
    "revision": "b373485a3639bf2ed18f547ce0f33b53"
  },
  {
    "url": "res/passwordicon.png",
    "revision": "45b3ecce1540ec828c05b071a6dd3684"
  },
  {
    "url": "res/paste24.png",
    "revision": "78f0fa6e4bca0581a7a13293a32b8899"
  },
  {
    "url": "res/pasteicon.png",
    "revision": "09b8b154f658f423a85119e5efa0e3e3"
  },
  {
    "url": "res/pauseicon.png",
    "revision": "a952d6650f866767f1a44ff85d2eee61"
  },
  {
    "url": "res/pauseicon24.png",
    "revision": "32390b17015fdfd0f28d532728a41a1e"
  },
  {
    "url": "res/physics16.png",
    "revision": "92f52ba6d69dfe593af7a0ca17fa9eaa"
  },
  {
    "url": "res/physics24.png",
    "revision": "bcd269294b3c81ca1979e5f8e2f9e6ce"
  },
  {
    "url": "res/physics32.png",
    "revision": "b68530cb78d8c8dd13a84b44f1cc53d2"
  },
  {
    "url": "res/point.png",
    "revision": "4ff756d3d4fe648a2d9667179581aa2b"
  },
  {
    "url": "res/pointadd.png",
    "revision": "5f0742038c41af76b4982b4d1cb6c09a"
  },
  {
    "url": "res/pointdel.png",
    "revision": "c4304d2f7abb78e3aa98544e42bded0b"
  },
  {
    "url": "res/pointEdit16.png",
    "revision": "b1eaaa1c1a049ff3905586564fa7b242"
  },
  {
    "url": "res/policeicon.png",
    "revision": "5addba4d7a7bf0c619921ec022e6ec13"
  },
  {
    "url": "res/polygon.png",
    "revision": "44439133885865889ddff42132328c42"
  },
  {
    "url": "res/powered-boost.png",
    "revision": "bd464abadec4e81b390a4229e95b4a9a"
  },
  {
    "url": "res/powered-cpp.png",
    "revision": "f37b8803a7fcb481ab460a1ab396dabf"
  },
  {
    "url": "res/powered-gcc.png",
    "revision": "aad3e27f18f7eefb0be71c33b7a0fca8"
  },
  {
    "url": "res/powered-js.png",
    "revision": "6efe4fd6dd0090f78dd6514af6bfdbc8"
  },
  {
    "url": "res/powered-pixijs.png",
    "revision": "944c9641734ba9005043981b77cbdbda"
  },
  {
    "url": "res/powered-sfml.png",
    "revision": "d97e422fd385117da1fb871b7f217e74"
  },
  {
    "url": "res/powered-st.png",
    "revision": "b292ad3c0d67200883ff54de8e46a7ca"
  },
  {
    "url": "res/powered-tinyxml.png",
    "revision": "9c9706ad28727d45ae89c926c6bec6fe"
  },
  {
    "url": "res/powered-wx.png",
    "revision": "ff7af7a69a9e850092c1b20ae76b98cd"
  },
  {
    "url": "res/pref24.png",
    "revision": "0a880e334c4fe89a5a079d4cce49bd10"
  },
  {
    "url": "res/preferencelogo.png",
    "revision": "4dee182b65affffad3822f69445b361a"
  },
  {
    "url": "res/preficon.png",
    "revision": "e01f21205c9a839816932aa0d67e3d27"
  },
  {
    "url": "res/presentation.png",
    "revision": "8f1617e0ab6576a72c0d50f5ce4ae198"
  },
  {
    "url": "res/preview16.png",
    "revision": "5312060ae65933c5ae133a813248adf8"
  },
  {
    "url": "res/preview24.png",
    "revision": "392cda2fd3680cef70d834a93844479c"
  },
  {
    "url": "res/profiler24.png",
    "revision": "11aaf296244568ea667b20890a885665"
  },
  {
    "url": "res/projectManager24.png",
    "revision": "4460b8e0b8be567a1c278ae2715f5dc9"
  },
  {
    "url": "res/projectUpdate24.png",
    "revision": "1c5e4ae87e8b88e48463b539f7280573"
  },
  {
    "url": "res/quiticon.png",
    "revision": "1e49cb05b30f05a50d26c02b00851f95"
  },
  {
    "url": "res/recent.png",
    "revision": "55cb809e22318558bc90bc3ea87ce061"
  },
  {
    "url": "res/rectangle.png",
    "revision": "a21c1271a5edf8bfef08f303e7cc3106"
  },
  {
    "url": "res/redo.png",
    "revision": "3cb26d60b35e13313ee7893e1af04f89"
  },
  {
    "url": "res/redo24.png",
    "revision": "9b9e9a3f2040e5e62871987c526e3d6b"
  },
  {
    "url": "res/refreshicon.png",
    "revision": "ce6e1b51ad0604e92fdbf156ce68100f"
  },
  {
    "url": "res/refreshicon24.png",
    "revision": "d6809eae1b446433f3bd4c0f45b198dd"
  },
  {
    "url": "res/reminder-1.png",
    "revision": "89a6a3e1e6b7b2785774799da065b5cd"
  },
  {
    "url": "res/reminder-2.png",
    "revision": "4939e198b38e9dc2a7acc00bfc60ce56"
  },
  {
    "url": "res/reminder-3.png",
    "revision": "78c9e20893a2dac3aa99a21735f557bc"
  },
  {
    "url": "res/remove.png",
    "revision": "cad8120fe07211ce3be62154383a216b"
  },
  {
    "url": "res/remove24.png",
    "revision": "027bf65c433aad2996bc85c1aa7d69b0"
  },
  {
    "url": "res/repeat.png",
    "revision": "f07e31540d0021b778e0f91e010f8b82"
  },
  {
    "url": "res/ribbon_crystal/add24.png",
    "revision": "1acd7f0cf59da10308c73f89068bd649"
  },
  {
    "url": "res/ribbon_crystal/addFromLibrary24.png",
    "revision": "42d5dc539ca84ec7d48a944f71372207"
  },
  {
    "url": "res/ribbon_crystal/addtemplate24.png",
    "revision": "59b07cd793a48fb289f793f91a2577c6"
  },
  {
    "url": "res/ribbon_crystal/audioconverter24.png",
    "revision": "7854906fd455e16b28b79f431bb2484a"
  },
  {
    "url": "res/ribbon_crystal/behavior24.png",
    "revision": "11af7e978f73a05fc79d49f83957a7c5"
  },
  {
    "url": "res/ribbon_crystal/bug24.png",
    "revision": "c40321c58f6940f2996e25a8ac068236"
  },
  {
    "url": "res/ribbon_crystal/center24.png",
    "revision": "13d973fcce243ed9243b5d79d7fecb3b"
  },
  {
    "url": "res/ribbon_crystal/close24.png",
    "revision": "d7ccd78ab46827a0259766691df7de85"
  },
  {
    "url": "res/ribbon_crystal/commentaireadd24.png",
    "revision": "be1cba180283c5363415c29e5518435e"
  },
  {
    "url": "res/ribbon_crystal/copy24.png",
    "revision": "20412b80526c176d941e9212b03656e7"
  },
  {
    "url": "res/ribbon_crystal/cut24.png",
    "revision": "2381a4a92f6d25bdd11be8028bb21e70"
  },
  {
    "url": "res/ribbon_crystal/delete24.png",
    "revision": "f45966357508386b33ca4a25697ee1b5"
  },
  {
    "url": "res/ribbon_crystal/deleteselected24.png",
    "revision": "f45966357508386b33ca4a25697ee1b5"
  },
  {
    "url": "res/ribbon_crystal/deleteunknown24.png",
    "revision": "9550e5ebf6bc30ef447b19f55c63849f"
  },
  {
    "url": "res/ribbon_crystal/down24.png",
    "revision": "10e21c2bc0b5ca35036b37876b4edc3f"
  },
  {
    "url": "res/ribbon_crystal/edit24.png",
    "revision": "7d93d96bf80cba4393cf69633071c16f"
  },
  {
    "url": "res/ribbon_crystal/editname24.png",
    "revision": "54125ceff70fd8e997eac70e266ab2d7"
  },
  {
    "url": "res/ribbon_crystal/editprop24.png",
    "revision": "798f6b10a29adf146536e7d74efe13b7"
  },
  {
    "url": "res/ribbon_crystal/event24.png",
    "revision": "0ae0ece87da5bba8062beb5d26d2ecab"
  },
  {
    "url": "res/ribbon_crystal/eventadd24.png",
    "revision": "05de794bded058e8ecd8f67b555b2d33"
  },
  {
    "url": "res/ribbon_crystal/events24.png",
    "revision": "a6d98352320cd9baeab56d3c0737cc00"
  },
  {
    "url": "res/ribbon_crystal/eventsadd24.png",
    "revision": "e6a639e7eb23ddf427e6484461cbb2a2"
  },
  {
    "url": "res/ribbon_crystal/eventsedit24.png",
    "revision": "6523412bd2c39bc6bf5f69e0c396ac84"
  },
  {
    "url": "res/ribbon_crystal/extension24.png",
    "revision": "48376070c687b8a0f311d8c7627ae81e"
  },
  {
    "url": "res/ribbon_crystal/externallayoutadd24.png",
    "revision": "28b90733ca900b3051234349722d1728"
  },
  {
    "url": "res/ribbon_crystal/foldAll24.png",
    "revision": "a55bee2d392ef0bcbe63ee34ccfa6db8"
  },
  {
    "url": "res/ribbon_crystal/fullscreen24.png",
    "revision": "0d12996a30fbe79141a63a59b3740a8a"
  },
  {
    "url": "res/ribbon_crystal/gotoline24.png",
    "revision": "6d845ff7d8e7d3f27f251aabd6bc4481"
  },
  {
    "url": "res/ribbon_crystal/grid24.png",
    "revision": "72aaf3a7965dd0615bf923a6cee0fd6c"
  },
  {
    "url": "res/ribbon_crystal/gridedit24.png",
    "revision": "7f8cd13bdeb10608e514375ec9e875d3"
  },
  {
    "url": "res/ribbon_crystal/group24.png",
    "revision": "3622942da125ed1121ede5569b00c6c7"
  },
  {
    "url": "res/ribbon_crystal/help24.png",
    "revision": "264a0855ce0dcc5876a57a8fc1862bf5"
  },
  {
    "url": "res/ribbon_crystal/image24.png",
    "revision": "c6db8bca556d298784afae0920d9eb3a"
  },
  {
    "url": "res/ribbon_crystal/imageconverter24.png",
    "revision": "4a8e04eb701bfeaf591b0b5b17603d9f"
  },
  {
    "url": "res/ribbon_crystal/layers24.png",
    "revision": "5391088fcef4b0530468f7f2fc31c0e0"
  },
  {
    "url": "res/ribbon_crystal/lienadd24.png",
    "revision": "c306f59d843ec9e46624818f1e94d59c"
  },
  {
    "url": "res/ribbon_crystal/list24.png",
    "revision": "0ce88f8b4b922a159351db1e0ab8d5b5"
  },
  {
    "url": "res/ribbon_crystal/maj24.png",
    "revision": "5c81a9b41a803dec2077155beafb2cf0"
  },
  {
    "url": "res/ribbon_crystal/new24.png",
    "revision": "d3aca45f957f9d22cd135105a4507ea8"
  },
  {
    "url": "res/ribbon_crystal/objectgroup24.png",
    "revision": "ba4fde731d39768e51b9ce640b25f6c7"
  },
  {
    "url": "res/ribbon_crystal/objects24.png",
    "revision": "3d1e1b35a61d1d21ae46fa987b6575ea"
  },
  {
    "url": "res/ribbon_crystal/ObjectsPositionsList24.png",
    "revision": "3900c9297ae10bdb7dde8e713da377cb"
  },
  {
    "url": "res/ribbon_crystal/open24.png",
    "revision": "587eb74af3506c1b8de0f0639a1ab347"
  },
  {
    "url": "res/ribbon_crystal/paint24.png",
    "revision": "e549915b3efc8d9149ebe122036d3fa3"
  },
  {
    "url": "res/ribbon_crystal/paste24.png",
    "revision": "78f0fa6e4bca0581a7a13293a32b8899"
  },
  {
    "url": "res/ribbon_crystal/pause24.png",
    "revision": "32390b17015fdfd0f28d532728a41a1e"
  },
  {
    "url": "res/ribbon_crystal/physics24.png",
    "revision": "d865338547b4a554023fe39244d03e32"
  },
  {
    "url": "res/ribbon_crystal/pref24.png",
    "revision": "0a880e334c4fe89a5a079d4cce49bd10"
  },
  {
    "url": "res/ribbon_crystal/preview24.png",
    "revision": "392cda2fd3680cef70d834a93844479c"
  },
  {
    "url": "res/ribbon_crystal/profiler24.png",
    "revision": "11aaf296244568ea667b20890a885665"
  },
  {
    "url": "res/ribbon_crystal/projectManager24.png",
    "revision": "4460b8e0b8be567a1c278ae2715f5dc9"
  },
  {
    "url": "res/ribbon_crystal/projectUpdate24.png",
    "revision": "1c5e4ae87e8b88e48463b539f7280573"
  },
  {
    "url": "res/ribbon_crystal/redo24.png",
    "revision": "9b9e9a3f2040e5e62871987c526e3d6b"
  },
  {
    "url": "res/ribbon_crystal/refresh24.png",
    "revision": "d6809eae1b446433f3bd4c0f45b198dd"
  },
  {
    "url": "res/ribbon_crystal/remove24.png",
    "revision": "027bf65c433aad2996bc85c1aa7d69b0"
  },
  {
    "url": "res/ribbon_crystal/save_all24.png",
    "revision": "c37824327f35f93ef29b02d97bd6a98e"
  },
  {
    "url": "res/ribbon_crystal/save24.png",
    "revision": "ffb7efaff64d9871bce8c25803b8242a"
  },
  {
    "url": "res/ribbon_crystal/sceneadd24.png",
    "revision": "28b90733ca900b3051234349722d1728"
  },
  {
    "url": "res/ribbon_crystal/sceneedit24.png",
    "revision": "85ac5cc9261c6d67104d40ed2845f1c1"
  },
  {
    "url": "res/ribbon_crystal/search24.png",
    "revision": "f825c453df332f055f4748bb49eb223c"
  },
  {
    "url": "res/ribbon_crystal/site24.png",
    "revision": "a2f2f2cc409bf5a8b1d95d36f3649a0c"
  },
  {
    "url": "res/ribbon_crystal/source_cpp24.png",
    "revision": "1498f6128db18de8d909f6b1ff07b54c"
  },
  {
    "url": "res/ribbon_crystal/start24.png",
    "revision": "392cda2fd3680cef70d834a93844479c"
  },
  {
    "url": "res/ribbon_crystal/startPage24.png",
    "revision": "e1ceba06488673dade862a43d9c9ef93"
  },
  {
    "url": "res/ribbon_crystal/startwindow24.png",
    "revision": "63711da4e9241ffcfe1332f5083c281a"
  },
  {
    "url": "res/ribbon_crystal/stop24.png",
    "revision": "309744ccf9a42bdf33dd8e6e967a051e"
  },
  {
    "url": "res/ribbon_crystal/subeventadd24.png",
    "revision": "6956c79fc7cbc316d06c55204c5cb935"
  },
  {
    "url": "res/ribbon_crystal/template24.png",
    "revision": "b832e2391de58d8c4ee4783399e21851"
  },
  {
    "url": "res/ribbon_crystal/tools24.png",
    "revision": "93dff8215d68f7f95b76e18c02ef36d5"
  },
  {
    "url": "res/ribbon_crystal/undo24.png",
    "revision": "6bdb28bbe13a8e9e3b5447785a325c1f"
  },
  {
    "url": "res/ribbon_crystal/unFoldAll24.png",
    "revision": "cc3facf5d76bc59df8223b9a3732acab"
  },
  {
    "url": "res/ribbon_crystal/up24.png",
    "revision": "2a1ace55f7794894a35ab48a27ad02ba"
  },
  {
    "url": "res/ribbon_crystal/var24.png",
    "revision": "332fca28a09a59792ba528c1df178446"
  },
  {
    "url": "res/ribbon_crystal/view24.png",
    "revision": "ac4b6e4d7736cadcf45c3f69df045579"
  },
  {
    "url": "res/ribbon_crystal/virtualfolderadd24.png",
    "revision": "d63709e23f07ed9eb32ad86ef19d29e2"
  },
  {
    "url": "res/ribbon_crystal/windowMask24.png",
    "revision": "10c2f5e6037e7b7475403b574f6cae03"
  },
  {
    "url": "res/ribbon_crystal/zoom24.png",
    "revision": "e6bb21567d855533ed2f2b80fb455b5d"
  },
  {
    "url": "res/ribbon_default/add32.png",
    "revision": "7cff28b1db08cd3c2d7e5aaf447e507c"
  },
  {
    "url": "res/ribbon_default/addFromLibrary32.png",
    "revision": "2476d0c2a682a4e53b7f106273ab8599"
  },
  {
    "url": "res/ribbon_default/addtemplate32.png",
    "revision": "8431ca60b8bbdbe9dfbb3bd0f9bfa387"
  },
  {
    "url": "res/ribbon_default/audioconverter32.png",
    "revision": "9ad1214233dd88e8c4d5d68c0cf3ff21"
  },
  {
    "url": "res/ribbon_default/behavior24.png",
    "revision": "11af7e978f73a05fc79d49f83957a7c5"
  },
  {
    "url": "res/ribbon_default/bug32.png",
    "revision": "499d5845fcb75cb9dc0aa97998491f04"
  },
  {
    "url": "res/ribbon_default/center32.png",
    "revision": "a34b8ec907437620f0a6d436d2ff582e"
  },
  {
    "url": "res/ribbon_default/close32.png",
    "revision": "f7cb09ca7e6814e267cf643023719133"
  },
  {
    "url": "res/ribbon_default/commentaireadd32.png",
    "revision": "259c01e98f905788fe3652973cb17f00"
  },
  {
    "url": "res/ribbon_default/copy32.png",
    "revision": "fa82a364d16a00cb20f3d882fc2b4741"
  },
  {
    "url": "res/ribbon_default/cut32.png",
    "revision": "731116916c846b9361035a46d43e9c11"
  },
  {
    "url": "res/ribbon_default/delete32.png",
    "revision": "63530285ce4a465855b459f1eae9079a"
  },
  {
    "url": "res/ribbon_default/deleteselected32.png",
    "revision": "6f4925757998cd1ceca92c3fafad5aa5"
  },
  {
    "url": "res/ribbon_default/deleteunknown32.png",
    "revision": "7a27dcc2eccb5cabf0d56a3913a8940e"
  },
  {
    "url": "res/ribbon_default/down32.png",
    "revision": "b99b26f950928c80034c70cff83f2e4a"
  },
  {
    "url": "res/ribbon_default/edit32.png",
    "revision": "2419a36d0ac6877ebdcc2ec304628b2a"
  },
  {
    "url": "res/ribbon_default/editname32.png",
    "revision": "62bd43fff554a943ee8f577db09bf7b2"
  },
  {
    "url": "res/ribbon_default/editprop32.png",
    "revision": "dce5b66e40c3f61765054d8f0095ff5a"
  },
  {
    "url": "res/ribbon_default/eventadd32.png",
    "revision": "3aa305fd016d1dcec0079cacb10b5a09"
  },
  {
    "url": "res/ribbon_default/eventsadd32.png",
    "revision": "c01eecf80ad942d8e18af44284464543"
  },
  {
    "url": "res/ribbon_default/eventsedit24.png",
    "revision": "6523412bd2c39bc6bf5f69e0c396ac84"
  },
  {
    "url": "res/ribbon_default/export32.png",
    "revision": "3c9227fceb7eb687ba8fbaaa637d523e"
  },
  {
    "url": "res/ribbon_default/extension32.png",
    "revision": "eff183658e5c24acabdb2cd259494677"
  },
  {
    "url": "res/ribbon_default/externalevents32.png",
    "revision": "4694a0b4e98958c142e7ec8b6c7756a4"
  },
  {
    "url": "res/ribbon_default/externallayout32.png",
    "revision": "933f788ffd95021b5e8de84c326363ba"
  },
  {
    "url": "res/ribbon_default/externallayoutadd32.png",
    "revision": "57a1d3009cddc1ec81a2086a72a675dc"
  },
  {
    "url": "res/ribbon_default/foldAll32.png",
    "revision": "3bfdaa8bdd4d1aa41ad5503389624ab0"
  },
  {
    "url": "res/ribbon_default/fullscreen24.png",
    "revision": "0d12996a30fbe79141a63a59b3740a8a"
  },
  {
    "url": "res/ribbon_default/function32.png",
    "revision": "7cf931469c557e05200a76c8e7fa5438"
  },
  {
    "url": "res/ribbon_default/gotoline32.png",
    "revision": "9dfabb29a7efa2b9ff4d3b087cda4042"
  },
  {
    "url": "res/ribbon_default/grid32.png",
    "revision": "c63053a6916905099451c78d153a0d6e"
  },
  {
    "url": "res/ribbon_default/gridedit32.png",
    "revision": "1684c86b2d1368992ee45ad0ad6edfe4"
  },
  {
    "url": "res/ribbon_default/group24.png",
    "revision": "3622942da125ed1121ede5569b00c6c7"
  },
  {
    "url": "res/ribbon_default/help16.png",
    "revision": "d02945ce8dfca006cffa031c96c369b8"
  },
  {
    "url": "res/ribbon_default/help32.png",
    "revision": "635a2f9b423ebbb483de807c59c30d6d"
  },
  {
    "url": "res/ribbon_default/hotReload64.png",
    "revision": "321234a352eeb70cbab552a4a5f942c6"
  },
  {
    "url": "res/ribbon_default/image32.png",
    "revision": "3390cc31088216080c802e375cf28b1f"
  },
  {
    "url": "res/ribbon_default/imageconverter32.png",
    "revision": "004292c4d478f440569be130045b23c2"
  },
  {
    "url": "res/ribbon_default/layers32.png",
    "revision": "1413cd737ba76699c2ea466fa10fef34"
  },
  {
    "url": "res/ribbon_default/list24.png",
    "revision": "0ce88f8b4b922a159351db1e0ab8d5b5"
  },
  {
    "url": "res/ribbon_default/maj24.png",
    "revision": "5c81a9b41a803dec2077155beafb2cf0"
  },
  {
    "url": "res/ribbon_default/networkicon32.png",
    "revision": "9cd92fdf1ccbf05493c51b21e6b2d2d2"
  },
  {
    "url": "res/ribbon_default/networkpreview32.png",
    "revision": "ea7ac8add6241d030bca885e10259a6d"
  },
  {
    "url": "res/ribbon_default/networkpreview64.png",
    "revision": "66eeb69826ba2d83a3f03a7f1f0349dd"
  },
  {
    "url": "res/ribbon_default/new32.png",
    "revision": "43038dccf0856a60c5876f0b45a00fd4"
  },
  {
    "url": "res/ribbon_default/objects32.png",
    "revision": "098b8f3b9c2915935284a4b81f85a8e7"
  },
  {
    "url": "res/ribbon_default/objects64.png",
    "revision": "e75ee5b9621d8150cd1f2f7ef114637b"
  },
  {
    "url": "res/ribbon_default/objectsgroups64.png",
    "revision": "222941bfd0dad516e1b0acb6a72afacd"
  },
  {
    "url": "res/ribbon_default/ObjectsPositionsList32.png",
    "revision": "0dcd5f82694050c7fa76c434d03fbeed"
  },
  {
    "url": "res/ribbon_default/open32.png",
    "revision": "2ca67bd04bae6859d1f67199a9f1d900"
  },
  {
    "url": "res/ribbon_default/paint24.png",
    "revision": "e549915b3efc8d9149ebe122036d3fa3"
  },
  {
    "url": "res/ribbon_default/paste32.png",
    "revision": "4f020740157dcbf21cd6dae710ee716a"
  },
  {
    "url": "res/ribbon_default/pause64.png",
    "revision": "d696683efcd8537484292d4a56b6ad37"
  },
  {
    "url": "res/ribbon_default/pref32.png",
    "revision": "b9e98ac870e168d9d0d04e8d4f595be1"
  },
  {
    "url": "res/ribbon_default/preview64.png",
    "revision": "7e91a0e3041bb554c854ac5c97543b2f"
  },
  {
    "url": "res/ribbon_default/previewOverride32.png",
    "revision": "1a0d8ecd3b9d94e5efbd2bf16bc21185"
  },
  {
    "url": "res/ribbon_default/profiler32.png",
    "revision": "c86036bcf41d728ca8f0478221e681f3"
  },
  {
    "url": "res/ribbon_default/projectManager32.png",
    "revision": "d7730ec56f2fdf1ccca473ab965e21ad"
  },
  {
    "url": "res/ribbon_default/redo32.png",
    "revision": "3845347ea6317ad14ae3e569b88670a8"
  },
  {
    "url": "res/ribbon_default/refresh32.png",
    "revision": "cc2b21a5bc3b4fb345c31fdc067964bd"
  },
  {
    "url": "res/ribbon_default/remove32.png",
    "revision": "63530285ce4a465855b459f1eae9079a"
  },
  {
    "url": "res/ribbon_default/save_all32.png",
    "revision": "cd118577e2924f6e0a389b08a88ae9e1"
  },
  {
    "url": "res/ribbon_default/save32.png",
    "revision": "e024a47637a0bc51f54f70eec3ef66dc"
  },
  {
    "url": "res/ribbon_default/sceneadd32.png",
    "revision": "5390fdc9800011616bf0716685f512f1"
  },
  {
    "url": "res/ribbon_default/sceneedit24.png",
    "revision": "85ac5cc9261c6d67104d40ed2845f1c1"
  },
  {
    "url": "res/ribbon_default/search32.png",
    "revision": "265766d23d247fb71f7462bcba27c5ec"
  },
  {
    "url": "res/ribbon_default/site24.png",
    "revision": "a2f2f2cc409bf5a8b1d95d36f3649a0c"
  },
  {
    "url": "res/ribbon_default/source_cpp32.png",
    "revision": "1931aec182bae404697f45b995fca461"
  },
  {
    "url": "res/ribbon_default/start32.png",
    "revision": "7c3be1d22d2d3b60477ea29a6210159e"
  },
  {
    "url": "res/ribbon_default/startPage32.png",
    "revision": "ca4c63472bbb62606b2267d799804f6a"
  },
  {
    "url": "res/ribbon_default/startwindow32.png",
    "revision": "3c9227fceb7eb687ba8fbaaa637d523e"
  },
  {
    "url": "res/ribbon_default/stop24.png",
    "revision": "309744ccf9a42bdf33dd8e6e967a051e"
  },
  {
    "url": "res/ribbon_default/subeventadd32.png",
    "revision": "00312aeeaf6c05bbd7248665e611cced"
  },
  {
    "url": "res/ribbon_default/template32.png",
    "revision": "c98206fbebd0c8d05934af600a281af4"
  },
  {
    "url": "res/ribbon_default/tools24.png",
    "revision": "93dff8215d68f7f95b76e18c02ef36d5"
  },
  {
    "url": "res/ribbon_default/undo32.png",
    "revision": "937d59d374cc755280e8a17cec975a15"
  },
  {
    "url": "res/ribbon_default/unFoldAll32.png",
    "revision": "4c03e61bc8a30708b4888322e201b100"
  },
  {
    "url": "res/ribbon_default/up32.png",
    "revision": "98713173d50824eddd65278b1bae3e25"
  },
  {
    "url": "res/ribbon_default/var24.png",
    "revision": "332fca28a09a59792ba528c1df178446"
  },
  {
    "url": "res/ribbon_default/view32.png",
    "revision": "8a37c8d1a16381ef72ff64a84dc8de84"
  },
  {
    "url": "res/ribbon_default/virtualfolderadd32.png",
    "revision": "b0c0c384ca8176b9fe06fb4b6ba5a187"
  },
  {
    "url": "res/ribbon_default/windowMask32.png",
    "revision": "b1b1330697c2342d21b598cf6bc4dfb3"
  },
  {
    "url": "res/ribbon_default/zoom32.png",
    "revision": "651a9b1fe80c99edb56f8931c9e572d2"
  },
  {
    "url": "res/rightArrowGrey.png",
    "revision": "21a581e60e8355d47007d7fae7fd95e2"
  },
  {
    "url": "res/rightdir.png",
    "revision": "551a51560052632e46d269bc94522aa0"
  },
  {
    "url": "res/rightdowndir.png",
    "revision": "640723951969c4f3e571c27edc20e640"
  },
  {
    "url": "res/rightupdir.png",
    "revision": "2a9793b9039c51e55ab78988f4114624"
  },
  {
    "url": "res/save_all16.png",
    "revision": "3d31d2cf31cd70a014283943cf01b109"
  },
  {
    "url": "res/save_all24.png",
    "revision": "c37824327f35f93ef29b02d97bd6a98e"
  },
  {
    "url": "res/saveasicon.png",
    "revision": "07c60f859a0e0187bdec112d8c12e79e"
  },
  {
    "url": "res/saveicon.png",
    "revision": "fd16be9c425c6dabef206ba53666f30c"
  },
  {
    "url": "res/saveicon24.png",
    "revision": "ffb7efaff64d9871bce8c25803b8242a"
  },
  {
    "url": "res/saveWSicon.png",
    "revision": "65cf0349a9f275d05375f8709abe136d"
  },
  {
    "url": "res/sc_beforeobject.png",
    "revision": "091949c077fea86038f3393170b244f0"
  },
  {
    "url": "res/sc_behindobject.png",
    "revision": "410f675f6c14303fb746fe24fcaa71d5"
  },
  {
    "url": "res/sc_bringtofront.png",
    "revision": "1c7777ebce9669384a31a644e8a680e7"
  },
  {
    "url": "res/sceneadd24.png",
    "revision": "28b90733ca900b3051234349722d1728"
  },
  {
    "url": "res/sceneedit24.png",
    "revision": "85ac5cc9261c6d67104d40ed2845f1c1"
  },
  {
    "url": "res/sceneeditor.png",
    "revision": "8ace894d56f52719bec20c298efec160"
  },
  {
    "url": "res/search24.png",
    "revision": "f825c453df332f055f4748bb49eb223c"
  },
  {
    "url": "res/searchicon.png",
    "revision": "4e3141081c8bf64be4aed4817c99b229"
  },
  {
    "url": "res/selectlayer.png",
    "revision": "5b7e113380f62bd05188023878d27e30"
  },
  {
    "url": "res/selectlayer24.png",
    "revision": "4b3fee568a0229abc1fa87a05a4f1cb0"
  },
  {
    "url": "res/semitransparentHitBox.png",
    "revision": "b38d2d7a0d1a00c15e185ccfa070f0d0"
  },
  {
    "url": "res/signeicon.png",
    "revision": "e65dd9c6e71af6f6879d0b670fbbe5e5"
  },
  {
    "url": "res/siteicon.png",
    "revision": "0083f72e2d4995b4f61f9cee5fa44213"
  },
  {
    "url": "res/siteicon24.png",
    "revision": "a2f2f2cc409bf5a8b1d95d36f3649a0c"
  },
  {
    "url": "res/soundicon.png",
    "revision": "671fb2d7f17816662308314fb1f1e73f"
  },
  {
    "url": "res/source_cpp16.png",
    "revision": "56899dead01d930dd5f82b67c80fd1b8"
  },
  {
    "url": "res/source_cpp24.png",
    "revision": "1498f6128db18de8d909f6b1ff07b54c"
  },
  {
    "url": "res/source_cpp64.png",
    "revision": "520f321b1479ea228b469b14f92f00f8"
  },
  {
    "url": "res/spritesheet16.png",
    "revision": "a5f6452513d4f2e3469a437b8c4d9dc8"
  },
  {
    "url": "res/sqrt.png",
    "revision": "ff2dd3f1166bd19ee0287bb1599a0888"
  },
  {
    "url": "res/starters_icons/downhill-bike-physics-demo.png",
    "revision": "c26b0dcb39850cff7bc4517a31ef87fb"
  },
  {
    "url": "res/starters_icons/game-feel-demo.png",
    "revision": "d2170faee3912549d6dcaf1dc7767e16"
  },
  {
    "url": "res/starters_icons/geometry-monster.png",
    "revision": "28a2226c0ff496efccaa60d84bff46b5"
  },
  {
    "url": "res/starters_icons/isometric-game.png",
    "revision": "16c258fe456fdf40e08955c2cc3d19d3"
  },
  {
    "url": "res/starters_icons/new.png",
    "revision": "7c85bc22c6fa2788be95f79681ebc4fb"
  },
  {
    "url": "res/starters_icons/pairs.png",
    "revision": "14d9c2a20646b8f79d4832fb9abb7bcb"
  },
  {
    "url": "res/starters_icons/particle-effects-demo.png",
    "revision": "e216aa0f400dce0149dc8b1bffe3aa79"
  },
  {
    "url": "res/starters_icons/platformer.png",
    "revision": "d3a5858e58f1a5fbb6f8b3b01b8a7386"
  },
  {
    "url": "res/starters_icons/space-shooter.png",
    "revision": "7457418a4e61fa89cc363aaaa71b829a"
  },
  {
    "url": "res/starticon.png",
    "revision": "5312060ae65933c5ae133a813248adf8"
  },
  {
    "url": "res/starticon24.png",
    "revision": "392cda2fd3680cef70d834a93844479c"
  },
  {
    "url": "res/startPage24.png",
    "revision": "e1ceba06488673dade862a43d9c9ef93"
  },
  {
    "url": "res/startwindow24.png",
    "revision": "63711da4e9241ffcfe1332f5083c281a"
  },
  {
    "url": "res/stepicon.png",
    "revision": "ae8676700ded60509b400c916b995ec8"
  },
  {
    "url": "res/stopicon24.png",
    "revision": "309744ccf9a42bdf33dd8e6e967a051e"
  },
  {
    "url": "res/strip24.png",
    "revision": "4a8e04eb701bfeaf591b0b5b17603d9f"
  },
  {
    "url": "res/subeventadd24.png",
    "revision": "6956c79fc7cbc316d06c55204c5cb935"
  },
  {
    "url": "res/subeventaddicon.png",
    "revision": "61a66cf68c9918924fafff19a0bba34a"
  },
  {
    "url": "res/texteicon.png",
    "revision": "94d24f9638f19daabf091fba9f89736a"
  },
  {
    "url": "res/TileMapExplainPicture.png",
    "revision": "891b6296519658f05982fd4430ec11ae"
  },
  {
    "url": "res/TileMapIcon16.png",
    "revision": "d5f9b751f729cc2edf5a03dec84f5943"
  },
  {
    "url": "res/tilemasktrianglebr16.png",
    "revision": "07d0c2c5986ba84978726a51cffe603c"
  },
  {
    "url": "res/time16.png",
    "revision": "d2edd6fb1e97693cb755cff73b7385ce"
  },
  {
    "url": "res/toolbaricon.png",
    "revision": "3793923dac74bb6b0330c196a7b8a042"
  },
  {
    "url": "res/tools24.png",
    "revision": "93dff8215d68f7f95b76e18c02ef36d5"
  },
  {
    "url": "res/trait.png",
    "revision": "957dc9216989817f7ea664ebd7ae3e4b"
  },
  {
    "url": "res/transparentback.png",
    "revision": "c82f9c960c9eaaed4ea6dc0c7976f7a7"
  },
  {
    "url": "res/triangle.png",
    "revision": "543792aeede3125649b5a762e888ab9e"
  },
  {
    "url": "res/tutoicon.png",
    "revision": "db443ce978218f029f3721fb451ddd4e"
  },
  {
    "url": "res/tutorial_icons/geometry-monster.png",
    "revision": "433bf30aaf8c5723154999dbe264ac31"
  },
  {
    "url": "res/tutorial_icons/platformer.png",
    "revision": "a8e9be3e278f642a2298aa91d2e921d2"
  },
  {
    "url": "res/tutorial_icons/space-shooter.png",
    "revision": "6db37b16cd5663d0f51343d158177849"
  },
  {
    "url": "res/types/behavior.png",
    "revision": "fb731fdd34f53b344d68834e3fb5c4c7"
  },
  {
    "url": "res/types/globalvar.png",
    "revision": "5101d4fa3a3a0c27b68679fd5128c6eb"
  },
  {
    "url": "res/types/object.png",
    "revision": "443afede186a7d7c6cfd3b062f9d3782"
  },
  {
    "url": "res/types/objectvar.png",
    "revision": "520b6eae50cd5f03ef413589d88cbbd7"
  },
  {
    "url": "res/types/scenevar.png",
    "revision": "2ba065ac1dcf8807fb83e9da58b22c9c"
  },
  {
    "url": "res/uncompress32.png",
    "revision": "9d343d2889adafdae7d7e6c745e78639"
  },
  {
    "url": "res/undo.png",
    "revision": "4adf4a7d74a021b2d29a375d46cf5aa5"
  },
  {
    "url": "res/undo24.png",
    "revision": "6bdb28bbe13a8e9e3b5447785a325c1f"
  },
  {
    "url": "res/unfold.png",
    "revision": "8feac6b1cac440ec2c68b971590f62d0"
  },
  {
    "url": "res/unFoldAll24.png",
    "revision": "cc3facf5d76bc59df8223b9a3732acab"
  },
  {
    "url": "res/unknown24.png",
    "revision": "3dedcfd693e5c5eff73c46bdb7320d5d"
  },
  {
    "url": "res/unknown32.png",
    "revision": "288e1601cc3283c3ef4563615d3a3a51"
  },
  {
    "url": "res/unknownAction24.png",
    "revision": "3dedcfd693e5c5eff73c46bdb7320d5d"
  },
  {
    "url": "res/unknownCondition24.png",
    "revision": "cd203496263bcb350eeec034696544e3"
  },
  {
    "url": "res/unknownicon.png",
    "revision": "803951868b1db06cfad5a5407cea62e6"
  },
  {
    "url": "res/unredo24.png",
    "revision": "1c5e4ae87e8b88e48463b539f7280573"
  },
  {
    "url": "res/up.png",
    "revision": "0b410035e363100f7ab8005fc308a12b"
  },
  {
    "url": "res/up24.png",
    "revision": "2a1ace55f7794894a35ab48a27ad02ba"
  },
  {
    "url": "res/update16.png",
    "revision": "6252277dbc913c7159d401c110bb0c7b"
  },
  {
    "url": "res/updir.png",
    "revision": "c0fc912611b48cedb4c7e205d6f91b2e"
  },
  {
    "url": "res/var.png",
    "revision": "c3fb610d1a02d06d3ebb82a2a34738e9"
  },
  {
    "url": "res/var24.png",
    "revision": "332fca28a09a59792ba528c1df178446"
  },
  {
    "url": "res/var64.png",
    "revision": "cef7538e5f1bc684522be7abf2d4492a"
  },
  {
    "url": "res/varRAZ.png",
    "revision": "be27ff682cf507432848474498b47d96"
  },
  {
    "url": "res/vertice.png",
    "revision": "81509cf19f4f3055d1bb00ba82de3446"
  },
  {
    "url": "res/view24.png",
    "revision": "ac4b6e4d7736cadcf45c3f69df045579"
  },
  {
    "url": "res/viewicon.png",
    "revision": "bdd19abafc08122a20ad6c583f1b31d9"
  },
  {
    "url": "res/warning.png",
    "revision": "3ce555894dd5ec3ce5ac451f5738a916"
  },
  {
    "url": "res/website16.png",
    "revision": "64f5468d9c8b088073e4e02ed03f3740"
  },
  {
    "url": "res/while.png",
    "revision": "62135f97f45044d8cff866735b400c30"
  },
  {
    "url": "res/wikiicon.png",
    "revision": "a6d1f52e98e18eaf3ff2cef1d01328a6"
  },
  {
    "url": "res/win-compatible.png",
    "revision": "4549e2497995f3204a36248cb2449c5c"
  },
  {
    "url": "res/win-logo.png",
    "revision": "02908ead0c31308441b9ec48eac74547"
  },
  {
    "url": "res/win-notcompatible.png",
    "revision": "eb341277be144a14fc9d70b2d4f41503"
  },
  {
    "url": "res/window.png",
    "revision": "89d134a958e46277208cc01d93ff91e8"
  },
  {
    "url": "res/yesnoicon.png",
    "revision": "470b837cfa34bceb26362a441af43e4a"
  },
  {
    "url": "res/zoom.png",
    "revision": "2b3f9a0ac3cb69b3115d17c56e15562d"
  },
  {
    "url": "res/zoom24.png",
    "revision": "e6bb21567d855533ed2f2b80fb455b5d"
  },
  {
    "url": "res/zoomminus.png",
    "revision": "c49fbd9d8fa67adc40db9c1c8c2c312f"
  },
  {
    "url": "res/zoomplus.png",
    "revision": "f6797b8b60f4dfdc78f9babca0cd499b"
  },
  {
    "url": "external/zip.js/WebContent/deflate.js",
    "revision": "d4e3a2a82db29526b20ce9314ce835fe"
  },
  {
    "url": "external/zip.js/WebContent/inflate.js",
    "revision": "fd952b261e960d0d7c8498569bee75d6"
  },
  {
    "url": "external/zip.js/WebContent/z-worker.js",
    "revision": "7d40d9ac5e628c8f4ab5e683b11e09ba"
  },
  {
    "url": "external/zip.js/WebContent/zip.js",
    "revision": "3628e1a12984058c0b257af371629ded"
  },
  {
    "url": "external/zip.js/WebContent/zlib-asm/codecs.js",
    "revision": "a8189b89d35d7cf62ce530270a5efe21"
  },
  {
    "url": "external/zlib-asm/zlib.js",
    "revision": "3c20b3538867858dddce435570f41c6d"
  },
  {
    "url": "external/monaco-editor-min/vs/loader.js",
    "revision": "03d8cf05ea1aa550106c496c9d3ffc2d"
  },
  {
    "url": "external/monaco-editor-min/vs/base/worker/workerMain.js",
    "revision": "cce3c2af8e247000e75f3a17d6a240b1"
  },
  {
    "url": "external/monaco-editor-min/vs/basic-languages/javascript/javascript.js",
    "revision": "59de70a1e3360b84513a353b8205f6fa"
  },
  {
    "url": "external/monaco-editor-min/vs/language/typescript/tsMode.js",
    "revision": "ac747f476ed487343529cd94843a210d"
  },
  {
    "url": "external/monaco-editor-min/vs/language/typescript/tsWorker.js",
    "revision": "3df0982e8f5f47084062aa026ec6f3f8"
  }
]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    // Cache resources from GDevelop cloudfront server (CORS enabled).
    workbox.routing.registerRoute(
      /https:\/\/resources\.gdevelop-app\.com\/.*$/,
      workbox.strategies.networkFirst({
        cacheName: 'gdevelop-resources-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 500,
          }),
        ],
      })
    );

    // Cache resources from GDevelop cloudfront server (CORS enabled).
    workbox.routing.registerRoute(
      /https:\/\/resources\.gdevelop-app\.com\/.*$/,
      workbox.strategies.networkFirst({
        cacheName: 'gdevelop-resources-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 500,
          }),
        ],
      })
    );

    // TODO: this should be useless?
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.networkFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 150,
          }),
        ],
      })
    );
  } else {
    console.log('Workbox could not be loaded - no offline support');
  }
} else {
  console.log(
    'importScripts does not exist on this browser - no offline support'
  );
}
